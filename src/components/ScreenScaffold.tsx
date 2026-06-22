import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";

interface ScreenScaffoldProps {
  part?: string;
  title: string;
  subtitle?: string;
  backTo?: string;
  children?: ReactNode;
}

export function ScreenScaffold({ part, title, subtitle, backTo, children }: ScreenScaffoldProps) {
  return (
    <div className="mx-auto w-full max-w-2xl px-5 py-8">
      {backTo && (
        <Link
          to={backTo}
          className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ChevronLeft className="h-4 w-4" /> Back
        </Link>
      )}
      {part && (
        <p className="mb-2 text-xs font-medium uppercase tracking-widest text-primary/80">{part}</p>
      )}
      <h1 className="text-3xl font-semibold text-foreground">{title}</h1>
      {subtitle && <p className="mt-2 text-muted-foreground">{subtitle}</p>}
      <div className="mt-8 space-y-6">{children}</div>
    </div>
  );
}

export function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="rounded-2xl border border-border bg-card p-5">
      <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
        {title}
      </h2>
      <div className="space-y-2">{children}</div>
    </section>
  );
}

export function Placeholder({ label }: { label: string }) {
  return (
    <div className="rounded-lg border border-dashed border-border bg-background/40 px-4 py-3 text-sm text-muted-foreground">
      {label}
    </div>
  );
}

export function ActionList({ items }: { items: Array<{ label: string; to?: string; variant?: "primary" | "secondary" | "ghost" }> }) {
  return (
    <div className="flex flex-col gap-2">
      {items.map((it) => {
        const base = "w-full rounded-xl px-4 py-3 text-sm font-medium text-left transition-colors";
        const styles =
          it.variant === "primary"
            ? "bg-primary text-primary-foreground hover:bg-primary/90"
            : it.variant === "ghost"
              ? "text-muted-foreground hover:bg-accent/50"
              : "bg-secondary text-secondary-foreground hover:bg-accent";
        return it.to ? (
          <Link key={it.label} to={it.to} className={`${base} ${styles}`}>
            {it.label}
          </Link>
        ) : (
          <button key={it.label} className={`${base} ${styles}`}>{it.label}</button>
        );
      })}
    </div>
  );
}
