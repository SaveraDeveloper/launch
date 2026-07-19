import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { CoffeeScreen } from "@/components/CoffeeScreen";

export const Route = createFileRoute("/onboarding/assessment-intro")({
  head: () => ({ meta: [{ title: "Your Personalized Assessment — Savera" }] }),
  component: Page,
});

function Page() {
  const nav = useNavigate();
  return (
    <CoffeeScreen hideGirl blurBg>
      <div className="flex min-h-svh flex-col px-6 pt-11 pb-10">
        <div className="flex items-center justify-between">
          <Link to="/onboarding/location" className="text-sm text-white/90">←</Link>
          <span className="text-sm text-white/40">Step 4 of 5</span>
        </div>

        {/* Centered glass card */}
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-[340px] rounded-[32px] border border-white/40 bg-white/12 p-8 text-center shadow-2xl shadow-black/40 backdrop-blur-xl">
            <h1 className="font-seasons text-[30px] font-light leading-[1.1] text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.55)]">
              Your Personalized<br />Assessment
            </h1>
            <p className="mx-auto mt-4 max-w-[260px] text-[14px] font-light leading-6 text-white/90">
              A few thoughtful questions help us understand you better.
            </p>
            <p className="mt-3 text-[12px] font-light uppercase tracking-[0.24em] text-white/70">
              About 5 minutes
            </p>

            <button
              onClick={() => nav({ to: "/onboarding/gender" })}
              className="mt-7 w-full rounded-full bg-white py-3.5 text-[12px] font-bold tracking-[0.22em] text-[#7a4a1d] shadow-lg shadow-black/40"
            >
              BEGIN ASSESSMENT
            </button>
          </div>
        </div>
      </div>
    </CoffeeScreen>
  );
}
