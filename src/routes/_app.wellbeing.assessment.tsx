import { createFileRoute } from "@tanstack/react-router";
import { ScreenScaffold, Section, Placeholder, ActionList } from "@/components/ScreenScaffold";

export const Route = createFileRoute("/_app/wellbeing/assessment")({ component: Page });
function Page() {
  return (
    <ScreenScaffold part="Part 8 · Wellbeing Assessment" title="Question 1 of 7" backTo="/wellbeing/select">
      <Placeholder label="Standardized assessment question" />
      <Section title="Response">
        {["Not at all","Several days","More than half","Nearly every day"].map((o)=>(<Placeholder key={o} label={o}/>))}
      </Section>
      <ActionList items={[{label:"Continue",variant:"primary",to:"/wellbeing/results"}]} />
    </ScreenScaffold>
  );
}
