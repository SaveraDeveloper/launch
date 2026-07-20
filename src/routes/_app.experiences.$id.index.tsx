import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft, Clock, BookOpen, Sparkles } from "lucide-react";
import { categoryById, JOURNEYS, PRACTICES } from "@/lib/experiencesCatalog";

export const Route = createFileRoute("/_app/experiences/$id/")({
  head: () => ({ meta: [{ title: "Concern — Savera" }] }),
  component: Page,
});

function Page() {
  const { id } = Route.useParams();
  const cat = categoryById(id);
  const title = cat?.title ?? id.replace(/-/g, " ");
  const intro = cat?.intro ?? "A supportive space to explore this area of your life.";
  const journeys = (cat?.journeyIds ?? []).map((jid) => JOURNEYS[jid]).filter(Boolean);
  const practices = (cat?.practiceIds ?? []).map((pid) => PRACTICES[pid]).filter(Boolean);

  return (
    <div className="mx-auto w-full max-w-[430px] px-5 pt-8 pb-6 animate-soft-in">
      <div className="mb-5 flex items-center justify-between">
        <Link to="/experiences" className="inline-flex items-center gap-1 text-sm text-white/90">
          <ChevronLeft className="h-4 w-4" /> Explore
        </Link>
      </div>

      <header className="mb-6 text-center">
        <p className="text-[11px] font-light uppercase tracking-[0.24em] text-white/70">Concern</p>
        <h1 className="mt-1 font-seasons text-[30px] font-light leading-tight capitalize text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.55)]">
          {title}
        </h1>
        <p className="mx-auto mt-3 max-w-[300px] text-[13px] font-light leading-relaxed text-white/85">
          {intro}
        </p>
      </header>

      <section className="mb-8">
        <div className="mb-3 flex items-center gap-2">
          <BookOpen className="h-4 w-4 text-white/90" />
          <h2 className="font-seasons text-[18px] text-white">Guided Journeys</h2>
        </div>
        <div className="flex flex-col gap-3">
          {journeys.slice(0, 2).map((j) => (
            <Link
              key={j.id}
              to="/experiences/$id/journey/$journeyId"
              params={{ id, journeyId: j.id }}
              className="rounded-[24px] border border-white/25 bg-white/10 p-4 backdrop-blur-2xl shadow-[0_10px_28px_rgba(0,0,0,0.32)] active:scale-[.99]"
            >
              <p className="font-seasons text-[18px] leading-tight text-white">{j.title}</p>
              <p className="mt-1 text-[12px] font-light leading-snug text-white/80">{j.desc}</p>
              <p className="mt-2 text-[10.5px] uppercase tracking-[0.14em] text-white/60">{j.framework}</p>
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

      <section>
        <div className="mb-3 flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-amber-200" />
          <h2 className="font-seasons text-[18px] text-white">Quick Practices</h2>
        </div>
        <div className="flex flex-col gap-3">
          {practices.slice(0, 3).map((p) => (
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
