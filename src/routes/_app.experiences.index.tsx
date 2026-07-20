import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Search,
  Brain,
  Heart,
  Users,
  Sparkles,
  GraduationCap,
  Sun,
  Clock,
} from "lucide-react";

export const Route = createFileRoute("/_app/experiences/")({
  head: () => ({ meta: [{ title: "Explore — Savera" }] }),
  component: Page,
});

const CATEGORIES = [
  {
    id: "thoughts",
    title: "Thoughts",
    desc: "Untangle overthinking, worry, and self-talk.",
    Icon: Brain,
    journeys: 4,
    practices: 8,
    tint: "from-amber-200/25 to-amber-500/10",
  },
  {
    id: "emotions",
    title: "Emotions",
    desc: "Meet what you feel with warmth and clarity.",
    Icon: Heart,
    journeys: 5,
    practices: 9,
    tint: "from-rose-200/25 to-rose-500/10",
  },
  {
    id: "relationships",
    title: "Relationships",
    desc: "Deepen connection with the people who matter.",
    Icon: Users,
    journeys: 3,
    practices: 7,
    tint: "from-pink-200/25 to-pink-500/10",
  },
  {
    id: "identity",
    title: "Identity",
    desc: "Explore who you are and who you're becoming.",
    Icon: Sparkles,
    journeys: 3,
    practices: 6,
    tint: "from-violet-200/25 to-violet-500/10",
  },
  {
    id: "school-career",
    title: "School & Career",
    desc: "Focus, motivation, and burnout — gently.",
    Icon: GraduationCap,
    journeys: 4,
    practices: 8,
    tint: "from-sky-200/25 to-sky-500/10",
  },
  {
    id: "lifestyle",
    title: "Lifestyle",
    desc: "Sleep, energy, and small daily rituals.",
    Icon: Sun,
    journeys: 3,
    practices: 10,
    tint: "from-emerald-200/25 to-emerald-500/10",
  },
] as const;

const RECENT = [
  { id: "thoughts", label: "Quiet the Mind", time: "8 min" },
  { id: "emotions", label: "Name the Feeling", time: "5 min" },
  { id: "lifestyle", label: "Wind-down Ritual", time: "10 min" },
];

function Page() {
  const [q, setQ] = useState("");
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
      <div className="mb-6 flex items-center gap-3 rounded-full border border-white/25 bg-white/15 px-4 py-3 backdrop-blur-2xl shadow-[0_8px_24px_rgba(0,0,0,0.28)]">
        <Search className="h-4 w-4 text-white/80" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search concerns, journeys, or practices…"
          className="w-full bg-transparent text-[13px] font-light text-white placeholder:text-white/60 focus:outline-none"
        />
      </div>

      {/* Categories */}
      <div className="flex flex-col gap-3">
        {CATEGORIES.map(({ id, title, desc, Icon, journeys, practices, tint }) => (
          <Link
            key={id}
            to="/experiences/$id"
            params={{ id }}
            className={`group flex items-center gap-4 rounded-[26px] border border-white/25 bg-gradient-to-br ${tint} bg-white/10 p-4 shadow-[0_10px_30px_rgba(0,0,0,0.35)] backdrop-blur-2xl transition active:scale-[.985] hover:bg-white/15`}
          >
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/25 bg-white/15">
              <Icon className="h-6 w-6 text-white" strokeWidth={1.5} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-seasons text-[19px] leading-tight text-white">{title}</p>
              <p className="mt-1 line-clamp-2 text-[12px] font-light leading-snug text-white/80">
                {desc}
              </p>
              <div className="mt-2 flex items-center gap-3 text-[10.5px] text-white/75">
                <span>{journeys} Guided Journeys</span>
                <span className="h-1 w-1 rounded-full bg-white/40" />
                <span>{practices} Quick Practices</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Recently Visited */}
      <section className="mt-8">
        <h2 className="mb-3 font-seasons text-[18px] text-white">Recently Visited</h2>
        <div className="-mx-5 flex gap-3 overflow-x-auto px-5 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {RECENT.map((r) => (
            <Link
              key={r.label}
              to="/experiences/$id"
              params={{ id: r.id }}
              className="shrink-0 rounded-2xl border border-white/20 bg-white/10 p-3 backdrop-blur-xl w-[160px]"
            >
              <p className="font-seasons text-[14px] leading-tight text-white">{r.label}</p>
              <p className="mt-1 inline-flex items-center gap-1 text-[11px] text-white/70">
                <Clock className="h-3 w-3" /> {r.time}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
