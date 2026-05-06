"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export function AdminLogin() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/admin/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    setLoading(false);
    if (res.ok) {
      router.push("/admin/dashboard");
      router.refresh();
    } else {
      setError("Contraseña incorrecta");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: "#0A0A0A" }}>
      <div
        className="w-full max-w-sm p-8 rounded-2xl"
        style={{ border: "1px solid rgba(255,122,0,0.2)", background: "rgba(20,20,20,0.95)" }}
      >
        <div className="flex justify-center mb-6">
          <Image src="/logo-clean.png" alt="Bet Fuego" width={100} height={100} className="object-contain" style={{ filter: "drop-shadow(0 0 8px rgba(255,100,0,0.6))" }} />
        </div>
        <h1 className="text-center text-white text-xl font-bold mb-1" style={{ letterSpacing: "2px" }}>
          CRM ADMIN
        </h1>
        <p className="text-center text-[#555] text-xs mb-8" style={{ letterSpacing: "1px" }}>Acceso restringido</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Contraseña"
            required
            className="w-full px-4 py-3 rounded-lg text-white text-sm outline-none transition-all"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,122,0,0.25)",
              caretColor: "#FF7A00",
            }}
          />
          {error && <p className="text-red-400 text-xs text-center">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg font-bold text-sm transition-all hover:opacity-90 disabled:opacity-50"
            style={{
              background: "linear-gradient(90deg, #CC1A1A, #FF7A00)",
              letterSpacing: "2px",
            }}
          >
            {loading ? "..." : "ENTRAR"}
          </button>
        </form>
      </div>
    </div>
  );
}
