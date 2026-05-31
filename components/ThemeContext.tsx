"use client";

import { createContext, useContext } from "react";

const ThemeCtx = createContext<{ theme: "dark" }>({ theme: "dark" });

export const useTheme = () => useContext(ThemeCtx);

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  return <ThemeCtx.Provider value={{ theme: "dark" }}>{children}</ThemeCtx.Provider>;
}
