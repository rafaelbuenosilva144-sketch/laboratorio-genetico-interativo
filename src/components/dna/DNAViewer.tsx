import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float } from "@react-three/drei";
import * as THREE from "three";
import { basePairs } from "../../data/genetics";

const baseColors: Record<string, string> = {
  A: "#00E5FF",
  T: "#8B5CF6",
  C: "#38BDF8",
  G: "#F59E0B"
};

const PairRod = ({
  start,
  end
}: {
  start: [number, number, number];
  end: [number, number, number];
}) => {
  const center = useMemo(
    () =>
      new THREE.Vector3(
        (start[0] + end[0]) / 2,
        (start[1] + end[1]) / 2,
        (start[2] + end[2]) / 2
      ),
    [start, end]
  );

  const vectorStart = useMemo(() => new THREE.Vector3(...start), [start]);
  const vectorEnd = useMemo(() => new THREE.Vector3(...end), [end]);

  const direction = useMemo(() => vectorEnd.clone().sub(vectorStart), [vectorEnd, vectorStart]);
  const length = direction.length();

  const quaternion = useMemo(() => {
    const axis = new THREE.Vector3(0, 1, 0);
    return new THREE.Quaternion().setFromUnitVectors(axis, direction.clone().normalize());
  }, [direction]);

  return (
    <mesh position={center} quaternion={quaternion}>
      <cylinderGeometry args={[0.04, 0.04, length, 12]} />
      <meshStandardMaterial color="#ffffff" emissive="#00E5FF" emissiveIntensity={0.2} />
    </mesh>
  );
};

const DNAGroup = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.2;
    }
  });

  const pairs = useMemo(
    () =>
      basePairs.map((pair, index) => {
        const angle = index * 0.62;
        const y = index * 0.48 - 2.6;
        const radius = 1.25;
        const left: [number, number, number] = [
          Math.cos(angle) * radius,
          y,
          Math.sin(angle) * radius
        ];
        const right: [number, number, number] = [
          Math.cos(angle + Math.PI) * radius,
          y,
          Math.sin(angle + Math.PI) * radius
        ];
        return { pair, left, right };
      }),
    []
  );

  return (
    <group ref={groupRef}>
      {pairs.map(({ pair, left, right }, index) => (
        <group key={index}>
          <mesh position={left}>
            <sphereGeometry args={[0.15, 24, 24]} />
            <meshStandardMaterial color={baseColors[pair[0]]} emissive={baseColors[pair[0]]} emissiveIntensity={0.7} />
          </mesh>
          <mesh position={right}>
            <sphereGeometry args={[0.15, 24, 24]} />
            <meshStandardMaterial color={baseColors[pair[1]]} emissive={baseColors[pair[1]]} emissiveIntensity={0.7} />
          </mesh>
          <PairRod start={left} end={right} />
        </group>
      ))}
    </group>
  );
};

export const DNAViewer = () => {
  return (
    <div className="h-[380px] overflow-hidden rounded-3xl border border-white/10 bg-black/20">
      <Canvas camera={{ position: [0, 0, 6.8], fov: 48 }}>
        <color attach="background" args={["#050816"]} />
        <ambientLight intensity={1.3} />
        <pointLight intensity={40} position={[0, 2, 3]} color="#00E5FF" />
        <pointLight intensity={20} position={[2, 0, -2]} color="#8B5CF6" />
        <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.3}>
          <DNAGroup />
        </Float>
        <OrbitControls enablePan={false} minDistance={4.8} maxDistance={10} />
      </Canvas>
    </div>
  );
};
