import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const GRID_SIZE = 120;
const SEGMENTS = 80;

/**
 * Animated ocean plane: vertex displacement via sin/cos waves on the CPU.
 * Simple & performant — no custom shaders needed.
 */
export default function OceanWater() {
  const meshRef = useRef<THREE.Mesh>(null);
  const timeRef = useRef(0);

  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(GRID_SIZE, GRID_SIZE, SEGMENTS, SEGMENTS);
    geo.rotateX(-Math.PI / 2);
    return geo;
  }, []);

  useFrame((_, delta) => {
    timeRef.current += delta * 0.55;
    const t = timeRef.current;
    const pos = geometry.attributes.position as THREE.BufferAttribute;
    const count = pos.count;

    for (let i = 0; i < count; i++) {
      const x = pos.getX(i);
      const z = pos.getZ(i);
      // Layered waves
      const y =
        Math.sin(x * 0.18 + t * 1.2) * 0.12 +
        Math.sin(z * 0.22 + t * 0.9) * 0.10 +
        Math.sin((x + z) * 0.14 + t * 1.5) * 0.07 +
        Math.cos(x * 0.09 - z * 0.11 + t * 0.7) * 0.05;
      pos.setY(i, y);
    }
    pos.needsUpdate = true;
    geometry.computeVertexNormals();
  });

  return (
    <mesh renderOrder={-1} ref={meshRef} geometry={geometry} receiveShadow position={[0, 0, 0]}>
      <meshPhysicalMaterial
        color="#0ea5e9"           // Azul base vibrante
        emissive="#0369a1"        // Um leve brilho interno para não ficar escuro demais
        emissiveIntensity={0.2}
        roughness={0.1}          // Água é reflexiva, mas as micro-ondas espalham a luz
        metalness={0.1}
        
        // --- O SEGREDO DO SEA OF THIEVES ---
        transmission={0.9}        // Faz a água parecer de vidro (substitui a necessidade de opacity)
        transparent={true}        // Necessário para a transmissão funcionar
        opacity={1}               // DEVE ser 1 quando usar transmission
        thickness={-1}           // Simula o "volume" da água. Quanto maior, mais a cor base domina
        
        // Opcional: Atenuação da luz simulando a profundidade
        attenuationColor="#93f1e2" 
        attenuationDistance={3.0} 
        
        depthWrite={false}
      />
    </mesh>
  );
}
