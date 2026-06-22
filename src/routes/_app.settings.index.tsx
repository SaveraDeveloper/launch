import { createFileRoute } from "@tanstack/react-router";
import { ScreenScaffold, ActionList } from "@/components/ScreenScaffold";

export const Route = createFileRoute("/_app/settings/")({ component: () => (
  <ScreenScaffold part="Part 14 · Settings" title="Settings" backTo="/profile">
    <ActionList items={[
      { label: "Privacy", variant: "secondary", to: "/settings/privacy" },
      { label: "Notifications", variant: "secondary", to: "/settings/notifications" },
      { label: "Reminders", variant: "secondary", to: "/settings/reminders" },
      { label: "Account", variant: "secondary" },
      { label: "About Aroha", variant: "secondary" },
    ]} />
  </ScreenScaffold>
) });
