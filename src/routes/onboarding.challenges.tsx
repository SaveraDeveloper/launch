import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/onboarding/challenges")({
  head: () => ({ meta: [{ title: "What's on your mind — Aroha" }] }),
  component: Page,
});

const OPTIONS = [
  "Overthinking",
  "Numbness",
  "Fear of failure",
  "Self-doubt",
  "Pressure",
  "Relationships",
  "Burnout",
  "Loneliness",
  "Mood shifts",
];

function Page() {
  const nav = useNavigate();
  const [picked, setPicked] = useState<Set<string>>(new Set());

  const toggle = (o: string) =>
    setPicked((s) => {
      const n = new Set(s);
      n.has(o) ? n.delete(o) : n.add(o);
      return n;
    });

  return (
    <div className="aroha-mobile-screen relative overflow-hidden bg-aroha-cool text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(255,255,255,.24),transparent_32%),radial-gradient(circle_at_15%_72%,rgba(255,255,255,.12),transparent_28%)]" />
      <div className="relative z-10 mx-auto flex min-h-svh w-full flex-col px-6 pt-11 pb-10">
        <div className="flex items-center justify-between">
          <Link to="/onboarding/gender" className="text-sm text-white/85">←</Link>
          <button
            type="button"
            disabled={picked.size === 0}
            onClick={() => nav({ to: "/assessment" })}
            className="text-sm font-semibold text-white disabled:opacity-40"
          >
            Next →
          </button>
        </div>

        <h1 className="mt-8 text-center font-seasons text-[38px] leading-[1.05] animate-flicker">
          What's been<br />on your mind?
        </h1>
        <p className="mx-auto mt-4 max-w-[260px] text-center text-[15px] leading-6 text-white/82">
          Choose what feels closest right now.
        </p>

        <div className="mt-9 grid grid-cols-2 gap-3">
          {OPTIONS.map((o) => {
            const active = picked.has(o);
            return (
              <button
                key={o}
                type="button"
                onClick={() => toggle(o)}
                className={`group min-h-[86px] rounded-[28px] border px-4 py-4 text-left shadow-lg transition duration-300 active:scale-[.97] ${
                  active
                    ? "border-white bg-white text-[#232178] shadow-white/10"
                    : "border-white/22 bg-white/[0.075] text-white shadow-black/15 backdrop-blur-sm hover:bg-white/12"
                }`}
              >
                <span className="flex h-full flex-col justify-between gap-4">
                  <span className="font-seasons text-[22px] leading-tight">{o}</span>
                  <span data-selected={active} className={`choice-dot ml-auto flex h-6 w-6 items-center justify-center rounded-full border ${active ? "border-[#232178] bg-[#232178]" : "border-white/42 bg-transparent"}`}>
                    <span className="choice-dot-core h-2.5 w-2.5 rounded-full bg-white" />
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
