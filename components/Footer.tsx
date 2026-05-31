"use client";

import { motion } from "framer-motion";
import { Heart, Code2 } from "lucide-react";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";

const socials = [
  { href: "https://github.com/Chandanua",                                     icon: <FaGithub className="w-4 h-4" />,    label: "GitHub",    color: "#9b59ff" },
  { href: "https://linkedin.com/in/chandan-uttharkar-a-4848432a7",            icon: <FaLinkedin className="w-4 h-4" />,  label: "LinkedIn",  color: "#00ffe1" },
  { href: "https://www.instagram.com/chandanua_/",                            icon: <FaInstagram className="w-4 h-4" />, label: "Instagram", color: "#f43f5e" },
];

const navLinks = [
  { label: "About",      href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects",   href: "#projects" },
  { label: "Contact",    href: "#contact" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="relative pt-16 pb-10 px-[var(--layout-page-x)] overflow-hidden"
      style={{ borderTop: "1px solid var(--border)" }}
    >
      {/* subtle background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 60% 40% at 50% 110%, rgba(0,255,225,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-5xl mx-auto">
        {/* Top row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-10 md:gap-8 mb-12">
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start gap-2.5">
            <a href="#home" className="flex items-center gap-2">
              <span
                className="font-display font-black text-2xl bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(135deg, var(--text-primary) 40%, var(--accent))", letterSpacing: "-0.03em" }}
              >
                Chandan
              </span>
              <span
                className="px-1.5 py-0.5 rounded text-sm font-mono font-bold"
                style={{
                  background: "linear-gradient(135deg, var(--accent), var(--accent2))",
                  color: "#060014",
                }}
              >
                UA
              </span>
            </a>
            <p className="text-xs font-mono text-center md:text-left" style={{ color: "var(--text-muted)" }}>
              Frontend Dev · AI Enthusiast · Problem Solver
            </p>
          </div>

          {/* Nav links */}
          <nav className="flex items-center gap-1.5 flex-wrap justify-center">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all hover:scale-105"
                style={{ color: "var(--text-muted)" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.color = "var(--accent)";
                  (e.currentTarget as HTMLElement).style.backgroundColor = "color-mix(in srgb, var(--accent) 7%, transparent)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.color = "var(--text-muted)";
                  (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
                }}
              >
                {l.label}
              </a>
            ))}
          </nav>

          {/* Socials */}
          <div className="flex items-center gap-2">
            {socials.map((s) => (
              <motion.a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                whileHover={{ scale: 1.15, y: -2 }}
                whileTap={{ scale: 0.92 }}
                className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200"
                style={{
                  border: "1px solid var(--border)",
                  color: "var(--text-muted)",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.color = s.color;
                  el.style.borderColor = `${s.color}50`;
                  el.style.backgroundColor = `${s.color}10`;
                  el.style.boxShadow = `0 0 16px ${s.color}25`;
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.color = "var(--text-muted)";
                  el.style.borderColor = "var(--border)";
                  el.style.backgroundColor = "transparent";
                  el.style.boxShadow = "none";
                }}
              >
                {s.icon}
              </motion.a>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div
          className="w-full h-px mb-8"
          style={{ background: "linear-gradient(to right, transparent, var(--border), transparent)" }}
        />

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono" style={{ color: "var(--text-muted)" }}>
          <p className="flex items-center gap-1.5">
            © {year} Chandan Uttharkar A. All rights reserved.
          </p>
          <p className="flex items-center gap-1.5">
            Built with{" "}
            <Heart className="w-3 h-3 text-red-400 fill-red-400 animate-pulse" />
            {" "}using{" "}
            <Code2 className="w-3 h-3" style={{ color: "var(--accent)" }} />
            <span style={{ color: "var(--accent)" }}>Next.js</span>
            {" "}+{" "}
            <span style={{ color: "var(--accent2)" }}>Framer Motion</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
