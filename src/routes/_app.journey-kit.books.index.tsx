import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, Search, BookOpen, Plus } from "lucide-react";
import { booksStore, newId, type BookItem } from "@/lib/journeyKitCatalog";
import { AddItemDialog, type AddItemResult } from "@/components/AddItemDialog";

export const Route = createFileRoute("/_app/journey-kit/books/")({
  head: () => ({ meta: [{ title: "Books — Journey Kit" }] }),
  component: Page,
});

function Page() {
  const [items, setItems] = useState<BookItem[]>([]);
  const [q, setQ] = useState("");
  const [adding, setAdding] = useState(false);

  useEffect(() => setItems(booksStore.read()), []);

  const list = useMemo(() => {
    const query = q.trim().toLowerCase();
    const arr = items.slice().sort((a, b) => (b.savedAt < a.savedAt ? -1 : 1));
    if (!query) return arr;
    return arr.filter(
      (b) =>
        b.title.toLowerCase().includes(query) ||
        (b.author ?? "").toLowerCase().includes(query),
    );
  }, [items, q]);

  const handleAdd = (r: AddItemResult) => {
    const item: BookItem = {
      id: newId(),
      title: r.title,
      author: r.author,
      url: r.url,
      thumbnailUrl: r.thumbnailUrl,
      note: r.note,
      savedAt: new Date().toISOString(),
    };
    const next = [item, ...items];
    setItems(next);
    booksStore.write(next);
    setAdding(false);
  };

  return (
    <div className="mx-auto w-full max-w-[430px] px-5 pt-10 pb-10 animate-soft-in">
      <header className="mb-5 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Link to="/journey-kit" className="rounded-full border border-white/30 bg-white/20 p-2 backdrop-blur-xl">
            <ArrowLeft className="h-4 w-4 text-white" />
          </Link>
          <h1 className="font-seasons text-[24px] font-light text-white">📖 Books</h1>
        </div>
        <button
          onClick={() => setAdding(true)}
          aria-label="Add book"
          className="rounded-full border border-white/35 bg-white/25 p-2 backdrop-blur-xl active:scale-95"
        >
          <Plus className="h-4 w-4 text-white" />
        </button>
      </header>

      <div className="mb-4 flex items-center gap-3 rounded-full border border-white/30 bg-white/25 px-4 py-3 backdrop-blur-2xl shadow-[0_8px_24px_rgba(0,0,0,0.28)]">
        <Search className="h-4 w-4 text-white/80" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search books or authors…"
          className="w-full bg-transparent text-[13px] font-light text-white placeholder:text-white/60 focus:outline-none"
        />
      </div>

      {list.length === 0 ? (
        <div className="rounded-[22px] border border-white/25 bg-white/25 p-6 text-center backdrop-blur-2xl">
          <p className="font-seasons text-[15px] text-white">A quiet shelf</p>
          <p className="mt-1 text-[12px] font-light text-white/80">
            Tap + to place a book on your shelf.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3">
          {list.map((b) => (
            <Link
              key={b.id}
              to="/journey-kit/books/$id"
              params={{ id: b.id }}
              className="flex flex-col rounded-[22px] border border-white/30 bg-white/25 p-3 backdrop-blur-2xl shadow-[0_8px_24px_rgba(0,0,0,0.28)] transition active:scale-[.99] hover:bg-white/30"
            >
              <div className="mb-3 flex aspect-[3/4] items-center justify-center overflow-hidden rounded-xl border border-white/25 bg-gradient-to-br from-rose-200/40 to-rose-500/20">
                {b.thumbnailUrl ? (
                  <img src={b.thumbnailUrl} alt="" className="h-full w-full object-cover" />
                ) : (
                  <BookOpen className="h-8 w-8 text-white/90" strokeWidth={1.3} />
                )}
              </div>
              <p className="font-seasons text-[14px] leading-tight text-white">{b.title}</p>
              {b.author && (
                <p className="mt-0.5 text-[11px] font-light text-white/80">{b.author}</p>
              )}
            </Link>
          ))}
        </div>
      )}

      <AddItemDialog open={adding} kind="book" onClose={() => setAdding(false)} onSubmit={handleAdd} />
    </div>
  );
}
