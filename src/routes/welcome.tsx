import { createFileRoute, Link } from "@tanstack/react-router";
import people from "@/assets/aroha-3.svg.asset.json";

export const Route = createFileRoute("/welcome")({
  head: () => ({ meta: [{ title: "Welcome — Aroha" }] }),
  component: Welcome,
});

function Welcome() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-aroha-warm text-white">
      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-2xl flex-col px-6 pt-20 pb-[44vh]">
        <div className="mb-10 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 ring-1 ring-white/30 backdrop-blur">
          <span className="font-display text-2xl font-bold">a</span>
        </div>

        <h1 className="font-display text-[40px] font-bold leading-[1.05] tracking-tight animate-flicker">
          A space that helps you understand yourself, navigate challenges, and build lasting wellbeing.
        </h1>

        <div className="mt-10 flex flex-col gap-3">
          <Link
            to="/onboarding/intro"
            className="rounded-2xl bg-white px-5 py-4 text-center font-semibold text-[#3a1278] shadow-lg shadow-black/20 hover:bg-white/90"
          >
            Get Started
          </Link>
          <Link
            to="/auth/login"
            className="rounded-2xl border border-white/40 bg-white/5 px-5 py-4 text-center font-medium text-white backdrop-blur hover:bg-white/10"
          >
            I Already Have An Account
          </Link>
        </div>
      </div>

      {/* People illustration rising from the baseline */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-[44vh] overflow-hidden">
        <img
          src={people.url}
          alt=""
          aria-hidden
          className="absolute inset-x-0 bottom-0 mx-auto w-full max-w-2xl select-none animate-rise"
        />
      </div>
    </div>
  );
}
