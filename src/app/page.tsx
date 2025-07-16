'use client'

import { useEffect, useRef } from "react";
import Lenis from 'lenis'
import About from "@/Components/About/About";
import HeroSection from "@/Components/HeroSection/HeroSection";

export default function Home() {

  const container = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const lenis = new Lenis()

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)
  }, [])

  return (
    <main ref={container} className="w-full h-full">
      <HeroSection />
      <About container={container} />
    </main>
  );
}
