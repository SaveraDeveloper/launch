import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight, Settings2, Pencil } from "lucide-react";
import { useEffect, useState } from "react";
import {
  firstName,
  readOnboarding,
  readSaveraMemory,
  saveOnboarding,
  type OnboardingData,
  type SaveraMemory,
} from "@/lib/userStore";
import { EditProfileDialog } from "@/components/EditProfileDialog";
import quickActionsIcon from "@/assets/QuickActions.png.asset.json";
import goalsIcon from "@/assets/Goals.png.asset.json";
import progressIcon from "@/assets/ViewProgress.png.asset.json";

const AVATAR_KEY = "savera_avatar";

export const Route = createFileRoute("/_app/profile")({
  head: () => ({ meta: [{ title: "Profile — Savera" }] }),
  component: Page,
});

function Page() {
  const [name, setName] = useState("friend");
  const [bio, setBio] = useState("");
  const [avatar, setAvatar] = useState<string | null>(null);
  const [d, setD] = useState<OnboardingData>({});
  const [memory, setMemory] = useState<SaveraMemory | null>(null);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const data = readOnboarding();
    setD(data);
    setName(firstName());
    setBio(data.bio || "");
    setAvatar(window.localStorage.getItem(AVATAR_KEY));
    setMemory(readSaveraMemory());
  }, []);

  const initials = (name[0] || "S").toUpperCase();
  const display = name.charAt(0).toUpperCase() + name.slice(1);

  function handleSave(v: { name: string; bio: string; avatar: string | null }) {
    saveOnboarding({ name: v.name || undefined, bio: v.bio });
    try {
      if (v.avatar) window.localStorage.setItem(AVATAR_KEY, v.avatar);
      else window.localStorage.removeItem(AVATAR_KEY);
    } catch {
      /* image too large to persist */
    }
    setName(v.name ? v.name.split(/\s+/)[0] : "friend");
    setBio(v.bio);
    setAvatar(v.avatar);
    setEditing(false);
  }

  const traits = ["Empathetic", "Reflective", "Curious", "Resilient"];
  const goals = (d.goals && d.goals.length ? d.goals : ["Build Confidence", "Reduce Overthinking", "Improve Sleep"]).slice(0, 3);

  const survey = (memory?.assessment ?? []).filter((a) => a.answer);
  const memoryFacts: string[] = [
    memory?.location?.state
      ? `You're in ${[memory.location.district, memory.location.state].filter(Boolean).join(", ")}.`
      : null,
    memory?.supportPreferences?.length
      ? `You said support feels best as: ${memory.supportPreferences.join(", ")}.`
      : null,
    memory?.goals?.length ? `You're working towards ${memory.goals.join(", ")}.` : null,
    survey.length ? `You shared ${survey.length} reflections in your 5-minute survey.` : null,
  ].filter(Boolean) as string[];

  return (
    <div className="mx-auto w-full max-w-[430px] px-5 pt-10 pb-4 animate-soft-in">
      {/* Header */}
      <header className="mb-6 flex items-center gap-4">
        <button
          type="button"
          onClick={() => setEditing(true)}
          aria-label="Edit your profile"
          className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/30 bg-white/30 font-seasons text-[24px] text-white shadow-[0_8px_24px_rgba(0,0,0,0.35)] backdrop-blur-xl"
        >
          {avatar ? (
            <img src={avatar} alt="Your profile" className="h-full w-full object-cover" />
          ) : (
            initials
          )}
        </button>
        <button
          type="button"
          onClick={() => setEditing(true)}
          className="group flex min-w-0 items-center gap-2 text-left"
        >
          <h1 className="truncate font-seasons text-[26px] leading-tight text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.55)]">
            {display}
          </h1>
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/35 bg-white/25 text-white/85 backdrop-blur-xl transition group-hover:bg-white/35">
            <Pencil className="h-3.5 w-3.5" />
          </span>
        </button>
      </header>

      <EditProfileDialog
        open={editing}
        onClose={() => setEditing(false)}
        name={d.name || (name === "friend" ? "" : name)}
        bio={bio}
        avatar={avatar}
        onSave={handleSave}
      />

      {/* About me */}
      <section className="mb-4 rounded-[26px] border border-white/35 bg-white/25 p-4 shadow-[0_10px_30px_rgba(0,0,0,0.32)] backdrop-blur-2xl">
        <div className="mb-2 flex items-center justify-between">
          <h2 className="font-seasons text-[17px] text-white">About me</h2>
          <button
            onClick={() => setEditing(true)}
            className="inline-flex items-center gap-1 rounded-full border border-white/35 bg-white/25 px-3 py-1 text-[11px] font-light text-white/90"
          >
            <Pencil className="h-3 w-3" /> Edit
          </button>
        </div>
        <p className="text-[12.5px] font-light leading-relaxed text-white/85">
          {bio || "Write a little about yourself — what you care about, what you're moving through."}
        </p>
      </section>

      {/* Survey answers */}
      <section className="mb-4 rounded-[26px] border border-white/35 bg-white/25 p-4 shadow-[0_10px_30px_rgba(0,0,0,0.32)] backdrop-blur-2xl">
        <h2 className="mb-2 font-seasons text-[17px] text-white">Your survey answers</h2>
        {survey.length ? (
          <ul className="flex flex-col gap-2.5">
            {survey.map((a) => (
              <li key={a.question} className="rounded-2xl border border-white/25 bg-white/15 p-3">
                <p className="text-[11.5px] font-light text-white/70">{a.question}</p>
                <p className="mt-1 text-[13px] text-white/95">{a.answer}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-[12.5px] font-light text-white/80">
            No survey answers yet — finish the 5-minute check-in and they'll appear here.
          </p>
        )}
      </section>

      {/* Savera's memories */}
      <section className="mb-4 rounded-[26px] border border-white/35 bg-white/25 p-4 shadow-[0_10px_30px_rgba(0,0,0,0.32)] backdrop-blur-2xl">
        <h2 className="mb-2 font-seasons text-[17px] text-white">Savera's memories of you</h2>
        {memoryFacts.length ? (
          <ul className="flex flex-col gap-2">
            {memoryFacts.map((m) => (
              <li key={m} className="flex gap-2 text-[12.5px] font-light leading-snug text-white/90">
                <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-white/60" />
                {m}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-[12.5px] font-light text-white/80">
            Savera hasn't gathered memories yet. They'll build as you chat and reflect.
          </p>
        )}
      </section>


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
