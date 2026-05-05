"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { Lead, LeadStatus, Note } from "@/lib/db";

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

const STATUSES = ["new", "contacted", "converted", "lost"] as LeadStatus[];

export function LeadDetailClient({ lead: initialLead, initialNotes }: { lead: Lead; initialNotes: Note[] }) {
  const router = useRouter();
  const [lead, setLead] = useState(initialLead);
  const [notes, setNotes] = useState(initialNotes);
  const [noteText, setNoteText] = useState("");
  const [addingNote, setAddingNote] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editForm, setEditForm] = useState({ name: lead.name, email: lead.email, phone: lead.phone ?? "" });
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  async function setStatus(status: LeadStatus) {
    const res = await fetch(`/api/admin/leads/${lead.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (res.ok) {
      const updated = await res.json();
      setLead(updated);
    }
  }

  async function saveEdit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const res = await fetch(`/api/admin/leads/${lead.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editForm),
    });
    setSaving(false);
    if (res.ok) {
      const updated = await res.json();
      setLead(updated);
      setEditing(false);
    }
  }

  async function addNote(e: React.FormEvent) {
    e.preventDefault();
    if (!noteText.trim()) return;
    setAddingNote(true);
    const res = await fetch("/api/admin/notes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ lead_id: lead.id, content: noteText }),
    });
    setAddingNote(false);
    if (res.ok) {
      const note = await res.json();
      setNotes(prev => [note, ...prev]);
      setNoteText("");
    }
  }

  async function deleteNote(id: number) {
    await fetch("/api/admin/notes", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setNotes(prev => prev.filter(n => n.id !== id));
  }

  async function deleteLead() {
    if (!confirm("¿Eliminar este lead?")) return;
    setDeleting(true);
    await fetch(`/api/admin/leads/${lead.id}`, { method: "DELETE" });
    router.push("/admin/leads");
    router.refresh();
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      {/* Back */}
      <Link href="/admin/leads" className="text-xs text-[#555] hover:text-[#FF7A00] transition-colors mb-6 inline-block">
        ← Volver a leads
      </Link>

      {/* Header */}
      <div className="rounded-xl p-6 mb-6" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
        {editing ? (
          <form onSubmit={saveEdit} className="flex flex-col gap-3">
            <input value={editForm.name} onChange={e => setEditForm(p => ({ ...p, name: e.target.value }))} placeholder="Nombre" required className="w-full px-4 py-2 rounded-lg text-white text-sm outline-none" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }} />
            <input value={editForm.email} onChange={e => setEditForm(p => ({ ...p, email: e.target.value }))} placeholder="Email" type="email" required className="w-full px-4 py-2 rounded-lg text-white text-sm outline-none" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }} />
            <input value={editForm.phone} onChange={e => setEditForm(p => ({ ...p, phone: e.target.value }))} placeholder="Teléfono" className="w-full px-4 py-2 rounded-lg text-white text-sm outline-none" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }} />
            <div className="flex gap-3">
              <button type="button" onClick={() => setEditing(false)} className="px-4 py-2 rounded-lg text-sm text-[#666] hover:text-white transition-colors" style={{ border: "1px solid rgba(255,255,255,0.1)" }}>Cancelar</button>
              <button type="submit" disabled={saving} className="px-4 py-2 rounded-lg text-sm font-semibold hover:opacity-90 disabled:opacity-50" style={{ background: "linear-gradient(90deg,#CC1A1A,#FF7A00)" }}>{saving ? "..." : "Guardar"}</button>
            </div>
          </form>
        ) : (
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white mb-1">{lead.name}</h1>
              <div className="text-[#888] text-sm mb-1">{lead.email}</div>
              {lead.phone && <div className="text-[#666] text-sm">{lead.phone}</div>}
              <div className="mt-3 text-xs text-[#444]">
                Fuente: <span className="text-[#666]">{lead.source}</span> · Registrado: <span className="text-[#666]">{lead.created_at.slice(0, 10)}</span>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setEditing(true)} className="px-3 py-1.5 rounded-lg text-xs text-[#888] hover:text-white transition-colors" style={{ border: "1px solid rgba(255,255,255,0.1)" }}>Editar</button>
              <button onClick={deleteLead} disabled={deleting} className="px-3 py-1.5 rounded-lg text-xs text-[#EF4444] hover:opacity-80 transition-all disabled:opacity-50" style={{ border: "1px solid rgba(239,68,68,0.3)" }}>Eliminar</button>
            </div>
          </div>
        )}
      </div>

      {/* Pipeline status */}
      <div className="rounded-xl p-5 mb-6" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
        <div className="text-xs text-[#444] uppercase mb-3" style={{ letterSpacing: "2px" }}>Estado del pipeline</div>
        <div className="flex gap-2 flex-wrap">
          {STATUSES.map(s => (
            <button
              key={s}
              onClick={() => setStatus(s)}
              className="px-4 py-2 rounded-lg text-sm font-medium transition-all hover:opacity-90"
              style={{
                background: lead.status === s ? STATUS_COLORS[s] + "33" : "rgba(255,255,255,0.04)",
                border: lead.status === s ? `1px solid ${STATUS_COLORS[s]}` : "1px solid rgba(255,255,255,0.08)",
                color: lead.status === s ? STATUS_COLORS[s] : "#555",
              }}
            >
              {STATUS_LABELS[s]}
            </button>
          ))}
        </div>
      </div>

      {/* Notes */}
      <div className="rounded-xl p-5" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
        <div className="text-xs text-[#444] uppercase mb-4" style={{ letterSpacing: "2px" }}>Notas</div>

        <form onSubmit={addNote} className="flex gap-3 mb-5">
          <input
            value={noteText}
            onChange={e => setNoteText(e.target.value)}
            placeholder="Agregar una nota..."
            className="flex-1 px-4 py-2.5 rounded-lg text-white text-sm outline-none"
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
          />
          <button
            type="submit"
            disabled={addingNote || !noteText.trim()}
            className="px-4 py-2.5 rounded-lg text-sm font-semibold hover:opacity-90 disabled:opacity-40 transition-all"
            style={{ background: "rgba(255,122,0,0.2)", color: "#FF7A00", border: "1px solid rgba(255,122,0,0.3)" }}
          >
            {addingNote ? "..." : "Añadir"}
          </button>
        </form>

        {notes.length === 0 ? (
          <div className="text-center py-6 text-[#333] text-sm">Sin notas aún</div>
        ) : (
          <div className="flex flex-col gap-3">
            {notes.map(note => (
              <div key={note.id} className="flex gap-3 group" style={{ borderLeft: "2px solid rgba(255,122,0,0.2)", paddingLeft: "12px" }}>
                <div className="flex-1">
                  <div className="text-[#CCC] text-sm leading-relaxed">{note.content}</div>
                  <div className="text-[#444] text-xs mt-1">{note.created_at.slice(0, 16).replace("T", " ")}</div>
                </div>
                <button
                  onClick={() => deleteNote(note.id)}
                  className="opacity-0 group-hover:opacity-100 text-[#444] hover:text-[#EF4444] transition-all text-xs"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
