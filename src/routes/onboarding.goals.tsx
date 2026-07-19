import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import {
  Wind,
  ShieldCheck,
  Brain,
  Anchor,
  Sparkles,
  Smile,
  Compass,
  Target,
  Users,
  HeartHandshake,
  MessageCircle,
  HeartCrack,
  Flame,
  Focus,
  Repeat,
  Clock,
  Star,
  GraduationCap,
  Scale,
  Sun,
  type LucideIcon,
} from "lucide-react";
import { CoffeeScreen } from "@/components/CoffeeScreen";
import { ProgressDots } from "@/components/ProgressDots";
import { saveOnboarding, readOnboarding } from "@/lib/userStore";

export const Route = createFileRoute("/onboarding/goals")({
  head: () => ({ meta: [{ title: "What do you want to work towards — Savera" }] }),
  component: Page,
});

type Goal = { label: string; Icon: LucideIcon };

const CATEGORIES: { title: string; options: Goal[] }[] = [
  {
    title: "Emotional Well-Being",
    options: [
      { label: "Feel calmer", Icon: Wind },
      { label: "Manage stress", Icon: ShieldCheck },
      { label: "Stop overthinking", Icon: Brain },
      { label: "Build emotional resilience", Icon: Anchor },
    ],
  },
  {
    title: "Confidence & Identity",
    options: [
      { label: "Become more confident", Icon: Sparkles },
      { label: "Improve self-esteem", Icon: Smile },
      { label: "Discover myself", Icon: Compass },
      { label: "Find my purpose", Icon: Target },
    ],
  },
  {
    title: "Relationships",
    options: [
      { label: "Improve friendships", Icon: Users },
      { label: "Build healthier relationships", Icon: HeartHandshake },
      { label: "Improve communication", Icon: MessageCircle },
      { label: "Heal from heartbreak", Icon: HeartCrack },
    ],
  },
  {
    title: "Productivity",
    options: [
      { label: "Stay motivated", Icon: Flame },
      { label: "Focus better", Icon: Focus },
      { label: "Build healthy habits", Icon: Repeat },
      { label: "Manage my time", Icon: Clock },
    ],
  },
  {
    title: "Growth",
    options: [
      { label: "Become my best self", Icon: Star },
      { label: "Learn emotional skills", Icon: GraduationCap },
      { label: "Create greater balance", Icon: Scale },
      { label: "Feel happier", Icon: Sun },
    ],
  },
];

function Page() {
  const nav = useNavigate();
  const [picked, setPicked] = useState<Set<string>>(
    () => new Set(readOnboarding().goals || [])
  );

  const toggle = (o: string) =>
    setPicked((s) => {
      const n = new Set(s);
      n.has(o) ? n.delete(o) : n.add(o);
      return n;
    });

  const next = () => {
    saveOnboarding({ goals: [...picked] });
    nav({ to: "/assessment" });
  };

  return (
    <CoffeeScreen blurBg>
      <div className="flex min-h-svh flex-col px-6 pt-11 pb-6">
        <div className="flex items-center justify-between">
          <Link to="/onboarding/support" className="text-sm text-white/90">←</Link>
          <button
            disabled={picked.size === 0}
            onClick={next}
            className="text-sm font-semibold text-white disabled:opacity-40"
          >
            Next →
          </button>
        </div>

        <div className="mt-4">
          <ProgressDots step={3} total={8} />
        </div>

        <h1 className="mt-6 text-center font-seasons text-[28px] font-light leading-[1.1] text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.55)]">
          What do you want<br />to work towards?
        </h1>
        <p className="mx-auto mt-2 max-w-[260px] text-center text-[13px] font-light leading-6 text-white/85">
          Choose anything that speaks to you.
        </p>

        {/* Scrollable options area */}
        <div className="mt-5 -mx-6 flex-1 overflow-y-auto px-6 pb-24">
          <div className="flex flex-col gap-5">
            {CATEGORIES.map((cat) => (
              <div key={cat.title}>
                <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/80">
                  {cat.title}
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {cat.options.map(({ label, Icon }) => {
                    const active = picked.has(label);
                    return (
                      <button
                        key={label}
                        type="button"
                        onClick={() => toggle(label)}
                        className={`flex min-h-[56px] items-center gap-2.5 rounded-2xl border px-3 py-2 text-left text-[12.5px] leading-tight shadow-md transition duration-300 active:scale-[.97] ${
                          active
                            ? "border-white bg-white text-[#7a4a1d]"
                            : "border-white/30 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20"
                        }`}
                      >
                        <span
                          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                            active ? "bg-[#7a4a1d]/10 text-[#7a4a1d]" : "bg-white/15 text-white"
                          }`}
                        >
                          <Icon className="h-4 w-4" />
                        </span>
                        <span>{label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sticky Next button */}
        <div className="pointer-events-none sticky bottom-0 -mx-6 bg-gradient-to-t from-black/70 via-black/40 to-transparent px-6 pt-6 pb-4">
          <button
            type="button"
            disabled={picked.size === 0}
            onClick={next}
            className="pointer-events-auto w-full rounded-full bg-white py-3.5 text-[13px] font-bold tracking-[0.22em] text-[#7a4a1d] shadow-lg shadow-black/40 disabled:opacity-50"
          >
            NEXT
          </button>
        </div>
      </div>
    </CoffeeScreen>
  );
}
