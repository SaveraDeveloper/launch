import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import apartment from "@/assets/Apartment.png.asset.json";
import apartmentGirl from "@/assets/ApartmentWithGirl.png.asset.json";
import sunflower from "@/assets/SunflowerTransparent.png.asset.json";
import sunflowerBg from "@/assets/Sunflower_bckgd.png.asset.json";
import saveraBrown from "@/assets/SaveraBROWN.png.asset.json";
import saveraWhite from "@/assets/SaveraWHITE.png.asset.json";

export const Route = createFileRoute("/welcome")({
  head: () => ({ meta: [{ title: "Savera — A space to unwind" }] }),
  component: Welcome,
});

// Stage 0 (splash):   sunflower bg + brown Savera logo centered
// Stage 1 (rise):     logo moves upward + crossfades brown→white, bg fades to apartment
// Stage 2 (begin):    empty apartment only, ~2s
// Stage 3 (reveal):   crossfade in ApartmentWithGirl
// Stage 4 (intro):    Savera profile card slides up
// Stage 5 (leaving):  route away
type Stage = "splash" | "rise" | "begin" | "reveal" | "intro" | "leaving";

function Welcome() {
  const nav = useNavigate();
  const [stage, setStage] = useState<Stage>("splash");

  useEffect(() => {
    const timings: Partial<Record<Stage, [Stage, number]>> = {
      splash:  ["rise", 1400],
      rise:    ["begin", 1600],
      begin:   ["reveal", 2000],
      reveal:  ["intro", 1600],
      leaving: ["intro" /* unused */, 900],
    };
    if (stage === "leaving") {
      const t = setTimeout(() => nav({ to: "/onboarding/intro" }), 900);
      return () => clearTimeout(t);
    }
    const next = timings[stage];
    if (!next) return;
    const t = setTimeout(() => setStage(next[0]), next[1]);
    return () => clearTimeout(t);
  }, [stage, nav]);

  const apartmentVisible = stage !== "splash" && stage !== "rise" ? true : stage === "rise";
  // Apartment starts fading in during "rise"
  const apartmentOpacity = stage === "splash" ? 0 : 1;
  const sunflowerBgVisible = stage === "splash" || stage === "rise";
  const logoVisible = stage === "splash" || stage === "rise";
  const logoRaised = stage !== "splash"; // move up starting at rise
  const whiteLogoVisible = stage !== "splash"; // crossfade to white during rise
  const girlVisible = stage === "reveal" || stage === "intro" || stage === "leaving";
  const cardVisible = stage === "intro" || stage === "leaving";

  return (
    <div className="aroha-mobile-screen relative overflow-hidden bg-[#f2e6c8] text-white">
      {/* Sunflower background (splash) */}
      <img
        src={sunflowerBg.url}
        alt=""
        aria-hidden
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1200ms] ease-in-out ${
          sunflowerBgVisible ? "opacity-100" : "opacity-0"
        }`}
      />
      {/* Base: empty apartment */}
      <img
        src={apartment.url}
        alt=""
        aria-hidden
        style={{ opacity: apartmentOpacity }}
        className="absolute inset-0 h-full w-full object-cover transition-opacity duration-[1400ms] ease-in-out"
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

      {/* Savera logo — brown → white, centered → raised */}
      <div
        aria-hidden={!logoVisible}
        className={`pointer-events-none absolute left-1/2 z-20 -translate-x-1/2 transition-all duration-[1400ms] ease-in-out ${
          logoRaised ? "top-[10svh]" : "top-1/2 -translate-y-1/2"
        } ${logoVisible ? "opacity-100" : "opacity-0"}`}
      >
        <div className="relative h-[180px] w-[240px]">
          <img
            src={saveraBrown.url}
            alt="Savera"
            className={`absolute inset-0 h-full w-full object-contain transition-opacity duration-[1400ms] ease-in-out ${
              whiteLogoVisible ? "opacity-0" : "opacity-100"
            }`}
          />
          <img
            src={saveraWhite.url}
            alt=""
            aria-hidden
            className={`absolute inset-0 h-full w-full object-contain transition-opacity duration-[1400ms] ease-in-out ${
              whiteLogoVisible ? "opacity-100" : "opacity-0"
            }`}
          />
        </div>
      </div>

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
    </div>
  );
}
