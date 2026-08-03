import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Mic, MicOff, PhoneOff, ChevronLeft } from "lucide-react";
import { useState } from "react";
import saveraCafe from "@/assets/severacafe.png.asset.json";

export const Route = createFileRoute("/_app/companion/voice")({
  head: () => ({
    meta: [
      { title: "Voice Chat — Savera" },
      { name: "description", content: "A live, call-style conversation with Savera in the cafe." },
    ],
  }),
  component: Page,
});

function Page() {
  const nav = useNavigate();
  const [muted, setMuted] = useState(false);

  return (
    <div className="relative min-h-svh">
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#1a120c]">
        <img src={saveraCafe.url} alt="" aria-hidden className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-black/45" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-svh w-full max-w-[430px] flex-col px-5 pt-8 animate-soft-in">
        <button
          onClick={() => nav({ to: "/companion" })}
          className="inline-flex w-fit items-center gap-1 rounded-full border border-white/30 bg-white/15 px-3 py-1.5 text-[12px] text-white backdrop-blur-xl"
        >
          <ChevronLeft className="h-4 w-4" /> Cafe
        </button>

        <div className="mt-10 text-center">
          <h1 className="font-seasons text-[28px] font-light text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.55)]">
            Savera
          </h1>
          <p className="mt-1 text-[12.5px] font-light text-white/75">Listening softly…</p>
        </div>

        <div className="mt-12 flex justify-center">
          <span className="relative flex h-32 w-32 items-center justify-center rounded-full border border-white/35 bg-white/15 backdrop-blur-xl">
            <span className="absolute inset-0 animate-ping rounded-full bg-white/10" />
            <span className="h-16 w-16 rounded-full bg-white/25" />
          </span>
        </div>

        <div className="mt-auto flex items-center justify-center gap-6 pb-32">
          <button
            onClick={() => setMuted((m) => !m)}
            aria-label={muted ? "Unmute" : "Mute"}
            className="rounded-full border border-white/35 bg-white/20 p-4 text-white backdrop-blur-xl"
          >
            {muted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
          </button>
          <button
            onClick={() => nav({ to: "/companion" })}
            aria-label="End call"
            className="rounded-full bg-[#a33a2b] p-4 text-white shadow-[0_10px_30px_rgba(0,0,0,0.4)]"
          >
            <PhoneOff className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
