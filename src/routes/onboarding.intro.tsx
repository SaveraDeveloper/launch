import { createFileRoute, useNavigate } from "@tanstack/react-router";
import aspaceBg from "@/assets/ASpace-4.png.asset.json";
import googleIcon from "@/assets/GoogleIcon.webp.asset.json";

export const Route = createFileRoute("/onboarding/intro")({
  head: () => ({ meta: [{ title: "Welcome — Savera" }] }),
  component: Page,
});

function Page() {
  const nav = useNavigate();

  return (
    <div
      className="relative flex h-svh w-full items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `url(${aspaceBg.url})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Glass card overlay — matches the baked-in card so buttons sit inside it */}
      <div className="relative flex h-[72%] w-[84%] max-w-[360px] flex-col items-center justify-end rounded-[32px] px-6 pb-10 pt-[38%]">
        {/* Buttons placed in the empty lower area of the card, under the text */}
        <div className="flex w-full flex-col gap-3">
          <button
            type="button"
            onClick={() => nav({ to: "/onboarding/basic-info" })}
            className="flex w-full items-center justify-center gap-2.5 rounded-full bg-white py-3.5 text-[15px] font-medium text-[#3c2a1d] shadow-[0_4px_14px_rgba(0,0,0,0.12)] transition active:scale-[0.98]"
          >
            <img
              src={googleIcon.url}
              alt=""
              className="h-[18px] w-[18px]"
            />
            Continue with Google
          </button>

          <button
            type="button"
            onClick={() => nav({ to: "/onboarding/basic-info" })}
            className="w-full rounded-full border border-white/60 bg-white/15 py-3.5 text-[15px] font-medium text-white shadow-[0_4px_14px_rgba(0,0,0,0.12)] backdrop-blur-md transition active:scale-[0.98]"
          >
            Continue with Email
          </button>
        </div>
      </div>
    </div>
  );
}
