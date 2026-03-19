import { GroupProps } from "@react-three/fiber";

type TreeProps = {
  color: string;
  position?: [number, number, number];
} & GroupProps;

export function Tree({ color, position = [0, 0, 0], ...props }: TreeProps) {

  const [x,,z] = position;

  return (
    <group>
       {/* Tronco */}
      <mesh castShadow position={[x, 1, z]}>
        <boxGeometry args={[0.3, 1, 0.3]} />
        <meshStandardMaterial color="#613f2c" roughness={0.5} metalness={0.15} />
      </mesh>
    {/* Folhas - base */}
      <mesh castShadow position={[x, 1.3, z]}>
        <boxGeometry args={[0.8, 0.6, 0.8]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.4} roughness={0.3} metalness={0.6} />
      </mesh>
      {/* Folhas - topo */}
      <mesh castShadow position={[x, 1.8, z]}>
        <boxGeometry args={[0.5, 0.4, 0.5]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.6} roughness={0.2} metalness={0.7} />
      </mesh>
    </group>
  );
}