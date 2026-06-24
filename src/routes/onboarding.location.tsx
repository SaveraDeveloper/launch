import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import indiaMap from "@/assets/aroha-11.svg.asset.json";

export const Route = createFileRoute("/onboarding/location")({
  head: () => ({ meta: [{ title: "Where do you live? — Aroha" }] }),
  component: Page,
});

// Indian states + UTs with rough relative position on a normalized 0–1 map (x from left, y from top).
// Used to compute a zoom transform-origin when a state is selected.
const STATES: { name: string; x: number; y: number }[] = [
  { name: "Andhra Pradesh", x: 0.52, y: 0.74 },
  { name: "Arunachal Pradesh", x: 0.88, y: 0.30 },
  { name: "Assam", x: 0.83, y: 0.35 },
  { name: "Bihar", x: 0.62, y: 0.40 },
  { name: "Chhattisgarh", x: 0.55, y: 0.55 },
  { name: "Goa", x: 0.36, y: 0.72 },
  { name: "Gujarat", x: 0.25, y: 0.50 },
  { name: "Haryana", x: 0.40, y: 0.30 },
  { name: "Himachal Pradesh", x: 0.42, y: 0.20 },
  { name: "Jharkhand", x: 0.62, y: 0.48 },
  { name: "Karnataka", x: 0.42, y: 0.78 },
  { name: "Kerala", x: 0.42, y: 0.90 },
  { name: "Madhya Pradesh", x: 0.45, y: 0.50 },
  { name: "Maharashtra", x: 0.40, y: 0.62 },
  { name: "Manipur", x: 0.88, y: 0.42 },
  { name: "Meghalaya", x: 0.80, y: 0.38 },
  { name: "Mizoram", x: 0.86, y: 0.45 },
  { name: "Nagaland", x: 0.90, y: 0.36 },
  { name: "Odisha", x: 0.60, y: 0.60 },
  { name: "Punjab", x: 0.36, y: 0.22 },
  { name: "Rajasthan", x: 0.30, y: 0.38 },
  { name: "Sikkim", x: 0.72, y: 0.32 },
  { name: "Tamil Nadu", x: 0.48, y: 0.88 },
  { name: "Telangana", x: 0.48, y: 0.68 },
  { name: "Tripura", x: 0.82, y: 0.44 },
  { name: "Uttar Pradesh", x: 0.50, y: 0.36 },
  { name: "Uttarakhand", x: 0.46, y: 0.24 },
  { name: "West Bengal", x: 0.68, y: 0.46 },
  // UTs
  { name: "Andaman & Nicobar Islands", x: 0.82, y: 0.88 },
  { name: "Chandigarh", x: 0.40, y: 0.24 },
  { name: "Dadra & Nagar Haveli and Daman & Diu", x: 0.30, y: 0.58 },
  { name: "Delhi", x: 0.42, y: 0.30 },
  { name: "Jammu & Kashmir", x: 0.35, y: 0.10 },
  { name: "Ladakh", x: 0.45, y: 0.08 },
  { name: "Lakshadweep", x: 0.30, y: 0.92 },
  { name: "Puducherry", x: 0.50, y: 0.86 },
];

const DISTRICTS: Record<string, string[]> = {
  // populated lazily; optional field
};

function Page() {
  const nav = useNavigate();
  const [query, setQuery] = useState("");
  const [state, setState] = useState<string>("");
  const [district, setDistrict] = useState("");

  const matches = useMemo(() => {
    if (!query) return [];
    const q = query.toLowerCase();
    return STATES.filter((s) => s.name.toLowerCase().includes(q)).slice(0, 6);
  }, [query]);

  const target = STATES.find((s) => s.name === state);

  return (
    <div className="relative min-h-screen overflow-hidden bg-aroha-warm text-white">
      <div className="mx-auto flex min-h-screen w-full max-w-2xl flex-col px-6 pt-14 pb-10">
        <div className="flex items-center justify-between">
          <Link to="/onboarding/intro" className="text-sm text-white/70 hover:text-white">← Back</Link>
          <Link to="/onboarding/assessment-intro" className="text-sm font-medium text-white/80 hover:text-white">
            Skip
          </Link>
        </div>

        <h1 className="mt-6 font-display text-[36px] font-bold leading-tight tracking-tight animate-flicker">
          Where do you live?
        </h1>
        <p className="mt-2 text-white/80">
          Aroha is currently designed for India. Pick your state to personalize your space.
        </p>

        {/* Form */}
        <div className="mt-6 flex flex-col gap-4">
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-white/80">
              State <span className="text-rose-300">*</span>
            </span>
            <div className="relative">
              <input
                className="w-full rounded-xl border border-white/20 bg-white/5 px-4 py-3.5 text-white placeholder:text-white/40 outline-none focus:border-white/60 backdrop-blur"
                placeholder="Ex: Uttar Pradesh"
                value={state || query}
                onChange={(e) => { setQuery(e.target.value); setState(""); }}
                required
              />
              {matches.length > 0 && !state && (
                <div className="absolute z-20 mt-1 max-h-64 w-full overflow-y-auto rounded-xl border border-white/20 bg-[#2a1259]/95 backdrop-blur">
                  {matches.map((s) => (
                    <button
                      key={s.name}
                      type="button"
                      onClick={() => { setState(s.name); setQuery(""); }}
                      className="block w-full px-4 py-2.5 text-left text-sm hover:bg-white/10"
                    >
                      {s.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
            {query && matches.length === 0 && !state && (
              <p className="mt-2 text-xs text-rose-200/90">
                We couldn't find that state — Aroha is currently only available in India.
              </p>
            )}
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-white/80">District (optional)</span>
            <input
              className="w-full rounded-xl border border-white/20 bg-white/5 px-4 py-3.5 text-white placeholder:text-white/40 outline-none focus:border-white/60 backdrop-blur"
              placeholder="Ex: dropdown — start typing your district"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              list="districts"
            />
            <datalist id="districts">
              {(DISTRICTS[state] || []).map((d) => <option key={d} value={d} />)}
            </datalist>
          </label>
        </div>

        {/* Map — zooms to selected state */}
        <div className="relative mx-auto mt-8 aspect-square w-full max-w-md overflow-hidden rounded-3xl border border-white/15 bg-white/5 backdrop-blur">
          <div
            className="absolute inset-0 transition-transform duration-[1400ms] ease-[cubic-bezier(.2,.7,.2,1)]"
            style={{
              transform: target ? "scale(3.2)" : "scale(1)",
              transformOrigin: target ? `${target.x * 100}% ${target.y * 100}%` : "50% 50%",
            }}
          >
            <img src={indiaMap.url} alt="Map of India" className="h-full w-full object-contain" />
          </div>
          {target && (
            <div
              className="pointer-events-none absolute h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-rose-300 shadow-[0_0_22px_6px_rgba(252,165,165,0.6)]"
              style={{ left: `${target.x * 100}%`, top: `${target.y * 100}%` }}
            />
          )}
          <div className="pointer-events-none absolute bottom-3 left-0 right-0 text-center text-xs text-white/70">
            {state ? `Zoomed to ${state}` : "Select a state to explore"}
          </div>
        </div>

        <button
          type="button"
          disabled={!state}
          onClick={() => nav({ to: "/onboarding/assessment-intro" })}
          className="mt-8 rounded-2xl bg-white px-5 py-4 text-center font-semibold text-[#3a1278] shadow-lg shadow-black/20 disabled:cursor-not-allowed disabled:opacity-50 hover:bg-white/90"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
