"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, Stars, Sparkles } from "@react-three/drei";
import { FireParticles } from "./FireParticles";
import { Suspense } from "react";

function SceneContent() {
  return (
    <>
      <ambientLight intensity={0.12} color="#FF3300" />
      <directionalLight position={[5, 8, 4]} intensity={1.0} color="#FF7A00" />
      <pointLight position={[-7, 2, -3]} intensity={3.5} color="#CC1A1A" distance={16} />
      <pointLight position={[0, -5, 0]} intensity={5} color="#E85D00" distance={12} />

      <Stars radius={100} depth={60} count={2000} factor={1.2} fade speed={0.3} />

      <Sparkles
        count={55}
        scale={[16, 10, 8]}
        size={0.7}
        speed={0.2}
        opacity={0.22}
        color="#FF9500"
      />

      <FireParticles />

      <Environment preset="night" />
    </>
  );
}

export function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 1.0, 9], fov: 58 }}
      style={{ position: "absolute", inset: 0 }}
      gl={{ antialias: true, alpha: true, toneMapping: 4 }}
      dpr={[1, 2]}
    >
      <Suspense fallback={null}>
        <SceneContent />
      </Suspense>
    </Canvas>
  );
}
