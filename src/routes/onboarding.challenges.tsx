import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/onboarding/challenges")({
  head: () => ({ meta: [{ title: "What's on your mind — Aroha" }] }),
  component: Page,
});

const OPTIONS = [
  "Anxiety / overthinking",
  "Emotional numbness",
  "Fear of failure",
  "Low self-esteem",
  "Peer pressure",
  "Relationship issues",
  "Academic burnout",
  "Loneliness",
  "Mood swings",
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
    <div className="relative min-h-screen overflow-hidden bg-aroha-cool text-white">
      <div className="mx-auto flex min-h-screen w-full max-w-2xl flex-col px-6 pt-16 pb-12">
        <h1 className="font-display text-[34px] font-bold leading-tight tracking-tight animate-flicker">
          What's been on your mind?
        </h1>
        <p className="mt-2 text-white/80">Select all that feel true. This is private.</p>

        <div className="mt-6 flex flex-col gap-3">
          {OPTIONS.map((o) => {
            const active = picked.has(o);
            return (
              <button
                key={o}
                type="button"
                onClick={() => toggle(o)}
                className={`flex items-center justify-between rounded-2xl border px-5 py-4 text-left transition ${
                  active
                    ? "border-white bg-white text-[#0a1340]"
                    : "border-white/25 bg-white/5 hover:bg-white/10"
                }`}
              >
                <span className="font-medium">{o}</span>
                <span
                  className={`flex h-6 w-6 items-center justify-center rounded-full border ${
                    active ? "border-[#0a1340] bg-[#0a1340] text-white" : "border-white/40"
                  }`}
                >
                  {active ? "✓" : ""}
                </span>
              </button>
            );
          })}
        </div>

        <button
          type="button"
          disabled={picked.size === 0}
          onClick={() => nav({ to: "/assessment" })}
          className="mt-8 rounded-2xl bg-white px-5 py-4 text-center font-semibold text-[#0a1340] shadow-lg shadow-black/30 disabled:cursor-not-allowed disabled:opacity-50 hover:bg-white/90"
        >
          Start my journey
        </button>
      </div>
    </div>
  );
}
