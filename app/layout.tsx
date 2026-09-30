import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Qoneqt ContentOS | AI-Powered Video Content Production Pipeline",
  description: "From idea to publish-ready video. An AI-powered content production pipeline for the Qoneqt Global Feed.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-[#090a0f] text-slate-100 antialiased font-sans`}>
        {children}
      </body>
    </html>
  );
}
