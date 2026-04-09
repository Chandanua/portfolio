"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";
import { ExternalLink, ArrowRight } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { SectionHeader } from "./About";
import { useTheme } from "./ThemeContext";

const projects = [
  {
    title: "VaultBox",
    desc: "Secure password and credential manager with encrypted vault storage, multi-user access, and a clean dashboard. Built with a Node/Express backend and React frontend.",
    img: "https://placehold.co/600x340/0e0b14/00ffe1?text=VaultBox🔐",
    tech: ["React", "Node.js", "Express", "MongoDB"],
    accent: "var(--accent)",
    accentRaw: "#00ffe1",
    status: "Completed",
    statusColor: "from-cyan-400 to-teal-400",
    github: "https://github.com/Chandanua",
  },
  {
    title: "C_GPT — Local AI",
    desc: "Fully local AI system running entirely offline with persistent memory, RAG pipeline, and multi-role intelligent modes. Built via AI-collaborative workflow and prompt engineering.",
    img: "https://placehold.co/600x340/0e0b14/9b59ff?text=C_GPT+🤖",
    tech: ["Python", "LangChain", "Ollama", "RAG"],
    accent: "var(--accent2)",
    accentRaw: "#9b59ff",
    status: "Completed",
    statusColor: "from-purple-400 to-violet-500",
    github: "https://github.com/Chandanua",
  },
  {
    title: "ExcelAI",
    desc: "Automation tool that reads Excel data, monitors changes, and auto-sends email updates in real-time. Eliminates manual follow-ups using a React frontend and Node.js–Express backend.",
    img: "https://placehold.co/600x340/0e0b14/00ffe1?text=ExcelAI",
    tech: ["React", "Node.js", "Express", "MongoDB"],
    accent: "var(--accent)",
    accentRaw: "#00ffe1",
    status: "Completed",
    statusColor: "from-cyan-400 to-teal-400",
  },
  {
    title: "StayNet",
    desc: "Full-stack Hostel Management System with three role-based dashboards (Admin, Warden, Student) managing operations, requests, and communications on a single platform.",
    img: "https://placehold.co/600x340/0e0b14/9b59ff?text=StayNet",
    tech: ["React", "NestJS", "MongoDB", "Node.js"],
    accent: "var(--accent2)",
    accentRaw: "#9b59ff",
    status: "Completed",
    statusColor: "from-purple-400 to-violet-500",
  },
  {
    title: "ClickNGo",
    desc: "Automation platform that manages end-to-end online application workflows — validation, submission, and acknowledgment generation — drastically reducing manual effort.",
    img: "/click.jpg",
    tech: ["React", "Node.js", "Express", "MongoDB"],
    accent: "var(--accent)",
    accentRaw: "#00ffe1",
    status: "In Development",
    statusColor: "from-amber-400 to-orange-400",
  },
  {
    title: "PatientCare+",
    desc: "Hospital communication system letting critically ill patients trigger alerts via eye/hand movements. Nurses get real-time alerts; doctors monitor vitals via video intercom.",
    img: "/eye03.jpg",
    tech: ["React", "Python", "Node.js", "MongoDB"],
    accent: "var(--accent2)",
    accentRaw: "#9b59ff",
    status: "In Development",
    statusColor: "from-amber-400 to-orange-400",
  },
  {
    title: "Portfolio",
    desc: "Personal portfolio showcasing projects, skills, and work — built with pure HTML, CSS, JS with dark-neon aesthetics, Three.js 3D animations, particle effects, and EmailJS.",
    img: "/port.gif",
    tech: ["HTML", "CSS", "JS", "Three.js", "GSAP"],
    accent: "var(--accent)",
    accentRaw: "#00ffe1",
    status: "Live",
    statusColor: "from-green-400 to-emerald-500",
    link: "https://chandanua.netlify.app/",
  },
];

