import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [{ title: "Aroha" }, { name: "description", content: "Understand yourself. Take action. Grow." }] }),
  component: Splash,
});

function Splash() {
  const navigate = useNavigate();
  useEffect(() => {
    const t = setTimeout(() => navigate({ to: "/welcome" }), 1200);
    return () => clearTimeout(t);
  }, [navigate]);
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-navy-deep via-background to-background">
      <div className="animate-in fade-in duration-1000 text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/20 ring-1 ring-primary/30">
          <span className="text-3xl font-semibold tracking-tight text-foreground">a</span>
        </div>
        <p className="mt-4 text-sm uppercase tracking-[0.4em] text-muted-foreground">aroha</p>
      </div>
    </div>
  );
}
