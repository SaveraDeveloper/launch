## The schedule (already what the code says)

`src/lib/apartmentBg.ts` maps the hour to a wallpaper exactly as you asked:

```text
6:00 AM – 3:59 PM   ApartmentMorning.png
4:00 PM – 5:59 PM   ApartmentEvening.png
6:00 PM – 9:59 PM   Apartment.png        (dusk / default)
10:00 PM – 5:59 AM  ApartmentMidnight.png
```

So the mapping isn't the bug.

## Why you're seeing Midnight in the afternoon

The background is picked once during render, and the page is server-rendered first. The server runs on **UTC** (22:31 UTC right now → Midnight), so the HTML ships with `ApartmentMidnight.png`. The browser then hydrates with your local time and the two disagree — this is exactly the hydration error the preview is logging, and the stale server-picked image can stay on screen. It also never changes while the app stays open, so 3:59 PM → 4:00 PM won't swap the wallpaper.

## Plan

1. Add a small client hook (e.g. `useApartmentBg`) that:
   - returns a neutral/transparent background on the first render (server + first client paint) so server and client HTML match — no hydration mismatch,
   - sets the real image in `useEffect` using the browser's local hour,
   - re-checks every 60 seconds so the wallpaper rolls over at 6 AM / 4 PM / 6 PM / 10 PM without a reload,
   - cross-fades on change (the existing `transition-all duration-700` already handles this).
2. Use that hook in `src/components/AppShell.tsx` instead of calling `apartmentByHour()` during render.
3. Keep the per-route blur/overlay logic (Explore ~25%, Profile ~15%, Kit ~4px) exactly as is.
4. Verify by rendering the app with a faked local clock at 10 AM, 4:30 PM, 7 PM and 1 AM and confirming each screenshot shows the matching wallpaper.

## Technical detail

`apartmentByHour(hour)` already takes an hour argument, so no change to the mapping itself is needed — only where and when it's called (client-side, on an interval) plus a first-paint placeholder to keep SSR and hydration in sync.
