// Savera Experience & Activity catalog (from Design Bibles Vol 1-4)
// Journeys = flagship experiences (Vol 1-2). Practices = micro-activities (Vol 3-4).

export type Journey = {
  id: string;
  title: string;
  desc: string;
  concerns: string[];
  framework: string;
  time: string;
  progress: number;
};

export type Practice = {
  id: string;
  title: string;
  summary: string;
  concerns: string[];
  framework: string;
  time: string;
};

export type Category = {
  id: string;
  title: string;
  desc: string;
  intro: string;
  journeyIds: string[];
  practiceIds: string[];
};

export const JOURNEYS: Record<string, Journey> = {
  "thought-lab": {
    id: "thought-lab", title: "Thought Lab",
    desc: "Untangle overthinking with CBT + cognitive restructuring.",
    concerns: ["Overthinking", "Anxiety", "Rumination", "Self-Doubt"],
    framework: "CBT + Cognitive Restructuring", time: "6 chapters · 10 min/day", progress: 0,
  },
  "reality-court": {
    id: "reality-court", title: "Reality Court",
    desc: "Put fear on trial. Test the evidence behind catastrophic thoughts.",
    concerns: ["Fear of Failure", "Catastrophizing", "Perfectionism"],
    framework: "CBT Evidence Testing", time: "5 chapters · 10 min/day", progress: 0,
  },
  "energy-audit": {
    id: "energy-audit", title: "Energy Audit",
    desc: "Map what fuels and drains you, then rebuild your week.",
    concerns: ["Burnout", "Chronic Stress", "Mental Fatigue"],
    framework: "Behavioral Activation + Energy Management", time: "6 chapters · 12 min/day", progress: 0,
  },
  "mission-builder": {
    id: "mission-builder", title: "Mission Builder",
    desc: "Turn your values into a sense of purpose you can feel.",
    concerns: ["Lack of Purpose", "Low Motivation"],
    framework: "Values-Based Goal Setting", time: "5 chapters · 10 min/day", progress: 0,
  },
  "strength-mirror": {
    id: "strength-mirror", title: "Strength Mirror",
    desc: "See yourself clearly, softly. Rebuild confidence from within.",
    concerns: ["Low Confidence", "Self-Criticism", "Low Self-Esteem"],
    framework: "Positive Psychology + Self-Compassion", time: "6 chapters · 10 min/day", progress: 0,
  },
  "future-self-portal": {
    id: "future-self-portal", title: "Future Self Portal",
    desc: "Meet the version of you that made it through.",
    concerns: ["Hopelessness", "Low Motivation", "Fear of the Future"],
    framework: "Future Self Visualization + Positive Psychology", time: "5 chapters · 12 min/day", progress: 0,
  },
  "connection-builder": {
    id: "connection-builder", title: "Connection Builder",
    desc: "Practice the small skills that make closeness possible.",
    concerns: ["Loneliness", "Friendship & Relationship Challenges"],
    framework: "Interpersonal Effectiveness", time: "6 chapters · 10 min/day", progress: 0,
  },
  "emotional-toolkit": {
    id: "emotional-toolkit", title: "Emotional Toolkit",
    desc: "DBT skills for the moments emotions feel too big.",
    concerns: ["Emotional Overwhelm", "Relationship Stress", "Difficult Emotions"],
    framework: "DBT + Emotion Regulation", time: "7 chapters · 10 min/day", progress: 0,
  },
  "values-compass": {
    id: "values-compass", title: "Values Compass",
    desc: "Find your true north for identity and life decisions.",
    concerns: ["Identity Confusion", "Life Direction", "Difficult Decisions"],
    framework: "Acceptance & Commitment Therapy (ACT)", time: "6 chapters · 10 min/day", progress: 0,
  },
  "progress-journey": {
    id: "progress-journey", title: "Progress Journey",
    desc: "Build habits that stick with positive reinforcement.",
    concerns: ["Personal Growth", "Habit Building", "Long-term Motivation"],
    framework: "Behavior Change + Positive Reinforcement", time: "8 chapters · 8 min/day", progress: 0,
  },
};

