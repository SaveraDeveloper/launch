import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X, Link as LinkIcon } from "lucide-react";

import { deriveThumbnail } from "@/lib/journeyKitCatalog";

export type AddItemKind = "video" | "book" | "journal" | "link";

export type AddItemResult = {
  title: string;
  url?: string;
  thumbnailUrl?: string;
  author?: string;
  note?: string;
  body?: string;
  mood?: string;
};

export function AddItemDialog({
  open,
  kind,
  onClose,
  onSubmit,
}: {
  open: boolean;
  kind: AddItemKind;
  onClose: () => void;
  onSubmit: (r: AddItemResult) => void;
}) {
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [note, setNote] = useState("");
  const [body, setBody] = useState("");
  const [mood, setMood] = useState("");
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      setUrl("");
      setTitle("");
      setAuthor("");
      setNote("");
      setBody("");
      setMood("");
      setErr(null);
    }
  }, [open, kind]);

  if (!open) return null;

  const showsUrl = kind === "video" || kind === "book" || kind === "link";
  const showsAuthor = kind === "book";
  const showsBody = kind === "journal";

  const heading =
    kind === "video"
      ? "Add a video"
      : kind === "book"
        ? "Add a book"
        : kind === "journal"
          ? "New journal entry"
          : "Save a link";

  const submit = () => {
    const t = title.trim();
    const u = url.trim();
    if (kind === "journal") {
      if (!t) return setErr("Give it a title.");
    } else {
      // URL optional. If no URL, title required.
      if (!u && !t) return setErr("Add a URL or a title.");
      if (u) {
        try {
          new URL(u);
        } catch {
          return setErr("That URL doesn't look right.");
        }
      }
    }
    onSubmit({
      title: t || (u ? u : ""),
      url: u || undefined,
      thumbnailUrl: showsUrl ? deriveThumbnail(u) : undefined,
      author: author.trim() || undefined,
      note: note.trim() || undefined,
      body: body.trim() || undefined,
      mood: mood.trim() || undefined,
    });
  };

  if (typeof document === "undefined") return null;
  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center overflow-y-auto bg-[#3d2415]/45 p-4 backdrop-blur-md">
      <div className="my-auto w-full max-w-[420px] rounded-[28px] border border-white/60 bg-gradient-to-br from-[#fffaf5]/95 via-[#fff0e6]/92 to-[#f7e8d9]/88 p-7 pb-8 text-[#4a2e1a] shadow-[0_24px_70px_rgba(62,35,20,0.35)] backdrop-blur-2xl">

        <div className="mb-6 flex items-center justify-between">
          <h2 className="font-seasons text-[22px] font-light">{heading}</h2>
          <button
            onClick={onClose}
            className="rounded-full border border-[#c4a882]/60 bg-[#fff8f0]/70 p-2 text-[#5a3a2a] transition hover:bg-[#fff8f0]"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex flex-col gap-4">
          {showsUrl && (
            <label className="flex flex-col gap-2">
              <span className="text-[11px] uppercase tracking-[0.14em] text-[#8b6b4f]">
                URL (optional)
              </span>
              <div className="flex items-center gap-3 rounded-2xl border border-[#d4bfa8] bg-white/70 px-4 py-3.5 shadow-[inset_0_1px_2px_rgba(90,58,42,0.05)]">
                <LinkIcon className="h-4 w-4 text-[#a07d5a]" />
                <input
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://…"
                  className="w-full bg-transparent text-[14px] font-light text-[#4a2e1a] placeholder:text-[#b09a7a] focus:outline-none"
                />
              </div>
            </label>
          )}

          <label className="flex flex-col gap-2">
            <span className="text-[11px] uppercase tracking-[0.14em] text-[#8b6b4f]">
              Title {kind === "journal" || !url ? "" : "(optional)"}
            </span>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={
                kind === "book"
                  ? "Self-Compassion"
                  : kind === "journal"
                    ? "A quieter morning"
                    : "What's this called?"
              }
              className="rounded-2xl border border-[#d4bfa8] bg-white/70 px-4 py-3.5 text-[14px] font-light text-[#4a2e1a] placeholder:text-[#b09a7a] shadow-[inset_0_1px_2px_rgba(90,58,42,0.05)] focus:outline-none"
            />
          </label>

          {showsAuthor && (
            <label className="flex flex-col gap-2">
              <span className="text-[11px] uppercase tracking-[0.14em] text-[#8b6b4f]">
                Author (optional)
              </span>
              <input
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Kristin Neff"
                className="rounded-2xl border border-[#d4bfa8] bg-white/70 px-4 py-3.5 text-[14px] font-light text-[#4a2e1a] placeholder:text-[#b09a7a] shadow-[inset_0_1px_2px_rgba(90,58,42,0.05)] focus:outline-none"
              />
            </label>
          )}

          {showsBody && (
            <>
              <label className="flex flex-col gap-2">
                <span className="text-[11px] uppercase tracking-[0.14em] text-[#8b6b4f]">
                  Mood (optional)
                </span>
                <input
                  value={mood}
                  onChange={(e) => setMood(e.target.value)}
                  placeholder="Calm, Tender, Low…"
                  className="rounded-2xl border border-[#d4bfa8] bg-white/70 px-4 py-3.5 text-[14px] font-light text-[#4a2e1a] placeholder:text-[#b09a7a] shadow-[inset_0_1px_2px_rgba(90,58,42,0.05)] focus:outline-none"
                />
              </label>
              <label className="flex flex-col gap-2">
                <span className="text-[11px] uppercase tracking-[0.14em] text-[#8b6b4f]">
                  Entry
                </span>
                <textarea
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  placeholder="Let it out…"
                  rows={5}
                  className="resize-none rounded-2xl border border-[#d4bfa8] bg-white/70 px-4 py-3.5 text-[14px] font-light text-[#4a2e1a] placeholder:text-[#b09a7a] shadow-[inset_0_1px_2px_rgba(90,58,42,0.05)] focus:outline-none"
                />
              </label>
            </>
          )}

          {!showsBody && (
            <label className="flex flex-col gap-2">
              <span className="text-[11px] uppercase tracking-[0.14em] text-[#8b6b4f]">
                Note (optional)
              </span>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Why does this matter to you?"
                rows={3}
                className="resize-none rounded-2xl border border-[#d4bfa8] bg-white/70 px-4 py-3.5 text-[14px] font-light text-[#4a2e1a] placeholder:text-[#b09a7a] shadow-[inset_0_1px_2px_rgba(90,58,42,0.05)] focus:outline-none"
              />
            </label>
          )}

          {err && <p className="text-[13px] text-[#b85c5c]">{err}</p>}

          <div className="mt-3 flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 rounded-full border border-[#c4a882] bg-[#fff8f0]/80 py-3 text-[14px] font-medium text-[#5a3a2a] transition hover:bg-[#fff8f0]"
            >
              Cancel
            </button>
            <button
              onClick={submit}
              className="flex-1 rounded-full bg-gradient-to-b from-[#c69c6d] to-[#a67c52] py-3 text-[14px] font-semibold text-white shadow-[0_6px_20px_rgba(139,94,60,0.35)] transition hover:brightness-105"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
