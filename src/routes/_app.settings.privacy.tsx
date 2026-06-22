import { createFileRoute } from "@tanstack/react-router";
import { ScreenScaffold, Section, Placeholder } from "@/components/ScreenScaffold";

export const Route = createFileRoute("/_app/settings/privacy")({ component: () => (
  <ScreenScaffold part="Part 14 · Privacy" title="Privacy" backTo="/settings">
    <Section title="Data"><Placeholder label="Data sharing toggles" /></Section>
    <Section title="Account"><Placeholder label="Download data · Delete account" /></Section>
  </ScreenScaffold>
) });
