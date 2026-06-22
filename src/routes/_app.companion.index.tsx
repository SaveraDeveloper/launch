import { createFileRoute } from "@tanstack/react-router";
import { ScreenScaffold, Section, ActionList } from "@/components/ScreenScaffold";

export const Route = createFileRoute("/_app/companion/")({ component: Page });
function Page() {
  return (
    <ScreenScaffold part="Part 11 · AI Companion" title="Your Companion" subtitle="A supportive space to think things through.">
      <Section title="Start">
        <ActionList items={[
          { label: "Open Chat", variant: "primary", to: "/companion/chat" },
          { label: "Reflection Session", variant: "secondary", to: "/companion/reflection" },
        ]} />
      </Section>
      <Section title="Suggested Prompts">
        {["I'm overwhelmed today","Help me reframe a thought","Reflect on this week"].map((p)=>(
          <div key={p} className="rounded-lg bg-secondary px-4 py-3 text-sm">{p}</div>
        ))}
      </Section>
    </ScreenScaffold>
  );
}
