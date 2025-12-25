/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

export interface TimelineItem {
    id: number;
    logo: string;
    title: string;
    role?: string;
    description: string;
    duration?: string; // e.g., "2021 - 2023" or "Jun 2022"
    period?: string;   // e.g., "2 years" or "6 months"
}

interface TimelineProps {
    items: TimelineItem[];
}

interface Props {
    experienceRef: React.RefObject<HTMLElement | null>;
}

const Timeline = ({ items, experienceRef }: TimelineProps & Props) => {
    return (
        <section
            ref={experienceRef}
            className="bg-neutral-900 py-20 lg:py-32 overflow-x-hidden font-SpaceGrotesk border-b"
            id="experience"
            role="region"
            aria-label="Experience and Freelance Timeline"
        >
            <div className="max-w-5xl mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.8, ease: [0.25, 0.25, 0.25, 0.75] }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 font-Glitz">
                        Experience & Freelance
                    </h2>
                    <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
                        A journey of achievements, recognition, and continuous growth
                    </p>
                </motion.div>

                <div className="relative">
                    {/* Central Timeline Line - Full height with proper centering */}
                    <div
                        className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-indigo-500 via-neutral-700 to-indigo-500 transform -translate-x-1/2 z-0"
                        style={{ height: '100%' }}
                        aria-hidden="true"
                    />

                    {/* Timeline Items */}
                    <div className="space-y-16 md:space-y-24">
                        {items.map((item, index) => (
                            <TimelineCard
                                key={item.id}
                                item={item}
                                index={index}
                                isLeft={index % 2 === 0}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

interface TimelineCardProps {
    item: TimelineItem;
    index: number;
    isLeft: boolean;
}

const TimelineCard = ({ item, index, isLeft }: TimelineCardProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, {
        once: true,
        margin: "-20%"
    });

    // Simplified animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: index * 0.1,
            },
        },
    };

    const cardVariants = {
        hidden: {
            opacity: 0,
            x: isLeft ? -50 : 50,
            y: 30,
        },
        visible: {
            opacity: 1,
            x: 0,
            y: 0,
            transition: {
                duration: 0.6,
                ease: [0.25, 0.46, 0.45, 0.94],
            },
        },
    };

    const dotVariants = {
        hidden: {
            scale: 0,
            opacity: 0,
        },
        visible: {
            scale: 1,
            opacity: 1,
            transition: {
                duration: 0.4,
                ease: "backOut",
            },
        },
    };

    const mobileCardVariants = {
        hidden: {
            opacity: 0,
            x: 30,
            y: 20,
        },
        visible: {
            opacity: 1,
            x: 0,
            y: 0,
            transition: {
                duration: 0.6,
                ease: [0.25, 0.46, 0.45, 0.94],
            },
        },
    };

    return (
        <motion.div
            ref={containerRef}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="relative flex items-center"
        >
            {/* Desktop Layout */}
            <div className="hidden md:flex w-full items-center relative">
                {isLeft ? (
                    <>
                        {/* Left Card */}
                        <motion.div
                            variants={cardVariants as any}
                            className="w-1/2 pr-12 flex justify-end"
                        >
                            <div className="w-full max-w-md">
                                <TimelineCardContent item={item} isDesktop={true} />
                            </div>
                        </motion.div>

                        {/* Center Dot - Absolutely positioned to center line */}
                        <motion.div
                            variants={dotVariants as any}
                            className="absolute left-1/2 transform -translate-x-1/2 z-20 w-4 h-4 rounded-full bg-indigo-500 shadow-lg shadow-indigo-500/30 ring-4 ring-neutral-900"
                            aria-hidden="true"
                        />

                        {/* Right Spacer */}
                        <div className="w-1/2 pl-12" />
                    </>
                ) : (
                    <>
                        {/* Left Spacer */}
                        <div className="w-1/2 pr-12" />

                        {/* Center Dot - Absolutely positioned to center line */}
                        <motion.div
                            variants={dotVariants as any}
                            className="absolute left-1/2 transform -translate-x-1/2 z-20 w-4 h-4 rounded-full bg-indigo-500 shadow-lg shadow-indigo-500/30 ring-4 ring-neutral-900"
                            aria-hidden="true"
                        />

                        {/* Right Card */}
                        <motion.div
                            variants={cardVariants as any}
                            className="w-1/2 pl-12 flex justify-start"
                        >
                            <div className="w-full max-w-md">
                                <TimelineCardContent item={item} isDesktop={true} />
                            </div>
                        </motion.div>
                    </>
                )}
            </div>

            {/* Mobile Layout */}
            <div className="md:hidden flex w-full items-center relative">
                {/* Center Dot - Absolutely positioned */}
                <motion.div
                    variants={dotVariants as any}
                    className="absolute left-6 transform -translate-x-1/2 z-20 w-4 h-4 rounded-full bg-indigo-500 shadow-lg shadow-indigo-500/30 ring-4 ring-neutral-900"
                    aria-hidden="true"
                />

                {/* Card */}
                <motion.div
                    variants={mobileCardVariants as any}
                    className="pl-12 w-full"
                >
                    <TimelineCardContent item={item} isDesktop={false} />
                </motion.div>

                {/* Mobile timeline line */}
                <div
                    className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-indigo-500 via-neutral-700 to-indigo-500 transform -translate-x-1/2 z-0"
                    aria-hidden="true"
                />
            </div>
        </motion.div>
    );
};

const TimelineCardContent = ({ item, isDesktop }: { item: TimelineItem; isDesktop: boolean; }) => {
    return (
        <motion.article
            whileHover={{
                scale: 1.02,
                transition: { duration: 0.2, ease: "easeOut" }
            }}
            className="bg-neutral-800 border border-neutral-700 rounded-2xl p-6 shadow-lg hover:border-indigo-500 hover:shadow-indigo-500/20 transition-all duration-300 cursor-pointer group relative overflow-hidden"
        >
            {/* Desktop Duration Badge - Absolute positioned */}
            {isDesktop && (item.duration || item.period) && (
                <div className="absolute top-4 right-4 flex flex-col items-end gap-1">
                    {item.duration && (
                        <span className="text-xs font-medium text-neutral-500 bg-neutral-700 px-2 py-1 rounded-full whitespace-nowrap">
                            {item.duration}
                        </span>
                    )}
                    {item.period && (
                        <span className="text-xs font-bold text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2 py-1 rounded-full whitespace-nowrap">
                            {item.period}
                        </span>
                    )}
                </div>
            )}

            {/* Mobile Duration Badges - Positioned below content */}
            {!isDesktop && (item.duration || item.period) && (
                <div className="flex flex-wrap gap-2 mb-4">
                    {item.duration && (
                        <span className="text-xs font-medium text-neutral-500 bg-neutral-700 px-2 py-1 rounded-full whitespace-nowrap">
                            {item.duration}
                        </span>
                    )}
                    {item.period && (
                        <span className="text-xs font-bold text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2 py-1 rounded-full whitespace-nowrap">
                            {item.period}
                        </span>
                    )}
                </div>
            )}

            {/* Logo and Content */}
            <div className={`flex items-start gap-4 ${isDesktop ? 'mb-4' : 'mb-3'}`}>
                <div className="relative w-12 h-12 flex-shrink-0 rounded-xl overflow-hidden bg-neutral-700 group-hover:bg-neutral-600 transition-colors duration-300">
                    <Image
                        src={item.logo}
                        alt={`${item.title} logo`}
                        fill
                        className="object-cover"
                        sizes="48px"
                    />
                </div>

                <div className={`flex-1 min-w-0 ${isDesktop ? 'pr-16' : ''}`}>
                    <h3 className={`${isDesktop ? 'text-lg md:text-xl' : 'text-lg'} text-white transition-colors duration-300 line-clamp-2 mb-1 font-Glitz`}>
                        {item.title}
                    </h3>
                    {item.role && (
                        <p className="text-sm text-neutral-300 font-medium mb-2">
                            {item.role}
                        </p>
                    )}
                </div>
            </div>

            {/* Description */}
            <p className="text-sm text-neutral-400 leading-relaxed group-hover:text-neutral-300 transition-colors duration-300">
                {item.description}
            </p>

            {/* Subtle gradient overlay on hover */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        </motion.article>
    );
};

export default Timeline;