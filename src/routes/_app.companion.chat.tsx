import { createFileRoute } from "@tanstack/react-router";
import { ScreenScaffold, Placeholder } from "@/components/ScreenScaffold";

export const Route = createFileRoute("/_app/companion/chat")({ component: () => (
  <ScreenScaffold part="Part 11 · AI Chat" title="Chat" backTo="/companion">
    <div className="space-y-3">
      <Placeholder label="Companion message bubble" />
      <Placeholder label="Your message bubble" />
    </div>
    <div className="sticky bottom-24 mt-4 flex gap-2">
      <input className="flex-1 rounded-xl border border-border bg-input px-4 py-3 text-sm" placeholder="Type a message..." />
      <button className="rounded-xl bg-primary px-4 py-3 text-sm font-medium text-primary-foreground">Send</button>
    </div>
  </ScreenScaffold>
) });
