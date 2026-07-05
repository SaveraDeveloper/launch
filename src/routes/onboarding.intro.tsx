import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import coffee from "@/assets/CoffeeShop.png.asset.json";
import coffeeGirl from "@/assets/CoffeeShopWithGirl.png.asset.json";

export const Route = createFileRoute("/onboarding/intro")({
  head: () => ({ meta: [{ title: "Welcome — Savera" }] }),
  component: Page,
});

type Mode = "choice" | "email";
const ages = Array.from({ length: 88 }, (_, i) => 13 + i);

function Page() {
  const nav = useNavigate();
  const [girlVisible, setGirlVisible] = useState(true);
  const [mode, setMode] = useState<Mode>("choice");
  const [form, setForm] = useState({ name: "", age: "", contact: "", password: "" });

  useEffect(() => {
    const t = setTimeout(() => setGirlVisible(false), 1400);
    return () => clearTimeout(t);
  }, []);

  const set = (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  return (
    <div className="aroha-mobile-screen relative overflow-hidden text-white">
      <img src={coffee.url} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover" />
      <img
        src={coffeeGirl.url}
        alt=""
        aria-hidden
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1400ms] ease-in-out ${
          girlVisible ? "opacity-100" : "opacity-0"
        }`}
      />
      <div className="pointer-events-none absolute inset-0 bg-black/40" />

      <div className="relative z-10 flex min-h-svh flex-col px-7 pt-14 pb-10">
        <h1 className="text-center font-seasons text-[30px] font-light leading-[1.2] text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.55)]">
          Welcome!<br />Let's get you settled in
        </h1>

        <div className="mt-auto">
          {mode === "choice" ? (
            <div
              className={`flex flex-col gap-3 transition-opacity duration-500 ${
                girlVisible ? "opacity-0" : "opacity-100"
              }`}
            >
              <button
                disabled
                className="rounded-full bg-white/95 py-4 text-[13px] font-bold tracking-[0.18em] text-[#7a4a1d] shadow-lg shadow-black/40 disabled:opacity-60"
              >
                CONTINUE WITH GOOGLE
              </button>
              <button
                disabled
                className="rounded-full bg-white/95 py-4 text-[13px] font-bold tracking-[0.18em] text-[#7a4a1d] shadow-lg shadow-black/40 disabled:opacity-60"
              >
                CONTINUE WITH APPLE
              </button>
              <button
                onClick={() => setMode("email")}
                className="rounded-full bg-white py-4 text-[13px] font-bold tracking-[0.18em] text-[#7a4a1d] shadow-lg shadow-black/40"
              >
                CONTINUE WITH EMAIL
              </button>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                nav({ to: "/onboarding/location" });
              }}
              className="animate-soft-in rounded-[28px] bg-[#f7ecc9]/95 p-6 text-[#3b2410] shadow-2xl shadow-black/40 backdrop-blur"
            >
              <div className="flex flex-col gap-3.5">
                <Field label="Name">
                  <input className="beige-input" placeholder="Ex: Priya" value={form.name} onChange={set("name")} required />
                </Field>
                <Field label="Age">
                  <select className="beige-input appearance-none" value={form.age} onChange={set("age")} required>
                    <option value="" disabled>Select your age</option>
                    {ages.map((a) => <option key={a} value={a}>{a}</option>)}
                  </select>
                </Field>
                <Field label="Email / Phone">
                  <input className="beige-input" placeholder="Ex: priya@gmail.com" value={form.contact} onChange={set("contact")} required />
                </Field>
                <Field label="Password">
                  <input type="password" className="beige-input" placeholder="Create a password" value={form.password} onChange={set("password")} required />
                </Field>
                <button
                  type="submit"
                  className="mt-2 rounded-full bg-[#7a4a1d] py-3.5 text-[13px] font-bold tracking-[0.22em] text-white shadow-lg shadow-black/25"
                >
                  NEXT
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
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
