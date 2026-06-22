import { createFileRoute } from "@tanstack/react-router";
import { ScreenScaffold, Section, Placeholder } from "@/components/ScreenScaffold";

export const Route = createFileRoute("/_app/insights")({ component: Page });
function Page() {
  return (
    <ScreenScaffold part="Part 5 · Personalized Insights" title="Insights for you" backTo="/home">
      <Section title="Pattern Detected"><Placeholder label="You tend to feel more anxious on Sunday evenings." /></Section>
      <Section title="Suggested Action"><Placeholder label="Try the Sunday Reset experience." /></Section>
      <Section title="History"><Placeholder label="Previous insights list" /></Section>
    </ScreenScaffold>
  );
}
