import { createFileRoute } from "@tanstack/react-router";
import { ScreenScaffold, Section, Placeholder } from "@/components/ScreenScaffold";

export const Route = createFileRoute("/_app/progress/milestones")({ component: () => (
  <ScreenScaffold part="Part 10" title="Milestones" backTo="/progress">
    <Section title="Reached"><Placeholder label="First check-in · 7-day streak" /></Section>
    <Section title="Upcoming"><Placeholder label="Complete Thought Lab" /></Section>
  </ScreenScaffold>
) });
