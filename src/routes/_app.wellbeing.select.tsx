import { createFileRoute, Link } from "@tanstack/react-router";
import { ScreenScaffold, Section } from "@/components/ScreenScaffold";

export const Route = createFileRoute("/_app/wellbeing/select")({ component: Page });
function Page() {
  return (
    <ScreenScaffold part="Part 8 · Assessment Selection" title="Choose an assessment" backTo="/wellbeing">
      <Section title="Available">
        {["Anxiety (GAD-7)", "Depression (PHQ-9)", "Stress (PSS-10)", "Burnout"].map((n) => (
          <Link key={n} to="/wellbeing/assessment" className="block rounded-xl border border-border bg-background/40 px-4 py-3 hover:bg-accent">{n}</Link>
        ))}
      </Section>
    </ScreenScaffold>
  );
}
