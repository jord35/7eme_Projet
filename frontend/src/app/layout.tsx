import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import { Providers } from "@/components/layout/Providers";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Abricot — Gestion de projets",
  description: "Plateforme collaborative de gestion de projets",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${manrope.variable} ${inter.variable}`}>
      <body className="min-h-screen bg-neutral-50 font-body text-body-m text-neutral-800 antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
