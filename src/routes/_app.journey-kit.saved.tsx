import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft, Plus, ExternalLink, Bookmark } from "lucide-react";
import { savedStore, newId, hostOf, relativeDate, type SavedLink } from "@/lib/journeyKitCatalog";
import { AddItemDialog, type AddItemResult } from "@/components/AddItemDialog";

export const Route = createFileRoute("/_app/journey-kit/saved")({
  head: () => ({ meta: [{ title: "Saved — Journey Kit" }] }),
  component: Page,
});

function Page() {
  const [items, setItems] = useState<SavedLink[]>([]);
  const [adding, setAdding] = useState(false);

  useEffect(() => setItems(savedStore.read()), []);

  const persist = (next: SavedLink[]) => {
    setItems(next);
    savedStore.write(next);
  };

  const handleAdd = (r: AddItemResult) => {
    const item: SavedLink = {
      id: newId(),
      title: r.title,
      url: r.url,
      thumbnailUrl: r.thumbnailUrl,
      note: r.note,
      savedAt: new Date().toISOString(),
    };
    persist([item, ...items]);
    setAdding(false);
  };

  const sorted = items.slice().sort((a, b) => (b.savedAt < a.savedAt ? -1 : 1));

  return (
    <div className="mx-auto w-full max-w-[430px] px-5 pt-10 pb-10 animate-soft-in">
      <header className="mb-5 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Link to="/journey-kit" className="rounded-full border border-white/30 bg-white/20 p-2 backdrop-blur-xl">
            <ArrowLeft className="h-4 w-4 text-white" />
          </Link>
          <h1 className="font-seasons text-[24px] font-light text-white">❤️ Saved</h1>
        </div>
        <button
          onClick={() => setAdding(true)}
          aria-label="Save something"
          className="rounded-full border border-white/35 bg-white/25 p-2 backdrop-blur-xl active:scale-95"
        >
          <Plus className="h-4 w-4 text-white" />
        </button>
      </header>

      {sorted.length === 0 ? (
        <div className="rounded-[22px] border border-white/25 bg-white/25 p-6 text-center backdrop-blur-2xl">
          <Bookmark className="mx-auto mb-2 h-6 w-6 text-white/80" strokeWidth={1.3} />
          <p className="font-seasons text-[15px] text-white">Nothing saved yet</p>
          <p className="mt-1 text-[12px] font-light text-white/80">
            Tap + to keep a link, quote, or resource for later.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {sorted.map((s) => {
            const inner = (
              <div className="flex gap-3 rounded-[22px] border border-white/30 bg-white/25 p-3 backdrop-blur-2xl shadow-[0_8px_24px_rgba(0,0,0,0.28)] transition hover:bg-white/30">
                {s.thumbnailUrl && (
                  <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-white/25">
                    <img src={s.thumbnailUrl} alt="" className="h-full w-full object-cover" />
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <p className="font-seasons text-[15px] leading-tight text-white">{s.title}</p>
                  {s.url && (
                    <p className="mt-1 inline-flex items-center gap-1 text-[11px] font-light text-white/70">
                      <ExternalLink className="h-3 w-3" /> {hostOf(s.url)}
                    </p>
                  )}
                  {s.note && (
                    <p className="mt-1 line-clamp-2 text-[11.5px] font-light text-white/80">
                      {s.note}
                    </p>
                  )}
                  <p className="mt-1 text-[10.5px] text-white/60">{relativeDate(s.savedAt)}</p>
                </div>
              </div>
            );
            return s.url ? (
              <a key={s.id} href={s.url} target="_blank" rel="noreferrer">
                {inner}
              </a>
            ) : (
              <div key={s.id}>{inner}</div>
            );
          })}
        </div>
      )}

      <AddItemDialog open={adding} kind="link" onClose={() => setAdding(false)} onSubmit={handleAdd} />
    </div>
  );
}
