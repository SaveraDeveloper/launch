import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { CoffeeScreen } from "@/components/CoffeeScreen";

export const Route = createFileRoute("/onboarding/challenges")({
  head: () => ({ meta: [{ title: "What's on your mind — Savera" }] }),
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
    <CoffeeScreen>
      <div className="flex min-h-svh flex-col px-6 pt-11 pb-10">
        <div className="flex items-center justify-between">
          <Link to="/onboarding/gender" className="text-sm text-white/90">←</Link>
          <button
            disabled={picked.size === 0}
            onClick={() => nav({ to: "/assessment" })}
            className="text-sm font-semibold text-white disabled:opacity-40"
          >
            Next →
          </button>
        </div>

        <h1 className="mt-6 text-center font-seasons text-[34px] font-light leading-[1.05] text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.55)]">
          What's been<br />on your mind?
        </h1>
        <p className="mx-auto mt-3 max-w-[260px] text-center text-[13px] font-light leading-6 text-white/85">
          Choose what feels closest right now.
        </p>

        <div className="mt-7 grid grid-cols-2 gap-3">
          {OPTIONS.map((o) => {
            const active = picked.has(o);
            return (
              <button
                key={o}
                type="button"
                onClick={() => toggle(o)}
                className={`min-h-[82px] rounded-[24px] border px-4 py-4 text-left shadow-lg transition duration-300 active:scale-[.97] ${
                  active
                    ? "border-white bg-white text-[#7a4a1d] shadow-white/20"
                    : "border-white/30 bg-white/10 text-white shadow-black/25 backdrop-blur-sm hover:bg-white/20"
                }`}
              >
                <span className="flex h-full flex-col justify-between gap-3">
                  <span className="font-seasons text-[18px] leading-tight">{o}</span>
                  <span
                    data-selected={active}
                    className={`choice-dot ml-auto flex h-5 w-5 items-center justify-center rounded-full border ${
                      active ? "border-[#7a4a1d] bg-[#7a4a1d]" : "border-white/50 bg-transparent"
                    }`}
                  >
                    <span className="choice-dot-core h-2 w-2 rounded-full bg-white" />
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        <button
          type="button"
          disabled={picked.size === 0}
          onClick={() => nav({ to: "/assessment" })}
          className="mt-auto rounded-full bg-white py-3.5 text-[13px] font-bold tracking-[0.22em] text-[#7a4a1d] shadow-lg shadow-black/40 disabled:opacity-50"
        >
          NEXT
        </button>
      </div>
    </CoffeeScreen>
  );
}
