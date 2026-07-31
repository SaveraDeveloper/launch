import { useEffect, useState } from "react";
import { apartmentByHour } from "@/lib/apartmentBg";

/**
 * Time-of-day apartment wallpaper, resolved on the client only.
 * Returns null on the server / first paint so SSR and hydration match,
 * then re-checks every minute so the wallpaper rolls over at
 * 6 AM / 4 PM / 6 PM / 10 PM without a reload.
 */
export function useApartmentBg(): string | null {
  const [bg, setBg] = useState<string | null>(null);

  useEffect(() => {
    const update = () => setBg(apartmentByHour());
    update();
    const t = setInterval(update, 60_000);
    return () => clearInterval(t);
  }, []);

  return bg;
}
