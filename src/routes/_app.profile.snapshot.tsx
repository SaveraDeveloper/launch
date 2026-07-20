import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronLeft, RefreshCw } from "lucide-react";
import { firstName } from "@/lib/userStore";

export const Route = createFileRoute("/_app/profile/snapshot")({
  head: () => ({ meta: [{ title: "Personal Snapshot — Savera" }] }),
  component: Page,
});

function Page() {
  const [updatedAgo, setUpdatedAgo] = useState("3 days ago");
  const [refreshing, setRefreshing] = useState(false);
  const name = firstName();

  const refresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      setUpdatedAgo("just now");
    }, 1200);
  };

  const strengths = ["Thoughtful", "Curious", "Compassionate"];
  const growth = ["Overthinking", "Self-confidence", "Rest"];

  return (
    <div className="mx-auto w-full max-w-[430px] px-5 pt-10 pb-4 animate-soft-in">
      <Link to="/profile" className="mb-4 inline-flex items-center gap-1 text-[13px] text-white/85">
        <ChevronLeft className="h-4 w-4" /> Profile
      </Link>

      <header className="mb-5">
        <h1 className="font-seasons text-[28px] text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.55)]">
          🌻 Personal Snapshot
        </h1>
        <p className="mt-1 text-[12px] font-light text-white/75">Updated {updatedAgo}</p>
      </header>

      <Card title="Strengths">
        <ChipRow items={strengths} tint="bg-amber-200/15 border-amber-100/30" />
      </Card>

      <Card title="Growth Areas">
        <ChipRow items={growth} tint="bg-rose-200/15 border-rose-100/30" />
      </Card>

      <Card title="Current Focus">
        <p className="text-[13px] font-light leading-relaxed text-white/90">
          Building healthier thinking patterns.
        </p>
      </Card>

      <Card title="How Savera Understands You">
        <p className="text-[13px] font-light leading-relaxed text-white/90">
          {name.charAt(0).toUpperCase() + name.slice(1)}, you tend to think deeply before making
          decisions and often care about doing things well. Recently you've been building healthier
          boundaries around overthinking while growing more confident in trusting yourself.
        </p>
      </Card>

      <button
        onClick={refresh}
        disabled={refreshing}
        className="mt-2 flex w-full items-center justify-center gap-2 rounded-full border border-white/25 bg-white/10 py-3 text-[12.5px] font-light text-white backdrop-blur-xl transition hover:bg-white/15 disabled:opacity-60"
      >
        <RefreshCw className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />
        {refreshing ? "Refreshing…" : "Refresh Snapshot"}
      </button>
    </div>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-3 rounded-[24px] border border-white/25 bg-white/10 p-4 shadow-[0_10px_30px_rgba(0,0,0,0.3)] backdrop-blur-2xl">
      <h2 className="mb-2 text-[10.5px] font-semibold uppercase tracking-[0.2em] text-white/70">
        {title}
      </h2>
      {children}
    </section>
  );
}

function ChipRow({ items, tint }: { items: string[]; tint: string }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {items.map((i) => (
        <span
          key={i}
          className={`rounded-full border px-3 py-1 text-[12px] font-light text-white ${tint}`}
        >
          {i}
        </span>
      ))}
    </div>
  );
}
