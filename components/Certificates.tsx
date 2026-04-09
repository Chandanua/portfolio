"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { SectionHeader } from "./About";
import { useTheme } from "./ThemeContext";
import { Award, ExternalLink } from "lucide-react";

const certs = [
  {
    name: "C Programming",
    file: "/c-cert.pdf",
    img: "/c-cert.jpeg",
    issuer: "ISO 9001 Foundation",
    color: "#3b82f6",
    gradient: "from-blue-500 to-cyan-400",
  },
  {
    name: "C++ Programming",
    file: "/cpp-cert.pdf",
    img: "/c++.webp",
    issuer: "ISO 9001 Foundation",
    color: "#22d3ee",
    gradient: "from-cyan-400 to-teal-400",
  },
  {
    name: "HTML5 & CSS3",
    file: "/webdev-cert.pdf",
    img: "/webdevelopment.avif",
    issuer: "ISO 9001 Foundation",
    color: "#f97316",
    gradient: "from-orange-500 to-red-400",
  },
  {
    name: "Python Programming",
    file: "#",
    img: "/python.jpg",
    issuer: "ISO 9001 Foundation",
    color: "#facc15",
    gradient: "from-yellow-400 to-green-400",
  },
  {
    name: "JavaScript Dev",
    file: "#",
    img: "https://placehold.co/260x180/0e0b14/f7df1e?text=JS",
    issuer: "ISO 9001 Foundation",
    color: "#f7df1e",
    gradient: "from-yellow-300 to-amber-400",
  },
  {
    name: "Internship Certificate",
    file: "#",
    img: "https://placehold.co/260x180/0e0b14/9b59ff?text=Chaalanikrafts",
    issuer: "Chaalanikrafts Info LLP",
    color: "#9b59ff",
    gradient: "from-purple-400 to-violet-500",
  },
];

export default function Certificates() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { theme } = useTheme();

  return (
    <section id="certificates" ref={ref} className="layout-section scroll-mt-24">
      <SectionHeader num="04" title="Certificates" inView={inView} />

      <div className="flex flex-wrap justify-center w-full gap-6 sm:gap-8 lg:gap-10">
        {certs.map((c, i) => (
          <div key={c.name} className="w-[calc(50%-1.5rem)] sm:w-[calc(33.333%-2rem)] lg:w-[calc(16.666%-2.5rem)] flex justify-center min-w-[140px] max-w-[200px]">
          <motion.a
            href={c.file}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45, delay: 0.08 + i * 0.08 }}
            className="group relative cursor-pointer block w-full"
            style={{ height: 200, perspective: "900px" }}
          >
            {/* Flip container */}
            <div className="card-3d relative w-full h-full">
              {/* — FRONT — */}
              <div
                className="card-face absolute inset-0 rounded-2xl overflow-hidden"
                style={{
                  border: "1px solid var(--glass-border)",
                  background: "var(--glass-bg)",
                  backdropFilter: "blur(10px)",
                  WebkitBackdropFilter: "blur(10px)",
                }}
              >
                {/* Cert image */}
                <Image
                  src={c.img}
                  alt={c.name}
                  width={400}
                  height={300}
                  unoptimized={c.img.startsWith("http")}
                  className="w-full h-full object-cover opacity-75 group-hover:opacity-95 transition-opacity duration-300"
                />
                {/* Gradient overlay */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: theme === "dark"
                      ? "linear-gradient(to top, rgba(6,0,20,0.88) 0%, rgba(6,0,20,0.2) 50%, transparent 100%)"
                      : "linear-gradient(to top, rgba(245,247,251,0.9) 0%, rgba(245,247,251,0.3) 50%, transparent 100%)",
                  }}
                />
                {/* Top accent bar */}
                <div
                  className="absolute top-0 left-0 right-0 h-0.5"
                  style={{ background: `linear-gradient(to right, transparent, ${c.color}, transparent)`, opacity: 0.7 }}
                />
                {/* Name */}
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <p
                    className="text-[11px] font-bold leading-snug"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {c.name}
                  </p>
                  <p
                    className="text-[10px] font-mono mt-0.5"
                    style={{ color: c.color, opacity: 0.85 }}
                  >
                    {c.issuer}
                  </p>
                </div>
                {/* Hover hint */}
                <div
                  className="absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  style={{ backgroundColor: `${c.color}20`, border: `1px solid ${c.color}50` }}
                >
                  <Award size={11} style={{ color: c.color }} />
                </div>
              </div>

              {/* — BACK — */}
              <div
                className="card-face card-face-back absolute inset-0 rounded-2xl flex flex-col items-center justify-center p-4 text-center gap-3"
                style={{
                  border: `1px solid ${c.color}40`,
                  background: theme === "dark"
                    ? `linear-gradient(135deg, rgba(5,0,15,0.96), rgba(12,8,24,0.98))`
                    : `rgba(255,255,255,0.98)`,
                  boxShadow: `0 0 30px ${c.color}20`,
                  backdropFilter: "blur(10px)",
                  WebkitBackdropFilter: "blur(10px)",
                }}
              >
                <div
                  className={`w-11 h-11 rounded-2xl flex items-center justify-center text-xl bg-gradient-to-br ${c.gradient}`}
                  style={{ color: "#060014", boxShadow: `0 4px 16px ${c.color}40` }}
                >
                  🏅
                </div>
                <div>
                  <p
                    className="text-xs font-bold leading-snug mb-1"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {c.name}
                  </p>
                  <p className="text-[10px] font-mono" style={{ color: "var(--text-muted)" }}>
                    {c.issuer}
                  </p>
                </div>
                {c.file !== "#" && (
                  <span
                    className="flex items-center gap-1 text-[10px] font-mono font-semibold"
                    style={{ color: c.color }}
                  >
                    View PDF <ExternalLink size={9} />
                  </span>
                )}
              </div>
            </div>


          </motion.a>
          </div>
        ))}
      </div>
    </section>
  );
}
