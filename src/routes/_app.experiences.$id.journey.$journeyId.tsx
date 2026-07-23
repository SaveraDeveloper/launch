import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { ChevronLeft, Layers, Clock, Gauge, Sprout, Bookmark, BookmarkCheck } from "lucide-react";
import { JOURNEYS } from "@/lib/experiencesCatalog";
import { savedStore, newId, type SavedLink } from "@/lib/journeyKitCatalog";
import { ThoughtLabRunner } from "@/components/ThoughtLabRunner";
import { GenericJourneyRunner } from "@/components/GenericJourneyRunner";

export const Route = createFileRoute("/_app/experiences/$id/journey/$journeyId")({
  head: () => ({ meta: [{ title: "Guided Journey — Savera" }] }),
  component: Page,
});

function Page() {
  const { id, journeyId } = Route.useParams();
  const navigate = useNavigate();
  const journey = JOURNEYS[journeyId];
  const title = journey?.title ?? journeyId.replace(/-/g, " ").replace(/\b\w/g, (c: string) => c.toUpperCase());
  const [saved, setSaved] = useState(false);
  const [runnerOpen, setRunnerOpen] = useState(false);

  useEffect(() => {
    setSaved(savedStore.read().some((s) => s.url === `savera://journey/${journeyId}`));
  }, [journeyId]);

  const toggleSave = () => {
    const list = savedStore.read();
    const key = `savera://journey/${journeyId}`;
    if (saved) {
      savedStore.write(list.filter((s) => s.url !== key));
      setSaved(false);
    } else {
      const item: SavedLink = {
        id: newId(),
        title: `${title} · Guided Journey`,
        url: key,
        note: journey?.desc,
        savedAt: new Date().toISOString(),
      };
      savedStore.write([item, ...list]);
      setSaved(true);
    }
  };

  const begin = () => setRunnerOpen(true);

  return (
    <div className="mx-auto w-full max-w-[430px] px-5 pt-8 pb-6 animate-soft-in">
      <div className="mb-4 flex items-center justify-between">
        <Link to="/experiences/$id" params={{ id }} className="inline-flex items-center gap-1 text-sm text-white/90">
          <ChevronLeft className="h-4 w-4" /> {id}
        </Link>
        <button
          onClick={toggleSave}
          aria-label={saved ? "Remove from saved" : "Save for later"}
          className="rounded-full border border-white/35 bg-white/25 p-2 backdrop-blur-xl active:scale-95"
        >
          {saved ? (
            <BookmarkCheck className="h-4 w-4 text-amber-100" />
          ) : (
            <Bookmark className="h-4 w-4 text-white" />
          )}
        </button>
      </div>

      <header className="mb-6 text-center">
        <p className="text-[11px] font-light uppercase tracking-[0.24em] text-white/70">Guided Journey</p>
        <h1 className="mt-1 font-seasons text-[30px] font-light leading-tight text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.55)]">
          {title}
        </h1>
        <p className="mx-auto mt-3 max-w-[300px] text-[13px] font-light leading-relaxed text-white/85">
          {journey?.desc ?? "A steady, guided path to help you understand and gently reshape this pattern."}
        </p>
      </header>

      <div className="mb-6 grid grid-cols-2 gap-3">
        {[
          { Icon: Layers, label: "Framework", value: journey?.framework ?? "CBT" },
          { Icon: Clock, label: "Pace", value: journey?.time ?? "10 min/day" },
          { Icon: Sprout, label: "Style", value: "Interactive" },
          { Icon: Gauge, label: "Difficulty", value: "Gentle" },
        ].map(({ Icon, label, value }) => (
          <div key={label} className="rounded-2xl border border-white/25 bg-white/25 p-3 backdrop-blur-xl">
            <Icon className="h-4 w-4 text-amber-100" strokeWidth={1.5} />
            <p className="mt-2 text-[10.5px] font-light uppercase tracking-[0.18em] text-white/70">{label}</p>
            <p className="font-seasons text-[15px] leading-tight text-white">{value}</p>
          </div>
        ))}
      </div>

      <section className="mb-8 rounded-[22px] border border-white/25 bg-white/25 p-4 backdrop-blur-xl">
        <h2 className="font-seasons text-[16px] text-white">What You'll Explore</h2>
        <ul className="mt-2 space-y-1.5 text-[12.5px] font-light text-white/85">
          {(journey?.concerns ?? ["The stories your mind returns to"]).map((t) => (
            <li key={t} className="flex gap-2">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-amber-200/80" />
              {t}
            </li>
          ))}
        </ul>
      </section>

      <div className="flex flex-col gap-3">
        <button
          onClick={begin}
          className="rounded-full bg-white py-3.5 text-[13px] font-bold tracking-[0.22em] text-[#7a4a1d] shadow-lg shadow-black/40 active:scale-[.99]"
        >
          BEGIN JOURNEY
        </button>
        <button
          onClick={toggleSave}
          className="inline-flex items-center justify-center gap-2 rounded-full border border-white/40 bg-white/15 py-3 text-[12px] font-medium tracking-[0.18em] text-white backdrop-blur-xl"
        >
          {saved ? <BookmarkCheck className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}
          {saved ? "Saved to Kit" : "Save for Later"}
        </button>
      </div>

      <p className="mt-5 text-center text-[11px] font-light text-white/65">
        You can pause and resume at any time — this is your pace.
      </p>

      {runnerOpen && <JourneyRunnerSheet journeyId={journeyId} onClose={() => setRunnerOpen(false)} />}
    </div>
  );
}

function JourneyRunnerSheet({ journeyId, onClose }: { journeyId: string; onClose: () => void }) {
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  if (typeof document === "undefined") return null;

  return createPortal(
    <div className="fixed inset-0 z-[9998] flex items-end justify-center bg-[#2f1b0f]/55 px-0 pt-10 backdrop-blur-[3px]">
      <div className="h-[88svh] w-full max-w-[430px] animate-journey-sheet-up overflow-hidden rounded-t-[34px] border-x border-t border-white/35 bg-[#3d2415]">
        {journeyId === "thought-lab" ? (
          <ThoughtLabRunner onExit={onClose} display="sheet" />
        ) : (
          <GenericJourneyRunner journeyId={journeyId} onExit={onClose} display="sheet" />
        )}
      </div>
    </div>,
    document.body,
  );
}

