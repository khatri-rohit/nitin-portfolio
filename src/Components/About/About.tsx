import { RefObject, useEffect } from "react";
import { useTransform, motion, useScroll } from "motion/react";

interface Props {
    container: RefObject<HTMLElement | null>
    lenisRef: RefObject<any>;
}

const About = ({ container, lenisRef }: Props) => {

    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start start', 'end end']
    })
    const scale = useTransform(scrollYProgress, [0, 0.5, 0.8, 1], [1, 0.8, 0.8, 1]);

    useEffect(() => {
        const unsubscribe = scrollYProgress.on("change", (latest) => {
            // Stop scroll when reaching the end of About component (progress = 1)
            if (latest >= 1 && lenisRef.current) {
                lenisRef.current.stop();
                setTimeout(() => {
                    lenisRef.current.start();
                }, 10);
            }
            // Optionally restart scroll if user scrolls back
            else if (latest < 1 && lenisRef.current) {
                lenisRef.current.start();
            }
        });

        return () => unsubscribe();
    }, [scrollYProgress, lenisRef]);

    return (
        <motion.div style={{ scale }} className="h-screen bg-[#191c22]">
        </motion.div>
    )
}

export default About