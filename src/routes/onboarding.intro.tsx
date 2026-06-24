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
    <div className="relative min-h-screen w-full overflow-hidden bg-aroha-warm text-white">
      <div className="relative z-10 flex min-h-screen flex-col px-6 pt-14 pb-10">
        {/* top bar: back + next */}
        <div className="flex items-center justify-between">
          <Link to="/welcome" className="text-sm text-white/80">←</Link>
          <button
            type="button"
            onClick={() => nav({ to: "/onboarding/location" })}
            className="text-sm font-semibold text-white"
          >
            Next →
          </button>
        </div>

        <h1 className="mt-4 text-center font-seasons text-[40px] leading-[1.05] animate-flicker">
          Let's get to know<br />you
        </h1>
        <p className="mt-4 text-center text-[15px] text-white/90">
          Aroha personalizes your journey through<br />experiences, activities, and insights.
        </p>

        {/* White card */}
        <div className="mt-7 rounded-[28px] bg-white/95 p-6 text-[#1a0b2e] shadow-xl shadow-black/20">
          <form
            className="flex flex-col gap-4"
            onSubmit={(e) => { e.preventDefault(); nav({ to: "/onboarding/location" }); }}
          >
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[#1a0b2e]">Name:</label>
              <input className="aroha-input" placeholder="Ex: John" value={form.name} onChange={set("name")} />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-[#1a0b2e]">Age:</label>
              <select className="aroha-input appearance-none" value={form.age} onChange={set("age")}>
                <option value="" disabled>Select your age</option>
                {ages.map((a) => <option key={a} value={a}>{a}</option>)}
              </select>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-[#1a0b2e]">Email/Phone Number:</label>
              <input className="aroha-input" placeholder="Ex: john@gmail.com" value={form.email} onChange={set("email")} />
            </div>

            <div className="my-2 flex items-center gap-3 text-xs text-[#1a0b2e]/50">
              <div className="h-px flex-1 bg-[#1a0b2e]/15" /> Or <div className="h-px flex-1 bg-[#1a0b2e]/15" />
            </div>

            <button
              type="button"
              className="flex items-center justify-center gap-2 rounded-full border border-[#1a0b2e]/15 py-3 font-semibold text-[#1a0b2e]"
            >
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-white text-[13px] font-bold">G</span>
              Continue with Google
            </button>
            <button
              type="button"
              className="flex items-center justify-center gap-2 rounded-full border border-[#1a0b2e]/15 py-3 font-semibold text-[#1a0b2e]"
            >
              <span className="text-lg"></span> Continue with Apple
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
