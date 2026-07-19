import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { CoffeeScreen } from "@/components/CoffeeScreen";

export const Route = createFileRoute("/onboarding/intro")({
  head: () => ({ meta: [{ title: "Welcome — Savera" }] }),
  component: Page,
});

function Page() {
  const nav = useNavigate();

  return (
    <CoffeeScreen hideGirl>
      <div className="flex min-h-svh flex-col px-5 pt-10 pb-10 animate-soft-in">
        <button
          type="button"
          onClick={() => nav({ to: "/onboarding/basic-info" })}
          className="relative flex flex-1 w-full flex-col overflow-hidden rounded-[36px] border border-white/70 bg-white/10 px-7 pt-12 pb-8 text-left shadow-[0_20px_60px_-15px_rgba(0,0,0,0.55)] backdrop-blur-2xl transition active:scale-[0.99]"
        >
          {/* Tagline */}
          <p className="text-center font-seasons text-[26px] font-light leading-[1.25] text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.55)]">
            A space that helps you understand yourself, navigate challenges, and build lasting well-being. <span aria-hidden>🌻</span>
          </p>

          {/* Bottom decorative divider with sunflower */}
          <div className="mt-auto flex items-center justify-center gap-3 pt-6">
            <span className="h-px flex-1 bg-white/60" />
            <span aria-hidden className="text-[22px] leading-none">🌻</span>
            <span className="h-px flex-1 bg-white/60" />
          </div>
        </button>
      </div>
    </CoffeeScreen>
  );
}
