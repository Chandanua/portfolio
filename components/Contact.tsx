"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Send, Mail, Phone, CheckCircle2 } from "lucide-react";
import { FaLinkedin } from "react-icons/fa";
import { SectionHeader } from "./About";

const CONTACT_ITEMS = [
  {
    icon: <Mail className="w-4 h-4" />,
    label: "chandanua56@gmail.com",
    href: "mailto:chandanua56@gmail.com",
    color: "#00ffe1",
  },
  {
    icon: <Phone className="w-4 h-4" />,
    label: "+91 63613 72832",
    href: "tel:+916361372832",
    color: "#9b59ff",
  },
  {
    icon: <FaLinkedin className="w-4 h-4" />,
    label: "LinkedIn Profile",
    href: "https://linkedin.com/in/chandan-uttharkar-a-4848432a7",
    color: "#00ffe1",
  },
];

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    if (status === "error") setStatus("idle");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    // Cooldown check
    const lastSent = localStorage.getItem("portfolio_contact_last_sent");
    if (lastSent) {
      const diff = Date.now() - parseInt(lastSent, 10);
      if (diff < 60000) {
        const remaining = Math.ceil((60000 - diff) / 1000);
        setErrorMsg(`Please wait ${remaining}s before sending another message.`);
        setStatus("error");
        return;
      }
    }

    // Validation
    if (form.name.trim().length < 2) {
      setErrorMsg("Name must be at least 2 characters.");
      setStatus("error");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setErrorMsg("Please enter a valid email address.");
      setStatus("error");
      return;
    }
    if (form.message.trim().length < 10) {
      setErrorMsg("Message must be at least 10 characters.");
      setStatus("error");
      return;
    }

    setStatus("sending");
    try {
      const emailjs = (await import("@emailjs/browser")).default;
      emailjs.init("C4KPdcTawSgU-mBmX");
      await emailjs.send("service_6qyi8yb", "template_rvqlufp", {
        title: form.subject || "New message from portfolio",
        name: form.name.trim(),
        email: form.email.trim(),
        message: form.message.trim(),
        to_email: "chandanua56@gmail.com",
      });
      setStatus("sent");
      setErrorMsg(null);
      setForm({ name: "", email: "", subject: "", message: "" });
      localStorage.setItem("portfolio_contact_last_sent", Date.now().toString());
    } catch {
      setErrorMsg("Something went wrong. Try emailing me directly.");
      setStatus("error");
    }
  };

  const inputBase: React.CSSProperties = {
    width: "100%",
    padding: "0.85rem 1rem",
    borderRadius: "0.875rem",
    backgroundColor: "var(--input-bg)",
    border: "1px solid var(--border)",
    color: "var(--text-primary)",
    fontSize: "0.875rem",
    fontFamily: "'Inter', sans-serif",
    outline: "none",
    transition: "all 0.25s",
  };

  const inputFocused: React.CSSProperties = {
    ...inputBase,
    backgroundColor: "var(--input-focus-bg)",
    borderColor: "color-mix(in srgb, var(--accent) 40%, transparent)",
    boxShadow: "0 0 0 3px color-mix(in srgb, var(--accent) 8%, transparent)",
  };

  const getInputStyle = (name: string) =>
    focusedField === name ? inputFocused : inputBase;

  return (
    <section id="contact" ref={ref} className="layout-section scroll-mt-24">
      <SectionHeader num="06" title="Contact Me" inView={inView} />

      <div className="flex flex-col items-center text-center gap-14 lg:gap-20 max-w-3xl mx-auto">
        {/* ── Info panel ─────────────────────────────── */}
        <motion.div
          className="w-full space-y-6 flex flex-col items-center"
          initial={{ opacity: 0, y: 36 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <div>
            <h3
              className="font-display text-2xl font-black mb-2"
              style={{ color: "var(--text-primary)", letterSpacing: "-0.02em" }}
            >
              Let&apos;s build something
              <span
                className="bg-clip-text text-transparent ml-2"
                style={{ backgroundImage: "linear-gradient(135deg, var(--accent), var(--accent2))" }}
              >
                great.
              </span>
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
              Open to freelance projects, full-time roles, and interesting collaborations.
              Drop me a message — I typically reply within 24 hours.
            </p>
          </div>

          {/* Contact links */}
          <div className="flex flex-wrap justify-center gap-3.5">
            {CONTACT_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-2xl group transition-all duration-200 hover:scale-[1.02]"
                style={{
                  background: "var(--glass-bg)",
                  border: "1px solid var(--glass-border)",
                  backdropFilter: "blur(10px)",
                  WebkitBackdropFilter: "blur(10px)",
                }}
              >
                <span
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110"
                  style={{
                    backgroundColor: `${item.color}12`,
                    border: `1px solid color-mix(in srgb, ${item.color} 30%, transparent)`,
                    color: item.color,
                  }}
                >
                  {item.icon}
                </span>
                <span className="text-sm font-medium transition-colors" style={{ color: "var(--text-muted)" }}>
                  {item.label}
                </span>
              </a>
            ))}
          </div>

          {/* Terminal widget */}
          <div
            className="w-full max-w-md rounded-2xl p-5 font-mono text-xs leading-loose overflow-hidden text-left"
            style={{
              backgroundColor: "var(--bg-panel)",
              border: "1px solid var(--border)",
            }}
          >
            <div className="flex items-center gap-1.5 mb-4">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500 opacity-80" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-400 opacity-80" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500 opacity-80" />
              <span className="ml-2 text-[10px]" style={{ color: "var(--text-muted)" }}>
                bash
              </span>
            </div>
            <div>
              <span style={{ color: "var(--accent2)" }}>$</span>{" "}
              <span style={{ color: "var(--accent)" }}>chandan</span>{" "}
              <span style={{ color: "var(--text-secondary)" }}>--hire</span>
            </div>
            <div className="mt-1 space-y-1" style={{ color: "var(--text-muted)" }}>
              <div><span className="text-green-400">✓</span> Available for work</div>
              <div><span className="text-green-400">✓</span> Open to relocation</div>
              <div><span className="text-green-400">✓</span> Remote / On-site</div>
              <div className="flex items-center gap-1">
                <span>Awaiting your message</span>
                <span
                  className="inline-block w-2 h-3.5 animate-pulse align-middle"
                  style={{ backgroundColor: "var(--accent)" }}
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Form ───────────────────────────────────── */}
        <motion.form
          onSubmit={handleSubmit}
          className="w-full max-w-2xl rounded-3xl p-8 md:p-10 space-y-6"
          style={{
            background: "var(--glass-bg)",
            border: "1px solid var(--glass-border)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
          }}
          initial={{ opacity: 0, y: 36 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <div className="grid sm:grid-cols-2 gap-4 md:gap-5">
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              onFocus={() => setFocusedField("name")}
              onBlur={() => setFocusedField(null)}
              placeholder="Your Name"
              required
              style={getInputStyle("name")}
            />
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              onFocus={() => setFocusedField("email")}
              onBlur={() => setFocusedField(null)}
              placeholder="Your Email"
              required
              style={getInputStyle("email")}
            />
          </div>
          <input
            name="subject"
            value={form.subject}
            onChange={handleChange}
            onFocus={() => setFocusedField("subject")}
            onBlur={() => setFocusedField(null)}
            placeholder="Subject"
            required
            style={getInputStyle("subject")}
          />
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            onFocus={() => setFocusedField("message")}
            onBlur={() => setFocusedField(null)}
            placeholder="Your message..."
            required
            rows={5}
            style={{ ...getInputStyle("message"), resize: "none" }}
          />

          <button
            type="submit"
            disabled={status === "sending"}
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl font-bold text-sm transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60"
            style={{
              background: `linear-gradient(135deg, var(--accent), var(--accent2))`,
              color: "#060014",
              boxShadow: `0 8px 32px var(--shadow-accent)`,
            }}
          >
            {status === "sending" ? (
              <>
                <div
                  className="w-4 h-4 border-2 rounded-full animate-spin"
                  style={{ borderColor: "rgba(6,0,20,0.3)", borderTopColor: "#060014" }}
                />
                Sending...
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                Send Message
              </>
            )}
          </button>

          {status === "sent" && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-center gap-2 text-sm font-mono font-semibold"
              style={{ color: "var(--accent)" }}
            >
              <CheckCircle2 className="w-4 h-4" />
              Message sent! I&apos;ll get back to you soon.
            </motion.div>
          )}
          {status === "error" && (
            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center text-sm text-red-400 font-mono"
            >
              {errorMsg || "Something went wrong. Try emailing me directly."}
            </motion.p>
          )}
        </motion.form>
      </div>
    </section>
  );
}
