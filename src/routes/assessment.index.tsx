import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { CoffeeScreen } from "@/components/CoffeeScreen";
import { ProgressDots } from "@/components/ProgressDots";
import { saveOnboarding } from "@/lib/userStore";

export const Route = createFileRoute("/assessment/")({
  head: () => ({ meta: [{ title: "Assessment — Savera" }] }),
  component: Page,
});

// Questions 4–8 of 8 total. Warm, conversational tone.
const QUESTIONS: { q: string; options: string[] }[] = [
  {
    q: "When you're feeling overwhelmed, what usually happens first?",
    options: [
      "My thoughts race",
      "I go quiet or numb",
      "I get irritable",
      "I try to push through",
    ],
  },
  {
    q: "How often do you feel truly rested?",
    options: ["Rarely", "Sometimes", "Often", "Almost every day"],
  },
  {
    q: "How comfortable are you sharing what you feel with others?",
    options: ["Not at all", "A little", "Somewhat", "Very comfortable"],
  },
  {
    q: "When something goes wrong, how do you usually talk to yourself?",
    options: ["Very harshly", "A bit harshly", "Fairly kindly", "With real compassion"],
  },
  {
    q: "What feels most true right now?",
    options: [
      "I need space to breathe",
      "I want gentle direction",
      "I'm ready to grow",
      "I'm not sure yet",
    ],
  },
];

function Page() {
  const nav = useNavigate();
  const [i, setI] = useState(0);
  const [answers, setAnswers] = useState<(string | null)[]>(() => QUESTIONS.map(() => null));
  const [fading, setFading] = useState(false);

  const total = QUESTIONS.length;
  const cur = QUESTIONS[i];
  const current = answers[i];

  const goTo = (next: number) => {
    setFading(true);
    setTimeout(() => {
      setI(next);
      setFading(false);
    }, 300);
  };

  const pick = (val: string) => {
    setAnswers((a) => {
      const copy = [...a];
      copy[i] = val;
      return copy;
    });
    // Auto-advance with fade after brief pause
    setFading(true);
    setTimeout(() => {
      if (i < total - 1) {
        setI(i + 1);
        setFading(false);
      } else {
        const finalAnswers = [...answers];
        finalAnswers[i] = val;
        saveOnboarding({ answers: finalAnswers });
        nav({ to: "/assessment/processing" });
      }
    }, 450);
  };

  const next = () => {
    if (i < total - 1) return goTo(i + 1);
    saveOnboarding({ answers });
    nav({ to: "/assessment/processing" });
  };
  const back = () => {
    if (i > 0) return goTo(i - 1);
    nav({ to: "/onboarding/goals" });
  };

  const stepInFlow = 3 + (i + 1); // Q4..Q8 of 8

  return (
    <CoffeeScreen blurBg>
      <div className="flex min-h-svh flex-col px-6 pt-11 pb-10">
        <div className="flex items-center justify-between">
          <button onClick={back} className="text-sm text-white/90">←</button>
          <button
            onClick={next}
            disabled={!current}
            className="text-sm font-semibold text-white disabled:opacity-40"
          >
            {i === total - 1 ? "Finish →" : "Next →"}
          </button>
        </div>

        <div className="mt-4">
          <ProgressDots step={stepInFlow} total={8} />
        </div>

        <div className={`transition-opacity duration-300 ${fading ? "opacity-0" : "opacity-100"}`}>
          <h1 className="mt-7 text-center font-seasons text-[26px] font-light leading-[1.25] text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.55)]">
            {cur.q}
          </h1>

          <div className="mt-7 flex flex-col gap-3">
            {cur.options.map((o) => {
              const active = current === o;
              return (
                <button
                  key={o}
                  type="button"
                  onClick={() => pick(o)}
                  className={`min-h-[64px] rounded-[22px] border px-5 py-3.5 text-left shadow-lg transition duration-300 active:scale-[.98] ${
                    active
                      ? "border-white bg-white text-[#7a4a1d] shadow-white/20"
                      : "border-white/30 bg-white/10 text-white shadow-black/25 backdrop-blur-sm hover:bg-white/20"
                  }`}
                >
                  <span className="flex items-center justify-between gap-3">
                    <span className="font-seasons text-[18px] leading-tight">{o}</span>
                    <span
                      data-selected={active}
                      className={`choice-dot flex h-5 w-5 items-center justify-center rounded-full border ${
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
        </div>

        <button
          type="button"
          disabled={!current}
          onClick={next}
          className="mt-auto rounded-full bg-white py-3.5 text-[13px] font-bold tracking-[0.22em] text-[#7a4a1d] shadow-lg shadow-black/40 disabled:opacity-50"
        >
          {i === total - 1 ? "FINISH" : "NEXT"}
        </button>
      </div>
    </CoffeeScreen>
  );
}
