import { createFileRoute } from "@tanstack/react-router";
import { ScreenScaffold, Section, Placeholder, ActionList } from "@/components/ScreenScaffold";

export const Route = createFileRoute("/onboarding/challenges")({ component: Page });
function Page() {
  return (
    <ScreenScaffold part="Part 3 · Onboarding · Step 3 of 4" title="What's your biggest challenge right now?" subtitle="Select one to personalize your assessment." backTo="/onboarding/basic-info">
      <Section title="Challenge Cards">
        {["Overthinking", "Stress & Anxiety", "Low Confidence", "Fear of Failure", "Burnout", "Self-Doubt"].map((c) => (
          <Placeholder key={c} label={c} />
        ))}
      </Section>
      <ActionList items={[{ label: "Continue", variant: "primary", to: "/onboarding/assessment-intro" }]} />
    </ScreenScaffold>
  );
}
