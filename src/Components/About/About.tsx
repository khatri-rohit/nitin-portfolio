"use client";

import { RefObject, useEffect, useRef, useState } from "react";
import { useTransform, motion, useScroll, useMotionValueEvent } from "motion/react";
import { gsap } from "gsap";
import TextReveal from "@/utils/TextReveal";

interface Props {
    container: RefObject<HTMLElement | null>;
    lenisRef: RefObject<any>;
}

const About = ({ container, lenisRef }: Props) => {
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start start', 'end end']
    });
    const scale = useTransform(scrollYProgress, [0, 0.5, 0.8, 1], [1, 0.8, 0.8, 1]);

    // State to track when scale equals 1
    const [isScaleOne, setIsScaleOne] = useState(true);

    const textContainerRef = useRef<HTMLDivElement>(null);

    const words = [
        'Creative Designer',
        'Video Editor',
        'Product Designer',
        'Motion Expert'
    ];

    // Listen to scale changes and update state
    useMotionValueEvent(scale, "change", (latest) => {
        setIsScaleOne(latest === 1);
    });

    useEffect(() => {
        if (!textContainerRef.current) return;

        const container = textContainerRef.current;
        const targets = container.children;
        const numberOfTargets = targets.length;

        if (numberOfTargets === 0) return;

        const duration = 0.5;
        const pause = 1;
        const stagger = duration + pause;
        const repeatDelay = (stagger * (numberOfTargets - 1)) + pause;

        // Create timeline with finite repeat count to avoid memory issues
        const animation = gsap.timeline({ repeat: 20 });

        // Set initial state
        gsap.set(container, { autoAlpha: 1 });
        gsap.set(targets, { y: 0, opacity: 1 }); // Reset initial state

        animation
            .from(targets, {
                y: 80,
                duration: duration,
                opacity: 0,
                stagger: {
                    each: stagger,
                    repeat: -1,
                    repeatDelay: repeatDelay
                }
            })
            .to(targets, {
                y: -80,
                duration: duration,
                opacity: 0,
                stagger: {
                    each: stagger,
                    repeat: -1,
                    repeatDelay: repeatDelay
                }
            }, stagger);

        // Cleanup function to prevent memory leaks and animation conflicts
        return () => {
            if (animation) {
                animation.kill(); // Kill the timeline
            }
            // Reset elements to their default state
            gsap.set(targets, {
                y: 0,
                opacity: 1,
                clearProps: "all" // Clear all GSAP-set properties
            });
            gsap.set(container, {
                autoAlpha: 1,
                clearProps: "all"
            });
        };
    }, [isScaleOne]); // Add isScaleOne as dependency to restart animation when visibility changes

    // Show content only when scale is 1
    if (!isScaleOne) {
        return (
            <motion.div style={{ scale }} className="h-screen bg-[#17171c] text-white border">

            </motion.div>
        );
    }

    return (
        <section className="font-SpaceGrotesk">
            <motion.div style={{ scale }} className="h-screen bg-[#17171c] text-white border">
                <div className="flex justify-around p-10 gap-1 h-full">
                    <div className="flex flex-col justify-center p-8 md:p-10 lg:p-20">
                        <div>
                            <img src="/img/nitinkhatri-1.png" className='xl:h-[75vh] lg:h-[60vh] md:h-[50vh]' alt="Nitin Khatri" />
                        </div>
                    </div>
                    <div className="flex-1 flex flex-col justify-center p-8 sm:p-16 lg:p-20">
                        <div className='flex flex-col justify-center gap-12'>
                            <TextReveal>
                                <div className="w-full text-9xl tracking-[0rem] text-slate-200 font-semibold">
                                    ABOUT ME
                                </div>
                            </TextReveal>
                            <div className="w-full flex flex-row items-center text-5xl tracking-[0rem] text-[#e7436f]">
                                <div className='flex items-center gap-4'>
                                    <TextReveal>
                                        <span>Nitin Khatri -</span>
                                    </TextReveal>
                                    <div className="relative overflow-hidden min-w-[400px] h-[1.2em]">
                                        <div
                                            ref={textContainerRef}
                                            className="flex flex-col"
                                        >
                                            {words.map((word, index) => (
                                                <span
                                                    key={index}
                                                    className="absolute top-0 left-0 whitespace-nowrap h-[1.2em] flex items-center "
                                                >
                                                    {word}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='w-full text-5xl tracking-[0rem] font-SpaceGrotesk-light'>
                                <TextReveal>
                                    <p>
                                        10+ years of experience delivering impactful visuals, animations, and videos across fintech, Web3, gaming, and global branding campaigns. I bring concepts to life using After Effects, Blender, and Adobe Suite—turning brand goals into scroll-stopping content. Open to remote, freelance, and full-time global opportunities.
                                    </p>
                                </TextReveal>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

export default About;;;