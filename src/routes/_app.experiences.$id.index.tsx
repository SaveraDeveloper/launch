import { createFileRoute, Link } from "@tanstack/react-router";
import { ScreenScaffold, Section, Placeholder } from "@/components/ScreenScaffold";

export const Route = createFileRoute("/_app/experiences/$id/")({ component: Page });
function Page() {
  const { id } = Route.useParams();
  return (
    <ScreenScaffold part="Part 6 · Experience Detail" title={id.replace("-", " ")} subtitle="A guided multi-step experience." backTo="/experiences">
      <Section title="Overview"><Placeholder label="Description, duration, difficulty" /></Section>
      <Section title="What you'll do"><Placeholder label="Modules / sessions list" /></Section>
      <Section title="Outcomes"><Placeholder label="What you'll learn / change" /></Section>
      <Link to="/experiences/$id/active" params={{ id }} className="block rounded-xl bg-primary px-4 py-3 text-center font-medium text-primary-foreground hover:bg-primary/90">
        Start Experience
      </Link>
    </ScreenScaffold>
  );
}
