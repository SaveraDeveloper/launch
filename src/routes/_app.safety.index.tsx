import { createFileRoute, Link } from "@tanstack/react-router";
import { ScreenScaffold, ActionList } from "@/components/ScreenScaffold";

export const Route = createFileRoute("/_app/safety/")({ component: () => (
  <ScreenScaffold part="Part 15 · Safety" title="Safety Center" subtitle="If you need help, we're here.">
    <ActionList items={[
      { label: "Crisis Support (immediate)", variant: "primary", to: "/safety/crisis" },
      { label: "Find Professional Support", variant: "secondary", to: "/safety/professional" },
    ]} />
    <Link to="/activities/$id" params={{ id: "breathing" }} className="block rounded-xl bg-secondary px-4 py-3 text-center text-sm hover:bg-accent">
      Grounding Activity
    </Link>
  </ScreenScaffold>
) });
