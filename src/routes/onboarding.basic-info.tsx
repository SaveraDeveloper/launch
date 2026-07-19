import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { CoffeeScreen } from "@/components/CoffeeScreen";
import { saveOnboarding, readOnboarding } from "@/lib/userStore";

export const Route = createFileRoute("/onboarding/basic-info")({
  head: () => ({ meta: [{ title: "Get to know you — Savera" }] }),
  component: Page,
});

function Page() {
  const nav = useNavigate();
  const existing = readOnboarding();
  const [form, setForm] = useState({
    name: existing.name || "",
    dob: existing.dob || "",
    email: existing.email || "",
    phone: existing.phone || "",
    password: existing.password || "",
  });

  const set =
    (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    saveOnboarding(form);
    nav({ to: "/onboarding/location" });
  };

  return (
    <CoffeeScreen>
      <form onSubmit={submit} className="flex min-h-svh flex-col px-6 pt-11 pb-8">
        <div className="flex items-center justify-between">
          <Link to="/onboarding/intro" className="text-base text-white/90">←</Link>
        </div>

        <div className="mt-2 text-center">
          <h1 className="font-seasons text-[38px] font-light leading-[1.1] text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.55)]">
            Let us get to<br />know you
          </h1>
          <p className="mx-auto mt-3 max-w-[280px] text-[13px] font-light text-white/85">
            A few basics so Savera can start personalizing.
          </p>
        </div>

        <div className="mt-6 rounded-[28px] bg-[#f7ecc9]/95 p-5 text-[#3b2410] shadow-2xl shadow-black/30 backdrop-blur">
          <div className="flex flex-col gap-3.5">
            <Field label="What do I call you?">
              <input className="beige-input" placeholder="Ex: Priya" value={form.name} onChange={set("name")} required />
            </Field>
            <Field label="Date of Birth">
              <input type="date" className="beige-input" value={form.dob} onChange={set("dob")} required />
            </Field>
            <Field label="Email">
              <input type="email" className="beige-input" placeholder="you@example.com" value={form.email} onChange={set("email")} required />
            </Field>
            <Field label="Phone Number">
              <input type="tel" className="beige-input" placeholder="+91 98765 43210" value={form.phone} onChange={set("phone")} />
            </Field>
            <Field label="Password">
              <input type="password" className="beige-input" placeholder="Create a password" value={form.password} onChange={set("password")} required />
            </Field>
          </div>
        </div>

        <button
          type="submit"
          className="mt-auto rounded-full bg-white py-3.5 text-[13px] font-bold tracking-[0.22em] text-[#7a4a1d] shadow-lg shadow-black/40"
        >
          NEXT
        </button>
      </form>
    </CoffeeScreen>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-[11px] font-semibold uppercase tracking-[0.16em] text-[#7a4a1d]/85">{label}</span>
      {children}
    </label>
  );
}
