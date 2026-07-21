// Journey Kit — user-owned content stored in localStorage.
// Starts empty; users add items via the + button on each list.

export type VideoItem = {
  id: string;
  title: string;
  url?: string;
  thumbnailUrl?: string;
  note?: string;
  savedAt: string; // ISO
};

export type BookItem = {
  id: string;
  title: string;
  author?: string;
  url?: string;
  thumbnailUrl?: string;
  note?: string;
  savedAt: string; // ISO
};

export type JournalItem = {
  id: string;
  title: string;
  body: string;
  mood?: string;
  date: string; // ISO
  isFavorite: boolean;
};

export type SavedLink = {
  id: string;
  title: string;
  url?: string;
  thumbnailUrl?: string;
  note?: string;
  savedAt: string; // ISO
};

const K_VIDEOS = "savera_kit_videos";
const K_BOOKS = "savera_kit_books";
const K_JOURNALS = "savera_kit_journals";
const K_SAVED = "savera_kit_saved";

function read<T>(key: string): T[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(window.localStorage.getItem(key) || "[]") as T[];
  } catch {
    return [];
  }
}
function write<T>(key: string, val: T[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, JSON.stringify(val));
}

export const videosStore = {
  read: () => read<VideoItem>(K_VIDEOS),
  write: (v: VideoItem[]) => write(K_VIDEOS, v),
  key: K_VIDEOS,
};
export const booksStore = {
  read: () => read<BookItem>(K_BOOKS),
  write: (v: BookItem[]) => write(K_BOOKS, v),
  key: K_BOOKS,
};
export const journalsStore = {
  read: () => read<JournalItem>(K_JOURNALS),
  write: (v: JournalItem[]) => write(K_JOURNALS, v),
  key: K_JOURNALS,
};
export const savedStore = {
  read: () => read<SavedLink>(K_SAVED),
  write: (v: SavedLink[]) => write(K_SAVED, v),
  key: K_SAVED,
};

export function newId() {
  return `id_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`;
}

// URL helpers — extract YouTube thumbnail when possible.
export function extractYouTubeId(url: string): string | null {
  try {
    const u = new URL(url);
    const host = u.hostname.replace(/^www\./, "");
    if (host === "youtu.be") return u.pathname.slice(1) || null;
    if (host.endsWith("youtube.com")) {
      if (u.pathname === "/watch") return u.searchParams.get("v");
      const m = u.pathname.match(/^\/(embed|shorts|v)\/([^/?]+)/);
      if (m) return m[2];
    }
    return null;
  } catch {
    return null;
  }
}

export function deriveThumbnail(url?: string): string | undefined {
  if (!url) return undefined;
  const yt = extractYouTubeId(url);
  if (yt) return `https://img.youtube.com/vi/${yt}/hqdefault.jpg`;
  return undefined;
}

export function hostOf(url?: string): string | undefined {
  if (!url) return undefined;
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return undefined;
  }
}

export function relativeDate(iso: string) {
  const d = new Date(iso);
  const diff = Date.now() - d.getTime();
  const day = 1000 * 60 * 60 * 24;
  if (diff < day) return "Today";
  if (diff < day * 2) return "Yesterday";
  if (diff < day * 7) return `${Math.floor(diff / day)} days ago`;
  return d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

export function isThisWeek(iso: string) {
  return Date.now() - new Date(iso).getTime() < 1000 * 60 * 60 * 24 * 7;
}
export function isThisMonth(iso: string) {
  return Date.now() - new Date(iso).getTime() < 1000 * 60 * 60 * 24 * 30;
}
