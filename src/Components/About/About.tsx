"use client";

import { RefObject, useEffect, useRef } from "react";
import { useTransform, motion, useScroll } from "motion/react";
import { gsap } from "gsap";
import TextReveal from "@/utils/TextReveal";

interface Props {
    container: RefObject<HTMLElement | null>
    lenisRef: RefObject<any>;
}

const About = ({ container, lenisRef }: Props) => {
    const textContainerRef = useRef<HTMLDivElement>(null);
    const textContainerRef2 = useRef<HTMLDivElement>(null);
    const parentRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start start', 'end end']
    })
    const scale = useTransform(scrollYProgress, [0, 0.5, 0.8, 1], [1, 0.8, 0.8, 1]);

    const word1 = [
        'Creative',
        'Video',
        'Product',
        'Motion'
    ];
    const word2 = [
        'Designer',
        'Editor',
        'Designer',
        'Expert'
    ];

    const animateWords = () => {
        if (!textContainerRef.current || !textContainerRef2.current) return;

        const container1 = textContainerRef.current;
        const container2 = textContainerRef2.current;

        // Set initial state
        gsap.set([container1, container2], { autoAlpha: 1, force3D: true });
        gsap.set([container1.children, container2.children], { y: 80, opacity: 0 });

        const tl = gsap.timeline({ repeat: -1 });
        const duration = 0.8;
        const pause = 2;

        // Animate word1 and word2 pairs together
        word1.forEach((_, index) => {
            tl.to([container1.children[index], container2.children[index]], {
                y: 0,
                opacity: 1,
                duration: duration,
                ease: "power2.out"
            })
                .to([container1.children[index], container2.children[index]], {
                    y: -80,
                    opacity: 0,
                    duration: duration,
                    ease: "power2.in"
                }, `+=${pause}`)
                .set([container1.children[index], container2.children[index]], {
                    y: 80
                });
        });

        return tl;
    }

    useEffect(() => {
        const animation = animateWords();

        return () => {
            animation?.kill();
        }
    }, [])

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

    return (
        <section className="font-heming">
            <motion.div style={{ scale }} className="sticky h-screen bg-[#181818] text-white">
                <div className="flex justify-around p-10 gap-1 h-full">
                    <div className="flex-1 flex flex-col p-8 sm:p-16 lg:p-28">
                        <div className="leading-none">
                            <TextReveal>
                                <p className="text-4xl sm:text-6xl lg:text-9xl leading-none mb-4 sm:mb-6 lg:mb-8">
                                    Hi I'm a
                                </p>
                            </TextReveal>

                            <div ref={parentRef} className="relative h-[8rem] sm:h-[12rem] lg:h-[24rem] w-full">
                                <div ref={textContainerRef} className="absolute inset-0 overflow-hidden flex items-start">
                                    {
                                        word1.map((word, index) => (
                                            <TextReveal key={index}>
                                                <p key={index} className="absolute top-0 left-0 text-6xl sm:text-8xl lg:text-[12rem] leading-none font-bold">
                                                    {word}
                                                </p>
                                            </TextReveal>
                                        ))
                                    }
                                </div>
                                <div ref={textContainerRef2} className="absolute inset-0 overflow-hidden flex items-start">
                                    {
                                        word2.map((word, index) => (
                                            <TextReveal key={index}>
                                                <p key={index} className="absolute top-[4rem] sm:top-[6rem] lg:top-[12rem] left-0 text-6xl sm:text-8xl lg:text-[12rem] leading-none font-bold">
                                                    {word}
                                                </p>
                                            </TextReveal>
                                        ))
                                    }
                                </div>
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
{/* Animated text container with overflow hidden */ }
{/* <div
    ref={textContainerRef}
    className="relative overflow-hidden h-[8rem] sm:h-[12rem] lg:h-[24rem] w-full"
>
    {/* Render doubled pairs for endless effect */}
// {doubledPairs.map((pair, index) => (
//         <div
//             // key={`${pair[0]}-${pair[1]}-${index}`}
//             className="word-block absolute inset-0 will-change-transform h-[8rem] sm:h-[12rem] lg:h-[24rem] flex flex-col justify-center"
//             style={{
//                 transform: 'translateZ(0)',
//                 backfaceVisibility: 'hidden'
//             }}
//         >
//             <div className="text-6xl sm:text-8xl lg:text-[12rem] leading-none font-bold">
//                 <p className="transform transition-transform duration-300 hover:scale-105">
//                     {pair[0]}
//                 </p>
//                 <p className="transform transition-transform duration-300 hover:scale-105">
//                     {pair[1]}
//                 </p>
//             </div>
//          </div>
//    //   ))}
// </div> */}