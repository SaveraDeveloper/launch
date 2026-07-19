import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { CoffeeScreen } from "@/components/CoffeeScreen";
import { ProgressDots } from "@/components/ProgressDots";
import { saveOnboarding, readOnboarding } from "@/lib/userStore";

export const Route = createFileRoute("/onboarding/gender")({
  head: () => ({ meta: [{ title: "How do you identify — Savera" }] }),
  component: Page,
});

const OPTIONS = ["Female", "Male", "Non-binary"];

function Page() {
  const nav = useNavigate();
  const [g, setG] = useState<string>(readOnboarding().gender || "");

  const next = () => {
    saveOnboarding({ gender: g });
    nav({ to: "/onboarding/support" });
  };

  const pick = (o: string) => {
    setG(o);
    saveOnboarding({ gender: o });
    setTimeout(() => nav({ to: "/onboarding/support" }), 450);
  };


  return (
    <CoffeeScreen blurBg>
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

        <h1 className="mt-10 text-center font-seasons text-[34px] font-light leading-[1.05] text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.55)]">
          How do you<br />identify?
        </h1>
        <p className="mx-auto mt-3 max-w-[260px] text-center text-[13px] font-light leading-6 text-white/85">
          Choose what feels closest to you.
        </p>

        <div className="mt-10 flex flex-col items-center gap-6">
          {OPTIONS.map((o) => {
            const active = g === o;
            return (
              <button
                key={o}
                type="button"
                onClick={() => pick(o)}
                className={`font-seasons text-[26px] leading-none transition duration-300 ${
                  active
                    ? "text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.55)]"
                    : "text-white/60 hover:text-white/85"
                }`}
              >
                <span className="relative inline-block pb-2">
                  {o}
                  <span
                    className={`absolute -bottom-0.5 left-1/2 h-[2px] -translate-x-1/2 rounded-full bg-white transition-all duration-300 ${
                      active ? "w-10 opacity-100" : "w-0 opacity-0"
                    }`}
                  />
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
