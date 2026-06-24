import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import girl from "@/assets/aroha-8.svg.asset.json";
import boy from "@/assets/aroha-9.svg.asset.json";

export const Route = createFileRoute("/onboarding/gender")({
  head: () => ({ meta: [{ title: "About you — Aroha" }] }),
  component: Page,
});

const OPTIONS = ["Female", "Male", "Non-binary", "Other"] as const;
type G = (typeof OPTIONS)[number];

function Page() {
  const nav = useNavigate();
  const [g, setG] = useState<G | "">("");

  return (
    <div className="relative min-h-screen overflow-hidden bg-aroha-cool text-white">
      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-2xl flex-col px-6 pt-16 pb-[32vh]">
        <h1 className="font-display text-[36px] font-bold leading-tight tracking-tight animate-flicker">
          How do you identify?
        </h1>
        <p className="mt-2 text-white/80">This stays private. It helps us tailor your space.</p>

        <div className="mt-8 grid grid-cols-2 gap-3">
          {OPTIONS.map((opt) => {
            const active = g === opt;
            return (
              <button
                key={opt}
                type="button"
                onClick={() => setG(opt)}
                className={`rounded-2xl border px-5 py-5 text-left font-medium transition ${
                  active
                    ? "border-white bg-white text-[#0a1340]"
                    : "border-white/30 bg-white/5 hover:bg-white/10"
                }`}
              >
                {opt}
              </button>
            );
          })}
        </div>

        <button
          type="button"
          disabled={!g}
          onClick={() => nav({ to: "/onboarding/challenges" })}
          className="mt-10 rounded-2xl bg-white px-5 py-4 text-center font-semibold text-[#0a1340] shadow-lg shadow-black/30 disabled:cursor-not-allowed disabled:opacity-50 hover:bg-white/90"
        >
          Continue
        </button>
      </div>

      {/* Girl + boy, same size, sitting on the baseline */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0 flex h-[32vh] items-end justify-center gap-2 px-4">
        <img src={girl.url} alt="" aria-hidden className="h-full w-auto max-w-[45%] object-contain animate-rise" />
        <img src={boy.url}  alt="" aria-hidden className="h-full w-auto max-w-[45%] object-contain animate-rise [animation-delay:120ms]" />
      </div>
    </div>
  );
}
