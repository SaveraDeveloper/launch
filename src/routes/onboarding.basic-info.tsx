import { createFileRoute } from "@tanstack/react-router";
import { ScreenScaffold, Section, Placeholder, ActionList } from "@/components/ScreenScaffold";

export const Route = createFileRoute("/onboarding/basic-info")({ component: Page });
function Page() {
  return (
    <ScreenScaffold part="Part 3 · Onboarding · Step 2 of 4" title="Tell us about you" backTo="/onboarding/intro">
      <Section title="Fields">
        <Placeholder label="Name" />
        <Placeholder label="Age Range: 13–15 · 16–18 · 19–22 · 23–26" />
      </Section>
      <ActionList items={[{ label: "Continue", variant: "primary", to: "/onboarding/challenges" }]} />
    </ScreenScaffold>
  );
}
