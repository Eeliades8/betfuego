"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function CTASection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      ".cta-content",
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
      }
    );
  });

  return (
    <section ref={sectionRef} id="registro" className="relative py-20 md:py-32 px-4 md:px-8 overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at center, rgba(255,122,0,0.12) 0%, rgba(204,26,26,0.06) 40%, transparent 70%)",
        }}
      />

      {/* Fire border top */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, #CC1A1A, #FF7A00, #FFAA00, #FF7A00, #CC1A1A, transparent)" }}
      />

      <div className="cta-content max-w-3xl mx-auto text-center relative">

        {/* Logo above CTA */}
        <div className="flex justify-center mb-4">
          <Image
            src="/logo-clean.png"
            alt="Bet Fuego"
            width={420}
            height={420}
            className="object-contain w-[260px] sm:w-[340px] md:w-[420px]"
          />
        </div>

        <div
          style={{ fontFamily: "var(--font-mono)", letterSpacing: "4px" }}
          className="text-xs text-[#FF7A00] uppercase mb-4"
        >
          05 — Únete ahora
        </div>

        <h2
          style={{ fontFamily: "var(--font-display)", letterSpacing: "2px" }}
          className="text-3xl sm:text-5xl md:text-6xl font-black mb-6"
        >
          <span className="text-[#E0E0E0]">ENCIENDE </span>
          <span className="text-fire glow-fire">TU JUEGO</span>
        </h2>

        <p
          style={{ fontStyle: "italic", color: "var(--gold)", letterSpacing: "3px" }}
          className="text-lg mb-8"
        >
          Ignite Your Game
        </p>

        <p className="text-[#888888] mb-12 max-w-lg mx-auto leading-relaxed">
          Unite hoy y recibí hasta <strong className="text-[#FF7A00]">$50,000 ARS</strong> en bonos de bienvenida.
          Sin complicaciones. Solo jugar y ganar.
        </p>

        {/* Steps */}
        <div className="grid grid-cols-3 gap-4 mb-12">
          {[
            { step: "01", label: "Registrate", desc: "1 minuto" },
            { step: "02", label: "Depositá", desc: "Mín. $500 ARS" },
            { step: "03", label: "Jugá", desc: "Y ganá" },
          ].map((s) => (
            <div key={s.step} className="text-center">
              <div
                style={{ fontFamily: "var(--font-display)", letterSpacing: "2px" }}
                className="text-2xl font-black text-fire mb-1"
              >
                {s.step}
              </div>
              <div className="text-sm font-semibold text-[#E0E0E0] mb-0.5">{s.label}</div>
              <div style={{ fontFamily: "var(--font-mono)" }} className="text-xs text-[#555555]">{s.desc}</div>
            </div>
          ))}
        </div>

        <a
          href="#"
          className="inline-block px-16 py-5 rounded-xl font-black text-xl transition-all duration-300 hover:scale-105 active:scale-95"
          style={{
            background: "linear-gradient(90deg, #CC1A1A, #FF7A00, #FFAA00)",
            fontFamily: "var(--font-display)",
            letterSpacing: "3px",
            boxShadow: "0 0 60px rgba(255,122,0,0.4), 0 0 120px rgba(204,26,26,0.2)",
          }}
        >
          EMPEZAR AHORA
        </a>

        <p className="mt-6 text-xs text-[#555555]">
          +18 | Juego responsable | Solo para residentes de Argentina
        </p>
      </div>
    </section>
  );
}
