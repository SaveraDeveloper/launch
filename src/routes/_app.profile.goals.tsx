import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ChevronLeft, Plus, Pause, Play, Check, X } from "lucide-react";
import { readOnboarding } from "@/lib/userStore";

export const Route = createFileRoute("/_app/profile/goals")({
  head: () => ({ meta: [{ title: "Goals — Savera" }] }),
  component: Page,
});

type Goal = {
  id: string;
  title: string;
  focus: string;
  suggested: string[];
  progress: number; // 0-100
  status: "active" | "paused" | "complete";
};

const JOURNEY_HINTS: Record<string, string[]> = {
  default: ["Thought Lab", "Calm Rhythm"],
  overthinking: ["Thought Lab", "Let Go Ritual"],
  confidence: ["Confidence Path", "Mirror Work"],
  sleep: ["Wind Down", "Body Scan"],
};

function suggestionsFor(title: string): string[] {
  const t = title.toLowerCase();
  if (t.includes("overthink")) return JOURNEY_HINTS.overthinking;
  if (t.includes("confid")) return JOURNEY_HINTS.confidence;
  if (t.includes("sleep")) return JOURNEY_HINTS.sleep;
  return JOURNEY_HINTS.default;
}

function Page() {
  const d = readOnboarding();
  const initial = useMemo<Goal[]>(() => {
    const seeds = d.goals && d.goals.length ? d.goals : ["Build Confidence", "Reduce Overthinking", "Improve Sleep"];
    return seeds.map((g, i) => ({
      id: `${i}-${g}`,
      title: g,
      focus: "Gentle daily steps.",
      suggested: suggestionsFor(g),
      progress: [24, 52, 12][i % 3],
      status: "active" as const,
    }));
  }, [d.goals]);

  const [goals, setGoals] = useState<Goal[]>(initial);
  const [adding, setAdding] = useState(false);
  const [draft, setDraft] = useState("");

  const update = (id: string, patch: Partial<Goal>) =>
    setGoals((g) => g.map((x) => (x.id === id ? { ...x, ...patch } : x)));

  const add = () => {
    if (!draft.trim()) return;
    setGoals((g) => [
      ...g,
      {
        id: `${Date.now()}`,
        title: draft.trim(),
        focus: "Just starting.",
        suggested: suggestionsFor(draft),
        progress: 0,
        status: "active",
      },
    ]);
    setDraft("");
    setAdding(false);
  };

  return (
    <div className="mx-auto w-full max-w-[430px] px-5 pt-10 pb-4 animate-soft-in">
      <Link to="/profile" className="mb-4 inline-flex items-center gap-1 text-[13px] text-white/85">
        <ChevronLeft className="h-4 w-4" /> Profile
      </Link>

      <header className="mb-5">
        <h1 className="font-seasons text-[28px] text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.55)]">
          🎯 Goals
        </h1>
        <p className="mt-1 text-[12.5px] font-light text-white/80">
          Flexible, not rigid. Update them anytime.
        </p>
      </header>

      <div className="flex flex-col gap-3">
        {goals.map((g) => (
          <GoalCard key={g.id} goal={g} onChange={(p) => update(g.id, p)} />
        ))}

        {adding ? (
          <div className="rounded-[24px] border border-white/30 bg-white/12 p-4 backdrop-blur-2xl">
            <input
              autoFocus
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="New goal…"
              className="w-full bg-transparent text-[14px] font-light text-white placeholder:text-white/55 focus:outline-none"
            />
            <div className="mt-3 flex gap-2">
              <button
                onClick={add}
                className="flex-1 rounded-full bg-white/90 py-2 text-[12px] font-semibold text-[#7a4a1d]"
              >
                Add
              </button>
              <button
                onClick={() => {
                  setAdding(false);
                  setDraft("");
                }}
                className="rounded-full border border-white/35 px-4 py-2 text-[12px] text-white/80"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setAdding(true)}
            className="flex items-center justify-center gap-2 rounded-full border border-dashed border-white/30 bg-white/5 py-3 text-[12.5px] font-light text-white/85 backdrop-blur-xl hover:bg-white/25"
          >
            <Plus className="h-4 w-4" /> Add a Goal
          </button>
        )}
      </div>
    </div>
  );
}

function GoalCard({ goal, onChange }: { goal: Goal; onChange: (p: Partial<Goal>) => void }) {
  const isPaused = goal.status === "paused";
  const isDone = goal.status === "complete";
  return (
    <article
      className={`rounded-[26px] border border-white/35 bg-white/25 p-4 shadow-[0_10px_30px_rgba(0,0,0,0.3)] backdrop-blur-2xl transition ${
        isDone ? "opacity-70" : ""
      }`}
    >
      <div className="mb-3 flex items-start gap-3">
        <ProgressRing value={isDone ? 100 : goal.progress} />
        <div className="min-w-0 flex-1">
          <h3 className="font-seasons text-[17px] leading-tight text-white">{goal.title}</h3>
          <p className="mt-0.5 text-[11.5px] font-light text-white/75">
            {isPaused ? "Paused" : isDone ? "Completed" : goal.focus}
          </p>
        </div>
      </div>

      {!isDone && (
        <div className="mb-3">
          <p className="mb-1.5 text-[10.5px] uppercase tracking-[0.18em] text-white/60">
            Suggested Journeys
          </p>
          <div className="flex flex-wrap gap-1.5">
            {goal.suggested.map((s) => (
              <span
                key={s}
                className="rounded-full border border-white/35 bg-white/25 px-2.5 py-1 text-[11px] font-light text-white/90"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="flex gap-2">
        {!isDone && (
          <button
            onClick={() => onChange({ status: isPaused ? "active" : "paused" })}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-full border border-white/35 bg-white/25 py-2 text-[11.5px] font-light text-white/90 hover:bg-white/30"
          >
            {isPaused ? <Play className="h-3.5 w-3.5" /> : <Pause className="h-3.5 w-3.5" />}
            {isPaused ? "Resume" : "Pause"}
          </button>
        )}
        {!isDone && (
          <button
            onClick={() => onChange({ status: "complete", progress: 100 })}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-full border border-white/35 bg-white/25 py-2 text-[11.5px] font-light text-white/90 hover:bg-white/30"
          >
            <Check className="h-3.5 w-3.5" /> Complete
          </button>
        )}
        {isDone && (
          <button
            onClick={() => onChange({ status: "active" })}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-full border border-white/35 bg-white/25 py-2 text-[11.5px] font-light text-white/90 hover:bg-white/30"
          >
            <X className="h-3.5 w-3.5" /> Reopen
          </button>
        )}
      </div>
    </article>
  );
}

function ProgressRing({ value }: { value: number }) {
  const r = 20;
  const c = 2 * Math.PI * r;
  const off = c - (value / 100) * c;
  return (
    <svg width="52" height="52" viewBox="0 0 52 52" className="shrink-0">
      <circle cx="26" cy="26" r={r} stroke="rgba(255,255,255,0.2)" strokeWidth="4" fill="none" />
      <circle
        cx="26"
        cy="26"
        r={r}
        stroke="rgba(255,220,150,0.9)"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
        strokeDasharray={c}
        strokeDashoffset={off}
        transform="rotate(-90 26 26)"
        style={{ transition: "stroke-dashoffset 600ms ease" }}
      />
      <text
        x="26"
        y="30"
        textAnchor="middle"
        fontSize="11"
        fill="white"
        fontWeight="300"
      >
        {Math.round(value)}%
      </text>
    </svg>
  );
}
