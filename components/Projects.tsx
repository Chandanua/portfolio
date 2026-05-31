"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useCallback } from "react";
import Image from "next/image";
import { ExternalLink, ArrowRight } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { SectionHeader } from "./About";

interface Project {
  title: string;
  desc: string;
  img?: string;
  emoji: string;
  tech: string[];
  accent: string;
  accentRaw: string;
  status: string;
  statusColor: string;
  github?: string;
  link?: string;
}

const projects: Project[] = [
  {
    title: "VaultBox",
    desc: "Secure password and credential manager with encrypted vault storage, multi-user access, and a clean dashboard. Built with a Node/Express backend and React frontend.",
    emoji: "🔐",
    tech: ["React", "Node.js", "Express", "MongoDB"],
    accent: "var(--accent)",
    accentRaw: "#00ffe1",
    status: "Completed",
    statusColor: "#22d3ee",
    github: "https://github.com/Chandanua",
  },
  {
    title: "C_GPT — Local AI",
    desc: "Fully local AI system running entirely offline with persistent memory, RAG pipeline, and multi-role intelligent modes. Built via AI-collaborative workflow and prompt engineering.",
    emoji: "🤖",
    tech: ["Python", "LangChain", "Ollama", "RAG"],
    accent: "var(--accent2)",
    accentRaw: "#9b59ff",
    status: "Completed",
    statusColor: "#a855f7",
    github: "https://github.com/Chandanua",
  },
  {
    title: "ExcelAI",
    desc: "Automation tool that reads Excel data, monitors changes, and auto-sends email updates in real-time. Eliminates manual follow-ups using a React frontend and Node.js–Express backend.",
    emoji: "📊",
    tech: ["React", "Node.js", "Express", "MongoDB"],
    accent: "var(--accent)",
    accentRaw: "#00ffe1",
    status: "Completed",
    statusColor: "#22d3ee",
  },
  {
    title: "StayNet",
    desc: "Full-stack Hostel Management System with three role-based dashboards (Admin, Warden, Student) managing operations, requests, and communications on a single platform.",
    emoji: "🏠",
    tech: ["React", "NestJS", "MongoDB", "Node.js"],
    accent: "var(--accent2)",
    accentRaw: "#9b59ff",
    status: "Completed",
    statusColor: "#a855f7",
  },
  {
    title: "ClickNGo",
    desc: "Automation platform that manages end-to-end online application workflows — validation, submission, and acknowledgment generation — drastically reducing manual effort.",
    img: "/click.jpg",
    emoji: "⚡",
    tech: ["React", "Node.js", "Express", "MongoDB"],
    accent: "var(--accent)",
    accentRaw: "#00ffe1",
    status: "In Development",
    statusColor: "#f59e0b",
  },
  {
    title: "PatientCare+",
    desc: "Hospital communication system letting critically ill patients trigger alerts via eye/hand movements. Nurses get real-time alerts; doctors monitor vitals via video intercom.",
    img: "/eye03.jpg",
    emoji: "❤️‍🩹",
    tech: ["React", "Python", "Node.js", "MongoDB"],
    accent: "var(--accent2)",
    accentRaw: "#9b59ff",
    status: "In Development",
    statusColor: "#f59e0b",
  },
  {
    title: "Portfolio",
    desc: "Personal portfolio showcasing projects, skills, and work — built with Next.js, Framer Motion, and canvas-based particle animations with a dark-neon aesthetic.",
    img: "/port.gif",
    emoji: "🌐",
    tech: ["Next.js", "Framer Motion", "Canvas", "Tailwind"],
    accent: "var(--accent)",
    accentRaw: "#00ffe1",
    status: "Live",
    statusColor: "#22c55e",
    link: "#home",
  },
];

function ProjectCard({ p, i, inView }: { p: Project; i: number; inView: boolean }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setTilt({
      x: (y - 0.5) * -10,
      y: (x - 0.5) * 10,
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  }, []);

  return (
    <div className="w-full sm:w-[calc(50%-1.5rem)] lg:w-[calc(33.333%-2rem)] max-w-[420px] flex">
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.55, delay: 0.08 + i * 0.08 }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        className="group relative flex flex-col w-full rounded-3xl overflow-hidden cursor-default"
        style={{
          background: "var(--glass-bg)",
          border: `1px solid ${isHovered ? `color-mix(in srgb, ${p.accentRaw} 30%, transparent)` : "var(--glass-border)"}`,
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          boxShadow: isHovered
            ? `0 20px 60px rgba(0,0,0,0.15), 0 0 0 1px color-mix(in srgb, ${p.accentRaw} 15%, transparent)`
            : "0 2px 16px rgba(0,0,0,0.08)",
          transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) ${isHovered ? "translateY(-8px) scale(1.01)" : ""}`,
          transition: "border-color 0.3s, box-shadow 0.3s, transform 0.25s ease-out",
        }}
      >
        {/* Top glow on hover */}
        <div
          className="absolute top-0 left-0 right-0 h-px transition-opacity duration-300"
          style={{
            background: `linear-gradient(to right, transparent, ${p.accentRaw}, transparent)`,
            opacity: isHovered ? 1 : 0,
          }}
        />

        {/* Image / Gradient placeholder */}
        <div className="relative w-full h-48 sm:h-52 shrink-0 overflow-hidden" style={{ minHeight: "12rem" }}>
          <div
            className="absolute inset-0 z-10 transition-opacity duration-500"
            style={{
              background: "linear-gradient(to bottom, transparent 40%, rgba(5,0,15,0.88))",
            }}
          />
          {p.img ? (
            <Image
              src={p.img}
              alt={p.title}
              width={600}
              height={400}
              className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
            />
          ) : (
            /* Beautiful gradient placeholder */
            <div
              className="w-full h-full flex items-center justify-center transition-all duration-700 group-hover:scale-110"
              style={{
                background: `linear-gradient(135deg, ${p.accentRaw}15 0%, #0e0b14 40%, ${p.accentRaw}10 100%)`,
              }}
            >
              <div className="relative">
                <span className="text-5xl" role="img">{p.emoji}</span>
                <div
                  className="absolute inset-0 blur-2xl opacity-40"
                  style={{ background: p.accentRaw }}
                />
              </div>
            </div>
          )}
          {/* Status badge */}
          <div className="absolute top-3 right-3 z-20">
            <span
              className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold"
              style={{
                backgroundColor: p.statusColor,
                color: "#0f172a",
                boxShadow: `0 2px 12px rgba(0,0,0,0.25)`,
              }}
            >
              {p.status}
            </span>
          </div>
          {/* Live link icon */}
          {p.link && (
            <a
              href={p.link}
              target={p.link.startsWith("http") ? "_blank" : undefined}
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
              {p.github && (
                <a
                  href={p.github}
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
                  target={p.link.startsWith("http") ? "_blank" : undefined}
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
            background: isHovered
              ? `linear-gradient(to right, ${p.accentRaw}, transparent)`
              : "transparent",
          }}
        />
      </motion.div>
    </div>
  );
}

export default function Projects() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="projects" ref={ref} className="layout-section scroll-mt-24">
      <SectionHeader num="03" title="Featured Projects" inView={inView} />

      <div className="flex flex-wrap justify-center w-full gap-10 md:gap-12 lg:gap-14">
        {projects.map((p, i) => (
          <ProjectCard key={p.title} p={p} i={i} inView={inView} />
        ))}
      </div>
    </section>
  );
}
