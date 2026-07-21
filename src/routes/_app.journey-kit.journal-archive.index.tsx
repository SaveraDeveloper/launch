import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowLeft, Search, Heart, NotebookPen } from "lucide-react";
import { JOURNALS, relativeDate, isThisWeek, isThisMonth } from "@/lib/journeyKitCatalog";

type Filter = "all" | "favorites" | "week" | "month";

export const Route = createFileRoute("/_app/journey-kit/journal-archive/")({
  head: () => ({ meta: [{ title: "Journal Archive — Journey Kit" }] }),
  component: Page,
});

const TABS: { id: Filter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "favorites", label: "Favorites" },
  { id: "week", label: "This Week" },
  { id: "month", label: "This Month" },
];

function Page() {
  const [filter, setFilter] = useState<Filter>("all");
  const [q, setQ] = useState("");
  const [favorites, setFavorites] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(JOURNALS.map((j) => [j.id, j.isFavorite])),
  );

  const list = useMemo(() => {
    let l = JOURNALS.slice().sort((a, b) => (b.date < a.date ? -1 : 1));
    if (filter === "favorites") l = l.filter((j) => favorites[j.id]);
    if (filter === "week") l = l.filter((j) => isThisWeek(j.date));
    if (filter === "month") l = l.filter((j) => isThisMonth(j.date));
    const query = q.trim().toLowerCase();
    if (query) l = l.filter((j) => j.title.toLowerCase().includes(query) || j.preview.toLowerCase().includes(query));
    return l;
  }, [filter, q, favorites]);

  return (
    <div className="mx-auto w-full max-w-[430px] px-5 pt-10 pb-10 animate-soft-in">
      <header className="mb-5 flex items-center gap-3">
        <Link to="/journey-kit" className="rounded-full border border-white/30 bg-white/20 p-2 backdrop-blur-xl">
          <ArrowLeft className="h-4 w-4 text-white" />
        </Link>
        <h1 className="font-seasons text-[24px] font-light text-white">📝 Journal Archive</h1>
      </header>

      <div className="mb-3 flex items-center gap-3 rounded-full border border-white/30 bg-white/25 px-4 py-3 backdrop-blur-2xl shadow-[0_8px_24px_rgba(0,0,0,0.28)]">
        <Search className="h-4 w-4 text-white/80" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search your journals…"
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
          <NotebookPen className="mx-auto mb-2 h-6 w-6 text-white/80" strokeWidth={1.3} />
          <p className="font-seasons text-[15px] text-white">Your notebooks will live here</p>
          <p className="mt-1 text-[12px] font-light text-white/80">
            Journals are written in Café — they'll appear here after.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {list.map((j) => {
            const fav = favorites[j.id];
            return (
              <div
                key={j.id}
                className="relative rounded-[22px] border border-white/30 bg-white/25 p-4 backdrop-blur-2xl shadow-[0_8px_24px_rgba(0,0,0,0.28)]"
              >
                <Link
                  to="/journey-kit/journal-archive/$id"
                  params={{ id: j.id }}
                  className="block pr-8"
                >
                  <div className="flex items-baseline justify-between gap-2">
                    <p className="font-seasons text-[16px] leading-tight text-white">{j.title}</p>
                    <span className="shrink-0 text-[10.5px] text-white/70">{relativeDate(j.date)}</span>
                  </div>
                  <p className="mt-1 text-[11px] uppercase tracking-[0.14em] text-amber-100/80">{j.mood}</p>
                  <p className="mt-2 line-clamp-2 text-[12.5px] font-light leading-snug text-white/85">
                    {j.preview}
                  </p>
                </Link>
                <button
                  aria-label={fav ? "Unfavorite" : "Favorite"}
                  onClick={() => setFavorites((s) => ({ ...s, [j.id]: !s[j.id] }))}
                  className="absolute right-3 top-3 rounded-full border border-white/30 bg-white/20 p-1.5 backdrop-blur-xl"
                >
                  <Heart
                    className={`h-3.5 w-3.5 ${fav ? "fill-rose-300 text-rose-300" : "text-white/80"}`}
                    strokeWidth={1.6}
                  />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
