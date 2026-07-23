import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ChevronLeft, Clock, Tag, Gauge, Repeat, Bookmark, BookmarkCheck } from "lucide-react";
import { PRACTICES } from "@/lib/experiencesCatalog";
import { savedStore, newId, type SavedLink } from "@/lib/journeyKitCatalog";

export const Route = createFileRoute("/_app/experiences/$id/practice/$practiceId")({
  head: () => ({ meta: [{ title: "Quick Practice — Savera" }] }),
  component: Page,
});

function Page() {
  const { id, practiceId } = Route.useParams();
  const navigate = useNavigate();
  const practice = PRACTICES[practiceId];
  const title = practice?.title ?? practiceId.replace(/-/g, " ").replace(/\b\w/g, (c: string) => c.toUpperCase());
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setSaved(savedStore.read().some((s) => s.url === `savera://practice/${practiceId}`));
  }, [practiceId]);

  const toggleSave = () => {
    const list = savedStore.read();
    const key = `savera://practice/${practiceId}`;
    if (saved) {
      savedStore.write(list.filter((s) => s.url !== key));
      setSaved(false);
    } else {
      const item: SavedLink = {
        id: newId(),
        title: `${title} · Quick Practice`,
        url: key,
        note: practice?.summary,
        savedAt: new Date().toISOString(),
      };
      savedStore.write([item, ...list]);
      setSaved(true);
    }
  };

  const start = () => navigate({ to: "/experiences/$id/practice/$practiceId/run", params: { id, practiceId } });

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
          {saved ? <BookmarkCheck className="h-4 w-4 text-amber-100" /> : <Bookmark className="h-4 w-4 text-white" />}
        </button>
      </div>

      <header className="mb-6 text-center">
        <p className="text-[11px] font-light uppercase tracking-[0.24em] text-white/70">Quick Practice</p>
        <h1 className="mt-1 font-seasons text-[30px] font-light leading-tight text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.55)]">
          {title}
        </h1>
        <p className="mx-auto mt-3 max-w-[300px] text-[13px] font-light leading-relaxed text-white/85">
          {practice?.summary ?? "A short, grounding moment you can return to whenever you need it."}
        </p>
      </header>

      <div className="mb-6 grid grid-cols-2 gap-3">
        {[
          { Icon: Clock, label: "Duration", value: practice?.time ?? "5 min" },
          { Icon: Tag, label: "Framework", value: practice?.framework ?? "Mindfulness" },
          { Icon: Gauge, label: "Difficulty", value: "Easy" },
          { Icon: Repeat, label: "Repeat", value: "Anytime" },
        ].map(({ Icon, label, value }) => (
          <div key={label} className="rounded-2xl border border-white/25 bg-white/25 p-3 backdrop-blur-xl">
            <Icon className="h-4 w-4 text-amber-100" strokeWidth={1.5} />
            <p className="mt-2 text-[10.5px] font-light uppercase tracking-[0.18em] text-white/70">{label}</p>
            <p className="font-seasons text-[14px] leading-tight text-white">{value}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-3">
        <button
          onClick={start}
          className="rounded-full bg-white py-3.5 text-[13px] font-bold tracking-[0.22em] text-[#7a4a1d] shadow-lg shadow-black/40 active:scale-[.99]"
        >
          START PRACTICE
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
        Return to this practice as often as you like.
      </p>
    </div>
  );
}

