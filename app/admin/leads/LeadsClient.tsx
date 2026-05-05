"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { Lead } from "@/lib/db";

const STATUS_COLORS: Record<string, string> = {
  new: "#3B82F6",
  contacted: "#F59E0B",
  converted: "#10B981",
  lost: "#EF4444",
};

const STATUS_LABELS: Record<string, string> = {
  new: "Nuevo",
  contacted: "Contactado",
  converted: "Convertido",
  lost: "Perdido",
};

export function LeadsClient({
  leads,
  initialQ,
  initialStatus,
}: {
  leads: Lead[];
  initialQ: string;
  initialStatus: string;
}) {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [q, setQ] = useState(initialQ);
  const [status, setStatus] = useState(initialStatus);
  const [showAdd, setShowAdd] = useState(false);
  const [addForm, setAddForm] = useState({ name: "", email: "", phone: "", source: "manual" });
  const [adding, setAdding] = useState(false);

  function applyFilter(newQ = q, newStatus = status) {
    const params = new URLSearchParams();
    if (newQ) params.set("q", newQ);
    if (newStatus) params.set("status", newStatus);
    startTransition(() => router.push(`/admin/leads?${params}`));
  }

  async function addLead(e: React.FormEvent) {
    e.preventDefault();
    setAdding(true);
    const res = await fetch("/api/admin/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(addForm),
    });
    setAdding(false);
    if (res.ok) {
      setShowAdd(false);
      setAddForm({ name: "", email: "", phone: "", source: "manual" });
      router.refresh();
    }
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">Leads</h1>
        <button
          onClick={() => setShowAdd(true)}
          className="px-4 py-2 rounded-lg text-sm font-semibold transition-all hover:opacity-90"
          style={{ background: "linear-gradient(90deg,#CC1A1A,#FF7A00)" }}
        >
          + Agregar lead
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-3 mb-6 flex-wrap">
        <input
          value={q}
          onChange={e => setQ(e.target.value)}
          onKeyDown={e => e.key === "Enter" && applyFilter(q)}
          placeholder="Buscar nombre, email, teléfono..."
          className="flex-1 min-w-[200px] px-4 py-2.5 rounded-lg text-sm text-white outline-none"
          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
        />
        <select
          value={status}
          onChange={e => { setStatus(e.target.value); applyFilter(q, e.target.value); }}
          className="px-4 py-2.5 rounded-lg text-sm text-white outline-none"
          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
        >
          <option value="">Todos los estados</option>
          {Object.entries(STATUS_LABELS).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
        </select>
        <button
          onClick={() => applyFilter(q, status)}
          className="px-4 py-2.5 rounded-lg text-sm font-medium transition-all hover:opacity-80"
          style={{ background: "rgba(255,122,0,0.15)", color: "#FF7A00", border: "1px solid rgba(255,122,0,0.3)" }}
        >
          Buscar
        </button>
      </div>

      {/* Add lead modal */}
      {showAdd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: "rgba(0,0,0,0.7)" }}>
          <div className="w-full max-w-md p-6 rounded-2xl" style={{ background: "#141414", border: "1px solid rgba(255,122,0,0.2)" }}>
            <h2 className="text-white font-bold mb-4">Agregar lead</h2>
            <form onSubmit={addLead} className="flex flex-col gap-3">
              {(["name","email","phone"] as const).map(f => (
                <input
                  key={f}
                  type={f === "email" ? "email" : "text"}
                  placeholder={f === "name" ? "Nombre *" : f === "email" ? "Email *" : "Teléfono"}
                  value={addForm[f]}
                  onChange={e => setAddForm(p => ({ ...p, [f]: e.target.value }))}
                  required={f !== "phone"}
                  className="w-full px-4 py-2.5 rounded-lg text-white text-sm outline-none"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
                />
              ))}
              <div className="flex gap-3 mt-2">
                <button type="button" onClick={() => setShowAdd(false)} className="flex-1 py-2.5 rounded-lg text-sm text-[#666] hover:text-white transition-colors" style={{ border: "1px solid rgba(255,255,255,0.1)" }}>
                  Cancelar
                </button>
                <button type="submit" disabled={adding} className="flex-1 py-2.5 rounded-lg text-sm font-semibold hover:opacity-90 transition-all disabled:opacity-50" style={{ background: "linear-gradient(90deg,#CC1A1A,#FF7A00)" }}>
                  {adding ? "..." : "Agregar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.07)" }}>
        <div className="grid grid-cols-[2fr_2fr_1fr_1fr_80px] text-xs text-[#444] uppercase px-4 py-3" style={{ letterSpacing: "1px", background: "rgba(255,255,255,0.03)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
          <span>Nombre</span>
          <span>Email</span>
          <span>Fuente</span>
          <span>Estado</span>
          <span>Notas</span>
        </div>

        {leads.length === 0 ? (
          <div className="text-center py-12 text-[#444] text-sm">No hay leads</div>
        ) : (
          leads.map(lead => (
            <Link
              key={lead.id}
              href={`/admin/leads/${lead.id}`}
              className="grid grid-cols-[2fr_2fr_1fr_1fr_80px] px-4 py-3 items-center border-b border-white/5 hover:bg-white/5 transition-colors"
            >
              <div>
                <div className="text-white text-sm font-medium">{lead.name}</div>
                <div className="text-[#444] text-xs">{lead.created_at.slice(0, 10)}</div>
              </div>
              <div className="text-[#888] text-sm truncate pr-4">{lead.email}</div>
              <div className="text-[#555] text-xs">{lead.source}</div>
              <div>
                <span
                  className="text-xs px-2 py-0.5 rounded-full font-medium"
                  style={{ background: STATUS_COLORS[lead.status] + "22", color: STATUS_COLORS[lead.status] }}
                >
                  {STATUS_LABELS[lead.status]}
                </span>
              </div>
              <div className="text-[#555] text-xs">{(lead as Lead & { note_count?: number }).note_count ?? 0} nota{(lead as Lead & { note_count?: number }).note_count !== 1 ? "s" : ""}</div>
            </Link>
          ))
        )}
      </div>

      <div className="mt-4 text-xs text-[#444]">{leads.length} lead{leads.length !== 1 ? "s" : ""}</div>
    </div>
  );
}
