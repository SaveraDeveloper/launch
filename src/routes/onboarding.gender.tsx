import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { CoffeeScreen } from "@/components/CoffeeScreen";
import { ProgressDots } from "@/components/ProgressDots";
import { saveOnboarding, readOnboarding } from "@/lib/userStore";

export const Route = createFileRoute("/onboarding/gender")({
  head: () => ({ meta: [{ title: "How do you identify — Savera" }] }),
  component: Page,
});

const OPTIONS = ["Female", "Male", "Non-Binary", "Prefer not to say"];

function Page() {
  const nav = useNavigate();
  const [g, setG] = useState<string>(readOnboarding().gender || "");

  const next = () => {
    saveOnboarding({ gender: g });
    nav({ to: "/onboarding/support" });
  };

  return (
    <CoffeeScreen>
      <div className="flex min-h-svh flex-col px-6 pt-11 pb-10">
        <div className="flex items-center justify-between">
          <Link to="/onboarding/assessment-intro" className="text-sm text-white/90">←</Link>
          <button
            disabled={!g}
            onClick={next}
            className="text-sm font-semibold text-white disabled:opacity-40"
          >
            Next →
          </button>
        </div>

        <div className="mt-4">
          <ProgressDots step={1} total={8} />
        </div>

        <h1 className="mt-8 text-center font-seasons text-[34px] font-light leading-[1.05] text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.55)]">
          How do you<br />identify?
        </h1>
        <p className="mx-auto mt-3 max-w-[260px] text-center text-[13px] font-light leading-6 text-white/85">
          Choose what feels closest to you.
        </p>

        <div className="mt-8 grid grid-cols-2 gap-3">
          {OPTIONS.map((o) => {
            const active = g === o;
            return (
              <button
                key={o}
                type="button"
                onClick={() => setG(o)}
                className={`min-h-[96px] rounded-[24px] border px-4 py-4 text-left shadow-lg transition duration-300 active:scale-[.97] ${
                  active
                    ? "border-white bg-white text-[#7a4a1d] shadow-white/20"
                    : "border-white/30 bg-white/10 text-white shadow-black/25 backdrop-blur-sm hover:bg-white/20"
                }`}
              >
                <span className="flex h-full flex-col justify-between gap-3">
                  <span className="font-seasons text-[19px] leading-tight">{o}</span>
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
          disabled={!g}
          onClick={next}
          className="mt-auto rounded-full bg-white py-3.5 text-[13px] font-bold tracking-[0.22em] text-[#7a4a1d] shadow-lg shadow-black/40 disabled:opacity-50"
        >
          NEXT
        </button>
      </div>
    </CoffeeScreen>
  );
}
