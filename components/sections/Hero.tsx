"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";

const HeroScene = dynamic(
  () => import("@/components/3d/HeroScene").then((m) => m.HeroScene),
  { ssr: false }
);

export function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes tagFade {
          from { opacity: 0; letter-spacing: 8px; }
          to   { opacity: 1; letter-spacing: 5px; }
        }

        @keyframes logoIn {
          0%   { opacity: 0; transform: scale(0.88) translateY(24px); filter: blur(8px); }
          65%  { filter: blur(0); }
          82%  { transform: scale(1.03) translateY(-4px); }
          100% { opacity: 1; transform: scale(1) translateY(0); filter: blur(0); }
        }
        @keyframes logoPulse {
          0%, 100% { filter: drop-shadow(0 0 60px rgba(255,80,0,0.6)) drop-shadow(0 0 120px rgba(180,20,0,0.3)); }
          50%       { filter: drop-shadow(0 0 80px rgba(255,120,0,0.85)) drop-shadow(0 0 160px rgba(220,40,0,0.45)); }
        }
        .hero-logo {
          animation:
            logoIn    1s cubic-bezier(0.22,1,0.36,1) 0.3s both,
            logoPulse 3.5s ease-in-out 2s infinite;
        }
      `}</style>

      {/* 3D background */}
      <HeroScene />

      {/* Dark radial overlay */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 70% at 50% 50%, rgba(10,10,10,0.1) 0%, rgba(10,10,10,0.65) 65%, rgba(10,10,10,0.93) 100%)",
        }}
      />

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-48 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, #0A0A0A)" }}
      />

      {/* ── Content ── */}
      <div className="relative z-20 w-full flex flex-col items-center text-center px-4">

        {/* ── Full Logo — poker chip, hero centrepiece ── */}
        <div className="flex justify-center mb-0">
          <Image
            src="/logo-clean.png"
            alt="Bet Fuego"
            width={560}
            height={560}
            className="hero-logo object-contain"
            style={{ width: "min(82vw, 520px)", height: "auto" }}
            priority
          />
        </div>

        {/* Description */}
        <p
          className="text-[#777777] text-sm md:text-base mb-6 max-w-xs leading-relaxed"
          style={{ animation: "fadeUp 0.9s ease-out 1.8s both" }}
        >
          Casino online y apuestas deportivas. Más de 2,000 juegos y los mejores bonos de Argentina.
        </p>

        {/* CTAs */}
        <div
          className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto justify-center mb-8"
          style={{ animation: "fadeUp 0.9s ease-out 2.1s both" }}
        >
          <Link
            href="#registro"
            className="px-10 py-4 rounded-xl font-black text-base transition-all duration-300 hover:scale-105 active:scale-95 text-center"
            style={{
              background: "linear-gradient(90deg, #CC1A1A, #FF7A00, #FFAA00)",
              fontFamily: "var(--font-display)",
              letterSpacing: "2px",
              boxShadow: "0 0 40px rgba(255,122,0,0.5), 0 0 80px rgba(204,26,26,0.25)",
            }}
          >
            REGÍSTRATE AHORA
          </Link>
          <Link
            href="#juegos"
            className="px-8 py-4 rounded-xl font-bold text-base border transition-all duration-300 hover:scale-105 active:scale-95 hover:bg-white/5 text-center backdrop-blur-sm"
            style={{
              borderColor: "rgba(255,122,0,0.4)",
              fontFamily: "var(--font-display)",
              letterSpacing: "2px",
              color: "var(--silver)",
            }}
          >
            VER JUEGOS
          </Link>
        </div>

        {/* Stats */}
        <div
          className="flex justify-center gap-8 md:gap-14"
          style={{ animation: "fadeUp 1s ease-out 2.4s both" }}
        >
          {[
            { value: "2,000+", label: "Juegos" },
            { value: "24/7",   label: "Soporte" },
            { value: "$50K",   label: "Bono Máx." },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  background: "linear-gradient(90deg, #FF7A00, #FFAA00)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
                className="text-xl md:text-2xl font-black"
              >
                {stat.value}
              </div>
              <div
                style={{ fontFamily: "var(--font-mono)", letterSpacing: "2px" }}
                className="text-[10px] text-[#555555] uppercase mt-0.5"
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 animate-bounce">
        <div style={{ fontFamily: "var(--font-mono)", letterSpacing: "3px" }} className="text-[10px] text-[#555555] uppercase">
          Scroll
        </div>
        <div className="w-px h-8 bg-gradient-to-b from-[#FF7A00] to-transparent" />
      </div>
    </section>
  );
}
