import { createFileRoute, Link } from "@tanstack/react-router";
import { Video, BookOpen, NotebookPen, Heart, ChevronRight } from "lucide-react";

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
    title: "Videos",
    desc: "Expert videos you've saved or unlocked.",
    tint: "from-amber-200/40 to-amber-500/20",
  },
  {
    to: "/journey-kit/books" as const,
    Icon: BookOpen,
    title: "Books",
    desc: "Reading recommendations collected along the way.",
    tint: "from-rose-200/40 to-rose-500/20",
  },
  {
    to: "/journey-kit/journal-archive" as const,
    Icon: NotebookPen,
    title: "Journal Archive",
    desc: "Every journal you've written.",
    tint: "from-emerald-200/40 to-emerald-500/20",
  },
  {
    to: "/journey-kit/saved" as const,
    Icon: Heart,
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
        {CARDS.map(({ to, Icon, title, desc, tint }) => (
          <Link
            key={to}
            to={to}
            className={`group flex items-center gap-4 rounded-[26px] border border-white/30 bg-gradient-to-br ${tint} bg-white/25 p-4 shadow-[0_10px_30px_rgba(0,0,0,0.35)] backdrop-blur-2xl transition active:scale-[.985] hover:bg-white/30`}
          >
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/30 bg-white/25">
              <Icon className="h-6 w-6 text-white" strokeWidth={1.5} />
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

      <p className="mt-8 text-center text-[11px] font-light text-white/60">
        A quiet shelf. Nothing to chase.
      </p>
    </div>
  );
}
