"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function RouletteWheel({ position = [0, 0, 0] as [number, number, number], scale = 1 }) {
  const wheel = useRef<THREE.Group>(null);
  const ball = useRef<THREE.Mesh>(null);
  const ballAngle = useRef(0);
  const t = useRef(0);

  useFrame((_, delta) => {
    t.current += delta;
    if (wheel.current) {
      wheel.current.rotation.z += delta * 0.9;
      wheel.current.rotation.x = Math.PI / 2 + Math.sin(t.current * 0.3) * 0.08;
    }
    ballAngle.current += delta * 3;
    if (ball.current) {
      const r = 1.7;
      ball.current.position.x = Math.cos(ballAngle.current) * r;
      ball.current.position.z = Math.sin(ballAngle.current) * r;
      ball.current.position.y = 0.18;
    }
  });

  return (
    <group position={position} scale={scale}>
      <group ref={wheel}>
        {/* Outer bowl */}
        <mesh>
          <cylinderGeometry args={[2.1, 2.1, 0.22, 64]} />
          <meshStandardMaterial color="#0D0D0D" metalness={0.98} roughness={0.04} />
        </mesh>

        {/* Inner track */}
        <mesh position={[0, 0.06, 0]}>
          <cylinderGeometry args={[1.85, 1.85, 0.12, 64]} />
          <meshStandardMaterial color="#1A1A1A" metalness={0.9} roughness={0.1} />
        </mesh>

        {/* Coloured pockets */}
        {Array.from({ length: 37 }).map((_, i) => {
          const angle = (i / 37) * Math.PI * 2;
          const isRed = i % 2 === 0;
          const color = i === 0 ? "#22C55E" : isRed ? "#CC1A1A" : "#111111";
          return (
            <mesh
              key={i}
              rotation={[0, angle, 0]}
              position={[Math.cos(angle) * 1.4, 0.12, Math.sin(angle) * 1.4]}
            >
              <boxGeometry args={[0.25, 0.08, 0.7]} />
              <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
            </mesh>
          );
        })}

        {/* Centre hub */}
        <mesh position={[0, 0.14, 0]}>
          <cylinderGeometry args={[0.28, 0.28, 0.18, 32]} />
          <meshStandardMaterial color="#D4A843" metalness={1} roughness={0.05} emissive="#D4A843" emissiveIntensity={0.8} />
        </mesh>
      </group>

      {/* Ball */}
      <mesh ref={ball} position={[1.7, 0.18, 0]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color="#F0F0F0" metalness={0.95} roughness={0.02} />
      </mesh>

      <pointLight color="#FF7A00" intensity={3} distance={6} position={[0, 1.5, 0]} />
      <pointLight color="#D4A843" intensity={1.5} distance={3} position={[0, 0.5, 0]} />
    </group>
  );
}
