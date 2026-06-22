import { createFileRoute } from "@tanstack/react-router";
import { ScreenScaffold, Section, Placeholder, ActionList } from "@/components/ScreenScaffold";

export const Route = createFileRoute("/assessment/discovery")({ component: Page });
function Page() {
  return (
    <ScreenScaffold part="Part 4 · Discovery Profile" title="Your Discovery Profile">
      <Section title="Primary Challenge">
        <Placeholder label="Overthinking" />
      </Section>
      <Section title="Severity">
        <Placeholder label="Mild · Moderate · High" />
      </Section>
      <Section title="Contributing Factors">
        <Placeholder label="Perfectionism · Sleep · Self-criticism" />
      </Section>
      <Section title="Recommended Approaches">
        <Placeholder label="CBT · ACT · DBT · Behavioral Psychology" />
      </Section>
      <ActionList items={[{ label: "See Recommendations", variant: "primary", to: "/assessment/recommendations" }]} />
    </ScreenScaffold>
  );
}
