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
import ClientEffects from "@/components/ClientEffects";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <ClientEffects />
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

