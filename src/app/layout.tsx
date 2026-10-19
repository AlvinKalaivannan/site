import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

// Self-hosted (SIL Open Font License, see ./fonts) so builds never depend on Google Fonts.
const schibsted = localFont({
  variable: "--font-schibsted",
  src: [
    { path: "./fonts/schibsted-grotesk-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "./fonts/schibsted-grotesk-latin-500-normal.woff2", weight: "500", style: "normal" },
    { path: "./fonts/schibsted-grotesk-latin-600-normal.woff2", weight: "600", style: "normal" },
  ],
});

export const metadata: Metadata = {
  title: "Alvin Kalaivannan",
  description:
    "Computer Engineering at UofT. I build CV and ML systems that flag risk before it turns into damage.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${schibsted.variable} antialiased`}>
      <body className="min-h-screen bg-paper font-sans text-ink">{children}</body>
    </html>
  );
}
