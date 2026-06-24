import { createFileRoute, Link } from "@tanstack/react-router";
import friends from "@/assets/friends.png.asset.json";

export const Route = createFileRoute("/welcome")({
  head: () => ({ meta: [{ title: "Welcome — Aroha" }] }),
  component: Welcome,
});

function Welcome() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-aroha-warm text-white">
      <div className="relative z-10 flex min-h-screen flex-col px-7 pt-[22vh] pb-[40vh]">
        <h1 className="font-seasons text-center text-[30px] leading-[1.25] text-white animate-flicker">
          A space that helps you<br />understand yourself,<br />navigate challenges, and<br />build lasting wellbeing.
        </h1>

        <div className="mt-10 flex flex-col gap-3">
          <Link
            to="/onboarding/intro"
            className="rounded-full bg-white py-4 text-center font-bold tracking-wider text-[#d63384] shadow-lg shadow-black/20"
          >
            GET STARTED
          </Link>
          <Link
            to="/auth/login"
            className="rounded-full border border-white/80 py-4 text-center font-bold tracking-wider text-white"
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
          className="w-full max-w-md select-none animate-rise"
        />
      </div>
    </div>
  );
}
