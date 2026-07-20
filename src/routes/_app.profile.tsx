import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight, Sparkles, Target, LineChart, Settings2 } from "lucide-react";
import { firstName, readOnboarding } from "@/lib/userStore";

export const Route = createFileRoute("/_app/profile")({
  head: () => ({ meta: [{ title: "Profile — Savera" }] }),
  component: Page,
});

function Page() {
  const name = firstName();
  const initials = (name[0] || "S").toUpperCase();
  const d = readOnboarding();
  const traits = ["Empathetic", "Reflective", "Curious", "Resilient"];
  const goals = (d.goals && d.goals.length ? d.goals : ["Build Confidence", "Reduce Overthinking", "Improve Sleep"]).slice(0, 3);

  return (
    <div className="mx-auto w-full max-w-[430px] px-5 pt-10 pb-4 animate-soft-in">
      {/* Header */}
      <header className="mb-6 flex items-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/30 bg-white/15 backdrop-blur-xl font-seasons text-[24px] text-white shadow-[0_8px_24px_rgba(0,0,0,0.35)]">
          {initials}
        </div>
        <div className="min-w-0">
          <h1 className="font-seasons text-[26px] leading-tight text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.55)]">
            {name.charAt(0).toUpperCase() + name.slice(1)}
          </h1>
          <p className="mt-0.5 text-[12.5px] font-light italic text-white/80">
            Growing one day at a time.
          </p>
        </div>
      </header>

      {/* Personal Snapshot */}
      <SectionCard
        to="/profile/snapshot"
        icon={<Sparkles className="h-5 w-5 text-amber-100" strokeWidth={1.5} />}
        title="Personal Snapshot"
        subtitle="How Savera understands you"
        cta="View Snapshot"
      >
        <div className="flex flex-wrap gap-1.5">
          {traits.map((t) => (
            <span
              key={t}
              className="rounded-full border border-white/25 bg-white/10 px-2.5 py-1 text-[11px] font-light text-white/90"
            >
              {t}
            </span>
          ))}
        </div>
      </SectionCard>

      {/* Goals */}
      <SectionCard
        to="/profile/goals"
        icon={<Target className="h-5 w-5 text-rose-100" strokeWidth={1.5} />}
        title="Goals"
        subtitle="What you're working towards"
        cta="View Goals"
      >
        <ul className="flex flex-col gap-1.5">
          {goals.map((g) => (
            <li key={g} className="flex items-center gap-2 text-[12.5px] font-light text-white/90">
              <span className="h-1.5 w-1.5 rounded-full bg-white/60" />
              {g}
            </li>
          ))}
        </ul>
      </SectionCard>

      {/* Progress */}
      <SectionCard
        to="/profile/progress"
        icon={<LineChart className="h-5 w-5 text-emerald-100" strokeWidth={1.5} />}
        title="Progress"
        subtitle="Gentle patterns over time"
        cta="View Progress"
      >
        <div className="flex flex-col gap-1.5 text-[12.5px] font-light text-white/85">
          <p>Daily Check-ins</p>
          <p>Journey Completion</p>
          <p>Mood Trends</p>
        </div>
      </SectionCard>

      {/* Preferences */}
      <SectionCard
        to="/profile/settings"
        icon={<Settings2 className="h-5 w-5 text-sky-100" strokeWidth={1.5} />}
        title="Preferences"
        subtitle="Privacy · Notifications · Account"
        cta="Open Settings"
      />
    </div>
  );
}

function SectionCard({
  to,
  icon,
  title,
  subtitle,
  cta,
  children,
}: {
  to: string;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  cta: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="mb-4 rounded-[26px] border border-white/25 bg-white/10 p-4 shadow-[0_10px_30px_rgba(0,0,0,0.32)] backdrop-blur-2xl">
      <div className="mb-3 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/25 bg-white/15">
          {icon}
        </div>
        <div className="min-w-0 flex-1">
          <h2 className="font-seasons text-[17px] leading-tight text-white">{title}</h2>
          <p className="text-[11.5px] font-light text-white/70">{subtitle}</p>
        </div>
      </div>
      {children && <div className="mb-3">{children}</div>}
      <Link
        to={to}
        className="flex items-center justify-between rounded-full border border-white/25 bg-white/10 px-4 py-2 text-[12px] font-light text-white/95 hover:bg-white/15"
      >
        {cta}
        <ChevronRight className="h-4 w-4 text-white/80" />
      </Link>
    </section>
  );
}
