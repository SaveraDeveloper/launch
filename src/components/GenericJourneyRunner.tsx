import { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Check, X } from "lucide-react";
import { JOURNEYS } from "@/lib/experiencesCatalog";
import { journalsStore, newId, type JournalItem } from "@/lib/journeyKitCatalog";

const CHAPTERS = [
  {
    title: "Set an intention",
    prompt: "What are you hoping this session helps with — right now, in one sentence?",
    placeholder: "Today I'd like to…",
  },
  {
    title: "Notice what's here",
    prompt: "Name what you're feeling in your body and mind, without fixing it.",
    placeholder: "I notice…",
  },
  {
    title: "Explore the pattern",
    prompt: "When does this pattern usually show up? What tends to come before it?",
    placeholder: "It usually starts when…",
  },
  {
    title: "Try a small shift",
    prompt: "What is one small, gentle thing you could try differently next time?",
    placeholder: "Next time I could…",
  },
  {
    title: "Anchor it",
    prompt: "Write a short line to remember — a truth you want to carry with you.",
    placeholder: "Remember: …",
  },
];

export function GenericJourneyRunner({ journeyId, onExit }: { journeyId: string; onExit: () => void }) {
  const j = JOURNEYS[journeyId];
  const title = j?.title ?? journeyId;
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>(Array(CHAPTERS.length).fill(""));
  const [saved, setSaved] = useState(false);

  const progress = ((step + 1) / CHAPTERS.length) * 100;
  const chapter = CHAPTERS[step];
  const canNext = useMemo(() => answers[step].trim().length > 2, [answers, step]);

  const update = (v: string) => setAnswers((a) => a.map((x, i) => (i === step ? v : x)));

  const save = () => {
    const item: JournalItem = {
      id: newId(),
      title: `${title} · ${new Date().toLocaleDateString(undefined, { month: "short", day: "numeric" })}`,
      body: CHAPTERS.map((c, i) => `${c.title}\n${answers[i] || "—"}`).join("\n\n"),
      mood: "Reflective",
      date: new Date().toISOString(),
      isFavorite: false,
    };
    journalsStore.write([item, ...journalsStore.read()]);
    setSaved(true);
  };

  return (
    <div className="fixed inset-0 z-40 flex flex-col bg-gradient-to-b from-[#2b1a0f]/85 via-[#3d2415]/85 to-[#1a0f08]/95 backdrop-blur-2xl">
      <div className="flex items-center justify-between px-5 pt-5">
        <button onClick={onExit} aria-label="Exit" className="rounded-full border border-white/25 bg-white/10 p-2 backdrop-blur-xl">
          <X className="h-4 w-4 text-white" />
        </button>
        <p className="text-[10.5px] uppercase tracking-[0.24em] text-white/70">
          {title} · {step + 1}/{CHAPTERS.length}
        </p>
        <div className="w-8" />
      </div>
      <div className="mx-5 mt-4 h-[3px] overflow-hidden rounded-full bg-white/15">
        <div className="h-full rounded-full bg-amber-200/85 transition-[width] duration-700" style={{ width: `${progress}%` }} />
      </div>

      <div className="flex-1 overflow-y-auto px-5 pt-6 pb-40">
        <p className="text-[11px] uppercase tracking-[0.24em] text-amber-100/80">Chapter {step + 1}</p>
        <h2 className="mt-1 font-seasons text-[24px] leading-tight text-white">{chapter.title}</h2>
        <p className="mt-3 text-[13px] font-light leading-relaxed text-white/85">{chapter.prompt}</p>
        <textarea
          value={answers[step]}
          onChange={(e) => update(e.target.value)}
          rows={7}
          placeholder={chapter.placeholder}
          className="mt-4 w-full resize-none rounded-2xl border border-white/25 bg-white/15 px-4 py-3 text-[14px] font-light text-white placeholder:text-white/55 backdrop-blur-xl focus:outline-none"
        />

        {step === CHAPTERS.length - 1 && (
          <button
            onClick={save}
            disabled={saved}
            className="mt-5 w-full rounded-full bg-white py-3 text-[12px] font-bold tracking-[0.22em] text-[#7a4a1d] shadow-lg shadow-black/40 disabled:opacity-70"
          >
            {saved ? "SAVED TO JOURNAL" : "SAVE TO JOURNEY KIT"}
          </button>
        )}
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center px-5 pb-6">
        <div className="pointer-events-auto flex w-full max-w-[430px] items-center justify-between gap-3">
          <button
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0}
            className="inline-flex items-center gap-1 rounded-full border border-white/25 bg-white/10 px-4 py-2.5 text-[12px] text-white/85 backdrop-blur-xl disabled:opacity-40"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>
          {step < CHAPTERS.length - 1 ? (
            <button
              onClick={() => setStep((s) => Math.min(CHAPTERS.length - 1, s + 1))}
              disabled={!canNext}
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-[12px] font-bold tracking-[0.22em] text-[#7a4a1d] shadow-lg shadow-black/40 disabled:opacity-40"
            >
              CONTINUE <ArrowRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              onClick={onExit}
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-[12px] font-bold tracking-[0.22em] text-[#7a4a1d] shadow-lg shadow-black/40"
            >
              FINISH <Check className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
