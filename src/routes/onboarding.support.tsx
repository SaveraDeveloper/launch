import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { MessageCircle, Compass, Sprout } from "lucide-react";
import { CoffeeScreen } from "@/components/CoffeeScreen";
import { ProgressDots } from "@/components/ProgressDots";
import { saveOnboarding, readOnboarding } from "@/lib/userStore";

export const Route = createFileRoute("/onboarding/support")({
  head: () => ({ meta: [{ title: "How can Savera support you — Savera" }] }),
  component: Page,
});

const OPTIONS = [
  { key: "Talk & Listen", desc: "A gentle space to be heard.", Icon: MessageCircle },
  { key: "Guide & Support", desc: "Step-by-step guidance for what's ahead.", Icon: Compass },
  { key: "Build & Grow", desc: "Tools to grow lasting well-being.", Icon: Sprout },
];

function Page() {
  const nav = useNavigate();
  const [picked, setPicked] = useState<Set<string>>(
    () => new Set(readOnboarding().support || [])
  );
  const toggle = (o: string) =>
    setPicked((s) => {
      const n = new Set(s);
      n.has(o) ? n.delete(o) : n.add(o);
      return n;
    });

  const next = () => {
    saveOnboarding({ support: [...picked] });
    nav({ to: "/onboarding/goals" });
  };

  return (
    <CoffeeScreen>
      <div className="flex min-h-svh flex-col px-6 pt-11 pb-10">
        <div className="flex items-center justify-between">
          <Link to="/onboarding/gender" className="text-sm text-white/90">←</Link>
          <button
            disabled={picked.size === 0}
            onClick={next}
            className="text-sm font-semibold text-white disabled:opacity-40"
          >
            Next →
          </button>
        </div>

        <div className="mt-4">
          <ProgressDots step={2} total={8} />
        </div>

        <h1 className="mt-8 text-center font-seasons text-[30px] font-light leading-[1.05] text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.55)]">
          How would you like<br />Savera to support you?
        </h1>
        <p className="mx-auto mt-3 max-w-[260px] text-center text-[13px] font-light leading-6 text-white/85">
          Pick as many as feel right.
        </p>

        <div className="mt-7 flex flex-col gap-3">
          {OPTIONS.map(({ key, desc, Icon }) => {
            const active = picked.has(key);
            return (
              <button
                key={key}
                type="button"
                onClick={() => toggle(key)}
                className={`flex items-center gap-4 rounded-[24px] border px-5 py-4 text-left shadow-lg transition duration-300 active:scale-[.98] ${
                  active
                    ? "border-white bg-white text-[#7a4a1d] shadow-white/20"
                    : "border-white/30 bg-white/10 text-white shadow-black/25 backdrop-blur-sm hover:bg-white/20"
                }`}
              >
                <span
                  className={`flex h-11 w-11 items-center justify-center rounded-full ${
                    active ? "bg-[#7a4a1d]/10 text-[#7a4a1d]" : "bg-white/15 text-white"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                </span>
                <span className="flex-1">
                  <span className="block font-seasons text-[19px] leading-tight">{key}</span>
                  <span className={`mt-0.5 block text-[12px] leading-snug ${active ? "text-[#7a4a1d]/80" : "text-white/80"}`}>
                    {desc}
                  </span>
                </span>
                <span
                  data-selected={active}
                  className={`choice-dot flex h-5 w-5 items-center justify-center rounded-full border ${
                    active ? "border-[#7a4a1d] bg-[#7a4a1d]" : "border-white/50 bg-transparent"
                  }`}
                >
                  <span className="choice-dot-core h-2 w-2 rounded-full bg-white" />
                </span>
              </button>
            );
          })}
        </div>

        <button
          type="button"
          disabled={picked.size === 0}
          onClick={next}
          className="mt-auto rounded-full bg-white py-3.5 text-[13px] font-bold tracking-[0.22em] text-[#7a4a1d] shadow-lg shadow-black/40 disabled:opacity-50"
        >
          NEXT
        </button>
      </div>
    </CoffeeScreen>
  );
}
