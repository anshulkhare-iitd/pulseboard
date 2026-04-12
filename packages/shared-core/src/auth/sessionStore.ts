import { sessionSchema, type Session } from "../types/auth";

const SESSION_KEY = "pulseboard.session";

export function getSession(): Session | null {
  const raw = localStorage.getItem(SESSION_KEY);
  if (!raw) {
    return null;
  }

  const parsed = sessionSchema.safeParse(JSON.parse(raw));
  return parsed.success ? parsed.data : null;
}

export function saveSession(session: Session): void {
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function clearSession(): void {
  localStorage.removeItem(SESSION_KEY);
}
