import type { ReactNode } from "react";
import apartment from "@/assets/ApartmentWithGirl.png.asset.json";

export function CoffeeScreen({
  children,
  overlay = "bg-black/30",
  hideGirl = true,
}: {
  children: ReactNode;
  overlay?: string;
  // When true, apply a strong blur so the girl in the background image is not
  // recognizable — leaves only the warm apartment scene as ambient backdrop.
  hideGirl?: boolean;
}) {
  return (
    <div className="aroha-mobile-screen relative overflow-hidden text-white">
      <img
        src={apartment.url}
        alt=""
        aria-hidden
        className={`absolute inset-0 h-full w-full object-cover ${
          hideGirl ? "scale-110 blur-2xl" : ""
        }`}
      />
      <div className={`pointer-events-none absolute inset-0 ${overlay}`} />
      <div className="relative z-10 flex min-h-svh flex-col animate-soft-in">
        {children}
      </div>
    </div>
  );
}
