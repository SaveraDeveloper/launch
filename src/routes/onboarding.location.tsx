import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { INDIA_DISTRICTS, INDIA_STATES, IndiaZoomMap } from "@/components/IndiaZoomMap";
import { CoffeeScreen } from "@/components/CoffeeScreen";
import { saveOnboarding, readOnboarding } from "@/lib/userStore";

export const Route = createFileRoute("/onboarding/location")({
  head: () => ({ meta: [{ title: "Where do you live? — Savera" }] }),
  component: Page,
});

function Page() {
  const nav = useNavigate();
  const existing = readOnboarding();
  const [state, setState] = useState(existing.state || "");
  const [district, setDistrict] = useState(existing.district || "");
  const districts = state ? (INDIA_DISTRICTS[state] ?? []) : [];
  const goNext = () => {
    saveOnboarding({ state, district });
    nav({ to: "/onboarding/assessment-intro" });
  };

  return (
    <CoffeeScreen>
      <div className="flex min-h-svh flex-col px-6 pt-11 pb-8">
        <div className="flex items-center justify-between">
          <Link to="/onboarding/intro" className="text-base text-white/90">←</Link>
          <button
            type="button"
            onClick={goNext}
            className="text-sm font-semibold text-white"
          >
            Next →
          </button>
        </div>

        <div className="mt-3">
          <h1 className="font-seasons text-[34px] font-light leading-[1.1] text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.55)]">
            Where do<br />you live?
          </h1>
          <p className="mt-2 max-w-[280px] text-[13px] font-light text-white/90">
            We use this to personalize local resources.
          </p>
        </div>

        <div className="relative mt-2 flex-1">
          <div className="absolute inset-0 z-0 opacity-90">
            <IndiaZoomMap selectedState={state} className="transition-all duration-700" />
          </div>

          <div className="absolute right-0 top-6 z-20 w-[78%] max-w-[300px] rounded-[22px] bg-[#f7ecc9]/95 p-4 text-[#3b2410] shadow-2xl shadow-black/40 backdrop-blur">
            <div className="flex flex-col gap-3">
              <div>
                <label className="mb-1 block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#7a4a1d]/85">Country</label>
                <div className="beige-input !py-2.5 !text-[13px]">India</div>
              </div>
              <div>
                <label className="mb-1 block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#7a4a1d]/85">State</label>
                <select
                  className="beige-input appearance-none !py-2.5 !text-[13px]"
                  value={state}
                  onChange={(e) => { setState(e.target.value); setDistrict(""); }}
                >
                  <option value="" disabled>Select state</option>
                  {INDIA_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="mb-1 block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#7a4a1d]/85">District (optional)</label>
                <select
                  className="beige-input appearance-none !py-2.5 !text-[13px] disabled:opacity-60"
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
