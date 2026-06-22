import { createFileRoute } from "@tanstack/react-router";
import { ScreenScaffold, Section, Placeholder, ActionList } from "@/components/ScreenScaffold";

export const Route = createFileRoute("/_app/companion/reflection")({ component: () => (
  <ScreenScaffold part="Part 11 · Reflection" title="Reflection Session" backTo="/companion">
    <Section title="Guided Prompts"><Placeholder label="What's been weighing on you?" /></Section>
    <Section title="Your Reflection"><Placeholder label="Text area" /></Section>
    <ActionList items={[{label:"Save Reflection",variant:"primary",to:"/companion"}]} />
  </ScreenScaffold>
) });
