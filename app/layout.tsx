import type { Metadata } from "next";
import "./globals.css";
import ThemeProvider from "@/components/ThemeContext";

export const metadata: Metadata = {
  title: "Chandan Uttharkar A — Developer Portfolio",
  description:
    "Frontend Developer, React Developer & AI Automation Enthusiast. Building creative, impactful tech solutions.",
  keywords: [
    "Chandan Uttharkar",
    "Portfolio",
    "React Developer",
    "Frontend Developer",
    "Next.js",
  ],
  authors: [{ name: "Chandan Uttharkar A" }],
  openGraph: {
    title: "Chandan Uttharkar A — Developer Portfolio",
    description: "Frontend Developer & AI Automation Enthusiast",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
