"use client";

import { useRef, useEffect } from "react";

const CODE_TOKENS = [
  "const","let","var","=>","async","await","import","export",
  "function","return","if","else","class","new","this",
  "{}","[]","()","</>","null","true","false","void",
  "01","10","11","00","0x1F","0xFF",
  "アイウ","エオカ","キクケ",
  "console.log","useState","useEffect","Promise",
  "404","200","500","typeof","===","!==",
];

const CIRCUIT_NODES = 22;

interface Particle {
  x: number; y: number; z: number;
  vx: number; vy: number; vz: number;
  token: string;
  size: number;
  hue: number;
  opacity: number;
  glowing: boolean;
}

interface Node {
  x: number; y: number;
  vx: number; vy: number;
  connections: number[];
  pulse: number;
}

export default function CodeRainBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = canvas.width = window.innerWidth;
    let H = canvas.height = window.innerHeight;
    let frame: number;
    let t = 0;

    // ── PARTICLES (3-D code tokens flying toward camera) ────────────
    const particles: Particle[] = [];
    const SPREAD = 1400;

    const mkParticle = (startFar?: boolean): Particle => ({
      x: (Math.random() - 0.5) * SPREAD,
      y: (Math.random() - 0.5) * SPREAD,
      z: startFar ? Math.random() * 1200 + 200 : Math.random() * 1400,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      vz: -(1 + Math.random() * 2.5),
      token: CODE_TOKENS[Math.floor(Math.random() * CODE_TOKENS.length)],
      size: 9 + Math.random() * 8,
      hue: Math.random(),
      opacity: 0.12 + Math.random() * 0.55,
      glowing: Math.random() > 0.78,
    });

    for (let i = 0; i < 80; i++) particles.push(mkParticle(true));

    // ── CIRCUIT NODES (floating connected graph) ─────────────────────
    const nodes: Node[] = [];
    for (let i = 0; i < CIRCUIT_NODES; i++) {
      nodes.push({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        connections: [],
        pulse: Math.random() * Math.PI * 2,
      });
    }

    for (let i = 0; i < nodes.length; i++) {
      const dist: [number, number][] = nodes
        .map((n, j) => [Math.hypot(n.x - nodes[i].x, n.y - nodes[i].y), j] as [number, number])
        .sort((a, b) => a[0] - b[0])
        .slice(1, 4);
      nodes[i].connections = dist.map((d) => d[1]);
    }

    // ── SCANLINE ───────────────────────────────────────────────────
    const SCAN_SPEED = 0.4;
    let scanY = 0;

    // ── MOUSE ────────────────────────────────────────────────────────
    const mouse = { x: W / 2, y: H / 2 };
    const onMouseMove = (e: MouseEvent) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    window.addEventListener("mousemove", onMouseMove);

    const onResize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);

    const FOV = H * 0.85;
    const project = (x: number, y: number, z: number) => {
      if (z <= 0) return null;
      const scale = FOV / z;
      return { sx: x * scale + W / 2, sy: y * scale + H / 2, scale };
    };

    // ── VISIBILITY PAUSE ──────────────────────────────────────────────
    let paused = false;
    const onVisibility = () => {
      paused = document.hidden;
      if (!paused) { frame = requestAnimationFrame(draw); }
    };
    document.addEventListener("visibilitychange", onVisibility);

    // ── DRAW ─────────────────────────────────────────────────────────
    const draw = () => {
      if (paused) return;
      frame = requestAnimationFrame(draw);
      t += 1;

      ctx.clearRect(0, 0, W, H);

      // ── Circuit nodes & edges ──────────────────────────────────────
      for (const n of nodes) {
        n.x += n.vx + (mouse.x - n.x) * 0.00008;
        n.y += n.vy + (mouse.y - n.y) * 0.00008;
        if (n.x < 0 || n.x > W) n.vx *= -1;
        if (n.y < 0 || n.y > H) n.vy *= -1;
        n.pulse += 0.018;
      }

      // Edges
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (const j of a.connections) {
          const b = nodes[j];
          const d = Math.hypot(b.x - a.x, b.y - a.y);
          if (d > 260) continue;
          const fadeEdge = 1 - d / 260;
          const pulseAlpha = (Math.sin(a.pulse) * 0.5 + 0.5) * fadeEdge;

          const grad = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
          grad.addColorStop(0, `rgba(0,255,225,${pulseAlpha * 0.18})`);
          grad.addColorStop(1, `rgba(155,89,255,${pulseAlpha * 0.10})`);
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = grad;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }

      // Node dots
      for (const n of nodes) {
        const pulse = Math.sin(n.pulse) * 0.5 + 0.5;
        const r = 1.8 + pulse * 2;
        ctx.beginPath();
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,255,225,${0.25 + pulse * 0.35})`;
        ctx.fill();

        if (pulse > 0.7) {
          ctx.shadowColor = "rgba(0,255,225,0.6)";
          ctx.shadowBlur = 8;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }

      // ── 3-D Particles ─────────────────────────────────────────────
      for (const p of particles) {
        p.x += p.vx + (mouse.x - W / 2) * 0.00012 * (p.z / 800);
        p.y += p.vy + (mouse.y - H / 2) * 0.00012 * (p.z / 800);
        p.z += p.vz;

        if (p.z <= 1 || p.z > 1600) {
          Object.assign(p, mkParticle(true));
          p.z = 1400 + Math.random() * 200;
          continue;
        }

        const proj = project(p.x, p.y, p.z);
        if (!proj) continue;
        const { sx, sy, scale } = proj;
        if (sx < -100 || sx > W + 100 || sy < -60 || sy > H + 60) continue;

        const depthFade = Math.min(1, (1 - p.z / 1600) * 1.4);
        const alpha = p.opacity * depthFade;
        const fs = Math.max(6, p.size * scale * 0.5);

        ctx.save();
        ctx.font = `${fs}px 'JetBrains Mono', monospace`;

        const isCyan = p.hue < 0.5;
        ctx.fillStyle = isCyan
          ? `rgba(0,255,225,${alpha})`
          : `rgba(175,110,255,${alpha})`;
        if (p.glowing && depthFade > 0.5) {
          ctx.shadowColor = isCyan ? "rgba(0,255,225,0.5)" : "rgba(155,89,255,0.5)";
          ctx.shadowBlur = 10;
        }

        ctx.fillText(p.token, sx, sy);
        ctx.shadowBlur = 0;
        ctx.restore();
      }

      // ── Scanline sweep ────────────────────────────────────────────
      scanY = (scanY + SCAN_SPEED) % H;
      const scanGrad = ctx.createLinearGradient(0, scanY - 60, 0, scanY + 60);
      scanGrad.addColorStop(0, "rgba(0,255,225,0)");
      scanGrad.addColorStop(0.5, "rgba(0,255,225,0.025)");
      scanGrad.addColorStop(1, "rgba(0,255,225,0)");
      ctx.fillStyle = scanGrad;
      ctx.fillRect(0, scanY - 60, W, 120);

      // ── Horizontal grid lines ──────────────────────────────────
      ctx.save();
      for (let row = 0; row < 12; row++) {
        const zy = 0.05 + row * 0.09;
        const yPos = H / 2 + (H / 2) * zy;
        const xFade = 1 - row / 12;
        ctx.strokeStyle = `rgba(0,255,225,${xFade * 0.04})`;
        ctx.lineWidth = 0.7;
        ctx.beginPath();
        ctx.moveTo(0, yPos);
        ctx.lineTo(W, yPos);
        ctx.stroke();

        if (row === 0) {
          const vCount = 10;
          for (let v = 0; v <= vCount; v++) {
            const xStart = (v / vCount) * W;
            ctx.beginPath();
            ctx.moveTo(xStart, H);
            ctx.lineTo(W / 2, H / 2);
            ctx.strokeStyle = `rgba(0,255,225,0.025)`;
            ctx.stroke();
          }
        }
      }
      ctx.restore();

      // ── Corner vignette ───────────────────────────────────────────
      const vig = ctx.createRadialGradient(W / 2, H / 2, H * 0.2, W / 2, H / 2, H * 0.9);
      vig.addColorStop(0, "rgba(6,0,20,0)");
      vig.addColorStop(1, "rgba(6,0,20,0.65)");
      ctx.fillStyle = vig;
      ctx.fillRect(0, 0, W, H);
    };

    draw();

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ opacity: 1 }}
    />
  );
}
