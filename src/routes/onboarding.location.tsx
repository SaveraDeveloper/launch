import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { INDIA_STATES, IndiaZoomMap } from "@/components/IndiaZoomMap";
import { CoffeeScreen } from "@/components/CoffeeScreen";
import { saveOnboarding, readOnboarding } from "@/lib/userStore";

export const Route = createFileRoute("/onboarding/location")({
  head: () => ({ meta: [{ title: "Where do you live? — Savera" }] }),
  component: Page,
});

function Page() {
  const nav = useNavigate();
  const existing = readOnboarding();
  // Default to Delhi (per UX). Users can change via dropdown.
  const [state, setState] = useState(existing.state || "Delhi");
  const goNext = () => {
    saveOnboarding({ state });
    nav({ to: "/onboarding/assessment-intro" });
  };

  return (
    <CoffeeScreen hideGirl>
      <div className="flex min-h-svh flex-col px-6 pt-11 pb-8">
        <div className="flex items-center justify-between">
          <Link to="/onboarding/basic-info" className="text-base text-white/90">←</Link>
          <button type="button" onClick={goNext} className="text-sm font-semibold text-white">
            Next →
          </button>
        </div>

        <div className="mt-3 text-center">
          <h1 className="font-seasons text-[32px] font-light leading-[1.1] text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.55)]">
            Where do<br />you live?
          </h1>
          <p className="mx-auto mt-2 max-w-[280px] text-[13px] font-light text-white/90">
            We use this to personalize local resources.
          </p>
        </div>

        {/* Map fills the middle */}
        <div className="relative mt-3 flex-1">
          <div className="absolute inset-0 z-0 opacity-95">
            <IndiaZoomMap selectedState={state} pinColor="#e63946" className="transition-all duration-700" />
          </div>

          {/* State selector pinned to bottom-right */}
          <div className="absolute bottom-3 right-0 z-20 w-[70%] max-w-[260px] rounded-[20px] bg-[#f7ecc9]/95 p-3.5 text-[#3b2410] shadow-2xl shadow-black/40 backdrop-blur">
            <label className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.14em] text-[#7a4a1d]/85">State</label>
            <select
              className="beige-input appearance-none !py-2 !text-[13px]"
              value={state}
              onChange={(e) => setState(e.target.value)}
            >
              {INDIA_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>

        <button
          type="button"
          onClick={goNext}
          className="relative z-30 mt-6 rounded-full bg-white py-3.5 text-[13px] font-bold tracking-[0.22em] text-[#7a4a1d] shadow-lg shadow-black/40"
        >
          NEXT
        </button>
      </div>
    </CoffeeScreen>
  );
}
