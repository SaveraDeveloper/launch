import { createFileRoute } from "@tanstack/react-router";
import { ScreenScaffold, Section, ActionList } from "@/components/ScreenScaffold";

export const Route = createFileRoute("/_app/wellbeing/")({ component: Page });
function Page() {
  return (
    <ScreenScaffold part="Part 8 · Wellbeing Hub" title="Wellbeing">
      <Section title="Check your wellbeing">
        <ActionList items={[
          { label: "Start a Wellbeing Check", variant: "primary", to: "/wellbeing/select" },
          { label: "View Past Results", variant: "secondary", to: "/wellbeing/results" },
        ]} />
      </Section>
    </ScreenScaffold>
  );
}
