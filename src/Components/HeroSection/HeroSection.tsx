"use client";

import { useRef, useCallback, useState, useMemo, RefObject } from "react";
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { motion } from 'motion/react';
import useMousePosition from '@/utils/useMousePosition';

gsap.registerPlugin(useGSAP);

interface WordPair {
    left: string;
    right: string;
}

const HeroSection = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const maskContainerRef = useRef<HTMLDivElement>(null);

    const h1LeftRef = useRef<HTMLHeadingElement>(null);
    const h1RightRef = useRef<HTMLHeadingElement>(null);

    const h2LeftRef = useRef<HTMLHeadingElement>(null);
    const h2RightRef = useRef<HTMLHeadingElement>(null);

    const [isHovered, setIsHovered] = useState(false);
    const { x, y } = useMousePosition();

    const wordPairs = useMemo<WordPair[]>(() => [
        { left: 'Creative', right: 'Designer' },
        { left: 'Video', right: 'Editor' },
        { left: 'Product', right: 'Designer' },
        { left: 'Motion', right: 'Expert' },
    ], []);

    const maskSize = isHovered ? 300 : 40;

    const createTextAnimation = useCallback((
        leftRef: RefObject<HTMLHeadingElement>,
        rightRef: RefObject<HTMLHeadingElement>,
        wordPairs: WordPair[],
        currentIndex: { value: number }
    ) => {
        const tl = gsap.timeline();

        // Set initial state
        tl.set([leftRef.current, rightRef.current], {
            opacity: 0,
            scale: 0.8,
        })
            .set(leftRef.current, { x: -window.innerWidth })
            .set(rightRef.current, { x: window.innerWidth });

        // Animate in
        tl.to([leftRef.current, rightRef.current], {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: "power2.out",
        })
            .to(leftRef.current, {
                x: 0,
                duration: 0.8,
                ease: "power2.out",
            }, "<")
            .to(rightRef.current, {
                x: 0,
                duration: 0.8,
                ease: "power2.out",
            }, "<")

            // Pause at center
            .to({}, { duration: 2 })

            // Animate out
            .to(leftRef.current, {
                x: -window.innerWidth,
                opacity: 0,
                scale: 0.8,
                duration: 0.8,
                ease: "power2.in",
            })
            .to(rightRef.current, {
                x: window.innerWidth,
                opacity: 0,
                scale: 0.8,
                duration: 0.8,
                ease: "power2.in",
            }, "<")

            .call(() => {
                currentIndex.value = (currentIndex.value + 1) % wordPairs.length;
                const { left, right } = wordPairs[currentIndex.value];
                if (leftRef.current) leftRef.current.textContent = left;
                if (rightRef.current) rightRef.current.textContent = right;
            });

        return tl;
    }, []);

    useGSAP(() => {
        const currentIndex = { value: 0 };

        if (h1LeftRef.current && h1RightRef.current) {
            h1LeftRef.current.textContent = wordPairs[0].left;
            h1RightRef.current.textContent = wordPairs[0].right;
        }

        const masterTimeline = gsap.timeline({ repeat: -1 });

        wordPairs.forEach(() => {
            masterTimeline.add(createTextAnimation(h1LeftRef, h1RightRef, wordPairs, currentIndex));
        });

        return () => {
            masterTimeline.kill();
        };
    }, {
        scope: containerRef,
        dependencies: [createTextAnimation, wordPairs]
    });

    useGSAP(() => {
        const currentIndex = { value: 0 };

        if (h2LeftRef.current && h2RightRef.current) {
            h2LeftRef.current.textContent = wordPairs[0].left;
            h2RightRef.current.textContent = wordPairs[0].right;
        }

        const masterTimeline = gsap.timeline({ repeat: -1 });

        wordPairs.forEach(() => {
            masterTimeline.add(createTextAnimation(h2LeftRef, h2RightRef, wordPairs, currentIndex));
        });

        return () => {
            masterTimeline.kill();
        };
    }, {
        scope: maskContainerRef,
        dependencies: [createTextAnimation, wordPairs]
    });

    // Memoize motion animation props
    const motionProps = useMemo(() => ({
        maskPosition: `${x - (maskSize / 2)}px ${y - (maskSize / 2)}px`,
        maskSize: `${maskSize}px`,
    }), [x, y, maskSize]);

    return (
        <div className="relative">
            {/* Base layer */}
            <section
                ref={containerRef}
                className="flex flex-col items-center justify-center h-screen w-full overflow-hidden text-white relative z-10"
            >
                <div className="w-full px-5 lg:px-10 relative space-y-4">
                    <h1
                        ref={h1LeftRef}
                        className="text-6xl md:text-8xl lg:text-[12rem] leading-none font-bold text-left block w-full"
                        style={{
                            fontFamily: 'system-ui, -apple-system, sans-serif',
                            letterSpacing: '-0.02em',
                            willChange: 'transform, opacity'
                        }}
                    >
                        Creative
                    </h1>
                    <h1
                        ref={h1RightRef}
                        className="text-6xl md:text-8xl lg:text-[12rem] leading-none font-bold text-right block w-full"
                        style={{
                            fontFamily: 'system-ui, -apple-system, sans-serif',
                            letterSpacing: '-0.02em',
                            willChange: 'transform, opacity'
                        }}
                    >
                        Designer
                    </h1>
                </div>
            </section>

            {/* Mask Layer */}
            <motion.section
                ref={maskContainerRef}
                className="mask flex flex-col items-center justify-center h-screen w-full overflow-hidden text-black absolute top-0 left-0 z-20"
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
                    <h1
                        ref={h2LeftRef}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        className="text-6xl md:text-8xl lg:text-[12rem] leading-none font-bold text-left block w-full"
                        style={{
                            fontFamily: 'system-ui, -apple-system, sans-serif',
                            letterSpacing: '-0.02em',
                            willChange: 'transform, opacity'
                        }}
                    >
                        Creative
                    </h1>
                    <h1
                        ref={h2RightRef}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        className="text-6xl md:text-8xl lg:text-[12rem] leading-none font-bold text-right block w-full"
                        style={{
                            fontFamily: 'system-ui, -apple-system, sans-serif',
                            letterSpacing: '-0.02em',
                            willChange: 'transform, opacity'
                        }}
                    >
                        Designer
                    </h1>
                </div>
            </motion.section>
        </div>
    );
};

export default HeroSection;