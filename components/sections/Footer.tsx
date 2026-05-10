import Image from "next/image";

export function Footer() {
  return (
    <footer className="relative border-t py-16 px-4 md:px-8" style={{ borderColor: "rgba(255,122,0,0.1)", background: "var(--surface)" }}>
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Image
              src="/logo-text.png"
              alt="Bet Fuego"
              width={180}
              height={61}
              className="object-contain mb-2"
            />
            <p className="text-[#555555] text-sm leading-relaxed max-w-xs">
              Plataforma de casino online y apuestas deportivas autorizada para operar en la República Argentina.
            </p>
          </div>

          {/* Casino links */}
          <div>
            <h4
              style={{ fontFamily: "var(--font-accent)", letterSpacing: "2px", color: "var(--orange-fire)" }}
              className="text-sm font-bold uppercase mb-4"
            >
              Casino
            </h4>
            <ul className="space-y-2 text-sm text-[#555555]">
              {["Slots", "Ruleta", "Blackjack", "Casino en Vivo", "Poker"].map((l) => (
                <li key={l}><a href="#" className="hover:text-[#FF7A00] transition-colors">{l}</a></li>
              ))}
            </ul>
          </div>

          {/* Sports links */}
          <div>
            <h4
              style={{ fontFamily: "var(--font-accent)", letterSpacing: "2px", color: "var(--orange-fire)" }}
              className="text-sm font-bold uppercase mb-4"
            >
              Deportes
            </h4>
            <ul className="space-y-2 text-sm text-[#555555]">
              {["Fútbol", "Tenis", "Básquet", "Rugby", "eSports"].map((l) => (
                <li key={l}><a href="#" className="hover:text-[#FF7A00] transition-colors">{l}</a></li>
              ))}
            </ul>
          </div>
        </div>

        {/* Payment methods */}
        <div className="flex flex-wrap gap-3 mb-10">
          {["Visa", "Mastercard", "Mercado Pago", "Transferencia", "Crypto"].map((m) => (
            <span
              key={m}
              className="px-3 py-1.5 rounded-lg text-xs"
              style={{
                background: "var(--surface-3)",
                border: "1px solid rgba(255,255,255,0.05)",
                fontFamily: "var(--font-mono)",
                color: "var(--text-muted)",
              }}
            >
              {m}
            </span>
          ))}
        </div>

        {/* Divider */}
        <div className="h-px mb-8" style={{ background: "rgba(255,255,255,0.04)" }} />

        {/* Legal */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <p className="text-[10px] text-[#333333] max-w-2xl leading-relaxed">
            Bet Fuego opera bajo licencia autorizada en Argentina. El juego puede ser adictivo.
            Jugá con responsabilidad. Mayores de 18 años únicamente. Si tenés un problema con el juego,
            llamá a la línea de ayuda gratuita.
          </p>
          <div
            style={{ fontFamily: "var(--font-mono)", letterSpacing: "2px" }}
            className="text-[10px] text-[#333333] whitespace-nowrap"
          >
            © 2025 Bet Fuego · betfuego.com
          </div>
        </div>
      </div>
    </footer>
  );
}
