import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Mic, MicOff, PhoneOff, ArrowLeft } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import saveraCafe from "@/assets/severacafe.png.asset.json";
import { useMicLevel } from "@/components/CafeBits";
import { saveraReply, newId, type CafeMessage } from "@/lib/cafeChats";
import { useCafeTheme } from "@/lib/cafeTheme";

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
  const { isDark } = useCafeTheme();
  const [muted, setMuted] = useState(false);
  const [caption, setCaption] = useState("");
  const [speaking, setSpeaking] = useState(false);
  const level = useMicLevel(!muted);
  const historyRef = useRef<CafeMessage[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const busyRef = useRef(false);

  const speak = useCallback(async (text: string) => {
    try {
      const res = await fetch("/api/cafe-tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      if (!res.ok) return;
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const audio = new Audio(url);
      audioRef.current = audio;
      setSpeaking(true);
      audio.onended = () => {
        setSpeaking(false);
        URL.revokeObjectURL(url);
      };
      await audio.play().catch(() => setSpeaking(false));
    } catch {
      setSpeaking(false);
    }
  }, []);

  const respond = useCallback(
    async (userText: string) => {
      if (busyRef.current) return;
      busyRef.current = true;
      historyRef.current = [
        ...historyRef.current,
        { id: newId(), role: "user", text: userText },
      ];
      try {
        const reply = await saveraReply(historyRef.current);
        historyRef.current = [
          ...historyRef.current,
          { id: newId(), role: "savera", text: reply },
        ];
        setCaption(reply);
        await speak(reply);
      } finally {
        busyRef.current = false;
      }
    },
    [speak],
  );

  // Greeting when the call connects.
  useEffect(() => {
    void respond("(the client has just sat down for a voice session)");
    return () => {
      audioRef.current?.pause();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Continuous speech recognition while unmuted.
  useEffect(() => {
    if (muted) return;
    const W = window as unknown as {
      SpeechRecognition?: new () => {
        lang: string;
        continuous: boolean;
        interimResults: boolean;
        onresult: (e: { results: { 0: { 0: { transcript: string } } } }) => void;
        onend: () => void;
        start: () => void;
        stop: () => void;
      };
      webkitSpeechRecognition?: typeof W.SpeechRecognition;
    };
    const Ctor = W.SpeechRecognition ?? W.webkitSpeechRecognition;
    if (!Ctor) return;
    const rec = new Ctor();
    rec.lang = "en-IN";
    rec.continuous = true;
    rec.interimResults = false;
    let stopped = false;
    rec.onresult = (e) => {
      const text = e.results[0][0].transcript;
      if (text?.trim()) void respond(text.trim());
    };
    rec.onend = () => {
      if (!stopped) {
        try {
          rec.start();
        } catch {
          /* ignore */
        }
      }
    };
    try {
      rec.start();
    } catch {
      /* ignore */
    }
    return () => {
      stopped = true;
      try {
        rec.stop();
      } catch {
        /* ignore */
      }
    };
  }, [muted, respond]);

  const scale = 1 + (muted ? 0 : level * 0.55);

  return (
    <div className="flex w-full justify-center px-3 pt-3">
      <div
        className={`relative h-[calc(100svh-11rem)] w-full max-w-[400px] overflow-hidden rounded-[30px] border ${
          isDark ? "border-white/10" : "border-white/25"
        } bg-[#1a120c] shadow-[0_24px_70px_rgba(0,0,0,0.55)]`}
      >
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          <img src={saveraCafe.url} alt="" aria-hidden className="h-full w-full object-cover" />
          <div className={`absolute inset-0 ${isDark ? "bg-black/65" : "bg-black/45"}`} />
        </div>

        <div className="relative z-10 flex h-full flex-col px-5 pt-5 animate-soft-in">
          <button
            onClick={() => nav({ to: "/companion" })}
            aria-label="Back to Cafe"
            className="inline-flex w-fit items-center rounded-full border border-white/30 bg-white/15 p-2 text-white backdrop-blur-xl"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>

          <div className="mt-6 text-center">
            <h1 className="font-seasons text-[26px] font-light text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.55)]">
              Savera
            </h1>
          </div>

          {/* Floating captions */}
          <div className="mt-5 min-h-[72px] px-2 text-center">
            {caption && (
              <p
                key={caption}
                className="animate-caption-in rounded-2xl bg-black/35 px-4 py-2 text-[13px] font-light leading-relaxed text-white backdrop-blur-md"
              >
                {caption}
              </p>
            )}
          </div>

          <div className="mt-6 flex justify-center">
            <span
              className="relative flex h-32 w-32 items-center justify-center rounded-full border border-white/35 bg-white/15 backdrop-blur-xl transition-transform duration-100"
              style={{ transform: `scale(${scale})` }}
            >
              {speaking && <span className="absolute inset-0 animate-ping rounded-full bg-white/10" />}
              <span
                className="rounded-full bg-white/25 transition-all duration-100"
                style={{ height: `${64 + level * 34}px`, width: `${64 + level * 34}px` }}
              />
            </span>
          </div>

          <div className="mt-auto flex items-center justify-center gap-6 pb-8">
            <button
              onClick={() => setMuted((m) => !m)}
              aria-label={muted ? "Unmute" : "Mute"}
              className={`rounded-full p-4 transition-all duration-300 ${
                muted
                  ? "border border-white/60 bg-transparent text-white"
                  : "border border-white bg-white text-black"
              }`}
            >
              {muted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
            </button>
            <button
              onClick={() => {
                audioRef.current?.pause();
                nav({ to: "/companion" });
              }}
              aria-label="End call"
              className="rounded-full bg-[#d13b2c] p-4 text-white shadow-[0_10px_30px_rgba(0,0,0,0.4)]"
            >
              <PhoneOff className="h-5 w-5 rotate-[135deg]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
