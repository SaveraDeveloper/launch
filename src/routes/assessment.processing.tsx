import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { CoffeeScreen } from "@/components/CoffeeScreen";
import sunflower from "@/assets/SunflowerTransparent.png.asset.json";
import { Heart, Brain, Sparkles, Compass, Star, Check } from "lucide-react";

export const Route = createFileRoute("/assessment/processing")({
  head: () => ({ meta: [{ title: "Creating your space — Savera" }] }),
  component: Page,
});

const STEPS = [
  { label: "Getting to know you", Icon: Heart },
  { label: "Understanding how you think", Icon: Brain },
  { label: "Personalizing your experience", Icon: Sparkles },
  { label: "Preparing your recommendations", Icon: Compass },
  { label: "Building your personal snapshot", Icon: Star },
];

const STEP_MS = 1200;

function Page() {
  const nav = useNavigate();
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (idx >= STEPS.length) {
      const t = setTimeout(() => nav({ to: "/onboarding/ready" }), 900);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setIdx((i) => i + 1), STEP_MS);
    return () => clearTimeout(t);
  }, [idx, nav]);

  return (
    <CoffeeScreen hideGirl>
      <div className="flex min-h-svh flex-col items-center justify-center px-6">
        <div className="w-full max-w-[340px] rounded-[32px] border border-white/40 bg-white/12 p-7 shadow-2xl shadow-black/40 backdrop-blur-xl">
          <div className="mx-auto mb-4 h-16 w-16">
            <img src={sunflower.url} alt="" aria-hidden className="h-full w-full object-contain drop-shadow-[0_4px_14px_rgba(0,0,0,0.35)]" />
          </div>
          <h1 className="text-center font-seasons text-[26px] font-light leading-[1.15] text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.55)]">
            Creating Your Space
          </h1>

          <ul className="mt-6 flex flex-col gap-3">
            {STEPS.map(({ label, Icon }, i) => {
              const done = i < idx;
              const active = i === idx;
              return (
                <li
                  key={label}
                  className={`flex items-center gap-3 rounded-2xl border px-4 py-3 transition-all duration-500 ${
                    done || active
                      ? "border-white/40 bg-white/15 text-white"
                      : "border-white/15 bg-white/5 text-white/55"
                  }`}
                >
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                      done ? "bg-white text-[#7a4a1d]" : active ? "bg-white/25 text-white" : "bg-white/10 text-white/60"
                    }`}
                  >
                    {done ? <Check className="h-4 w-4" /> : <Icon className="h-4 w-4" />}
                  </span>
                  <span className="text-[13px] font-light">{label}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </CoffeeScreen>
  );
}
