import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { CoffeeScreen } from "@/components/CoffeeScreen";
import sunflower from "@/assets/SunflowerTransparent.png.asset.json";
import { firstName } from "@/lib/userStore";

export const Route = createFileRoute("/onboarding/ready")({
  head: () => ({ meta: [{ title: "Welcome — Savera" }] }),
  component: Page,
});

function Page() {
  const nav = useNavigate();
  const [name, setName] = useState("friend");
  const [leaving, setLeaving] = useState(false);
  useEffect(() => {
    setName(firstName());
  }, []);

  const start = () => {
    if (leaving) return;
    setLeaving(true);
    setTimeout(() => nav({ to: "/home" }), 850);
  };

  return (
    <CoffeeScreen hideGirl>
      <div className={`flex min-h-svh flex-col items-center justify-center px-6 transition-all duration-700 ease-out ${leaving ? "scale-105 opacity-0" : "animate-soft-in opacity-100"}`}>
        <div className="w-full max-w-[340px] rounded-[32px] border border-white/40 bg-white/12 p-8 text-center shadow-2xl shadow-black/40 backdrop-blur-xl">
          <div className="mx-auto mb-4 h-16 w-16">
            <img src={sunflower.url} alt="" aria-hidden className="h-full w-full object-contain drop-shadow-[0_4px_14px_rgba(0,0,0,0.35)]" />
          </div>
          <h1 className="font-seasons text-[32px] font-light leading-[1.1] text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.55)]">
            Welcome, {name}.
          </h1>
          <p className="mx-auto mt-4 max-w-[280px] text-[14px] font-light leading-6 text-white/90">
            We've created a space designed for you.
          </p>

          <button
            onClick={start}
            className="mt-7 w-full rounded-full bg-white py-3.5 text-[12px] font-bold tracking-[0.22em] text-[#7a4a1d] shadow-lg shadow-black/40"
          >
            START MY JOURNEY
          </button>
        </div>
      </div>
      {/* Opening transition veil */}
      <div
        className={`pointer-events-none absolute inset-0 z-30 bg-white transition-opacity duration-700 ease-out ${leaving ? "opacity-70" : "opacity-0"}`}
      />
    </CoffeeScreen>
  );
}
