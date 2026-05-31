"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight, Mail } from "lucide-react";
import { FaGithub } from "react-icons/fa";

const ROLES = [
  "Frontend Developer",
  "React & Next.js Dev",
  "AI Automation Builder",
  "Problem Solver",
];

function useTypewriter(lines: string[]) {
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = lines[lineIdx];
    const delay = !deleting && charIdx === current.length ? 2000 : deleting ? 30 : 65;

    const timer = setTimeout(() => {
      if (!deleting && charIdx < current.length) {
        setCharIdx((c) => c + 1);
        return;
      }

      if (!deleting) {
        setDeleting(true);
        return;
      }

      if (charIdx > 0) {
        setCharIdx((c) => c - 1);
        return;
      }

      setDeleting(false);
      setLineIdx((i) => (i + 1) % lines.length);
    }, delay);

    return () => clearTimeout(timer);
  }, [charIdx, deleting, lineIdx, lines]);

  return lines[lineIdx].slice(0, charIdx);
}

const STATS = [
  { val: "6+",  label: "Projects",      sub: "built & shipped" },
  { val: "1st", label: "Hackathon",     sub: "state / national" },
  { val: "3×",  label: "Top-10",        sub: "finalist" },
  { val: "5mo", label: "Experience",    sub: "at Chaalanikrafts" },
];

