import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Check, Sparkles, Wind, X } from "lucide-react";
import { journalsStore, newId, type JournalItem } from "@/lib/journeyKitCatalog";

type Props = { onExit: () => void; display?: "fullscreen" | "sheet" };

const DISTORTIONS = [
  { key: "catastrophizing", label: "Catastrophizing", hint: "Jumping to the worst-case outcome." },
  { key: "mind-reading", label: "Mind Reading", hint: "Assuming you know what others think." },
  { key: "all-or-nothing", label: "All-or-Nothing", hint: "Only two options: perfect or ruined." },
  { key: "personalizing", label: "Personalizing", hint: "Making it about you when it isn't." },
  { key: "shoulds", label: "Shoulds", hint: `The "I must / I should" pressure.` },
  { key: "labeling", label: "Labeling", hint: `Turning one moment into "I am ___".` },
];

const EVIDENCE_FOR = [
  "It happened before",
  "Someone said something",
  "I feel it strongly",
  "My gut says so",
];
const EVIDENCE_AGAINST = [
  "There's no proof yet",
  "I've handled it before",
  "Others see it differently",
  "Feelings aren't facts",
  "One moment ≠ forever",
];

const SOFTENERS = [
  "Sometimes,",
  "It's possible",
  "Right now",
  "Even if",
  "I'm learning that",
  "A part of me feels",
];

