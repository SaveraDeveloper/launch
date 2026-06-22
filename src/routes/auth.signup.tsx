import { createFileRoute } from "@tanstack/react-router";
import { ScreenScaffold, Section, Placeholder, ActionList } from "@/components/ScreenScaffold";

export const Route = createFileRoute("/auth/signup")({ component: Page });
function Page() {
  return (
    <ScreenScaffold part="Part 2 · Authentication" title="Create Your Account" subtitle="Begin your growth journey." backTo="/welcome">
      <Section title="Form Fields">
        <Placeholder label="Full Name (required)" />
        <Placeholder label="Email (validated)" />
        <Placeholder label="Password (meets requirements)" />
      </Section>
      <Section title="Alternative">
        <Placeholder label="Continue With Google" />
      </Section>
      <ActionList items={[
        { label: "Create Account", variant: "primary", to: "/onboarding/intro" },
        { label: "Already have an account? Log in", variant: "ghost", to: "/auth/login" },
      ]} />
      <p className="text-center text-xs text-muted-foreground">By signing up you agree to the Terms & Privacy Policy.</p>
    </ScreenScaffold>
  );
}
