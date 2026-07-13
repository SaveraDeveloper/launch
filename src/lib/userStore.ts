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
