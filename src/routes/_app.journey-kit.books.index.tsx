import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowLeft, Search, BookOpen } from "lucide-react";
import { BOOKS } from "@/lib/journeyKitCatalog";

type Filter = "all" | "recommended" | "saved" | "reading" | "finished";

export const Route = createFileRoute("/_app/journey-kit/books/")({
  head: () => ({ meta: [{ title: "Books — Journey Kit" }] }),
  component: Page,
});

const TABS: { id: Filter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "recommended", label: "Recommended" },
  { id: "saved", label: "Saved" },
  { id: "reading", label: "Reading" },
  { id: "finished", label: "Finished" },
];

function Page() {
  const [filter, setFilter] = useState<Filter>("all");
  const [q, setQ] = useState("");

  const list = useMemo(() => {
    let l = BOOKS.slice();
    if (filter !== "all") l = l.filter((b) => b.status === filter);
    const query = q.trim().toLowerCase();
    if (query) l = l.filter((b) => b.title.toLowerCase().includes(query) || b.author.toLowerCase().includes(query));
    return l;
  }, [filter, q]);

  return (
    <div className="mx-auto w-full max-w-[430px] px-5 pt-10 pb-10 animate-soft-in">
      <header className="mb-5 flex items-center gap-3">
        <Link to="/journey-kit" className="rounded-full border border-white/30 bg-white/20 p-2 backdrop-blur-xl">
          <ArrowLeft className="h-4 w-4 text-white" />
        </Link>
        <h1 className="font-seasons text-[24px] font-light text-white">📖 Books</h1>
      </header>

      <div className="mb-3 flex items-center gap-3 rounded-full border border-white/30 bg-white/25 px-4 py-3 backdrop-blur-2xl shadow-[0_8px_24px_rgba(0,0,0,0.28)]">
        <Search className="h-4 w-4 text-white/80" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search books or authors…"
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
          <p className="font-seasons text-[15px] text-white">A quiet shelf</p>
          <p className="mt-1 text-[12px] font-light text-white/80">
            Recommendations you save will settle here.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3">
          {list.map((b) => (
            <Link
              key={b.id}
              to="/journey-kit/books/$id"
              params={{ id: b.id }}
              className="flex flex-col rounded-[22px] border border-white/30 bg-white/25 p-3 backdrop-blur-2xl shadow-[0_8px_24px_rgba(0,0,0,0.28)] transition active:scale-[.99] hover:bg-white/30"
            >
              <div
                className={`mb-3 flex aspect-[3/4] items-center justify-center rounded-xl border border-white/25 bg-gradient-to-br ${b.coverTint}`}
              >
                <BookOpen className="h-8 w-8 text-white/90" strokeWidth={1.3} />
              </div>
              <p className="font-seasons text-[14px] leading-tight text-white">{b.title}</p>
              <p className="mt-0.5 text-[11px] font-light text-white/80">{b.author}</p>
              <span className="mt-2 inline-block w-max rounded-full border border-white/40 bg-white/20 px-2 py-0.5 text-[10px] uppercase tracking-wide text-white">
                {b.status}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
