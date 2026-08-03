import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  SquarePen,
  Phone,
  Plus,
  ArrowUp,
  ChevronDown,
  MessageCircle,
  AudioLines,
  Image as ImageIcon,
  Paperclip,
  X,
  MoreVertical,
  Pin,
  Pencil,
  Trash2,
  Moon,
  Sun,
  Mic,
  Square,
} from "lucide-react";
import emptyCafe from "@/assets/emptycafe.png.asset.json";
import saveraCafe from "@/assets/severacafe.png.asset.json";
import {
  loadChats,
  saveChats,
  generateTitle,
  saveraReply,
  newId,
  type CafeChat,
  type CafeMessage,
} from "@/lib/cafeChats";
import { useCafeTheme } from "@/lib/cafeTheme";
import { TypingDots, Typewriter, VoiceBars, useMicLevel } from "@/components/CafeBits";

export const Route = createFileRoute("/_app/companion/")({
  head: () => ({
    meta: [
      { title: "Cafe — Savera" },
      {
        name: "description",
        content: "Sit down with Savera in the cafe for a warm, unhurried conversation.",
      },
    ],
  }),
  component: Page,
});

type SpeechRec = {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  onresult: (e: { resultIndex: number; results: { length: number; [i: number]: { 0: { transcript: string } } } }) => void;
  onend: () => void;
  start: () => void;
  stop: () => void;
};

const PROMPTS = ["I'm overwhelmed today", "Help me reframe a thought", "Reflect on this week"];

