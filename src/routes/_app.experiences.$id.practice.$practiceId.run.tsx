import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { PracticeRunner } from "@/components/PracticeRunner";

export const Route = createFileRoute("/_app/experiences/$id/practice/$practiceId/run")({
  head: () => ({ meta: [{ title: "Practice — Savera" }] }),
  component: Page,
});

function Page() {
  const { id, practiceId } = Route.useParams();
  const navigate = useNavigate();
  const exit = () => navigate({ to: "/experiences/$id/practice/$practiceId", params: { id, practiceId } });
  return <PracticeRunner practiceId={practiceId} onExit={exit} />;
}
