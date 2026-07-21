import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, Search, Play, Plus, ExternalLink } from "lucide-react";
import { videosStore, hostOf, newId, type VideoItem } from "@/lib/journeyKitCatalog";
import { AddItemDialog, type AddItemResult } from "@/components/AddItemDialog";

export const Route = createFileRoute("/_app/journey-kit/videos/")({
  head: () => ({ meta: [{ title: "Videos — Journey Kit" }] }),
  component: Page,
});

function Page() {
  const [items, setItems] = useState<VideoItem[]>([]);
  const [q, setQ] = useState("");
  const [adding, setAdding] = useState(false);

  useEffect(() => setItems(videosStore.read()), []);

  const list = useMemo(() => {
    const query = q.trim().toLowerCase();
    const arr = items.slice().sort((a, b) => (b.savedAt < a.savedAt ? -1 : 1));
    if (!query) return arr;
    return arr.filter(
      (v) =>
        v.title.toLowerCase().includes(query) ||
        (v.note ?? "").toLowerCase().includes(query),
    );
  }, [items, q]);

  const handleAdd = (r: AddItemResult) => {
    const item: VideoItem = {
      id: newId(),
      title: r.title,
      url: r.url,
      thumbnailUrl: r.thumbnailUrl,
      note: r.note,
      savedAt: new Date().toISOString(),
    };
    const next = [item, ...items];
    setItems(next);
    videosStore.write(next);
    setAdding(false);
  };

  return (
    <div className="mx-auto w-full max-w-[430px] px-5 pt-10 pb-10 animate-soft-in">
      <header className="mb-5 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Link to="/journey-kit" className="rounded-full border border-white/30 bg-white/20 p-2 backdrop-blur-xl">
            <ArrowLeft className="h-4 w-4 text-white" />
          </Link>
          <h1 className="font-seasons text-[24px] font-light text-white">📹 Videos</h1>
        </div>
        <button
          onClick={() => setAdding(true)}
          aria-label="Add video"
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
          placeholder="Search videos…"
          className="w-full bg-transparent text-[13px] font-light text-white placeholder:text-white/60 focus:outline-none"
        />
      </div>

      {list.length === 0 ? (
        <div className="rounded-[22px] border border-white/25 bg-white/25 p-6 text-center backdrop-blur-2xl">
          <p className="font-seasons text-[15px] text-white">Nothing here yet</p>
          <p className="mt-1 text-[12px] font-light text-white/80">
            Tap + to add a video you want to come back to.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {list.map((v) => (
            <Link
              key={v.id}
              to="/journey-kit/videos/$id"
              params={{ id: v.id }}
              className="flex gap-3 rounded-[22px] border border-white/30 bg-white/25 p-3 backdrop-blur-2xl shadow-[0_8px_24px_rgba(0,0,0,0.28)] transition active:scale-[.99] hover:bg-white/30"
            >
              <div className="relative flex h-24 w-32 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-white/25 bg-gradient-to-br from-white/20 to-white/5">
                {v.thumbnailUrl ? (
                  <img src={v.thumbnailUrl} alt="" className="h-full w-full object-cover" />
                ) : (
                  <Play className="h-7 w-7 text-white" strokeWidth={1.4} />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-seasons text-[15px] leading-tight text-white">{v.title}</p>
                {v.url && (
                  <p className="mt-1 inline-flex items-center gap-1 text-[11px] font-light text-white/70">
                    <ExternalLink className="h-3 w-3" /> {hostOf(v.url)}
                  </p>
                )}
                {v.note && (
                  <p className="mt-1 line-clamp-2 text-[11.5px] font-light text-white/80">{v.note}</p>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}

      <AddItemDialog open={adding} kind="video" onClose={() => setAdding(false)} onSubmit={handleAdd} />
    </div>
  );
}
