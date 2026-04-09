"use client";

import { useEffect, useRef } from "react";
import CodeRainBackground from "@/components/CodeRainBackground";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Certificates from "@/components/Certificates";
import Achievements from "@/components/Achievements";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (glowRef.current) {
        glowRef.current.style.left = e.clientX + "px";
        glowRef.current.style.top = e.clientY + "px";
      }
    };
    window.addEventListener("mousemove", onMouseMove);

    const progressBar = document.getElementById("scroll-progress");
    const onScroll = () => {
      const h = document.documentElement;
      const pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
      if (progressBar) progressBar.style.width = pct + "%";
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <main className="relative min-h-screen">
      <div id="scroll-progress" />
      <div id="cursor-glow" ref={glowRef} />
      <CodeRainBackground />
      <Navbar />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Certificates />
      <Achievements />
      <Contact />
      <Footer />
    </main>
  );
}
