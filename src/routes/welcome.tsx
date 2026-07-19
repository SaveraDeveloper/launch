import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import apartment from "@/assets/Apartment.png.asset.json";
import apartmentGirl from "@/assets/ApartmentWithGirl.png.asset.json";
import apartmentGirlText from "@/assets/ApartmentWithGirlAndText.png.asset.json";
import sunflowerBg from "@/assets/Sunflower_bckgd.png.asset.json";
import saveraBrown from "@/assets/SaveraBROWN.png.asset.json";
import saveraWhite from "@/assets/SaveraWHITE.png.asset.json";

export const Route = createFileRoute("/welcome")({
  head: () => ({ meta: [{ title: "Savera — A space to unwind" }] }),
  component: Welcome,
});

// Stage 0 (splash):   sunflower bg + brown Savera logo centered
// Stage 1 (rise):     logo moves up + crossfades brown→white, bg → apartment
// Stage 2 (begin):    empty apartment only
// Stage 3 (reveal):   crossfade in ApartmentWithGirl
// Stage 4 (frame):    crossfade in ApartmentWithGirlAndText (beige box scene)
// Stage 5 (intro):    typewriter greeting + continue button appear
// Stage 6 (leaving):  route away
type Stage = "splash" | "rise" | "begin" | "reveal" | "frame" | "intro" | "leaving";

const GREETING = "Hi! I'm Savera!";

function Welcome() {
  const nav = useNavigate();
  const [stage, setStage] = useState<Stage>("splash");
  const [typed, setTyped] = useState("");

  useEffect(() => {
    const timings: Partial<Record<Stage, [Stage, number]>> = {
      splash: ["rise", 1400],
      rise:   ["begin", 1600],
      begin:  ["reveal", 2000],
      reveal: ["frame", 1200],
      frame:  ["intro", 800],
    };
    if (stage === "leaving") {
      const t = setTimeout(() => nav({ to: "/onboarding/intro" }), 700);
      return () => clearTimeout(t);
    }
    const next = timings[stage];
    if (!next) return;
    const t = setTimeout(() => setStage(next[0]), next[1]);
    return () => clearTimeout(t);
  }, [stage, nav]);

  // Typewriter effect once intro stage is reached
  useEffect(() => {
    if (stage !== "intro" && stage !== "leaving") return;
    if (typed.length >= GREETING.length) return;
    const t = setTimeout(() => setTyped(GREETING.slice(0, typed.length + 1)), 75);
    return () => clearTimeout(t);
  }, [stage, typed]);

  const sunflowerVisible = stage === "splash" || stage === "rise";
  const apartmentOpacity = stage === "splash" ? 0 : 1;
  const logoVisible = stage === "splash" || stage === "rise";
  const logoRaised = stage !== "splash";
  const whiteLogoVisible = stage !== "splash";
  const girlVisible = stage === "reveal" || stage === "frame" || stage === "intro" || stage === "leaving";
  const textFrameVisible = stage === "frame" || stage === "intro" || stage === "leaving";
  const greetingVisible = stage === "intro" || stage === "leaving";

  const showCaret = typed.length < GREETING.length;
  const doneTyping = typed.length >= GREETING.length;

  return (
    <div className="aroha-mobile-screen relative overflow-hidden bg-[#f2e6c8] text-white">
      <img
        src={sunflowerBg.url}
        alt=""
        aria-hidden
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1200ms] ease-in-out ${
          sunflowerVisible ? "opacity-100" : "opacity-0"
        }`}
      />
      <img
        src={apartment.url}
        alt=""
        aria-hidden
        style={{ opacity: apartmentOpacity }}
        className="absolute inset-0 h-full w-full object-cover transition-opacity duration-[1400ms] ease-in-out"
      />
      <img
        src={apartmentGirl.url}
        alt=""
        aria-hidden
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1200ms] ease-in-out ${
          girlVisible ? "opacity-100" : "opacity-0"
        }`}
      />
      <img
        src={apartmentGirlText.url}
        alt=""
        aria-hidden
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[900ms] ease-in-out ${
          textFrameVisible ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Savera logo — brown → white, centered → raised (enlarged) */}
      <div
        aria-hidden={!logoVisible}
        className={`pointer-events-none absolute left-1/2 z-20 -translate-x-1/2 transition-all duration-[1400ms] ease-in-out ${
          logoRaised ? "top-[8svh]" : "top-1/2 -translate-y-1/2"
        } ${logoVisible ? "opacity-100" : "opacity-0"}`}
      >
        <div className="relative h-[320px] w-[410px]">
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

      {/* Overlay content sitting inside the beige box baked into the image.
          The image's box is anchored bottom-center; we overlay text to the right
          of the profile photo and a continue button in the bottom-right. */}
      <div
        className={`absolute inset-x-0 bottom-0 z-30 transition-opacity duration-500 ${
          greetingVisible ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        // Position roughly aligned with the beige box in ApartmentWithGirlAndText.png
        style={{ paddingBottom: "6svh" }}
      >
        <div className="mx-auto w-full max-w-[420px] px-8">
          <div className="relative h-[130px]">
            {/* Greeting to the right of the baked-in profile photo */}
            <p
              className="absolute left-[34%] top-1/2 -translate-y-1/2 pr-4 font-seasons text-[22px] leading-tight text-[#7a4a1d] drop-shadow-none"
            >
              {typed}
              {showCaret && <span className="ml-0.5 animate-pulse">|</span>}
            </p>
            {/* Continue button, bottom-right of the beige box */}
            <button
              onClick={() => setStage("leaving")}
              disabled={!doneTyping}
              className={`absolute bottom-1 right-2 rounded-full bg-[#7a4a1d] px-4 py-1.5 text-[10px] font-bold tracking-[0.2em] text-white shadow-md transition-opacity duration-300 ${
                doneTyping ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
            >
              CONTINUE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
