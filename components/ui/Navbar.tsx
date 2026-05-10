"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? "rgba(10,10,10,0.92)" : "rgba(10,10,10,0.3)",
        backdropFilter: "blur(16px)",
        borderBottom: scrolled ? "1px solid rgba(255,122,0,0.15)" : "1px solid transparent",
      }}
    >
      {/* 3-column grid: nav links | centered logo | buttons */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-20 grid grid-cols-3 items-center">

        {/* Left — nav links */}
        <div className="hidden md:flex items-center gap-8">
          {[
            { label: "Casino", href: "#juegos" },
            { label: "Deportes", href: "#deportes" },
            { label: "Bonos", href: "#bonos" },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              style={{ fontFamily: "var(--font-accent)", letterSpacing: "2px" }}
              className="text-sm font-bold uppercase text-[#888888] hover:text-[#FF7A00] transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
        {/* Mobile: empty left col */}
        <div className="md:hidden" />

        {/* Center — logo */}
        <Link href="/" className="flex justify-center items-center">
          <Image
            src="/logo-text.png"
            alt="Bet Fuego"
            width={220}
            height={74}
            className="object-contain"
            priority
          />
        </Link>

        {/* Right — buttons */}
        <div className="flex items-center justify-end gap-3">
          <a
            href="#registro"
            className="hidden md:block px-4 py-2 text-sm font-bold text-[#888888] hover:text-[#E0E0E0] transition-colors"
            style={{ fontFamily: "var(--font-display)", letterSpacing: "1px" }}
          >
            Iniciar sesión
          </a>
          <a
            href="#registro"
            className="px-4 py-2 rounded-lg text-xs md:text-sm font-bold transition-all hover:scale-105 active:scale-95 whitespace-nowrap"
            style={{
              background: "linear-gradient(90deg, #CC1A1A, #FF7A00)",
              fontFamily: "var(--font-display)",
              letterSpacing: "1px",
              boxShadow: "0 0 20px rgba(255,122,0,0.35)",
            }}
          >
            Registrarse
          </a>
        </div>
      </div>
    </nav>
  );
}
