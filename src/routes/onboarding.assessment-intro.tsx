import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import girl from "@/assets/aroha-10.svg.asset.json";

export const Route = createFileRoute("/onboarding/assessment-intro")({
  head: () => ({ meta: [{ title: "Your Personalized Assessment — Aroha" }] }),
  component: Page,
});

function Page() {
  const nav = useNavigate();
  return (
    <div className="aroha-mobile-screen relative overflow-hidden bg-aroha-cool text-white">
      <div className="relative z-10 flex min-h-svh flex-col px-6 pt-11 pb-[44svh]">
        <div className="flex items-center justify-between">
          <Link to="/onboarding/location" className="text-sm text-white/85">←</Link>
          <button onClick={() => nav({ to: "/onboarding/gender" })} className="text-sm font-semibold text-white">Next →</button>
        </div>

        <h1 className="mt-10 text-center font-seasons text-[40px] leading-[1.05] animate-flicker">
          Your Personalized<br />Assessment
        </h1>
        <p className="mt-5 text-center text-[15px] text-white/90">
          A few thoughtful questions to help us<br />understand you better. About 5 minutes.
        </p>

        <div className="mt-12 flex flex-col items-center gap-3">
          <Link
            to="/onboarding/gender"
            className="w-full rounded-full bg-white py-4 text-center font-bold tracking-wider text-[#2a2880] shadow-lg shadow-black/30"
          >
            START ASSESMENT
          </Link>
          <Link
            to="/onboarding/gender"
            className="w-2/3 rounded-full border border-white/80 py-2.5 text-center text-sm font-bold tracking-wider text-white"
          >
            SKIP FOR NOW
          </Link>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0 flex justify-center">
        <img src={girl.url} alt="" aria-hidden className="w-[78%] max-w-sm animate-rise" />
      </div>
    </div>
  );
}
