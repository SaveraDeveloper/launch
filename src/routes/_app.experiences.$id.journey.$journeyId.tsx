import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft, Layers, Clock, Gauge, Sprout } from "lucide-react";

export const Route = createFileRoute("/_app/experiences/$id/journey/$journeyId")({
  head: () => ({ meta: [{ title: "Guided Journey — Savera" }] }),
  component: Page,
});

function Page() {
  const { id, journeyId } = Route.useParams();
  const title = journeyId.replace(/-/g, " ").replace(/\b\w/g, (c: string) => c.toUpperCase());

  return (
    <div className="mx-auto w-full max-w-[430px] px-5 pt-8 pb-6 animate-soft-in">
      <div className="mb-4 flex items-center justify-between">
        <Link to="/experiences/$id" params={{ id }} className="inline-flex items-center gap-1 text-sm text-white/90">
          <ChevronLeft className="h-4 w-4" /> {id}
        </Link>
      </div>

      <header className="mb-6 text-center">
        <p className="text-[11px] font-light uppercase tracking-[0.24em] text-white/70">Guided Journey</p>
        <h1 className="mt-1 font-seasons text-[30px] font-light leading-tight text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.55)]">
          {title}
        </h1>
        <p className="mx-auto mt-3 max-w-[300px] text-[13px] font-light leading-relaxed text-white/85">
          A steady, guided path to help you understand and gently reshape this pattern.
        </p>
      </header>

      <div className="mb-6 grid grid-cols-2 gap-3">
        {[
          { Icon: Layers, label: "Chapters", value: "6" },
          { Icon: Clock, label: "Est. Time", value: "70 min" },
          { Icon: Sprout, label: "Pace", value: "10 min/day" },
          { Icon: Gauge, label: "Difficulty", value: "Gentle" },
        ].map(({ Icon, label, value }) => (
          <div
            key={label}
            className="rounded-2xl border border-white/20 bg-white/10 p-3 backdrop-blur-xl"
          >
            <Icon className="h-4 w-4 text-amber-100" strokeWidth={1.5} />
            <p className="mt-2 text-[10.5px] font-light uppercase tracking-[0.18em] text-white/70">{label}</p>
            <p className="font-seasons text-[16px] text-white">{value}</p>
          </div>
        ))}
      </div>

      <section className="mb-5 rounded-[22px] border border-white/20 bg-white/10 p-4 backdrop-blur-xl">
        <h2 className="font-seasons text-[16px] text-white">What You'll Explore</h2>
        <ul className="mt-2 space-y-1.5 text-[12.5px] font-light text-white/85">
          {[
            "The stories your mind returns to",
            "How feelings show up in the body",
            "Gentle tools to interrupt loops",
            "Naming what you actually need",
            "Building small, sustainable rituals",
          ].map((t) => (
            <li key={t} className="flex gap-2">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-white/60" />
              {t}
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-8 rounded-[22px] border border-white/20 bg-white/10 p-4 backdrop-blur-xl">
        <h2 className="font-seasons text-[16px] text-white">What You'll Gain</h2>
        <ul className="mt-2 space-y-1.5 text-[12.5px] font-light text-white/85">
          {[
            "A calmer relationship with your thoughts",
            "Language for what you feel",
            "A small daily practice you enjoy",
            "More self-trust in hard moments",
          ].map((t) => (
            <li key={t} className="flex gap-2">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-amber-200/80" />
              {t}
            </li>
          ))}
        </ul>
      </section>

      <div className="flex flex-col gap-3">
        <button className="rounded-full bg-white py-3.5 text-[13px] font-bold tracking-[0.22em] text-[#7a4a1d] shadow-lg shadow-black/40">
          BEGIN JOURNEY
        </button>
        <button className="rounded-full border border-white/40 bg-white/10 py-3 text-[12px] font-medium tracking-[0.18em] text-white backdrop-blur-xl">
          Save for Later
        </button>
      </div>

      <p className="mt-5 text-center text-[11px] font-light text-white/65">
        You can pause and resume at any time — this is your pace.
      </p>
    </div>
  );
}
