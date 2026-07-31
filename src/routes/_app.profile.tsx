import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight, Settings2, Camera } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { firstName, readOnboarding } from "@/lib/userStore";
import quickActionsIcon from "@/assets/QuickActions.png.asset.json";
import goalsIcon from "@/assets/Goals.png.asset.json";
import progressIcon from "@/assets/ViewProgress.png.asset.json";

const AVATAR_KEY = "savera_avatar";

export const Route = createFileRoute("/_app/profile")({
  head: () => ({ meta: [{ title: "Profile — Savera" }] }),
  component: Page,
});

function Page() {
  const name = firstName();
  const initials = (name[0] || "S").toUpperCase();
  const d = readOnboarding();
  const [avatar, setAvatar] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setAvatar(window.localStorage.getItem(AVATAR_KEY));
  }, []);

  function onPick(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const url = String(reader.result);
      try {
        window.localStorage.setItem(AVATAR_KEY, url);
      } catch {
        /* image too large to persist */
      }
      setAvatar(url);
    };
    reader.readAsDataURL(file);
  }
  const traits = ["Empathetic", "Reflective", "Curious", "Resilient"];
  const goals = (d.goals && d.goals.length ? d.goals : ["Build Confidence", "Reduce Overthinking", "Improve Sleep"]).slice(0, 3);

  return (
    <div className="mx-auto w-full max-w-[430px] px-5 pt-10 pb-4 animate-soft-in">
      {/* Header */}
      <header className="mb-6 flex items-center gap-4">
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          aria-label="Upload your own picture"
          className="group relative flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/30 bg-white/30 font-seasons text-[24px] text-white shadow-[0_8px_24px_rgba(0,0,0,0.35)] backdrop-blur-xl"
        >
          {avatar ? (
            <img src={avatar} alt="Your profile" className="h-full w-full object-cover" />
          ) : (
            initials
          )}
          <span className="absolute inset-x-0 bottom-0 flex items-center justify-center gap-1 bg-black/45 py-[3px] text-[8.5px] font-light tracking-wide text-white">
            <Camera className="h-2.5 w-2.5" /> Upload
          </span>
        </button>
        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={onPick} />
        <div className="min-w-0">
          <h1 className="font-seasons text-[26px] leading-tight text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.55)]">
            {name.charAt(0).toUpperCase() + name.slice(1)}
          </h1>
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="mt-0.5 text-[11.5px] font-light text-white/75 underline underline-offset-2"
          >
            Upload your own picture
          </button>
        </div>
      </header>

      {/* Personal Snapshot */}
      <SectionCard
        to="/profile/snapshot"
        icon={<img src={quickActionsIcon.url} alt="" aria-hidden className="h-8 w-8 object-contain" />}
        title="Personal Snapshot"
        subtitle="How Savera understands you"
        cta="View Snapshot"
      >
        <div className="flex flex-wrap gap-1.5">
          {traits.map((t) => (
            <span
              key={t}
              className="rounded-full border border-white/35 bg-white/25 px-2.5 py-1 text-[11px] font-light text-white/90"
            >
              {t}
            </span>
          ))}
        </div>
      </SectionCard>

      {/* Goals */}
      <SectionCard
        to="/profile/goals"
        icon={<img src={goalsIcon.url} alt="" aria-hidden className="h-8 w-8 object-contain" />}
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
        icon={<img src={progressIcon.url} alt="" aria-hidden className="h-8 w-8 object-contain" />}
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
    <section className="mb-4 rounded-[26px] border border-white/35 bg-white/25 p-4 shadow-[0_10px_30px_rgba(0,0,0,0.32)] backdrop-blur-2xl">
      <div className="mb-3 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/35 bg-white/30">
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
        className="flex items-center justify-between rounded-full border border-white/35 bg-white/25 px-4 py-2 text-[12px] font-light text-white/95 hover:bg-white/30"
      >
        {cta}
        <ChevronRight className="h-4 w-4 text-white/80" />
      </Link>
    </section>
  );
}
