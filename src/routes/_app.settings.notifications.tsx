import { createFileRoute } from "@tanstack/react-router";
import { ScreenScaffold, Section, Placeholder } from "@/components/ScreenScaffold";

export const Route = createFileRoute("/_app/settings/notifications")({ component: () => (
  <ScreenScaffold part="Part 14 · Notification Settings" title="Notifications" backTo="/settings">
    <Section title="Channels"><Placeholder label="Push · Email toggles" /></Section>
    <Section title="Topics"><Placeholder label="Check-ins · Insights · Activity reminders" /></Section>
  </ScreenScaffold>
) });
