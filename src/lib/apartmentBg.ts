import apartment from "@/assets/Apartment.png.asset.json";
import morning from "@/assets/ApartmentMorning.png.asset.json";
import evening from "@/assets/ApartmentEvening.png.asset.json";
import midnight from "@/assets/ApartmentMidnight.png.asset.json";

export function apartmentByHour(hour = new Date().getHours()): string {
  // 6 AM – 4 PM: Morning
  if (hour >= 6 && hour < 16) return morning.url;
  // 4 PM – 6 PM: Evening
  if (hour >= 16 && hour < 18) return evening.url;
  // 6 PM – 10 PM: Apartment (default dusk)
  if (hour >= 18 && hour < 22) return apartment.url;
  // 10 PM – 6 AM: Midnight
  return midnight.url;
}
