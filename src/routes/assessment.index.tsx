import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { CoffeeScreen } from "@/components/CoffeeScreen";

export const Route = createFileRoute("/assessment/")({
  head: () => ({ meta: [{ title: "Assessment — Savera" }] }),
  component: Page,
});

const QUESTIONS = [
  "I feel emotionally exhausted.",
  "I have trouble falling or staying asleep.",
  "I feel disconnected from the people around me.",
  "I struggle to concentrate on tasks.",
  "I feel overwhelmed by everyday responsibilities.",
  "I've lost interest in things I used to enjoy.",
  "I am hard on myself when I make mistakes.",
  "I worry about the future often.",
  "I feel physically drained without a clear reason.",
  "I find it difficult to ask for help.",
  "I feel a sense of hope about my future.",
  "I feel like I am moving forward in life.",
];

const SCALE = ["Never", "Rarely", "Sometimes", "Often", "Always"];

function Page() {
  const nav = useNavigate();
  const [i, setI] = useState(0);
  const [answers, setAnswers] = useState<(string | null)[]>(() => QUESTIONS.map(() => null));
  const [fading, setFading] = useState(false);

  const total = QUESTIONS.length;
  const q = QUESTIONS[i];
  const current = answers[i];

  const goTo = (next: number) => {
    setFading(true);
    setTimeout(() => {
      setI(next);
      setFading(false);
    }, 260);
  };

  const pick = (val: string) => {
    setAnswers((a) => {
      const copy = [...a];
      copy[i] = val;
      return copy;
    });
  };

  const next = () => {
    if (i < total - 1) goTo(i + 1);
    else nav({ to: "/assessment/processing" });
  };
  const back = () => {
    if (i > 0) goTo(i - 1);
  };

  return (
    <CoffeeScreen>
      <div className="flex min-h-svh flex-col px-6 pt-11 pb-10">
        <div className="flex items-center justify-between">
          <button onClick={back} disabled={i === 0} className="text-sm text-white/90 disabled:opacity-30">←</button>
          <button
            onClick={next}
            disabled={!current}
            className="text-sm font-semibold text-white disabled:opacity-40"
          >
            {i === total - 1 ? "Finish →" : "Next →"}
          </button>
        </div>

        {/* Progress dots */}
        <div className="mt-4 flex items-center justify-center gap-1.5">
          {QUESTIONS.map((_, idx) => (
            <span
              key={idx}
              className={`h-1.5 rounded-full transition-all ${
                idx === i ? "w-6 bg-white" : idx < i ? "w-1.5 bg-white/80" : "w-1.5 bg-white/30"
              }`}
            />
          ))}
        </div>
        <p className="mt-3 text-center text-[11px] font-semibold uppercase tracking-[0.22em] text-white/85">
          Question {i + 1} of {total}
        </p>

        <div className={`transition-opacity duration-300 ${fading ? "opacity-0" : "opacity-100"}`}>
          <h1 className="mt-6 text-center font-seasons text-[28px] font-light leading-[1.25] text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.55)]">
            {q}
          </h1>

          <div className="mt-8 grid grid-cols-2 gap-3">
            {SCALE.map((o, idx) => {
              const active = current === o;
              const wide = idx === SCALE.length - 1 && SCALE.length % 2 === 1;
              return (
                <button
                  key={o}
                  type="button"
                  onClick={() => pick(o)}
                  className={`min-h-[72px] rounded-[24px] border px-4 py-3 text-left shadow-lg transition duration-300 active:scale-[.97] ${
                    wide ? "col-span-2" : ""
                  } ${
                    active
                      ? "border-white bg-white text-[#7a4a1d] shadow-white/20"
                      : "border-white/30 bg-white/10 text-white shadow-black/25 backdrop-blur-sm hover:bg-white/20"
                  }`}
                >
                  <span className="flex h-full items-center justify-between gap-3">
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
