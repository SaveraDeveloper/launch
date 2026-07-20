import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Sparkles,
  BookOpen,
  ChevronRight,
  Zap,
  NotebookPen,
  Coffee,
  TrendingUp,
  Clock,
  Brain,
  ArrowRight,
  ImageIcon,
} from "lucide-react";
import { firstName } from "@/lib/userStore";

export const Route = createFileRoute("/_app/home")({
  head: () => ({ meta: [{ title: "Home — Savera" }] }),
  component: Page,
});

const EMOTIONS = [
  { label: "Great", emoji: "😄", ring: "from-amber-300/60 to-amber-500/30" },
  { label: "Calm", emoji: "🙂", ring: "from-emerald-300/60 to-emerald-500/30" },
  { label: "Neutral", emoji: "😐", ring: "from-stone-300/60 to-stone-500/30" },
  { label: "Low", emoji: "🙁", ring: "from-sky-300/60 to-sky-500/30" },
  { label: "Overwhelmed", emoji: "😢", ring: "from-violet-300/60 to-violet-500/30" },
];

const JOURNEY = [
  { title: "Morning Pages", subtitle: "Journaling · 5 min" },
  { title: "Thought Lab", subtitle: "Activity · 10 min" },
  { title: "Self-Compassion Notes", subtitle: "Reflection · 11 min" },
];

const QUICK = [
  { title: "Journal", desc: "Write your thoughts", Icon: NotebookPen, to: "/tracking" as const },
  { title: "Talk to Savera", desc: "Chat about anything", Icon: Coffee, to: "/companion" as const },
  { title: "View Progress", desc: "Track your growth", Icon: TrendingUp, to: "/progress" as const },
];

function GlassCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-[28px] border border-white/20 bg-white/[0.07] p-5 shadow-[0_8px_32px_rgba(0,0,0,0.35)] backdrop-blur-xl ${className}`}
    >
      {children}
    </div>
  );
}

function Page() {
  const [name, setName] = useState("friend");
  const [mood, setMood] = useState<string | null>(null);
  useEffect(() => setName(firstName()), []);

  return (
    <div className="mx-auto w-full max-w-[430px] px-5 pt-10 animate-soft-in">
      {/* Header — breathing room shows apartment behind */}
      <header className="mb-8">
        <h1 className="font-seasons text-[28px] font-light leading-tight text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.55)]">
          Good Evening, {name} 🌻
        </h1>
        <p className="mt-6 font-body text-[15px] font-light text-white/85">
          How are you feeling today?
        </p>
      </header>

      {/* Emotion selector */}
      <div className="mb-8 flex items-start justify-between gap-1">
        {EMOTIONS.map((e) => {
          const active = mood === e.label;
          return (
            <button
              key={e.label}
              onClick={() => setMood(e.label)}
              className="flex min-w-0 flex-1 flex-col items-center gap-2"
            >
              <span
                className={`flex h-14 w-14 items-center justify-center rounded-full border text-[26px] leading-none backdrop-blur-xl transition ${
                  active
                    ? "border-white/70 bg-white/25 scale-105 shadow-[0_0_20px_rgba(255,255,255,0.35)]"
                    : "border-white/20 bg-white/10"
                }`}
              >
                {e.emoji}
              </span>
              <span className="font-seasons text-[12px] text-white/90">{e.label}</span>
            </button>
          );
        })}
      </div>

      {/* Today's Recommendation */}
      <GlassCard className="mb-6">
        <div className="mb-4 flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-amber-200" />
          <h2 className="font-seasons text-[18px] text-white">Today's Recommendation</h2>
        </div>
        <div className="flex gap-4">
          <div className="flex h-28 w-24 shrink-0 items-center justify-center rounded-2xl border border-white/15 bg-white/10 text-white/40">
            <ImageIcon className="h-8 w-8" strokeWidth={1.2} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-seasons text-[22px] leading-tight text-white">Thought Lab</p>
            <p className="mt-1 text-[13px] font-light leading-snug text-white/80">
              Let's untangle what's been on your mind today.
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-full border border-white/20 px-2.5 py-1 text-[11px] text-white/85">
                <Brain className="h-3 w-3" /> Reflection
              </span>
              <span className="inline-flex items-center gap-1 rounded-full border border-white/20 px-2.5 py-1 text-[11px] text-white/85">
                <Clock className="h-3 w-3" /> 15 min
              </span>
              <Link
                to="/experiences/$id/active"
                params={{ id: "thought-lab" }}
                className="ml-auto inline-flex items-center gap-1 rounded-full bg-gradient-to-b from-amber-200 to-amber-400 px-4 py-1.5 text-[12px] font-semibold text-[#5a3410] shadow-[0_4px_16px_rgba(255,190,90,0.45)]"
              >
                Start <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </div>
        </div>
      </GlassCard>

      {/* Continue Journey */}
      <GlassCard className="mb-6">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-white/85" />
            <h2 className="font-seasons text-[18px] text-white">Continue Journey</h2>
          </div>
          <Link to="/experiences" className="inline-flex items-center gap-1 text-[12px] text-white/85">
            View All <ChevronRight className="h-3 w-3" />
          </Link>
        </div>
        <div className="grid grid-cols-3 gap-2.5">
          {JOURNEY.map((j) => (
            <div key={j.title} className="rounded-2xl border border-white/15 bg-white/10 p-2.5 backdrop-blur">
              <div className="mb-2 flex aspect-square items-center justify-center rounded-xl border border-white/15 bg-white/10 text-white/40">
                <ImageIcon className="h-5 w-5" strokeWidth={1.2} />
              </div>
              <p className="font-seasons text-[13px] leading-tight text-white">{j.title}</p>
              <p className="mt-0.5 text-[10px] font-light text-white/70">{j.subtitle}</p>
              <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-white/15">
                <div className="h-full w-0 rounded-full bg-white/80" />
              </div>
              <p className="mt-1 text-[10px] text-white/60">0%</p>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* Quick Actions */}
      <GlassCard className="mb-6">
        <div className="mb-4 flex items-center gap-2">
          <Zap className="h-4 w-4 text-amber-200" />
          <h2 className="font-seasons text-[18px] text-white">Quick Actions</h2>
        </div>
        <div className="grid grid-cols-3 gap-2.5">
          {QUICK.map(({ title, desc, Icon, to }) => (
            <Link
              key={title}
              to={to}
              className="flex flex-col gap-2 rounded-2xl border border-white/15 bg-white/10 p-3 backdrop-blur transition hover:bg-white/15"
            >
              <Icon className="h-5 w-5 text-amber-100" strokeWidth={1.5} />
              <div>
                <p className="font-seasons text-[13px] leading-tight text-white">{title}</p>
                <p className="mt-0.5 text-[10px] font-light leading-snug text-white/70">{desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}
