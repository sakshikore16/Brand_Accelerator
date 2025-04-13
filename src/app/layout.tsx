import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Qredify - AI-Powered Business Growth Solutions",
  description: "Transform your business with our AI-driven marketing and growth solutions. Get expert guidance from our Fractional CMO services.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Suspense fallback={null}>
          <Navbar />
          {children}
          <Footer />
        </Suspense>
      </body>
    </html>
  );
} 