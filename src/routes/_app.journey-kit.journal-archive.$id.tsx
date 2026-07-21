import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { JOURNALS, relativeDate } from "@/lib/journeyKitCatalog";

export const Route = createFileRoute("/_app/journey-kit/journal-archive/$id")({
  head: ({ loaderData }: { loaderData?: (typeof JOURNALS)[number] }) => ({
    meta: [{ title: loaderData ? `${loaderData.title} — Journal` : "Journal — Journey Kit" }],
  }),
  loader: ({ params }) => {
    const j = JOURNALS.find((x) => x.id === params.id);
    if (!j) throw notFound();
    return j;
  },
  notFoundComponent: () => (
    <div className="mx-auto w-full max-w-[430px] px-5 pt-16 text-center text-white">
      <p className="font-seasons text-[18px]">Journal not found.</p>
      <Link to="/journey-kit/journal-archive" className="mt-4 inline-block text-[13px] text-white/80 underline">
        Back to Archive
      </Link>
    </div>
  ),
  errorComponent: () => (
    <div className="mx-auto w-full max-w-[430px] px-5 pt-16 text-center text-white">Something went sideways.</div>
  ),
  component: Page,
});

function Page() {
  const j = Route.useLoaderData();
  return (
    <div className="mx-auto w-full max-w-[430px] px-5 pt-10 pb-10 animate-soft-in">
      <header className="mb-5 flex items-center gap-3">
        <Link
          to="/journey-kit/journal-archive"
          className="rounded-full border border-white/30 bg-white/20 p-2 backdrop-blur-xl"
        >
          <ArrowLeft className="h-4 w-4 text-white" />
        </Link>
        <h1 className="font-seasons text-[20px] font-light text-white">Journal</h1>
      </header>

      <article className="rounded-[26px] border border-white/40 bg-[#fdf6e5]/85 p-6 text-[#3b2e18] shadow-[0_10px_30px_rgba(0,0,0,0.35)] backdrop-blur-2xl">
        <p className="text-[10.5px] uppercase tracking-[0.18em] text-[#8a6a2c]">
          {relativeDate(j.date)} · {j.mood}
        </p>
        <h2 className="mt-1 font-seasons text-[26px] leading-tight">{j.title}</h2>
        <div className="mt-4 whitespace-pre-line font-body text-[14px] font-light leading-relaxed">
          {j.body}
        </div>
      </article>

      <p className="mt-4 text-center text-[11px] font-light text-white/60">
        Journals are authored in Café — kept safely here.
      </p>
    </div>
  );
}
