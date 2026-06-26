import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import girl from "@/assets/aroha-10.svg.asset.json";
import boy from "@/assets/aroha-11.svg.asset.json";

export const Route = createFileRoute("/onboarding/gender")({
  head: () => ({ meta: [{ title: "Your Personalized Assessment — Aroha" }] }),
  component: Page,
});

type G = "Non-Binary" | "Other" | "Male" | "Female";

function Option({
  label,
  selected,
  onClick,
  img,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
  img?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative min-h-[150px] rounded-[28px] border px-4 py-4 text-left shadow-lg transition duration-300 active:scale-[.97] ${
        selected
          ? "border-white bg-white text-[#232178] shadow-white/10"
          : "border-white/22 bg-white/[0.075] text-white shadow-black/15 backdrop-blur-sm hover:bg-white/12"
      }`}
    >
      <span className="flex h-full flex-col justify-between gap-3">
        <span className="flex items-start justify-between gap-2">
          <span className="font-seasons text-[20px] leading-tight">{label}</span>
          <span
            data-selected={selected}
            className={`choice-dot mt-1 flex h-5 w-5 items-center justify-center rounded-full border ${
              selected ? "border-[#232178] bg-[#232178]" : "border-white/42 bg-transparent"
            }`}
          >
            <span className="choice-dot-core h-2 w-2 rounded-full bg-white" />
          </span>
        </span>
        {img && (
          <img
            src={img}
            alt=""
            aria-hidden
            className="mx-auto h-20 w-auto object-contain"
          />
        )}
      </span>
    </button>
  );
}

function Page() {
  const nav = useNavigate();
  const [g, setG] = useState<G | "">("");
  return (
    <div className="aroha-mobile-screen relative overflow-hidden bg-aroha-cool text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(255,255,255,.24),transparent_32%),radial-gradient(circle_at_15%_72%,rgba(255,255,255,.12),transparent_28%)]" />
      <div className="relative z-10 flex min-h-svh flex-col px-6 pt-11 pb-10">
        <div className="flex items-center justify-between">
          <Link to="/onboarding/assessment-intro" className="text-sm text-white/85">←</Link>
          <span />
        </div>

        <h1 className="mt-8 text-center font-seasons text-[38px] leading-[1.05] animate-flicker">
          How do you<br />identify?
        </h1>
        <p className="mx-auto mt-4 max-w-[260px] text-center text-[15px] leading-6 text-white/82">
          Choose what feels closest to you.
        </p>

        <div className="mt-9 grid grid-cols-2 gap-3">
          <Option label="Female" selected={g === "Female"} onClick={() => setG("Female")} img={girl.url} />
          <Option label="Male" selected={g === "Male"} onClick={() => setG("Male")} img={boy.url} />
          <Option label="Non-Binary" selected={g === "Non-Binary"} onClick={() => setG("Non-Binary")} />
          <Option label="Other" selected={g === "Other"} onClick={() => setG("Other")} />
        </div>

        <button
          type="button"
          disabled={!g}
          onClick={() => nav({ to: "/onboarding/challenges" })}
          className="mt-auto rounded-full bg-white py-3.5 text-[13px] font-bold tracking-[0.18em] text-[#2a2880] shadow-lg shadow-black/20 disabled:opacity-50"
        >
          NEXT
        </button>
      </div>
    </div>
  );
}
