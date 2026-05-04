"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";

type DieProps = {
  position?: [number, number, number];
  scale?: number;
  speedX?: number;
  speedY?: number;
  glowColor?: string;
};

// Dot positions for each face of a 1.8-unit die (half = 0.9)
const DOT_POSITIONS: [number, number, number][] = [
  // Front face (z=+0.92) — 6 dots
  [-0.40,  0.40, 0.92], [ 0.40,  0.40, 0.92],
  [-0.40,  0.00, 0.92], [ 0.40,  0.00, 0.92],
  [-0.40, -0.40, 0.92], [ 0.40, -0.40, 0.92],

  // Back face (z=-0.92) — 1 dot
  [0, 0, -0.92],

  // Top face (y=+0.92) — 2 dots
  [-0.28, 0.92,  0.28], [ 0.28, 0.92, -0.28],

  // Bottom face (y=-0.92) — 5 dots
  [-0.38, -0.92,  0.38], [ 0.38, -0.92,  0.38],
  [  0,   -0.92,   0  ],
  [-0.38, -0.92, -0.38], [ 0.38, -0.92, -0.38],

  // Right face (x=+0.92) — 3 dots
  [ 0.92,  0.38,  0.30],
  [ 0.92,  0.00,  0.00],
  [ 0.92, -0.38, -0.30],

  // Left face (x=-0.92) — 4 dots
  [-0.92,  0.32,  0.32], [-0.92,  0.32, -0.32],
  [-0.92, -0.32,  0.32], [-0.92, -0.32, -0.32],
];

export function SpinningDie({
  position = [0, 0, 0],
  scale = 1,
  speedX = 0.4,
  speedY = 0.6,
  glowColor = "#FF7A00",
}: DieProps) {
  const group = useRef<THREE.Group>(null);
  const t = useRef(0);

  useFrame((_, delta) => {
    if (!group.current) return;
    t.current += delta;
    group.current.rotation.x += delta * speedX;
    group.current.rotation.y += delta * speedY;
    group.current.position.y = position[1] + Math.sin(t.current * 0.7) * 0.15;
  });

  return (
    <group ref={group} position={position} scale={scale}>
      {/* Die body */}
      <RoundedBox args={[1.8, 1.8, 1.8]} radius={0.14} smoothness={4}>
        <meshStandardMaterial
          color="#111111"
          metalness={0.95}
          roughness={0.08}
          envMapIntensity={1.5}
        />
      </RoundedBox>

      {/* Glowing edge outline */}
      <RoundedBox args={[1.84, 1.84, 1.84]} radius={0.14} smoothness={4}>
        <meshBasicMaterial
          color={glowColor}
          transparent
          opacity={0.06}
          side={THREE.BackSide}
        />
      </RoundedBox>

      {/* Dots on all 6 faces */}
      {DOT_POSITIONS.map((p, i) => (
        <mesh key={i} position={p}>
          <sphereGeometry args={[0.09, 10, 10]} />
          <meshStandardMaterial
            color={glowColor}
            emissive={glowColor}
            emissiveIntensity={3}
            toneMapped={false}
          />
        </mesh>
      ))}

      {/* Inner glow */}
      <pointLight color={glowColor} intensity={4} distance={3} />
    </group>
  );
}
