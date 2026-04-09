"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Briefcase, MapPin, Calendar, ExternalLink, ChevronRight } from "lucide-react";
import { SectionHeader } from "./About";

const bullets = [
  "Sole frontend developer on the production team — responsible for all UI design and frontend work.",
  "Independently built sallt.in — a complete frontend website for the SALLT community, live and accessible.",
  "Served as Team Lead, mentoring and training 2 intern colleagues from the same college.",
];

const tech = ["React", "HTML5", "CSS3", "JavaScript", "UI/UX Design"];

export default function Experience() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="experience" ref={ref} className="layout-section scroll-mt-24">
      <SectionHeader num="02" title="Experience" inView={inView} />

      <div className="w-full flex justify-center">
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative rounded-3xl p-8 md:p-10 overflow-hidden max-w-3xl w-full flex flex-col items-center text-center"
          style={{
            background: "var(--glass-bg)",
            border: "1px solid var(--glass-border)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
          }}
        >
          {/* Corner accent */}
          <div
            className="absolute top-0 right-0 w-32 h-32 rounded-bl-full opacity-[0.06]"
            style={{ background: "linear-gradient(135deg, var(--accent), var(--accent2))" }}
          />

          {/* Role header */}
          <div className="flex flex-col items-center justify-center gap-5 mb-7">
            <div>
              <h3
                className="font-display text-2xl font-black mb-1"
                style={{ color: "var(--text-primary)", letterSpacing: "-0.02em" }}
              >
                Developer Intern
              </h3>
              <div className="flex items-center justify-center gap-2 font-semibold text-sm" style={{ color: "var(--accent)" }}>
                <Briefcase className="w-4 h-4" />
                Chaalanikrafts Info LLP
              </div>
            </div>

            <span
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-bold"
              style={{
                backgroundColor: "color-mix(in srgb, var(--accent) 10%, transparent)",
                border: "1px solid color-mix(in srgb, var(--accent) 25%, transparent)",
                color: "var(--accent)",
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: "var(--accent)" }}
              />
              Completed
            </span>
          </div>

          {/* Meta */}
          <div className="flex flex-wrap justify-center gap-6 text-xs mb-8" style={{ color: "var(--text-muted)" }}>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" style={{ color: "var(--accent2)" }} />
              November 2025 – March 2026
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" style={{ color: "var(--accent2)" }} />
              Offline / On-site Internship
            </span>
          </div>

          {/* Bullets */}
          <ul className="space-y-5 mb-10 text-left max-w-xl">
            {bullets.map((b, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -16 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="flex items-start gap-3 text-[15px] leading-relaxed"
                style={{ color: "var(--text-muted)" }}
              >
                <ChevronRight
                  className="w-4 h-4 flex-shrink-0 mt-1"
                  style={{ color: "var(--accent)" }}
                />
                {b}
              </motion.li>
            ))}
          </ul>

          {/* Tech + live link */}
          <div className="flex flex-wrap justify-center gap-2">
            {tech.map((t) => (
              <span
                key={t}
                className="px-3 py-1.5 rounded-xl text-xs font-mono"
                style={{
                  backgroundColor: "var(--code-bg)",
                  border: "1px solid var(--border)",
                  color: "var(--text-muted)",
                }}
              >
                {t}
              </span>
            ))}
            <a
              href="https://sallt.in"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all hover:scale-105"
              style={{
                backgroundColor: "color-mix(in srgb, var(--accent) 10%, transparent)",
                border: "1px solid color-mix(in srgb, var(--accent) 25%, transparent)",
                color: "var(--accent)",
              }}
            >
              sallt.in <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
