import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import sunflowerBg from "@/assets/Sunflower_bckgd.png.asset.json";
import apartment from "@/assets/ApartmentWithGirl.png.asset.json";
import apartmentText from "@/assets/ApartmentWithGirlAndText.png.asset.json";
import brownLogo from "@/assets/SaveraBROWN.png.asset.json";
import whiteLogo from "@/assets/SaveraWHITE.png.asset.json";

export const Route = createFileRoute("/welcome")({
  head: () => ({ meta: [{ title: "Savera — A space to unwind" }] }),
  component: Welcome,
});

// Splash → Apartment intro → Continue to sign-in
type Stage =
  | "splash"          // sunflower bg, brown logo centered
  | "rise"            // logo moves up, brown→white, bg fades to apartment
  | "begin"           // apartment (no girl overlay text), show "Let's Begin"
  | "apartmentGirl"   // apartment with girl (no bubble)
  | "apartmentBubble" // apartment with girl + speech bubble (2s read)
  | "apartmentBack";  // back to apartment-with-girl briefly, then leave

function Welcome() {
  const nav = useNavigate();
  const [stage, setStage] = useState<Stage>("splash");

  // Automatic scripted transitions.
  useEffect(() => {
    if (stage === "splash") {
      const t = setTimeout(() => setStage("rise"), 1600);
      return () => clearTimeout(t);
    }
    if (stage === "rise") {
      const t = setTimeout(() => setStage("begin"), 1800);
      return () => clearTimeout(t);
    }
    if (stage === "apartmentGirl") {
      const t = setTimeout(() => setStage("apartmentBubble"), 700);
      return () => clearTimeout(t);
    }
    if (stage === "apartmentBubble") {
      const t = setTimeout(() => setStage("apartmentBack"), 2200);
      return () => clearTimeout(t);
    }
    if (stage === "apartmentBack") {
      const t = setTimeout(() => nav({ to: "/onboarding/intro" }), 1100);
      return () => clearTimeout(t);
    }
  }, [stage, nav]);

  const showSunflower = stage === "splash";
  const showApartment = stage !== "splash";
  // Show the girl overlay whenever we're in the apartment "with girl" moments.
  const showGirl =
    stage === "apartmentGirl" ||
    stage === "apartmentBubble" ||
    stage === "apartmentBack";
  const showBubble = stage === "apartmentBubble";
  const logoUp = stage !== "splash";

  return (
    <div className="aroha-mobile-screen relative overflow-hidden bg-[#f2e6c8] text-white">
      {/* Cross-fading backgrounds */}
      <img
        src={sunflowerBg.url}
        alt=""
        aria-hidden
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1600ms] ease-in-out ${
          showSunflower ? "opacity-100" : "opacity-0"
        }`}
      />
      <img
        src={apartment.url}
        alt=""
        aria-hidden
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1600ms] ease-in-out ${
          showApartment ? "opacity-100" : "opacity-0"
        }`}
      />
      {/* Girl-only overlay uses the same image; simulate presence by showing
          the "with text" image whose girl matches, then bubble. */}
      <img
        src={apartment.url}
        alt=""
        aria-hidden
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[900ms] ease-in-out ${
          showGirl && !showBubble ? "opacity-100" : "opacity-0"
        }`}
      />
      <img
        src={apartmentText.url}
        alt=""
        aria-hidden
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[900ms] ease-in-out ${
          showBubble ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Speech bubble text — soft, rounded, warm brown */}
      <div
        className={`pointer-events-none absolute left-1/2 top-[36%] z-30 -translate-x-1/2 transition-opacity duration-500 ${
          showBubble ? "opacity-100" : "opacity-0"
        }`}
      >
        <p
          className="text-[18px] leading-tight text-[#6b3a12]"
          style={{
            fontFamily:
              "'Chalkboard SE', 'Comic Sans MS', 'Marker Felt', system-ui, sans-serif",
            fontWeight: 600,
          }}
        >
          Hi, I'm Savera 🌻
        </p>
      </div>

      {/* Logos — center (brown) → top (white), crossfading during "rise" */}
      <img
        src={brownLogo.url}
        alt="Savera"
        className={`pointer-events-none absolute left-1/2 z-20 -translate-x-1/2 select-none transition-all duration-[1800ms] ease-in-out ${
          logoUp
            ? "top-[5svh] w-[46%] opacity-0"
            : "top-1/2 w-[62%] -translate-y-1/2 opacity-100"
        }`}
      />
      <img
        src={whiteLogo.url}
        alt=""
        aria-hidden
        className={`pointer-events-none absolute left-1/2 z-20 -translate-x-1/2 select-none drop-shadow-[0_4px_18px_rgba(0,0,0,0.35)] transition-all duration-[1800ms] ease-in-out ${
          logoUp
            ? "top-[5svh] w-[46%] opacity-100"
            : "top-1/2 w-[62%] -translate-y-1/2 opacity-0"
        }`}
      />

      {/* Bottom "Let's Begin" — appears at "begin" stage */}
      <div className="relative z-10 flex min-h-svh flex-col justify-end px-8 pb-14">
        <div
          className={`transition-opacity duration-700 ${
            stage === "begin" ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <button
            onClick={() => setStage("apartmentGirl")}
            className="w-full rounded-full bg-white py-4 text-[13px] font-bold tracking-[0.22em] text-[#7a4a1d] shadow-xl shadow-black/40"
          >
            LET'S BEGIN
          </button>
        </div>
      </div>
    </div>
  );
}
