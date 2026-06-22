import { createFileRoute } from "@tanstack/react-router";
import { ScreenScaffold, ActionList } from "@/components/ScreenScaffold";

export const Route = createFileRoute("/onboarding/assessment-intro")({ component: Page });
function Page() {
  return (
    <ScreenScaffold part="Part 3 · Onboarding · Step 4 of 4" title="Your Personalized Assessment" subtitle="A few thoughtful questions to help us understand you better. About 5 minutes." backTo="/onboarding/challenges">
      <ActionList items={[
        { label: "Start Assessment", variant: "primary", to: "/assessment" },
        { label: "Skip for now", variant: "ghost", to: "/home" },
      ]} />
    </ScreenScaffold>
  );
}
