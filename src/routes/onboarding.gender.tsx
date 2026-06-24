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
    <button type="button" onClick={onClick} className="flex flex-col items-center gap-2">
      <span className={`flex h-7 w-7 items-center justify-center rounded-full border-2 border-white ${selected ? "bg-white" : ""}`}>
        {selected && <span className="h-3 w-3 rounded-full bg-[#2a2880]" />}
      </span>
      <span className="font-seasons text-[22px] text-white">{label}</span>
      {img && <img src={img} alt="" aria-hidden className="mt-3 h-28 w-auto object-contain" />}
    </button>
  );
}

function Page() {
  const nav = useNavigate();
  const [g, setG] = useState<G | "">("Female");
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-aroha-cool text-white">
      <div className="relative z-10 flex min-h-screen flex-col px-6 pt-14 pb-10">
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
