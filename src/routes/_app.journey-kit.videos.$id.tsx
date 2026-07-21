import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft, Play, ExternalLink, Trash2 } from "lucide-react";
import { videosStore, hostOf, type VideoItem } from "@/lib/journeyKitCatalog";

export const Route = createFileRoute("/_app/journey-kit/videos/$id")({
  head: () => ({ meta: [{ title: "Video — Journey Kit" }] }),
  notFoundComponent: () => (
    <div className="mx-auto w-full max-w-[430px] px-5 pt-16 text-center text-white">
      <p className="font-seasons text-[18px]">Video not found.</p>
      <Link to="/journey-kit/videos" className="mt-4 inline-block text-[13px] text-white/80 underline">
        Back to Videos
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
  const [v, setV] = useState<VideoItem | null>(null);
  const [missing, setMissing] = useState(false);

  useEffect(() => {
    const found = videosStore.read().find((x) => x.id === id);
    if (!found) setMissing(true);
    else setV(found);
  }, [id]);

  const remove = () => {
    videosStore.write(videosStore.read().filter((x) => x.id !== id));
    history.back();
  };

  if (missing)
    return (
      <div className="mx-auto w-full max-w-[430px] px-5 pt-16 text-center text-white">
        <p className="font-seasons text-[18px]">Video not found.</p>
        <Link to="/journey-kit/videos" className="mt-4 inline-block text-[13px] text-white/80 underline">
          Back to Videos
        </Link>
      </div>
    );
  if (!v) return null;

  return (
    <div className="mx-auto w-full max-w-[430px] px-5 pt-10 pb-10 animate-soft-in">
      <header className="mb-5 flex items-center justify-between gap-3">
        <Link
          to="/journey-kit/videos"
          className="rounded-full border border-white/30 bg-white/20 p-2 backdrop-blur-xl"
        >
          <ArrowLeft className="h-4 w-4 text-white" />
        </Link>
        <button
          onClick={remove}
          aria-label="Delete"
          className="rounded-full border border-white/25 bg-white/15 p-2 backdrop-blur-xl"
        >
          <Trash2 className="h-4 w-4 text-white/85" />
        </button>
      </header>

      <div className="relative mb-5 flex aspect-video items-center justify-center overflow-hidden rounded-[22px] border border-white/30 bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-2xl">
        {v.thumbnailUrl ? (
          <img src={v.thumbnailUrl} alt="" className="h-full w-full object-cover" />
        ) : (
          <Play className="h-14 w-14 text-white/90" strokeWidth={1.2} />
        )}
      </div>

      <div className="rounded-[22px] border border-white/30 bg-white/25 p-4 backdrop-blur-2xl shadow-[0_8px_24px_rgba(0,0,0,0.28)]">
        <p className="font-seasons text-[22px] leading-tight text-white">{v.title}</p>
        {v.url && (
          <a
            href={v.url}
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/20 px-3 py-1.5 text-[12px] text-white hover:bg-white/30"
          >
            <ExternalLink className="h-3.5 w-3.5" /> Open on {hostOf(v.url)}
          </a>
        )}
        {v.note && (
          <p className="mt-4 text-[13px] font-light leading-relaxed text-white/90">{v.note}</p>
        )}
      </div>
    </div>
  );
}