export function ThoughtLabRunner({ onExit, display = "fullscreen" }: Props) {
  const [step, setStep] = useState(0);
  const [thought, setThought] = useState("");
  const [caughtBubble, setCaughtBubble] = useState<string | null>(null);
  const [distortions, setDistortions] = useState<string[]>([]);
  const [forList, setForList] = useState<string[]>([]);
  const [againstList, setAgainstList] = useState<string[]>([]);
  const [reframe, setReframe] = useState<string>("");
  const [saved, setSaved] = useState(false);
  const navigate = useNavigate();

  const totalSteps = 6;
  const progress = ((step + 1) / totalSteps) * 100;

  const next = () => setStep((s) => Math.min(s + 1, totalSteps - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const canNext = useMemo(() => {
    if (step === 0) return thought.trim().length > 2;
    if (step === 1) return distortions.length > 0;
    if (step === 2) return forList.length + againstList.length >= 2;
    if (step === 3) return reframe.trim().length > 3;
    return true;
  }, [step, thought, distortions, forList, againstList, reframe]);

  const saveToKit = () => {
    const item: JournalItem = {
      id: newId(),
      title: `Thought Lab · ${new Date().toLocaleDateString(undefined, { month: "short", day: "numeric" })}`,
      body: [
        `Original thought: ${thought}`,
        `Distortion(s): ${distortions.map((d) => DISTORTIONS.find((x) => x.key === d)?.label).join(", ")}`,
        `Evidence for: ${forList.join(" · ") || "—"}`,
        `Evidence against: ${againstList.join(" · ") || "—"}`,
        `Reframe: ${reframe}`,
      ].join("\n\n"),
      mood: "Reflective",
      date: new Date().toISOString(),
      isFavorite: false,
    };
    journalsStore.write([item, ...journalsStore.read()]);
    setSaved(true);
  };

  return (
    <div
      className={`${
        display === "fullscreen"
          ? "fixed inset-0 z-40"
          : "relative h-full rounded-t-[34px] shadow-[0_-22px_70px_rgba(35,18,9,0.55)]"
      } flex flex-col overflow-hidden bg-gradient-to-b from-[#5d3923]/95 via-[#3d2415]/96 to-[#1a0f08]/98 backdrop-blur-2xl`}
    >
      {display === "sheet" && <div className="mx-auto mt-3 h-1.5 w-12 rounded-full bg-white/45" />}
      {/* header */}
      <div className={`flex items-center justify-between px-5 ${display === "sheet" ? "pt-4" : "pt-5"}`}>
        <button onClick={onExit} aria-label="Exit" className="rounded-full border border-white/25 bg-white/10 p-2 backdrop-blur-xl">
          <X className="h-4 w-4 text-white" />
        </button>
        <p className="text-[10.5px] uppercase tracking-[0.24em] text-white/70">
          Thought Lab · {step + 1}/{totalSteps}
        </p>
        <div className="w-8" />
      </div>
      <div className="mx-5 mt-4 h-[3px] overflow-hidden rounded-full bg-white/15">
        <div className="h-full rounded-full bg-amber-200/85 transition-[width] duration-700" style={{ width: `${progress}%` }} />
      </div>

      {/* content */}
      <div className="flex-1 overflow-y-auto px-5 pt-6 pb-40">
        {step === 0 && (
          <StepCatch
            thought={thought}
            setThought={setThought}
            caughtBubble={caughtBubble}
            setCaughtBubble={(t) => {
              setCaughtBubble(t);
              setThought(t);
            }}
          />
        )}
        {step === 1 && <StepDistort distortions={distortions} setDistortions={setDistortions} />}
        {step === 2 && (
          <StepEvidence
            forList={forList}
            setForList={setForList}
            againstList={againstList}
            setAgainstList={setAgainstList}
          />
        )}
        {step === 3 && <StepReframe reframe={reframe} setReframe={setReframe} />}
        {step === 4 && <StepBreath />}
        {step === 5 && (
          <StepAnchor
            thought={thought}
            reframe={reframe}
            saved={saved}
            onSave={saveToKit}
            onDone={() => {
              onExit();
              navigate({ to: "/journey-kit/journal-archive" });
            }}
          />
        )}
      </div>

      {/* footer */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center px-5 pb-6">
        <div className="pointer-events-auto flex w-full max-w-[430px] items-center justify-between gap-3">
          <button
            onClick={back}
            disabled={step === 0}
            className="inline-flex items-center gap-1 rounded-full border border-white/25 bg-white/10 px-4 py-2.5 text-[12px] text-white/85 backdrop-blur-xl disabled:opacity-40"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>
          {step < totalSteps - 1 ? (
            <button
              onClick={next}
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

/* -------- Step 1: Catch a bubble -------- */
function StepCatch({
  thought,
  setThought,
  caughtBubble,
  setCaughtBubble,
}: {
  thought: string;
  setThought: (s: string) => void;
  caughtBubble: string | null;
  setCaughtBubble: (s: string) => void;
}) {
  const seeds = [
    "I'm going to mess this up",
    "They must think I'm annoying",
    "I'll never figure this out",
    "I'm falling behind everyone",
    "What if it all goes wrong?",
    "I should be doing more",
  ];
  return (
    <div>
      <h2 className="font-seasons text-[24px] leading-tight text-white">Catch a thought.</h2>
      <p className="mt-2 text-[13px] font-light text-white/80">
        Tap a bubble that feels close to something on your mind — or write your own.
      </p>

      <div className="relative mt-5 h-[280px] overflow-hidden rounded-[26px] border border-white/20 bg-white/10 backdrop-blur-xl">
        {seeds.map((s, i) => (
          <button
            key={s}
            onClick={() => setCaughtBubble(s)}
            className={`absolute rounded-full border px-3 py-2 text-[11.5px] font-light text-white shadow-[0_6px_20px_rgba(0,0,0,0.35)] backdrop-blur-xl transition ${
              caughtBubble === s
                ? "border-amber-200 bg-amber-200/40"
                : "border-white/30 bg-white/15 hover:bg-white/25"
            }`}
            style={{
              left: `${(i * 37) % 70 + 5}%`,
              top: `${(i * 53) % 60 + 8}%`,
              animation: `bubble-float ${8 + (i % 4)}s ease-in-out ${i * 0.4}s infinite alternate`,
            }}
          >
            {s}
          </button>
        ))}
        <style>{`@keyframes bubble-float {
          0% { transform: translate3d(0,0,0) scale(1); }
          100% { transform: translate3d(6px,-14px,0) scale(1.03); }
        }`}</style>
      </div>

      <label className="mt-5 flex flex-col gap-2">
        <span className="text-[11px] uppercase tracking-[0.18em] text-white/70">Or write your own</span>
        <textarea
          value={thought}
          onChange={(e) => setThought(e.target.value)}
          rows={3}
          placeholder="The thought I keep replaying is…"
          className="resize-none rounded-2xl border border-white/25 bg-white/15 px-4 py-3 text-[13px] font-light text-white placeholder:text-white/55 backdrop-blur-xl focus:outline-none"
        />
      </label>
    </div>
  );
}

/* -------- Step 2: Distortion cards -------- */
function StepDistort({
  distortions,
  setDistortions,
}: {
  distortions: string[];
  setDistortions: (v: string[]) => void;
}) {
  const toggle = (k: string) =>
    setDistortions(distortions.includes(k) ? distortions.filter((x) => x !== k) : [...distortions, k]);

  return (
    <div>
      <h2 className="font-seasons text-[24px] leading-tight text-white">Name the shape.</h2>
      <p className="mt-2 text-[13px] font-light text-white/80">
        Tap any patterns your thought might be wearing. It's not a diagnosis — it's a lens.
      </p>

      <div className="mt-5 grid grid-cols-2 gap-3">
        {DISTORTIONS.map((d) => {
          const on = distortions.includes(d.key);
          return (
            <button
              key={d.key}
              onClick={() => toggle(d.key)}
              className={`rounded-2xl border p-4 text-left transition active:scale-[.98] ${
                on
                  ? "border-amber-200/80 bg-amber-200/25 shadow-[0_10px_30px_rgba(255,200,120,0.25)]"
                  : "border-white/25 bg-white/12 hover:bg-white/20"
              } backdrop-blur-xl`}
            >
              <div className="flex items-center justify-between">
                <p className="font-seasons text-[15px] leading-tight text-white">{d.label}</p>
                {on && <Check className="h-4 w-4 text-amber-100" />}
              </div>
              <p className="mt-1 text-[11.5px] font-light leading-snug text-white/80">{d.hint}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* -------- Step 3: Evidence scales -------- */
function StepEvidence({
  forList,
  setForList,
  againstList,
  setAgainstList,
}: {
  forList: string[];
  setForList: (v: string[]) => void;
  againstList: string[];
  setAgainstList: (v: string[]) => void;
}) {
  const [customFor, setCustomFor] = useState("");
  const [customAgainst, setCustomAgainst] = useState("");

  const addFor = (s: string) => s && !forList.includes(s) && setForList([...forList, s]);
  const addAgainst = (s: string) => s && !againstList.includes(s) && setAgainstList([...againstList, s]);

  const tilt = againstList.length - forList.length; // + = leans against (softer)
  const rotate = Math.max(-14, Math.min(14, tilt * 4));

  return (
    <div>
      <h2 className="font-seasons text-[24px] leading-tight text-white">Weigh the evidence.</h2>
      <p className="mt-2 text-[13px] font-light text-white/80">
        Add anything that supports the thought, and anything that gently pushes back.
      </p>

      {/* Visual scale */}
      <div className="mt-6 flex items-center justify-center">
        <div className="relative h-[70px] w-[240px]">
          <div className="absolute left-1/2 top-0 h-8 w-[2px] -translate-x-1/2 bg-white/40" />
          <div
            className="absolute top-8 left-1/2 flex h-[10px] w-full -translate-x-1/2 items-center rounded-full bg-white/30 transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-50%) rotate(${rotate}deg)` }}
          >
            <div className="flex h-8 w-1/2 items-center justify-center rounded-l-full border border-white/25 bg-rose-200/25 text-[11px] text-white">
              For · {forList.length}
            </div>
            <div className="flex h-8 w-1/2 items-center justify-center rounded-r-full border border-white/25 bg-emerald-200/25 text-[11px] text-white">
              Against · {againstList.length}
            </div>
          </div>
        </div>
      </div>

      {/* For */}
      <section className="mt-6 rounded-2xl border border-white/25 bg-white/12 p-4 backdrop-blur-xl">
        <p className="mb-2 text-[11px] uppercase tracking-[0.18em] text-rose-100/85">Evidence For</p>
        <div className="flex flex-wrap gap-2">
          {EVIDENCE_FOR.map((e) => (
            <button
              key={e}
              onClick={() => addFor(e)}
              className={`rounded-full border px-3 py-1.5 text-[11.5px] transition ${
                forList.includes(e)
                  ? "border-rose-200 bg-rose-200/40 text-white"
                  : "border-white/25 bg-white/10 text-white/85 hover:bg-white/20"
              }`}
            >
              + {e}
            </button>
          ))}
        </div>
        <div className="mt-3 flex gap-2">
          <input
            value={customFor}
            onChange={(e) => setCustomFor(e.target.value)}
            placeholder="Add your own…"
            className="w-full rounded-full border border-white/25 bg-white/10 px-3 py-2 text-[12px] text-white placeholder:text-white/55 focus:outline-none"
          />
          <button
            onClick={() => {
              addFor(customFor.trim());
              setCustomFor("");
            }}
            className="rounded-full border border-white/25 bg-white/20 px-3 text-[12px] text-white"
          >
            Add
          </button>
        </div>
        {forList.length > 0 && (
          <ul className="mt-3 space-y-1 text-[12px] text-white/85">
            {forList.map((s) => (
              <li key={s} className="flex items-center justify-between gap-2 rounded-lg bg-white/10 px-3 py-1.5">
                <span>{s}</span>
                <button onClick={() => setForList(forList.filter((x) => x !== s))} aria-label="Remove">
                  <X className="h-3.5 w-3.5 text-white/70" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Against */}
      <section className="mt-4 rounded-2xl border border-white/25 bg-white/12 p-4 backdrop-blur-xl">
        <p className="mb-2 text-[11px] uppercase tracking-[0.18em] text-emerald-100/85">Evidence Against</p>
        <div className="flex flex-wrap gap-2">
          {EVIDENCE_AGAINST.map((e) => (
            <button
              key={e}
              onClick={() => addAgainst(e)}
              className={`rounded-full border px-3 py-1.5 text-[11.5px] transition ${
                againstList.includes(e)
                  ? "border-emerald-200 bg-emerald-200/40 text-white"
                  : "border-white/25 bg-white/10 text-white/85 hover:bg-white/20"
              }`}
            >
              + {e}
            </button>
          ))}
        </div>
        <div className="mt-3 flex gap-2">
          <input
            value={customAgainst}
            onChange={(e) => setCustomAgainst(e.target.value)}
            placeholder="Add your own…"
            className="w-full rounded-full border border-white/25 bg-white/10 px-3 py-2 text-[12px] text-white placeholder:text-white/55 focus:outline-none"
          />
          <button
            onClick={() => {
              addAgainst(customAgainst.trim());
              setCustomAgainst("");
            }}
            className="rounded-full border border-white/25 bg-white/20 px-3 text-[12px] text-white"
          >
            Add
          </button>
        </div>
        {againstList.length > 0 && (
          <ul className="mt-3 space-y-1 text-[12px] text-white/85">
            {againstList.map((s) => (
              <li key={s} className="flex items-center justify-between gap-2 rounded-lg bg-white/10 px-3 py-1.5">
                <span>{s}</span>
                <button onClick={() => setAgainstList(againstList.filter((x) => x !== s))} aria-label="Remove">
                  <X className="h-3.5 w-3.5 text-white/70" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

/* -------- Step 4: Reframe with word bank -------- */
function StepReframe({ reframe, setReframe }: { reframe: string; setReframe: (s: string) => void }) {
  const add = (chip: string) => setReframe((reframe + " " + chip).trim());
  return (
    <div>
      <h2 className="font-seasons text-[24px] leading-tight text-white">Soften the story.</h2>
      <p className="mt-2 text-[13px] font-light text-white/80">
        Build a kinder, more honest version. Tap softener words or type freely.
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        {SOFTENERS.map((s) => (
          <button
            key={s}
            onClick={() => add(s)}
            className="rounded-full border border-amber-100/40 bg-amber-100/15 px-3 py-1.5 text-[11.5px] text-amber-50 hover:bg-amber-100/25"
          >
            {s}
          </button>
        ))}
      </div>

      <textarea
        value={reframe}
        onChange={(e) => setReframe(e.target.value)}
        rows={5}
        placeholder="A softer, truer version of the thought…"
        className="mt-4 w-full resize-none rounded-2xl border border-white/25 bg-white/15 px-4 py-3 text-[14px] font-light text-white placeholder:text-white/55 backdrop-blur-xl focus:outline-none"
      />

      <p className="mt-3 text-[11.5px] font-light text-white/65">
        Tip: keep it something you can believe today — not a slogan you don't feel.
      </p>
    </div>
  );
}

/* -------- Step 5: Breathing anchor -------- */
function StepBreath() {
  const [phase, setPhase] = useState<"in" | "hold" | "out">("in");
  const [count, setCount] = useState(4);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    timer.current = setInterval(() => {
      setCount((c) => {
        if (c > 1) return c - 1;
        setPhase((p) => (p === "in" ? "hold" : p === "hold" ? "out" : "in"));
        return phase === "in" ? 7 : phase === "hold" ? 8 : 4;
      });
    }, 1000);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [phase]);

  const scale = phase === "in" ? 1.3 : phase === "hold" ? 1.3 : 0.8;

  return (
    <div className="flex flex-col items-center">
      <h2 className="font-seasons text-[24px] leading-tight text-white">Anchor in your body.</h2>
      <p className="mt-2 text-center text-[13px] font-light text-white/80">
        Follow the circle for a few rounds of 4 · 7 · 8.
      </p>

      <div className="relative mt-10 flex h-[260px] w-[260px] items-center justify-center">
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
          <p className="mt-1 text-[13px] text-white/80">{count}</p>
        </div>
      </div>

      <p className="mt-8 text-center text-[12px] font-light text-white/70">
        Notice: the reframe is easier to feel when the body is calmer.
      </p>
    </div>
  );
}

/* -------- Step 6: Anchor card -------- */
function StepAnchor({
  thought,
  reframe,
  saved,
  onSave,
  onDone,
}: {
  thought: string;
  reframe: string;
  saved: boolean;
  onSave: () => void;
  onDone: () => void;
}) {
  return (
    <div className="flex flex-col items-center">
      <Sparkles className="h-6 w-6 text-amber-200" />
      <h2 className="mt-2 font-seasons text-[24px] leading-tight text-white">Your anchor.</h2>
      <p className="mt-2 max-w-[300px] text-center text-[13px] font-light text-white/80">
        Keep this close for the next time the loop starts.
      </p>

      <div className="mt-6 w-full rounded-[26px] border border-white/25 bg-gradient-to-br from-white/25 to-white/10 p-5 backdrop-blur-2xl">
        <p className="text-[10.5px] uppercase tracking-[0.2em] text-white/65">The thought</p>
        <p className="mt-1 font-seasons text-[16px] leading-snug text-white/95 line-through decoration-white/40">
          {thought || "—"}
        </p>
        <p className="mt-5 text-[10.5px] uppercase tracking-[0.2em] text-amber-100/80">The reframe</p>
        <p className="mt-1 font-seasons text-[19px] leading-snug text-white">{reframe || "—"}</p>
      </div>

      <div className="mt-6 flex w-full flex-col gap-2">
        <button
          onClick={onSave}
          disabled={saved}
          className="rounded-full bg-white py-3 text-[12px] font-bold tracking-[0.22em] text-[#7a4a1d] shadow-lg shadow-black/40 disabled:opacity-70"
        >
          {saved ? "SAVED TO JOURNAL" : "SAVE TO JOURNEY KIT"}
        </button>
        {saved && (
          <button
            onClick={onDone}
            className="rounded-full border border-white/40 bg-white/10 py-3 text-[12px] font-medium tracking-[0.18em] text-white backdrop-blur-xl"
          >
            OPEN JOURNAL ARCHIVE
          </button>
        )}
      </div>
    </div>
  );
}
