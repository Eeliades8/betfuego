"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const CHIPS = [
  { pos: [-4.5, -1.8, -2] as [number, number, number], rot: 0.4, color: "#CC1A1A", speed: 0.15 },
  { pos: [-3.0, -2.8, -3] as [number, number, number], rot: 1.1, color: "#D4A843", speed: 0.10 },
  { pos: [2.5, -2.5, -3.5] as [number, number, number], rot: 0.7, color: "#3B82F6", speed: 0.12 },
  { pos: [4.2, -1.5, -2] as [number, number, number], rot: 1.8, color: "#22C55E", speed: 0.18 },
  { pos: [1.0, -3.5, -4] as [number, number, number], rot: 0.3, color: "#CC1A1A", speed: 0.08 },
];

function Chip({ pos, rot, color, speed }: (typeof CHIPS)[0]) {
  const ref = useRef<THREE.Group>(null);
  const t = useRef(Math.random() * 10);

  useFrame((_, delta) => {
    if (!ref.current) return;
    t.current += delta;
    ref.current.rotation.y += delta * speed;
    ref.current.position.y = pos[1] + Math.sin(t.current * 0.6) * 0.12;
  });

  return (
    <group ref={ref} position={pos} rotation={[rot, 0, 0]}>
      {/* Main chip disc */}
      <mesh>
        <cylinderGeometry args={[0.55, 0.55, 0.1, 32]} />
        <meshStandardMaterial color={color} metalness={0.4} roughness={0.5} />
      </mesh>
      {/* Edge ring */}
      <mesh>
        <torusGeometry args={[0.55, 0.045, 8, 32]} />
        <meshStandardMaterial color="#E0E0E0" metalness={0.9} roughness={0.1} />
      </mesh>
      {/* Centre dot */}
      <mesh position={[0, 0.06, 0]}>
        <cylinderGeometry args={[0.18, 0.18, 0.01, 16]} />
        <meshStandardMaterial color="#FFFFFF" metalness={0.5} roughness={0.3} emissive="#FFFFFF" emissiveIntensity={0.3} />
      </mesh>
      <pointLight color={color} intensity={1.5} distance={2.5} position={[0, 0.3, 0]} />
    </group>
  );
}

export function PokerChips() {
  return (
    <>
      {CHIPS.map((chip, i) => (
        <Chip key={i} {...chip} />
      ))}
    </>
  );
}
