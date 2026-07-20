// Tiny client-side store for onboarding data used across screens.
const KEY = "savera_onboarding";

export type OnboardingData = {
  name?: string;
  dob?: string;
  email?: string;
  phone?: string;
  password?: string;
  state?: string;
  district?: string;
  gender?: string;
  support?: string[];
  goals?: string[];
  answers?: (string | null)[];
};

export function readOnboarding(): OnboardingData {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(window.localStorage.getItem(KEY) || "{}");
  } catch {
    return {};
  }
}

export function saveOnboarding(patch: OnboardingData) {
  if (typeof window === "undefined") return;
  const cur = readOnboarding();
  window.localStorage.setItem(KEY, JSON.stringify({ ...cur, ...patch }));
}

export function firstName(): string {
  const n = (readOnboarding().name || "").trim();
  if (!n) return "friend";
  return n.split(/\s+/)[0];
}

// Structured profile Savera (the AI therapist in the cafe) can consume.
export type SaveraMemory = {
  name?: string;
  firstName: string;
  gender?: string;
  location?: { state?: string; district?: string };
  supportPreferences?: string[];
  goals?: string[];
  assessment: { question: string; answer: string | null }[];
  updatedAt: string;
};

export function saveSaveraMemory(
  questions: { q: string }[],
  answers: (string | null)[],
) {
  if (typeof window === "undefined") return;
  const d = readOnboarding();
  const memory: SaveraMemory = {
    name: d.name,
    firstName: firstName(),
    gender: d.gender,
    location: { state: d.state, district: d.district },
    supportPreferences: d.support,
    goals: d.goals,
    assessment: questions.map((q, i) => ({ question: q.q, answer: answers[i] ?? null })),
    updatedAt: new Date().toISOString(),
  };
  window.localStorage.setItem("savera_memory", JSON.stringify(memory));
}

export function readSaveraMemory(): SaveraMemory | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem("savera_memory");
    return raw ? (JSON.parse(raw) as SaveraMemory) : null;
  } catch {
    return null;
  }
}
