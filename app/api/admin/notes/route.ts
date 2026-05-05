import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { getDb, type Note } from "@/lib/db";

export async function POST(req: NextRequest) {
  if (!(await isAuthenticated())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { lead_id, content } = await req.json();
  if (!lead_id || !content?.trim()) return NextResponse.json({ error: "lead_id and content required" }, { status: 400 });

  const result = getDb()
    .prepare("INSERT INTO notes (lead_id, content) VALUES (?, ?)")
    .run(lead_id, content.trim());
  const note = getDb().prepare("SELECT * FROM notes WHERE id = ?").get(result.lastInsertRowid) as Note;
  return NextResponse.json(note, { status: 201 });
}

export async function DELETE(req: NextRequest) {
  if (!(await isAuthenticated())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await req.json();
  getDb().prepare("DELETE FROM notes WHERE id = ?").run(id);
  return NextResponse.json({ ok: true });
}
