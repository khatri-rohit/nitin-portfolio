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
  metadataBase: new URL('https://www.nitinkhatri.design/'),
  title: "Nitin Khatri - VFX & Graphic Designer",
  description: "I am a creative VFX and graphic designer specializing in visual storytelling, motion graphics, and digital artistry. Explore a showcase of my innovative projects blending imagination with technical expertise.",
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
    title: "Nitin Khatri - VFX & Graphic Designer",
    description: "Discover my innovative work as a VFX and graphic designer creating stunning visual stories and motion graphics.",
    url: "https://www.nitinkhatri.design/",
    siteName: "Nitin Khatri Portfolio",
    images: [
      {
        url: "/img/hellocopy.png",
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
    description: "Explore my creative portfolio, specializing in VFX, motion graphics, and digital artistry.",
    images: ["/img/Profile.jpg"],
  },
  icons: {
    icon: "/img/favicon.ico",
    shortcut: "/img/favicon-16x16.png",
    apple: "/img/apple-touch-icon.png",
  },
  alternates: {
    canonical: "https://www.nitinkhatri.design/",
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
      </body>
    </html>
  );
}
