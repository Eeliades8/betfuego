"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const COUNT = 350;

export function FireParticles() {
  const mesh = useRef<THREE.Points>(null);

  const { positions, velocities, lifetimes, colors } = useMemo(() => {
    const positions = new Float32Array(COUNT * 3);
    const velocities = new Float32Array(COUNT * 3);
    const lifetimes = new Float32Array(COUNT);
    const colors = new Float32Array(COUNT * 3);

    const fireColors = [
      [1.0, 0.12, 0.0],  // deep red
      [0.91, 0.36, 0.0], // orange
      [1.0, 0.48, 0.0],  // orange-fire
      [1.0, 0.67, 0.0],  // amber
      [1.0, 0.85, 0.0],  // yellow-fire
    ];

    for (let i = 0; i < COUNT; i++) {
      const i3 = i * 3;
      positions[i3]     = (Math.random() - 0.5) * 6;
      positions[i3 + 1] = Math.random() * -8 - 2;
      positions[i3 + 2] = (Math.random() - 0.5) * 4;
      velocities[i3]     = (Math.random() - 0.5) * 0.025;
      velocities[i3 + 1] = Math.random() * 0.06 + 0.02;
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.015;
      lifetimes[i] = Math.random();

      const c = fireColors[Math.floor(Math.random() * fireColors.length)];
      colors[i3] = c[0]; colors[i3 + 1] = c[1]; colors[i3 + 2] = c[2];
    }
    return { positions, velocities, lifetimes, colors };
  }, []);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions.slice(), 3));
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    return geo;
  }, [positions, colors]);

  useFrame(() => {
    if (!mesh.current) return;
    const pos = mesh.current.geometry.attributes.position.array as Float32Array;

    for (let i = 0; i < COUNT; i++) {
      const i3 = i * 3;
      lifetimes[i] += 0.004;
      pos[i3]     += velocities[i3] + Math.sin(lifetimes[i] * 2.5 + i * 0.1) * 0.006;
      pos[i3 + 1] += velocities[i3 + 1];
      pos[i3 + 2] += velocities[i3 + 2];

      if (lifetimes[i] > 1 || pos[i3 + 1] > 7) {
        pos[i3]     = (Math.random() - 0.5) * 6;
        pos[i3 + 1] = -4;
        pos[i3 + 2] = (Math.random() - 0.5) * 4;
        lifetimes[i] = 0;
      }
    }
    mesh.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={mesh} geometry={geometry}>
      <pointsMaterial
        size={0.07}
        vertexColors
        transparent
        opacity={0.5}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}
