import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/onboarding/intro")({
  head: () => ({ meta: [{ title: "Let's get to know you — Aroha" }] }),
  component: Page,
});

const ages = Array.from({ length: 88 }, (_, i) => 13 + i);

function Page() {
  const nav = useNavigate();
  const [form, setForm] = useState({ name: "", age: "", email: "", phone: "" });
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  return (
    <div className="aroha-mobile-screen relative overflow-hidden bg-aroha-warm text-white">
      <div className="relative z-10 flex min-h-svh flex-col px-6 pt-11 pb-10">
        <div className="flex items-center justify-between">
          <Link to="/welcome" className="text-base text-white/85">←</Link>
          <span />
        </div>

        <h1 className="mt-3 text-center font-seasons text-[38px] font-light leading-[1.1] tracking-tight animate-flicker">
          Let's get to know<br />you
        </h1>
        <p className="mx-auto mt-3 max-w-[290px] text-center text-[13px] font-light leading-[1.55] text-white/85">
          Aroha personalizes your journey through<br />experiences, activities, and insights.
        </p>

        {/* White card */}
        <div className="mt-6 rounded-[28px] bg-white/95 p-6 text-[#1a0b2e] shadow-xl shadow-black/20">
          <form
            className="flex flex-col gap-4"
            onSubmit={(e) => { e.preventDefault(); nav({ to: "/onboarding/location" }); }}
          >
            <div>
              <label className="mb-1.5 block text-[13px] font-medium tracking-wide text-[#1a0b2e]/80">Name</label>
              <input className="aroha-input" placeholder="Ex: John" value={form.name} onChange={set("name")} />
            </div>

            <div>
              <label className="mb-1.5 block text-[13px] font-medium tracking-wide text-[#1a0b2e]/80">Age</label>
              <select className="aroha-input appearance-none" value={form.age} onChange={set("age")}>
                <option value="" disabled>Select your age</option>
                {ages.map((a) => <option key={a} value={a}>{a}</option>)}
              </select>
            </div>

            <div>
              <label className="mb-1.5 block text-[13px] font-medium tracking-wide text-[#1a0b2e]/80">Email / Phone</label>
              <input className="aroha-input" placeholder="Ex: john@gmail.com" value={form.email} onChange={set("email")} />
            </div>

            <div className="my-1 flex items-center gap-3 text-[11px] uppercase tracking-[0.18em] text-[#1a0b2e]/45">
              <div className="h-px flex-1 bg-[#1a0b2e]/15" /> Or <div className="h-px flex-1 bg-[#1a0b2e]/15" />
            </div>

            <button
              type="button"
              className="flex items-center justify-center gap-2 rounded-full border border-[#1a0b2e]/15 py-3 text-[14px] font-medium text-[#1a0b2e]"
            >
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-white text-[13px] font-bold">G</span>
              Continue with Google
            </button>
            <button
              type="button"
              className="flex items-center justify-center gap-2 rounded-full border border-[#1a0b2e]/15 py-3 text-[14px] font-medium text-[#1a0b2e]"
            >
               Continue with Apple
            </button>

            <button
              type="submit"
              className="mt-3 rounded-full bg-gradient-to-r from-[#7a3cbf] via-[#e35a8a] to-[#f6a85a] py-3.5 text-[13px] font-bold tracking-[0.18em] text-white shadow-lg shadow-black/20"
            >
              NEXT
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
