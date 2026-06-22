import { createFileRoute } from "@tanstack/react-router";
import { Section, Placeholder, ActionList } from "@/components/ScreenScaffold";

export const Route = createFileRoute("/_app/tracking/habit")({ component: () => (
  <div className="space-y-6">
    <Section title="My Habits"><Placeholder label="Checklist with streaks" /></Section>
    <ActionList items={[{label:"Add Habit",variant:"primary"}]} />
  </div>
) });
