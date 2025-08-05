import TextReveal from '@/utils/TextReveal';
import { motion } from "motion/react";

const CreativeFields = () => {
    return (
        <motion.section className="h-screen bg-[#ebebeb] text-black font-SpaceGrotesk-Regular">
            <div className='flex justify-around gap-x-10 p-10 lg:p-20 h-full relative'>
                <div className="flex-1 overflow-hidden">
                    <div className='relative'>
                        <div className='absolute inset-y-2 -inset-x-10 w-7 h-7 bg-gray-950 rounded-full'></div>
                        <TextReveal>
                            <p className="text-5xl tracking-[-0.1rem] text-pretty">
                                Logo & Branding, Logo Motion, Social Media Content, Business Card, Brand Identity Buildup, Brochure/Flyer, Menu & Product Hire, Creative Direction, Video Editing, 3D Animation, 3D Modeling, Visual Effects, CGI Advertising, Logo Animation, Motion Graphics, Color Grading.
                            </p>
                        </TextReveal>
                    </div>
                </div>
                <div className="flex-1 h-full">
                    <div className='relative flex overflow-auto border-2 border-black h-full'>

                    </div>
                </div>
            </div>
        </motion.section>
    );
};

export default CreativeFields;