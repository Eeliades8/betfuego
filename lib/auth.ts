import { createHmac, randomBytes } from "crypto";
import { cookies } from "next/headers";
import { getDb } from "./db";

const SECRET = process.env.ADMIN_SECRET || "betfuego-crm-secret-change-me";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "fuego2024";
const COOKIE_NAME = "bf_admin_session";
const SESSION_TTL_DAYS = 7;

export function checkPassword(password: string): boolean {
  return password === ADMIN_PASSWORD;
}

export function createSession(): string {
  const token = randomBytes(32).toString("hex");
  const signed = signToken(token);
  const db = getDb();
  db.prepare("INSERT INTO sessions (token) VALUES (?)").run(signed);
  // Purge old sessions
  db.prepare(
    `DELETE FROM sessions WHERE created_at < datetime('now', '-${SESSION_TTL_DAYS} days')`
  ).run();
  return signed;
}

export function destroySession(token: string) {
  getDb().prepare("DELETE FROM sessions WHERE token = ?").run(token);
}

export function isValidSession(token: string): boolean {
  const row = getDb()
    .prepare(
      `SELECT token FROM sessions WHERE token = ? AND created_at > datetime('now', '-${SESSION_TTL_DAYS} days')`
    )
    .get(token) as { token: string } | undefined;
  return !!row;
}

function signToken(token: string): string {
  const sig = createHmac("sha256", SECRET).update(token).digest("hex");
  return `${token}.${sig}`;
}

export async function getSessionToken(): Promise<string | null> {
  const jar = await cookies();
  return jar.get(COOKIE_NAME)?.value ?? null;
}

export async function isAuthenticated(): Promise<boolean> {
  const token = await getSessionToken();
  if (!token) return false;
  return isValidSession(token);
}

export { COOKIE_NAME };
