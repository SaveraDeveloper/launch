import { Outlet, Link, useRouterState } from "@tanstack/react-router";
import { Backpack, Compass, Home, Coffee, User } from "lucide-react";
import apartment from "@/assets/ApartmentWithGirl.png.asset.json";

const tabs = [
  { to: "/experiences", label: "Journey Kit", Icon: Backpack },
  { to: "/experiences", label: "Explore", Icon: Compass },
  { to: "/home", label: "Home", Icon: Home, primary: true },
  { to: "/companion", label: "Cafe", Icon: Coffee },
  { to: "/profile", label: "Profile", Icon: User },
];

export function AppShell() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <div className="relative min-h-screen text-white">
      {/* Apartment background — no girl (blurred bottom via gradient) */}
      <div className="fixed inset-0 -z-10">
        <img src={apartment.url} alt="" aria-hidden className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/55 to-black/80" />
      </div>

      <div className="pb-32">
        <Outlet />
      </div>

      {/* Floating liquid-glass nav */}
      <nav className="fixed inset-x-0 bottom-4 z-40 flex justify-center px-4">
        <div className="relative flex w-full max-w-[420px] items-end justify-between rounded-full border border-white/20 bg-white/10 px-4 py-2 shadow-[0_10px_40px_rgba(0,0,0,0.45)] backdrop-blur-2xl">
          {tabs.map(({ to, label, Icon, primary }) => {
            const active = pathname === to || pathname.startsWith(to + "/");
            if (primary) {
              return (
                <Link
                  key={label}
                  to={to}
                  className="flex flex-col items-center"
                >
                  <span
                    className={`-mt-6 flex h-14 w-14 items-center justify-center rounded-full border shadow-[0_0_24px_rgba(255,200,120,0.55)] transition ${
                      active
                        ? "border-amber-200/70 bg-gradient-to-b from-amber-100/40 to-amber-300/25 text-amber-100"
                        : "border-white/25 bg-white/15 text-white"
                    }`}
                  >
                    <Icon className="h-6 w-6" strokeWidth={1.6} />
                  </span>
                  <span className={`mt-1 text-[11px] ${active ? "text-amber-100" : "text-white/80"}`}>
                    {label}
                  </span>
                </Link>
              );
            }
            return (
              <Link
                key={label}
                to={to}
                className={`flex flex-1 flex-col items-center gap-1 py-1 text-[11px] transition ${
                  active ? "text-white" : "text-white/70 hover:text-white"
                }`}
              >
                <Icon className="h-5 w-5" strokeWidth={1.5} />
                {label}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
