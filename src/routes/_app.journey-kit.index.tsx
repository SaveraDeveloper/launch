import { createFileRoute, Link } from "@tanstack/react-router";
import { Video, ChevronRight } from "lucide-react";
import journalIcon from "@/assets/Journal.png.asset.json";
import journalArchiveIcon from "@/assets/Journal_Archive.png.asset.json";
import savedIcon from "@/assets/Saved.png.asset.json";

export const Route = createFileRoute("/_app/journey-kit/")({
  head: () => ({
    meta: [
      { title: "Journey Kit — Savera" },
      { name: "description", content: "Your bookshelf of saved videos, books, journals, and practices." },
    ],
  }),
  component: Page,
});

const CARDS = [
  {
    to: "/journey-kit/videos" as const,
    Icon: Video,
    img: null as string | null,
    title: "Videos",
    desc: "Expert videos you've saved or unlocked.",
    tint: "from-amber-200/40 to-amber-500/20",
  },
  {
    to: "/journey-kit/books" as const,
    img: journalIcon.url,
    title: "Books",
    desc: "Reading recommendations collected along the way.",
    tint: "from-rose-200/40 to-rose-500/20",
  },
  {
    to: "/journey-kit/journal-archive" as const,
    img: journalArchiveIcon.url,
    title: "Journal Archive",
    desc: "Every journal you've written.",
    tint: "from-emerald-200/40 to-emerald-500/20",
  },
  {
    to: "/journey-kit/saved" as const,
    img: savedIcon.url,
    title: "Saved",
    desc: "Journeys, practices, books, and videos you've kept.",
    tint: "from-violet-200/40 to-violet-500/20",
  },
];

function Page() {
  return (
    <div className="mx-auto w-full max-w-[430px] px-5 pt-10 animate-soft-in">
      <header className="mb-6">
        <h1 className="font-seasons text-[30px] font-light leading-tight text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.55)]">
          🎒 Journey Kit
        </h1>
        <p className="mt-2 font-body text-[14px] font-light text-white/85">
          Everything you've chosen to keep.
        </p>
      </header>

      <div className="flex flex-col gap-3">
        {CARDS.map(({ to, Icon, img, title, desc, tint }) => (
          <Link
            key={to}
            to={to}
            className={`group flex items-center gap-4 rounded-[26px] border border-white/30 bg-gradient-to-br ${tint} bg-white/25 p-4 shadow-[0_10px_30px_rgba(0,0,0,0.35)] backdrop-blur-2xl transition active:scale-[.985] hover:bg-white/30`}
          >
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/30 bg-white/25">
              {img ? (
                <img src={img} alt="" aria-hidden className="h-10 w-10 object-contain" />
              ) : (
                Icon && <Icon className="h-6 w-6 text-white" strokeWidth={1.5} />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-seasons text-[19px] leading-tight text-white">{title}</p>
              <p className="mt-1 line-clamp-2 text-[12.5px] font-light leading-snug text-white/85">
                {desc}
              </p>
            </div>
            <ChevronRight className="h-5 w-5 shrink-0 text-white/70" />
          </Link>
        ))}
      </div>

    </div>
  );
}
