import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  Search,
  Brain,
  Heart,
  Users,
  Sparkles,
  GraduationCap,
  Sun,
  Clock,
  CheckCircle2,
  Circle,
} from "lucide-react";
import { CATEGORIES, JOURNEYS, PRACTICES } from "@/lib/experiencesCatalog";

export const Route = createFileRoute("/_app/experiences/")({
  head: () => ({ meta: [{ title: "Explore — Savera" }] }),
  component: Page,
});

const ICONS: Record<string, typeof Brain> = {
  thoughts: Brain,
  emotions: Heart,
  relationships: Users,
  identity: Sparkles,
  "school-career": GraduationCap,
  lifestyle: Sun,
};

const TINTS: Record<string, string> = {
  thoughts: "from-amber-200/25 to-amber-500/10",
  emotions: "from-rose-200/25 to-rose-500/10",
  relationships: "from-pink-200/25 to-pink-500/10",
  identity: "from-violet-200/25 to-violet-500/10",
  "school-career": "from-sky-200/25 to-sky-500/10",
  lifestyle: "from-emerald-200/25 to-emerald-500/10",
};

const RECENT = [
  { id: "thoughts", label: "Mind Storm Clear", time: "5 min" },
  { id: "emotions", label: "Let Go Ritual", time: "9 min" },
  { id: "lifestyle", label: "Calm Rhythm", time: "4 min" },
];

const INITIAL_TODOS = [
  { id: "checkin", label: "Morning check-in", done: true },
  { id: "breath", label: "One Calm Rhythm breath", done: true },
  { id: "journey", label: "Continue Thought Lab · Ch. 2", done: false },
  { id: "reflect", label: "Evening reflection", done: false },
];

