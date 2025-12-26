/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { RefObject, useEffect, useRef, useState } from "react";
import {
  useTransform,
  motion,
  useScroll,
  useMotionValueEvent,
} from "motion/react";
import { gsap } from "gsap";
import { Icon } from "@iconify/react";
import TextReveal from "../../utils/TextReveal";
import MagneticEffect from "@/utils/MagneticEffect";
import Link from "next/link";

interface Props {
  container: RefObject<HTMLElement | null>;
  lenisRef: RefObject<any>;
  aboutRef: RefObject<HTMLDivElement | null>;
}

const icon = [
  {
    icon: "icomoon-free:behance2",
    link: "https://www.behance.net/nitinkhatri/",
  },
  {
    icon: "uiw:linkedin",
    link: "https://www.linkedin.com/in/nitin-visualdesigner/",
  },
  {
    icon: "simple-icons:instagram",
    link: "https://www.instagram.com/iam_niits/",
  },
];

const words = [
  "Creative Designer",
  "Video Editor",
  "Product Designer",
  "Motion Expert",
];

const About = ({ container, lenisRef, aboutRef }: Props) => {
  // State to track when scale equals 1
  const [isScaleOne, setIsScaleOne] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const textContainerRef = useRef<HTMLDivElement>(null);


  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });
  const scale = useTransform(
    scrollYProgress,
    [0, 0.5, 0.8, 1],
    [1, 0.8, 0.8, 1]
  );

  // Listen to scale changes and update state
  useMotionValueEvent(scale, "change", (latest) => {
    if (isScaleOne) return;
    setIsScaleOne(latest === 1);
  });

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const update = () => setIsMobile(mq.matches);
    update();
    if (mq.addEventListener) mq.addEventListener("change", update);
    else mq.addListener(update);
    return () => {
      if (mq.removeEventListener) mq.removeEventListener("change", update);
      else mq.removeListener(update);
    };
  }, []);

  // useEffect(() => {
  //   // Check if device is mobile/tablet
  //   const checkMobile = () => {
  //     setIsMobile(window.innerWidth < 1024); // lg breakpoint
  //   };

  //   checkMobile();
  //   window.addEventListener("resize", checkMobile);

  //   return () => window.removeEventListener("resize", checkMobile);
  // }, []);

  // Trigger animation when textContainerRef is available

  useEffect(() => {
    if (!textContainerRef.current) return;

    const container = textContainerRef.current;
    const targets = container.children;
    const numberOfTargets = targets.length;

    if (numberOfTargets === 0) return;

    const duration = 0.5;
    const pause = 1;
    const stagger = duration + pause;
    const repeatDelay = stagger * (numberOfTargets - 1) + pause;

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
          repeatDelay: repeatDelay,
        },
      })
      .to(
        targets,
        {
          y: -80,
          duration: duration,
          opacity: 0,
          stagger: {
            each: stagger,
            repeat: -1,
            repeatDelay: repeatDelay,
          },
        },
        stagger
      );

    // Cleanup function to prevent memory leaks and animation conflicts
    return () => {
      if (animation) {
        animation.kill(); // Kill the timeline
      }
      // Reset elements to their default state
      gsap.set(targets, {
        y: 0,
        opacity: 1,
        clearProps: "all", // Clear all GSAP-set properties
      });
      gsap.set(container, {
        autoAlpha: 1,
        clearProps: "all",
      });
    };
  }, [isScaleOne]);

  useEffect(() => {
    if (isMobile) return;
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      if (latest >= 1 && lenisRef.current) {
        if (isMobile) return;
        console.log(isMobile);
        lenisRef.current.stop();
        setTimeout(() => {
          lenisRef.current.start();
        }, 10);
      } else if (latest < 1 && lenisRef.current) {
        if (isMobile) return;
        lenisRef.current.start();
      }
    });

    return () => unsubscribe();
  }, [scrollYProgress, lenisRef, isMobile]);

  // Show content only when scale is 1
  if (!isScaleOne && !isMobile) {
    return (
      <motion.div
        ref={aboutRef}
        className="font-Glitz h-screen bg-[#17171c] text-white flex justify-center items-center relative"
        style={{ scale: isMobile ? 1 : scale }}
        transition={{
          duration: 1.2,
          ease: [0.76, 0, 0.24, 1],
          delay: 0.2,
        }}
        exit={{ scale: 0 }}
      >
        <p className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-[#ff7171] text-center px-4">
          ABOUT ME
        </p>
      </motion.div>
    );
  }

  return (
    <div className="font-Glitz" ref={aboutRef} id="aboutme">
      <motion.div
        className="bg-[#17171c] text-white overflow-x-hidden relative"
        style={{ scale: isMobile ? 1 : scale }}
      >
        {/* Animated background grid */}
        <div className="absolute inset-0 opacity-10">
          <div className="h-full w-full bg-gradient-to-br from-[#e7436f]/20 via-transparent to-[#e7436f]/10"></div>
          <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_24%,rgba(255,255,255,0.05)_25%,rgba(255,255,255,0.05)_26%,transparent_27%,transparent_74%,rgba(255,255,255,0.05)_75%,rgba(255,255,255,0.05)_76%,transparent_77%,transparent)] bg-[length:100px_100px]"></div>
        </div>

        {/* Welcome content */}
        <motion.div
          transition={{ duration: 4.5, delay: 1.2 }}
          animate={{ display: "none" }}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 20,
          }}
          className="hidden sm:block"
        >
          {/* About me text - appears first and slides out */}
          <motion.div
            className="h-screen bg-[#17171c] text-white flex justify-center items-center relative"
            transition={{
              ease: "easeOut",
              duration: 0.8,
              delay: 0.25,
            }}
            initial={{ x: "0%" }}
            animate={{ x: "-100%" }}
          >
            <p className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-[#ff7171] text-center px-4">
              ABOUT ME
            </p>
          </motion.div>

          {/* Welcome section - appears after ABOUT ME slides out */}
          {/* <motion.div
            className="h-screen absolute inset-0 bg-[#17171c] text-white"
            transition={{
              duration: 0.6,
              delay: 0.8, // Starts after ABOUT ME finishes sliding
              ease: "easeOut",
            }}
            initial={{ x: "100%" }}
            animate={{ x: "0%" }}
          >
            <div className="absolute inset-0 opacity-10">
              <div className="h-full w-full bg-gradient-to-br from-[#e7436f]/20 via-transparent to-[#e7436f]/10"></div>
              <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_24%,rgba(255,255,255,0.05)_25%,rgba(255,255,255,0.05)_26%,transparent_27%,transparent_74%,rgba(255,255,255,0.05)_75%,rgba(255,255,255,0.05)_76%,transparent_77%,transparent)] bg-[length:100px_100px]"></div>
            </div>

            <div className="flex items-center justify-center h-full relative z-10">
              <div className="text-center space-y-8 max-w-4xl px-8">
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.2 }} // Delayed to appear after welcome section slides in
                  className="space-y-4"
                >
                  <motion.h1
                    className="text-6xl sm:text-7xl md:text-8xl xl:text-9xl font-bold tracking-tight text-white"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 1.4 }}
                  >
                    WELCOME
                  </motion.h1>
                  <motion.div
                    className="text-xl sm:text-2xl xl:text-3xl text-[#e7436f] font-medium"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 1.6 }}
                  >
                    TO MY CREATIVE UNIVERSE
                  </motion.div>
                </motion.div>

                <motion.p
                  className="text-lg sm:text-xl xl:text-2xl text-gray-300 max-w-2xl mx-auto leading-relaxed"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.8 }}
                >
                  Where design meets motion, and creativity knows no bounds.
                  Scroll to discover my journey through visual storytelling.
                </motion.p>

                <div className="absolute inset-0 pointer-events-none">
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 bg-[#e7436f] rounded-full opacity-60"
                      style={{
                        left: `${20 + i * 15}%`,
                        top: `${30 + (i % 2) * 40}%`,
                      }}
                      animate={{
                        y: [-20, 20, -20],
                        opacity: [0.3, 0.8, 0.3],
                        scale: [0.8, 1.2, 0.8],
                      }}
                      transition={{
                        duration: 3 + i * 0.5,
                        repeat: Infinity,
                        delay: 2 + i * 0.3,
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>

            <motion.div
              className="absolute inset-0 bg-[#17171c] z-30"
              initial={{ x: "100%" }}
              animate={{ x: "0%" }}
              transition={{
                duration: 0.6,
                delay: 4,
                ease: "easeOut",
              }}
            />
          </motion.div> */}
        </motion.div>

        {/* Main content with staggered entrance */}
        <motion.div
          className="flex flex-col justify-center items-center lg:flex-row h-screen sm:min-h-screen xl:h-screen w-full relative p-10 z-50 bg-[#17171c]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: isMobile ? 0 : 0.9 }}
        >
          {/* Image section - hidden on mobile/tablet, visible on lg+ */}
          <motion.div
            className="hidden h-full! lg:flex sm:w-2/5 lg:w-fit xl:w-2/5 2xl:min-w-fit flex-col justify-center items-center p-4 lg:p-6 xl:p-8 z-10"
            initial={{ opacity: 0, x: -100, rotateY: -15 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{
              duration: 0.8,
              delay: isMobile ? 0 : 1,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            <motion.div className="h-full flex justify-center items-center hover:scale-105 hover:rotate-y-5 transition-all duration-300 my-auto">
              <motion.img
                src="/img/Profile.jpg"
                className="xl:h-[75vh] lg:h-[60vh] md:h-[50vh] filter drop-shadow-2xl my-auto"
                alt="Nitin Khatri"
                initial={{ scale: 0.8, filter: "blur(10px)" }}
                animate={{ scale: 1, filter: "blur(0px)" }}
                transition={{
                  duration: 1,
                  delay: isMobile ? 0 : 1.4,
                  ease: "easeOut",
                }}
              />
            </motion.div>
          </motion.div>

          {/* Content section - full width on mobile/tablet, flex on lg+ */}
          <motion.div
            // className="w-3/5 md:w-full flex flex-col justify-center p-6 sm:p-8 md:p-10 lg:p-8 xl:p-12 2xl:p-16"
            className="md:w-full flex flex-col justify-center p-3 sm:p-8 md:p-10 lg:p-8 xl:p-12 2xl:p-16"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.8,
              delay: isMobile ? 0 : 1.3,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            <div className="flex flex-col justify-center gap-3 sm:gap-5 md:gap-3 lg:gap-4 xl:gap-8 2xl:gap-10">
              {/* ABOUT ME Title */}
              <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  duration: 0.8,
                  delay: isMobile ? 0 : 1.5,
                  ease: "easeOut",
                }}
              >
                <TextReveal delay={isMobile ? 0 : 1.5}>
                  <motion.div
                    className="w-full text-2xl md:text-3xl lg:text-5xl xl:text-7xl 2xl:text-8xl tracking-[0rem] text-slate-200 font-semibold"
                  >
                    About Me
                  </motion.div>
                </TextReveal>
              </motion.div>

              {/* Name and Animated Role */}
              <motion.div
                className="w-full flex flex-col sm:flex-row sm:items-center text-xl sm:text-2xl md:text-3xl lg:text-2xl xl:text-3xl 2xl:text-4xl tracking-[0rem] text-[#ff7171] gap-2 sm:gap-3 lg:gap-2 xl:gap-3 font-SpaceGrotesk font-semibold"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: isMobile ? 0 : 1.7,
                  ease: "easeOut",
                }}
              >
                <TextReveal delay={isMobile ? 0 : 1.7}>
                  <motion.span
                    className="w-full"
                    whileHover={{
                      scale: 1.05,
                      // color: "#ff6b9d",
                      transition: {
                        duration: 0.2,
                      },
                    }}
                  >
                    Nitin Khatri <span className="hidden sm:inline">-</span>
                  </motion.span>
                </TextReveal>
                <motion.div
                  className="relative min-w-[200px] sm:min-w-[250px] md:min-w-[300px] lg:min-w-[250px] xl:min-w-[300px] 2xl:min-w-[350px] h-[1.2em]"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.2,
                    delay: isMobile ? 0 : 1.9,
                    ease: "easeOut",
                  }}
                >
                  <div className="flex flex-col" ref={textContainerRef}>
                    {isMobile ?
                      (
                        <span
                          className="absolute top-0 left-0 whitespace-nowrap h-[1.2em] flex items-center"
                        >
                          {words[0]}
                        </span>
                      ) : words.map((word, index) => (
                        <span
                          key={index}
                          className="absolute top-0 left-0 whitespace-nowrap h-[1.2em] flex items-center"
                        >
                          {word}
                        </span>
                      ))}
                  </div>
                </motion.div>
              </motion.div>

              {/* Description Paragraph */}
              <motion.div
                className="w-full text-[1rem] sm:text-sm md:text-[16px] lg:text-xl xl:text-xl 2xl:text-[2.5rem] tracking-[0rem] font-Glitz-light font-light xl:leading-[1.2]"
                initial="hidden"
                animate="visible"
                transition={{
                  duration: 0.8,
                  delay: isMobile ? 0 : 2,
                  ease: "easeOut",
                  staggerChildren: 0.2,
                }}
                variants={{
                  hidden: {},
                  visible: {},
                }}
              >
                <motion.p
                  className="w-full leading-[1.2] text-gray-300 font-SpaceGrotesk"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                >
                  I’m a creative professional with 10+ years of experience in graphic design and video editing, creating visually engaging work across fintech, Web3, gaming, and global branding campaigns.
                </motion.p>
                <motion.p
                  className="w-full leading-[1.2] text-gray-300 font-SpaceGrotesk"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                >
                  My work spans branding, social media creatives, motion graphics, and video editing, with a growing interest in 3D design to add depth and realism to visual storytelling. I focus on turning ideas into strong visuals that communicate clearly and leave a lasting impression.
                </motion.p>
              </motion.div>

              {/* Social Icons */}
              <motion.div
                className="flex items-center justify-start space-x-4 sm:space-x-5 lg:space-x-4 xl:space-x-5 w-full pt-2"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: isMobile ? 0 : 2.2,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              >
                {icon.map((iconItem, index) => (
                  <MagneticEffect key={index}>
                    <Link href={iconItem.link} target="_blank">
                      <Icon
                        className="text-white cursor-pointer hover:text-[#ff7171] transition-colors duration-300"
                        icon={iconItem.icon}
                        width="36"
                        height="36"
                      />
                    </Link>
                  </MagneticEffect>
                ))}
              </motion.div>
            </div>
          </motion.div>

          {/* Floating elements for main content */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-[#ff7171] rounded-full opacity-60"
                style={{
                  left: `${20 + i * 15}%`,
                  top: `${30 + (i % 2) * 40}%`,
                }}
                animate={{
                  y: [-20, 20, -20],
                  opacity: [0.3, 0.8, 0.3],
                  scale: [0.8, 1.2, 0.8],
                }}
                transition={{
                  duration: 3 + i * 0.5,
                  repeat: Infinity,
                  delay: 1.2 + i * 0.3,
                }}
              />
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default About;