import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowLeft, Search, Play, Clock } from "lucide-react";
import { VIDEOS, formatDuration } from "@/lib/journeyKitCatalog";

type Filter = "all" | "saved" | "unlocked" | "recent";

export const Route = createFileRoute("/_app/journey-kit/videos/")({
  head: () => ({ meta: [{ title: "Videos — Journey Kit" }] }),
  component: Page,
});

const TABS: { id: Filter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "saved", label: "Saved" },
  { id: "unlocked", label: "Unlocked" },
  { id: "recent", label: "Recently Watched" },
];

function Page() {
  const [filter, setFilter] = useState<Filter>("all");
  const [q, setQ] = useState("");

  const list = useMemo(() => {
    let l = VIDEOS.slice();
    if (filter === "saved") l = l.filter((v) => v.status === "saved");
    if (filter === "unlocked") l = l.filter((v) => v.status === "unlocked");
    if (filter === "recent")
      l = l.filter((v) => !!v.watchedAt).sort((a, b) => (b.watchedAt! < a.watchedAt! ? -1 : 1));
    const query = q.trim().toLowerCase();
    if (query) l = l.filter((v) => v.title.toLowerCase().includes(query) || v.creator.toLowerCase().includes(query));
    return l;
  }, [filter, q]);

  return (
    <div className="mx-auto w-full max-w-[430px] px-5 pt-10 pb-10 animate-soft-in">
      <header className="mb-5 flex items-center gap-3">
        <Link to="/journey-kit" className="rounded-full border border-white/30 bg-white/20 p-2 backdrop-blur-xl">
          <ArrowLeft className="h-4 w-4 text-white" />
        </Link>
        <h1 className="font-seasons text-[24px] font-light text-white">📹 Videos</h1>
      </header>

      <div className="mb-3 flex items-center gap-3 rounded-full border border-white/30 bg-white/25 px-4 py-3 backdrop-blur-2xl shadow-[0_8px_24px_rgba(0,0,0,0.28)]">
        <Search className="h-4 w-4 text-white/80" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search videos…"
          className="w-full bg-transparent text-[13px] font-light text-white placeholder:text-white/60 focus:outline-none"
        />
      </div>

      <div className="-mx-5 mb-4 flex gap-2 overflow-x-auto px-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {TABS.map((t) => {
          const active = filter === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setFilter(t.id)}
              className={`shrink-0 rounded-full border px-3.5 py-1.5 text-[12px] transition ${
                active
                  ? "border-white/60 bg-white/45 text-white"
                  : "border-white/25 bg-white/15 text-white/80 hover:bg-white/25"
              }`}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      {list.length === 0 ? (
        <div className="rounded-[22px] border border-white/25 bg-white/25 p-6 text-center backdrop-blur-2xl">
          <p className="font-seasons text-[15px] text-white">Nothing here yet</p>
          <p className="mt-1 text-[12px] font-light text-white/80">
            Videos you unlock or save will rest here.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {list.map((v) => (
            <Link
              key={v.id}
              to="/journey-kit/videos/$id"
              params={{ id: v.id }}
              className="flex gap-3 rounded-[22px] border border-white/30 bg-white/25 p-3 backdrop-blur-2xl shadow-[0_8px_24px_rgba(0,0,0,0.28)] transition active:scale-[.99] hover:bg-white/30"
            >
              <div className="relative flex h-24 w-32 shrink-0 items-center justify-center rounded-xl border border-white/25 bg-gradient-to-br from-white/20 to-white/5">
                <Play className="h-7 w-7 text-white" strokeWidth={1.4} />
                <span className="absolute bottom-1 right-1 rounded-md bg-black/60 px-1.5 py-0.5 text-[10px] text-white">
                  {formatDuration(v.durationSec)}
                </span>
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-seasons text-[15px] leading-tight text-white">{v.title}</p>
                <p className="mt-1 text-[11.5px] font-light text-white/80">{v.creator}</p>
                <div className="mt-2 flex items-center gap-2">
                  <span
                    className={`rounded-full border px-2 py-0.5 text-[10px] uppercase tracking-wide ${
                      v.status === "unlocked"
                        ? "border-amber-200/60 bg-amber-200/20 text-amber-100"
                        : "border-white/40 bg-white/20 text-white"
                    }`}
                  >
                    {v.status}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[10.5px] text-white/70">
                    <Clock className="h-3 w-3" /> {formatDuration(v.durationSec)}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
