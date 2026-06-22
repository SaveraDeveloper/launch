import { createFileRoute } from "@tanstack/react-router";
import { ScreenScaffold, Section, Placeholder, ActionList } from "@/components/ScreenScaffold";

export const Route = createFileRoute("/assessment/recommendations")({ component: Page });
function Page() {
  return (
    <ScreenScaffold part="Part 4 · Recommendations" title="A path tailored to you">
      <Section title="Primary Recommendation">
        <Placeholder label="Thought Lab — because overthinking appears to be a major challenge." />
      </Section>
      <Section title="Supporting Activities">
        <Placeholder label="Activity · Video · Guide" />
      </Section>
      <Section title="Growth Path Preview">
        <Placeholder label="Week 1 → Week 4 milestones" />
      </Section>
      <ActionList items={[{ label: "Enter Aroha", variant: "primary", to: "/home" }]} />
    </ScreenScaffold>
  );
}
