"use client";

import Image from "next/image";

type Props = {
  size?: number;
  className?: string;
};

// autobot.png is 486×675 (face-only crop, ~0.72 aspect ratio wide:tall)
const ASPECT = 486 / 675; // ≈ 0.72

export function AnimatedLogo({ size = 260, className = "" }: Props) {
  const w = Math.round(size * ASPECT);
  const h = size;

  return (
    <div
      className={`relative flex items-center justify-center ${className}`}
      style={{ width: w, height: h }}
    >
      <style>{`
        @keyframes logoFadeIn {
          0%   { opacity: 0; transform: scale(0.65); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes logoFloat {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-10px); }
        }
        @keyframes ambientPulse {
          0%, 100% { opacity: 0.35; transform: scale(1); }
          50%       { opacity: 0.55; transform: scale(1.06); }
        }
        .logo-image-wrap {
          animation:
            logoFadeIn 1.4s cubic-bezier(0.16,1,0.3,1) 0.3s both,
            logoFloat  3.5s ease-in-out 1.8s infinite;
        }
      `}</style>

      {/* Soft ambient glow */}
      <div
        style={{
          position: "absolute",
          inset: "8%",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(180,20,0,0.30) 0%, rgba(255,60,0,0.12) 55%, transparent 80%)",
          filter: "blur(18px)",
          animation: "ambientPulse 3.2s ease-in-out infinite",
        }}
      />

      {/* Autobot icon — mask fades the right edge to hide any flame remnants */}
      <div
        className="logo-image-wrap relative z-10"
        style={{ width: w, height: h }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            position: "relative",
            // Fade out the rightmost 20% to cleanly eliminate any side flame pixels
            WebkitMaskImage: "linear-gradient(to right, black 68%, transparent 92%)",
            maskImage: "linear-gradient(to right, black 68%, transparent 92%)",
            filter: "drop-shadow(0 0 10px rgba(180,20,0,0.55)) drop-shadow(0 0 5px rgba(255,50,0,0.35)) brightness(1.05)",
          }}
        >
          <Image
            src="/autobot.png"
            alt="Bet Fuego"
            fill
            className="object-contain object-left"
            priority
          />
        </div>
      </div>
    </div>
  );
}
