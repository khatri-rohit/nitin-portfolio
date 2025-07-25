'use client';

import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import styles from './style.module.css';

const words = ["Hello", "Bonjour", "Ciao", "Olà", "やあ", "Hallå", "Guten tag", "Hallo"]

export default function PreLoader() {
    const [index, setIndex] = useState(0);
    const [dimension, setDimension] = useState({ width: 0, height: 0 });

    useEffect(() => {
        setDimension({ width: window.innerWidth, height: window.innerHeight })
    }, [])

    useEffect(() => {
        if (index == words.length - 1) return;
        setTimeout(() => {
            setIndex(index + 1)
        }, index == 0 ? 1000 : 150)
    }, [index])

    const initialPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height + 300} 0 ${dimension.height}  L0 0`
    const targetPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height} 0 ${dimension.height}  L0 0`

    const curve = {
        initial: {
            d: initialPath,
            transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] as const }
        },
        exit: {
            d: targetPath,
            transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] as const, delay: 0.3 }
        }
    }

    const slideUp = {
        initial: {
            y: 0
        },
        exit: {
            y: "-100vh",
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] as const, delay: 0.2 }
        }
    }

    const opacity = {
        initial: {
            opacity: 0
        },
        enter: {
            opacity: 0.75,
            transition: { duration: 1, delay: 0.2 }
        },
    }

    return (
        <motion.div variants={slideUp} initial="initial" exit="exit" className={styles.introduction}>
            {dimension.width > 0 &&
                <>
                    <motion.p variants={opacity} initial="initial" animate="enter" className='text-[3.5rem]! font-sans'>
                        <span></span>{words[index]}
                    </motion.p>
                    <svg className={styles.svg}>
                        <motion.path variants={curve} initial="initial" exit="exit"></motion.path>
                    </svg>
                </>
            }
        </motion.div>
    )
}