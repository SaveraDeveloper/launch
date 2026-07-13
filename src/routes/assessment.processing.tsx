import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { CoffeeScreen } from "@/components/CoffeeScreen";

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
  "Your space is ready",
];

const STEP_MS = 1400;

function Page() {
  const nav = useNavigate();
  const [idx, setIdx] = useState(0);
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  // Advance through messages
  useEffect(() => {
    if (idx >= MESSAGES.length - 1) return;
    const t = setTimeout(() => {
      setVisible(false);
      setTimeout(() => {
        setIdx((i) => i + 1);
        setVisible(true);
      }, 350);
    }, STEP_MS);
    return () => clearTimeout(t);
  }, [idx]);

  // Smooth progress bar tied to steps
  useEffect(() => {
    const target = ((idx + 1) / MESSAGES.length) * 100;
    let raf: number;
    const start = performance.now();
    const from = progress;
    const dur = 900;
    const step = (now: number) => {
      const p = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setProgress(from + (target - from) * eased);
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx]);

  // After the last message settles, move on
  useEffect(() => {
    if (idx !== MESSAGES.length - 1) return;
    const t = setTimeout(() => nav({ to: "/onboarding/ready" }), 1400);
    return () => clearTimeout(t);
  }, [idx, nav]);

  return (
    <CoffeeScreen>
      <div className="flex min-h-svh flex-col items-center justify-center px-8 text-center">
        <h1 className="font-seasons text-[32px] font-light leading-[1.15] text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.55)]">
          Creating<br />Your Space
        </h1>

        <div className="mt-10 w-full max-w-[320px]">
          <div className="h-2 w-full overflow-hidden rounded-full bg-white/20">
            <div
              className="h-full rounded-full bg-white shadow-[0_0_18px_rgba(255,255,255,0.5)] transition-[width] duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="mt-8 h-8">
          <p
            className={`font-body text-[15px] font-light text-white/90 transition-opacity duration-300 ${
              visible ? "opacity-100" : "opacity-0"
            }`}
          >
            {MESSAGES[idx]}…
          </p>
        </div>
      </div>
    </CoffeeScreen>
  );
}
