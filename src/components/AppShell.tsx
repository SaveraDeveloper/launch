import { Outlet, Link, useRouterState } from "@tanstack/react-router";
import { useApartmentBg } from "@/hooks/useApartmentBg";
import kitIcon from "@/assets/Kit.png.asset.json";
import exploreIcon from "@/assets/MagnifyingGlass.png.asset.json";
import homeIcon from "@/assets/Home.png.asset.json";
import cafeIcon from "@/assets/PixelatedCoffee.png.asset.json";
import profileIcon from "@/assets/Profile.png.asset.json";

const tabs = [
  { to: "/journey-kit", label: "Kit", icon: kitIcon.url, match: "/journey-kit" },
  { to: "/experiences", label: "Explore", icon: exploreIcon.url, match: "/experiences" },
  { to: "/home", label: "Home", icon: homeIcon.url, match: "/home" },
  { to: "/companion", label: "Cafe", icon: cafeIcon.url, match: "/companion" },
  { to: "/profile", label: "Profile", icon: profileIcon.url, match: "/profile" },
] as const;

export function AppShell() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const activeIndex = Math.max(
    0,
    tabs.findIndex(
      (t) => pathname === t.match || pathname.startsWith(t.match + "/"),
    ),
  );

  const bgUrl = useApartmentBg();

  let blurClass = "";
  let overlayClass = "bg-gradient-to-b from-black/40 via-black/55 to-black/80";
  if (pathname.startsWith("/experiences")) {
    blurClass = "blur-[6px] scale-105";
    overlayClass = "bg-black/45";
  } else if (pathname.startsWith("/profile")) {
    blurClass = "blur-[3px] scale-[1.03]";
    overlayClass = "bg-black/45";
  } else if (pathname.startsWith("/journey-kit")) {
    blurClass = "blur-[4px] scale-[1.04]";
    overlayClass = "bg-black/50";
  }

  return (
    <div className="relative flex min-h-svh flex-col text-white">
      <div className="pointer-events-none sticky top-0 -mb-[100svh] h-svh w-full overflow-hidden">
        <img
          src={bgUrl}
          alt=""
          aria-hidden
          className={`h-full w-full object-cover transition-all duration-700 ${blurClass}`}
        />
        <div className={`absolute inset-0 ${overlayClass}`} />
      </div>

      <div className="relative flex-1 pb-32">
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
          {tabs.map(({ to, label, icon }, idx) => {
            const active = idx === activeIndex;
            return (
              <Link
                key={label}
                to={to}
                aria-label={label}
                title={label}
                className="relative z-10 flex flex-1 flex-col items-center justify-center py-1.5"
              >
                <img
                  src={icon}
                  alt=""
                  aria-hidden
                  className="h-[38px] w-[38px] object-contain transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                  style={{ transform: active ? "scale(1.12)" : "scale(1)", opacity: active ? 1 : 0.7 }}
                />
              </Link>
            );
          })}

        </div>
      </nav>
    </div>
  );
}
