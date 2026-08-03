import { createFileRoute, useNavigate } from "@tanstack/react-router";
import aspaceBg from "@/assets/ASpace-4.png.asset.json";
import googleIcon from "@/assets/GoogleIcon.webp.asset.json";

type Mode = "signup" | "login";

export const Route = createFileRoute("/onboarding/auth")({
  validateSearch: (search: Record<string, unknown>): { mode: Mode } => ({
    mode: search.mode === "login" ? "login" : "signup",
  }),
  head: () => ({
    meta: [
      { title: "Continue — Savera" },
      {
        name: "description",
        content:
          "Sign up or log in to Savera — a space that helps you understand yourself and build lasting well-being.",
      },
    ],
  }),
  component: Page,
});

function Page() {
  const nav = useNavigate();
  const { mode } = Route.useSearch();
  const verb = mode === "login" ? "Continue with" : "Sign up with";

  return (
    <div
      className="relative h-svh w-full overflow-hidden"
      style={{
        backgroundImage: `url(${aspaceBg.url})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-x-0 bottom-[30%] flex justify-center px-8">
        <div className="flex w-full max-w-[285px] flex-col gap-2.5">
          <button
            type="button"
            onClick={() => nav({ to: "/onboarding/basic-info" })}
            className="flex w-full items-center justify-center gap-2.5 rounded-full bg-white py-[13px] text-[14.25px] font-medium text-[#3c2a1d] shadow-[0_4px_14px_rgba(0,0,0,0.18)] transition active:scale-[0.98]"
          >
            <img src={googleIcon.url} alt="" className="h-[17px] w-[17px]" />
            {verb} Google
          </button>

          <button
            type="button"
            onClick={() => nav({ to: "/onboarding/basic-info" })}
            className="w-full rounded-full border border-white/60 bg-white/15 py-[13px] text-[14.25px] font-medium text-white shadow-[0_4px_14px_rgba(0,0,0,0.18)] backdrop-blur-md transition active:scale-[0.98]"
          >
            {verb} Email
          </button>
        </div>
      </div>
    </div>
  );
}
