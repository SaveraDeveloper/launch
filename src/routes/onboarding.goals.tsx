import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { CoffeeScreen } from "@/components/CoffeeScreen";
import { ProgressDots } from "@/components/ProgressDots";
import { saveOnboarding, readOnboarding } from "@/lib/userStore";

export const Route = createFileRoute("/onboarding/goals")({
  head: () => ({ meta: [{ title: "What do you want to work towards — Savera" }] }),
  component: Page,
});

const CATEGORIES: { title: string; options: string[] }[] = [
  {
    title: "Emotional Well-Being",
    options: ["Feel calmer", "Manage stress", "Stop overthinking", "Build emotional resilience"],
  },
  {
    title: "Confidence & Identity",
    options: ["Become more confident", "Improve self-esteem", "Discover myself", "Find my purpose"],
  },
  {
    title: "Relationships",
    options: ["Improve friendships", "Build healthier relationships", "Improve communication", "Heal from heartbreak"],
  },
  {
    title: "Productivity",
    options: ["Stay motivated", "Focus better", "Build healthy habits", "Manage my time"],
  },
  {
    title: "Growth",
    options: ["Become my best self", "Learn emotional skills", "Create greater balance", "Feel happier"],
  },
];

function Page() {
  const nav = useNavigate();
  const [picked, setPicked] = useState<Set<string>>(
    () => new Set(readOnboarding().goals || [])
  );

  const toggle = (o: string) =>
    setPicked((s) => {
      const n = new Set(s);
      n.has(o) ? n.delete(o) : n.add(o);
      return n;
    });

  const next = () => {
    saveOnboarding({ goals: [...picked] });
    nav({ to: "/assessment" });
  };

  return (
    <CoffeeScreen>
      <div className="flex min-h-svh flex-col px-6 pt-11 pb-10">
        <div className="flex items-center justify-between">
          <Link to="/onboarding/support" className="text-sm text-white/90">←</Link>
          <button
            disabled={picked.size === 0}
            onClick={next}
            className="text-sm font-semibold text-white disabled:opacity-40"
          >
            Next →
          </button>
        </div>

        <div className="mt-4">
          <ProgressDots step={3} total={8} />
        </div>

        <h1 className="mt-6 text-center font-seasons text-[28px] font-light leading-[1.1] text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.55)]">
          What do you want<br />to work towards?
        </h1>
        <p className="mx-auto mt-2 max-w-[260px] text-center text-[13px] font-light leading-6 text-white/85">
          Choose anything that speaks to you.
        </p>

        <div className="mt-5 flex flex-col gap-5">
          {CATEGORIES.map((cat) => (
            <div key={cat.title}>
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/80">
                {cat.title}
              </p>
              <div className="grid grid-cols-2 gap-2">
                {cat.options.map((o) => {
                  const active = picked.has(o);
                  return (
                    <button
                      key={o}
                      type="button"
                      onClick={() => toggle(o)}
                      className={`min-h-[52px] rounded-2xl border px-3 py-2 text-left text-[13px] leading-tight shadow-md transition duration-300 active:scale-[.97] ${
                        active
                          ? "border-white bg-white text-[#7a4a1d]"
                          : "border-white/30 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20"
                      }`}
                    >
                      {o}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <button
          type="button"
          disabled={picked.size === 0}
          onClick={next}
          className="mt-8 rounded-full bg-white py-3.5 text-[13px] font-bold tracking-[0.22em] text-[#7a4a1d] shadow-lg shadow-black/40 disabled:opacity-50"
        >
          NEXT
        </button>
      </div>
    </CoffeeScreen>
  );
}
