import { createFileRoute } from "@tanstack/react-router";
import { ScreenScaffold, Section, Placeholder } from "@/components/ScreenScaffold";

export const Route = createFileRoute("/_app/progress/achievements")({ component: () => (
  <ScreenScaffold part="Part 10" title="Achievements" backTo="/progress">
    <Section title="Earned"><Placeholder label="Badge grid" /></Section>
    <Section title="Locked"><Placeholder label="Locked badge grid" /></Section>
  </ScreenScaffold>
) });
