import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/welcome")({
  head: () => ({ meta: [{ title: "Welcome — Aroha" }] }),
  component: Welcome,
});

function Welcome() {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-2xl flex-col justify-between px-6 py-12">
      <div />
      <div>
        <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/20 ring-1 ring-primary/30">
          <span className="text-2xl font-semibold">a</span>
        </div>
        <h1 className="text-4xl font-semibold leading-tight">
          A space that helps you understand yourself, navigate challenges, and build lasting wellbeing.
        </h1>
        <p className="mt-4 text-muted-foreground">
          Personalized experiences, activities, and insights designed for your growth.
        </p>
      </div>
      <div className="flex flex-col gap-3">
        <Link to="/onboarding/intro" className="rounded-xl bg-primary px-5 py-4 text-center font-medium text-primary-foreground hover:bg-primary/90">
          Get Started
        </Link>
        <Link to="/auth/login" className="rounded-xl border border-border px-5 py-4 text-center font-medium hover:bg-accent">
          I Already Have An Account
        </Link>
        <p className="mt-2 text-center text-xs text-muted-foreground">Privacy &amp; Terms</p>
      </div>
    </div>
  );
}
