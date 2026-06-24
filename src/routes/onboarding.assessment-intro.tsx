import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import girl from "@/assets/aroha-7.svg.asset.json";

export const Route = createFileRoute("/onboarding/assessment-intro")({
  head: () => ({ meta: [{ title: "Your Personalized Assessment — Aroha" }] }),
  component: Page,
});

function Page() {
  // Fade the warm gradient into the cool one on mount.
  const [mode, setMode] = useState<"warm" | "cool">("warm");
  useEffect(() => {
    const t = setTimeout(() => setMode("cool"), 120);
    return () => clearTimeout(t);
  }, []);

  return (
    <div data-mode={mode} className="bg-aroha-morph relative min-h-screen overflow-hidden text-white">
      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-2xl flex-col px-6 pt-20 pb-[42vh]">
        <h1 className="font-display text-[40px] font-bold leading-[1.05] tracking-tight animate-flicker">
          Your Personalized Assessment
        </h1>
        <p className="mt-3 text-white/80">
          A few thoughtful questions to help us understand you better. About 5 minutes.
        </p>

        <div className="mt-10 flex flex-col gap-3">
          <Link
            to="/onboarding/gender"
            className="rounded-2xl bg-white px-5 py-4 text-center font-semibold text-[#0a1340] shadow-lg shadow-black/30 hover:bg-white/90"
          >
            Start Assessment
          </Link>
          <Link
            to="/home"
            className="rounded-2xl border border-white/40 bg-white/5 px-5 py-4 text-center font-medium text-white backdrop-blur hover:bg-white/10"
          >
            Skip for now
          </Link>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-[44vh] overflow-hidden">
        <img
          src={girl.url}
          alt=""
          aria-hidden
          className="absolute inset-x-0 bottom-0 mx-auto w-full max-w-2xl select-none animate-rise"
        />
      </div>
    </div>
  );
}
