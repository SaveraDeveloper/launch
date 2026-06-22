import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/assessment/processing")({ component: Page });
function Page() {
  const nav = useNavigate();
  useEffect(() => {
    const t = setTimeout(() => nav({ to: "/assessment/discovery" }), 2000);
    return () => clearTimeout(t);
  }, [nav]);
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <div className="h-12 w-12 animate-spin rounded-full border-2 border-border border-t-primary" />
      <p className="mt-6 text-lg">Understanding your challenges...</p>
      <p className="mt-1 text-sm text-muted-foreground">Identifying patterns. Discovering contributing factors.</p>
    </div>
  );
}
