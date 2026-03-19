import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Island as IslandData } from '@/data/projects';
import { Tree } from './tree';

interface IslandProps {
  project: IslandData;
  isNear: boolean;
  onClick: () => void;
}

const GENRE_COLORS: Record<string, string> = {
  'RPG / Narrativo':  '#7c3aed',
  'Ação / Shooter':   '#dc2626',
  'Tooling / Shaders':'#059669',
  'Links':            '#f59e0b',
};

/** Link islands have a lighthouse-style tower instead of a generic box */
function LinkTower({ color }: { color: string }) {
  const lightRef = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (lightRef.current) {
      const mat = lightRef.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 0.8 + Math.sin(clock.elapsedTime * 2.5) * 0.5;
      lightRef.current.rotation.y += 0.04;
    }
  });
  return (
    <group>
      {/* Tower base */}
      <mesh castShadow position={[0, 0.6, 0]}>
        <cylinderGeometry args={[0.28, 0.38, 1.1, 8]} />
        <meshStandardMaterial color="#253347" roughness={0.7} metalness={0.15} />
      </mesh>
      {/* Tower mid */}
      <mesh castShadow position={[0, 1.25, 0]}>
        <cylinderGeometry args={[0.22, 0.28, 0.35, 8]} />
        <meshStandardMaterial color="#1e3050" roughness={0.7} metalness={0.2} />
      </mesh>
      {/* Lantern room */}
      <mesh ref={lightRef} castShadow position={[0, 1.52, 0]}>
        <cylinderGeometry args={[0.2, 0.22, 0.22, 6]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={1.0}
          transparent
          opacity={0.85}
        />
      </mesh>
      {/* Roof */}
      <mesh castShadow position={[0, 1.68, 0]}>
        <coneGeometry args={[0.24, 0.26, 6]} />
        <meshStandardMaterial color="#1a2535" roughness={0.6} />
      </mesh>
    </group>
  );
}

/** Standard project island tower */
function ProjectTower({ color }: { color: string }) {
  return (
    <group>
      <Tree color={color} position={[1.2, 0, 1]} />
      <Tree color={color} position={[-0.8, 0, 0]} />
      <Tree color={color} position={[0.2, 0, -0.8]} />
    </group>
  );
}

export default function Island({ project, isNear, onClick }: IslandProps) {
  const baseRef    = useRef<THREE.Mesh>(null);
  const ringRef    = useRef<THREE.Mesh>(null);
  const emissRef   = useRef(0);

  const genreColor = GENRE_COLORS[project.genre] ?? '#3B82F6';
  const isLink = project.type === 'link';

  useFrame((_, delta) => {
    const target = isNear ? 0.65 : 0.08;
    emissRef.current = THREE.MathUtils.lerp(emissRef.current, target, delta * 4);

    if (baseRef.current) {
      const mat = baseRef.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = emissRef.current;
    }

    if (ringRef.current) {
      const scale = isNear ? 1 + Math.sin(Date.now() * 0.003) * 0.08 : 1;
      ringRef.current.scale.set(scale, scale, scale);
      const mat = ringRef.current.material as THREE.MeshStandardMaterial;
      mat.opacity = isNear ? 0.5 + Math.sin(Date.now() * 0.003) * 0.2 : 0;
    }
  });

  return (
    <group position={project.position} onClick={onClick}>
      {/* Island base */}
      <mesh ref={baseRef} receiveShadow castShadow position={[0, 0, 0]}>
        <cylinderGeometry args={isLink ? [2.0, 2.4, 0.45, 8] : [2.6, 3.0, 0.5, 6]} />
        <meshStandardMaterial
          color={isLink ? '#1a2e1a' : '#253347'}
          emissive={genreColor}
          emissiveIntensity={0.08}
          roughness={0.8}
          metalness={0.1}
        />
      </mesh>

      {/* Island surface */}
      <mesh receiveShadow castShadow position={[0, 0.25, 0]}>
        <cylinderGeometry args={isLink ? [1.7, 2.0, 0.28, 8] : [2.2, 2.6, 0.3, 6]} />
        <meshStandardMaterial
          color={isLink ? '#e2eb97' : '#f7f6cb'}
          roughness={0.7}
          metalness={0.15}
        />
      </mesh>

      {/* Genre accent ring */}
      <mesh position={[0, 0.4, 0]}>
        <cylinderGeometry args={isLink ? [1.75, 1.75, 0.06, 8] : [2.25, 2.25, 0.06, 6]} />
        <meshStandardMaterial
          color={genreColor}
          emissive={genreColor}
          emissiveIntensity={0.9}
          transparent
          opacity={0.6}
        />
      </mesh>

      {/* Proximity pulse ring */}
      <mesh renderOrder={1} ref={ringRef} position={[0, 0.2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={isLink ? [2.3, 2.6, 32] : [2.8, 3.2, 32]} />
        <meshStandardMaterial
          color="#f59e0b"
          emissive="#f59e0b"
          emissiveIntensity={1}
          transparent
          opacity={0}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Tower */}
      {isLink ? <LinkTower color={genreColor} /> : <ProjectTower color={genreColor} />}
    </group>
  );
}
