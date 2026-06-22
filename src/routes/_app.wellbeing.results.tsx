import { createFileRoute } from "@tanstack/react-router";
import { ScreenScaffold, Section, Placeholder, ActionList } from "@/components/ScreenScaffold";

export const Route = createFileRoute("/_app/wellbeing/results")({ component: Page });
function Page() {
  return (
    <ScreenScaffold part="Part 8 · Results" title="Your Results">
      <Section title="Score"><Placeholder label="Moderate · 12/27" /></Section>
      <Section title="Interpretation"><Placeholder label="Explanation of what this means" /></Section>
      <Section title="Recommended Next Steps"><Placeholder label="Linked experiences / activities" /></Section>
      <ActionList items={[{label:"Done",variant:"primary",to:"/wellbeing"}]} />
    </ScreenScaffold>
  );
}
