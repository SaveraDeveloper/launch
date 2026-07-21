import { useEffect, useState } from "react";
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

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center bg-black/50 backdrop-blur-sm sm:items-center">
      <div className="w-full max-w-[420px] rounded-t-[26px] border border-white/25 bg-neutral-900/85 p-5 pb-7 text-white shadow-[0_20px_60px_rgba(0,0,0,0.55)] backdrop-blur-2xl sm:rounded-[26px]">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-seasons text-[19px] font-light">{heading}</h2>
          <button
            onClick={onClose}
            className="rounded-full border border-white/25 bg-white/10 p-1.5"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex flex-col gap-3">
          {showsUrl && (
            <label className="flex flex-col gap-1.5">
              <span className="text-[10.5px] uppercase tracking-[0.16em] text-white/60">
                URL (optional)
              </span>
              <div className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-3 py-2.5">
                <LinkIcon className="h-3.5 w-3.5 text-white/60" />
                <input
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://…"
                  className="w-full bg-transparent text-[13px] font-light placeholder:text-white/40 focus:outline-none"
                />
              </div>
            </label>
          )}

          <label className="flex flex-col gap-1.5">
            <span className="text-[10.5px] uppercase tracking-[0.16em] text-white/60">
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
              className="rounded-xl border border-white/20 bg-white/10 px-3 py-2.5 text-[13px] font-light placeholder:text-white/40 focus:outline-none"
            />
          </label>

          {showsAuthor && (
            <label className="flex flex-col gap-1.5">
              <span className="text-[10.5px] uppercase tracking-[0.16em] text-white/60">
                Author (optional)
              </span>
              <input
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Kristin Neff"
                className="rounded-xl border border-white/20 bg-white/10 px-3 py-2.5 text-[13px] font-light placeholder:text-white/40 focus:outline-none"
              />
            </label>
          )}

          {showsBody && (
            <>
              <label className="flex flex-col gap-1.5">
                <span className="text-[10.5px] uppercase tracking-[0.16em] text-white/60">
                  Mood (optional)
                </span>
                <input
                  value={mood}
                  onChange={(e) => setMood(e.target.value)}
                  placeholder="Calm, Tender, Low…"
                  className="rounded-xl border border-white/20 bg-white/10 px-3 py-2.5 text-[13px] font-light placeholder:text-white/40 focus:outline-none"
                />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="text-[10.5px] uppercase tracking-[0.16em] text-white/60">
                  Entry
                </span>
                <textarea
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  placeholder="Let it out…"
                  rows={5}
                  className="resize-none rounded-xl border border-white/20 bg-white/10 px-3 py-2.5 text-[13px] font-light placeholder:text-white/40 focus:outline-none"
                />
              </label>
            </>
          )}

          {!showsBody && (
            <label className="flex flex-col gap-1.5">
              <span className="text-[10.5px] uppercase tracking-[0.16em] text-white/60">
                Note (optional)
              </span>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Why does this matter to you?"
                rows={3}
                className="resize-none rounded-xl border border-white/20 bg-white/10 px-3 py-2.5 text-[13px] font-light placeholder:text-white/40 focus:outline-none"
              />
            </label>
          )}

          {err && <p className="text-[12px] text-rose-300">{err}</p>}

          <div className="mt-2 flex gap-2">
            <button
              onClick={onClose}
              className="flex-1 rounded-full border border-white/25 bg-white/10 py-2.5 text-[13px]"
            >
              Cancel
            </button>
            <button
              onClick={submit}
              className="flex-1 rounded-full bg-gradient-to-b from-amber-200 to-amber-400 py-2.5 text-[13px] font-semibold text-[#5a3410] shadow-[0_4px_16px_rgba(255,190,90,0.45)]"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