export default function Hero() {
  const role = useTypewriter(ROLES);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    let w = (c.width = c.offsetWidth);
    let h = (c.height = c.offsetHeight);

    const mouse = { x: w / 2, y: h / 2 };
    const onMouse = (e: MouseEvent) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    window.addEventListener("mousemove", onMouse);

    const pts = Array.from({ length: 35 }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      r: 1 + Math.random() * 2.5,
      vx: (Math.random() - 0.5) * 0.35,
      vy: -0.15 - Math.random() * 0.4,
      life: Math.random(),
      hue: Math.random(),
    }));
    let raf: number;
    let paused = false;
    let isIntersecting = true;
    let isDocumentVisible = !document.hidden;

    const updatePauseState = () => {
      const targetPause = !isIntersecting || !isDocumentVisible;
      if (targetPause !== paused) {
        paused = targetPause;
        if (!paused) raf = requestAnimationFrame(draw);
      }
    };

    const draw = () => {
      if (paused) return;
      raf = requestAnimationFrame(draw);
      ctx.clearRect(0, 0, w, h);
      for (const p of pts) {
        // Subtle mouse repulsion
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150 && dist > 0) {
          const force = (150 - dist) / 150 * 0.3;
          p.x += (dx / dist) * force;
          p.y += (dy / dist) * force;
        }

        p.x += p.vx; p.y += p.vy; p.life += 0.003;
        if (p.y < -10 || p.life > 1) {
          p.y = h + 10; p.x = Math.random() * w; p.life = 0;
        }
        const alpha = Math.sin(p.life * Math.PI) * 0.5;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.hue < 0.5
          ? `rgba(0,255,225,${alpha})`
          : `rgba(162,89,255,${alpha})`;
        ctx.fill();
      }
    };
    draw();

    const onResize = () => { w = c.width = c.offsetWidth; h = c.height = c.offsetHeight; };
    window.addEventListener("resize", onResize);

    const observer = new IntersectionObserver(([entry]) => {
      isIntersecting = entry.isIntersecting;
      updatePauseState();
    }, { threshold: 0 });
    observer.observe(c);

    const onVisibility = () => {
      isDocumentVisible = !document.hidden;
      updatePauseState();
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouse);
      document.removeEventListener("visibilitychange", onVisibility);
      observer.disconnect();
    };
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Gradient overlays */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 70% 80% at 20% 50%, rgba(0,255,225,0.04) 0%, transparent 60%), radial-gradient(ellipse 50% 60% at 80% 30%, rgba(155,89,255,0.05) 0%, transparent 60%)",
        }}
      />

      {/* Animated gradient orb */}
      <div
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full animate-glow-breathe pointer-events-none z-[1]"
        style={{
          background: "radial-gradient(circle, rgba(0,255,225,0.08) 0%, rgba(162,89,255,0.04) 40%, transparent 70%)",
        }}
      />

      <div
        className="absolute bottom-0 left-0 right-0 h-48 z-[1] pointer-events-none"
        style={{
          background: "linear-gradient(to top, #05000f 0%, transparent 100%)",
        }}
      />

      {/* Floating particle canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-[2] pointer-events-none w-full h-full opacity-60"
      />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto w-full px-[var(--layout-page-x)] pt-32 sm:pt-36 pb-24 md:pb-32 md:pt-32 lg:pt-36 flex flex-col items-center md:flex-row md:items-center gap-14 lg:gap-20">
        {/* Text side */}
        <motion.div
          className="flex-1 text-center md:text-left"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Availability badge */}
          <motion.div
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono mb-7 md:mb-8 mx-auto md:mx-0"
            style={{
              border: `1px solid color-mix(in srgb, var(--accent) 25%, transparent)`,
              backgroundColor: `color-mix(in srgb, var(--accent) 6%, transparent)`,
              color: "var(--accent)",
              boxShadow: "0 0 20px color-mix(in srgb, var(--accent) 8%, transparent)",
            }}
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: "var(--accent)" }} />
              <span className="relative inline-flex rounded-full h-2 w-2" style={{ backgroundColor: "var(--accent)" }} />
            </span>
            Available for opportunities
          </motion.div>

          {/* Mobile profile pic */}
          <div className="flex md:hidden justify-center mb-9 md:mb-10">
            <ProfilePic />
          </div>

          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <p
              className="font-mono text-sm mb-2 tracking-widest uppercase"
              style={{ color: "var(--text-muted)" }}
            >
              &lt; Hello World /&gt;
            </p>
            <h1
              className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black leading-[1.0] mb-2"
              style={{ color: "var(--text-primary)", letterSpacing: 0 }}
            >
              Hi, I&apos;m{" "}
              <span
                className="bg-clip-text text-transparent inline-block animate-gradient-shift"
                style={{
                  backgroundImage: `linear-gradient(135deg, var(--accent) 0%, var(--accent2) 50%, var(--accent) 100%)`,
                  backgroundSize: "200% 200%",
                }}
              >
                Chandan
              </span>
            </h1>
            <h2
              className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-6"
              style={{ color: "var(--text-secondary)", letterSpacing: 0 }}
            >
              Uttharkar A
            </h2>
          </motion.div>

          {/* Typewriter */}
          <motion.div
            className="h-10 mb-7 flex items-center justify-center md:justify-start"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <span className="font-mono text-xl" style={{ color: "var(--accent)" }}>
              {"// "}
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(90deg, var(--accent), var(--accent2))" }}
              >
                {role}
              </span>
              <span
                className="inline-block w-0.5 h-6 ml-0.5 animate-pulse align-middle"
                style={{ backgroundColor: "var(--accent)" }}
              />
            </span>
          </motion.div>

          {/* Bio */}
          <motion.p
            className="text-base sm:text-lg leading-relaxed max-w-xl mb-12 mx-auto md:mx-0"
            style={{ color: "var(--text-muted)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
          >
            Passionate developer skilled in{" "}
            <span style={{ color: "var(--accent)" }} className="font-semibold">React</span>,{" "}
            <span style={{ color: "var(--accent2)" }} className="font-semibold">Python</span>, and{" "}
            <span style={{ color: "var(--accent)" }} className="font-semibold">AI tooling</span>.
            {" "}Building creative, impactful tech — from full-stack apps to local AI systems.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:gap-5 mb-14 md:mb-16 w-full sm:w-auto justify-center md:justify-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
          >
            <a
              href="#projects"
              className="group flex w-full sm:w-auto justify-center items-center gap-2 px-6 py-3.5 rounded-2xl font-bold text-sm transition-all duration-200 hover:scale-[1.03] active:scale-[0.98]"
              style={{
                background: `linear-gradient(135deg, var(--accent), var(--accent2))`,
                color: "#060014",
                boxShadow: `0 8px 32px var(--shadow-accent), 0 0 0 0 var(--accent)`,
              }}
            >
              View My Work
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#contact"
              className="group flex w-full sm:w-auto justify-center items-center gap-2 px-6 py-3.5 rounded-2xl font-semibold text-sm transition-all duration-200 hover:scale-[1.03] active:scale-[0.98]"
              style={{
                border: `1px solid color-mix(in srgb, var(--accent) 30%, transparent)`,
                color: "var(--accent)",
                backgroundColor: `color-mix(in srgb, var(--accent) 5%, transparent)`,
              }}
            >
              <Mail size={14} />
              Contact Me
            </a>
            <a
              href="https://github.com/Chandanua"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex w-full sm:w-auto justify-center items-center gap-2 px-6 py-3.5 rounded-2xl font-semibold text-sm transition-all duration-200 hover:scale-[1.03] active:scale-[0.98]"
              style={{
                border: "1px solid var(--border)",
                color: "var(--text-muted)",
                backgroundColor: `color-mix(in srgb, var(--text-muted) 4%, transparent)`,
              }}
            >
              <FaGithub size={14} />
              GitHub
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-5 max-w-lg mx-auto md:mx-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65 }}
          >
            {STATS.map((s, i) => (
              <motion.div
                key={s.label}
                className="text-center p-3.5 sm:p-3 rounded-xl"
                style={{
                  backgroundColor: "var(--bg-card)",
                  border: "1px solid var(--border)",
                }}
                whileHover={{ scale: 1.05, borderColor: "var(--neon-border)" }}
                transition={{ delay: 0.7 + i * 0.08 }}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div
                  className="font-display text-xl font-black bg-clip-text text-transparent"
                  style={{ backgroundImage: "linear-gradient(135deg, var(--accent), var(--accent2))" }}
                >
                  {s.val}
                </div>
                <div className="text-[10px] font-semibold mt-0.5" style={{ color: "var(--text-primary)" }}>
                  {s.label}
                </div>
                <div className="text-[9px] font-mono" style={{ color: "var(--text-muted)" }}>
                  {s.sub}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Profile image — desktop */}
        <motion.div
          className="hidden md:flex flex-shrink-0"
          initial={{ opacity: 0, scale: 0.85, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
        >
          <ProfilePic />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3 }}
      >
        <span className="text-[10px] font-mono tracking-widest uppercase" style={{ color: "var(--text-muted)" }}>
          scroll
        </span>
        <div
          className="w-5 h-8 rounded-full flex justify-center pt-1.5"
          style={{ border: "1px solid var(--border)" }}
        >
          <motion.div
            className="w-1 h-1.5 rounded-full"
            style={{ backgroundColor: "var(--accent)" }}
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
}

function ProfilePic() {
  return (
    <div className="relative flex items-center justify-center" style={{ width: 280, height: 280 }}>
      {/* Outer rotating conic ring */}
      <div
        className="absolute rounded-full animate-spin"
        style={{
          inset: -4,
          background: `conic-gradient(from 0deg, var(--accent), var(--accent2), transparent, var(--accent))`,
          animationDuration: "7s",
          borderRadius: "50%",
        }}
      />
      {/* Second counter-rotating ring */}
      <div
        className="absolute rounded-full animate-spin"
        style={{
          inset: -8,
          background: `conic-gradient(from 180deg, transparent 60%, color-mix(in srgb, var(--accent2) 60%, transparent) 100%)`,
          animationDuration: "12s",
          animationDirection: "reverse",
          borderRadius: "50%",
        }}
      />
      {/* Glow blob */}
      <div
        className="absolute rounded-full blur-3xl animate-glow-breathe"
        style={{
          inset: -30,
          background:
            "radial-gradient(circle, rgba(0,255,225,0.22) 0%, rgba(155,89,255,0.12) 50%, transparent 70%)",
        }}
      />
      {/* Background disc */}
      <div
        className="absolute rounded-full"
        style={{
          inset: -2,
          backgroundColor: "#05000f",
          borderRadius: "50%",
        }}
      />
      {/* Photo */}
      <div
        className="relative rounded-full overflow-hidden"
        style={{
          width: 240,
          height: 240,
          border: "3px solid rgba(0,255,225,0.2)",
          boxShadow: "inset 0 0 30px rgba(0,255,225,0.05)",
        }}
      >
        <Image
          src="/profile.jpg"
          alt="Chandan Uttharkar A"
          fill
          sizes="(max-width: 768px) 100vw, 240px"
          className="object-cover"
          priority
        />
      </div>
      {/* Orbiting dot */}
      <div
        className="absolute animate-spin"
        style={{ inset: -12, animationDuration: "4s", borderRadius: "50%" }}
      >
        <div
          className="absolute top-1 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full"
          style={{
            background: "linear-gradient(135deg, var(--accent), var(--accent2))",
            boxShadow: "0 0 12px var(--accent)",
          }}
        />
      </div>
    </div>
  );
}
