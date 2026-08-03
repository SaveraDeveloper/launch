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
  if (!t) return "New chat";
  return t.length > 34 ? `${t.slice(0, 34)}…` : t;
}

export function newId() {
  return Math.random().toString(36).slice(2, 10);
}
