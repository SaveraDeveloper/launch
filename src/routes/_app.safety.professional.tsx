import { createFileRoute } from "@tanstack/react-router";
import { ScreenScaffold, Section, Placeholder } from "@/components/ScreenScaffold";

export const Route = createFileRoute("/_app/safety/professional")({ component: () => (
  <ScreenScaffold part="Part 15" title="Professional Support" backTo="/safety">
    <Section title="Find a therapist"><Placeholder label="Directory / search" /></Section>
    <Section title="Helplines"><Placeholder label="Localized list" /></Section>
  </ScreenScaffold>
) });
