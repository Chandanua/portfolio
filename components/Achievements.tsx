"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Trophy, Users, Star, Cpu } from "lucide-react";
import { SectionHeader } from "./About";

const achievements = [
  {
    icon: <Trophy className="w-5 h-5" />,
    title: "1st Place — Hackathon",
    desc: "Secured 1st place with formal recognition at a State/National-level Hackathon with an innovative project.",
    gradient: "from-yellow-400 via-amber-400 to-orange-400",
    glow: "rgba(251,191,36,0.25)",
    glowSolid: "#fbbf24",
    num: "01",
  },
  {
    icon: <Star className="w-5 h-5" />,
    title: "3× Top 10 Finalist",
    desc: "Three projects shortlisted among the Top 10 teams across 4–5 State-level and National-level Hackathons.",
    gradient: "from-[#00ffe1] via-cyan-300 to-teal-400",
    glow: "rgba(0,255,225,0.2)",
    glowSolid: "#00ffe1",
    num: "02",
  },
  {
    icon: <Users className="w-5 h-5" />,
    title: "Resource Person — 3× Workshops",
    desc: "Selected to deliver hands-on Web Development workshops to junior batches: once in 2nd year, twice in 3rd year.",
    gradient: "from-[#9b59ff] via-violet-400 to-purple-500",
    glow: "rgba(155,89,255,0.25)",
    glowSolid: "#9b59ff",
    num: "03",
  },
  {
    icon: <Cpu className="w-5 h-5" />,
    title: "Team Lead — Internship",
    desc: "Led frontend development at Chaalanikrafts Info LLP and mentored 2 intern colleagues from the same college.",
    gradient: "from-pink-500 via-rose-400 to-red-400",
    glow: "rgba(244,63,94,0.2)",
    glowSolid: "#f43f5e",
    num: "04",
  },
];

export default function Achievements() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="achievements" ref={ref} className="layout-section scroll-mt-24">
      <SectionHeader num="05" title="Achievements" inView={inView} />

      <div className="flex flex-wrap justify-center w-full gap-8 md:gap-10">
        {achievements.map((a, i) => (
          <div key={a.title} className="w-full sm:w-[calc(50%-1.25rem)] lg:w-[calc(25%-1.5rem)] max-w-[300px] flex text-left">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.1 + i * 0.1 }}
            whileHover={{ y: -8, scale: 1.03 }}
            className="group relative w-full flex flex-col rounded-3xl p-7 md:p-8 overflow-hidden cursor-default"
            style={{
              background: "var(--glass-bg)",
              border: "1px solid var(--glass-border)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
            }}
          >
            {/* Number watermark */}
            <div
              className="absolute top-3 right-4 font-display text-5xl font-black opacity-[0.04] select-none"
              style={{ color: a.glowSolid }}
            >
              {a.num}
            </div>

            {/* Radial hover glow */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none"
              style={{ background: `radial-gradient(circle at 40% 0%, ${a.glow}, transparent 65%)` }}
            />

            {/* Top border glow on hover */}
            <div
              className="absolute top-0 left-8 right-8 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: `linear-gradient(to right, transparent, ${a.glowSolid}, transparent)` }}
            />

            {/* Icon */}
            <div
              className={`inline-flex items-center justify-center w-11 h-11 rounded-2xl bg-gradient-to-br ${a.gradient} mb-6 shadow-lg`}
              style={{ color: "#060014", boxShadow: `0 4px 20px ${a.glow}` }}
            >
              {a.icon}
            </div>

            <h3
              className="font-display text-[15px] font-bold mb-3.5 leading-snug"
              style={{ color: "var(--text-primary)" }}
            >
              {a.title}
            </h3>
            <p className="text-[13px] leading-relaxed" style={{ color: "var(--text-muted)" }}>
              {a.desc}
            </p>
          </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
}
