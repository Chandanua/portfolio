"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "./ThemeContext";
import { Sun, Moon, Menu, X, Terminal } from "lucide-react";

const links = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Certs", href: "#certs" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("");
  const { theme, toggle } = useTheme();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLinkClick = useCallback((href: string) => {
    setActive(href);
    setMenuOpen(false);
  }, []);

  const isDark = theme === "dark";

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 z-[100] flex justify-center w-full px-4 pt-4 md:pt-6 pointer-events-none"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      >
        {/* The Floating Pill Navbar */}
        <motion.nav
          className="pointer-events-auto flex items-center justify-between w-full max-w-5xl rounded-2xl md:rounded-full px-4 md:px-5 py-3 md:py-3.5 transition-all duration-500"
          style={{
            backgroundColor: isDark ? "rgba(6,0,20,0.65)" : "rgba(255,255,255,0.75)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            border: scrolled ? "1px solid var(--border)" : "1px solid transparent",
            boxShadow: scrolled ? (isDark ? "0 10px 40px rgba(0,255,225,0.05)" : "0 10px 40px rgba(0,0,0,0.08)") : "none",
          }}
        >
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2.5 group cursor-pointer" onClick={() => handleLinkClick("")}>
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300"
              style={{
                background: "linear-gradient(135deg, var(--accent), var(--accent2))",
              }}
            >
              <Terminal size={17} color={isDark ? "#060014" : "#ffffff"} className="stroke-[2.5px]" />
            </div>
            <span className="font-display font-black text-xl tracking-tight text-[var(--text-primary)] hidden sm:block">
              Chandan<span style={{ color: "var(--accent)" }}>UA</span>
            </span>
          </a>

          {/* Desktop Links - Floating Tabs */}
          <div className="hidden md:flex items-center p-1.5 rounded-full bg-[var(--code-bg)] border border-[var(--border)] ml-8">
            {links.map((l) => {
              const isActive = active === l.href;
              return (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => handleLinkClick(l.href)}
                  className="relative px-6 py-2 text-sm font-semibold rounded-full transition-colors flex items-center justify-center cursor-pointer"
                  style={{
                    color: isActive ? (isDark ? "#060014" : "#ffffff") : "var(--text-secondary)",
                    zIndex: isActive ? 10 : 1,
                  }}
                >
                  {isActive && (
                    <motion.div
                      layoutId="navTab"
                      className="absolute inset-0 rounded-full z-[-1]"
                      style={{
                        background: "linear-gradient(135deg, var(--accent), var(--accent2))",
                        boxShadow: "0 4px 15px var(--shadow-accent)",
                      }}
                      transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                    />
                  )}
                  {l.label}
                </a>
              );
            })}
          </div>

          {/* Right Section (Theme + Contact + Mobile Toggle) */}
          <div className="flex items-center gap-2 md:gap-4 ml-auto">


            <a
              href="#contact"
              className="hidden md:flex px-6 py-2.5 rounded-full text-sm font-bold transition-all hover:scale-105 active:scale-95 whitespace-nowrap"
              style={{
                backgroundColor: "transparent",
                color: "var(--text-primary)",
                border: "1px solid var(--border)",
              }}
            >
              Contact Me
            </a>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2.5 md:hidden rounded-full bg-[var(--code-bg)] border border-[var(--border)] text-[var(--text-primary)] flex-shrink-0"
            >
              <motion.div animate={{ rotate: menuOpen ? 90 : 0 }}>
                {menuOpen ? <X size={18} strokeWidth={2.5} /> : <Menu size={18} strokeWidth={2.5} />}
              </motion.div>
            </button>
          </div>
        </motion.nav>
      </motion.div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed top-24 left-4 right-4 z-[90] md:hidden p-4 rounded-3xl"
            style={{
              backgroundColor: isDark ? "rgba(6, 0, 20, 0.95)" : "rgba(255, 255, 255, 0.95)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              border: "1px solid var(--neon-border)",
              boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
            }}
          >
            <div className="flex flex-col gap-2">
              {links.map((l, i) => {
                const isActive = active === l.href;
                return (
                  <motion.a
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.05 }}
                    key={l.href}
                    href={l.href}
                    onClick={() => handleLinkClick(l.href)}
                    className="flex justify-between items-center p-4 rounded-2xl cursor-pointer"
                    style={{
                      backgroundColor: isActive ? "color-mix(in srgb, var(--accent) 15%, transparent)" : "var(--glass-bg)",
                      color: isActive ? "var(--accent)" : "var(--text-primary)",
                      border: isActive ? "1px solid color-mix(in srgb, var(--accent) 30%, transparent)" : "1px solid transparent",
                    }}
                  >
                    <span className="font-bold text-lg">{l.label}</span>
                    {isActive && (
                      <motion.div layoutId="mobileIndicator" className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "var(--accent)", boxShadow: "0 0 10px var(--accent)" }} />
                    )}
                  </motion.a>
                );
              })}
              <motion.a
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                href="#contact"
                onClick={() => setMenuOpen(false)}
                className="mt-2 p-4 text-center rounded-2xl font-black cursor-pointer"
                style={{
                  background: "linear-gradient(135deg, var(--accent), var(--accent2))",
                  color: isDark ? "#060014" : "#ffffff",
                  boxShadow: "0 4px 20px var(--shadow-accent)",
                }}
              >
                Let&apos;s Work Together
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
