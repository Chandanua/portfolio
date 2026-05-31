"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const skills = [
  { name: "C",               color: "#3b82f6", glow: "rgba(59,130,246,0.3)" },
  { name: "C++",             color: "#22d3ee", glow: "rgba(34,211,238,0.3)" },
  { name: "HTML5",           color: "#f97316", glow: "rgba(249,115,22,0.3)" },
  { name: "CSS3",            color: "#6366f1", glow: "rgba(99,102,241,0.3)" },
  { name: "Python",          color: "#facc15", glow: "rgba(250,204,21,0.3)" },
  { name: "JavaScript",      color: "#fde047", glow: "rgba(253,224,71,0.3)" },
  { name: "React JS",        color: "#22d3ee", glow: "rgba(34,211,238,0.3)" },
  { name: "Next.js",         color: "#d1d5db", glow: "rgba(209,213,219,0.3)" },
  { name: "Node.js",         color: "#34d399", glow: "rgba(52,211,153,0.3)" },
  { name: "MongoDB",         color: "#65a30d", glow: "rgba(101,163,13,0.3)" },
  { name: "AI & Prompt Eng", color: "#00ffe1", glow: "rgba(0,255,225,0.3)" },
];

const BARS = [
  { lang: "JavaScript / React", pct: 88, color: "#22d3ee" },
  { lang: "Python",             pct: 80, color: "#facc15" },
  { lang: "Node.js / Express",  pct: 75, color: "#34d399" },
  { lang: "C / C++",            pct: 72, color: "#3b82f6" },
];

