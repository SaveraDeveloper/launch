import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/onboarding/intro")({
  head: () => ({ meta: [{ title: "Let's get to know you — Aroha" }] }),
  component: Page,
});

const ages = Array.from({ length: 88 }, (_, i) => 13 + i); // 13..100

function Field({
  label, children,
}: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-white/80">{label}</span>
      {children}
    </label>
  );
}

const inputCls =
  "w-full rounded-xl border border-white/20 bg-white/5 px-4 py-3.5 text-white placeholder:text-white/40 outline-none focus:border-white/60 focus:bg-white/10 backdrop-blur";

function Page() {
  const nav = useNavigate();
  const [form, setForm] = useState({ name: "", age: "", email: "", phone: "" });
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  return (
    <div className="relative min-h-screen overflow-hidden bg-aroha-warm text-white">
      <div className="mx-auto flex min-h-screen w-full max-w-2xl flex-col px-6 pt-16 pb-12">
        <h1 className="font-display text-[40px] font-bold leading-[1.05] tracking-tight animate-flicker">
          Let's get to know you
        </h1>
        <p className="mt-3 text-white/80">
          Aroha personalizes your journey through experiences, activities, and insights.
        </p>

        <form
          className="mt-8 flex flex-col gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            nav({ to: "/onboarding/location" });
          }}
        >
          <Field label="Name">
            <input className={inputCls} placeholder="Ex: John" value={form.name} onChange={set("name")} required />
          </Field>

          <Field label="Age">
            <select
              className={`${inputCls} appearance-none`}
              value={form.age}
              onChange={set("age")}
              required
            >
              <option value="" disabled className="bg-[#2a1259]">Ex: dropdown — select your age</option>
              {ages.map((a) => (
                <option key={a} value={a} className="bg-[#2a1259]">{a}</option>
              ))}
            </select>
          </Field>

          <Field label="Email">
            <input className={inputCls} type="email" placeholder="Ex: john@gmail.com" value={form.email} onChange={set("email")} required />
          </Field>

          <Field label="Phone number">
            <input className={inputCls} placeholder="Ex: xxx-xxx-xxxx" value={form.phone} onChange={set("phone")} required />
          </Field>

          <button
            type="submit"
            className="mt-2 rounded-2xl bg-white px-5 py-4 text-center font-semibold text-[#3a1278] shadow-lg shadow-black/20 hover:bg-white/90"
          >
            Continue
          </button>
        </form>

        <div className="my-6 flex items-center gap-3 text-xs uppercase tracking-wider text-white/50">
          <div className="h-px flex-1 bg-white/20" /> or <div className="h-px flex-1 bg-white/20" />
        </div>

        <div className="flex flex-col gap-3">
          <button
            type="button"
            disabled
            className="cursor-not-allowed rounded-2xl border border-white/25 bg-white/10 px-5 py-4 font-medium text-white/90 opacity-80"
          >
            Continue with Google
          </button>
          <button
            type="button"
            disabled
            className="cursor-not-allowed rounded-2xl border border-white/25 bg-white/10 px-5 py-4 font-medium text-white/90 opacity-80"
          >
            Continue with Apple
          </button>
        </div>

        <Link to="/welcome" className="mt-8 self-center text-sm text-white/60 hover:text-white">← Back</Link>
      </div>
    </div>
  );
}
