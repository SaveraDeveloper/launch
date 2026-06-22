import { createFileRoute } from "@tanstack/react-router";
import { ScreenScaffold, Placeholder } from "@/components/ScreenScaffold";

export const Route = createFileRoute("/_app/resources/$id")({ component: () => {
  const { id } = Route.useParams();
  return (
    <ScreenScaffold part="Part 12 · Resource" title={id.replaceAll("-"," ")} backTo="/resources">
      <Placeholder label="Article body / video / audio" />
      <div className="flex gap-2">
        <button className="flex-1 rounded-xl bg-primary px-4 py-3 text-primary-foreground">Save</button>
        <button className="flex-1 rounded-xl border border-border px-4 py-3">Share</button>
      </div>
    </ScreenScaffold>
  );
} });
