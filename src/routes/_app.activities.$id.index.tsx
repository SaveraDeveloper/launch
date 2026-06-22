import { createFileRoute, Link } from "@tanstack/react-router";
import { ScreenScaffold, Section, Placeholder } from "@/components/ScreenScaffold";

export const Route = createFileRoute("/_app/activities/$id/")({ component: Page });
function Page() {
  const { id } = Route.useParams();
  return (
    <ScreenScaffold part="Part 7 · Activity Detail" title={id.replace("-", " ")} backTo="/home">
      <Section title="Overview"><Placeholder label="5 minutes · evidence-based · solo" /></Section>
      <Section title="Instructions"><Placeholder label="Step-by-step guidance" /></Section>
      <Link to="/activities/$id/active" params={{ id }} className="block rounded-xl bg-primary px-4 py-3 text-center text-primary-foreground">Start Activity</Link>
    </ScreenScaffold>
  );
}
