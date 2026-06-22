import { createFileRoute, Link } from "@tanstack/react-router";
import { ScreenScaffold, Section, Placeholder } from "@/components/ScreenScaffold";

export const Route = createFileRoute("/_app/experiences/$id/active")({ component: Page });
function Page() {
  const { id } = Route.useParams();
  return (
    <ScreenScaffold part="Part 6 · Active Experience" title="Session in progress" backTo={`/experiences/${id}`}>
      <Section title="Progress"><Placeholder label="Step 2 of 6 · progress bar" /></Section>
      <Section title="Content"><Placeholder label="Prompt / video / audio / reflection area" /></Section>
      <div className="flex gap-2">
        <button className="flex-1 rounded-xl border border-border px-4 py-3">Pause</button>
        <Link to="/experiences/$id/complete" params={{ id }} className="flex-1 rounded-xl bg-primary px-4 py-3 text-center text-primary-foreground">Continue</Link>
      </div>
    </ScreenScaffold>
  );
}
