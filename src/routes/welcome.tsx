import { createFileRoute, Link } from "@tanstack/react-router";
import friends from "@/assets/friends-9.png.asset.json";

export const Route = createFileRoute("/welcome")({
  head: () => ({ meta: [{ title: "Welcome — Aroha" }] }),
  component: Welcome,
});

function Welcome() {
  return (
    <div className="aroha-mobile-screen relative overflow-hidden bg-aroha-warm text-white">
      <div className="relative z-10 flex min-h-svh flex-col px-7 pt-[18svh]">
        <h1 className="font-seasons text-center text-[28px] font-light leading-[1.3] text-white animate-flicker">
          A space that helps you<br />understand yourself,<br />navigate challenges, and<br />build lasting wellbeing.
        </h1>

        <div className="mt-9 flex flex-col gap-3">
          <Link
            to="/onboarding/intro"
            className="rounded-full bg-white py-4 text-center text-[13px] font-bold tracking-[0.18em] text-[#d63384] shadow-lg shadow-black/20"
          >
            GET STARTED
          </Link>
          <Link
            to="/auth/login"
            className="rounded-full border border-white/80 py-4 text-center text-[13px] font-bold tracking-[0.18em] text-white"
          >
            I ALREADY HAVE AN ACCOUNT
          </Link>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0 flex justify-center">
        <img
          src={friends.url}
          alt=""
          aria-hidden
          className="w-[72%] max-w-[320px] select-none animate-rise translate-y-[1%]"
        />
      </div>
    </div>
  );
}
