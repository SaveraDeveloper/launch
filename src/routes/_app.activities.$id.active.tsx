import { createFileRoute, Link } from "@tanstack/react-router";
import { ScreenScaffold, Section, Placeholder } from "@/components/ScreenScaffold";

export const Route = createFileRoute("/_app/activities/$id/active")({ component: Page });
function Page() {
  const { id } = Route.useParams();
  return (
    <ScreenScaffold part="Part 7 · Activity" title="In progress" backTo={`/activities/${id}`}>
      <Section title="Guided Content"><Placeholder label="Timer / prompts / audio" /></Section>
      <Link to="/activities/$id/complete" params={{ id }} className="block rounded-xl bg-primary px-4 py-3 text-center text-primary-foreground">Complete</Link>
    </ScreenScaffold>
  );
}
