import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, BookOpen, Bookmark, BookMarked } from "lucide-react";
import { BOOKS } from "@/lib/journeyKitCatalog";

export const Route = createFileRoute("/_app/journey-kit/books/$id")({
  head: ({ loaderData }: { loaderData?: (typeof BOOKS)[number] }) => ({
    meta: [{ title: loaderData ? `${loaderData.title} — Books` : "Book — Journey Kit" }],
  }),
  loader: ({ params }) => {
    const b = BOOKS.find((x) => x.id === params.id);
    if (!b) throw notFound();
    return b;
  },
  notFoundComponent: () => (
    <div className="mx-auto w-full max-w-[430px] px-5 pt-16 text-center text-white">
      <p className="font-seasons text-[18px]">Book not found.</p>
      <Link to="/journey-kit/books" className="mt-4 inline-block text-[13px] text-white/80 underline">
        Back to Books
      </Link>
    </div>
  ),
  errorComponent: () => (
    <div className="mx-auto w-full max-w-[430px] px-5 pt-16 text-center text-white">Something went sideways.</div>
  ),
  component: Page,
});

function Page() {
  const b = Route.useLoaderData();
  const [saved, setSaved] = useState(b.status === "saved" || b.status === "reading" || b.status === "finished");

  return (
    <div className="mx-auto w-full max-w-[430px] px-5 pt-10 pb-10 animate-soft-in">
      <header className="mb-5 flex items-center gap-3">
        <Link to="/journey-kit/books" className="rounded-full border border-white/30 bg-white/20 p-2 backdrop-blur-xl">
          <ArrowLeft className="h-4 w-4 text-white" />
        </Link>
        <h1 className="font-seasons text-[20px] font-light text-white">Book</h1>
      </header>

      <div className="rounded-[26px] border border-white/30 bg-white/25 p-5 backdrop-blur-2xl shadow-[0_10px_30px_rgba(0,0,0,0.32)]">
        <div className="flex gap-4">
          <div
            className={`flex h-40 w-28 shrink-0 items-center justify-center rounded-xl border border-white/25 bg-gradient-to-br ${b.coverTint}`}
          >
            <BookOpen className="h-9 w-9 text-white/95" strokeWidth={1.3} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-seasons text-[22px] leading-tight text-white">{b.title}</p>
            <p className="mt-1 text-[12.5px] font-light text-white/85">{b.author}</p>
            <span className="mt-2 inline-block rounded-full border border-white/40 bg-white/20 px-2 py-0.5 text-[10px] uppercase tracking-wide text-white">
              {b.status}
            </span>
          </div>
        </div>

        <p className="mt-4 text-[13px] font-light leading-relaxed text-white/90">{b.description}</p>

        <div className="mt-4 rounded-2xl border border-white/25 bg-white/15 p-3">
          <p className="text-[10.5px] uppercase tracking-[0.16em] text-white/70">Why Savera recommends this</p>
          <p className="mt-1 text-[12.5px] font-light leading-snug text-white/90">{b.recommendationReason}</p>
          <p className="mt-2 text-[11px] text-white/70">Related to: {b.relatedConcern}</p>
        </div>

        <div className="mt-5 flex gap-2">
          <button
            onClick={() => setSaved((s) => !s)}
            className={`flex-1 inline-flex items-center justify-center gap-2 rounded-full border px-4 py-2.5 text-[13px] transition ${
              saved
                ? "border-amber-200/60 bg-amber-200/25 text-amber-50"
                : "border-white/40 bg-white/20 text-white hover:bg-white/30"
            }`}
          >
            <Bookmark className="h-4 w-4" /> {saved ? "Saved" : "Save"}
          </button>
          <button className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-b from-amber-200 to-amber-400 px-4 py-2.5 text-[13px] font-semibold text-[#5a3410] shadow-[0_4px_16px_rgba(255,190,90,0.45)]">
            <BookMarked className="h-4 w-4" /> Continue Reading
          </button>
        </div>
      </div>
    </div>
  );
}
