import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import apartment from "@/assets/ApartmentWithGirl.png.asset.json";

export const Route = createFileRoute("/welcome")({
  head: () => ({ meta: [{ title: "Savera — A space to unwind" }] }),
  component: Welcome,
});

// Stage 1: apartment only, "Let's Begin" visible.
// Stage 2: Savera fades in (girl becomes visible) + speech bubble at bottom.
// Stage 3: continue to sign-in.
type Stage = "begin" | "reveal" | "leaving";

function Welcome() {
  const nav = useNavigate();
  const [stage, setStage] = useState<Stage>("begin");

  useEffect(() => {
    if (stage === "reveal") {
      const t = setTimeout(() => setStage("leaving"), 2600);
      return () => clearTimeout(t);
    }
    if (stage === "leaving") {
      const t = setTimeout(() => nav({ to: "/onboarding/intro" }), 900);
      return () => clearTimeout(t);
    }
  }, [stage, nav]);

  const saveraVisible = stage !== "begin";

  return (
    <div className="aroha-mobile-screen relative overflow-hidden bg-[#f2e6c8] text-white">
      {/* Apartment background — always visible */}
      <img
        src={apartment.url}
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Cover overlay that hides the girl before Begin, fades away on reveal */}
      <div
        className={`pointer-events-none absolute inset-x-0 bottom-0 h-[62%] transition-opacity duration-[1400ms] ease-in-out ${
          saveraVisible ? "opacity-0" : "opacity-100"
        }`}
        style={{
          background:
            "linear-gradient(to top, rgba(20,10,4,0.92) 30%, rgba(20,10,4,0.55) 60%, rgba(20,10,4,0) 100%)",
        }}
      />

      {/* Speech bubble — bottom, matches provided UX */}
      <div
        className={`pointer-events-none absolute left-1/2 z-30 -translate-x-1/2 transition-all duration-700 ${
          stage === "reveal"
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-3"
        }`}
        style={{ bottom: "22svh" }}
      >
        <div className="relative rounded-3xl bg-[#fdf6e3]/95 px-5 py-3 shadow-xl shadow-black/40 backdrop-blur">
          <p
            className="text-[17px] leading-tight text-[#6b3a12]"
            style={{
              fontFamily:
                "'Chalkboard SE', 'Comic Sans MS', 'Marker Felt', system-ui, sans-serif",
              fontWeight: 600,
            }}
          >
            Hi, I'm Savera 🌻
          </p>
          <span
            aria-hidden
            className="absolute -bottom-2 left-10 h-4 w-4 rotate-45 bg-[#fdf6e3]/95"
          />
        </div>
      </div>

      {/* Bottom "Let's Begin" — only in the initial stage */}
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
