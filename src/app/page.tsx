'use client';

import { useEffect, useRef, useState } from "react";
import { AnimatePresence } from "motion/react";
import Lenis from 'lenis';
import HeroSection from "@/Components/HeroSection/HeroSection";
import About from "@/Components/About/About";
import PreLoader from "@/Components/PreLoader/PreLoader";
import Exprience from "@/Components/Exprience/Exprience";
import Services from '@/Components/Services/Services';
import CreativeFields from "@/Components/Services/CreativeFields";
import { useScrollbarToggle } from '@/utils/scrollbarManager';
import Contact from '@/Components/Contact/Contact';
import { timelineData } from '@/Components/Exprience/timelineData';
import Navbar from '@/Components/Navigation/Navbar';

type Step = 'name' | 'statement1' | 'through' | 'statement3' | 'service' | 'statement2' | 'email' | 'completion' | 'complete';


export default function Home() {
  const container = useRef<HTMLElement | null>(null);
  const [loading, setLoading] = useState(true);
  const lenisRef = useRef<Lenis | null>(null);

  const [currentStep, setCurrentStep] = useState<Step>('name');
  const nameInputRef = useRef<HTMLInputElement | null>(null);
  const emailInputRef = useRef<HTMLInputElement | null>(null);

  // track scroll position
  const homeRef = useRef<HTMLDivElement | null>(null);
  const aboutRef = useRef<HTMLDivElement | null>(null);
  const servicesRef = useRef<HTMLElement | null>(null);
  const experienceRef = useRef<HTMLElement | null>(null);
  const contactRef = useRef<HTMLElement | null>(null);

  useScrollbarToggle();

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
      <Navbar homeRef={homeRef} aboutRef={aboutRef} servicesRef={servicesRef} experienceRef={experienceRef} contactRef={contactRef} />
      <AnimatePresence mode="wait">
        {loading && <PreLoader />}
      </AnimatePresence>
      <section ref={container}>
        <HeroSection homeRef={homeRef} />
        <About container={container} lenisRef={lenisRef} aboutRef={aboutRef} />
      </section>
      <CreativeFields servicesRef={servicesRef} currentStep={currentStep} nameInputRef={nameInputRef} emailInputRef={emailInputRef} />
      <Exprience experienceRef={experienceRef} items={timelineData} />
      <Contact contactRef={contactRef} currentStep={currentStep} setCurrentStep={setCurrentStep} nameInputRef={nameInputRef} emailInputRef={emailInputRef} />
    </main>
  );
};