import { createFileRoute } from "@tanstack/react-router";
import { ScreenScaffold, Section, Placeholder, ActionList } from "@/components/ScreenScaffold";

export const Route = createFileRoute("/_app/profile")({ component: Page });
function Page() {
  return (
    <ScreenScaffold part="Part 14 · Profile" title="You">
      <Section title="Account"><Placeholder label="Avatar · Name · Email" /></Section>
      <Section title="Journey"><Placeholder label="Joined · Streak · Completed experiences" /></Section>
      <ActionList items={[
        { label: "Settings", variant: "secondary", to: "/settings" },
        { label: "Privacy", variant: "secondary", to: "/settings/privacy" },
        { label: "Notification Settings", variant: "secondary", to: "/settings/notifications" },
        { label: "Safety Center", variant: "secondary", to: "/safety" },
        { label: "Log Out", variant: "ghost", to: "/welcome" },
      ]} />
    </ScreenScaffold>
  );
}
