"use client";

import { RefObject, useEffect, useRef } from "react";
import { useTransform, motion, useScroll } from "motion/react";
import { gsap } from "gsap";

interface Props {
    container: RefObject<HTMLElement | null>
    lenisRef: RefObject<any>;
}

const About = ({ container, lenisRef }: Props) => {
    const textContainerRef = useRef<HTMLDivElement>(null);
    const animationRef = useRef<GSAPTimeline | null>(null);

    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start start', 'end end']
    })
    const scale = useTransform(scrollYProgress, [0, 0.5, 0.8, 1], [1, 0.8, 0.8, 1]);

    const wordPairs = [
        ['Creative', 'Designer'],
        ['Video', 'Editor'],
        ['Product', 'Designer'],
        ['Motion', 'Expert']
    ];

    // Create extended array with duplicate first item for seamless loop
    const extendedPairs = [...wordPairs, wordPairs[0]];

    useEffect(() => {
        const unsubscribe = scrollYProgress.on("change", (latest) => {
            if (latest >= 1 && lenisRef.current) {
                lenisRef.current.stop();
                setTimeout(() => {
                    lenisRef.current.start();
                }, 10);
            } else if (latest < 1 && lenisRef.current) {
                lenisRef.current.start();
            }
        });

        return () => unsubscribe();
    }, [scrollYProgress, lenisRef]);

    useEffect(() => {
        if (!textContainerRef.current) return;

        const container = textContainerRef.current;
        const wordBlocks = container.querySelectorAll('.word-block');

        if (wordBlocks.length === 0) return;

        // Set initial positions - first item visible, others positioned below
        gsap.set(wordBlocks, {
            yPercent: (index) => index * 100,
            force3D: true
        });

        // Create infinite timeline
        const tl = gsap.timeline({
            repeat: -1
        });

        // Step-by-step animation through each pair
        wordPairs.forEach((_, pairIndex) => {
            tl.to(wordBlocks, {
                yPercent: `-=100`,
                duration: 0.8,
                ease: "power2.inOut",
                stagger: 0 // All blocks move together but maintain relative positions
            })
                .to({}, { duration: 1.2 }); // 2-second total interval (0.8s animation + 1.2s pause)
        });

        // Seamless reset: instantly move all blocks back to initial positions
        // This happens when the duplicate first item is showing
        tl.set(wordBlocks, {
            yPercent: (index) => index * 100,
            immediateRender: false
        });

        animationRef.current = tl;

        return () => {
            if (animationRef.current) {
                animationRef.current.kill();
            }
        };
    }, [wordPairs]);

    // Performance optimization: pause animation when not visible
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (animationRef.current) {
                        if (entry.isIntersecting) {
                            animationRef.current.play();
                        } else {
                            animationRef.current.pause();
                        }
                    }
                });
            },
            { threshold: 0.1 }
        );

        if (textContainerRef.current) {
            observer.observe(textContainerRef.current);
        }

        return () => observer.disconnect();
    }, []);
    console.log(scale)
    return (
        <section className="font-heming">
            <motion.div style={{ scale }} className="sticky h-screen bg-[#181818] text-white">
                <div className="flex justify-around p-10 gap-1 h-full">
                    <div className="flex-1 flex flex-col p-8 sm:p-16 lg:p-28">
                        <div className="leading-none">
                            <p className="text-4xl sm:text-6xl lg:text-9xl leading-none">
                                Hi I'm a
                            </p>

                            {/* Animated text container with overflow hidden */}
                            <div
                                ref={textContainerRef}
                                className="relative overflow-hidden h-[8rem] sm:h-[12rem] lg:h-[24rem] w-full"
                            >
                                {extendedPairs.map((pair, index) => (
                                    <div
                                        key={`${pair[0]}-${pair[1]}-${index}`}
                                        className="word-block absolute inset-0 will-change-transform h-[8rem] sm:h-[12rem] lg:h-[24rem] flex flex-col justify-center"
                                        style={{
                                            transform: 'translateZ(0)',
                                            backfaceVisibility: 'hidden'
                                        }}
                                    >
                                        <div className="text-6xl sm:text-8xl lg:text-[12rem] leading-none font-bold">
                                            <p className="transform transition-transform duration-300">
                                                {pair[0]}
                                            </p>
                                            <p className="transform transition-transform duration-300">
                                                {pair[1]}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="flex-1">
                        {/* Right side content can go here */}
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

export default About;