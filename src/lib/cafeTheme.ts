import { useEffect, useState } from "react";

const KEY = "savera_cafe_theme";

export type CafeTheme = "light" | "dark";

export function timeTheme(d = new Date()): CafeTheme {
  const h = d.getHours();
  return h >= 6 && h < 17 ? "light" : "dark";
}

/** Auto dark by time of day, with a manual override the user can toggle. */
export function useCafeTheme() {
  const [theme, setTheme] = useState<CafeTheme>("light");

  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = window.localStorage.getItem(KEY);
    } catch {
      /* ignore */
    }
    if (stored === "light" || stored === "dark") {
      setTheme(stored);
      return;
    }
    setTheme(timeTheme());
    const id = window.setInterval(() => {
      try {
        if (!window.localStorage.getItem(KEY)) setTheme(timeTheme());
      } catch {
        setTheme(timeTheme());
      }
    }, 60_000);
    return () => window.clearInterval(id);
  }, []);

  const toggle = () => {
    setTheme((t) => {
      const next: CafeTheme = t === "dark" ? "light" : "dark";
      try {
        window.localStorage.setItem(KEY, next);
      } catch {
        /* ignore */
      }
      return next;
    });
  };

  return { theme, toggle, isDark: theme === "dark" };
}
