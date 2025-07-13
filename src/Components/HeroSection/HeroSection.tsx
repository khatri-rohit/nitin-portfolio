"use client";

import { useRef, useCallback } from "react";
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

const HeroSection = () => {
    const container = useRef<HTMLDivElement>(null);
    const h1Left = useRef<HTMLHeadingElement>(null);
    const h1Right = useRef<HTMLHeadingElement>(null);

    // Array of word pairs to cycle through
    const wordPairs = [
        ['Creative', 'Designer'],
        ['VFX', 'Artist'],
        ["Video", "Editor"],
        ["Product", "Designer"],
        ["Motion", "Expert"],
    ];

    let currentPairIndex = 0;

    const updateTextContent = useCallback((leftText: string, rightText: string) => {
        if (h1Left.current) h1Left.current.textContent = leftText;
        if (h1Right.current) h1Right.current.textContent = rightText;
    }, []);

    const createAnimationCycle = useCallback(() => {
        const tl = gsap.timeline();

        // Set initial positions and properties
        tl.set([h1Left.current, h1Right.current], {
            opacity: 0,
            scale: 0.8,
        })
            .set(h1Left.current, { x: -window.innerWidth })
            .set(h1Right.current, { x: window.innerWidth });

        // Phase 1: Animate in from opposite sides
        tl.to([h1Left.current, h1Right.current], {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: "power2.out",
        })
            .to(h1Left.current, {
                x: 0,
                duration: 0.8,
                ease: "power2.out",
            }, "<")
            .to(h1Right.current, {
                x: 0,
                duration: 0.8,
                ease: "power2.out",
            }, "<")

            // Phase 2: Pause at center
            .to({}, { duration: 2 })

            // Phase 3: Continue moving and exit screen
            .to(h1Left.current, {
                x: -window.innerWidth,
                opacity: 0,
                scale: 0.8,
                duration: 0.8,
                ease: "power2.in",
            })
            .to(h1Right.current, {
                x: window.innerWidth,
                opacity: 0,
                scale: 0.8,
                duration: 0.8,
                ease: "power2.in",
            }, "<")

            // Phase 4: Update content and restart
            .call(() => {
                currentPairIndex = (currentPairIndex + 1) % wordPairs.length;
                const [leftWord, rightWord] = wordPairs[currentPairIndex];
                updateTextContent(leftWord, rightWord);
            });

        return tl;
    }, [updateTextContent, wordPairs]);

    useGSAP(() => {
        // Initialize with first word pair
        const [leftWord, rightWord] = wordPairs[0];
        updateTextContent(leftWord, rightWord);

        // Create and start the infinite animation
        const masterTimeline = gsap.timeline({ repeat: -1 });

        // Create first cycle
        masterTimeline.add(createAnimationCycle());

        // Add subsequent cycles
        for (let i = 1; i < wordPairs.length; i++) {
            masterTimeline.add(createAnimationCycle());
        }

        // Clean up function
        return () => {
            masterTimeline.kill();
        };
    }, {
        scope: container,
        dependencies: [createAnimationCycle, updateTextContent]
    });

    return (
        <section
            ref={container}
            className="flex flex-col items-center justify-center h-screen w-full overflow-hidden text-white"
        >
            <div className="w-full px-5 lg:px-10 relative space-y-4">
                <h1
                    ref={h1Left}
                    className="text-6xl md:text-8xl lg:text-[12rem] leading-none font-bold text-left block w-full"
                    style={{
                        fontFamily: 'system-ui, -apple-system, sans-serif',
                        letterSpacing: '-0.02em'
                    }}
                >
                    Creative
                </h1>
                <h1
                    ref={h1Right}
                    className="text-6xl md:text-8xl lg:text-[12rem] leading-none font-bold text-right block w-full"
                    style={{
                        fontFamily: 'system-ui, -apple-system, sans-serif',
                        letterSpacing: '-0.02em'
                    }}
                >
                    Designer
                </h1>
            </div>
        </section>
    );
};

export default HeroSection;