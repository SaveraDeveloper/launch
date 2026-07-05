import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { CoffeeScreen } from "@/components/CoffeeScreen";

export const Route = createFileRoute("/assessment/processing")({ component: Page });

function Page() {
  const nav = useNavigate();
  useEffect(() => {
    const t = setTimeout(() => nav({ to: "/assessment/discovery" }), 2000);
    return () => clearTimeout(t);
  }, [nav]);
  return (
    <CoffeeScreen>
      <div className="flex min-h-svh flex-col items-center justify-center px-6 text-center">
        <div className="h-12 w-12 animate-spin rounded-full border-2 border-white/40 border-t-white" />
        <p className="mt-6 font-seasons text-[22px] text-white">Understanding your reflections…</p>
        <p className="mt-1 text-sm text-white/80">Finding patterns. Building your profile.</p>
      </div>
    </CoffeeScreen>
  );
}
