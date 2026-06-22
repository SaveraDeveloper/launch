import { createFileRoute } from "@tanstack/react-router";
import { ScreenScaffold, Section, Placeholder, ActionList } from "@/components/ScreenScaffold";

export const Route = createFileRoute("/_app/activities/$id/complete")({ component: Page });
function Page() {
  return (
    <ScreenScaffold part="Part 7 · Activity Completion" title="Nice work">
      <Section title="Reflection"><Placeholder label="How was it?" /></Section>
      <ActionList items={[
        { label: "Save", variant: "primary", to: "/home" },
        { label: "Try Another", variant: "secondary", to: "/home" },
      ]} />
    </ScreenScaffold>
  );
}
