import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import apartment from "@/assets/Apartment.png.asset.json";
import apartmentGirl from "@/assets/ApartmentWithGirl.png.asset.json";
import sunflower from "@/assets/SunflowerTransparent.png.asset.json";

export const Route = createFileRoute("/welcome")({
  head: () => ({ meta: [{ title: "Savera — A space to unwind" }] }),
  component: Welcome,
});

// Stage 1 (begin): apartment ONLY, no girl — ~2s
// Stage 2 (reveal): crossfade in ApartmentWithGirl (girl appears)
// Stage 3 (intro):  Savera profile card slides up
// Stage 4 (leaving): route away
type Stage = "begin" | "reveal" | "intro" | "leaving";

function Welcome() {
  const nav = useNavigate();
  const [stage, setStage] = useState<Stage>("begin");

  useEffect(() => {
    if (stage === "begin") {
      const t = setTimeout(() => setStage("reveal"), 2000);
      return () => clearTimeout(t);
    }
    if (stage === "reveal") {
      const t = setTimeout(() => setStage("intro"), 1600);
      return () => clearTimeout(t);
    }
    if (stage === "leaving") {
      const t = setTimeout(() => nav({ to: "/onboarding/intro" }), 900);
      return () => clearTimeout(t);
    }
  }, [stage, nav]);

  const girlVisible = stage !== "begin";
  const cardVisible = stage === "intro" || stage === "leaving";

  return (
    <div className="aroha-mobile-screen relative overflow-hidden bg-[#f2e6c8] text-white">
      {/* Base: empty apartment */}
      <img
        src={apartment.url}
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover"
      />
      {/* Crossfade layer: apartment with girl */}
      <img
        src={apartmentGirl.url}
        alt=""
        aria-hidden
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1400ms] ease-in-out ${
          girlVisible ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Intro profile card */}
      <div
        className={`absolute inset-x-6 z-30 transition-all duration-700 ${
          cardVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6 pointer-events-none"
        }`}
        style={{ bottom: "14svh" }}
      >
        <div className="rounded-[28px] border border-white/40 bg-white/15 p-4 shadow-2xl shadow-black/40 backdrop-blur-xl">
          <div className="flex items-center gap-4">
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl border border-white/50 bg-white/25 backdrop-blur">
              <img src={sunflower.url} alt="" aria-hidden className="absolute inset-0 h-full w-full object-contain p-2" />
            </div>
            <div className="min-w-0">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/80">
                Your companion
              </p>
              <p className="font-seasons text-[24px] leading-tight text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.55)]">
                Hi, I'm Savera
              </p>
            </div>
          </div>
          <button
            onClick={() => setStage("leaving")}
            className="mt-4 w-full rounded-full bg-white py-3 text-[12px] font-bold tracking-[0.22em] text-[#7a4a1d] shadow-lg shadow-black/40"
          >
            CONTINUE
          </button>
        </div>
      </div>

      {/* Initial CTA */}
      <div className="relative z-10 flex min-h-svh flex-col justify-end px-8 pb-14">
        <div
          className={`transition-opacity duration-700 ${
            stage === "begin" ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <button
            onClick={() => setStage("reveal")}
            className="w-full rounded-full bg-white py-4 text-[13px] font-bold tracking-[0.22em] text-[#7a4a1d] shadow-xl shadow-black/40"
          >
            LET'S BEGIN
          </button>
        </div>
      </div>
    </div>
  );
}
