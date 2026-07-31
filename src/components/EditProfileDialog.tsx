import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Camera, X } from "lucide-react";

export function EditProfileDialog({
  open,
  onClose,
  name,
  bio,
  avatar,
  onSave,
}: {
  open: boolean;
  onClose: () => void;
  name: string;
  bio: string;
  avatar: string | null;
  onSave: (v: { name: string; bio: string; avatar: string | null }) => void;
}) {
  const [n, setN] = useState(name);
  const [b, setB] = useState(bio);
  const [a, setA] = useState<string | null>(avatar);
  const fileRef = useRef<HTMLInputElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  useEffect(() => {
    if (open) {
      setN(name);
      setB(bio);
      setA(avatar);
    }
  }, [open, name, bio, avatar]);

  if (!mounted || !open) return null;

  function onPick(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setA(String(reader.result));
    reader.readAsDataURL(file);
  }

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-5">
      <button
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 bg-[#3b2417]/60 backdrop-blur-sm"
      />
      <div className="relative w-full max-w-[360px] rounded-[30px] border border-white/50 bg-[linear-gradient(160deg,rgba(255,247,240,0.94),rgba(246,222,205,0.9))] p-6 text-[#4a2f1d] shadow-[0_24px_70px_rgba(0,0,0,0.45)]">
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 rounded-full bg-[#4a2f1d]/10 p-1.5 text-[#4a2f1d]/70 hover:bg-[#4a2f1d]/15"
        >
          <X className="h-4 w-4" />
        </button>

        <h2 className="font-seasons text-[22px] leading-tight">Your profile</h2>

        <div className="mt-5 flex flex-col items-center">
          <div className="relative">
            <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border border-white/70 bg-white/70 font-seasons text-[34px] text-[#4a2f1d] shadow-[0_10px_24px_rgba(74,47,29,0.25)]">
              {a ? (
                <img src={a} alt="Your profile" className="h-full w-full object-cover" />
              ) : (
                (n[0] || "S").toUpperCase()
              )}
            </div>
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              aria-label="Change profile photo"
              className="absolute -bottom-1 -right-1 flex h-9 w-9 items-center justify-center rounded-full border border-white/70 bg-[#e9b48a] text-[#4a2f1d] shadow-[0_6px_16px_rgba(74,47,29,0.35)]"
            >
              <Camera className="h-4 w-4" />
            </button>
          </div>
          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={onPick} />
        </div>

        <label className="mt-6 block text-[11px] font-semibold uppercase tracking-[0.18em] text-[#4a2f1d]/60">
          Name
        </label>
        <input
          value={n}
          onChange={(e) => setN(e.target.value)}
          placeholder="Your name"
          className="mt-1.5 w-full rounded-2xl border border-white/70 bg-white/70 px-4 py-3 text-[14px] outline-none placeholder:text-[#4a2f1d]/40 focus:border-[#e9b48a]"
        />

        <label className="mt-4 block text-[11px] font-semibold uppercase tracking-[0.18em] text-[#4a2f1d]/60">
          Bio
        </label>
        <textarea
          value={b}
          onChange={(e) => setB(e.target.value)}
          rows={4}
          placeholder="A few words about you…"
          className="mt-1.5 w-full resize-none rounded-2xl border border-white/70 bg-white/70 px-4 py-3 text-[14px] leading-snug outline-none placeholder:text-[#4a2f1d]/40 focus:border-[#e9b48a]"
        />

        <div className="mt-6 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 rounded-full border border-[#4a2f1d]/20 bg-white/50 py-3 text-[13px] font-light"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave({ name: n.trim(), bio: b.trim(), avatar: a })}
            className="flex-1 rounded-full bg-[#4a2f1d] py-3 text-[13px] font-semibold text-[#fdf3ea]"
          >
            Save
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
