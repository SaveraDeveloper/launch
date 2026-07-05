import type { ReactNode } from "react";
import coffee from "@/assets/CoffeeShop.png.asset.json";

export function CoffeeScreen({
  children,
  overlay = "bg-black/45",
}: {
  children: ReactNode;
  overlay?: string;
}) {
  return (
    <div className="aroha-mobile-screen relative overflow-hidden text-white">
      <img
        src={coffee.url}
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className={`pointer-events-none absolute inset-0 ${overlay}`} />
      <div className="relative z-10 flex min-h-svh flex-col animate-soft-in">
        {children}
      </div>
    </div>
  );
}
