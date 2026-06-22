import { createFileRoute } from "@tanstack/react-router";
import { ScreenScaffold, Placeholder } from "@/components/ScreenScaffold";

export const Route = createFileRoute("/_app/resources/saved")({ component: () => (
  <ScreenScaffold part="Part 12" title="Saved Resources" backTo="/resources">
    <Placeholder label="List of saved resources" />
  </ScreenScaffold>
) });
