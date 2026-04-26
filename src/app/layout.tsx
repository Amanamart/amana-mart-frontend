import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import "./globals.css";

// const inter = Inter({
//   subsets: ["latin"],
//   variable: "--font-inter",
//   display: "swap",
//   weight: ["300", "400", "500", "600", "700", "800"],
// });

export const metadata: Metadata = {
  title: {
    default: "Amana Mart — Bangladesh's Smart Marketplace",
    template: "%s | Amana Mart",
  },
  description:
    "Amana Mart is Bangladesh's leading multi-module marketplace platform for groceries, pharmacy, e-commerce, food delivery, and more.",
  keywords: ["marketplace", "bangladesh", "grocery", "ecommerce", "delivery"],
  authors: [{ name: "Amana Mart" }],
  creator: "Amana Mart",
  metadataBase: new URL("https://amanamart.com.bd"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://amanamart.com.bd",
    title: "Amana Mart — Bangladesh's Smart Marketplace",
    description: "Multi-module marketplace for groceries, pharmacy, ecommerce, food, and more.",
    siteName: "Amana Mart",
  },
};

import { Providers } from "./Providers";
import { FloatingModuleDock, MobileModuleDock } from "@/components/layout/FloatingModuleDock";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <Providers>
          {children}
          <FloatingModuleDock />
          <MobileModuleDock />
        </Providers>
      </body>
    </html>
  );
}
