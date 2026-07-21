import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";

export const Route = createFileRoute("/_app/profile/progress")({
  head: () => ({ meta: [{ title: "Progress — Savera" }] }),
  component: Page,
});

const MOOD = [3, 3, 4, 3, 4, 5, 4, 4, 5, 4, 5, 5, 4, 5];
const JOURNAL = [1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1];

function Page() {
  return (
    <div className="mx-auto w-full max-w-[430px] px-5 pt-10 pb-4 animate-soft-in">
      <Link to="/profile" className="mb-4 inline-flex items-center gap-1 text-[13px] text-white/85">
        <ChevronLeft className="h-4 w-4" /> Profile
      </Link>

      <header className="mb-5">
        <h1 className="font-seasons text-[28px] text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.55)]">
          📈 Progress
        </h1>
        <p className="mt-1 text-[12.5px] font-light text-white/80">
          Patterns, not performance.
        </p>
      </header>

      <Card title="Mood Trends">
        <p className="mb-3 text-[12.5px] font-light leading-relaxed text-white/85">
          Over the last two weeks you've reported feeling calmer on most evenings.
        </p>
        <MoodChart data={MOOD} />
      </Card>

      <Card title="Journey Activity">
        <p className="text-[12.5px] font-light leading-relaxed text-white/85">
          You've explored two journeys this month — one about thoughts, one about rest.
        </p>
      </Card>

      <Card title="Journal Consistency">
        <p className="mb-3 text-[12.5px] font-light leading-relaxed text-white/85">
          You've returned to your journal on most days recently.
        </p>
        <DotRow data={JOURNAL} />
      </Card>

      <Card title="Growth Timeline">
        <ul className="flex flex-col gap-3 pl-1">
          {[
            "Started your first Guided Journey.",
            "Noticed a pattern around evening overthinking.",
            "Chose a small, kinder response this week.",
          ].map((t, i) => (
            <li key={i} className="flex gap-3">
              <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-amber-200/90" />
              <p className="text-[12.5px] font-light leading-relaxed text-white/90">{t}</p>
            </li>
          ))}
        </ul>
      </Card>

      <Card title="Weekly Reflection">
        <p className="text-[13px] font-light italic leading-relaxed text-white/90">
          "This week you leaned toward rest more than you usually do — a quiet, meaningful shift."
        </p>
      </Card>
    </div>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-3 rounded-[24px] border border-white/35 bg-white/25 p-4 shadow-[0_10px_30px_rgba(0,0,0,0.3)] backdrop-blur-2xl">
      <h2 className="mb-2 text-[10.5px] font-semibold uppercase tracking-[0.2em] text-white/70">
        {title}
      </h2>
      {children}
    </section>
  );
}

function MoodChart({ data }: { data: number[] }) {
  const w = 300;
  const h = 70;
  const max = 5;
  const step = w / (data.length - 1);
  const points = data.map((v, i) => `${i * step},${h - (v / max) * (h - 8) - 4}`).join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full">
      <defs>
        <linearGradient id="mg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(255,220,150,0.45)" />
          <stop offset="100%" stopColor="rgba(255,220,150,0)" />
        </linearGradient>
      </defs>
      <polyline points={`0,${h} ${points} ${w},${h}`} fill="url(#mg)" stroke="none" />
      <polyline
        points={points}
        fill="none"
        stroke="rgba(255,220,150,0.95)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DotRow({ data }: { data: number[] }) {
  return (
    <div className="flex justify-between gap-1">
      {data.map((v, i) => (
        <span
          key={i}
          className={`h-3 w-3 rounded-full ${
            v ? "bg-emerald-200/80" : "bg-white/30 border border-white/35"
          }`}
        />
      ))}
    </div>
  );
}
