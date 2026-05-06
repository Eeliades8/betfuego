"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";

const NAV = [
  { key: "dashboard", label: "Dashboard", href: "/admin/dashboard", icon: "▦" },
  { key: "leads", label: "Leads", href: "/admin/leads", icon: "◉" },
];

export function AdminShell({ active, children }: { active: string; children: React.ReactNode }) {
  const router = useRouter();

  async function logout() {
    await fetch("/api/admin/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "logout" }),
    });
    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="min-h-screen flex" style={{ background: "#0A0A0A", color: "#E0E0E0" }}>
      {/* Sidebar */}
      <aside
        className="w-56 flex-shrink-0 flex flex-col"
        style={{ background: "rgba(15,15,15,0.98)", borderRight: "1px solid rgba(255,122,0,0.1)" }}
      >
        <div className="p-4 flex items-center gap-3" style={{ borderBottom: "1px solid rgba(255,122,0,0.1)" }}>
          <Image src="/logo-clean.png" alt="BetFuego" width={48} height={48} className="object-contain" style={{ filter: "drop-shadow(0 0 6px rgba(255,100,0,0.5))" }} />
        </div>
        <div className="px-2 py-1 mt-1 text-[10px] text-[#444] uppercase" style={{ letterSpacing: "2px", paddingLeft: "1rem" }}>
          CRM Admin
        </div>
        <nav className="flex-1 px-2 py-2">
          {NAV.map(n => (
            <Link
              key={n.key}
              href={n.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 text-sm transition-all"
              style={{
                background: active === n.key ? "rgba(255,122,0,0.12)" : "transparent",
                color: active === n.key ? "#FF7A00" : "#666",
                fontWeight: active === n.key ? 600 : 400,
              }}
            >
              <span className="text-base">{n.icon}</span>
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="p-4" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
          <button
            onClick={logout}
            className="w-full text-xs text-[#444] hover:text-[#FF7A00] transition-colors text-left py-1"
          >
            Cerrar sesión
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
