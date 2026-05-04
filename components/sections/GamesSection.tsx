"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const games = [
  { icon: "🎰", name: "Slots", count: "1,200+", color: "#E52222" },
  { icon: "🎲", name: "Casino en Vivo", count: "150+", color: "#FF7A00" },
  { icon: "⚽", name: "Fútbol", count: "500+ partidos", color: "#FFAA00" },
  { icon: "🃏", name: "Poker", count: "30+ mesas", color: "#D4A843" },
  { icon: "🏈", name: "Deportes", count: "40+ deportes", color: "#CC1A1A" },
  { icon: "🎡", name: "Ruleta", count: "25+ variantes", color: "#FF7A00" },
];

export function GamesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const cards = cardsRef.current?.querySelectorAll(".game-card");
    if (!cards) return;

    gsap.fromTo(
      cards,
      { y: 80, opacity: 0, scale: 0.9 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.7,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      }
    );
  });

  return (
    <section ref={sectionRef} id="juegos" className="relative py-20 md:py-32 px-4 md:px-8 overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(255,122,0,0.06) 0%, transparent 60%)",
        }}
      />

      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <div
            style={{ fontFamily: "var(--font-mono)", letterSpacing: "4px" }}
            className="text-xs text-[#FF7A00] uppercase mb-4"
          >
            02 — Plataforma
          </div>
          <h2
            style={{ fontFamily: "var(--font-display)", letterSpacing: "2px" }}
            className="text-2xl sm:text-4xl md:text-5xl font-bold mb-6"
          >
            <span className="text-[#E0E0E0]">NUESTROS </span>
            <span className="text-fire">JUEGOS</span>
          </h2>
          <div className="w-12 h-1 mx-auto rounded-full" style={{ background: "linear-gradient(90deg, #CC1A1A, #FF7A00)" }} />
          <p className="mt-6 text-[#888888] max-w-xl mx-auto">
            La mayor variedad de juegos de casino y apuestas deportivas de Argentina, disponibles 24/7.
          </p>
        </div>

        {/* Cards grid */}
        <div ref={cardsRef} className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {games.map((game) => (
            <div
              key={game.name}
              className="game-card group relative rounded-2xl p-6 md:p-8 cursor-pointer transition-all duration-300 hover:scale-105"
              style={{
                background: "var(--surface-2)",
                border: "1px solid rgba(255,255,255,0.04)",
              }}
            >
              {/* Hover glow */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ boxShadow: `inset 0 0 30px ${game.color}22, 0 0 30px ${game.color}11` }}
              />

              <div className="text-4xl mb-4">{game.icon}</div>
              <h3
                style={{ fontFamily: "var(--font-accent)", letterSpacing: "1px", color: game.color }}
                className="text-lg font-bold uppercase mb-1"
              >
                {game.name}
              </h3>
              <p style={{ fontFamily: "var(--font-mono)" }} className="text-sm text-[#555555]">
                {game.count}
              </p>

              {/* Bottom accent line */}
              <div
                className="absolute bottom-0 left-4 right-4 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: `linear-gradient(90deg, transparent, ${game.color}, transparent)` }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