function Page() {
  const nav = useNavigate();
  const { isDark, toggle } = useCafeTheme();
  const [chats, setChats] = useState<CafeChat[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [draft, setDraft] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [plusOpen, setPlusOpen] = useState(false);
  const [spinKey, setSpinKey] = useState(0);
  const [attachments, setAttachments] = useState<string[]>([]);
  const [pinnedOpen, setPinnedOpen] = useState(true);
  const [recentOpen, setRecentOpen] = useState(true);
  const [thinking, setThinking] = useState(false);
  const [typingId, setTypingId] = useState<string | null>(null);
  const [listening, setListening] = useState(false);
  const micLevel = useMicLevel(listening);

  const photoRef = useRef<HTMLInputElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const plusWrapRef = useRef<HTMLDivElement>(null);
  const chatsRef = useRef<CafeChat[]>([]);
  const recRef = useRef<SpeechRec | null>(null);

  useEffect(() => setChats(loadChats()), []);
  useEffect(() => {
    chatsRef.current = chats;
  }, [chats]);
  useEffect(() => {
    inputRef.current?.focus({ preventScroll: true });
  }, [activeId]);
  useEffect(() => {
    const el = endRef.current?.parentElement;
    if (el) el.scrollTop = el.scrollHeight;
  }, [chats, activeId, thinking]);

  // Dismiss the "+" menu on any outside tap.
  useEffect(() => {
    if (!plusOpen) return;
    const onDown = (e: PointerEvent) => {
      if (!plusWrapRef.current?.contains(e.target as Node)) setPlusOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [plusOpen]);

  const active = useMemo(() => chats.find((c) => c.id === activeId) ?? null, [chats, activeId]);

  const persist = (next: CafeChat[]) => {
    chatsRef.current = next;
    setChats(next);
    saveChats(next);
  };

  const patch = (id: string, fn: (c: CafeChat) => CafeChat) =>
    persist(chatsRef.current.map((c) => (c.id === id ? fn(c) : c)));

  async function send(text: string) {
    const body = text.trim();
    if ((!body && attachments.length === 0) || thinking) return;
    const msg: CafeMessage = { id: newId(), role: "user", text: body };
    setDraft("");
    setAttachments([]);

    let chatId = activeId;
    if (chatId) {
      patch(chatId, (c) => ({ ...c, messages: [...c.messages, msg], updatedAt: Date.now() }));
    } else {
      const chat: CafeChat = {
        id: newId(),
        kind: "text",
        title: "New session",
        pinned: false,
        updatedAt: Date.now(),
        messages: [msg],
      };
      chatId = chat.id;
      persist([chat, ...chatsRef.current]);
      setActiveId(chat.id);
      void generateTitle(body).then((title) => patch(chat.id, (c) => ({ ...c, title })));
    }

    setThinking(true);
    try {
      const history = chatsRef.current.find((c) => c.id === chatId)?.messages ?? [msg];
      const reply = await saveraReply(history);
      const rid = newId();
      patch(chatId, (c) => ({
        ...c,
        messages: [...c.messages, { id: rid, role: "savera", text: reply }],
        updatedAt: Date.now(),
      }));
      setTypingId(rid);
    } catch {
      const rid = newId();
      patch(chatId, (c) => ({
        ...c,
        messages: [
          ...c.messages,
          { id: rid, role: "savera", text: "I lost my train of thought there. Could you say that again?" },
        ],
        updatedAt: Date.now(),
      }));
      setTypingId(rid);
    } finally {
      setThinking(false);
    }
  }

  function newChat() {
    setActiveId(null);
    setDraft("");
    setMenuOpen(false);
    inputRef.current?.focus({ preventScroll: true });
  }

  function onPaste(e: React.ClipboardEvent) {
    const item = Array.from(e.clipboardData.items).find((i) => i.type.startsWith("image/"));
    const file = item?.getAsFile();
    if (!file) return;
    e.preventDefault();
    const reader = new FileReader();
    reader.onload = () => setAttachments((a) => [...a, String(reader.result)]);
    reader.readAsDataURL(file);
  }

  function onPickPhoto(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    setPlusOpen(false);
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setAttachments((a) => [...a, String(reader.result)]);
    reader.readAsDataURL(file);
    e.target.value = "";
  }

  function onPickFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    setPlusOpen(false);
    if (file) setDraft((d) => `${d}${d ? " " : ""}[${file.name}]`);
    e.target.value = "";
  }

  function dictate() {
    if (listening) {
      recRef.current?.stop();
      recRef.current = null;
      setListening(false);
      return;
    }
    const W = window as unknown as {
      SpeechRecognition?: new () => SpeechRec;
      webkitSpeechRecognition?: new () => SpeechRec;
    };
    const Ctor = W.SpeechRecognition ?? W.webkitSpeechRecognition;
    if (!Ctor) {
      setListening((v) => !v);
      return;
    }
    const rec = new Ctor();
    rec.lang = "en-IN";
    rec.continuous = true;
    rec.interimResults = false;
    rec.onresult = (e) => {
      let text = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        text += e.results[i][0].transcript;
      }
      const t = text.trim();
      if (t) setDraft((d) => `${d}${d ? " " : ""}${t}`);
    };
    // Keep listening until the user taps stop.
    rec.onend = () => {
      if (recRef.current === rec) {
        try {
          rec.start();
        } catch {
          /* ignore */
        }
      }
    };
    recRef.current = rec;
    setListening(true);
    try {
      rec.start();
    } catch {
      /* ignore */
    }
  }

  const started = !!active;
  const pinned = chats.filter((c) => c.pinned);
  const recent = chats.filter((c) => !c.pinned).sort((a, b) => b.updatedAt - a.updatedAt);

  const frameText = isDark ? "text-white" : "text-white";

  return (
    <div className="flex w-full justify-center px-3 pt-3">
      <div
        className={`relative h-[calc(100svh-6.5rem)] w-full max-w-[400px] overflow-hidden rounded-[30px] border ${
          isDark ? "border-white/10" : "border-white/25"
        } bg-[#1a120c] shadow-[0_24px_70px_rgba(0,0,0,0.55)] ${frameText}`}
      >
        {/* Cafe backdrop (contained in the phone frame) */}
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          <img
            src={emptyCafe.url}
            alt=""
            aria-hidden
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[900ms] ${
              started ? "opacity-0" : "opacity-100"
            }`}
          />
          <img
            src={saveraCafe.url}
            alt=""
            aria-hidden
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[900ms] ${
              started ? "opacity-100" : "opacity-0"
            }`}
          />
          <div
            className={
              isDark
                ? "absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/85"
                : "absolute inset-0 bg-gradient-to-b from-[#3a2418]/40 via-black/25 to-black/70"
            }
          />
        </div>

        <div className="relative z-10 flex h-full flex-col px-4 pt-4 animate-soft-in">
          {/* Header — top of the phone frame */}
          <div className="flex items-center gap-3 py-3">
            <button
              onClick={() => setMenuOpen(true)}
              aria-label="Open chats menu"
              className="rounded-full border border-white/30 bg-white/15 p-2 text-white backdrop-blur-xl transition-transform duration-300 active:rotate-90"
            >
              <Hamburger open={menuOpen} />
            </button>
            <h1 className="font-seasons flex-1 text-[22px] font-light leading-tight text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.55)]">
              Cafe
            </h1>
            <button
              onClick={newChat}
              aria-label="New chat"
              title="New chat"
              className="rounded-2xl border border-white/30 bg-white/20 p-2 text-white backdrop-blur-xl transition active:scale-95"
            >
              <SquarePen className="h-[17px] w-[17px]" />
            </button>
            <button
              onClick={() => nav({ to: "/companion/voice" })}
              aria-label="Have a call with Savera"
              title="Have a call with Savera"
              className="rounded-2xl border border-white/30 bg-white/20 p-2 text-white backdrop-blur-xl transition active:scale-95"
            >
              <Phone className="h-[17px] w-[17px]" />
            </button>
          </div>
          {/* Transcript */}
          <div className="min-h-0 flex-1 space-y-3 overflow-y-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {active?.messages.map((m) => (
              <div
                key={m.id}
                className={m.role === "user" ? "flex justify-end" : "flex justify-start"}
              >
                <div
                  className={
                    m.role === "user"
                      ? "max-w-[80%] rounded-3xl rounded-br-lg bg-[#4a2f1d] px-4 py-2.5 text-[14px] font-light text-[#fdf3ea]"
                      : "max-w-[85%] text-[14px] font-light leading-relaxed text-white"
                  }
                >
                  {m.role === "savera" && m.id === typingId ? (
                    <Typewriter text={m.text} onDone={() => setTypingId(null)} />
                  ) : (
                    m.text
                  )}
                </div>
              </div>
            ))}
            {thinking && (
              <div className="flex justify-start">
                <TypingDots dark={isDark} />
              </div>
            )}
            <div ref={endRef} />
          </div>

          {/* Composer */}
          <div className="relative z-20">
            {!started && (
              <div className="mb-3 flex flex-wrap justify-center gap-2">
                {PROMPTS.map((p, i) => (
                  <button
                    key={p}
                    onClick={() => void send(p)}
                    className="animate-cafe-drift rounded-full border border-white/40 bg-white/25 px-4 py-2 text-[12.5px] font-light text-white shadow-[0_8px_24px_rgba(0,0,0,0.3)] backdrop-blur-xl transition active:scale-95"
                    style={{ animationDelay: `${i * 0.8}s` }}
                  >
                    {p}
                  </button>
                ))}
              </div>
            )}

            {attachments.length > 0 && (
              <div className="mb-2 flex gap-2">
                {attachments.map((src, i) => (
                  <div key={i} className="relative">
                    <img
                      src={src}
                      alt="Attachment preview"
                      className="h-14 w-14 rounded-xl border border-white/40 object-cover"
                    />
                    <button
                      aria-label="Remove attachment"
                      onClick={() => setAttachments((a) => a.filter((_, j) => j !== i))}
                      className="absolute -right-1.5 -top-1.5 rounded-full bg-[#4a2f1d] p-0.5 text-white"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div
              className={`relative flex items-end gap-2 rounded-[26px] border px-3 py-2 shadow-[0_10px_30px_rgba(0,0,0,0.35)] backdrop-blur-2xl ${
                isDark ? "border-white/15 bg-black/35" : "border-white/40 bg-white/30"
              }`}
            >
              <div ref={plusWrapRef}>
                {plusOpen && (
                  <div className="absolute bottom-[calc(100%+8px)] left-0 w-48 overflow-hidden rounded-2xl border border-white/50 bg-[linear-gradient(160deg,rgba(255,247,240,0.96),rgba(246,222,205,0.92))] text-[#4a2f1d] shadow-[0_16px_40px_rgba(0,0,0,0.4)]">
                    <button
                      onClick={() => photoRef.current?.click()}
                      className="flex w-full items-center gap-2 px-4 py-3 text-[13px] hover:bg-white/60"
                    >
                      <ImageIcon className="h-4 w-4" /> Add Photo
                    </button>
                    <button
                      onClick={() => fileRef.current?.click()}
                      className="flex w-full items-center gap-2 px-4 py-3 text-[13px] hover:bg-white/60"
                    >
                      <Paperclip className="h-4 w-4" /> Add File
                    </button>
                  </div>
                )}
                <button
                  onClick={() => {
                    setPlusOpen((v) => !v);
                    setSpinKey((k) => k + 1);
                  }}
                  aria-label="Add photo or file"
                  className="mb-1 rounded-full bg-white/40 p-1.5 text-white"
                >
                  <Plus key={spinKey} className="h-4 w-4 animate-spin-once" />
                </button>
              </div>
              <input ref={photoRef} type="file" accept="image/*" className="hidden" onChange={onPickPhoto} />
              <input ref={fileRef} type="file" className="hidden" onChange={onPickFile} />

              <textarea
                ref={inputRef}
                value={draft}
                rows={1}
                onPaste={onPaste}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    void send(draft);
                  }
                }}
                placeholder="Talk to Savera…"
                className="max-h-28 flex-1 resize-none bg-transparent py-2 text-[14px] font-light text-white placeholder:text-white/65 focus:outline-none"
              />

              <button
                onClick={dictate}
                aria-label={listening ? "Stop recording" : "Record a voice message"}
                className={`mb-1 flex items-center gap-1.5 rounded-full px-2 py-1.5 text-white transition ${
                  listening ? "bg-[#a33a2b]" : "bg-white/40"
                }`}
              >
                {listening ? (
                  <>
                    <Square className="h-3.5 w-3.5 fill-current" />
                    <VoiceBars level={micLevel} active />
                  </>
                ) : (
                  <Mic className="h-4 w-4" />
                )}
              </button>
              {draft.trim() && (
                <button
                  onClick={() => void send(draft)}
                  aria-label="Send"
                  className="mb-1 rounded-full bg-[#4a2f1d] p-1.5 text-[#fdf3ea]"
                >
                  <ArrowUp className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

        </div>

        {/* Side menu */}
        {menuOpen && (
          <div className="absolute inset-0 z-50 flex">
            <button
              aria-label="Close menu"
              onClick={() => setMenuOpen(false)}
              className="animate-cafe-scrim-in absolute inset-0 bg-[#2a1a10]/60 backdrop-blur-sm"
            />
            <aside
              className={`animate-cafe-menu-in relative h-full w-[50%] max-w-[200px] overflow-y-auto border-r p-3 shadow-[0_0_60px_rgba(0,0,0,0.5)] ${
                isDark
                  ? "border-white/10 bg-[linear-gradient(170deg,rgba(32,22,16,0.98),rgba(20,14,10,0.96))] text-[#f3e6da]"
                  : "border-white/40 bg-[linear-gradient(170deg,rgba(255,247,240,0.97),rgba(240,214,193,0.94))] text-[#4a2f1d]"
              }`}
            >
              <button
                onClick={newChat}
                className={`flex w-full items-center gap-2 rounded-2xl px-3 py-2.5 text-[13px] ${
                  isDark ? "bg-white/10" : "bg-white/70"
                }`}
              >
                <SquarePen className="h-4 w-4" /> New Chat
              </button>
              <button
                onClick={() => {
                  setMenuOpen(false);
                  nav({ to: "/companion/voice" });
                }}
                className={`mt-2 flex w-full items-center gap-2 rounded-2xl px-3 py-2.5 text-[13px] ${
                  isDark ? "bg-white/10" : "bg-white/70"
                }`}
              >
                <AudioLines className="h-4 w-4" /> Voice Chat
              </button>

              {/* Dark mode slider */}
              <button
                onClick={toggle}
                aria-label="Toggle dark mode"
                className="mt-4 flex w-full items-center justify-between rounded-2xl px-1 py-2 text-[12px]"
              >
                <span className="flex items-center gap-1.5">
                  {isDark ? <Moon className="h-3.5 w-3.5" /> : <Sun className="h-3.5 w-3.5" />}
                  {isDark ? "Dark" : "Light"}
                </span>
                <span
                  className={`relative h-6 w-11 rounded-full transition-colors duration-300 ${
                    isDark ? "bg-[#6b4a30]" : "bg-[#e3cdb6]"
                  }`}
                >
                  <span
                    className="absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform duration-300 ease-[cubic-bezier(.22,1,.36,1)]"
                    style={{ transform: `translateX(${isDark ? 22 : 2}px)` }}
                  />
                </span>
              </button>

              <MenuSection
                label="Pinned"
                open={pinnedOpen}
                onToggle={() => setPinnedOpen((v) => !v)}
                chats={pinned}
                dark={isDark}
                onSelect={(c) => {
                  setActiveId(c.id);
                  setMenuOpen(false);
                }}
                onPin={(c) => patch(c.id, (x) => ({ ...x, pinned: !x.pinned }))}
                onRename={(c) => {
                  const t = window.prompt("Rename session", c.title);
                  if (t?.trim()) patch(c.id, (x) => ({ ...x, title: t.trim() }));
                }}
                onDelete={(c) => {
                  persist(chatsRef.current.filter((x) => x.id !== c.id));
                  if (activeId === c.id) setActiveId(null);
                }}
              />
              <MenuSection
                label="Recent"
                open={recentOpen}
                onToggle={() => setRecentOpen((v) => !v)}
                chats={recent}
                dark={isDark}
                onSelect={(c) => {
                  setActiveId(c.id);
                  setMenuOpen(false);
                }}
                onPin={(c) => patch(c.id, (x) => ({ ...x, pinned: !x.pinned }))}
                onRename={(c) => {
                  const t = window.prompt("Rename session", c.title);
                  if (t?.trim()) patch(c.id, (x) => ({ ...x, title: t.trim() }));
                }}
                onDelete={(c) => {
                  persist(chatsRef.current.filter((x) => x.id !== c.id));
                  if (activeId === c.id) setActiveId(null);
                }}
              />
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}

function Hamburger({ open }: { open: boolean }) {
  return (
    <span
      className="flex h-4 w-4 flex-col items-center justify-center gap-[3px] transition-transform duration-300 ease-[cubic-bezier(.22,1,.36,1)]"
      style={{ transform: open ? "rotate(90deg)" : "rotate(0deg)" }}
    >
      <span className="h-[1.5px] w-4 rounded-full bg-current" />
      <span className="h-[1.5px] w-4 rounded-full bg-current" />
      <span className="h-[1.5px] w-4 rounded-full bg-current" />
    </span>
  );
}

function MenuSection({
  label,
  open,
  onToggle,
  chats,
  dark,
  onSelect,
  onPin,
  onRename,
  onDelete,
}: {
  label: string;
  open: boolean;
  onToggle: () => void;
  chats: CafeChat[];
  dark: boolean;
  onSelect: (c: CafeChat) => void;
  onPin: (c: CafeChat) => void;
  onRename: (c: CafeChat) => void;
  onDelete: (c: CafeChat) => void;
}) {
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  return (
    <section className="mt-4">
      <button
        onClick={onToggle}
        className={`flex w-full items-center justify-between px-1 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] ${
          dark ? "text-white/50" : "text-[#4a2f1d]/60"
        }`}
      >
        {label}
        <ChevronDown className={`h-4 w-4 transition-transform ${open ? "" : "-rotate-90"}`} />
      </button>
      {open && (
        <div className="mt-1 flex flex-col">
          {chats.map((c) => (
            <div key={c.id} className="relative flex items-center">
              <button
                onClick={() => onSelect(c)}
                className={`flex min-w-0 flex-1 items-center gap-2 rounded-xl px-2 py-2 text-left text-[12.5px] ${
                  dark ? "hover:bg-white/10" : "hover:bg-white/60"
                }`}
              >
                {c.kind === "voice" ? (
                  <AudioLines className="h-4 w-4 shrink-0 opacity-70" />
                ) : (
                  <MessageCircle className="h-4 w-4 shrink-0 opacity-70" />
                )}
                <span className="truncate">{c.title}</span>
              </button>
              <button
                aria-label="Chat options"
                onClick={() => setOpenMenu((m) => (m === c.id ? null : c.id))}
                className="shrink-0 rounded-lg p-1 opacity-70"
              >
                <MoreVertical className="h-4 w-4" />
              </button>
              {openMenu === c.id && (
                <div
                  className={`absolute right-0 top-full z-20 w-32 overflow-hidden rounded-xl border shadow-[0_12px_30px_rgba(0,0,0,0.35)] ${
                    dark
                      ? "border-white/10 bg-[#241811] text-[#f3e6da]"
                      : "border-white/60 bg-[#fff7f0] text-[#4a2f1d]"
                  }`}
                >
                  {[
                    { label: c.pinned ? "Unpin" : "Pin", icon: Pin, run: () => onPin(c) },
                    { label: "Rename", icon: Pencil, run: () => onRename(c) },
                    { label: "Delete", icon: Trash2, run: () => onDelete(c) },
                  ].map((o) => (
                    <button
                      key={o.label}
                      onClick={() => {
                        setOpenMenu(null);
                        o.run();
                      }}
                      className="flex w-full items-center gap-2 px-3 py-2 text-[12px] hover:bg-black/10"
                    >
                      <o.icon className="h-3.5 w-3.5" /> {o.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
