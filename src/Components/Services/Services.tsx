import { motion } from "motion/react";
import { useRef } from "react";
import TextReveal from '@/utils/TextReveal';


const Services = () => {
    const videoRef = useRef<HTMLVideoElement>(null);

    return (
        <motion.section
            className='min-h-screen w-full flex flex-col text-white bg-black font-Glitz overflow-hidden'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
        >
            <div className="w-full h-full">
                {/* Header Section */}
                <div className="w-full flex flex-col lg:flex-row lg:justify-between lg:items-end p-4 sm:p-6 lg:p-10 pt-8 sm:pt-12 lg:pt-16">
                    {/* Title */}
                    <div className='mb-8 lg:mb-0'>
                        <TextReveal>
                            <h1 className="text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] xl:text-[12rem] 2xl:text-[15rem] tracking-wide text-start leading-none font-bold">
                                Services
                            </h1>
                        </TextReveal>
                    </div>

                    {/* Subtitle */}
                    <div className='text-sm sm:text-base lg:text-lg flex flex-col sm:justify-start md:justify-end gap-y-2 lg:gap-y-4 text-start md:text- lg:py-16 max-w-xs lg:max-w-none lg:-mb-10'>
                        <TextReveal>
                            <p>Design that feels right,</p>
                            <p>works hard and stands out.</p>
                        </TextReveal>
                    </div>
                </div>

                {/* Video Section */}
                <div className="flex-1 relative overflow-hidden h-[50vh] sm:h-[60vh] lg:h-[calc(100vh-400px)] 
                              mx-4 sm:mx-6 lg:mx-10 mb-4 sm:mb-6 lg:mb-10 rounded-lg lg:rounded-xl"
                    onClick={() => {
                        if (!videoRef.current) return;
                        if (videoRef.current.paused) {
                            videoRef.current.play();
                            return;
                        }
                        videoRef.current.pause();
                    }}>
                    <motion.video
                        ref={videoRef}
                        onClick={() => {
                            if (!videoRef.current) return;
                            if (videoRef.current.paused) {
                                videoRef.current.play();
                                return;
                            }
                            videoRef.current.pause();
                        }}
                        src="/videos/portfolio-video.mp4"
                        className="absolute inset-0 w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform duration-500 ease-out"
                        autoPlay
                        loop
                        muted
                        playsInline // Important for mobile devices
                    />

                    {/* Play/Pause indicator overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black/20">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                            <div className="w-0 h-0 border-l-[12px] sm:border-l-[16px] border-l-white border-t-[8px] sm:border-t-[10px] border-t-transparent border-b-[8px] sm:border-b-[10px] border-b-transparent ml-1"></div>
                        </div>
                    </div>
                </div>

                {/* Mobile-specific call to action */}
                <div className="block lg:hidden px-4 sm:px-6 pb-8">
                    <TextReveal>
                        <div className="text-center">
                            <p className="text-sm text-gray-400 mb-4">Tap video to play/pause</p>
                            <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                        </div>
                    </TextReveal>
                </div>
            </div>
        </motion.section>
    );
};

export default Services;