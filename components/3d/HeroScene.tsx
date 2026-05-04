"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, Stars, Float, Sparkles } from "@react-three/drei";
import { FireParticles } from "./FireParticles";
import { SpinningDie } from "./SpinningDie";
import { Suspense } from "react";

function SceneContent() {
  return (
    <>
      <ambientLight intensity={0.12} color="#FF3300" />
      <directionalLight position={[5, 8, 4]} intensity={1.0} color="#FF7A00" />
      <pointLight position={[-7, 2, -3]} intensity={3.5} color="#CC1A1A" distance={16} />
      <pointLight position={[0, -5, 0]} intensity={5} color="#E85D00" distance={12} />

      <Stars radius={100} depth={60} count={3500} factor={3} fade speed={0.4} />

      <Sparkles
        count={100}
        scale={[16, 10, 8]}
        size={1.4}
        speed={0.3}
        opacity={0.55}
        color="#FF7A00"
      />

      <FireParticles />

      {/* Left die — pushed out and down */}
      <Float speed={1.2} floatIntensity={0.5}>
        <SpinningDie
          position={[-5.5, -1.2, -1.5]}
          scale={1.3}
          speedX={0.3}
          speedY={0.45}
          glowColor="#CC1A1A"
        />
      </Float>

      {/* Right die — pushed out and down */}
      <Float speed={0.9} floatIntensity={0.5}>
        <SpinningDie
          position={[5.5, -1.5, -1.8]}
          scale={1.2}
          speedX={0.4}
          speedY={0.55}
          glowColor="#FF7A00"
        />
      </Float>

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
