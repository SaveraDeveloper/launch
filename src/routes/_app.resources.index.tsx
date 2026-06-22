import { createFileRoute, Link } from "@tanstack/react-router";
import { ScreenScaffold, Section } from "@/components/ScreenScaffold";

export const Route = createFileRoute("/_app/resources/")({ component: Page });
function Page() {
  return (
    <ScreenScaffold part="Part 12 · Resource Library" title="Resources">
      <Section title="Featured">
        {["managing-overthinking","sleep-hygiene","exam-stress"].map((id) => (
          <Link key={id} to="/resources/$id" params={{ id }} className="block rounded-xl border border-border bg-background/40 px-4 py-3 hover:bg-accent">
            <p className="font-medium capitalize">{id.replaceAll("-"," ")}</p>
            <p className="text-xs text-muted-foreground">Article · 5 min</p>
          </Link>
        ))}
      </Section>
      <Link to="/resources/saved" className="block rounded-xl bg-secondary px-4 py-3 text-center text-sm">Saved Resources</Link>
    </ScreenScaffold>
  );
}
