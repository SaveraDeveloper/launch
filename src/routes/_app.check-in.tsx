import { createFileRoute } from "@tanstack/react-router";
import { ScreenScaffold, Section, Placeholder, ActionList } from "@/components/ScreenScaffold";

export const Route = createFileRoute("/_app/check-in")({ component: Page });
function Page() {
  return (
    <ScreenScaffold part="Part 5 · Daily Check-In" title="How are you today?" backTo="/home">
      <Section title="Mood">
        <div className="grid grid-cols-5 gap-2">
          {["😞","😕","😐","🙂","😄"].map((e) => (
            <button key={e} className="rounded-xl border border-border bg-card py-3 text-2xl hover:bg-accent">{e}</button>
          ))}
        </div>
      </Section>
      <Section title="Energy / Stress">
        <Placeholder label="Slider: low → high" />
      </Section>
      <Section title="Reflection">
        <Placeholder label="What's on your mind? (optional)" />
      </Section>
      <ActionList items={[{ label: "Save Check-In", variant: "primary", to: "/home" }]} />
    </ScreenScaffold>
  );
}
