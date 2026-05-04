"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const liveMatches = [
  { teams: "River Plate vs Boca Juniors", sport: "⚽ Fútbol", odds: ["2.10", "3.40", "3.15"], live: true },
  { teams: "Argentina vs Brasil", sport: "⚽ Copa América", odds: ["1.95", "3.60", "3.80"], live: true },
  { teams: "Lakers vs Warriors", sport: "🏀 NBA", odds: ["1.75", "3.20", "4.10"], live: false },
];

export function SportsBetting() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      ".match-row",
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.12,
        ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
      }
    );

    gsap.fromTo(
      ".sports-heading",
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
      }
    );
  });

  return (
    <section ref={sectionRef} id="deportes" className="relative py-20 md:py-32 px-4 md:px-8 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 80% 50%, rgba(204,26,26,0.06) 0%, transparent 60%)",
        }}
      />

      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left: heading + description */}
          <div className="sports-heading">
            <div
              style={{ fontFamily: "var(--font-mono)", letterSpacing: "4px" }}
              className="text-xs text-[#FF7A00] uppercase mb-4"
            >
              04 — Deportes
            </div>
            <h2
              style={{ fontFamily: "var(--font-display)", letterSpacing: "2px" }}
              className="text-2xl sm:text-4xl md:text-5xl font-bold mb-6"
            >
              <span className="text-[#E0E0E0]">APUESTAS </span>
              <br />
              <span className="text-fire">EN VIVO</span>
            </h2>
            <div className="w-12 h-1 rounded-full mb-8" style={{ background: "linear-gradient(90deg, #CC1A1A, #FF7A00)" }} />
            <p className="text-[#888888] leading-relaxed mb-8">
              Apostá en tiempo real en más de 40 deportes. Fútbol argentino,
              Champions League, NBA, tenis y mucho más con las mejores cuotas del mercado.
            </p>
            <ul className="space-y-3">
              {["Cuotas en tiempo real", "Cash out disponible", "Estadísticas en vivo", "Streaming gratis"].map((f) => (
                <li key={f} className="flex items-center gap-3 text-[#AAAAAA] text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF7A00] flex-shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
          </div>

          {/* Right: live odds widget */}
          <div className="space-y-3">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <span style={{ fontFamily: "var(--font-mono)", letterSpacing: "2px" }} className="text-xs text-[#555555] uppercase">
                Partidos destacados
              </span>
              <span className="flex items-center gap-1.5 text-xs text-[#22C55E]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse" />
                En vivo
              </span>
            </div>

            {liveMatches.map((match) => (
              <div
                key={match.teams}
                className="match-row rounded-xl p-4 transition-all duration-300 hover:border-[#FF7A00]/30 cursor-pointer group"
                style={{
                  background: "var(--surface-2)",
                  border: "1px solid rgba(255,255,255,0.05)",
                }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      {match.live && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#E52222]/20 text-[#E52222] font-bold uppercase" style={{ fontFamily: "var(--font-mono)", letterSpacing: "1px" }}>
                          Live
                        </span>
                      )}
                      <span className="text-xs text-[#555555]" style={{ fontFamily: "var(--font-mono)" }}>
                        {match.sport}
                      </span>
                    </div>
                    <p className="text-sm font-semibold text-[#E0E0E0]">{match.teams}</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {["1", "X", "2"].map((label, i) => (
                    <button
                      key={label}
                      className="py-2 rounded-lg text-center transition-all duration-200 hover:scale-105 active:scale-95"
                      style={{
                        background: "var(--surface-3)",
                        border: "1px solid rgba(255,122,0,0.15)",
                      }}
                    >
                      <div className="text-[10px] text-[#555555]" style={{ fontFamily: "var(--font-mono)" }}>{label}</div>
                      <div className="text-sm font-bold text-[#FF7A00]">{match.odds[i]}</div>
                    </button>
                  ))}
                </div>
              </div>
            ))}

            <button
              className="w-full py-3 rounded-xl text-sm font-bold transition-all hover:brightness-110"
              style={{
                background: "linear-gradient(90deg, #7F1D1D, #CC1A1A)",
                fontFamily: "var(--font-display)",
                letterSpacing: "2px",
              }}
            >
              VER TODOS LOS PARTIDOS
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
