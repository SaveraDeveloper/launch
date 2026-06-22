import { Outlet, Link, useRouterState } from "@tanstack/react-router";
import { Home, Compass, LineChart, Sparkles, User } from "lucide-react";

const tabs = [
  { to: "/home", label: "Home", Icon: Home },
  { to: "/experiences", label: "Explore", Icon: Compass },
  { to: "/tracking", label: "Tracking", Icon: LineChart },
  { to: "/companion", label: "Companion", Icon: Sparkles },
  { to: "/profile", label: "Profile", Icon: User },
];

export function AppShell() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <div className="min-h-screen pb-24">
      <Outlet />
      <nav className="fixed bottom-0 left-0 right-0 border-t border-border bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-2xl items-center justify-between px-4 py-2">
          {tabs.map(({ to, label, Icon }) => {
            const active = pathname === to || pathname.startsWith(to + "/");
            return (
              <Link
                key={to}
                to={to}
                className={`flex flex-1 flex-col items-center gap-1 rounded-lg px-2 py-2 text-xs ${
                  active ? "text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon className="h-5 w-5" />
                {label}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
