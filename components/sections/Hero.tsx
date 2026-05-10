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
        @keyframes tagFade {
          from { opacity: 0; letter-spacing: 8px; }
          to   { opacity: 1; letter-spacing: 5px; }
        }
        .hero-tagline { animation: tagFade 1s ease-out 1.6s both; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @keyframes logoIn {
          0%   { opacity: 0; transform: translateY(32px) scale(0.92); filter: blur(6px); }
          60%  { filter: blur(0); }
          80%  { transform: translateY(-6px) scale(1.02); }
          100% { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
        }
        .hero-logo {
          animation: logoIn 0.9s cubic-bezier(0.22,1,0.36,1) 0.4s both;
          filter: drop-shadow(0 0 48px rgba(255,90,0,0.55)) drop-shadow(0 0 100px rgba(200,20,0,0.28));
        }
        @keyframes logoPulse {
          0%, 100% { filter: drop-shadow(0 0 48px rgba(255,90,0,0.55)) drop-shadow(0 0 100px rgba(200,20,0,0.28)); }
          50%       { filter: drop-shadow(0 0 64px rgba(255,120,0,0.75)) drop-shadow(0 0 130px rgba(220,40,0,0.40)); }
        }
        .hero-logo { animation: logoIn 0.9s cubic-bezier(0.22,1,0.36,1) 0.4s both, logoPulse 3s ease-in-out 2s infinite; }
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
      <div className="relative z-20 w-full flex flex-col items-center text-center px-4 max-w-4xl mx-auto">

        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 mb-10 px-4 py-1.5 rounded-full border border-[#FF7A00]/30 bg-[#FF7A00]/10 backdrop-blur-sm"
          style={{ animation: "tagFade 0.8s ease-out 0.2s both" }}
        >
          <span className="w-2 h-2 rounded-full bg-[#FF7A00] animate-pulse flex-shrink-0" />
          <span style={{ fontFamily: "var(--font-mono)", letterSpacing: "3px" }} className="text-xs text-[#FF7A00] uppercase">
            Próximamente · Argentina
          </span>
        </div>

        {/* ── Full Logo — poker chip centered ── */}
        <div className="mb-2 flex justify-center">
          <Image
            src="/logo-clean.png"
            alt="Bet Fuego"
            width={460}
            height={460}
            className="hero-logo object-contain w-[280px] sm:w-[360px] md:w-[460px]"
            priority
          />
        </div>

        {/* Tagline */}
        <p
          className="hero-tagline text-sm mb-8"
          style={{ fontFamily: "var(--font-body)", fontStyle: "italic", letterSpacing: "5px", color: "var(--gold)" }}
        >
          Ignite Your Game
        </p>

        {/* Description */}
        <p
          className="text-[#777777] text-sm md:text-base mb-8 max-w-sm leading-relaxed"
          style={{ animation: "fadeUp 0.9s ease-out 2.2s both" }}
        >
          Casino online y apuestas deportivas. Más de 2,000 juegos y los mejores bonos de Argentina.
        </p>

        {/* CTAs */}
        <div
          className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto justify-center"
          style={{ animation: "fadeUp 0.9s ease-out 2.4s both" }}
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
          className="mt-8 flex justify-center gap-8 md:gap-14"
          style={{ animation: "tagFade 1s ease-out 2.6s both" }}
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