export const PRACTICES: Record<string, Practice> = {
  "mind-storm-clear": {
    id: "mind-storm-clear", title: "Mind Storm Clear",
    summary: "Defuse racing thoughts in a few minutes.",
    concerns: ["Overthinking", "Racing Thoughts"], framework: "CBT + Cognitive Defusion", time: "5 min",
  },
  "calm-rhythm": {
    id: "calm-rhythm", title: "Calm Rhythm",
    summary: "A guided breath to settle the body.",
    concerns: ["Stress", "Anxiety", "Emotional Activation"], framework: "Breathwork + Mindfulness", time: "4 min",
  },
  "reality-lens": {
    id: "reality-lens", title: "Reality Lens",
    summary: "Spot the distortion, soften the story.",
    concerns: ["Catastrophic Thinking", "Cognitive Distortions"], framework: "CBT", time: "6 min",
  },
  "focus-sprint": {
    id: "focus-sprint", title: "Focus Sprint",
    summary: "A tiny time-boxed reset for tired minds.",
    concerns: ["Burnout", "Procrastination", "Mental Fatigue"], framework: "Behavioral Activation + Time Boxing", time: "10 min",
  },
  "stress-filter": {
    id: "stress-filter", title: "Stress Filter",
    summary: "Sort what's yours to carry from what isn't.",
    concerns: ["Stress", "Overload"], framework: "Stress Appraisal + CBT", time: "7 min",
  },
  "perspective-flip-lab": {
    id: "perspective-flip-lab", title: "Perspective Flip Lab",
    summary: "Turn self-criticism into self-support.",
    concerns: ["Low Confidence", "Self-Criticism"], framework: "CBT Reframing", time: "6 min",
  },
  "courage-climb": {
    id: "courage-climb", title: "Courage Climb",
    summary: "One small step toward what you've been avoiding.",
    concerns: ["Fear", "Self-Doubt", "Avoidance"], framework: "Exposure Principles + Self-Efficacy", time: "8 min",
  },
  "identity-tree": {
    id: "identity-tree", title: "Identity Tree",
    summary: "Grow a picture of who you're becoming.",
    concerns: ["Identity", "Self-Worth"], framework: "Narrative Therapy + Positive Psychology", time: "8 min",
  },
  "let-go-ritual": {
    id: "let-go-ritual", title: "Let Go Ritual",
    summary: "A gentle release for what you're ready to lay down.",
    concerns: ["Breakups", "Resentment", "Emotional Release"], framework: "Acceptance + Self-Compassion", time: "9 min",
  },
  "unsent-message-portal": {
    id: "unsent-message-portal", title: "Unsent Message Portal",
    summary: "Say what needs saying — just for you.",
    concerns: ["Unexpressed Feelings", "Relationships"], framework: "Expressive Writing", time: "10 min",
  },
  "pattern-detector": {
    id: "pattern-detector", title: "Pattern Detector",
    summary: "See the loop you keep landing in.",
    concerns: ["Relationship Patterns", "Self-Awareness"], framework: "CBT + Schema Awareness", time: "7 min",
  },
  "micro-quest": {
    id: "micro-quest", title: "Micro Quest",
    summary: "A tiny meaningful action for today.",
    concerns: ["Purpose", "Motivation"], framework: "Behavioral Activation", time: "5 min",
  },
  "life-compass": {
    id: "life-compass", title: "Life Compass",
    summary: "Point yourself toward what matters.",
    concerns: ["Life Direction", "Decisions"], framework: "ACT Values Clarification", time: "8 min",
  },
  "wise-mind-balance": {
    id: "wise-mind-balance", title: "Wise Mind Balance",
    summary: "Meet emotion and reason in the middle.",
    concerns: ["Emotional vs Rational Decisions"], framework: "DBT Wise Mind", time: "6 min",
  },
};

export const CATEGORIES: Category[] = [
  {
    id: "thoughts", title: "Thoughts",
    desc: "Untangle overthinking, worry, and self-talk.",
    intro: "A soft place to slow the racing mind and notice patterns with kindness.",
    journeyIds: ["thought-lab", "reality-court"],
    practiceIds: ["mind-storm-clear", "reality-lens", "calm-rhythm"],
  },
  {
    id: "emotions", title: "Emotions",
    desc: "Meet what you feel with warmth and clarity.",
    intro: "Feelings are messengers. Let's welcome them together.",
    journeyIds: ["emotional-toolkit", "future-self-portal"],
    practiceIds: ["let-go-ritual", "unsent-message-portal", "calm-rhythm"],
  },
  {
    id: "relationships", title: "Relationships",
    desc: "Deepen connection with the people who matter.",
    intro: "The small skills that make closeness possible.",
    journeyIds: ["connection-builder", "emotional-toolkit"],
    practiceIds: ["pattern-detector", "unsent-message-portal", "let-go-ritual"],
  },
  {
    id: "identity", title: "Identity",
    desc: "Explore who you are and who you're becoming.",
    intro: "A quiet space to hear yourself more clearly.",
    journeyIds: ["strength-mirror", "values-compass"],
    practiceIds: ["identity-tree", "perspective-flip-lab", "life-compass"],
  },
  {
    id: "school-career", title: "School & Career",
    desc: "Focus, motivation, and burnout — gently.",
    intro: "For the pressure days and the empty ones.",
    journeyIds: ["energy-audit", "mission-builder"],
    practiceIds: ["focus-sprint", "stress-filter", "micro-quest"],
  },
  {
    id: "lifestyle", title: "Lifestyle",
    desc: "Sleep, energy, and small daily rituals.",
    intro: "Little rhythms that add up to a softer life.",
    journeyIds: ["progress-journey", "energy-audit"],
    practiceIds: ["calm-rhythm", "micro-quest", "wise-mind-balance"],
  },
];

export function categoryById(id: string) {
  return CATEGORIES.find((c) => c.id === id);
}
