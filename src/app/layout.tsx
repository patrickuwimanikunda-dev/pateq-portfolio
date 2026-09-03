import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Outfit, Fira_Code } from "next/font/google";
import "./globals.css";
import { ThemeProvider, themeInitScript } from "@/context/ThemeContext";
import SharedLayout from "@/components/layout/SharedLayout";
import { site } from "@/lib/site";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const firaCode = Fira_Code({
  variable: "--font-fantasque",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: `${site.name} — ${site.role}`,
  description: site.direction,
  keywords: [
    "systems engineering",
    "C programming",
    "Linux",
    "operating systems",
    "cybersecurity",
    "AI infrastructure",
    "high performance computing",
    "quantitative engineering",
    "software engineer",
    "Patrick Uwimanikunda",
    "Rwanda",
  ],
  openGraph: {
    title: `${site.name} — ${site.role}`,
    description: site.direction,
    type: "website",
    locale: "en_US",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" data-theme="dark" className={`${outfit.variable} ${firaCode.variable} h-full antialiased`}>
      <body className="min-h-full">
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <ThemeProvider>
          <SharedLayout>{children}</SharedLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
