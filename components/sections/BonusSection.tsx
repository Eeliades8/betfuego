"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const bonuses = [
  {
    tag: "Bienvenida",
    title: "100% hasta $50,000",
    desc: "En tu primer depósito. Válido para casino y deportes.",
    color: "#E52222",
    icon: "🎁",
  },
  {
    tag: "Deportes",
    title: "Apuesta Gratis $5,000",
    desc: "Sin depósito. Solo regístrate y juega.",
    color: "#FF7A00",
    icon: "⚽",
  },
  {
    tag: "VIP",
    title: "Cashback 15% Semanal",
    desc: "Recupera hasta el 15% de tus pérdidas cada semana.",
    color: "#D4A843",
    icon: "👑",
  },
];

export function BonusSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      contentRef.current?.querySelectorAll(".bonus-card") ?? [],
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      }
    );
  });

  return (
    <section ref={sectionRef} className="relative py-20 md:py-32 px-4 md:px-8 overflow-hidden">
      {/* Fire line top */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, #CC1A1A, #FF7A00, #FFAA00, #FF7A00, #CC1A1A, transparent)" }}
      />

      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "linear-gradient(180deg, var(--surface) 0%, var(--black) 100%)" }}
      />

      <div className="max-w-6xl mx-auto relative">
        <div className="text-center mb-16">
          <div
            style={{ fontFamily: "var(--font-mono)", letterSpacing: "4px" }}
            className="text-xs text-[#FF7A00] uppercase mb-4"
          >
            03 — Bonos
          </div>
          <h2
            style={{ fontFamily: "var(--font-display)", letterSpacing: "2px" }}
            className="text-2xl sm:text-4xl md:text-5xl font-bold mb-6"
          >
            <span className="text-fire">BONOS</span>{" "}
            <span className="text-[#E0E0E0]">EXCLUSIVOS</span>
          </h2>
          <div className="w-12 h-1 mx-auto rounded-full" style={{ background: "linear-gradient(90deg, #CC1A1A, #FF7A00)" }} />
        </div>

        <div ref={contentRef} className="grid md:grid-cols-3 gap-6">
          {bonuses.map((bonus) => (
            <div
              key={bonus.title}
              className="bonus-card relative rounded-2xl p-8 group overflow-hidden cursor-pointer"
              style={{
                background: "var(--surface-2)",
                border: `1px solid ${bonus.color}33`,
              }}
            >
              {/* Corner glow */}
              <div
                className="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-500 blur-2xl"
                style={{ background: bonus.color }}
              />

              <div className="relative">
                <span className="text-4xl">{bonus.icon}</span>
                <div
                  className="inline-block mt-4 mb-2 px-3 py-1 rounded-full text-xs font-bold uppercase"
                  style={{
                    background: `${bonus.color}22`,
                    color: bonus.color,
                    fontFamily: "var(--font-mono)",
                    letterSpacing: "2px",
                  }}
                >
                  {bonus.tag}
                </div>
                <h3
                  style={{ fontFamily: "var(--font-display)", letterSpacing: "1px", color: bonus.color }}
                  className="text-2xl font-black mb-3"
                >
                  {bonus.title}
                </h3>
                <p className="text-[#888888] text-sm leading-relaxed">{bonus.desc}</p>

                <button
                  className="mt-6 w-full py-3 rounded-lg font-bold text-sm transition-all duration-300 hover:brightness-110"
                  style={{
                    background: `linear-gradient(90deg, ${bonus.color}99, ${bonus.color})`,
                    fontFamily: "var(--font-display)",
                    letterSpacing: "2px",
                  }}
                >
                  RECLAMAR
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fire line bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, #CC1A1A, #FF7A00, #FFAA00, #FF7A00, #CC1A1A, transparent)" }}
      />
    </section>
  );
}
