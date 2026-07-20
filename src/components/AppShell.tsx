import { Outlet, Link, useRouterState } from "@tanstack/react-router";
import { Backpack, Compass, Home, Coffee, User } from "lucide-react";
import { apartmentByHour } from "@/lib/apartmentBg";

const tabs = [
  { to: "/experiences", label: "Journey Kit", Icon: Backpack },
  { to: "/experiences", label: "Explore", Icon: Compass },
  { to: "/home", label: "Home", Icon: Home },
  { to: "/companion", label: "Cafe", Icon: Coffee },
  { to: "/profile", label: "Profile", Icon: User },
];

export function AppShell() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const activeIndex = Math.max(
    0,
    tabs.findIndex(
      (t) => pathname === t.to || pathname.startsWith(t.to + "/"),
    ),
  );

  const bgUrl = apartmentByHour();

  // Per-route blur intensity
  let blurClass = "";
  let overlayClass = "bg-gradient-to-b from-black/40 via-black/55 to-black/80";
  if (pathname.startsWith("/experiences")) {
    blurClass = "blur-[6px] scale-105"; // ~25%
    overlayClass = "bg-black/45";
  } else if (pathname.startsWith("/profile")) {
    blurClass = "blur-[3px] scale-[1.03]"; // ~15%
    overlayClass = "bg-black/45";
  }

  return (
    <div className="relative min-h-full text-white">
      <div className="pointer-events-none sticky top-0 -mb-[100svh] h-svh w-full overflow-hidden">
        <img
          src={bgUrl}
          alt=""
          aria-hidden
          className={`h-full w-full object-cover transition-all duration-700 ${blurClass}`}
        />
        <div className={`absolute inset-0 ${overlayClass}`} />
      </div>

      <div className="relative pb-32">
        <Outlet />
      </div>

      <nav className="sticky bottom-4 z-40 flex justify-center px-4">
        <div className="relative flex w-full max-w-[420px] items-center justify-between rounded-full border border-white/25 bg-white/10 px-2 py-2 shadow-[0_10px_40px_rgba(0,0,0,0.45)] backdrop-blur-2xl">
          <span
            aria-hidden
            className="pointer-events-none absolute top-1 bottom-1 rounded-full border border-white/40 bg-white/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_6px_20px_rgba(0,0,0,0.25)] backdrop-blur-xl transition-[left,width,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{
              width: `calc((100% - 1rem) / ${tabs.length})`,
              left: `calc(0.5rem + ((100% - 1rem) / ${tabs.length}) * ${activeIndex})`,
            }}
          />
          {tabs.map(({ to, label, Icon }, idx) => {
            const active = idx === activeIndex;
            return (
              <Link
                key={label}
                to={to}
                className={`relative z-10 flex flex-1 flex-col items-center gap-1 py-1.5 text-[10.5px] transition-colors duration-300 ${
                  active ? "text-white" : "text-white/70 hover:text-white"
                }`}
              >
                <Icon
                  className="h-[22px] w-[22px] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                  style={{ transform: active ? "scale(1.08)" : "scale(1)" }}
                  strokeWidth={1.6}
                />
                <span className="leading-none">{label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
