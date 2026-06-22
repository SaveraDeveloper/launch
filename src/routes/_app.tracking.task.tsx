import { createFileRoute } from "@tanstack/react-router";
import { Section, Placeholder, ActionList } from "@/components/ScreenScaffold";

export const Route = createFileRoute("/_app/tracking/task")({ component: () => (
  <div className="space-y-6">
    <Section title="Tasks"><Placeholder label="Task list with due dates" /></Section>
    <ActionList items={[{label:"Add Task",variant:"primary"}]} />
  </div>
) });
