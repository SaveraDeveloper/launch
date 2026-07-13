import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { CoffeeScreen } from "@/components/CoffeeScreen";
import { firstName } from "@/lib/userStore";

export const Route = createFileRoute("/onboarding/ready")({
  head: () => ({ meta: [{ title: "Welcome — Savera" }] }),
  component: Page,
});

function Page() {
  const nav = useNavigate();
  const [name, setName] = useState("friend");
  useEffect(() => {
    setName(firstName());
  }, []);

  return (
    <CoffeeScreen>
      <div className="flex min-h-svh flex-col items-center justify-center px-8 text-center animate-soft-in">
        <h1 className="font-seasons text-[38px] font-light leading-[1.1] text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.55)]">
          Welcome, {name}.
        </h1>
        <p className="mx-auto mt-5 max-w-[300px] text-[15px] font-light leading-6 text-white/90">
          We've created a space designed just for you.
        </p>

        <div className="mt-auto w-full pt-16">
          <button
            onClick={() => nav({ to: "/home" })}
            className="w-full rounded-full bg-white py-4 text-[13px] font-bold tracking-[0.22em] text-[#7a4a1d] shadow-xl shadow-black/40"
          >
            START MY JOURNEY
          </button>
        </div>
      </div>
    </CoffeeScreen>
  );
}
