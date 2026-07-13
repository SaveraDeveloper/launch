import { createFileRoute, redirect } from "@tanstack/react-router";

// Legacy route — challenges was folded into /onboarding/support + /onboarding/goals.
export const Route = createFileRoute("/onboarding/challenges")({
  beforeLoad: () => { throw redirect({ to: "/onboarding/support" }); },
  component: () => null,
});
