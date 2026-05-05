import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import { getDb, type Lead } from "@/lib/db";
import { AdminShell } from "../AdminShell";
import { LeadsClient } from "./LeadsClient";

export default async function LeadsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; status?: string }>;
}) {
  if (!(await isAuthenticated())) redirect("/admin");

  const { q = "", status = "" } = await searchParams;

  const db = getDb();
  let sql = `
    SELECT l.*, COUNT(n.id) as note_count
    FROM leads l
    LEFT JOIN notes n ON n.lead_id = l.id
  `;
  const params: string[] = [];
  const where: string[] = [];

  if (q) {
    where.push("(l.name LIKE ? OR l.email LIKE ? OR l.phone LIKE ?)");
    const like = `%${q}%`;
    params.push(like, like, like);
  }
  if (status) {
    where.push("l.status = ?");
    params.push(status);
  }

  if (where.length) sql += " WHERE " + where.join(" AND ");
  sql += " GROUP BY l.id ORDER BY l.created_at DESC";

  const leads = db.prepare(sql).all(...params) as Lead[];

  return (
    <AdminShell active="leads">
      <LeadsClient leads={leads} initialQ={q} initialStatus={status} />
    </AdminShell>
  );
}
