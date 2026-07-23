import { useEffect, useRef, useState } from "react";
import { Check, Wind, X } from "lucide-react";
import { PRACTICES } from "@/lib/experiencesCatalog";

export function PracticeRunner({ practiceId, onExit }: { practiceId: string; onExit: () => void }) {
  const p = PRACTICES[practiceId];
  const title = p?.title ?? practiceId;
  const totalSeconds = 90;
  const [seconds, setSeconds] = useState(totalSeconds);
  const [phase, setPhase] = useState<"in" | "hold" | "out">("in");
  const [phaseCount, setPhaseCount] = useState(4);
  const [done, setDone] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    timer.current = setInterval(() => {
      setSeconds((s) => {
        if (s <= 1) {
          setDone(true);
          if (timer.current) clearInterval(timer.current);
          return 0;
        }
        return s - 1;
      });
      setPhaseCount((c) => {
        if (c > 1) return c - 1;
        setPhase((ph) => (ph === "in" ? "hold" : ph === "hold" ? "out" : "in"));
        return phase === "in" ? 4 : phase === "hold" ? 6 : 4;
      });
    }, 1000);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [phase]);

  const scale = phase === "in" ? 1.25 : phase === "hold" ? 1.25 : 0.85;
  const progress = ((totalSeconds - seconds) / totalSeconds) * 100;

  return (
    <div className="fixed inset-0 z-40 flex flex-col bg-gradient-to-b from-[#2b1a0f]/85 via-[#3d2415]/85 to-[#1a0f08]/95 backdrop-blur-2xl">
      <div className="flex items-center justify-between px-5 pt-5">
        <button onClick={onExit} aria-label="Exit" className="rounded-full border border-white/25 bg-white/10 p-2 backdrop-blur-xl">
          <X className="h-4 w-4 text-white" />
        </button>
        <p className="text-[10.5px] uppercase tracking-[0.24em] text-white/70">{title}</p>
        <div className="w-8" />
      </div>
      <div className="mx-5 mt-4 h-[3px] overflow-hidden rounded-full bg-white/15">
        <div className="h-full rounded-full bg-amber-200/85 transition-[width] duration-700" style={{ width: `${progress}%` }} />
      </div>

      <div className="flex flex-1 flex-col items-center justify-center px-6">
        {!done ? (
          <>
            <p className="max-w-[300px] text-center text-[13px] font-light text-white/85">
              {p?.summary ?? "Take a few slow, grounding breaths."}
            </p>
            <div className="relative mt-8 flex h-[260px] w-[260px] items-center justify-center">
              <div
                className="absolute h-[220px] w-[220px] rounded-full bg-gradient-to-br from-amber-100/40 to-rose-100/20 blur-xl transition-transform duration-1000 ease-in-out"
                style={{ transform: `scale(${scale})` }}
              />
              <div
                className="absolute h-[180px] w-[180px] rounded-full border border-white/40 bg-white/15 backdrop-blur-2xl transition-transform duration-1000 ease-in-out"
                style={{ transform: `scale(${scale})` }}
              />
              <div className="relative flex flex-col items-center">
                <Wind className="h-5 w-5 text-white/80" />
                <p className="mt-1 font-seasons text-[26px] text-white">
                  {phase === "in" ? "Breathe in" : phase === "hold" ? "Hold" : "Breathe out"}
                </p>
                <p className="mt-1 text-[13px] text-white/80">{phaseCount}</p>
              </div>
            </div>
            <p className="mt-8 text-[12px] font-light text-white/70">{seconds}s remaining</p>
          </>
        ) : (
          <div className="flex flex-col items-center text-center">
            <Check className="h-8 w-8 text-amber-200" />
            <h2 className="mt-2 font-seasons text-[26px] text-white">Nicely done.</h2>
            <p className="mt-2 max-w-[280px] text-[13px] font-light text-white/80">
              A small moment of returning to yourself. Come back to this practice whenever you need it.
            </p>
            <button
              onClick={onExit}
              className="mt-8 rounded-full bg-white px-8 py-3 text-[12px] font-bold tracking-[0.22em] text-[#7a4a1d] shadow-lg shadow-black/40"
            >
              FINISH
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
