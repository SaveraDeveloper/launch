import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import apartment from "@/assets/ApartmentWithGirl.png.asset.json";
import sunflowerIcon from "@/assets/SunflowerTransparent.png.asset.json";
import googleIcon from "@/assets/GoogleIcon.webp.asset.json";
import { Mail } from "lucide-react";

export const Route = createFileRoute("/onboarding/intro")({
  head: () => ({ meta: [{ title: "Welcome — Savera" }] }),
  component: Page,
});

function Page() {
  const nav = useNavigate();
  const [googleMsg, setGoogleMsg] = useState<string | null>(null);

  const handleGoogle = async () => {
    // Attempt to use Supabase auth if the integration is wired in.
    try {
      const mod = await import("@/integrations/supabase/client").catch(() => null);
      const client = (mod as { supabase?: { auth?: { signInWithOAuth: (opts: unknown) => Promise<{ error?: { message: string } | null }> } } } | null)?.supabase;
      if (client?.auth?.signInWithOAuth) {
        const { error } = await client.auth.signInWithOAuth({
          provider: "google",
          options: { redirectTo: `${window.location.origin}/onboarding/basic-info` },
        });
        if (error) setGoogleMsg(error.message);
        return;
      }
      setGoogleMsg("Google sign-in isn't configured yet. Continue with Email for now.");
    } catch {
      setGoogleMsg("Google sign-in isn't configured yet. Continue with Email for now.");
    }
  };

  return (
    <div className="aroha-mobile-screen relative overflow-hidden text-white animate-soft-in">
      <img src={apartment.url} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover" />
      <div className="pointer-events-none absolute inset-0 bg-black/25" />

      <div className="relative z-10 flex min-h-svh flex-col px-7 pt-14 pb-10">
        <div className="mx-auto">
          <img
            src={sunflowerIcon.url}
            alt=""
            aria-hidden
            className="h-16 w-16 object-contain drop-shadow-[0_4px_14px_rgba(0,0,0,0.35)]"
          />
        </div>

        <p className="mx-auto mt-6 max-w-[320px] text-center font-seasons text-[22px] font-light leading-[1.35] text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.55)]">
          A space that helps you understand yourself, navigate challenges, and build lasting well-being.
        </p>

        <div className="mt-auto">
          <div className="rounded-[28px] bg-white/12 p-5 backdrop-blur-md border border-white/20 shadow-2xl shadow-black/30">
            <div className="flex flex-col gap-3">
              <button
                type="button"
                onClick={handleGoogle}
                className="flex items-center justify-center gap-3 rounded-full bg-white py-3.5 text-[13px] font-semibold text-[#3b2410] shadow-lg shadow-black/30"
              >
                <img src={googleIcon.url} alt="" aria-hidden className="h-5 w-5" />
                Continue with Google
              </button>
              <button
                type="button"
                onClick={() => nav({ to: "/onboarding/basic-info" })}
                className="flex items-center justify-center gap-3 rounded-full bg-[#7a4a1d] py-3.5 text-[13px] font-semibold text-white shadow-lg shadow-black/30"
              >
                <Mail className="h-5 w-5" />
                Continue with Email
              </button>
              {googleMsg && (
                <p className="mt-1 text-center text-[11px] text-white/85">{googleMsg}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
