import TextReveal from '@/utils/TextReveal';
import { motion } from "motion/react";
import { creativeData } from './creativeFieldData';

const ServiceList = ["Brand Identity & Design", "Motion Graphics & Animation", "3D & Visual Effects (VFX)", "Video Post-Production"];

type Step = 'name' | 'statement1' | 'through' | 'statement3' | 'service' | 'statement2' | 'email' | 'completion' | 'complete';

interface Props {
    currentStep: Step;
    nameInputRef: React.RefObject<HTMLInputElement | null>;
    emailInputRef: React.RefObject<HTMLInputElement | null>;
}

const CreativeFields = ({ currentStep, nameInputRef, emailInputRef }: Props) => {

    const goToContact = () => {
        if (currentStep === 'name' && nameInputRef.current) {
            nameInputRef.current.focus();
        } else if (currentStep === 'email' && emailInputRef.current) {
            emailInputRef.current.focus();
        }
    };

    return (
        <motion.section>
            {creativeData.map((item, index) => (
                <motion.div
                    key={item.id}
                    className='sticky top-0 w-full h-screen p-10 bg-[#0e0e0e] text-white'
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <div className='h-full w-full flex gap-5 py-10 font-SpaceGrotesk-light'>
                        {/* Left Section - Number and Services List */}
                        <motion.div
                            className='h-full w-[25%] flex gap-5 p-5'
                            initial={{ x: -50, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                        >
                            <div>
                                <TextReveal>
                                    <p className='text-5xl'>{item.id}</p>
                                </TextReveal>
                            </div>
                            <motion.div
                                className='w-fit text-2xl space-y-2'
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
                                        className={`${service === item.title ? "text-white" : "text-zinc-400"} transition-all duration-200 ease-in-out cursor-pointer leading-4.5`}
                                    >
                                        <TextReveal>
                                            <p>{service}</p>
                                        </TextReveal>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </motion.div>

                        {/* Center Section - Title and Description */}
                        <motion.div
                            className='h-full w-[50%] flex gap-5 p-5'
                            initial={{ y: 50, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.7, delay: 0.4 }}
                        >
                            <div className='h-full w-full flex flex-col gap-5'>
                                <div className='w-fit'>
                                    <TextReveal delay={0.4}>
                                        <p className="text-4xl font-SpaceGrotesk">
                                            {item.title}
                                        </p>
                                    </TextReveal>
                                </div>
                                <motion.div
                                    className='w-1/2 py-3'
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    transition={{ duration: 0.8, delay: 0.7 }}
                                >
                                    <TextReveal>
                                        <p className="text-2xl tracking-tight leading-6.5">
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
                            </div>
                        </motion.div>

                        {/* Right Section - Interactive Services */}
                        <motion.div
                            className='h-full w-[25%] flex flex-col gap-5 p-5 justify-center'
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
                                                <motion.p className="text-2xl" whileHover={{
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
                                        className="relative bg-white text-black font-SpaceGrotesk w-full py-2 rounded-md font-medium transition-colors duration-300 ease-in-out hover:bg-black hover:text-white cursor-pointer overflow-hidden group"
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
                    </div>
                </motion.div>
            ))}
        </motion.section>
    );
};

export default CreativeFields;