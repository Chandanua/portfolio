"use client";

import { createContext, useContext, useEffect } from "react";

type Theme = "dark";

const ThemeCtx = createContext<{ theme: Theme; toggle: () => void }>({
  theme: "dark",
  toggle: () => {},
});

export const useTheme = () => useContext(ThemeCtx);

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    document.documentElement.className = "dark";
    localStorage.removeItem("theme"); // Remove stored theme if it was light
  }, []);

  return <ThemeCtx.Provider value={{ theme: "dark", toggle: () => {} }}>{children}</ThemeCtx.Provider>;
}
