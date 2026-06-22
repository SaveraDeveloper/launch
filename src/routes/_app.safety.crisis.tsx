import { createFileRoute } from "@tanstack/react-router";
import { ScreenScaffold, Section, Placeholder, ActionList } from "@/components/ScreenScaffold";

export const Route = createFileRoute("/_app/safety/crisis")({ component: () => (
  <ScreenScaffold part="Part 15" title="You're not alone" subtitle="If you're in crisis, please reach out now." backTo="/safety">
    <Section title="Immediate Help"><Placeholder label="Local emergency numbers · 24/7 helplines" /></Section>
    <ActionList items={[
      { label: "Call a Helpline", variant: "primary" },
      { label: "Text a Crisis Line", variant: "secondary" },
      { label: "Grounding Exercise", variant: "secondary", to: "/activities/breathing" },
    ]} />
  </ScreenScaffold>
) });
