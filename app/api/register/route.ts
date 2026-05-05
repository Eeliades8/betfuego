import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export async function POST(req: NextRequest) {
  const { name, email, phone } = await req.json();
  if (!email) return NextResponse.json({ error: "Email required" }, { status: 400 });

  try {
    getDb()
      .prepare("INSERT INTO leads (name, email, phone, source) VALUES (?, ?, ?, 'cta_form')")
      .run(name ?? "Unknown", email, phone ?? null);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Already registered" }, { status: 409 });
  }
}