function Page() {
  const [q, setQ] = useState("");
  const [todos, setTodos] = useState(INITIAL_TODOS);

  const query = q.trim().toLowerCase();
  const filtered = useMemo(() => {
    if (!query) return { categories: CATEGORIES, matches: [] as { kind: "journey" | "practice"; id: string; title: string; catId: string }[] };
    const matchesCat = (c: (typeof CATEGORIES)[number]) =>
      c.title.toLowerCase().includes(query) ||
      c.desc.toLowerCase().includes(query) ||
      c.journeyIds.some((jid) => JOURNEYS[jid]?.concerns.some((k) => k.toLowerCase().includes(query))) ||
      c.practiceIds.some((pid) => PRACTICES[pid]?.concerns.some((k) => k.toLowerCase().includes(query)));

    const cats = CATEGORIES.filter(matchesCat);
    const jHits = Object.values(JOURNEYS)
      .filter((j) => j.title.toLowerCase().includes(query) || j.concerns.some((k) => k.toLowerCase().includes(query)))
      .map((j) => {
        const cat = CATEGORIES.find((c) => c.journeyIds.includes(j.id))!;
        return { kind: "journey" as const, id: j.id, title: j.title, catId: cat.id };
      });
    const pHits = Object.values(PRACTICES)
      .filter((p) => p.title.toLowerCase().includes(query) || p.concerns.some((k) => k.toLowerCase().includes(query)))
      .map((p) => {
        const cat = CATEGORIES.find((c) => c.practiceIds.includes(p.id))!;
        return { kind: "practice" as const, id: p.id, title: p.title, catId: cat.id };
      });
    return { categories: cats, matches: [...jHits, ...pHits].slice(0, 8) };
  }, [query]);

  const toggle = (id: string) =>
    setTodos((t) => t.map((x) => (x.id === id ? { ...x, done: !x.done } : x)));

  const doneCount = todos.filter((t) => t.done).length;

  return (
    <div className="mx-auto w-full max-w-[430px] px-5 pt-10 animate-soft-in">
      <header className="mb-6">
        <h1 className="font-seasons text-[30px] font-light leading-tight text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.55)]">
          🌻 Explore
        </h1>
        <p className="mt-2 font-body text-[14px] font-light text-white/85">
          Choose where you'd like to grow today.
        </p>
      </header>

      {/* Search */}
      <div className="mb-5 flex items-center gap-3 rounded-full border border-white/35 bg-white/30 px-4 py-3 backdrop-blur-2xl shadow-[0_8px_24px_rgba(0,0,0,0.28)]">
        <Search className="h-4 w-4 text-white/80" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search concerns, journeys, or practices…"
          className="w-full bg-transparent text-[13px] font-light text-white placeholder:text-white/60 focus:outline-none"
        />
        {q && (
          <button
            onClick={() => setQ("")}
            className="text-[11px] text-white/60 hover:text-white"
            aria-label="Clear search"
          >
            Clear
          </button>
        )}
      </div>

      {/* Search results */}
      {query && filtered.matches.length > 0 && (
        <div className="mb-5 rounded-[22px] border border-white/35 bg-white/25 p-3 backdrop-blur-xl">
          <p className="mb-2 px-1 text-[11px] uppercase tracking-[0.18em] text-white/70">Matches</p>
          <div className="flex flex-col">
            {filtered.matches.map((m) => (
              <Link
                key={`${m.kind}-${m.id}`}
                to={m.kind === "journey" ? "/experiences/$id/journey/$journeyId" : "/experiences/$id/practice/$practiceId"}
                params={m.kind === "journey" ? { id: m.catId, journeyId: m.id } : { id: m.catId, practiceId: m.id }}
                className="flex items-center justify-between rounded-xl px-2 py-2 hover:bg-white/25"
              >
                <span className="text-[13px] text-white">{m.title}</span>
                <span className="text-[10.5px] uppercase tracking-[0.14em] text-white/60">{m.kind}</span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Todo checklist */}
      <section className="mb-6 rounded-[26px] border border-white/35 bg-white/25 p-4 shadow-[0_10px_30px_rgba(0,0,0,0.32)] backdrop-blur-2xl">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-seasons text-[17px] text-white">Today's To-Do</h2>
          <span className="text-[11px] text-white/70">{doneCount}/{todos.length}</span>
        </div>
        <div className="mb-3 h-1 w-full overflow-hidden rounded-full bg-white/30">
          <div
            className="h-full rounded-full bg-amber-200/90 transition-[width] duration-500"
            style={{ width: `${(doneCount / todos.length) * 100}%` }}
          />
        </div>
        <ul className="flex flex-col gap-2">
          {todos.map((t) => (
            <li key={t.id}>
              <button
                onClick={() => toggle(t.id)}
                className="flex w-full items-center gap-3 rounded-xl px-1 py-1.5 text-left active:scale-[.99]"
              >
                {t.done ? (
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-amber-200" strokeWidth={1.6} />
                ) : (
                  <Circle className="h-5 w-5 shrink-0 text-white/70" strokeWidth={1.6} />
                )}
                <span
                  className={`text-[13px] font-light ${
                    t.done ? "text-white/55 line-through" : "text-white/95"
                  }`}
                >
                  {t.label}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </section>

      {/* Categories */}
      <div className="flex flex-col gap-3">
        {filtered.categories.map(({ id, title, desc, journeyIds, practiceIds }) => {
          const Icon = ICONS[id] ?? Sparkles;
          const tint = TINTS[id] ?? "from-white/10 to-white/5";
          return (
            <Link
              key={id}
              to="/experiences/$id"
              params={{ id }}
              className={`group flex items-center gap-4 rounded-[26px] border border-white/35 bg-gradient-to-br ${tint} bg-white/25 p-4 shadow-[0_10px_30px_rgba(0,0,0,0.35)] backdrop-blur-2xl transition active:scale-[.985] hover:bg-white/30`}
            >
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/35 bg-white/30">
                <Icon className="h-6 w-6 text-white" strokeWidth={1.5} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-seasons text-[19px] leading-tight text-white">{title}</p>
                <p className="mt-1 line-clamp-2 text-[12px] font-light leading-snug text-white/80">
                  {desc}
                </p>
                <div className="mt-2 flex items-center gap-3 text-[10.5px] text-white/75">
                  <span>{journeyIds.length} Guided Journeys</span>
                  <span className="h-1 w-1 rounded-full bg-white/40" />
                  <span>{practiceIds.length} Quick Practices</span>
                </div>
              </div>
            </Link>
          );
        })}
        {query && filtered.categories.length === 0 && (
          <p className="rounded-2xl border border-white/30 bg-white/5 p-4 text-center text-[12.5px] font-light text-white/75">
            No matches for "{q}". Try a different word.
          </p>
        )}
      </div>

      {/* Recently Visited */}
      {!query && (
        <section className="mt-8">
          <h2 className="mb-3 font-seasons text-[18px] text-white">Recently Visited</h2>
          <div className="-mx-5 flex gap-3 overflow-x-auto px-5 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {RECENT.map((r) => (
              <Link
                key={r.label}
                to="/experiences/$id"
                params={{ id: r.id }}
                className="shrink-0 rounded-2xl border border-white/35 bg-white/25 p-3 backdrop-blur-xl w-[160px]"
              >
                <p className="font-seasons text-[14px] leading-tight text-white">{r.label}</p>
                <p className="mt-1 inline-flex items-center gap-1 text-[11px] text-white/70">
                  <Clock className="h-3 w-3" /> {r.time}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
