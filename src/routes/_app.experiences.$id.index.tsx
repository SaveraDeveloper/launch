import { createFileRoute } from "@tanstack/react-router";
import { ScreenScaffold, Section, Placeholder, ActionList } from "@/components/ScreenScaffold";

export const Route = createFileRoute("/_app/experiences/$id/")({ component: Page });
function Page() {
  const { id } = Route.useParams();
  return (
    <ScreenScaffold part="Part 6 · Experience Detail" title={id.replace("-", " ")} subtitle="A guided multi-step experience." backTo="/experiences">
      <Section title="Overview"><Placeholder label="Description, duration, difficulty" /></Section>
      <Section title="What you'll do"><Placeholder label="Modules / sessions list" /></Section>
      <Section title="Outcomes"><Placeholder label="What you'll learn / change" /></Section>
      <ActionList items={[{ label: "Start Experience", variant: "primary", to: "/experiences/$id/active", params: { id } } as any]} />
    </ScreenScaffold>
  );
}
