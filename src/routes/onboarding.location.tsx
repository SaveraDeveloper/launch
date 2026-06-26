import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { INDIA_DISTRICTS, INDIA_STATES, IndiaZoomMap } from "@/components/IndiaZoomMap";

export const Route = createFileRoute("/onboarding/location")({
  head: () => ({ meta: [{ title: "Where do you live? — Aroha" }] }),
  component: Page,
});

function Page() {
  const nav = useNavigate();
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const districts = state ? (INDIA_DISTRICTS[state] ?? []) : [];

  const chooseState = (value: string) => {
    setState(value);
    setDistrict("");
  };

  const goNext = () => nav({ to: "/onboarding/assessment-intro" });

  return (
    <div className="aroha-mobile-screen relative overflow-hidden bg-aroha-warm text-white">
      <div className="relative z-10 flex min-h-svh flex-col px-6 pt-11 pb-8">
        {/* top bar */}
        <div className="flex items-center justify-between">
          <Link to="/onboarding/intro" className="text-base text-white/85">←</Link>
          <span />
        </div>

        {/* heading */}
        <div className="mt-2 text-left">
          <h1 className="font-seasons text-[34px] font-light leading-[1.1] text-white animate-flicker">
            Where do<br />you live?
          </h1>
          <p className="mt-2 max-w-[260px] text-[13px] font-light text-white/80">
            We use this to personalize local resources.
          </p>
        </div>

        {/* map area */}
        <div className="relative mt-2 flex-1">
          <div className="absolute inset-0 z-0">
            <IndiaZoomMap selectedState={state} className="transition-all duration-700" />
          </div>

          {/* Bottom-right selection card, always above map */}
          <div className="absolute bottom-0 right-0 z-20 w-[78%] max-w-[300px] rounded-[22px] bg-white/95 p-4 text-[#1a0b2e] shadow-2xl shadow-black/30 backdrop-blur">
            <div className="flex flex-col gap-3">
              <div>
                <label className="mb-1 block text-[11px] font-medium uppercase tracking-[0.14em] text-[#1a0b2e]/55">State</label>
                <select
                  className="aroha-input appearance-none !py-2.5 !text-[13px]"
                  value={state}
                  onChange={(e) => chooseState(e.target.value)}
                >
                  <option value="" disabled>Select state</option>
                  {INDIA_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="mb-1 block text-[11px] font-medium uppercase tracking-[0.14em] text-[#1a0b2e]/55">District</label>
                <select
                  className="aroha-input appearance-none !py-2.5 !text-[13px] disabled:opacity-60"
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  disabled={!state || districts.length === 0}
                >
                  <option value="">{state ? "Select (optional)" : "Pick state first"}</option>
                  {districts.map((d) => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Next button below */}
        <button
          type="button"
          onClick={goNext}
          className="relative z-30 mt-6 rounded-full bg-white py-3.5 text-[13px] font-bold tracking-[0.18em] text-[#d63384] shadow-lg shadow-black/20"
        >
          NEXT
        </button>
      </div>
    </div>
  );
}
