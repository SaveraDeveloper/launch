import { createFileRoute, Link } from "@tanstack/react-router";
import { ScreenScaffold, Section } from "@/components/ScreenScaffold";

export const Route = createFileRoute("/_app/experiences/")({ component: Page });
function Page() {
  return (
    <ScreenScaffold part="Part 6 · Experience Library" title="Experiences">
      <Section title="Recommended for you">
        {["thought-lab", "calm-mind", "confidence-builder"].map((id) => (
          <Link key={id} to="/experiences/$id" params={{ id }} className="block rounded-xl border border-border bg-background/40 px-4 py-3 hover:bg-accent">
            <p className="font-medium capitalize">{id.replace("-", " ")}</p>
            <p className="text-xs text-muted-foreground">7-day guided experience</p>
          </Link>
        ))}
      </Section>
      <Section title="Browse by Category">
        <div className="grid grid-cols-2 gap-2 text-sm">
          {["Anxiety","Confidence","Focus","Sleep","Relationships","Burnout"].map((c) => (
            <div key={c} className="rounded-lg bg-secondary px-3 py-2">{c}</div>
          ))}
        </div>
      </Section>
    </ScreenScaffold>
  );
}
