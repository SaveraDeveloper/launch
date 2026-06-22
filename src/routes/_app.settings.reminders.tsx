import { createFileRoute } from "@tanstack/react-router";
import { ScreenScaffold, Section, Placeholder } from "@/components/ScreenScaffold";

export const Route = createFileRoute("/_app/settings/reminders")({ component: () => (
  <ScreenScaffold part="Part 13 · Reminder System" title="Reminders" backTo="/settings">
    <Section title="Daily Check-In"><Placeholder label="Time picker · days of week" /></Section>
    <Section title="Activity Reminders"><Placeholder label="Per-activity reminders" /></Section>
  </ScreenScaffold>
) });
