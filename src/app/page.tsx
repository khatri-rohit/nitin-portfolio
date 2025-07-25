'use client'

import { useEffect, useRef, useState } from "react";
import { AnimatePresence } from "motion/react";
import Lenis from 'lenis'
import HeroSection from "@/Components/HeroSection/HeroSection";
import About from "@/Components/About/About";
import PreLoader from "@/Components/PreLoader/PreLoader";
import Work from "@/Components/Work/Work";

export default function Home() {

  const container = useRef<HTMLElement | null>(null);
  const [loading, setLoading] = useState(true);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis();
    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Handle preloader timeout
    const timer = setTimeout(() => {
      // Temporarily disable Lenis
      if (lenisRef.current) {
        lenisRef.current.stop();
      }

      // Force scroll to top
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      window.scrollTo(0, 0);

      // Use multiple requestAnimationFrame to ensure scroll completes
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setLoading(false);
          document.body.style.cursor = 'default';

          // Re-enable Lenis after a brief delay
          setTimeout(() => {
            if (lenisRef.current) {
              lenisRef.current.start();
            }
          }, 10);
        });
      });
    }, 2200);

    return () => {
      clearTimeout(timer);
      if (lenisRef.current) {
        lenisRef.current.destroy();
      }
    };
  }, []);

  return (
    <main className="w-full h-full">
      <AnimatePresence mode="wait">
        {loading && <PreLoader />}
      </AnimatePresence>
      <section ref={container} >
        <HeroSection />
        <About container={container} lenisRef={lenisRef} />
      </section>
      <Work />
    </main>
  );
};
