import { createFileRoute, Link } from "@tanstack/react-router";
import { ScreenScaffold, Section, ActionList } from "@/components/ScreenScaffold";
import { Bell, ShieldAlert } from "lucide-react";

export const Route = createFileRoute("/_app/home")({
  head: () => ({ meta: [{ title: "Home — Aroha" }] }),
  component: Page,
});
function Page() {
  return (
    <div>
      <div className="mx-auto flex w-full max-w-2xl items-center justify-between px-5 pt-6">
        <div>
          <p className="text-xs uppercase tracking-widest text-muted-foreground">Today</p>
          <h1 className="text-2xl font-semibold">Good evening</h1>
        </div>
        <div className="flex gap-2">
          <Link to="/notifications" className="rounded-full border border-border p-2 hover:bg-accent"><Bell className="h-4 w-4" /></Link>
          <Link to="/safety" className="rounded-full border border-border p-2 hover:bg-accent"><ShieldAlert className="h-4 w-4" /></Link>
        </div>
      </div>
      <ScreenScaffold title="" >
        <Section title="Daily Check-In">
          <p className="text-foreground">How are you feeling today?</p>
          <ActionList items={[{ label: "Check In", variant: "primary", to: "/check-in" }]} />
        </Section>
        <Section title="Personalized Insight">
          <p className="text-sm text-muted-foreground">A short insight derived from your patterns will appear here.</p>
          <ActionList items={[{ label: "View Insights", variant: "secondary", to: "/insights" }]} />
        </Section>
        <Section title="Active Experience">
          <Link to="/experiences/$id/active" params={{ id: "thought-lab" }} className="block rounded-xl bg-primary px-4 py-3 text-center text-sm font-medium text-primary-foreground hover:bg-primary/90">
            Continue Experience
          </Link>
          <Link to="/experiences" className="mt-2 block rounded-xl px-4 py-3 text-center text-sm text-muted-foreground hover:bg-accent/50">
            Browse Experiences
          </Link>
        </Section>
        <Section title="Recommended Activities">
          <Link to="/activities/$id" params={{ id: "breathing" }} className="block rounded-xl bg-secondary px-4 py-3 text-sm hover:bg-accent">5-min Breathing</Link>
          <Link to="/activities/$id" params={{ id: "reframe" }} className="block rounded-xl bg-secondary px-4 py-3 text-sm hover:bg-accent">Thought Reframe</Link>
        </Section>
        <Section title="Quick Actions">
          <div className="grid grid-cols-2 gap-2">
            <Link to="/companion" className="rounded-xl bg-secondary px-4 py-3 text-sm hover:bg-accent">AI Companion</Link>
            <Link to="/wellbeing" className="rounded-xl bg-secondary px-4 py-3 text-sm hover:bg-accent">Wellbeing Check</Link>
            <Link to="/tracking/mood" className="rounded-xl bg-secondary px-4 py-3 text-sm hover:bg-accent">Track Mood</Link>
            <Link to="/progress" className="rounded-xl bg-secondary px-4 py-3 text-sm hover:bg-accent">View Progress</Link>
          </div>
        </Section>
      </ScreenScaffold>
    </div>
  );
}
