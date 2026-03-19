import { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { ISLANDS } from '@/data/projects';
import { BOUNDARY, BOUNDARY_ROCKS, EXTRA_ROCKS } from './World';
import * as THREE from 'three';

const SPEED = 9;

// Isometric camera is at [20,20,20] → screen-space axes in world XZ:
//   Screen UP    (W / ↑) = (-1, 0, -1) / √2
//   Screen DOWN  (S / ↓) = ( 1, 0,  1) / √2
//   Screen LEFT  (A / ←) = (-1, 0,  1) / √2
//   Screen RIGHT (D / →) = ( 1, 0, -1) / √2
const ISO = 1 / Math.SQRT2;
const DIR_MAP = {
  up: new THREE.Vector3(-ISO, 0, -ISO),
  down: new THREE.Vector3(ISO, 0, ISO),
  left: new THREE.Vector3(-ISO, 0, ISO),
  right: new THREE.Vector3(ISO, 0, -ISO),
};

interface PlayerProps {
  onPositionChange: (pos: THREE.Vector3) => void;
}

function WakeTrail({ getPosition }: { getPosition: () => THREE.Vector3 }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const points = useRef<THREE.Vector3[]>([]);

  const MAX_POINTS = 30;
  const WIDTH = 0.4;

  useFrame(() => {
    const p = getPosition();

    points.current.push(p.clone());
    if (points.current.length > MAX_POINTS) {
      points.current.shift();
    }

    if (!meshRef.current) return;

    const positions = [];
    const indices = [];

    for (let i = 0; i < points.current.length; i++) {
      const curr = points.current[i];
      const prev = points.current[i - 1] || curr;

      // direção do segmento
      const dir = curr.clone().sub(prev).normalize();

      // vetor lateral
      const side = new THREE.Vector3(-dir.z, 0, dir.x).multiplyScalar(WIDTH);

      // dois lados da faixa
      const left = curr.clone().add(side);
      const right = curr.clone().sub(side);

      positions.push(left.x, 0.02, left.z);
      positions.push(right.x, 0.02, right.z);

      if (i < points.current.length - 1) {
        const base = i * 2;
        indices.push(base, base + 1, base + 2);
        indices.push(base + 1, base + 3, base + 2);
      }
    }

    const geo = meshRef.current.geometry as THREE.BufferGeometry;
    geo.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(positions, 3)
    );
    geo.setIndex(indices);
    geo.computeVertexNormals();
  });

  return (
    <mesh ref={meshRef}>
      <bufferGeometry />
      <meshStandardMaterial
        color="#9bdcff"
        emissive="#60a5fa"
        emissiveIntensity={0.4}
        transparent
        opacity={0.35}
        depthWrite={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

/** Pirate ship made of Three.js primitives */
function PirateShip() {
  return (
    // Envolvemos em um grupo com scale para manter o tamanho compatível com o seu mundo
    <group scale={0.85}>
      
      {/* ── Casco Principal (Hull) ── */}
      {/* Barriga do navio (mais escura, perto da água) */}
      <mesh castShadow receiveShadow position={[0, 0.2, 0]}>
        <boxGeometry args={[0.9, 0.4, 2.2]} />
        <meshStandardMaterial color="#2E190D" roughness={0.8} metalness={0.1} />
      </mesh>
      
      {/* Deck superior (mais largo) */}
      <mesh castShadow receiveShadow position={[0, 0.45, 0]}>
        <boxGeometry args={[1.0, 0.2, 2.4]} />
        <meshStandardMaterial color="#4A2E1B" roughness={0.7} metalness={0.1} />
      </mesh>

      {/* Piso de Madeira (Deck) */}
      <mesh receiveShadow position={[0, 0.56, 0]}>
        <boxGeometry args={[0.9, 0.05, 2.3]} />
        <meshStandardMaterial color="#8A5C2E" roughness={0.9} />
      </mesh>

      {/* ── Proa (Frente / Bow) ── */}
      {/* Bico cônico falso usando box rotacionada */}
      <mesh castShadow position={[0, 0.32, -1.25]} rotation={[0, Math.PI / 4, 0]}>
        <boxGeometry args={[0.7, 0.45, 0.7]} />
        <meshStandardMaterial color="#3A2012" roughness={0.8} />
      </mesh>
      
      {/* Bowsprit (Aquele mastro inclinado que sai da frente do navio) */}
      <mesh castShadow position={[0, 0.65, -1.6]} rotation={[-1.2, 0, 0]}>
        <cylinderGeometry args={[0.03, 0.06, 1.2, 8]} />
        <meshStandardMaterial color="#2E190D" roughness={0.8} />
      </mesh>

      {/* ── Popa (Traseira / Stern / Cabine do Capitão) ── */}
      {/* Estrutura da Cabine */}
      <mesh castShadow receiveShadow position={[0, 0.8, 0.85]}>
        <boxGeometry args={[0.85, 0.6, 0.7]} />
        <meshStandardMaterial color="#3A2012" roughness={0.7} />
      </mesh>
      
      {/* Teto da Cabine */}
      <mesh castShadow receiveShadow position={[0, 1.15, 0.85]}>
        <boxGeometry args={[0.95, 0.1, 0.8]} />
        <meshStandardMaterial color="#2E190D" roughness={0.8} />
      </mesh>

      {/* Janelas da Cabine (Brilhantes / Emissivas) */}
      {[-0.25, 0, 0.25].map((x, i) => (
        <mesh key={`win-${i}`} position={[x, 0.85, 1.21]}>
          <planeGeometry args={[0.15, 0.25]} />
          <meshStandardMaterial 
            color="#FFD166" 
            emissive="#FF9F1C" 
            emissiveIntensity={1.5} 
            toneMapped={false} 
          />
        </mesh>
      ))}

      {/* Friso Dourado (Trim) contornando a cabine */}
      <mesh position={[0, 1.05, 0.85]}>
        <boxGeometry args={[0.9, 0.05, 0.75]} />
        <meshStandardMaterial color="#D4AF37" roughness={0.4} metalness={0.8} />
      </mesh>

      {/* ── Mastros ── */}
      {/* Mastro Principal (Main Mast) */}
      <mesh castShadow position={[0, 1.5, 0.1]}>
        <cylinderGeometry args={[0.05, 0.08, 2.2, 8]} />
        <meshStandardMaterial color="#2E190D" roughness={0.8} />
      </mesh>
      <mesh castShadow position={[0, 2.1, 0.1]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.03, 0.03, 1.4, 6]} />
        <meshStandardMaterial color="#2E190D" roughness={0.8} />
      </mesh>

      {/* Mastro Frontal (Fore Mast) */}
      <mesh castShadow position={[0, 1.2, -0.7]}>
        <cylinderGeometry args={[0.04, 0.06, 1.6, 8]} />
        <meshStandardMaterial color="#2E190D" roughness={0.8} />
      </mesh>
      <mesh castShadow position={[0, 1.7, -0.7]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.025, 0.025, 1.0, 6]} />
        <meshStandardMaterial color="#2E190D" roughness={0.8} />
      </mesh>

      {/* ── Velas Estufadas (Sails) ── */}
      {/* DICA: Usamos um cilindro aberto cortado ao meio (thetaLength = PI) e esmagado no eixo Z para simular o vento! */}
      
      {/* Vela Principal */}
      <mesh castShadow position={[0, 1.4, -0.05]} scale={[1, 1, 0.4]} rotation={[0, Math.PI, 0]}>
        <cylinderGeometry args={[0.7, 0.7, 1.0, 16, 1, true, 0, Math.PI]} />
        <meshStandardMaterial color="#E6DDB8" roughness={0.9} side={THREE.DoubleSide} />
      </mesh>
      
      {/* Vela Frontal */}
      <mesh castShadow position={[0, 1.1, -0.85]} scale={[1, 1, 0.4]} rotation={[0, Math.PI, 0]}>
        <cylinderGeometry args={[0.5, 0.5, 0.8, 16, 1, true, 0, Math.PI]} />
        <meshStandardMaterial color="#E6DDB8" roughness={0.9} side={THREE.DoubleSide} />
      </mesh>

      {/* ── Bandeira Pirata ── */}
      <group position={[0, 2.7, 0.1]}>
        <mesh position={[0.2, 0, -0.1]} rotation={[0, 0, 0.15]}>
          <planeGeometry args={[0.4, 0.25]} />
          <meshStandardMaterial color="#111111" side={THREE.DoubleSide} />
        </mesh>
        {/* Marca vermelha macabra na bandeira */}
        <mesh position={[0.2, 0, -0.09]}>
          <planeGeometry args={[0.15, 0.15]} />
          <meshStandardMaterial color="#E63946" />
        </mesh>
      </group>

      {/* ── Bateria de Canhões (Broadside) ── */}
      {[-0.6, 0, 0.6].map((zOff, i) => (
        <group key={`cannons-${i}`}>
          {/* Bombordo (Esquerda) */}
          <mesh castShadow position={[-0.52, 0.45, zOff]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.04, 0.05, 0.3, 8]} />
            <meshStandardMaterial color="#1A1A1A" metalness={0.8} roughness={0.3} />
          </mesh>
          {/* Estibordo (Direita) */}
          <mesh castShadow position={[0.52, 0.45, zOff]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.05, 0.04, 0.3, 8]} />
            <meshStandardMaterial color="#1A1A1A" metalness={0.8} roughness={0.3} />
          </mesh>
        </group>
      ))}

      {/* ── Rastro na Água (Mudei levemente a escala para acomodar o navio maior) ── */}
      <mesh position={[0, 0.04, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.9, 1.2, 32]} />
        <meshStandardMaterial
          color="#60A5FA"
          emissive="#3B82F6"
          emissiveIntensity={0.8}
          transparent
          opacity={0.35}
          side={THREE.DoubleSide}
        />
      </mesh>

    </group>
  );
}

