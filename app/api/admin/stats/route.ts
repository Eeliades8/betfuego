import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { getDb } from "@/lib/db";

export async function GET() {
  if (!(await isAuthenticated())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const db = getDb();
  const total = (db.prepare("SELECT COUNT(*) as n FROM leads").get() as { n: number }).n;
  const byStatus = db.prepare("SELECT status, COUNT(*) as n FROM leads GROUP BY status").all() as { status: string; n: number }[];
  const recent = db.prepare("SELECT COUNT(*) as n FROM leads WHERE created_at > datetime('now', '-7 days')").get() as { n: number };

  return NextResponse.json({ total, byStatus, recentWeek: recent.n });
}
