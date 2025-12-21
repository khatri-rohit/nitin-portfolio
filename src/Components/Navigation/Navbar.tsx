"use client";

import { memo, RefObject, useEffect, useMemo, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Box from '@mui/material/Box';
import { Home, Work, Person, BusinessCenter, Phone } from '@mui/icons-material';

const steps = [
    {
        label: 'HOME',
        icon: <Home sx={{
            color: '#e7436f',
            fontSize: '1.5rem',
        }} />,
    },
    {
        label: 'ABOUT ME',
        icon: <Person sx={{
            color: '#e7436f',
            fontSize: '1.5rem',
        }}
        />,
    },
    {
        label: 'SERVICES',
        icon: <Work sx={{
            color: '#e7436f',
            fontSize: '1.5rem',
        }}
        />,
    },
    {
        label: 'EXPERIENCE',
        icon: <BusinessCenter sx={{
            color: '#e7436f',
            fontSize: '1.5rem',
        }}
        />,
    },
    {
        label: 'CONTACT',
        icon: <Phone sx={{
            color: '#e7436f',
            fontSize: '1.5rem',
        }}
        />,
    }
];

interface Props {
    homeRef: RefObject<HTMLElement | null>;
    aboutRef: RefObject<HTMLElement | null>;
    servicesRef: RefObject<HTMLElement | null>;
    experienceRef: RefObject<HTMLElement | null>;
    contactRef: RefObject<HTMLElement | null>;
}

interface SectionProgress {
    sectionIndex: number;
    progress: number; // 0 to 100
}

const Navbar = ({ homeRef, aboutRef, servicesRef, experienceRef, contactRef }: Props) => {
    const [activeStep, setActiveStep] = useState(0);
    const [isScrolling, setIsScrolling] = useState(false);
    const [scrollTimeout, setScrollTimeout] = useState<NodeJS.Timeout | null>(null);
    const [isHover, setIsHover] = useState(false);
    const [sectionProgress, setSectionProgress] = useState<SectionProgress[]>([]);

    const refs = useMemo(() => [homeRef, aboutRef, servicesRef, experienceRef, contactRef], [
        homeRef, aboutRef, servicesRef, experienceRef, contactRef
    ]);

    const calculateSectionProgress = useCallback(() => {
        const scrollTop = window.scrollY;
        const windowHeight = window.innerHeight;

        const progressData: SectionProgress[] = [];

        refs.forEach((ref, index) => {
            if (!ref.current) return;

            const element = ref.current;
            const elementTop = element.offsetTop;
            const elementHeight = element.offsetHeight;
            const elementBottom = elementTop + elementHeight;

            // Calculate progress for each section
            let progress = 0;

            if (scrollTop + windowHeight > elementTop && scrollTop < elementBottom) {
                // Section is in view
                // const visibleStart = Math.max(scrollTop, elementTop);
                // const visibleEnd = Math.min(scrollTop + windowHeight, elementBottom);
                // const visibleHeight = visibleEnd - visibleStart;
                // const totalSectionHeight = elementHeight;

                // Calculate how much of the section has been scrolled through
                if (scrollTop >= elementTop) {
                    const scrolledThroughSection = Math.min(scrollTop - elementTop, elementHeight);
                    progress = (scrolledThroughSection / elementHeight) * 100;
                } else {
                    progress = 0;
                }

                progress = Math.min(Math.max(progress, 0), 100);
            } else if (scrollTop >= elementBottom) {
                // Section is completely above viewport
                progress = 100;
            } else {
                // Section is completely below viewport
                progress = 0;
            }

            progressData.push({
                sectionIndex: index,
                progress: progress
            });
        });

        setSectionProgress(progressData);

        // Update active step based on current scroll position
        const currentSection = progressData.findIndex(section =>
            section.progress > 0 && section.progress < 100
        );

        if (currentSection !== -1) {
            setActiveStep(currentSection);
        } else {
            // Find the last completed section or if all are complete, set to last
            const lastCompletedIndex = progressData.reduce((lastIndex, section, index) =>
                section.progress === 100 ? index : lastIndex, -1
            );

            // If experience (index 3) is 100%, highlight contact (index 4)
            if (lastCompletedIndex === 3 || progressData[4]?.progress > 0) {
                setActiveStep(4);
            } else if (lastCompletedIndex >= 0) {
                setActiveStep(lastCompletedIndex);
            }
        }

    }, [refs]);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolling(true);
            calculateSectionProgress();

            if (scrollTimeout) {
                clearTimeout(scrollTimeout);
            }

            const timeout = setTimeout(() => {
                if (!isHover) {
                    setIsScrolling(false);
                }
            }, 1200);

            setScrollTimeout(timeout);
        };

        // Initial calculation
        calculateSectionProgress();

        window.addEventListener("scroll", handleScroll);
        window.addEventListener("resize", calculateSectionProgress);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", calculateSectionProgress);
            if (scrollTimeout) {
                clearTimeout(scrollTimeout);
            }
        };
    }, [calculateSectionProgress, scrollTimeout, isHover]);

    const handleStepClick = (index: number) => {
        setActiveStep(index);

        // Smooth scroll to the section
        const targetRef = refs[index];
        if (targetRef.current) {
            targetRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    };

    const getProgressForConnector = (index: number): number => {
        if (index >= sectionProgress.length) return 0;

        const currentSection = sectionProgress[index];
        // const nextSection = sectionProgress[index + 1];

        // If current section is completed, show 100%
        if (currentSection?.progress === 100) {
            return 100;
        }

        // If we're in the current section, show its progress
        if (currentSection?.progress > 0 && currentSection?.progress < 100) {
            return currentSection.progress;
        }

        return 0;
    };

    return (
        <AnimatePresence>
            {isScrolling && (
                <motion.div
                    onMouseEnter={() => setIsHover(true)}
                    onMouseLeave={() => {
                        setIsHover(false);
                        setIsScrolling(false);
                    }}
                    initial={{
                        opacity: 0,
                        x: -50,
                        scale: 0.8
                    }}
                    animate={{
                        opacity: 1,
                        x: 0,
                        scale: 1
                    }}
                    exit={{
                        opacity: 0,
                        x: -50,
                        scale: 0.8
                    }}
                    transition={{
                        duration: 0.3,
                        ease: "easeInOut"
                    }}
                    style={{
                        position: 'fixed',
                        left: 10,
                        height: 'auto',
                        display: 'flex',
                        alignItems: 'center',
                        zIndex: 1000,
                    }}
                    className='hidden sm:flex top-1/2 transform-gpu -translate-y-1/2'
                >
                    <Box
                        sx={{
                            // maxWidth: 400,
                            // width: 200,
                            color: 'white',
                            // height: 400,
                            display: 'flex',
                            flexDirection: 'column',
                            p: 2,
                            borderRadius: 2,
                            backdropFilter: 'blur(2px)',
                            // border: '1px solid #fff',
                        }}
                    >
                        {steps.map((step, index) => (
                            <div key={step.label}>
                                <Box
                                    onClick={() => handleStepClick(index)}
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        columnGap: 1,
                                        transition: 'all 0.3s ease',
                                        cursor: 'pointer',
                                        p: 0.5,
                                        borderRadius: 1,
                                        '&:hover': {
                                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                        },
                                    }}
                                >
                                    <Box
                                        sx={{
                                            p: 0.5,
                                            borderRadius: '50%',
                                            border: `2px solid ${activeStep === index ? '#fff' : '#888'}`,
                                            backgroundColor: activeStep === index ? '#fff' : 'transparent',
                                            color: activeStep === index ? '#007bff' : '#fff',
                                            transition: 'all 0.3s ease',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        {step.icon}
                                    </Box>
                                    <p className='mt-0.5 text-sm tracking-widest'>{step.label}</p>
                                </Box>

                                {/* Progress connector */}
                                {index < steps.length - 1 && (
                                    <Box
                                        sx={{
                                            height: 80,
                                            width: 2,
                                            backgroundColor: "rgba(255, 255, 255, 0.3)",
                                            mx: 2.4,
                                            my: 1,
                                            borderRadius: 1,
                                            position: 'relative',
                                            overflow: 'hidden',
                                        }}
                                    >
                                        <ProgressBar progress={getProgressForConnector(index)} />
                                    </Box>
                                )}
                            </div>
                        ))}
                    </Box>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

const ProgressBar = memo(({ progress }: { progress: number; }) => {
    return (
        <motion.div
            initial={{ height: "0%" }}
            animate={{ height: `${progress}%` }}
            transition={{
                duration: 0.3,
                ease: "easeOut"
            }}
            style={{
                width: "100%",
                backgroundColor: "#fff",
                borderRadius: 1,
                position: 'absolute',
                top: 0,
                left: 0,
            }}
        />
    );
});

ProgressBar.displayName = 'Navbar';

export default Navbar;