export default function Projects() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { theme } = useTheme();
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id="projects" ref={ref} className="layout-section scroll-mt-24">
      <SectionHeader num="03" title="Featured Projects" inView={inView} />

      <div className="flex flex-wrap justify-center w-full gap-10 md:gap-12 lg:gap-14">
        {projects.map((p, i) => (
          <div key={p.title} className="w-full sm:w-[calc(50%-1.5rem)] lg:w-[calc(33.333%-2rem)] max-w-[420px] flex">
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.08 + i * 0.08 }}
            onHoverStart={() => setHovered(i)}
            onHoverEnd={() => setHovered(null)}
            whileHover={{ y: -8, scale: 1.01 }}
            className="group relative flex flex-col w-full rounded-3xl overflow-hidden cursor-default"
            style={{
              background: "var(--glass-bg)",
              border: `1px solid ${hovered === i ? `color-mix(in srgb, ${p.accentRaw} 30%, transparent)` : "var(--glass-border)"}`,
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              boxShadow: hovered === i
                ? `0 20px 60px rgba(0,0,0,0.15), 0 0 0 1px color-mix(in srgb, ${p.accentRaw} 15%, transparent)`
                : "0 2px 16px rgba(0,0,0,0.08)",
              transition: "border-color 0.3s, box-shadow 0.3s",
            }}
          >
            {/* Top glow on hover */}
            <div
              className="absolute top-0 left-0 right-0 h-px transition-opacity duration-300"
              style={{
                background: `linear-gradient(to right, transparent, ${p.accentRaw}, transparent)`,
                opacity: hovered === i ? 1 : 0,
              }}
            />

            {/* Image */}
            <div className="relative w-full h-48 sm:h-52 shrink-0 overflow-hidden" style={{ minHeight: "12rem" }}>
              <div
                className="absolute inset-0 z-10 transition-opacity duration-500"
                style={{
                  background: theme === "dark"
                    ? `linear-gradient(to bottom, transparent 40%, rgba(5,0,15,0.88))`
                    : `linear-gradient(to bottom, transparent 40%, rgba(240,244,251,0.92))`
                }}
              />
              <Image
                src={p.img}
                alt={p.title}
                width={600}
                height={400}
                unoptimized={p.img.startsWith("http")}
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
              />
              {/* Status badge */}
              <div className="absolute top-3 right-3 z-20">
                <span
                  className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-gradient-to-r ${p.statusColor}`}
                  style={{ color: "#0f172a", boxShadow: `0 2px 12px rgba(0,0,0,0.25)` }}
                >
                  {p.status}
                </span>
              </div>
              {/* Live link icon */}
              {p.link && (
                <a
                  href={p.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute top-3 left-3 z-20 w-8 h-8 rounded-full flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 hover:scale-110"
                  style={{
                    backgroundColor: "rgba(0,0,0,0.6)",
                    backdropFilter: "blur(8px)",
                    color: p.accentRaw,
                    border: `1px solid ${p.accentRaw}40`,
                  }}
                >
                  <ExternalLink size={12} />
                </a>
              )}
            </div>

            {/* Content */}
            <div className="flex flex-col flex-1 p-7 md:p-8">
              <div className="flex items-start justify-between gap-4 mb-5">
                <h3
                  className="font-display text-lg font-bold leading-tight"
                  style={{ color: "var(--text-primary)", letterSpacing: "-0.01em" }}
                >
                  {p.title}
                </h3>
                <div className="flex items-center gap-2 flex-shrink-0">
                  {(p as { github?: string }).github && (
                    <a
                      href={(p as { github?: string }).github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-all hover:scale-110"
                      style={{ color: "var(--text-muted)" }}
                    >
                      <FaGithub size={14} />
                    </a>
                  )}
                  {p.link && (
                    <a
                      href={p.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-all hover:scale-110"
                      style={{ color: "var(--text-muted)" }}
                    >
                      <ArrowRight size={14} />
                    </a>
                  )}
                </div>
              </div>

              <p className="text-sm leading-relaxed flex-1 mb-8" style={{ color: "var(--text-muted)" }}>
                {p.desc}
              </p>

              {/* Tech pills */}
              <div className="flex flex-wrap gap-1.5">
                {p.tech.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 rounded-lg text-[11px] font-mono font-medium"
                    style={{
                      color: p.accentRaw,
                      border: `1px solid color-mix(in srgb, ${p.accentRaw} 20%, transparent)`,
                      backgroundColor: `color-mix(in srgb, ${p.accentRaw} 6%, transparent)`,
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom accent line */}
            <div
              className="h-[2px] transition-all duration-500"
              style={{
                background: hovered === i
                  ? `linear-gradient(to right, ${p.accentRaw}, transparent)`
                  : "transparent",
              }}
            />
          </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
}
