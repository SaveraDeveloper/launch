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

  return (
    <div className="aroha-mobile-screen relative overflow-hidden bg-aroha-warm text-white">
      <div className="relative z-10 flex min-h-svh flex-col px-6 pt-11">
        <div className="flex items-center justify-between">
          <Link to="/onboarding/intro" className="text-sm text-white/80">←</Link>
          <button
            type="button"
            onClick={() => nav({ to: "/onboarding/assessment-intro" })}
            className="text-sm font-semibold text-white"
          >
            Next →
          </button>
        </div>

        <div className="relative mt-1 min-h-[48svh]">
          <IndiaZoomMap selectedState={state} className="transition-all duration-700" />

          <div
            className={`absolute right-3 top-12 flex flex-col items-end transition-all duration-700 ${
              state ? "translate-x-10 -translate-y-4 opacity-0" : "translate-x-0 opacity-100"
            }`}
          >
            <svg width="22" height="28" viewBox="0 0 24 30" fill="none" className="mb-1">
              <path d="M12 0C5.4 0 0 5.4 0 12c0 9 12 18 12 18s12-9 12-18C24 5.4 18.6 0 12 0zm0 16a4 4 0 110-8 4 4 0 010 8z" fill="#fff" />
            </svg>
            <h1 className="font-seasons text-right text-[34px] leading-[1.05] text-white animate-flicker">
              Where do<br />you live?
            </h1>
          </div>

          <div
            className={`absolute inset-x-0 bottom-3 text-center transition-all delay-300 duration-700 ${
              state ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
            }`}
          >
            <p className="font-seasons text-[28px] leading-none text-white drop-shadow-[0_0_16px_rgba(255,255,255,.35)]">
              {state}
            </p>
          </div>
        </div>

        <div className="mx-[-24px] mt-auto rounded-t-[40px] bg-white/95 px-6 pt-7 pb-10 text-[#1a0b2e] shadow-xl shadow-black/20 transition-transform duration-700">
          <div className="flex flex-col gap-5">
            <div>
              <label className="mb-2 block text-center text-sm font-medium">State</label>
              <select className="aroha-input appearance-none text-center" value={state} onChange={(e) => chooseState(e.target.value)}>
                <option value="" disabled>Select your state</option>
                {INDIA_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="mb-2 block text-center text-sm font-medium">District</label>
              <select
                className="aroha-input appearance-none text-center disabled:opacity-60"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                disabled={!state || districts.length === 0}
              >
                <option value="">{state ? "Select district (optional)" : "Select state first"}</option>
                {districts.map((d) => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
