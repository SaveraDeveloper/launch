import { createFileRoute } from "@tanstack/react-router";
import { ScreenScaffold, Section, Placeholder, ActionList } from "@/components/ScreenScaffold";

export const Route = createFileRoute("/_app/progress/")({ component: Page });
function Page() {
  return (
    <ScreenScaffold part="Part 10 · Progress" title="Your Progress">
      <Section title="Stats"><Placeholder label="Streaks · completed experiences · activities done" /></Section>
      <ActionList items={[
        { label: "Milestones", variant: "secondary", to: "/progress/milestones" },
        { label: "Achievements", variant: "secondary", to: "/progress/achievements" },
      ]} />
    </ScreenScaffold>
  );
}
