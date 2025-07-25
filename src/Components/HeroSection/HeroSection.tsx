"use client";

import { useRef, useState, useMemo, useEffect } from "react";
import { motion, useAnimation } from 'motion/react';
import useMousePosition from '@/utils/useMousePosition';

interface WordPair {
    left: string;
    right: string;
}

const HeroSection = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const maskContainerRef = useRef<HTMLDivElement>(null);

    const [isHovered, setIsHovered] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const maskSize = isHovered ? 300 : 40;

    const { x, y } = useMousePosition();

    const wordPairs = useMemo<WordPair[]>(() => [
        { left: 'Creative', right: 'Designer' },
        { left: 'Video', right: 'Editor' },
        { left: 'Product', right: 'Designer' },
        { left: 'Motion', right: 'Expert' },
    ], []);

    // Animation controls
    const h1LeftControls = useAnimation();
    const h1RightControls = useAnimation();
    const h2LeftControls = useAnimation();
    const h2RightControls = useAnimation();

    const animationSequence = async (
        leftControls: ReturnType<typeof useAnimation>,
        rightControls: ReturnType<typeof useAnimation>
    ) => {
        // Set initial state
        await Promise.all([
            leftControls.set({
                opacity: 0,
                scale: 0.8,
                x: -window.innerWidth,
            }),
            rightControls.set({
                opacity: 0,
                scale: 0.8,
                x: window.innerWidth,
            })
        ]);

        // Animate in
        await Promise.all([
            leftControls.start({
                opacity: 1,
                scale: 1,
                x: 0,
                transition: {
                    duration: 0.8,
                    ease: [0.25, 0.46, 0.45, 0.94], // power2.out equivalent
                }
            }),
            rightControls.start({
                opacity: 1,
                scale: 1,
                x: 0,
                transition: {
                    duration: 0.8,
                    ease: [0.25, 0.46, 0.45, 0.94], // power2.out equivalent
                }
            })
        ]);

        // Pause at center
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Animate out
        await Promise.all([
            leftControls.start({
                x: -window.innerWidth,
                opacity: 0,
                scale: 0.8,
                transition: {
                    duration: 0.8,
                    ease: [0.55, 0.055, 0.675, 0.19], // power2.in equivalent
                }
            }),
            rightControls.start({
                x: window.innerWidth,
                opacity: 0,
                scale: 0.8,
                transition: {
                    duration: 0.8,
                    ease: [0.55, 0.055, 0.675, 0.19], // power2.in equivalent
                }
            })
        ]);
    };

    useEffect(() => {
        let isMounted = true;

        const runAnimations = async () => {
            while (isMounted) {
                for (let i = 0; i < wordPairs.length; i++) {
                    if (!isMounted) break;

                    setCurrentIndex(i);

                    await Promise.all([
                        animationSequence(h1LeftControls, h1RightControls),
                        animationSequence(h2LeftControls, h2RightControls)
                    ]);
                }
            }
        };

        runAnimations();

        return () => {
            isMounted = false;
        };
    }, [wordPairs, h1LeftControls, h1RightControls, h2LeftControls, h2RightControls]);

    const motionProps = useMemo(() => ({
        maskPosition: `${x - (maskSize / 2)}px ${y - (maskSize / 2)}px`,
        maskSize: `${maskSize}px`,
    }), [x, y, maskSize]);

    const textStyle = {
        fontFamily: 'system-ui, -apple-system, sans-serif',
        letterSpacing: '-0.02em',
        willChange: 'transform, opacity'
    };

    return (
        <div className="h-screen relative">
            {/* Base layer */}
            <section
                ref={containerRef}
                className="flex flex-col items-center justify-center h-screen w-full overflow-hidden text-white relative"
            >
                <div className="w-full px-5 lg:px-10 relative space-y-4">
                    <motion.h1
                        animate={h1LeftControls}
                        className="text-6xl md:text-8xl lg:text-[12rem] xl:text-[16rem] leading-none font-bold text-left block w-full"
                        style={textStyle}
                    >
                        {wordPairs[currentIndex].left}
                    </motion.h1>
                    <motion.h1
                        animate={h1RightControls}
                        className="text-6xl md:text-8xl lg:text-[12rem] xl:text-[16rem] leading-none font-bold text-right block w-full"
                        style={textStyle}
                    >
                        {wordPairs[currentIndex].right}
                    </motion.h1>
                </div>
            </section>

            {/* Mask Layer */}
            <motion.section
                ref={maskContainerRef}
                className="mask flex flex-col items-center justify-center h-screen w-full overflow-hidden text-black absolute top-0 left-0"
                animate={motionProps}
                transition={{
                    type: "tween",
                    ease: "backOut",
                    duration: 0.5
                }}
                style={{
                    willChange: 'mask-position, mask-size',
                    pointerEvents: 'auto'
                }}
            >
                <div className="w-full px-5 lg:px-10 relative space-y-4">
                    <motion.h1
                        animate={h2LeftControls}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        className="text-6xl md:text-8xl lg:text-[12rem] xl:text-[16rem] leading-none font-bold text-left block w-full"
                        style={textStyle}
                    >
                        {wordPairs[currentIndex].left}
                    </motion.h1>
                    <motion.h1
                        animate={h2RightControls}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        className="text-6xl md:text-8xl lg:text-[12rem] xl:text-[16rem] leading-none font-bold text-right block w-full"
                        style={textStyle}
                    >
                        {wordPairs[currentIndex].right}
                    </motion.h1>
                </div>
            </motion.section>
        </div>
    );
};

export default HeroSection;