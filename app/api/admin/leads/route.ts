import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { getDb, type Lead } from "@/lib/db";

export async function GET(req: NextRequest) {
  if (!(await isAuthenticated())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const search = searchParams.get("q") ?? "";
  const status = searchParams.get("status") ?? "";

  let sql = `
    SELECT l.*, COUNT(n.id) as note_count
    FROM leads l
    LEFT JOIN notes n ON n.lead_id = l.id
  `;
  const params: string[] = [];
  const where: string[] = [];

  if (search) {
    where.push("(l.name LIKE ? OR l.email LIKE ? OR l.phone LIKE ?)");
    const like = `%${search}%`;
    params.push(like, like, like);
  }
  if (status) {
    where.push("l.status = ?");
    params.push(status);
  }

  if (where.length) sql += " WHERE " + where.join(" AND ");
  sql += " GROUP BY l.id ORDER BY l.created_at DESC";

  const leads = getDb().prepare(sql).all(...params) as Lead[];
  return NextResponse.json(leads);
}

export async function POST(req: NextRequest) {
  if (!(await isAuthenticated())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { name, email, phone, source } = body;
  if (!name || !email) return NextResponse.json({ error: "Name and email required" }, { status: 400 });

  try {
    const result = getDb()
      .prepare("INSERT INTO leads (name, email, phone, source) VALUES (?, ?, ?, ?)")
      .run(name, email, phone ?? null, source ?? "manual");
    const lead = getDb().prepare("SELECT * FROM leads WHERE id = ?").get(result.lastInsertRowid) as Lead;
    return NextResponse.json(lead, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Email already exists" }, { status: 409 });
  }
}
