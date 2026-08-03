import { useEffect, useRef, useState } from "react";

/** Live microphone amplitude (0..1). Starts/stops with `active`. */
export function useMicLevel(active: boolean) {
  const [level, setLevel] = useState(0);

  useEffect(() => {
    if (!active) {
      setLevel(0);
      return;
    }
    let raf = 0;
    let ctx: AudioContext | null = null;
    let stream: MediaStream | null = null;
    let cancelled = false;

    navigator.mediaDevices
      ?.getUserMedia({ audio: true })
      .then((s) => {
        if (cancelled) {
          s.getTracks().forEach((t) => t.stop());
          return;
        }
        stream = s;
        ctx = new AudioContext();
        const source = ctx.createMediaStreamSource(s);
        const analyser = ctx.createAnalyser();
        analyser.fftSize = 512;
        source.connect(analyser);
        const data = new Uint8Array(analyser.frequencyBinCount);
        const tick = () => {
          analyser.getByteTimeDomainData(data);
          let sum = 0;
          for (let i = 0; i < data.length; i++) {
            const v = (data[i] - 128) / 128;
            sum += v * v;
          }
          const rms = Math.sqrt(sum / data.length);
          setLevel((p) => p * 0.6 + Math.min(1, rms * 3.4) * 0.4);
          raf = requestAnimationFrame(tick);
        };
        tick();
      })
      .catch(() => setLevel(0));

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      stream?.getTracks().forEach((t) => t.stop());
      ctx?.close().catch(() => {});
    };
  }, [active]);

  return level;
}

export function TypingDots({ dark }: { dark?: boolean }) {
  return (
    <div className="flex items-end gap-1.5 py-2" aria-label="Savera is typing">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className={`cafe-dot h-2 w-2 rounded-full ${dark ? "bg-white/80" : "bg-white/85"}`}
          style={{ animationDelay: `${i * 0.16}s` }}
        />
      ))}
    </div>
  );
}

/** Progressive character reveal with a soft shimmer on each character. */
export function Typewriter({
  text,
  speed = 18,
  onDone,
}: {
  text: string;
  speed?: number;
  onDone?: () => void;
}) {
  const [count, setCount] = useState(0);
  const doneRef = useRef(false);

  useEffect(() => {
    setCount(0);
    doneRef.current = false;
  }, [text]);

  useEffect(() => {
    if (count >= text.length) {
      if (!doneRef.current) {
        doneRef.current = true;
        onDone?.();
      }
      return;
    }
    const id = window.setTimeout(() => setCount((c) => c + 1), speed);
    return () => window.clearTimeout(id);
  }, [count, text, speed, onDone]);

  return (
    <span>
      {text.slice(0, count).split("").map((ch, i) => (
        <span key={i} className="cafe-char">
          {ch}
        </span>
      ))}
    </span>
  );
}

/** Voice-memo style bar visualiser that reacts to mic level. */
export function VoiceBars({ level, active }: { level: number; active: boolean }) {
  const bars = [0.45, 0.8, 1, 0.7, 0.5];
  return (
    <span className="flex h-4 items-center gap-[3px]">
      {bars.map((w, i) => {
        const h = active ? 4 + level * 12 * w + (i % 2 ? 2 : 0) : 4 + w * 4;
        return (
          <span
            key={i}
            className="w-[2.5px] rounded-full bg-current transition-[height] duration-100"
            style={{ height: `${Math.min(16, h)}px` }}
          />
        );
      })}
    </span>
  );
}
