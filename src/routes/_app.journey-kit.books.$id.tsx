import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft, BookOpen, ExternalLink, Trash2 } from "lucide-react";
import { booksStore, hostOf, type BookItem } from "@/lib/journeyKitCatalog";

export const Route = createFileRoute("/_app/journey-kit/books/$id")({
  head: () => ({ meta: [{ title: "Book — Journey Kit" }] }),
  notFoundComponent: () => (
    <div className="mx-auto w-full max-w-[430px] px-5 pt-16 text-center text-white">
      <p className="font-seasons text-[18px]">Book not found.</p>
      <Link to="/journey-kit/books" className="mt-4 inline-block text-[13px] text-white/80 underline">
        Back to Books
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
  const [b, setB] = useState<BookItem | null>(null);
  const [missing, setMissing] = useState(false);

  useEffect(() => {
    const found = booksStore.read().find((x) => x.id === id);
    if (!found) setMissing(true);
    else setB(found);
  }, [id]);

  const remove = () => {
    booksStore.write(booksStore.read().filter((x) => x.id !== id));
    history.back();
  };

  if (missing)
    return (
      <div className="mx-auto w-full max-w-[430px] px-5 pt-16 text-center text-white">
        <p className="font-seasons text-[18px]">Book not found.</p>
        <Link to="/journey-kit/books" className="mt-4 inline-block text-[13px] text-white/80 underline">
          Back to Books
        </Link>
      </div>
    );
  if (!b) return null;

  return (
    <div className="mx-auto w-full max-w-[430px] px-5 pt-10 pb-10 animate-soft-in">
      <header className="mb-5 flex items-center justify-between gap-3">
        <Link to="/journey-kit/books" className="rounded-full border border-white/30 bg-white/20 p-2 backdrop-blur-xl">
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

      <div className="rounded-[26px] border border-white/30 bg-white/25 p-5 backdrop-blur-2xl shadow-[0_10px_30px_rgba(0,0,0,0.32)]">
        <div className="flex gap-4">
          <div className="flex h-40 w-28 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-white/25 bg-gradient-to-br from-rose-200/40 to-rose-500/20">
            {b.thumbnailUrl ? (
              <img src={b.thumbnailUrl} alt="" className="h-full w-full object-cover" />
            ) : (
              <BookOpen className="h-9 w-9 text-white/95" strokeWidth={1.3} />
            )}
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-seasons text-[22px] leading-tight text-white">{b.title}</p>
            {b.author && (
              <p className="mt-1 text-[12.5px] font-light text-white/85">{b.author}</p>
            )}
            {b.url && (
              <a
                href={b.url}
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/20 px-3 py-1.5 text-[11.5px] text-white hover:bg-white/30"
              >
                <ExternalLink className="h-3.5 w-3.5" /> {hostOf(b.url)}
              </a>
            )}
          </div>
        </div>

        {b.note && (
          <p className="mt-4 text-[13px] font-light leading-relaxed text-white/90">{b.note}</p>
        )}
      </div>
    </div>
  );
}
