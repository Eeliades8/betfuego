import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import { getDb } from "@/lib/db";
import { AdminShell } from "../AdminShell";
import { DashboardClient } from "./DashboardClient";
import type { Lead } from "@/lib/db";

export default async function DashboardPage() {
  if (!(await isAuthenticated())) redirect("/admin");

  const db = getDb();
  const total = (db.prepare("SELECT COUNT(*) as n FROM leads").get() as { n: number }).n;
  const byStatus = db.prepare("SELECT status, COUNT(*) as n FROM leads GROUP BY status").all() as { status: string; n: number }[];
  const recentWeek = (db.prepare("SELECT COUNT(*) as n FROM leads WHERE created_at > datetime('now', '-7 days')").get() as { n: number }).n;
  const recentLeads = db.prepare("SELECT * FROM leads ORDER BY created_at DESC LIMIT 10").all() as Lead[];

  const statusMap = Object.fromEntries(byStatus.map(r => [r.status, r.n]));

  return (
    <AdminShell active="dashboard">
      <DashboardClient
        total={total}
        statusMap={statusMap}
        recentWeek={recentWeek}
        recentLeads={recentLeads}
      />
    </AdminShell>
  );
}
