import { createFileRoute, Link, useRouterState } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/tracking")({ component: Layout });

function Tab({ to, label }: { to: string; label: string }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const active = pathname === to;
  return (
    <Link to={to} className={`rounded-lg px-3 py-1.5 text-sm ${active ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:bg-accent"}`}>
      {label}
    </Link>
  );
}

function Layout(): ReactNode {
  return (
    <div className="mx-auto w-full max-w-2xl px-5 py-8">
      <p className="text-xs uppercase tracking-widest text-primary/80">Part 9 · Tracking & Insights</p>
      <h1 className="mt-2 text-3xl font-semibold">Tracking</h1>
      <div className="mt-6 flex flex-wrap gap-2">
        <Tab to="/tracking" label="Overview" />
        <Tab to="/tracking/mood" label="Mood" />
        <Tab to="/tracking/habit" label="Habits" />
        <Tab to="/tracking/task" label="Tasks" />
        <Tab to="/tracking/insights" label="Insights" />
      </div>
      <div className="mt-6"><Outlet /></div>
    </div>
  );
}
