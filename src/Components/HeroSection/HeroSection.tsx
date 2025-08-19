"use client";

import { useRef, useState, useMemo, useEffect, useCallback } from "react";
import { motion, useAnimation } from 'motion/react';
import useMousePosition from '@/utils/useMousePosition';
import useMagnifyingGlass from '@/utils/useMagnifyingGlass';
import FixedContact from '../Contact/FixedContact';

interface WordPair {
    left: string;
    right: string;
}

const HeroSection = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const magnifyingGlassRef = useRef<HTMLDivElement>(null);
    const magnifyFxLeftRef = useRef<HTMLDivElement>(null);
    const magnifyFxRightRef = useRef<HTMLDivElement>(null);

    const [isHovered, setIsHovered] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isInHeroSection, setIsInHeroSection] = useState(false);

    const { x, y } = useMousePosition();

    const wordPairs = useMemo<WordPair[]>(() => [
        { left: 'Creative', right: 'Designer' },
        { left: 'Video', right: 'Editor' },
        { left: 'Product', right: 'Designer' },
        { left: 'Motion', right: 'Expert' },
    ], []);

    // Animation controls for base layer
    const h1LeftControls = useAnimation();
    const h1RightControls = useAnimation();

    // Animation controls for magnified layer (synchronized)
    const magnifyLeftControls = useAnimation();
    const magnifyRightControls = useAnimation();

    // Initialize magnifying glass effect with localized behavior
    useMagnifyingGlass({
        glassRef: magnifyingGlassRef,
        magnifyFxLeftRef: magnifyFxLeftRef,
        magnifyFxRightRef: magnifyFxRightRef,
        containerRef: containerRef,
        isHovered,
        mouseX: x,
        mouseY: y,
        isActive: isInHeroSection // Only active when in hero section
    });

    // Handle mouse enter/leave for the entire hero section
    const handleHeroMouseEnter = useCallback(() => {
        setIsInHeroSection(true);
    }, []);

    const handleHeroMouseLeave = useCallback(() => {
        setIsInHeroSection(false);
        setIsHovered(false); // Reset hover state when leaving section
    }, []);

    // Handle hover on text elements
    const handleTextMouseEnter = useCallback(() => {
        setIsHovered(true);
    }, []);

    const handleTextMouseLeave = useCallback(() => {
        setIsHovered(false);
    }, []);

    // Enhanced animation sequence with performance optimizations
    const animationSequence = async (
        leftControls: ReturnType<typeof useAnimation>,
        rightControls: ReturnType<typeof useAnimation>,
        magnifyLeftControls: ReturnType<typeof useAnimation>,
        magnifyRightControls: ReturnType<typeof useAnimation>
    ) => {
        // Optimized initial state setup - batch DOM updates
        await Promise.all([
            // Base layer initial positioning
            leftControls.set({
                opacity: 0,
                scale: 0.8,
                x: -window.innerWidth,
                willChange: 'transform, opacity'
            }),
            rightControls.set({
                opacity: 0,
                scale: 0.8,
                x: window.innerWidth,
                willChange: 'transform, opacity'
            }),
            // Magnified layer synchronized positioning
            magnifyLeftControls.set({
                opacity: 0,
                scale: 0.8,
                x: -window.innerWidth,
                willChange: 'transform, opacity'
            }),
            magnifyRightControls.set({
                opacity: 0,
                scale: 0.8,
                x: window.innerWidth,
                willChange: 'transform, opacity'
            })
        ]);

        // Enhanced entrance animation with optimized easing
        await Promise.all([
            // Base layer smooth entrance
            leftControls.start({
                opacity: 1,
                scale: 1,
                x: 0,
                transition: {
                    duration: 0.8,
                    ease: [0.25, 0.46, 0.45, 0.94],
                    type: "tween"
                }
            }),
            rightControls.start({
                opacity: 1,
                scale: 1,
                x: 0,
                transition: {
                    duration: 0.8,
                    ease: [0.25, 0.46, 0.45, 0.94],
                    type: "tween"
                }
            }),
            // Magnified layer perfectly synchronized
            magnifyLeftControls.start({
                opacity: 1,
                scale: 1,
                x: 0,
                transition: {
                    duration: 0.8,
                    ease: [0.25, 0.46, 0.45, 0.94],
                    type: "tween"
                }
            }),
            magnifyRightControls.start({
                opacity: 1,
                scale: 1,
                x: 0,
                transition: {
                    duration: 0.8,
                    ease: [0.25, 0.46, 0.45, 0.94],
                    type: "tween"
                }
            })
        ]);

        // Optimized pause duration
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Smooth exit animation with performance-optimized easing
        await Promise.all([
            // Base layer exit
            leftControls.start({
                x: -window.innerWidth,
                opacity: 0,
                scale: 0.8,
                willChange: 'transform, opacity',
                transition: {
                    duration: 0.8,
                    ease: [0.55, 0.055, 0.675, 0.19],
                    type: "tween"
                }
            }),
            rightControls.start({
                x: window.innerWidth,
                opacity: 0,
                scale: 0.8,
                willChange: 'transform, opacity',
                transition: {
                    duration: 0.8,
                    ease: [0.55, 0.055, 0.675, 0.19],
                    type: "tween"
                }
            }),
            // Magnified layer synchronized exit
            magnifyLeftControls.start({
                x: -window.innerWidth,
                opacity: 0,
                scale: 0.8,
                willChange: 'transform, opacity',
                transition: {
                    duration: 0.8,
                    ease: [0.55, 0.055, 0.675, 0.19],
                    type: "tween"
                }
            }),
            magnifyRightControls.start({
                x: window.innerWidth,
                opacity: 0,
                scale: 0.8,
                willChange: 'transform, opacity',
                transition: {
                    duration: 0.8,
                    ease: [0.55, 0.055, 0.675, 0.19],
                    type: "tween"
                }
            })
        ]);

        // Clean up will-change properties after animation
        [leftControls, rightControls, magnifyLeftControls, magnifyRightControls].forEach(control => {
            control.set({ willChange: 'auto' });
        });
    };

    // Optimized animation loop with cleanup and error handling
    useEffect(() => {
        let isMounted = true;
        let animationTimeoutId: NodeJS.Timeout;

        const runAnimations = async () => {
            try {
                while (isMounted) {
                    for (let i = 0; i < wordPairs.length; i++) {
                        if (!isMounted) break;

                        setCurrentIndex(i);

                        // Run synchronized animations
                        await animationSequence(
                            h1LeftControls,
                            h1RightControls,
                            magnifyLeftControls,
                            magnifyRightControls
                        );

                        // Small pause between cycles for better UX
                        if (isMounted) {
                            await new Promise(resolve => {
                                animationTimeoutId = setTimeout(resolve, 200);
                            });
                        }
                    }
                }
            } catch (error) {
                console.warn('Animation sequence interrupted:', error);
            }
        };

        runAnimations();

        return () => {
            isMounted = false;
            if (animationTimeoutId) {
                clearTimeout(animationTimeoutId);
            }
        };
    }, [wordPairs, h1LeftControls, h1RightControls, magnifyLeftControls, magnifyRightControls]);

    // Optimized text styling with performance considerations
    const textStyle = useMemo(() => ({
        fontFamily: "dahlia-bold",
        letterSpacing: '-0.02em',
        willChange: 'transform, opacity',
        backfaceVisibility: 'hidden' as const,
        transform: 'translateZ(0)' // Force hardware acceleration
    }), []);

    // Enhanced magnified text styling for chromatic effects
    const magnifiedTextStyle = useMemo(() => ({
        ...textStyle,
        color: '#ffffff',
        willChange: 'transform, filter, opacity',
        transformStyle: 'preserve-3d' as const
    }), [textStyle]);

    const [bg, setBg] = useState("/img/brand0.png");
    const index = useRef(0);
    useEffect(() => {

        setInterval(() => {
            setBg("/img/brand" + index.current + ".png");
            index.current = index.current + 1;
            if (index.current > 9) {
                index.current = 0;
            }
        }, 2000);
    }, []);

    return (
        <div className="h-screen relative">
            <FixedContact />
            {/* Base layer - localized to hero section only */}
            {/* <img src={bg} alt="Background" className="absolute inset-0 w-full h-full object-cover" /> */}
            <section
                ref={containerRef}
                className="flex flex-col items-center justify-center h-screen w-full overflow-hidden text-white relative z-10 bg-transparent"
                onMouseEnter={handleHeroMouseEnter}
                onMouseLeave={handleHeroMouseLeave}
            >
                <div className="w-full px-5 lg:px-10 relative space-y-4">
                    <motion.h1
                        animate={h1LeftControls}
                        onMouseEnter={handleTextMouseEnter}
                        onMouseLeave={handleTextMouseLeave}
                        className="text-6xl md:text-8xl lg:text-[12rem] xl:text-[16rem] leading-none text-left block w-full select-none"
                        style={textStyle}
                    >
                        {wordPairs[currentIndex].left}
                    </motion.h1>
                    <motion.h1
                        animate={h1RightControls}
                        onMouseEnter={handleTextMouseEnter}
                        onMouseLeave={handleTextMouseLeave}
                        className="text-6xl md:text-8xl lg:text-[12rem] xl:text-[16rem] leading-none text-right block w-full select-none"
                        style={textStyle}
                    >
                        {wordPairs[currentIndex].right}
                    </motion.h1>
                </div>

                {/* Localized Magnifying Glass - Only visible within hero section */}
                {isInHeroSection && (
                    <div
                        ref={magnifyingGlassRef}
                        className="magnifying-glass"
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            width: '80px',
                            height: '80px',
                            borderRadius: '50%',
                            border: '2px solid rgba(255, 255, 255, 0.15)',
                            // background: 'rgba(15, 14, 14, 0.75)',
                            backdropFilter: 'blur(8px) saturate(1.1)',
                            overflow: 'hidden',
                            opacity: isHovered ? 1 : 0.6,
                            pointerEvents: 'none',
                            zIndex: 1000,
                            transformStyle: 'preserve-3d',
                            backfaceVisibility: 'hidden',
                            // Enhanced shadow effects
                            boxShadow: `
                                0 20px 40px rgba(0, 0, 0, 0.25),
                                0 12px 24px rgba(0, 0, 0, 0.18),
                                inset 0 2px 12px rgba(255, 255, 255, 0.08),
                                inset 0 -2px 6px rgba(0, 0, 0, 0.12)
                            `
                        }}
                    >
                        {/* Synchronized magnified content container */}
                        <div
                            className="w-screen h-screen relative"
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                transform: 'translate(0, 0)', // Updated by useMagnifyingGlass hook
                                willChange: 'transform',
                                backfaceVisibility: 'hidden'
                            }}
                        >
                            <div className="flex flex-col items-center justify-center h-screen w-full px-5 lg:px-10 space-y-4">
                                <motion.h1
                                    ref={magnifyFxLeftRef}
                                    animate={magnifyLeftControls}
                                    className="text-6xl md:text-8xl lg:text-[12rem] xl:text-[16rem] leading-none text-left block w-full magnify-fx-text select-none"
                                    style={magnifiedTextStyle}
                                >
                                    {wordPairs[currentIndex].left}
                                </motion.h1>
                                <motion.h1
                                    ref={magnifyFxRightRef}
                                    animate={magnifyRightControls}
                                    className="text-6xl md:text-8xl lg:text-[12rem] xl:text-[16rem] leading-none text-right block w-full magnify-fx-text select-none"
                                    style={magnifiedTextStyle}
                                >
                                    {wordPairs[currentIndex].right}
                                </motion.h1>
                            </div>
                        </div>
                    </div>
                )}
            </section>
        </div>
    );
};

export default HeroSection;