import { createFileRoute } from "@tanstack/react-router";
import { ScreenScaffold, Section, Placeholder, ActionList } from "@/components/ScreenScaffold";

export const Route = createFileRoute("/assessment/")({ component: Page });
function Page() {
  return (
    <ScreenScaffold part="Part 4 · Assessment" title="Question 1 of 12" subtitle="I feel emotionally exhausted." backTo="/onboarding/assessment-intro">
      <Section title="5 Point Scale">
        {["Never", "Rarely", "Sometimes", "Often", "Always"].map((o) => (
          <Placeholder key={o} label={o} />
        ))}
      </Section>
      <Section title="Optional">
        <Placeholder label="Add a reflection..." />
      </Section>
      <ActionList items={[
        { label: "Continue", variant: "primary", to: "/assessment/processing" },
        { label: "Go Back", variant: "ghost" },
      ]} />
    </ScreenScaffold>
  );
}
