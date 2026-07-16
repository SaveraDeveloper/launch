import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import apartment from "@/assets/ApartmentWithGirl.png.asset.json";
import sunflower from "@/assets/SunflowerTransparent.png.asset.json";

export const Route = createFileRoute("/welcome")({
  head: () => ({ meta: [{ title: "Savera — A space to unwind" }] }),
  component: Welcome,
});

// Stage 1: apartment only (no girl, no text) — ~2s
// Stage 2: girl fades in
// Stage 3: intro card slides up ("Hi, I'm Savera" + profile)
// Stage 4: leave
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
      <img
        src={apartment.url}
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Covers the girl until reveal */}
      <div
        className={`pointer-events-none absolute inset-x-0 bottom-0 h-[62%] transition-opacity duration-[1400ms] ease-in-out ${
          girlVisible ? "opacity-0" : "opacity-100"
        }`}
        style={{
          background:
            "linear-gradient(to top, rgba(20,10,4,0.92) 30%, rgba(20,10,4,0.55) 60%, rgba(20,10,4,0) 100%)",
        }}
      />

      {/* Intro profile card */}
      <div
        className={`absolute inset-x-6 z-30 transition-all duration-700 ${
          cardVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6 pointer-events-none"
        }`}
        style={{ bottom: "16svh" }}
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
