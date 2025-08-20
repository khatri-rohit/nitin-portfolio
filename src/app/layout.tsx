import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from '@vercel/analytics/next';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nitin Khatri",
  description: "A creative VFX and graphic designer specializing in visual storytelling, motion graphics, and digital artistry. Explore a showcase of innovative projects blending imagination with technical expertise.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <meta name="viewport" content="width=device-width, initial-scale=1.0 user-scalable=no" />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased text-white `}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
