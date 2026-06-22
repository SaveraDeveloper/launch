import { createFileRoute } from "@tanstack/react-router";
import { ScreenScaffold, Section, Placeholder, ActionList } from "@/components/ScreenScaffold";

export const Route = createFileRoute("/onboarding/intro")({ component: Page });
function Page() {
  return (
    <ScreenScaffold part="Part 3 · Onboarding · Step 1 of 4" title="Let's get to know you" subtitle="Aroha personalizes your journey through experiences, activities, and insights." backTo="/welcome">
      <Placeholder label="Calm branded illustration" />
      <ActionList items={[
        { label: "Continue", variant: "primary", to: "/onboarding/basic-info" },
      ]} />
    </ScreenScaffold>
  );
}
