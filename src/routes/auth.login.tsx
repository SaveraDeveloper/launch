import { createFileRoute } from "@tanstack/react-router";
import { ScreenScaffold, Section, Placeholder, ActionList } from "@/components/ScreenScaffold";

export const Route = createFileRoute("/auth/login")({ component: Page });
function Page() {
  return (
    <ScreenScaffold part="Part 2 · Authentication" title="Welcome Back" subtitle="Log in to continue your journey." backTo="/welcome">
      <Section title="Form Fields">
        <Placeholder label="Email" />
        <Placeholder label="Password" />
      </Section>
      <Section title="Alternative Login">
        <Placeholder label="Continue With Google" />
      </Section>
      <ActionList items={[
        { label: "Log In", variant: "primary", to: "/home" },
        { label: "Forgot password?", variant: "ghost", to: "/auth/forgot-password" },
        { label: "Don't have an account? Sign up", variant: "ghost", to: "/auth/signup" },
      ]} />
    </ScreenScaffold>
  );
}
