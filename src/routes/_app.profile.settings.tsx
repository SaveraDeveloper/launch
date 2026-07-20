import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const Route = createFileRoute("/_app/profile/settings")({
  head: () => ({ meta: [{ title: "Settings — Savera" }] }),
  component: Page,
});

const GROUPS: { title: string; items: { label: string; to?: string }[] }[] = [
  {
    title: "Preferences",
    items: [
      { label: "Notifications", to: "/settings/notifications" },
      { label: "Reminders", to: "/settings/reminders" },
      { label: "Appearance" },
      { label: "Accessibility" },
      { label: "Language" },
    ],
  },
  {
    title: "Privacy",
    items: [
      { label: "Privacy", to: "/settings/privacy" },
      { label: "Data" },
      { label: "Journal Privacy" },
      { label: "Export Data" },
      { label: "Delete Account" },
    ],
  },
  {
    title: "Account",
    items: [
      { label: "Email" },
      { label: "Subscription" },
      { label: "Help" },
      { label: "About Savera" },
      { label: "Log Out", to: "/welcome" },
    ],
  },
];

function Page() {
  return (
    <div className="mx-auto w-full max-w-[430px] px-5 pt-10 pb-4 animate-soft-in">
      <Link to="/profile" className="mb-4 inline-flex items-center gap-1 text-[13px] text-white/85">
        <ChevronLeft className="h-4 w-4" /> Profile
      </Link>

      <header className="mb-5">
        <h1 className="font-seasons text-[28px] text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.55)]">
          ⚙️ Preferences
        </h1>
        <p className="mt-1 text-[12.5px] font-light text-white/80">Simple, spacious controls.</p>
      </header>

      {GROUPS.map((g) => (
        <section
          key={g.title}
          className="mb-3 rounded-[24px] border border-white/25 bg-white/10 p-2 shadow-[0_10px_30px_rgba(0,0,0,0.3)] backdrop-blur-2xl"
        >
          <h2 className="px-3 pt-2 pb-1 text-[10.5px] font-semibold uppercase tracking-[0.2em] text-white/70">
            {g.title}
          </h2>
          <div className="flex flex-col">
            {g.items.map((it, i) =>
              it.to ? (
                <Link
                  key={it.label}
                  to={it.to}
                  className={`flex items-center justify-between px-3 py-3 text-[13px] font-light text-white/95 hover:bg-white/5 ${
                    i > 0 ? "border-t border-white/10" : ""
                  }`}
                >
                  {it.label}
                  <ChevronRight className="h-4 w-4 text-white/60" />
                </Link>
              ) : (
                <button
                  key={it.label}
                  className={`flex items-center justify-between px-3 py-3 text-left text-[13px] font-light text-white/95 hover:bg-white/5 ${
                    i > 0 ? "border-t border-white/10" : ""
                  }`}
                >
                  {it.label}
                  <ChevronRight className="h-4 w-4 text-white/60" />
                </button>
              ),
            )}
          </div>
        </section>
      ))}
    </div>
  );
}
