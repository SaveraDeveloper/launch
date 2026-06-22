import { createFileRoute } from "@tanstack/react-router";
import { Section, Placeholder } from "@/components/ScreenScaffold";

export const Route = createFileRoute("/_app/tracking/insights")({ component: () => (
  <div className="space-y-6">
    <Section title="Patterns"><Placeholder label="Correlations between mood, habits, sleep" /></Section>
    <Section title="Recommendations"><Placeholder label="Suggested experiences" /></Section>
  </div>
) });
