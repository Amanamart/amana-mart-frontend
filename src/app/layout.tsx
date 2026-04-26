import React from 'react';
import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./Providers";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-white">
        <Providers>
          <main className="flex-1 bg-white">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
