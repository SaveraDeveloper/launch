import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ThoughtLabRunner } from "@/components/ThoughtLabRunner";
import { GenericJourneyRunner } from "@/components/GenericJourneyRunner";

export const Route = createFileRoute("/_app/experiences/$id/journey/$journeyId/run")({
  head: () => ({ meta: [{ title: "Journey — Savera" }] }),
  component: Page,
});

function Page() {
  const { id, journeyId } = Route.useParams();
  const navigate = useNavigate();
  const exit = () => navigate({ to: "/experiences/$id/journey/$journeyId", params: { id, journeyId } });

  if (journeyId === "thought-lab") return <ThoughtLabRunner onExit={exit} />;
  return <GenericJourneyRunner journeyId={journeyId} onExit={exit} />;
}
