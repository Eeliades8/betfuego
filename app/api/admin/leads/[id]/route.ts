import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { getDb, type Lead, type Note } from "@/lib/db";

type Params = { params: Promise<{ id: string }> };

export async function GET(_req: NextRequest, { params }: Params) {
  if (!(await isAuthenticated())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const lead = getDb().prepare("SELECT * FROM leads WHERE id = ?").get(id) as Lead | undefined;
  if (!lead) return NextResponse.json({ error: "Not found" }, { status: 404 });
  const notes = getDb().prepare("SELECT * FROM notes WHERE lead_id = ? ORDER BY created_at DESC").all(id) as Note[];
  return NextResponse.json({ ...lead, notes });
}

export async function PATCH(req: NextRequest, { params }: Params) {
  if (!(await isAuthenticated())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const body = await req.json();
  const { status, name, email, phone } = body;

  const db = getDb();
  const lead = db.prepare("SELECT * FROM leads WHERE id = ?").get(id) as Lead | undefined;
  if (!lead) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const updates: string[] = ["updated_at = datetime('now')"];
  const vals: (string | null)[] = [];

  if (status !== undefined) { updates.push("status = ?"); vals.push(status); }
  if (name !== undefined) { updates.push("name = ?"); vals.push(name); }
  if (email !== undefined) { updates.push("email = ?"); vals.push(email); }
  if (phone !== undefined) { updates.push("phone = ?"); vals.push(phone); }

  vals.push(id);
  db.prepare(`UPDATE leads SET ${updates.join(", ")} WHERE id = ?`).run(...vals);
  const updated = db.prepare("SELECT * FROM leads WHERE id = ?").get(id) as Lead;
  return NextResponse.json(updated);
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  if (!(await isAuthenticated())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  getDb().prepare("DELETE FROM leads WHERE id = ?").run(id);
  return NextResponse.json({ ok: true });
}
