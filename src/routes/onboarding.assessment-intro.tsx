import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { CoffeeScreen } from "@/components/CoffeeScreen";

export const Route = createFileRoute("/onboarding/assessment-intro")({
  head: () => ({ meta: [{ title: "Your Personalized Assessment — Savera" }] }),
  component: Page,
});

function Page() {
  const nav = useNavigate();
  return (
    <CoffeeScreen>
      <div className="flex min-h-svh flex-col px-6 pt-11 pb-10">
        <div className="flex items-center justify-between">
          <Link to="/onboarding/location" className="text-sm text-white/90">←</Link>
          <button
            type="button"
            onClick={() => nav({ to: "/onboarding/ready" })}
            className="text-[12px] font-light text-white/80 underline underline-offset-4 decoration-white/40"
          >
            Skip for now
          </button>
        </div>

        <div className="mt-10 text-center">
          <h1 className="font-seasons text-[34px] font-light leading-[1.1] text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.55)]">
            Your Personalized<br />Assessment
          </h1>
          <p className="mx-auto mt-4 max-w-[300px] text-[14px] font-light leading-6 text-white/90">
            A few thoughtful questions to help us understand you better. About 5 minutes.
          </p>
        </div>

        <div className="mt-auto">
          <button
            onClick={() => nav({ to: "/onboarding/gender" })}
            className="w-full rounded-full bg-white py-4 text-[13px] font-bold tracking-[0.22em] text-[#7a4a1d] shadow-xl shadow-black/40"
          >
            BEGIN
          </button>
        </div>
      </div>
    </CoffeeScreen>
  );
}
