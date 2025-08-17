import { motion } from "motion/react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TextReveal from '@/utils/TextReveal';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Services = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const section = sectionRef.current;
        const content = contentRef.current;

        if (!section || !content) return;

        // Create GSAP context for cleanup
        const ctx = gsap.context(() => {
            // Animation timeline
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: section,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1,
                    onUpdate: (self) => {
                        const progress = self.progress;
                        const direction = self.direction;

                        // When scrolling down and reaching 50% of the section
                        if (direction === 1 && progress > 0.4) {
                            gsap.to(content, {
                                x: "100%",
                                opacity: 0,
                                duration: 0.6,
                                ease: "power2.out"
                            });
                        }
                        // When scrolling up and before 50% of the section
                        else if (direction === -1 && progress < 0.6) {
                            gsap.to(content, {
                                x: "0%",
                                opacity: 1,
                                duration: 0.6,
                                ease: "power2.out"
                            });
                        }
                    }
                }
            });

            // Alternative approach with multiple ScrollTriggers for more control
            ScrollTrigger.create({
                trigger: section,
                start: "center center",
                end: "bottom center",
                onEnter: () => {
                    gsap.to(content, {
                        x: "100%",
                        opacity: 0,
                        duration: 0.8,
                        ease: "power3.out"
                    });
                },
                onLeaveBack: () => {
                    gsap.to(content, {
                        x: "0%",
                        opacity: 1,
                        duration: 0.8,
                        ease: "power3.out"
                    });
                }
            });

            // Ensure element starts in correct position
            gsap.set(content, { x: "0%", opacity: 1 });

        }, section);

        // Refresh ScrollTrigger on mount
        ScrollTrigger.refresh();

        return () => {
            ctx.revert(); // Clean up GSAP animations and ScrollTriggers
        };
    }, []);

    return (
        <motion.section
            ref={contentRef}
            className='h-screen w-full p-10 flex flex-col text-white bg-black font-SpaceGrotesk overflow-hidden'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
        >
            <div className="w-full pt-10 pb-10 flex justify-between items-end">
                <div className='px-10'>
                    <TextReveal>
                        <h1 className="text-[15rem] tracking-wide text-start">
                            Services
                        </h1>
                    </TextReveal>
                </div>
                <div className='text-lg flex flex-col justify-end gap-y-5 text-end py-16'>
                    <TextReveal>
                        <p>Design that feels right,</p>
                        <p>works hard and stands out.</p>
                    </TextReveal>
                </div>
            </div>
            <div className="flex-1 relative overflow-hidden">
                <motion.video
                    ref={videoRef}
                    onClick={() => {
                        if (!videoRef.current) return;
                        if (videoRef.current.paused) {
                            videoRef.current.play();
                            return;
                        };
                        videoRef.current.pause();
                    }}
                    src="/videos/portfolio-video.mp4"
                    className="absolute top-[50%]! left-[50%]! min-w-full min-h-full object-cover -translate-x-[50%]! -translate-y-[50%]!"
                    autoPlay
                    loop
                    muted
                />
            </div>
        </motion.section>
    );
};

export default Services;