"use client";

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

type Props = {
  total: number;
  statusMap: Record<string, number>;
  recentWeek: number;
  recentLeads: Lead[];
};

export function DashboardClient({ total, statusMap, recentWeek, recentLeads }: Props) {
  const stats = [
    { label: "Total Leads", value: total, color: "#FF7A00" },
    { label: "Esta semana", value: recentWeek, color: "#3B82F6" },
    { label: "Convertidos", value: statusMap["converted"] ?? 0, color: "#10B981" },
    { label: "Perdidos", value: statusMap["lost"] ?? 0, color: "#EF4444" },
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold text-white mb-8">Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {stats.map(s => (
          <div
            key={s.label}
            className="rounded-xl p-5"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
          >
            <div className="text-3xl font-bold mb-1" style={{ color: s.color }}>{s.value}</div>
            <div className="text-xs text-[#666]">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Pipeline breakdown */}
      <div className="rounded-xl p-6 mb-8" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
        <h2 className="text-sm font-semibold text-[#999] uppercase mb-4" style={{ letterSpacing: "2px" }}>Pipeline</h2>
        <div className="flex gap-3 flex-wrap">
          {["new", "contacted", "converted", "lost"].map(s => (
            <div key={s} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ background: STATUS_COLORS[s] }} />
              <span className="text-white text-sm font-semibold">{statusMap[s] ?? 0}</span>
              <span className="text-[#555] text-xs">{STATUS_LABELS[s]}</span>
            </div>
          ))}
        </div>
        {total > 0 && (
          <div className="mt-4 flex rounded-full overflow-hidden h-2 gap-px">
            {["new", "contacted", "converted", "lost"].map(s => {
              const pct = ((statusMap[s] ?? 0) / total) * 100;
              return pct > 0 ? (
                <div key={s} style={{ width: `${pct}%`, background: STATUS_COLORS[s] }} />
              ) : null;
            })}
          </div>
        )}
      </div>

      {/* Recent leads */}
      <div className="rounded-xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
          <h2 className="text-sm font-semibold text-[#999] uppercase" style={{ letterSpacing: "2px" }}>Leads recientes</h2>
          <Link href="/admin/leads" className="text-xs text-[#FF7A00] hover:text-[#FFAA00] transition-colors">Ver todos →</Link>
        </div>
        {recentLeads.length === 0 ? (
          <div className="px-6 py-8 text-center text-[#444] text-sm">No hay leads aún</div>
        ) : (
          <div>
            {recentLeads.map(lead => (
              <Link
                key={lead.id}
                href={`/admin/leads/${lead.id}`}
                className="flex items-center justify-between px-6 py-3 border-b border-white/5 hover:bg-white/5 transition-colors"
              >
                <div>
                  <div className="text-white text-sm font-medium">{lead.name}</div>
                  <div className="text-[#555] text-xs">{lead.email}</div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[#444] text-xs">{lead.created_at.slice(0, 10)}</span>
                  <span
                    className="text-xs px-2 py-0.5 rounded-full font-medium"
                    style={{ background: STATUS_COLORS[lead.status] + "22", color: STATUS_COLORS[lead.status] }}
                  >
                    {STATUS_LABELS[lead.status]}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
