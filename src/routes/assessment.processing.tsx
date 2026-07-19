import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { CoffeeScreen } from "@/components/CoffeeScreen";
import sunflower from "@/assets/SunflowerTransparent.png.asset.json";

export const Route = createFileRoute("/assessment/processing")({
  head: () => ({ meta: [{ title: "Creating your space — Savera" }] }),
  component: Page,
});

const MESSAGES = [
  "Getting to know you",
  "Understanding how you think",
  "Personalizing your experience",
  "Preparing your recommendations",
  "Building your personal snapshot",
];

const TOTAL_MS = 6000;
const STEP_MS = TOTAL_MS / MESSAGES.length;

function Page() {
  const nav = useNavigate();
  const [idx, setIdx] = useState(0);
  const [progress, setProgress] = useState(0);

  // Rotate messages
  useEffect(() => {
    if (idx >= MESSAGES.length - 1) return;
    const t = setTimeout(() => setIdx((i) => i + 1), STEP_MS);
    return () => clearTimeout(t);
  }, [idx]);

  // Animate progress bar smoothly (updated every 60ms)
  useEffect(() => {
    const start = Date.now();
    const iv = setInterval(() => {
      const elapsed = Date.now() - start;
      const pct = Math.min(100, (elapsed / TOTAL_MS) * 100);
      setProgress(pct);
      if (pct >= 100) {
        clearInterval(iv);
        setTimeout(() => nav({ to: "/onboarding/ready" }), 600);
      }
    }, 60);
    return () => clearInterval(iv);
  }, [nav]);

  return (
    <CoffeeScreen hideGirl blurBg>
      <div className="flex min-h-svh flex-col items-center justify-center px-6">
        <div className="w-full max-w-[340px] rounded-[32px] border border-white/40 bg-white/12 p-8 shadow-2xl shadow-black/40 backdrop-blur-xl">
          <div className="mx-auto mb-4 h-16 w-16">
            <img
              src={sunflower.url}
              alt=""
              aria-hidden
              className="h-full w-full object-contain drop-shadow-[0_4px_14px_rgba(0,0,0,0.35)]"
            />
          </div>
          <h1 className="text-center font-seasons text-[26px] font-light leading-[1.15] text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.55)]">
            Creating Your Space
          </h1>

          {/* Progress bar */}
          <div className="mt-8 h-1.5 w-full overflow-hidden rounded-full bg-white/15">
            <div
              className="h-full rounded-full bg-white transition-[width] duration-100 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Rotating status text with crossfade */}
          <div className="mt-5 flex h-12 items-center justify-center">
            {MESSAGES.map((m, i) => (
              <p
                key={m}
                className={`absolute px-4 text-center text-[13px] font-light text-white/90 transition-opacity duration-500 ${
                  i === idx ? "opacity-100" : "opacity-0"
                }`}
              >
                {m}
              </p>
            ))}
          </div>
        </div>
      </div>
    </CoffeeScreen>
  );
}
