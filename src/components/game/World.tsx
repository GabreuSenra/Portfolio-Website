import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { GENRE_CLUSTERS } from '@/data/projects';
import OceanWater from './OceanWater';

export const BOUNDARY = 44;

export const BOUNDARY_ROCKS = Array.from({ length: 32 }).map((_, i) => {
  const angle = (i / 32) * Math.PI * 2;
  const r = BOUNDARY - 1 + ((i * 7919) % 100) / 50;
  return [Math.cos(angle) * r, 0, Math.sin(angle) * r, i] as [number, number, number, number];
});

export const EXTRA_ROCKS: [number, number, number][] = [
  [-15, 5, 0.6], [18, -5, 0.7], [-5, 12, 0.5], [10, 10, 0.8],
  [-18, 0, 0.9], [5, -30, 0.55], [-8, -35, 0.65], [35, 5, 0.7],
  [-35, 8, 0.8], [12, 35, 0.6],
];

export const OBSTACLES: { position: THREE.Vector3; radius: number }[] = [];

// ── Decorative rock outcrops ──────────────────────────────────────
function RockOutcrop({ x, z, scale = 1, seed = 0 }: { x: number; z: number; scale?: number; seed?: number }) {
  const c1 = useMemo(() => {
    const h = (seed * 31 + 17) % 10;
    return `hsl(213, ${20 + h}%, ${9 + h}%)`;
  }, [seed]);
  return (
    <group position={[x, 0, z]}>
      <mesh castShadow position={[0, 0.3 * scale, 0]}>
        <dodecahedronGeometry args={[0.7 * scale, 0]} />
        <meshStandardMaterial color={c1} roughness={0.9} metalness={0.05} />
      </mesh>
      <mesh castShadow position={[0.5 * scale, 0.15 * scale, 0.35 * scale]}>
        <dodecahedronGeometry args={[0.42 * scale, 0]} />
        <meshStandardMaterial color="#1e2d40" roughness={0.95} metalness={0.05} />
      </mesh>
    </group>
  );
}

// ── Floating debris / barrel ──────────────────────────────────────
function FloatingBarrel({ x, z, phase = 0 }: { x: number; z: number; phase?: number }) {
  const ref = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.position.y = Math.sin(clock.elapsedTime * 0.7 + phase) * 0.06;
      ref.current.rotation.z = Math.sin(clock.elapsedTime * 0.4 + phase) * 0.08;
    }
  });
  return (
    <group ref={ref} position={[x, 0.1, z]}>
      <mesh castShadow>
        <cylinderGeometry args={[0.18, 0.18, 0.38, 8]} />
        <meshStandardMaterial color="#5a3a1a" roughness={0.8} />
      </mesh>
      {[0.08, -0.08].map((yo, i) => (
        <mesh key={i} position={[0, yo, 0]}>
          <torusGeometry args={[0.19, 0.025, 6, 12]} />
          <meshStandardMaterial color="#2a2a2a" metalness={0.6} roughness={0.3} />
        </mesh>
      ))}
    </group>
  );
}

// ── Foam ring around hub platform ────────────────────────────────
function FoamRing({ radius, phase = 0 }: { radius: number; phase?: number }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (ref.current) {
      const s = 1 + Math.sin(clock.elapsedTime * 1.2 + phase) * 0.03;
      ref.current.scale.set(s, s, s);
      const mat = ref.current.material as THREE.MeshStandardMaterial;
      mat.opacity = 0.1 + Math.sin(clock.elapsedTime * 0.9 + phase) * 0.06;
    }
  });
  return (
    <mesh ref={ref} position={[0, 0.03, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <ringGeometry args={[radius, radius + 0.3, 48]} />
      <meshStandardMaterial
        color="#a0c8e8"
        emissive="#6aabcc"
        emissiveIntensity={0.3}
        transparent
        opacity={0.12}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

// ── Genre zone discs ─────────────────────────────────────────────
function GenreZone({ cx, cz, color }: { cx: number; cz: number; color: string }) {
  return (
    <group position={[cx, 0.05, cz]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[9, 6]} />
        <meshStandardMaterial color={color} transparent opacity={0.03} side={THREE.DoubleSide} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[8.8, 9.2, 6]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.35}
          transparent
          opacity={0.22}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

// ── Horizon gradient plane ────────────────────────────────────────
function OceanFloor() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.5, 0]} receiveShadow>
      <planeGeometry args={[400, 400]} />
      <meshStandardMaterial color="#060e1a" roughness={1} metalness={0} />
    </mesh>
  );
}

