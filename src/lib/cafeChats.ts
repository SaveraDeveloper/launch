export type CafeMessage = { id: string; role: "user" | "savera"; text: string };

export type CafeChat = {
  id: string;
  kind: "text" | "voice";
  title: string;
  pinned: boolean;
  updatedAt: number;
  messages: CafeMessage[];
};

const KEY = "savera_cafe_chats";

export function loadChats(): CafeChat[] {
  try {
    const raw = window.localStorage.getItem(KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? (parsed as CafeChat[]) : [];
  } catch {
    return [];
  }
}

export function saveChats(chats: CafeChat[]) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(chats));
  } catch {
    /* ignore */
  }
}

export function titleFrom(text: string): string {
  const t = text.trim().replace(/\s+/g, " ");
  if (!t) return "New session";
  return `Client: ${t.length > 26 ? `${t.slice(0, 26)}…` : t.toLowerCase()}`;
}

/** Ask Savera for a short, therapist-style session title. */
export async function generateTitle(text: string): Promise<string> {
  try {
    const res = await fetch("/api/cafe-chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mode: "title", messages: [{ role: "user", text }] }),
    });
    if (!res.ok) return titleFrom(text);
    const data = (await res.json()) as { text?: string };
    const clean = (data.text ?? "").replace(/^["'\s]+|["'.\s]+$/g, "");
    return clean ? clean.slice(0, 48) : titleFrom(text);
  } catch {
    return titleFrom(text);
  }
}

export async function saveraReply(messages: CafeMessage[]): Promise<string> {
  const res = await fetch("/api/cafe-chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      messages: messages.map((m) => ({ role: m.role, text: m.text })),
    }),
  });
  if (!res.ok) throw new Error(`Savera is quiet right now (${res.status})`);
  const data = (await res.json()) as { text?: string };
  return data.text?.trim() || "I'm here with you. Tell me a little more about that.";
}

export function newId() {
  return Math.random().toString(36).slice(2, 10);
}
