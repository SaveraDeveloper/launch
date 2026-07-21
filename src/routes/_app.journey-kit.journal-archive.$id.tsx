import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft, Trash2, Heart } from "lucide-react";
import { journalsStore, relativeDate, type JournalItem } from "@/lib/journeyKitCatalog";

export const Route = createFileRoute("/_app/journey-kit/journal-archive/$id")({
  head: () => ({ meta: [{ title: "Journal — Journey Kit" }] }),
  notFoundComponent: () => (
    <div className="mx-auto w-full max-w-[430px] px-5 pt-16 text-center text-white">
      <p className="font-seasons text-[18px]">Journal not found.</p>
      <Link
        to="/journey-kit/journal-archive"
        className="mt-4 inline-block text-[13px] text-white/80 underline"
      >
        Back to Archive
      </Link>
    </div>
  ),
  errorComponent: () => (
    <div className="mx-auto w-full max-w-[430px] px-5 pt-16 text-center text-white">
      Something went sideways.
    </div>
  ),
  component: Page,
});

function Page() {
  const { id } = Route.useParams();
  const [j, setJ] = useState<JournalItem | null>(null);
  const [missing, setMissing] = useState(false);

  useEffect(() => {
    const found = journalsStore.read().find((x) => x.id === id);
    if (!found) setMissing(true);
    else setJ(found);
  }, [id]);

  const remove = () => {
    journalsStore.write(journalsStore.read().filter((x) => x.id !== id));
    history.back();
  };

  const toggleFav = () => {
    if (!j) return;
    const next = journalsStore
      .read()
      .map((x) => (x.id === id ? { ...x, isFavorite: !x.isFavorite } : x));
    journalsStore.write(next);
    setJ({ ...j, isFavorite: !j.isFavorite });
  };

  if (missing)
    return (
      <div className="mx-auto w-full max-w-[430px] px-5 pt-16 text-center text-white">
        <p className="font-seasons text-[18px]">Journal not found.</p>
        <Link
          to="/journey-kit/journal-archive"
          className="mt-4 inline-block text-[13px] text-white/80 underline"
        >
          Back to Archive
        </Link>
      </div>
    );
  if (!j) return null;

  return (
    <div className="mx-auto w-full max-w-[430px] px-5 pt-10 pb-10 animate-soft-in">
      <header className="mb-5 flex items-center justify-between gap-3">
        <Link
          to="/journey-kit/journal-archive"
          className="rounded-full border border-white/30 bg-white/20 p-2 backdrop-blur-xl"
        >
          <ArrowLeft className="h-4 w-4 text-white" />
        </Link>
        <div className="flex items-center gap-2">
          <button
            onClick={toggleFav}
            aria-label={j.isFavorite ? "Unfavorite" : "Favorite"}
            className="rounded-full border border-white/25 bg-white/15 p-2 backdrop-blur-xl"
          >
            <Heart
              className={`h-4 w-4 ${j.isFavorite ? "fill-rose-300 text-rose-300" : "text-white/85"}`}
              strokeWidth={1.6}
            />
          </button>
          <button
            onClick={remove}
            aria-label="Delete"
            className="rounded-full border border-white/25 bg-white/15 p-2 backdrop-blur-xl"
          >
            <Trash2 className="h-4 w-4 text-white/85" />
          </button>
        </div>
      </header>

      <article className="rounded-[26px] border border-white/40 bg-[#fdf6e5]/85 p-6 text-[#3b2e18] shadow-[0_10px_30px_rgba(0,0,0,0.35)] backdrop-blur-2xl">
        <p className="text-[10.5px] uppercase tracking-[0.18em] text-[#8a6a2c]">
          {relativeDate(j.date)}
          {j.mood ? ` · ${j.mood}` : ""}
        </p>
        <h2 className="mt-1 font-seasons text-[26px] leading-tight">{j.title}</h2>
        {j.body && (
          <div className="mt-4 whitespace-pre-line font-body text-[14px] font-light leading-relaxed">
            {j.body}
          </div>
        )}
      </article>
    </div>
  );
}
