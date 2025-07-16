import { RefObject } from "react";
import { useTransform, motion, useScroll } from "motion/react";

const About = ({ container }: { container: RefObject<HTMLElement | null> }) => {
    
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start start', 'end end']
    })
    const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);

    return (
        <motion.div style={{ scale }} className="h-screen bg-white border-2 border-pink z-30">

        </motion.div>
    )
}

export default About