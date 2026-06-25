import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import girl from "@/assets/girl.png.asset.json";
import boy from "@/assets/boy.png.asset.json";

export const Route = createFileRoute("/onboarding/gender")({
  head: () => ({ meta: [{ title: "Your Personalized Assessment — Aroha" }] }),
  component: Page,
});

type G = "Non-Binary" | "Other" | "Male" | "Female";

function Option({ label, selected, onClick, img }: { label: string; selected: boolean; onClick: () => void; img?: string }) {
  return (
    <button type="button" onClick={onClick} className="group flex flex-col items-center gap-2 transition duration-300 active:scale-95">
      <span data-selected={selected} className="choice-dot flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-white/0">
        <span className="choice-dot-core h-3 w-3 rounded-full bg-[#2a2880]" />
      </span>
      <span className={`font-seasons text-[22px] text-white transition duration-300 ${selected ? "opacity-100" : "opacity-[.82]"}`}>{label}</span>
      {img && <img src={img} alt="" aria-hidden className={`mt-3 h-28 w-auto object-contain transition duration-500 ${selected ? "scale-105 opacity-100 drop-shadow-[0_0_18px_rgba(255,255,255,.25)]" : "scale-100 opacity-80"}`} />}
    </button>
  );
}

function Page() {
  const nav = useNavigate();
  const [g, setG] = useState<G | "">("Female");
  return (
    <div className="aroha-mobile-screen relative overflow-hidden bg-aroha-cool text-white">
      <div className="relative z-10 flex min-h-svh flex-col px-6 pt-11 pb-10">
        <div className="flex items-center justify-between">
          <Link to="/onboarding/assessment-intro" className="text-sm text-white/85">←</Link>
          <button
            disabled={!g}
            onClick={() => nav({ to: "/onboarding/challenges" })}
            className="text-sm font-semibold text-white disabled:opacity-40"
          >
            Next →
          </button>
        </div>

        <h1 className="mt-6 text-center font-seasons text-[36px] leading-[1.05] animate-flicker">
          Your Personalized<br />Assessment
        </h1>

        <h2 className="mt-12 text-center font-seasons text-[26px] text-white/95">Gender:</h2>

        <div className="mx-auto mt-10 grid w-full max-w-sm grid-cols-2 gap-x-8 gap-y-10">
          <Option label="Non-Binary" selected={g === "Non-Binary"} onClick={() => setG("Non-Binary")} />
          <Option label="Other"      selected={g === "Other"}      onClick={() => setG("Other")} />
          <Option label="Male"       selected={g === "Male"}       onClick={() => setG("Male")} img={boy.url} />
          <Option label="Female"     selected={g === "Female"}     onClick={() => setG("Female")} img={girl.url} />
        </div>
      </div>
    </div>
  );
}
