import { createFileRoute } from "@tanstack/react-router";
import { ScreenScaffold, Section, Placeholder, ActionList } from "@/components/ScreenScaffold";

export const Route = createFileRoute("/auth/forgot-password")({ component: Page });
function Page() {
  return (
    <ScreenScaffold part="Part 2 · Authentication" title="Reset Your Password" subtitle="Enter your email and we'll send you a reset link." backTo="/auth/login">
      <Section title="Form">
        <Placeholder label="Email address" />
      </Section>
      <ActionList items={[
        { label: "Send Reset Link", variant: "primary" },
        { label: "Back to login", variant: "ghost", to: "/auth/login" },
      ]} />
    </ScreenScaffold>
  );
}
