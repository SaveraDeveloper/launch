import { createFileRoute } from "@tanstack/react-router";
import { ScreenScaffold, Section, Placeholder } from "@/components/ScreenScaffold";

export const Route = createFileRoute("/_app/notifications")({ component: () => (
  <ScreenScaffold part="Part 13 · Notifications" title="Notifications" backTo="/home">
    <Section title="Today"><Placeholder label="Notification item" /></Section>
    <Section title="Earlier"><Placeholder label="Notification item" /></Section>
  </ScreenScaffold>
) });
