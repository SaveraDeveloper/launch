import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import indiaMap from "@/assets/aroha-8.svg.asset.json";

export const Route = createFileRoute("/onboarding/location")({
  head: () => ({ meta: [{ title: "Where do you live? — Aroha" }] }),
  component: Page,
});

const STATES = [
  "Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh","Goa","Gujarat",
  "Haryana","Himachal Pradesh","Jharkhand","Karnataka","Kerala","Madhya Pradesh","Maharashtra",
  "Manipur","Meghalaya","Mizoram","Nagaland","Odisha","Punjab","Rajasthan","Sikkim",
  "Tamil Nadu","Telangana","Tripura","Uttar Pradesh","Uttarakhand","West Bengal",
  "Delhi","Jammu & Kashmir","Ladakh","Puducherry","Chandigarh",
];

function Page() {
  const nav = useNavigate();
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-aroha-warm text-white">
      <div className="relative z-10 flex min-h-screen flex-col px-6 pt-14">
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

        {/* India map (white outline) */}
        <div className="relative mt-2 flex items-start justify-center">
          <img
            src={indiaMap.url}
            alt="Map of India"
            className="w-[82%] select-none"
            style={{ mixBlendMode: "screen", filter: "drop-shadow(0 0 14px rgba(255,255,255,0.25))" }}
          />
        </div>

        {/* Heading overlay */}
        <div className="-mt-8 flex flex-col items-end pr-4">
          <svg width="22" height="28" viewBox="0 0 24 30" fill="none" className="mb-1">
            <path d="M12 0C5.4 0 0 5.4 0 12c0 9 12 18 12 18s12-9 12-18C24 5.4 18.6 0 12 0zm0 16a4 4 0 110-8 4 4 0 010 8z" fill="#fff"/>
          </svg>
          <h1 className="font-seasons text-[36px] leading-[1.05] text-white animate-flicker text-right">
            Where do<br />you live?
          </h1>
        </div>

        {/* White card with State + District */}
        <div className="mx-[-24px] mt-8 flex-1 rounded-t-[40px] bg-white/95 px-6 pt-8 pb-12 text-[#1a0b2e] shadow-xl shadow-black/20">
          <div className="flex flex-col gap-5">
            <div>
              <label className="mb-2 block text-center text-sm font-medium">State</label>
              <select className="aroha-input appearance-none text-center" value={state} onChange={(e) => setState(e.target.value)}>
                <option value="" disabled>Select your state</option>
                {STATES.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="mb-2 block text-center text-sm font-medium">District</label>
              <input className="aroha-input text-center" placeholder="Enter your district" value={district} onChange={(e) => setDistrict(e.target.value)} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
