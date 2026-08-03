import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Mic, MicOff, Phone, ArrowLeft } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import saveraCafe from "@/assets/severacafe.png.asset.json";
import { useMicLevel } from "@/components/CafeBits";
import {
  saveraReply,
  newId,
  loadChats,
  saveChats,
  generateTitle,
  type CafeMessage,
  type CafeChat,
} from "@/lib/cafeChats";
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

/** Floating caption that plays one sentence at a time, word by word. */
function Caption({ text }: { text: string }) {
  const sentences = (text.match(/[^.!?…]+[.!?…]*/g) ?? [text])
    .map((s) => s.trim())
    .filter(Boolean);
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    setIdx(0);
  }, [text]);

  useEffect(() => {
    if (idx >= sentences.length - 1) return;
    const words = sentences[idx].split(/\s+/).length;
    const id = window.setTimeout(() => setIdx((i) => i + 1), 900 + words * 320);
    return () => window.clearTimeout(id);
  }, [idx, sentences]);

  const current = sentences[Math.min(idx, sentences.length - 1)] ?? "";
  const words = current.split(/\s+/).filter(Boolean);

  return (
    <p
      key={`${text}-${idx}`}
      className="flex flex-wrap justify-center gap-x-1.5 gap-y-0.5 text-[15px] font-light leading-relaxed text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.7)]"
    >
      {words.map((w, i) => (
        <span key={`${w}-${i}`} className="cafe-word" style={{ animationDelay: `${i * 0.11}s` }}>
          {w}
        </span>
      ))}
    </p>
  );
}

function Page() {
  const nav = useNavigate();
  const { isDark } = useCafeTheme();
  const [muted, setMuted] = useState(false);
  const [caption, setCaption] = useState("");
  const [speaking, setSpeaking] = useState(false);
  const [thinking, setThinking] = useState(false);
  const level = useMicLevel(!muted);
  const historyRef = useRef<CafeMessage[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const busyRef = useRef(false);
  const endedRef = useRef(false);
  /** Bumped whenever the client interrupts — stale replies/audio are discarded. */
  const genRef = useRef(0);

  const stopAudio = useCallback(() => {
    const a = audioRef.current;
    if (a) {
      a.pause();
      a.currentTime = 0;
      a.src = "";
      audioRef.current = null;
    }
    setSpeaking(false);
  }, []);

  /** Barge-in: the client started speaking, so Savera stops instantly. */
  const interrupt = useCallback(() => {
    genRef.current += 1;
    busyRef.current = false;
    setThinking(false);
    stopAudio();
  }, [stopAudio]);

  const speak = useCallback(async (text: string, gen: number) => {
    try {
      const res = await fetch("/api/cafe-tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      if (!res.ok || endedRef.current || gen !== genRef.current) return;
      const blob = await res.blob();
      if (endedRef.current || gen !== genRef.current) return;
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
      if (endedRef.current) return;
      const gen = genRef.current;
      busyRef.current = true;
      setThinking(true);
      historyRef.current = [
        ...historyRef.current,
        { id: newId(), role: "user", text: userText },
      ];
      try {
        const reply = await saveraReply(historyRef.current);
        if (endedRef.current || gen !== genRef.current) return;
        historyRef.current = [
          ...historyRef.current,
          { id: newId(), role: "savera", text: reply },
        ];
        setThinking(false);
        setCaption(reply);
        await speak(reply, gen);
      } finally {
        if (gen === genRef.current) {
          busyRef.current = false;
          setThinking(false);
        }
      }
    },
    [speak],
  );

  /** Save the call transcript into Recent, then leave. */
  const hangUp = useCallback(() => {
    endedRef.current = true;
    stopAudio();

    const spoken = historyRef.current.filter(
      (m) => !m.text.startsWith("(the client has just sat down"),
    );
    if (spoken.length > 0) {
      const chat: CafeChat = {
        id: newId(),
        kind: "voice",
        title: "Voice session",
        pinned: false,
        updatedAt: Date.now(),
        messages: spoken,
      };
      saveChats([chat, ...loadChats()]);
      const first = spoken.find((m) => m.role === "user")?.text ?? spoken[0].text;
      void generateTitle(first).then((title) => {
        saveChats(loadChats().map((c) => (c.id === chat.id ? { ...c, title } : c)));
      });
    }
    nav({ to: "/companion" });
  }, [nav, stopAudio]);

  // Greeting when the call connects.
  useEffect(() => {
    endedRef.current = false;
    void respond("(the client has just sat down for a voice session)");
    return () => {
      endedRef.current = true;
      stopAudio();
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
        onresult: (e: {
          resultIndex: number;
          results: {
            length: number;
            [i: number]: { isFinal: boolean; 0: { transcript: string } };
          };
        }) => void;
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
    // Interim results let us barge in the instant the client starts talking.
    rec.interimResults = true;
    let stopped = false;
    let buffer = "";
    let sendTimer = 0;

    rec.onresult = (e) => {
      let interim = "";
      let final = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const r = e.results[i];
        if (r.isFinal) final += r[0].transcript;
        else interim += r[0].transcript;
      }
      // Any speech at all cuts Savera off immediately.
      if ((interim + final).trim()) interrupt();
      if (!final.trim()) return;
      buffer = `${buffer} ${final}`.trim();
      window.clearTimeout(sendTimer);
      // Wait for a short pause so a whole thought is sent, not one word.
      sendTimer = window.setTimeout(() => {
        const text = buffer.trim();
        buffer = "";
        if (text) void respond(text);
      }, 900);
    };

    rec.onend = () => {
      if (!stopped && !endedRef.current) {
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
      window.clearTimeout(sendTimer);
      try {
        rec.stop();
      } catch {
        /* ignore */
      }
    };
  }, [muted, respond, interrupt]);

  const scale = 1 + (muted ? 0 : level * 0.55);

  return (
    <div className="flex w-full justify-center">
      <div className="relative h-[calc(100svh-6.5rem)] w-full overflow-hidden bg-[#1a120c]">
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          <img src={saveraCafe.url} alt="" aria-hidden className="h-full w-full object-cover" />
          <div className={`absolute inset-0 ${isDark ? "bg-black/65" : "bg-black/45"}`} />
        </div>

        <div className="relative z-10 flex h-full flex-col px-5 pt-5 animate-soft-in">
          <button
            onClick={hangUp}
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
          <div className="mt-5 flex min-h-[84px] items-start justify-center px-3 text-center">
            {thinking ? (
              <TypingDots dark />
            ) : (
              caption && <Caption key={caption} text={caption} />
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
              onClick={hangUp}
              aria-label="End call"
              className="rounded-full bg-[#d13b2c] p-4 text-white shadow-[0_10px_30px_rgba(0,0,0,0.4)]"
            >
              <Phone className="h-5 w-5 rotate-[135deg]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