export default function About() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="about" ref={ref} className="layout-section scroll-mt-24">
      <SectionHeader num="01" title="About Me" inView={inView} />

      <div className="flex flex-col items-center text-center gap-12 lg:gap-14 max-w-3xl mx-auto">
        {/* ── Bio ─────────────────────────────────────────── */}
        <motion.div
          className="flex flex-col items-center w-full"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          {/* Code block intro */}
          <div
            className="rounded-2xl p-7 mb-10 overflow-x-auto relative w-full max-w-lg"
            style={{
              backgroundColor: "rgba(255,255,255,0.02)",
              border: "1px solid var(--border)",
            }}
          >
            <div className="flex items-center justify-center gap-1.5 mb-3">
              <div className="w-3 h-3 rounded-full bg-red-500 opacity-80" />
              <div className="w-3 h-3 rounded-full bg-yellow-400 opacity-80" />
              <div className="w-3 h-3 rounded-full bg-green-500 opacity-80" />
              <span className="ml-3 text-[10px] font-mono" style={{ color: "var(--text-muted)" }}>
                developer.ts
              </span>
            </div>
            <pre
              className="font-mono text-xs leading-loose text-left inline-block"
              style={{ color: "var(--text-muted)" }}
            >
              <span style={{ color: "var(--accent2)" }}>const</span>{" "}
              <span style={{ color: "var(--accent)" }}>developer</span>{" "}
              <span style={{ color: "var(--text-primary)" }}>= {"{"}</span>{"\n"}
              {"  "}<span className="text-blue-400">name</span>:{" "}
              <span className="text-green-400">&quot;Chandan Uttharkar A&quot;</span>,{"\n"}
              {"  "}<span className="text-blue-400">role</span>:{" "}
              <span className="text-green-400">&quot;Frontend Developer&quot;</span>,{"\n"}
              {"  "}<span className="text-blue-400">college</span>:{" "}
              <span className="text-green-400">&quot;Sri Siddhartha Inst. of Tech&quot;</span>,{"\n"}
              {"  "}<span className="text-blue-400">passion</span>:{" "}
              <span className="text-green-400">&quot;Building impactful tech&quot;</span>,{"\n"}
              {"  "}<span className="text-blue-400">openToWork</span>:{" "}
              <span className="text-orange-400">true</span>,{"\n"}
              <span style={{ color: "var(--text-primary)" }}>{"}"}</span>
            </pre>
          </div>

          <p className="leading-relaxed mb-7 text-[15px] max-w-xl" style={{ color: "var(--text-muted)" }}>
            I&apos;m a passionate developer skilled in HTML, CSS, Python, JavaScript,
            React and more. I love building creative and impactful tech solutions, and
            thrive in fast-paced, collaborative environments.
          </p>
          <p className="leading-relaxed mb-10 text-[15px] max-w-xl" style={{ color: "var(--text-muted)" }}>
            Skilled in AI tools and prompt engineering to develop scalable solutions —
            from rapid prototypes to full-fledged applications — with a strong focus on
            innovation and efficiency.
          </p>

          {/* Contact badges */}
          <div className="flex flex-wrap justify-center gap-2 text-xs font-mono">
            {[
              { label: "📞 " + ["+91", "63613", "72832"].join(" "), href: "tel:+916361372832", accent: false },
              { label: "🔗 LinkedIn", href: "https://linkedin.com/in/chandan-uttharkar-a-4848432a7", accent: true },
              { label: "🌐 Portfolio", href: "#home", accent: false, accent2: true },
            ].map((b) => (
              <a
                key={b.label}
                href={b.href}
                target={b.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="px-3 py-2 rounded-xl transition-all duration-200 hover:scale-105"
                style={{
                  backgroundColor: b.accent
                    ? "color-mix(in srgb, var(--accent) 8%, transparent)"
                    : b.accent2
                      ? "color-mix(in srgb, var(--accent2) 8%, transparent)"
                      : "var(--code-bg)",
                  border: `1px solid ${b.accent ? "color-mix(in srgb, var(--accent) 25%, transparent)" : b.accent2 ? "color-mix(in srgb, var(--accent2) 25%, transparent)" : "var(--border)"}`,
                  color: b.accent ? "var(--accent)" : b.accent2 ? "var(--accent2)" : "var(--text-muted)",
                }}
              >
                {b.label}
              </a>
            ))}
          </div>
        </motion.div>

        {/* ── Skills ─────────────────────────────────────── */}
        <motion.div
          className="flex flex-col items-center w-full mt-4"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <h3
            className="font-display text-lg font-bold mb-5 flex justify-center items-center gap-2"
            style={{ color: "var(--text-primary)" }}
          >
            <span
              className="px-2 py-0.5 rounded font-mono text-xs"
              style={{ backgroundColor: "color-mix(in srgb, var(--accent) 10%, transparent)", color: "var(--accent)" }}
            >
              skills
            </span>
            &amp; Technologies
          </h3>

          <div className="flex flex-wrap justify-center gap-3">
            {skills.map((skill, i) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0.7, y: 10 }}
                animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.25 + i * 0.045 }}
                whileHover={{ scale: 1.1, y: -3, boxShadow: `0 8px 24px ${skill.glow}` }}
                className="relative group px-4 py-2 rounded-xl cursor-default overflow-hidden"
                style={{
                  border: "1px solid var(--border)",
                  backgroundColor: "var(--bg-card)",
                }}
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-15 transition-opacity duration-300 rounded-xl"
                  style={{ background: `linear-gradient(135deg, ${skill.color}, transparent)` }}
                />
                <span
                  className="relative text-sm font-semibold"
                  style={{ color: skill.color }}
                >
                  {skill.name}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Proficiency bars */}
          <div className="mt-14 space-y-7 w-full max-w-md text-left">
            <h4 className="font-mono text-xs tracking-widest uppercase mb-4" style={{ color: "var(--text-muted)" }}>
              Proficiency
            </h4>
            {BARS.map((b, i) => (
              <div key={b.lang}>
                <div className="flex justify-between text-xs mb-2">
                  <span style={{ color: "var(--text-secondary)" }} className="font-medium">{b.lang}</span>
                  <span className="font-mono font-bold" style={{ color: b.color }}>{b.pct}%</span>
                </div>
                <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: "var(--code-bg)" }}>
                  <motion.div
                    className="h-full rounded-full"
                    style={{
                      background: `linear-gradient(90deg, ${b.color}, ${b.color}aa)`,
                      boxShadow: `0 0 8px ${b.color}40`,
                    }}
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${b.pct}%` } : {}}
                    transition={{ duration: 1.1, delay: 0.45 + i * 0.12, ease: "easeOut" }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ── Shared section header ────────────────────────────────────────── */
export function SectionHeader({
  num,
  title,
  inView,
}: {
  num: string;
  title: string;
  inView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55 }}
      className="flex flex-col items-center justify-center gap-3 mb-16 md:mb-20 w-full text-center"
    >
      <span
        className="font-mono text-sm font-bold px-3 py-1 rounded-full"
        style={{
          color: "var(--accent)",
          backgroundColor: "color-mix(in srgb, var(--accent) 10%, transparent)",
          border: "1px solid color-mix(in srgb, var(--accent) 20%, transparent)",
        }}
      >
        {num}.
      </span>
      <h2
        className="font-display text-4xl sm:text-5xl font-black"
        style={{ color: "var(--text-primary)", letterSpacing: 0 }}
      >
        {title}
      </h2>
    </motion.div>
  );
}
