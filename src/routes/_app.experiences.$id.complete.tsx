import { createFileRoute } from "@tanstack/react-router";
import { ScreenScaffold, Section, Placeholder, ActionList } from "@/components/ScreenScaffold";

export const Route = createFileRoute("/_app/experiences/$id/complete")({ component: Page });
function Page() {
  return (
    <ScreenScaffold part="Part 6 · Completion" title="Well done." subtitle="You completed this experience.">
      <Section title="Reflection"><Placeholder label="How do you feel now?" /></Section>
      <Section title="Next Steps"><Placeholder label="Recommended follow-up experience" /></Section>
      <ActionList items={[
        { label: "Save to Progress", variant: "primary", to: "/progress" },
        { label: "Back to Home", variant: "ghost", to: "/home" },
      ]} />
    </ScreenScaffold>
  );
}
