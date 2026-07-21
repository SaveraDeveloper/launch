import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, BookOpen, Play, Sparkles, Zap, Clock } from "lucide-react";
import { BOOKS, VIDEOS, formatDuration } from "@/lib/journeyKitCatalog";
import { JOURNEYS, PRACTICES } from "@/lib/experiencesCatalog";

type Tab = "journeys" | "practices" | "books" | "videos";

export const Route = createFileRoute("/_app/journey-kit/saved")({
  head: () => ({ meta: [{ title: "Saved — Journey Kit" }] }),
  component: Page,
});

const TABS: { id: Tab; label: string }[] = [
  { id: "journeys", label: "Guided Journeys" },
  { id: "practices", label: "Quick Practices" },
  { id: "books", label: "Books" },
  { id: "videos", label: "Videos" },
];

// Curated mock "saved" sets so the tabs feel alive from day one.
const SAVED_JOURNEY_IDS = ["thought-lab", "emotional-toolkit"];
const SAVED_PRACTICE_IDS = ["mind-storm-clear", "calm-rhythm", "let-go-ritual"];

function Page() {
  const [tab, setTab] = useState<Tab>("journeys");

  return (
    <div className="mx-auto w-full max-w-[430px] px-5 pt-10 pb-10 animate-soft-in">
      <header className="mb-5 flex items-center gap-3">
        <Link to="/journey-kit" className="rounded-full border border-white/30 bg-white/20 p-2 backdrop-blur-xl">
          <ArrowLeft className="h-4 w-4 text-white" />
        </Link>
        <h1 className="font-seasons text-[24px] font-light text-white">❤️ Saved</h1>
      </header>

      <div className="-mx-5 mb-4 flex gap-2 overflow-x-auto px-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {TABS.map((t) => {
          const active = tab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`shrink-0 rounded-full border px-3.5 py-1.5 text-[12px] transition ${
                active
                  ? "border-white/60 bg-white/45 text-white"
                  : "border-white/25 bg-white/15 text-white/80 hover:bg-white/25"
              }`}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      {tab === "journeys" && <JourneysList />}
      {tab === "practices" && <PracticesList />}
      {tab === "books" && <BooksList />}
      {tab === "videos" && <VideosList />}
    </div>
  );
}

function Empty({ text }: { text: string }) {
  return (
    <div className="rounded-[22px] border border-white/25 bg-white/25 p-6 text-center backdrop-blur-2xl">
      <p className="font-seasons text-[15px] text-white">Nothing saved yet</p>
      <p className="mt-1 text-[12px] font-light text-white/80">{text}</p>
    </div>
  );
}

function JourneysList() {
  const items = SAVED_JOURNEY_IDS.map((id) => JOURNEYS[id]).filter(Boolean);
  if (items.length === 0) return <Empty text="Journeys you save from Explore will appear here." />;
  return (
    <div className="flex flex-col gap-3">
      {items.map((j) => (
        <div
          key={j.id}
          className="flex items-start gap-3 rounded-[22px] border border-white/30 bg-white/25 p-4 backdrop-blur-2xl shadow-[0_8px_24px_rgba(0,0,0,0.28)]"
        >
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/30 bg-white/25">
            <Sparkles className="h-5 w-5 text-amber-100" strokeWidth={1.5} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-seasons text-[15.5px] leading-tight text-white">{j.title}</p>
            <p className="mt-1 line-clamp-2 text-[12px] font-light text-white/85">{j.desc}</p>
            <p className="mt-2 text-[10.5px] text-white/70">{j.time}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function PracticesList() {
  const items = SAVED_PRACTICE_IDS.map((id) => PRACTICES[id]).filter(Boolean);
  if (items.length === 0) return <Empty text="Quick practices you save will land here." />;
  return (
    <div className="flex flex-col gap-3">
      {items.map((p) => (
        <div
          key={p.id}
          className="flex items-start gap-3 rounded-[22px] border border-white/30 bg-white/25 p-4 backdrop-blur-2xl shadow-[0_8px_24px_rgba(0,0,0,0.28)]"
        >
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/30 bg-white/25">
            <Zap className="h-5 w-5 text-amber-100" strokeWidth={1.5} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-seasons text-[15.5px] leading-tight text-white">{p.title}</p>
            <p className="mt-1 line-clamp-2 text-[12px] font-light text-white/85">{p.summary}</p>
            <p className="mt-2 inline-flex items-center gap-1 text-[10.5px] text-white/70">
              <Clock className="h-3 w-3" /> {p.time}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

function BooksList() {
  const items = BOOKS.filter((b) => b.status === "saved" || b.status === "reading");
  if (items.length === 0) return <Empty text="Books you save will settle onto this shelf." />;
  return (
    <div className="grid grid-cols-2 gap-3">
      {items.map((b) => (
        <Link
          key={b.id}
          to="/journey-kit/books/$id"
          params={{ id: b.id }}
          className="flex flex-col rounded-[22px] border border-white/30 bg-white/25 p-3 backdrop-blur-2xl shadow-[0_8px_24px_rgba(0,0,0,0.28)]"
        >
          <div className={`mb-3 flex aspect-[3/4] items-center justify-center rounded-xl border border-white/25 bg-gradient-to-br ${b.coverTint}`}>
            <BookOpen className="h-8 w-8 text-white/90" strokeWidth={1.3} />
          </div>
          <p className="font-seasons text-[14px] leading-tight text-white">{b.title}</p>
          <p className="mt-0.5 text-[11px] font-light text-white/80">{b.author}</p>
        </Link>
      ))}
    </div>
  );
}

function VideosList() {
  const items = VIDEOS.filter((v) => v.status === "saved");
  if (items.length === 0) return <Empty text="Videos you save will rest here." />;
  return (
    <div className="flex flex-col gap-3">
      {items.map((v) => (
        <Link
          key={v.id}
          to="/journey-kit/videos/$id"
          params={{ id: v.id }}
          className="flex gap-3 rounded-[22px] border border-white/30 bg-white/25 p-3 backdrop-blur-2xl shadow-[0_8px_24px_rgba(0,0,0,0.28)]"
        >
          <div className="relative flex h-20 w-28 shrink-0 items-center justify-center rounded-xl border border-white/25 bg-gradient-to-br from-white/20 to-white/5">
            <Play className="h-6 w-6 text-white" strokeWidth={1.4} />
            <span className="absolute bottom-1 right-1 rounded-md bg-black/60 px-1.5 py-0.5 text-[10px] text-white">
              {formatDuration(v.durationSec)}
            </span>
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-seasons text-[14.5px] leading-tight text-white">{v.title}</p>
            <p className="mt-1 text-[11px] font-light text-white/80">{v.creator}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
