import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { CoffeeScreen } from "@/components/CoffeeScreen";

export const Route = createFileRoute("/onboarding/assessment-intro")({
  head: () => ({ meta: [{ title: "Your Personalized Assessment — Savera" }] }),
  component: Page,
});

const FULL_TITLE = "Your Personalized\nAssessment";

function Page() {
  const nav = useNavigate();
  const [typed, setTyped] = useState("");
  useEffect(() => {
    let i = 0;
    const iv = setInterval(() => {
      i += 1;
      setTyped(FULL_TITLE.slice(0, i));
      if (i >= FULL_TITLE.length) clearInterval(iv);
    }, 65);
    return () => clearInterval(iv);
  }, []);

  const done = typed.length >= FULL_TITLE.length;

  return (
    <CoffeeScreen hideGirl>
      <div className="flex min-h-svh flex-col px-6 pt-11 pb-10">
        <div className="flex items-center justify-between">
          <Link to="/onboarding/location" className="text-sm text-white/90">←</Link>
          <span className="text-sm text-white/40">Step 4 of 5</span>
        </div>

        {/* Centered glass card */}
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-[340px] rounded-[32px] border border-white/40 bg-white/12 p-8 text-center shadow-2xl shadow-black/40 backdrop-blur-xl">
            <h1 className="font-seasons min-h-[72px] whitespace-pre-line text-[30px] font-light leading-[1.1] text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.55)]">
              {typed}
              <span className={`ml-0.5 inline-block w-[2px] bg-white/80 align-middle ${done ? "opacity-0" : "animate-pulse"}`} style={{ height: "0.9em" }} />
            </h1>
            <p className="mx-auto mt-4 max-w-[260px] text-[14px] font-light leading-6 text-white/90">
              A few thoughtful questions help us understand you better.
            </p>
            <p className="mt-3 text-[12px] font-light uppercase tracking-[0.24em] text-white/70">
              About 5 minutes
            </p>

            <button
              onClick={() => nav({ to: "/onboarding/gender" })}
              className="mt-7 w-full rounded-full bg-white py-3.5 text-[12px] font-bold tracking-[0.22em] text-[#7a4a1d] shadow-lg shadow-black/40"
            >
              BEGIN ASSESSMENT
            </button>
          </div>
        </div>
      </div>
    </CoffeeScreen>
  );
}
