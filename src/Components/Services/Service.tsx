import { motion } from "motion/react";
import TextReveal from '@/utils/TextReveal';
import { CreativeData } from './creativeFieldData';

interface Props {
    item: CreativeData;
    ServiceList: string[];
    goToContact: () => void;
}

const Service = ({ item, ServiceList, goToContact }: Props) => {

    return (
        <motion.div
            key={item.id}
            className='sticky top-0 w-full h-screen md:p-5 lg:p-8 xl:p-5 2xl:p-10 bg-[#070707] text-white'
            // className='sticky top-0 w-full h-screen md:p-5 lg:p-8 xl:p-5 2xl:p-10 bg-[#0e0e0e] text-white 2xl:bg-red-700 xl:bg-red-400 lg:bg-pink-200 md:bg-zinc-700'
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
        >
            <motion.div
                className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[90%] h-0.5 bg-gradient-to-b bg-white backdrop-blur-3xl overflow-hidden"
            >
            </motion.div>

            <div className='h-full w-full flex md:gap-5 xl:gap-5 2xl:gap-8 md:py-5 lg:py-8 lg:px-2 xl:py-10 font-SpaceGrotesk-light'>

                {/* Left Section - Number and Services List */}
                <motion.div
                    className='h-full xl:w-[25%] md:w-[35%] hidden md:flex xl:gap-5 lg:gap-2 gap-2 xl:p-5 lg:p-2 md:p-5'
                    initial={{ x: -50, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                >
                    <div>
                        <TextReveal>
                            <p className='text-xl md:text-3xl lg:text-3xl xl:text-4xl 2xl:text-5xl'>
                                {item.id}
                            </p>
                        </TextReveal>
                    </div>
                    <motion.div
                        className='w-full space-y-2 xl:mt-1 lg:mt-1.5 md:mt-1'
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                    >
                        {ServiceList.map((service, serviceIndex) => (
                            <motion.div
                                key={service}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.5,
                                    delay: 0.4 + (serviceIndex * 0.1)
                                }}
                                className={`w-full ${service === item.title ? "text-white" : "text-zinc-400"} transition-all duration-200 ease-in-out cursor-pointer`}
                            >
                                <TextReveal>
                                    <span className='md:text-xl lg:text-[1rem] xl:text-xl 2xl:text-[1.5rem] leading-5 md:leading-4.5 lg:leading-5 xl:leading-6 2xl:leading-6.5 font-bold'>{service}</span>
                                </TextReveal>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>

                {/* Center Section - Title and Description */}
                <motion.div
                    className='h-full xl:w-[50%] md:w-[65%] hidden md:flex xl:gap-5 lg:gap-2 xl:p-5 lg:p-2 md:p-5'
                    initial={{ y: 50, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.7, delay: 0.4 }}
                >
                    <div className='h-full w-full flex flex-col gap-1 md:gap-3 lg:gap-3.5 xl:gap-5'>
                        <div className='w-fit'>
                            <TextReveal delay={0.4}>
                                <p className="xl:text-4xl md:text-2xl lg:text-3xl font-SpaceGrotesk">
                                    {item.title}
                                </p>
                            </TextReveal>
                        </div>
                        <motion.div
                            className='md:w-9/12 lg:w-2/3 xl:w-2/3 2xl:w-1/2'
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.7 }}
                        >
                            <TextReveal>
                                <p className="md:text-xl 2xl:text-2xl tracking-tight md:leading-5 xl:leading-5.5 2xl:leading-6.5">
                                    {item.description}
                                </p>
                            </TextReveal>
                        </motion.div>

                        <motion.div
                            className='relative w-full h-full overflow-hidden'
                            initial={{ scaleY: 0 }}
                            whileInView={{ scaleY: 1 }}
                            transition={{ duration: 0.8, delay: 0.1 }}
                            style={{ transformOrigin: "top" }}
                        >
                            {item.isImageLoaded ? (
                                <motion.img src={item.src} alt={item.title} className='w-full h-full object-cover' initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.1 }} />
                            ) : (
                                <motion.video
                                    src={item.src}
                                    className="absolute top-[80%]! left-[80%]! min-w-full min-h-full object-cover -translate-x-[80%]! -translate-y-[80%]! scale-[1.5]"
                                    autoPlay
                                    loop
                                    muted
                                />
                            )}
                        </motion.div>

                        <motion.button
                            className="hidden md:block xl:hidden relative bg-white text-black font-SpaceGrotesk w-full pt-2 pb-3 font-medium transition-colors duration-300 ease-in-out hover:bg-black hover:text-white cursor-pointer overflow-hidden group"
                            whileTap={{ scale: 0.95 }}
                            onClick={goToContact}
                        >
                            <motion.span
                                className="block transition-transform duration-300 ease-out group-hover:-translate-y-[150%]">
                                Let's Build Together
                            </motion.span>

                            <motion.span
                                className="absolute inset-0 flex items-center justify-center transition-transform duration-300 ease-out translate-y-[150%] group-hover:translate-y-[0%]">
                                Let's Build Together
                            </motion.span>
                        </motion.button>
                    </div>

                </motion.div>

                {/* Right Section - Interactive Services */}
                <motion.div
                    className='h-full w-[25%] hidden xl:flex flex-col gap-5 p-5 justify-center'
                    initial={{ x: 50, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                >
                    <div className='flex flex-col gap-2'>
                        <motion.div
                            className='space-y-3 text-zinc-400'
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                        >
                            {item.services.map((service, serviceIndex) => (
                                <motion.div
                                    key={service}
                                    className="border-t-white border-t hover:text-white transition-all duration-200 ease-in-out"
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{
                                        duration: 0.5,
                                    }}
                                >
                                    <TextReveal>
                                        <motion.p className="xl:text-xl 2xl:text-2xl" whileHover={{
                                            scale: 1.01,
                                            color: "#ffffff",
                                            rotateX: 10
                                        }}>{service}</motion.p>
                                    </TextReveal>
                                </motion.div>
                            ))}
                        </motion.div>
                        <motion.div
                            className='w-full'
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 1 }}
                        >
                            <motion.button
                                className="relative bg-white text-black font-SpaceGrotesk w-full py-2 font-medium transition-colors duration-300 ease-in-out hover:bg-black hover:text-white cursor-pointer overflow-hidden group"
                                whileTap={{ scale: 0.95 }}
                                onClick={goToContact}
                            >
                                <motion.span
                                    className="block transition-transform duration-300 ease-out group-hover:-translate-y-[150%]"
                                >
                                    Let's Build Together
                                </motion.span>

                                <motion.span
                                    className="absolute inset-0 flex items-center justify-center transition-transform duration-300 ease-out translate-y-[150%] group-hover:translate-y-[0%]"
                                >
                                    Let's Build Together
                                </motion.span>
                            </motion.button>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Mobile Section - Number and Services List */}
                <motion.div className='h-full w-full md:hidden flex flex-col gap-5 p-5 justify-center'>
                    <motion.div className='w-full font-SpaceGrotesk flex gap-2 items-start text-[1.3rem]' >
                        <TextReveal>
                            <p className="w-full">
                                {item.id}
                            </p>
                        </TextReveal>
                        <TextReveal delay={0.4}>
                            <p className="w-full text-nowrap">
                                {item.title}
                            </p>
                        </TextReveal>
                    </motion.div>
                    <motion.div
                        className='w-full'
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.7 }}
                    >
                        <TextReveal>
                            <p className="text-[1.1rem] w-full leading-5.5">
                                {item.description}
                            </p>
                        </TextReveal>
                    </motion.div>
                    <motion.div
                        className='relative w-full h-full overflow-hidden'
                        initial={{ scaleY: 0 }}
                        whileInView={{ scaleY: 1 }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        style={{ transformOrigin: "top" }}
                    >
                        {item.isImageLoaded ? (
                            <motion.img src={item.src} alt={item.title} className='w-full h-full object-cover' initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.1 }} />
                        ) : (
                            <motion.video
                                src={item.src}
                                className="absolute top-[80%]! left-[80%]! min-w-full min-h-full object-cover -translate-x-[80%]! -translate-y-[80%]! scale-[1.5]"
                                autoPlay
                                loop
                                muted
                            />
                        )}
                    </motion.div>
                    <motion.button
                        className="relative bg-white text-black font-SpaceGrotesk w-full pt-2 pb-3 font-medium transition-colors duration-300 ease-in-out hover:bg-black hover:text-white cursor-pointer overflow-hidden group"
                        whileTap={{ scale: 0.95 }}
                        onClick={goToContact}
                    >
                        <motion.span
                            className="block transition-transform duration-300 ease-out group-hover:-translate-y-[150%]">
                            Let's Build Together
                        </motion.span>

                        <motion.span
                            className="absolute inset-0 flex items-center justify-center transition-transform duration-300 ease-out translate-y-[150%] group-hover:translate-y-[0%]">
                            Let's Build Together
                        </motion.span>
                    </motion.button>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default Service;