export default function Player({ onPositionChange }: PlayerProps) {
  const groupRef = useRef<THREE.Group>(null);
  const posRef = useRef(new THREE.Vector3(0, 0, 0));
  const facingRef = useRef(0); // current Y-rotation (radians)
  const keysRef = useRef<Record<string, boolean>>({});
  const { camera } = useThree();

  useEffect(() => {
    const down = (e: KeyboardEvent) => { keysRef.current[e.code] = true; };
    const up = (e: KeyboardEvent) => { keysRef.current[e.code] = false; };
    window.addEventListener('keydown', down);
    window.addEventListener('keyup', up);
    return () => {
      window.removeEventListener('keydown', down);
      window.removeEventListener('keyup', up);
    };
  }, []);

  useFrame((_, delta) => {
    const keys = keysRef.current;
    const move = new THREE.Vector3();

    if (keys['KeyW'] || keys['ArrowUp']) move.addScaledVector(DIR_MAP.up, 1);
    if (keys['KeyS'] || keys['ArrowDown']) move.addScaledVector(DIR_MAP.down, 1);
    if (keys['KeyA'] || keys['ArrowLeft']) move.addScaledVector(DIR_MAP.left, 1);
    if (keys['KeyD'] || keys['ArrowRight']) move.addScaledVector(DIR_MAP.right, 1);

    if (move.lengthSq() > 0) {
      move.normalize();

      // Rotação visual do barco
      const targetAngle = Math.atan2(-move.x, -move.z);
      let diff = targetAngle - facingRef.current;
      while (diff > Math.PI) diff -= Math.PI * 2;
      while (diff < -Math.PI) diff += Math.PI * 2;
      facingRef.current += diff * Math.min(1, delta * 10);

      // --- 2. NOVA LÓGICA DE COLISÃO ---
      const PLAYER_RADIUS = 0.8; // Raio de colisão do barco

      const checkCollision = (testPosX: number, testPosZ: number) => {
        // Checar Ilhas
        for (const island of ISLANDS) {
          const dx = testPosX - island.position[0];
          const dz = testPosZ - island.position[2];
          const dist = Math.sqrt(dx * dx + dz * dz);
          const islandRadius = island.type === 'link' ? 2.4 : 3.0; // Baseado nos cilindros do Island.tsx
          if (dist < PLAYER_RADIUS + islandRadius) return true;
        }

        // Checar Pedras da Borda
        for (const rock of BOUNDARY_ROCKS) {
          const scale = 0.7 + ((rock[3] * 3 + 11) % 10) / 12;
          const rockRadius = 0.7 * scale;
          const dx = testPosX - rock[0];
          const dz = testPosZ - rock[2];
          if (Math.sqrt(dx * dx + dz * dz) < PLAYER_RADIUS + rockRadius) return true;
        }

        // Checar Pedras Internas
        for (const rock of EXTRA_ROCKS) {
          const rockRadius = 0.7 * rock[2];
          const dx = testPosX - rock[0];
          const dz = testPosZ - rock[1]; // Índice 1 é o eixo Z no EXTRA_ROCKS
          if (Math.sqrt(dx * dx + dz * dz) < PLAYER_RADIUS + rockRadius) return true;
        }

        return false;
      };

      // Tamanho do passo neste frame
      const moveX = move.x * SPEED * delta;
      const moveZ = move.z * SPEED * delta;

      // 3. MOVIMENTO COM DESLIZAMENTO (Wall-Sliding)
      // Testamos o eixo X e Z separadamente. Se não colidir, aplicamos o movimento.
      if (!checkCollision(posRef.current.x + moveX, posRef.current.z)) {
        posRef.current.x += moveX;
      }

      if (!checkCollision(posRef.current.x, posRef.current.z + moveZ)) {
        posRef.current.z += moveZ;
      }

      // Clampar o limite do mundo
      posRef.current.x = THREE.MathUtils.clamp(posRef.current.x, -BOUNDARY, BOUNDARY);
      posRef.current.z = THREE.MathUtils.clamp(posRef.current.z, -BOUNDARY, BOUNDARY);
    }

    const t = performance.now() * 0.001;

    if (groupRef.current) {
      // base position
      groupRef.current.position.lerp(posRef.current, 0.2);

      // rotação normal
      groupRef.current.rotation.y = facingRef.current;

      const isMoving = move.lengthSq() > 0.0001;

      // 🌊 BOB (sempre existe, até parado)
      const bob = Math.sin(t * 1.8) * 0.14;
      groupRef.current.position.y = bob;

      // 🌊 ROLL (balanço lateral natural do mar)
      const idleRoll = Math.sin(t * 1.2) * 0.05;

      // 🌊 PITCH leve natural
      const idlePitch = Math.cos(t * 1.4) * 0.03;

      if (isMoving) {
        // movimento normalizado
        const dir = move.clone().normalize();

        // inclinação lateral ao virar
        const turnTilt = -dir.x * 0.35;

        // leve inclinação pra trás ao acelerar (IMPORTANTE: negativo)
        const forwardTilt = -dir.z * 0.15;

        groupRef.current.rotation.z = idleRoll + turnTilt;
        groupRef.current.rotation.x = idlePitch + forwardTilt;
      } else {
        // parado = só flutuando
        groupRef.current.rotation.z = idleRoll;
        groupRef.current.rotation.x = idlePitch;
      }
    }

    onPositionChange(posRef.current.clone());

    // Smooth isometric camera follow
    const camTarget = new THREE.Vector3(
      posRef.current.x + 20,
      20,
      posRef.current.z + 20
    );
    camera.position.lerp(camTarget, 0.07);
    camera.lookAt(posRef.current);
  });

  return (
    <>
      <group ref={groupRef} position={[0, 0, 0]}>
        <PirateShip />
      </group>
      {/* Rastro independente na cena, fora do grupo do barco */}
      <WakeTrail
        getPosition={() => {
          // 1. Usa a posição VISUAL (suavizada pelo lerp) do barco, não o posRef (alvo)
          const visualPos = groupRef.current
            ? groupRef.current.position.clone()
            : posRef.current.clone();

          // 2. A frente do navio é -Z no espaço local.
          // Portanto, a traseira é +Z. Rotacionando +Z pela direção atual (Y), temos:
          const backward = new THREE.Vector3(
            Math.sin(facingRef.current),
            0,
            Math.cos(facingRef.current)
          );

          // 3. Posiciona o rastro 1.2 unidades na direção da traseira
          return visualPos.add(backward.multiplyScalar(1.2));
        }}
      />
    </>
  );
}
