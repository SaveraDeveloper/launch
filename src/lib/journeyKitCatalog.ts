// Journey Kit — mock catalog for Videos, Books, Journals, and Saved items.
// Kept intentionally simple: read-heavy, no growth mechanics.

export type VideoItem = {
  id: string;
  title: string;
  creator: string;
  durationSec: number;
  status: "unlocked" | "saved";
  watchedAt?: string; // ISO
  description: string;
};

export type BookItem = {
  id: string;
  title: string;
  author: string;
  status: "recommended" | "saved" | "reading" | "finished";
  description: string;
  recommendationReason: string;
  relatedConcern: string;
  coverTint: string; // tailwind gradient classes
};

export type JournalItem = {
  id: string;
  title: string;
  date: string; // ISO
  mood: string;
  preview: string;
  body: string;
  isFavorite: boolean;
};

export const VIDEOS: VideoItem[] = [
  {
    id: "v-anxiety-101",
    title: "Understanding Anxious Thoughts",
    creator: "Dr. Meera Rao",
    durationSec: 8 * 60 + 12,
    status: "unlocked",
    watchedAt: new Date(Date.now() - 1000 * 60 * 60 * 26).toISOString(),
    description:
      "A gentle walkthrough of what anxiety looks like in the body and mind — and why it's not a flaw.",
  },
  {
    id: "v-cbt-basics",
    title: "The CBT Loop, Explained Softly",
    creator: "Savera Library",
    durationSec: 6 * 60 + 40,
    status: "unlocked",
    watchedAt: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(),
    description: "Thoughts, feelings, actions — and the tiny place you can step in.",
  },
  {
    id: "v-selfcompassion",
    title: "Self-Compassion in 5 Minutes",
    creator: "Kristin Hart",
    durationSec: 5 * 60 + 3,
    status: "saved",
    description: "A short talk on how to speak to yourself the way you'd speak to a friend.",
  },
  {
    id: "v-sleep",
    title: "Winding Down: A Night Routine",
    creator: "Rest Studio",
    durationSec: 12 * 60,
    status: "saved",
    description: "A slow, unhurried invitation to let the day go.",
  },
  {
    id: "v-breath",
    title: "Box Breathing, Guided",
    creator: "Calm Rhythm",
    durationSec: 4 * 60 + 20,
    status: "unlocked",
    watchedAt: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(),
    description: "A four-count breath to steady the nervous system.",
  },
];

export const BOOKS: BookItem[] = [
  {
    id: "b-self-comp",
    title: "Self-Compassion",
    author: "Kristin Neff",
    status: "reading",
    description:
      "A foundational look at treating yourself with the same kindness you'd offer a close friend.",
    recommendationReason:
      "You've mentioned self-criticism a few times — this book meets that gently.",
    relatedConcern: "Self-Criticism",
    coverTint: "from-rose-300/70 to-rose-500/60",
  },
  {
    id: "b-feeling-good",
    title: "Feeling Good",
    author: "David D. Burns",
    status: "recommended",
    description: "A classic, practical intro to cognitive behavioral therapy.",
    recommendationReason: "Pairs well with your Thought Lab journey.",
    relatedConcern: "Overthinking",
    coverTint: "from-amber-300/70 to-amber-500/60",
  },
  {
    id: "b-atomic-habits",
    title: "Atomic Habits",
    author: "James Clear",
    status: "saved",
    description: "Small, sustainable changes that compound.",
    recommendationReason: "For the habit-building goal you set.",
    relatedConcern: "Habit Building",
    coverTint: "from-emerald-300/70 to-emerald-500/60",
  },
  {
    id: "b-body-keeps",
    title: "The Body Keeps the Score",
    author: "Bessel van der Kolk",
    status: "recommended",
    description: "On how experiences live in the body, and paths toward healing.",
    recommendationReason: "A deeper read for when you're ready.",
    relatedConcern: "Emotional Overwhelm",
    coverTint: "from-violet-300/70 to-violet-500/60",
  },
  {
    id: "b-untamed",
    title: "Untamed",
    author: "Glennon Doyle",
    status: "finished",
    description: "A memoir on listening to your own knowing.",
    recommendationReason: "You saved this after Values Compass.",
    relatedConcern: "Identity",
    coverTint: "from-sky-300/70 to-sky-500/60",
  },
];

export const JOURNALS: JournalItem[] = [
  {
    id: "j-1",
    title: "A quieter morning",
    date: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
    mood: "Calm",
    preview:
      "Woke up before the alarm today. The light was that soft grey kind, and I didn't reach for my phone right away…",
    body:
      "Woke up before the alarm today. The light was that soft grey kind, and I didn't reach for my phone right away.\n\nI sat with tea for a while and noticed how much of my morning normally runs on autopilot. Savera asked me yesterday what a gentle morning looks like — I think this was it.",
    isFavorite: true,
  },
  {
    id: "j-2",
    title: "The meeting that went okay",
    date: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
    mood: "Neutral",
    preview:
      "I spent so much energy dreading it. And then it was fine. Not amazing, just fine. I want to remember that…",
    body:
      "I spent so much energy dreading it. And then it was fine. Not amazing, just fine.\n\nI want to remember that the anticipation is almost always heavier than the thing itself.",
    isFavorite: false,
  },
  {
    id: "j-3",
    title: "Something I didn't say",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
    mood: "Tender",
    preview:
      "There's a version of the conversation where I said what I actually meant. I want to try that next time…",
    body:
      "There's a version of the conversation where I said what I actually meant. Not sharp, not swallowed — just clear.\n\nI want to try that next time. Even if my voice shakes.",
    isFavorite: true,
  },
  {
    id: "j-4",
    title: "Small wins list",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10).toISOString(),
    mood: "Great",
    preview: "Walked without headphones. Cooked something new. Said no to one thing…",
    body:
      "Walked without headphones. Cooked something new. Said no to one thing I would have normally forced a yes for.\n\nNone of these are big. All of them are mine.",
    isFavorite: false,
  },
  {
    id: "j-5",
    title: "The heavy afternoon",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 20).toISOString(),
    mood: "Low",
    preview:
      "Not much happened. That's what makes it hard to explain. Just a heaviness that sat with me from around 3pm…",
    body:
      "Not much happened. That's what makes it hard to explain. Just a heaviness that sat with me from around 3pm.\n\nSavera reminded me that low days don't need a reason to be valid. I'm trying to let that land.",
    isFavorite: false,
  },
];

export function formatDuration(sec: number) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function relativeDate(iso: string) {
  const d = new Date(iso);
  const diff = Date.now() - d.getTime();
  const day = 1000 * 60 * 60 * 24;
  if (diff < day) return "Today";
  if (diff < day * 2) return "Yesterday";
  if (diff < day * 7) return `${Math.floor(diff / day)} days ago`;
  return d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

export function isThisWeek(iso: string) {
  return Date.now() - new Date(iso).getTime() < 1000 * 60 * 60 * 24 * 7;
}
export function isThisMonth(iso: string) {
  return Date.now() - new Date(iso).getTime() < 1000 * 60 * 60 * 24 * 30;
}
