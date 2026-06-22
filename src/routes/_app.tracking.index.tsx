import { createFileRoute } from "@tanstack/react-router";
import { Section, Placeholder } from "@/components/ScreenScaffold";

export const Route = createFileRoute("/_app/tracking/")({ component: () => (
  <Section title="Tracking Dashboard"><Placeholder label="Summary across mood, habits, tasks" /></Section>
) });
