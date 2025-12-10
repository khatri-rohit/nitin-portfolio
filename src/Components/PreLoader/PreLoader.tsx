'use client';

import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import styles from './style.module.css';

const words = [
    "Namaste",
    "Hello",
    "Hola",
    "Bonjour",
    "Ciao",
    "Guten tag",
    "Nǐ hǎo",
];

export default function PreLoader() {
    const [index, setIndex] = useState(0);
    const [dimension, setDimension] = useState({ width: 0, height: 0 });

    const initialPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height + 300} 0 ${dimension.height}  L0 0`;
    const targetPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height} 0 ${dimension.height}  L0 0`;

    const curve = {
        initial: {
            d: initialPath,
            transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] as const }
        },
        exit: {
            d: targetPath,
            transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] as const, delay: 0.3 }
        }
    };

    const slideUp = {
        initial: {
            y: 0
        },
        exit: {
            y: "-100vh",
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] as const, delay: 0.52 }
        }
    };

    const opacity = {
        initial: {
            opacity: 0
        },
        enter: {
            opacity: 0.75,
            transition: { duration: 1.5, delay: 0.2 }
        },
    };

    useEffect(() => {
        setDimension({ width: window.innerWidth, height: window.innerHeight });
    }, []);
    // const countRef = useRef(1000);
    useEffect(() => {
        if (index == words.length - 1) return;
        setTimeout(() => {
            setIndex(index + 1);
            // countRef.current += 150;
        }, index == 0 ? 1000 : 150);
        // console.log(countRef.current);
    }, [index]);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const prevStyles = {
            position: document.body.style.position,
            top: document.body.style.top,
            left: document.body.style.left,
            right: document.body.style.right,
            overflow: document.body.style.overflow,
        };
        const savedScroll = { y: window.scrollY || window.pageYOffset };

        const lock = () => {
            savedScroll.y = window.scrollY || window.pageYOffset;
            document.body.style.position = 'fixed';
            document.body.style.top = `-${savedScroll.y}px`;
            document.body.style.left = '0';
            document.body.style.right = '0';
            document.body.style.overflow = 'hidden';
        };

        const unlock = () => {
            document.body.style.position = prevStyles.position || '';
            document.body.style.top = prevStyles.top || '';
            document.body.style.left = prevStyles.left || '';
            document.body.style.right = prevStyles.right || '';
            document.body.style.overflow = prevStyles.overflow || '';
            window.scrollTo(0, savedScroll.y);
        };

        // lock while index is not the last word (index 6)
        if (index !== words.length - 1) {
            lock();
        } else {
            unlock();
        }

        return () => {
            // ensure restore on unmount
            unlock();
        };
    }, [index]);

    return (
        <motion.div variants={slideUp} initial="initial" exit="exit" className={styles.introduction}>
            {dimension.width > 0 &&
                <>
                    <motion.p variants={opacity} initial="initial" animate="enter" className='text-[3.5rem]!'>
                        <span></span>{words[index]}
                    </motion.p>
                    <svg className={styles.svg}>
                        <motion.path variants={curve} initial="initial" exit="exit"></motion.path>
                    </svg>
                </>
            }
        </motion.div>
    );
}