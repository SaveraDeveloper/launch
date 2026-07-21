import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Play, Clock } from "lucide-react";
import { VIDEOS, formatDuration } from "@/lib/journeyKitCatalog";

export const Route = createFileRoute("/_app/journey-kit/videos/$id")({
  head: ({ loaderData }) => ({
    meta: [{ title: loaderData ? `${loaderData.title} — Videos` : "Video — Journey Kit" }],
  }),
  loader: ({ params }) => {
    const v = VIDEOS.find((x) => x.id === params.id);
    if (!v) throw notFound();
    return v;
  },
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
  const v = Route.useLoaderData();
  return (
    <div className="mx-auto w-full max-w-[430px] px-5 pt-10 pb-10 animate-soft-in">
      <header className="mb-5 flex items-center gap-3">
        <Link
          to="/journey-kit/videos"
          className="rounded-full border border-white/30 bg-white/20 p-2 backdrop-blur-xl"
        >
          <ArrowLeft className="h-4 w-4 text-white" />
        </Link>
        <h1 className="font-seasons text-[20px] font-light text-white">Now playing</h1>
      </header>

      <div className="relative mb-5 flex aspect-video items-center justify-center overflow-hidden rounded-[22px] border border-white/30 bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-2xl">
        <Play className="h-14 w-14 text-white/90" strokeWidth={1.2} />
        <span className="absolute bottom-2 right-2 rounded-md bg-black/60 px-2 py-0.5 text-[11px] text-white">
          {formatDuration(v.durationSec)}
        </span>
      </div>

      <div className="rounded-[22px] border border-white/30 bg-white/25 p-4 backdrop-blur-2xl shadow-[0_8px_24px_rgba(0,0,0,0.28)]">
        <p className="font-seasons text-[22px] leading-tight text-white">{v.title}</p>
        <p className="mt-1 text-[12.5px] font-light text-white/85">{v.creator}</p>
        <div className="mt-3 flex items-center gap-2">
          <span
            className={`rounded-full border px-2 py-0.5 text-[10px] uppercase tracking-wide ${
              v.status === "unlocked"
                ? "border-amber-200/60 bg-amber-200/20 text-amber-100"
                : "border-white/40 bg-white/20 text-white"
            }`}
          >
            {v.status}
          </span>
          <span className="inline-flex items-center gap-1 text-[11px] text-white/75">
            <Clock className="h-3 w-3" /> {formatDuration(v.durationSec)}
          </span>
        </div>
        <p className="mt-4 text-[13px] font-light leading-relaxed text-white/90">{v.description}</p>
      </div>
    </div>
  );
}
