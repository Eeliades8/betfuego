import { redirect, notFound } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import { getDb, type Lead, type Note } from "@/lib/db";
import { AdminShell } from "../../AdminShell";
import { LeadDetailClient } from "./LeadDetailClient";

export default async function LeadDetailPage({ params }: { params: Promise<{ id: string }> }) {
  if (!(await isAuthenticated())) redirect("/admin");

  const { id } = await params;
  const db = getDb();
  const lead = db.prepare("SELECT * FROM leads WHERE id = ?").get(id) as Lead | undefined;
  if (!lead) notFound();

  const notes = db.prepare("SELECT * FROM notes WHERE lead_id = ? ORDER BY created_at DESC").all(id) as Note[];

  return (
    <AdminShell active="leads">
      <LeadDetailClient lead={lead} initialNotes={notes} />
    </AdminShell>
  );
}