// ── Seagull-like silhouette drifting in background ────────────────
function DistantBird({ x, z, phase = 0 }: { x: number; z: number; phase?: number }) {
  const ref = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.elapsedTime * 0.25 + phase;
    ref.current.position.set(x + Math.sin(t) * 6, 4 + Math.sin(t * 1.7) * 0.4, z + Math.cos(t * 0.6) * 4);
    ref.current.rotation.y = Math.atan2(Math.cos(t) * 6, -Math.sin(t * 0.6) * 4);
  });
  return (
    <group ref={ref}>
      {/* Wings */}
      {[-1, 1].map((side, i) => (
        <mesh key={i} position={[side * 0.22, 0, 0]} rotation={[0, 0, side * 0.35]}>
          <boxGeometry args={[0.28, 0.04, 0.1]} />
          <meshStandardMaterial color="#8aa4bc" />
        </mesh>
      ))}
    </group>
  );
}

export default function World() {
  const barrelPositions: [number, number, number][] = [
    [-12, 8, 0.3], [16, -2, 1.1], [-3, 18, 2.0], [9, -18, 0.7],
    [-20, -10, 1.5], [6, 22, 2.3],
  ];

  return (
    <group>
      {/* Deep ocean floor */}
      <OceanFloor />

      {/* Animated ocean surface */}
      <OceanWater />

      {/* Subtle grid on seafloor for depth cues */}
      {Array.from({ length: 17 }).map((_, i) => {
        const v = -40 + i * 5;
        return (
          <group key={`grid-${i}`}>
            <mesh position={[v, -1.45, 0]} rotation={[-Math.PI / 2, 0, 0]}>
              <planeGeometry args={[0.03, 80]} />
              <meshStandardMaterial color="#0e2a40" transparent opacity={0.2} />
            </mesh>
            <mesh position={[0, -1.45, v]} rotation={[-Math.PI / 2, 0, 0]}>
              <planeGeometry args={[80, 0.03]} />
              <meshStandardMaterial color="#0e2a40" transparent opacity={0.2} />
            </mesh>
          </group>
        );
      })}

      {/* Genre zone discs */}
      {Object.entries(GENRE_CLUSTERS).map(([genre, { center, color }]) => (
        <GenreZone key={genre} cx={center[0]} cz={center[1]} color={color} />
      ))}

      {/* Boundary rocks */}
      {BOUNDARY_ROCKS.map(([x, , z, seed], i) => (
        <RockOutcrop
          key={`br-${i}`}
          x={x}
          z={z}
          scale={0.7 + ((seed * 3 + 11) % 10) / 12}
          seed={seed}
        />
      ))}

      {/* Interior rocks */}
      {EXTRA_ROCKS.map(([x, z, scale], i) => (
        <RockOutcrop key={`ex-${i}`} x={x} z={z} scale={scale} seed={i + 100} />
      ))}

      {/* Floating barrels / debris */}
      {barrelPositions.map(([x, z, phase], i) => (
        <FloatingBarrel key={`barrel-${i}`} x={x} z={z} phase={phase} />
      ))}

      {/* Distant birds */}
      <DistantBird x={-30} z={-30} phase={0} />
      <DistantBird x={30}  z={20}  phase={2.1} />

      {/* Central hub platform */}
      <mesh position={[-1, -0.5, -1]} receiveShadow>
        <cylinderGeometry args={[3.5, 4, 0.28, 8]} />
        <meshStandardMaterial color="#207c70" roughness={0.6} metalness={0.2} />
      </mesh>
      <mesh position={[-0.9, -0.6, -1.2]} receiveShadow>
        <cylinderGeometry args={[5, 4, 0.28, 8]} />
        <meshStandardMaterial color="#1d5049" roughness={0.6} metalness={0.2} />
      </mesh>
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[3.3, 3.55, 8]} />
        <meshStandardMaterial
          color="#3B82F6"
          emissive="#3B82F6"
          emissiveIntensity={0.55}
          transparent
          opacity={0.55}
          side={THREE.DoubleSide}
        />
      </mesh>
      {/* Foam rings around hub */}
      <FoamRing radius={4.2} phase={0} />
      <FoamRing radius={5.0} phase={1.4} />

      {/* Lighting */}
      <ambientLight intensity={0.35} color="#b0c8e8" />
      <directionalLight
        position={[30, 45, 20]}
        intensity={2.0}
        color="#ffe8c0"
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-far={160}
        shadow-camera-left={-70}
        shadow-camera-right={70}
        shadow-camera-top={70}
        shadow-camera-bottom={-70}
      />
      {/* Specular fill from below — ocean bounce */}
      <pointLight position={[0, -0.5, 0]} intensity={0.4} color="#1a4870" />
      {/* Warm horizon glow */}
      <pointLight position={[-50, 8, -50]} intensity={0.5} color="#ff9040" distance={120} />
    </group>
  );
}
