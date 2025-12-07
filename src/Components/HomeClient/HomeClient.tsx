'use client';

import { useEffect, useRef, useState } from "react";
import { AnimatePresence } from "motion/react";
import Lenis from 'lenis';
import Navbar from '@/Components/Navigation/Navbar';
// import HeroSection from "@/Components/HeroSection/HeroSection";
import About from "@/Components/About/About";
import PreLoader from "@/Components/PreLoader/PreLoader";
import Exprience from "@/Components/Exprience/Exprience";
import CreativeFields from "@/Components/Services/CreativeFields";
import Contact from '@/Components/Contact/Contact';
import { useScrollbarToggle } from '@/utils/scrollbarManager';
import { timelineData } from '@/Components/Exprience/timelineData';
import LiquidEther from "./LiquidEther";

type Step = 'name' | 'statement1' | 'through' | 'statement3' | 'service' | 'statement2' | 'email' | 'completion' | 'complete';

export default function HomeClient() {
    const container = useRef<HTMLElement | null>(null);
    const [loading, setLoading] = useState(true);
    const lenisRef = useRef<Lenis | null>(null);

    const [currentStep, setCurrentStep] = useState<Step>('name');
    const nameInputRef = useRef<HTMLInputElement | null>(null);
    const emailInputRef = useRef<HTMLInputElement | null>(null);

    const homeRef = useRef<HTMLDivElement | null>(null);
    const aboutRef = useRef<HTMLDivElement | null>(null);
    const servicesRef = useRef<HTMLElement | null>(null);
    const experienceRef = useRef<HTMLElement | null>(null);
    const contactRef = useRef<HTMLElement | null>(null);

    const [isMobile, setIsMobile] = useState(false);

    useScrollbarToggle();

    useEffect(() => {
        const lenis = new Lenis();
        lenisRef.current = lenis;

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        const timer = setTimeout(() => {
            lenisRef.current?.stop();
            window.scrollTo(0, 0);
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    setLoading(false);
                    document.body.style.cursor = 'default';
                    setTimeout(() => lenisRef.current?.start(), 10);
                });
            });
        }, 2200);

        return () => {
            clearTimeout(timer);
            lenisRef.current?.destroy();
        };
    }, []);

    useEffect(() => {
        const checkIsMobile = () => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
            const isMobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
            const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
            const isSmallScreen = window.innerWidth <= 1024;
            return isMobileUA || isTouchDevice || isSmallScreen;
        };

        const handleResize = () => setIsMobile(checkIsMobile());
        setIsMobile(checkIsMobile());
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        // <div className="w-full h-screen relative">
        //     <LiquidEther
        //         colors={['#5227FF', '#FF9FFC', '#B19EEF']}
        //         mouseForce={20}
        //         cursorSize={100}
        //         isViscous={false}
        //         viscous={30}
        //         iterationsViscous={32}
        //         iterationsPoisson={32}
        //         resolution={0.5}
        //         isBounce={false}
        //         autoDemo={true}
        //         autoSpeed={0.5}
        //         autoIntensity={2.2}
        //         takeoverDuration={0.25}
        //         autoResumeDelay={3000}
        //         autoRampDuration={0.6}
        //     />
        // </div>
        <main className="w-full h-full relative">
            {/* <video
                autoPlay
                loop
                muted
                playsInline
                disablePictureInPicture
                aria-hidden="true"
                preload="none"
                poster="/img/DarkGradient.webp"
                className="fixed inset-0 w-full h-full object-cover -z-10"
                src="/videos/DarkGradient.webm"
            /> */}

            {!isMobile && (<Navbar
                homeRef={homeRef}
                aboutRef={aboutRef}
                servicesRef={servicesRef}
                experienceRef={experienceRef}
                contactRef={contactRef} />
            )}
            <AnimatePresence mode="wait">
                {loading && <PreLoader />}
            </AnimatePresence>
            <section ref={container}>
                <LiquidEther
                    homeRef={homeRef}
                    colors={['#5227FF', '#FF9FFC', '#B19EEF']}
                    mouseForce={20}
                    cursorSize={100}
                    isViscous={false}
                    viscous={30}
                    iterationsViscous={32}
                    iterationsPoisson={32}
                    resolution={0.5}
                    isBounce={false}
                    autoDemo={true}
                    autoSpeed={0.5}
                    autoIntensity={2.2}
                    takeoverDuration={0.25}
                    autoResumeDelay={3000}
                    autoRampDuration={0.6}
                />
                <About container={container} lenisRef={lenisRef} aboutRef={aboutRef} />
            </section>
            <CreativeFields servicesRef={servicesRef} currentStep={currentStep} nameInputRef={nameInputRef} emailInputRef={emailInputRef} />
            <Exprience experienceRef={experienceRef} items={timelineData} />
            <Contact
                contactRef={contactRef}
                currentStep={currentStep}
                setCurrentStep={setCurrentStep}
                nameInputRef={nameInputRef}
                emailInputRef={emailInputRef} />
        </main>
    );
}
