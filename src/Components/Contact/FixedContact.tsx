import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "motion/react";
import { Icon } from "@iconify/react";
import { ArrowUpRight, Mail, Phone, User, MapPin, Github, Linkedin, } from 'lucide-react';
import Link from 'next/link';

const FixedContact = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [showTooltip, setShowTooltip] = useState(true);
    const [hasInteracted, setHasInteracted] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    // Detect mobile devices
    useEffect(() => {
        const checkIsMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkIsMobile();
        window.addEventListener('resize', checkIsMobile);

        return () => window.removeEventListener('resize', checkIsMobile);
    }, []);

    // Hide tooltip after 5 seconds of showing
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowTooltip(true);
        }, 10000);

        if (showTooltip) {
            const hideTimer = setTimeout(() => {
                setShowTooltip(false);
            }, 5000);

            return () => {
                clearTimeout(timer);
                clearTimeout(hideTimer);
            };
        }
    }, [showTooltip]);

    const handleUserInteraction = () => {
        setHasInteracted(true);
        setShowTooltip(false);
    };

    const contactInfo = [
        {
            icon: Mail,
            label: "Email",
            value: "nitinkhatri312@gmail.com",
            href: "mailto:nitinkhatri312@gmail.com",
            color: "from-blue-400 to-cyan-400"
        },
        {
            icon: Phone,
            label: "Phone",
            value: "+91 6378356518",
            href: "tel:+916378356518",
            color: "from-green-400 to-emerald-400"
        }
    ];

    const socialLinks = [
        {
            icon: "icomoon-free:behance2",
            link: "https://www.behance.net/nitinkhatri/"
        },
        {
            icon: "uiw:linkedin",
            link: "https://www.linkedin.com/in/nitin-visualdesigner/"
        },
        {
            icon: "simple-icons:instagram",
            link: "https://www.instagram.com/iam_niits/"
        },
    ];

    return (
        <motion.div
            className="fixed bottom-3 left-3 md:bottom-6 md:left-6 z-50 font-SpaceGrotesk cursor-pointer"
            onHoverStart={() => {
                setIsHovered(true);
                // setIsExpanded(true);
                // handleUserInteraction();
            }}
            onHoverEnd={() => {
                setIsHovered(false);
                // setIsExpanded(false);
            }}
            onClick={() => {
                setIsExpanded(!isExpanded);
                handleUserInteraction();
            }}
        >
            {/* Main Contact Button */}
            <motion.button
                className="relative group bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white rounded-xl md:rounded-2xl border border-slate-700/50 backdrop-blur-sm shadow-2xl hover:shadow-slate-900/30 transition-all duration-300"
                whileHover={{ scale: isMobile ? 1 : 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: "spring", damping: 20, stiffness: 300 }}
            >
                {/* Animated gradient border */}
                <div className="absolute inset-0 rounded-xl md:rounded-2xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm -z-10" />

                <div className="relative px-3 py-2 md:px-6 md:py-3 flex items-center gap-2 md:gap-3">
                    <motion.div
                        className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg"
                        animate={{
                            rotate: isHovered ? 360 : 0,
                            scale: isExpanded ? 1.1 : 1
                        }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                    >
                        <User className="w-4 h-4 md:w-5 md:h-5 text-white" />
                    </motion.div>

                    <div className="flex flex-col items-start">
                        <motion.span
                            className="text-xs md:text-sm text-white"
                            animate={{
                                x: isExpanded ? 5 : 0,
                                color: isExpanded ? "#60a5fa" : "#ffffff"
                            }}
                        >
                            Get in Touch
                        </motion.span>
                        <motion.span
                            className="text-[10px] md:text-xs text-slate-400"
                            animate={{ opacity: isHovered || isExpanded ? 1 : 0.7 }}
                        >
                            Let's connect
                        </motion.span>
                    </div>

                    <motion.div
                        animate={{
                            rotate: isExpanded ? 45 : 0,
                            scale: isHovered || isExpanded ? 1.2 : 1
                        }}
                        transition={{ duration: 0.3 }}
                    >
                        <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5 text-slate-300" />
                    </motion.div>
                </div>
            </motion.button>

            {/* Tooltip - Desktop only */}
            <AnimatePresence>
                {showTooltip && !hasInteracted && !isMobile && (
                    <motion.div
                        className="absolute -top-16 left-1/2 transform -translate-x-1/2"
                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.9 }}
                        transition={{ type: "spring", damping: 20, stiffness: 300, delay: 1 }}
                    >
                        <div className="relative">
                            <div className="bg-gradient-to-r from-slate-800 to-slate-900 text-white px-4 py-2 rounded-xl shadow-2xl border border-slate-600/50 backdrop-blur-sm whitespace-nowrap text-[10px] font-medium">
                                <motion.span
                                    animate={{ opacity: [0.7, 1, 0.7] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                >
                                    👋 {isMobile ? 'Tap' : 'Click'} me to get in touch!
                                </motion.span>
                            </div>
                            <div className="absolute top-full left-1/2 transform -translate-x-1/2">
                                <div className="border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-slate-800"></div>
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl blur-lg -z-10 animate-pulse"></div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Expanded Contact Panel */}
            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        className="absolute bottom-full left-0 mb-2 md:mb-4 w-[calc(100vw-1.5rem)] max-w-sm md:w-80 md:max-w-none"
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ type: "spring", damping: 25, stiffness: 400 }}
                    >
                        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-xl md:rounded-2xl border border-slate-700/50 backdrop-blur-md shadow-2xl overflow-hidden">
                            {/* Header */}
                            <div className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 p-3 md:p-4 border-b border-slate-700/50">
                                <div className="flex items-center gap-3">
                                    <motion.div
                                        className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg"
                                        animate={{ rotate: [0, 5, -5, 0] }}
                                        transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                                    >
                                        <User className="w-5 h-5 md:w-6 md:h-6 text-white" />
                                    </motion.div>
                                    <div>
                                        <h3 className="text-white text-sm md:text-base font-medium">Nitin Khatri</h3>
                                        <p className="text-slate-400 text-xs md:text-sm">Graphic Designer</p>
                                    </div>
                                </div>
                            </div>

                            {/* Contact Information */}
                            <div className="p-3 md:p-4 space-y-2 md:space-y-3">
                                {contactInfo.map((contact, index) => {
                                    const Icon = contact.icon;
                                    return (
                                        <motion.a
                                            key={contact.label}
                                            href={contact.href}
                                            className="flex items-center gap-3 md:gap-4 p-2 md:p-3 rounded-lg md:rounded-xl hover:bg-slate-800/50 transition-all duration-200 group/item"
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                            whileHover={{ x: isMobile ? 0 : 5 }}
                                        >
                                            <div className={`w-8 h-8 md:w-10 md:h-10 rounded-md md:rounded-lg bg-gradient-to-br ${contact.color} flex items-center justify-center shadow-lg group-hover/item:shadow-lg group-hover/item:scale-110 transition-all duration-200`}>
                                                <Icon className="w-4 h-4 md:w-5 md:h-5 text-white" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-slate-400 text-[10px] md:text-xs font-medium">{contact.label}</p>
                                                <p className="text-white text-xs md:text-sm truncate group-hover/item:text-blue-400 transition-colors duration-200">
                                                    {contact.value}
                                                </p>
                                            </div>
                                            <ArrowUpRight className="w-3 h-3 md:w-4 md:h-4 text-slate-500 group-hover/item:text-blue-400 group-hover/item:translate-x-1 group-hover/item:-translate-y-1 transition-all duration-200" />
                                        </motion.a>
                                    );
                                })}
                            </div>

                            {/* Social Links */}
                            <div className="p-3 md:p-4 border-t border-slate-700/50">
                                <p className="text-slate-400 text-[10px] md:text-xs font-medium mb-2 md:mb-3">Connect with me</p>
                                <div className="flex gap-2 md:gap-3">
                                    {socialLinks.map((social, index) => (
                                        <Link key={index} href={social.link} target="_blank">
                                            <motion.div
                                                className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-slate-700/50 hover:bg-slate-600/50 flex items-center justify-center transition-all duration-200 hover:scale-110"
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                <Icon
                                                    className="text-slate-200 cursor-pointer"
                                                    icon={social.icon}
                                                    width="25"
                                                    height="25"
                                                />

                                            </motion.div>
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            {/* Decorative elements */}
                            <div className="absolute top-0 right-0 w-16 h-16 md:w-32 md:h-32 bg-gradient-to-bl from-blue-500/5 to-transparent rounded-full blur-2xl" />
                            <div className="absolute bottom-0 left-0 w-12 h-12 md:w-24 md:h-24 bg-gradient-to-tr from-purple-500/5 to-transparent rounded-full blur-2xl" />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Floating particles effect when expanded */}
            <AnimatePresence>
                {isExpanded && !isMobile && (
                    <motion.div className="absolute inset-0 pointer-events-none">
                        {[...Array(6)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute w-1 h-1 bg-blue-400/30 rounded-full"
                                initial={{
                                    opacity: 0,
                                    x: Math.random() * 200,
                                    y: Math.random() * 200
                                }}
                                animate={{
                                    opacity: [0, 1, 0],
                                    y: [0, -30, -60],
                                    x: [0, Math.random() * 20 - 10]
                                }}
                                transition={{
                                    duration: 2,
                                    delay: i * 0.2,
                                    repeat: Infinity,
                                    repeatDelay: 1
                                }}
                            />
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default FixedContact;