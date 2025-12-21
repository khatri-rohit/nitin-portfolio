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
  title: "Nitin Khatri - VFX & Graphic Designer Portfolio",
  description: "A creative VFX and graphic designer specializing in visual storytelling, motion graphics, and digital artistry. Explore a showcase of innovative projects blending imagination with technical expertise.",
  keywords: ["VFX", "graphic design", "motion graphics", "visual storytelling", "digital artistry", "portfolio", "Nitin Khatri"],
  authors: [{ name: "Nitin Khatri" }],
  creator: "Nitin Khatri",
  publisher: "Nitin Khatri",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Nitin Khatri - VFX & Graphic Designer Portfolio",
    description: "Discover the innovative work of Nitin Khatri, a VFX and graphic designer creating stunning visual stories and motion graphics.",
    url: "https://www.nitinkhatri.design/", // Replace with actual URL
    siteName: "Nitin Khatri Portfolio",
    images: [
      {
        url: "/img/hellocopy.png", // Add an appropriate OG image in /public/img/
        width: 1200,
        height: 630,
        alt: "Nitin Khatri - VFX & Graphic Designer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nitin Khatri - VFX & Graphic Designer Portfolio",
    description: "Explore the creative portfolio of Nitin Khatri, specializing in VFX, motion graphics, and digital artistry.",
    images: ["/img/twitter-image.png"], // Add an appropriate Twitter image in /public/img/
  },
  icons: {
    icon: "/img/favicon.ico",
    shortcut: "/img/favicon-16x16.png",
    apple: "/img/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  alternates: {
    canonical: "https://www.nitinkhatri.design/", // Replace with actual URL
  },
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
