import type { ReactNode } from "react";
import apartment from "@/assets/Apartment.png.asset.json";
import apartmentGirl from "@/assets/ApartmentWithGirl.png.asset.json";

export function CoffeeScreen({
  children,
  overlay = "bg-black/30",
  hideGirl = true,
  blurBg = false,
}: {
  children: ReactNode;
  overlay?: string;
  hideGirl?: boolean;
  blurBg?: boolean;
}) {
  const bg = hideGirl ? apartment.url : apartmentGirl.url;
  return (
    <div className="aroha-mobile-screen relative overflow-hidden text-white">
      <img
        src={bg}
        alt=""
        aria-hidden
        className={`absolute inset-0 h-full w-full object-cover ${
          blurBg ? "scale-110 blur-md" : ""
        }`}
      />
      <div className={`pointer-events-none absolute inset-0 ${overlay}`} />
      <div className="relative z-10 flex min-h-svh flex-col animate-soft-in">
        {children}
      </div>
    </div>
  );
}
