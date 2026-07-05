import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import sunflower from "@/assets/Sunflower_bckgd.png.asset.json";
import logo from "@/assets/Savera_logo.png.asset.json";
import river from "@/assets/Riverscene.png.asset.json";
import cottage from "@/assets/CottageShop.png.asset.json";
import coffee from "@/assets/CoffeeShop.png.asset.json";

export const Route = createFileRoute("/welcome")({
  head: () => ({ meta: [{ title: "Savera — A space to unwind" }] }),
  component: Welcome,
});

type Stage = "sunflower" | "river" | "cottage" | "coffee";

const BG: Record<Stage, string> = {
  sunflower: sunflower.url,
  river: river.url,
  cottage: cottage.url,
  coffee: coffee.url,
};

function Welcome() {
  const nav = useNavigate();
  const [stage, setStage] = useState<Stage>("sunflower");

  useEffect(() => {
    if (stage === "sunflower") {
      const t = setTimeout(() => setStage("river"), 2400);
      return () => clearTimeout(t);
    }
    if (stage === "cottage") {
      const t = setTimeout(() => setStage("coffee"), 2800);
      return () => clearTimeout(t);
    }
  }, [stage]);

  return (
    <div className="aroha-mobile-screen relative overflow-hidden bg-black text-white">
      {/* Cross-fading backgrounds */}
      {(Object.keys(BG) as Stage[]).map((s) => (
        <img
          key={s}
          src={BG[s]}
          alt=""
          aria-hidden
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1600ms] ease-in-out ${
            stage === s ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
      <div className="pointer-events-none absolute inset-0 bg-black/30" />

      {/* Logo moves from center (sunflower) to top-sky (all other stages) */}
      <img
        src={logo.url}
        alt="Savera"
        className={`pointer-events-none absolute left-1/2 z-20 -translate-x-1/2 select-none drop-shadow-[0_6px_18px_rgba(0,0,0,0.35)] transition-all duration-[1800ms] ease-out ${
          stage === "sunflower"
            ? "top-1/2 w-[68%] -translate-y-1/2"
            : "top-[5svh] w-[46%]"
        }`}
      />

      {/* Bottom content per stage */}
      <div className="relative z-10 flex min-h-svh flex-col justify-end px-8 pb-14">
        {stage === "river" && (
          <div key="river" className="animate-soft-in text-center">
            <p className="mx-auto max-w-[300px] font-seasons text-[22px] font-light leading-[1.35] text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.55)]">
              A space that helps you understand yourself, navigate challenges, and build lasting wellbeing.
            </p>
            <button
              onClick={() => setStage("cottage")}
              className="mt-8 w-full rounded-full bg-white py-4 text-[13px] font-bold tracking-[0.22em] text-[#7a4a1d] shadow-xl shadow-black/40"
            >
              GET STARTED
            </button>
          </div>
        )}

        {stage === "cottage" && (
          <div key="cottage" className="animate-soft-in text-center pb-16">
            <p className="mx-auto max-w-[300px] font-seasons text-[26px] font-light leading-[1.3] text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.55)]">
              Welcome to the coffee shop.
            </p>
          </div>
        )}

        {stage === "coffee" && (
          <div key="coffee" className="animate-soft-in">
            <button
              onClick={() => nav({ to: "/onboarding/intro" })}
              className="w-full rounded-full bg-white py-4 text-[13px] font-bold tracking-[0.22em] text-[#7a4a1d] shadow-xl shadow-black/40"
            >
              CONTINUE
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
