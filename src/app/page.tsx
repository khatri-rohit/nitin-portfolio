'use client'

import { useEffect, useRef, useState } from "react";
import { AnimatePresence } from "motion/react";
import Lenis from 'lenis'
import HeroSection from "@/Components/HeroSection/HeroSection";
import About from "@/Components/About/About";
import PreLoader from "@/Components/PreLoader/PreLoader";

export default function Home() {

  const container = useRef<HTMLElement | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const lenis = new Lenis();

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    setTimeout(() => {
      setLoading(false);
      document.body.style.cursor = 'default';
      window.scrollTo(0, 0);
    }, 2200);

  }, []);

  return (
    <main ref={container} className="w-full h-full">
      <AnimatePresence mode="wait">
        {loading && <PreLoader />}
      </AnimatePresence>
      <HeroSection />
      <About container={container} />
    </main>
  );
};
