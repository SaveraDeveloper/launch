import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft, Clock, BookOpen, Sparkles } from "lucide-react";

export const Route = createFileRoute("/_app/experiences/$id/")({
  head: () => ({ meta: [{ title: "Concern — Savera" }] }),
  component: Page,
});

const CONTENT: Record<
  string,
  {
    title: string;
    intro: string;
    journeys: { id: string; title: string; desc: string; time: string; progress: number }[];
    practices: { id: string; title: string; time: string; summary: string }[];
  }
> = {
  thoughts: {
    title: "Thoughts",
    intro: "A soft place to slow the racing mind and notice patterns with kindness.",
    journeys: [
      { id: "quiet-mind", title: "Quiet the Mind", desc: "Learn to soften mental noise over seven gentle days.", time: "7 days · 10 min/day", progress: 20 },
      { id: "thought-lab", title: "Thought Lab", desc: "Untangle recurring worries with guided reflections.", time: "5 sessions · 12 min", progress: 0 },
    ],
    practices: [
      { id: "box-breath", title: "Box Breath", time: "3 min", summary: "Steady the nervous system in a minute or two." },
      { id: "reframe", title: "Gentle Reframe", time: "5 min", summary: "Meet a hard thought with a softer one." },
      { id: "worry-window", title: "Worry Window", time: "8 min", summary: "Contain worry to a focused, kind space." },
    ],
  },
  emotions: {
    title: "Emotions",
    intro: "Feelings are messengers. Let's welcome them together.",
    journeys: [
      { id: "name-feeling", title: "Name the Feeling", desc: "Build an emotional vocabulary you can trust.", time: "6 days · 8 min/day", progress: 0 },
      { id: "self-compassion", title: "Self-Compassion Notes", desc: "A tender practice for hard moments.", time: "7 sessions · 11 min", progress: 40 },
    ],
    practices: [
      { id: "feelings-map", title: "Feelings Map", time: "4 min", summary: "Locate what's alive in your body right now." },
      { id: "soothing-touch", title: "Soothing Touch", time: "3 min", summary: "A tiny gesture of care for yourself." },
      { id: "letter", title: "Kind Letter", time: "10 min", summary: "Write to yourself the way a friend would." },
    ],
  },
};

function Page() {
  const { id } = Route.useParams();
  const data =
    CONTENT[id] ?? {
      title: id.replace(/-/g, " "),
      intro: "A supportive space to explore this area of your life.",
      journeys: [
        { id: "starter", title: "Starter Journey", desc: "A gentle first step into this space.", time: "5 days · 10 min", progress: 0 },
        { id: "deep", title: "Deeper Practice", desc: "For when you're ready to go further.", time: "10 sessions · 12 min", progress: 0 },
      ],
      practices: [
        { id: "breath", title: "One Breath", time: "2 min", summary: "A single, kind breath to reset." },
        { id: "check-in", title: "Check-in", time: "4 min", summary: "Notice how today is landing." },
        { id: "grounding", title: "Grounding 5-4-3-2-1", time: "5 min", summary: "Anchor yourself in the room." },
      ],
    };

  return (
    <div className="mx-auto w-full max-w-[430px] px-5 pt-8 pb-6 animate-soft-in">
      <div className="mb-5 flex items-center justify-between">
        <Link to="/experiences" className="inline-flex items-center gap-1 text-sm text-white/90">
          <ChevronLeft className="h-4 w-4" /> Explore
        </Link>
      </div>

      <header className="mb-6 text-center">
        <p className="text-[11px] font-light uppercase tracking-[0.24em] text-white/70">Concern</p>
        <h1 className="mt-1 font-seasons text-[30px] font-light leading-tight text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.55)]">
          {data.title}
        </h1>
        <p className="mx-auto mt-3 max-w-[300px] text-[13px] font-light leading-relaxed text-white/85">
          {data.intro}
        </p>
      </header>

      {/* Guided Journeys */}
      <section className="mb-8">
        <div className="mb-3 flex items-center gap-2">
          <BookOpen className="h-4 w-4 text-white/90" />
          <h2 className="font-seasons text-[18px] text-white">Guided Journeys</h2>
        </div>
        <div className="flex flex-col gap-3">
          {data.journeys.slice(0, 2).map((j) => (
            <Link
              key={j.id}
              to="/experiences/$id/journey/$journeyId"
              params={{ id, journeyId: j.id }}
              className="rounded-[24px] border border-white/25 bg-white/10 p-4 backdrop-blur-2xl shadow-[0_10px_28px_rgba(0,0,0,0.32)] active:scale-[.99]"
            >
              <p className="font-seasons text-[18px] leading-tight text-white">{j.title}</p>
              <p className="mt-1 text-[12px] font-light leading-snug text-white/80">{j.desc}</p>
              <div className="mt-3 flex items-center justify-between text-[11px] text-white/75">
                <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" /> {j.time}</span>
                <span>{j.progress}%</span>
              </div>
              <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-white/15">
                <div className="h-full rounded-full bg-white/80" style={{ width: `${j.progress}%` }} />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Quick Practices */}
      <section>
        <div className="mb-3 flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-amber-200" />
          <h2 className="font-seasons text-[18px] text-white">Quick Practices</h2>
        </div>
        <div className="flex flex-col gap-3">
          {data.practices.slice(0, 3).map((p) => (
            <Link
              key={p.id}
              to="/experiences/$id/practice/$practiceId"
              params={{ id, practiceId: p.id }}
              className="flex items-center justify-between gap-3 rounded-[22px] border border-white/20 bg-white/10 px-4 py-3 backdrop-blur-xl active:scale-[.99]"
            >
              <div className="min-w-0">
                <p className="font-seasons text-[15px] leading-tight text-white">{p.title}</p>
                <p className="mt-0.5 truncate text-[11.5px] font-light text-white/75">{p.summary}</p>
              </div>
              <span className="shrink-0 rounded-full border border-white/25 bg-white/10 px-2.5 py-1 text-[10.5px] text-white/85">
                {p.time}
              </span>
            </Link>
          ))}
        </div>
      </section>

      <p className="mt-8 text-center text-[11px] font-light text-white/60">
        More lessons & resources unlock as you complete content.
      </p>
    </div>
  );
}
