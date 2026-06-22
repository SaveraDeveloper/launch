import { createFileRoute } from "@tanstack/react-router";
import { Section, Placeholder, ActionList } from "@/components/ScreenScaffold";

export const Route = createFileRoute("/_app/tracking/mood")({ component: () => (
  <div className="space-y-6">
    <Section title="Today's Mood"><Placeholder label="Emoji selector + intensity slider" /></Section>
    <Section title="History"><Placeholder label="7-day chart" /></Section>
    <ActionList items={[{label:"Log Mood",variant:"primary"}]} />
  </div>
) });
