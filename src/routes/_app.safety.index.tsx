import { createFileRoute } from "@tanstack/react-router";
import { ScreenScaffold, ActionList } from "@/components/ScreenScaffold";

export const Route = createFileRoute("/_app/safety/")({ component: () => (
  <ScreenScaffold part="Part 15 · Safety" title="Safety Center" subtitle="If you need help, we're here.">
    <ActionList items={[
      { label: "Crisis Support (immediate)", variant: "primary", to: "/safety/crisis" },
      { label: "Find Professional Support", variant: "secondary", to: "/safety/professional" },
      { label: "Grounding Activity", variant: "secondary", to: "/activities/breathing" },
    ]} />
  </ScreenScaffold>
) });
