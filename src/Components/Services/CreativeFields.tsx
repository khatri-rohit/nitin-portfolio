import TextReveal from '@/utils/TextReveal';
import { motion } from "motion/react";

const creativeData = [
    {
        id: "01",
        title: "Brand Identity & Design",
        description: "I build the foundation of your brand, providing strategic direction and creating the core visual identity and marketing materials that make you stand out.",
        services: [
            "Creative Direction",
            "Logo & Branding",
            "Brand Identity Buildup",
            "Business Card",
            "Brochure / Flyer",
            "Menu & Product Design"
        ]
    },
    {
        id: "02",
        title: "Motion Graphics & Animation",
        description: "I bring your brand to life with dynamic 2D visuals and engaging animations, perfect for grabbing attention on digital platforms.",
        services: [
            "Logo Animation",
            "Motion Graphics",
            "Social Media Content"
        ]
    },
    {
        id: "03",
        title: "3D & Visual Effects (VFX)",
        description: "I specialize in creating and integrating stunning 3D models, animations, and computer-generated imagery to elevate your advertisements and visual projects.",
        services: [
            "3D Modeling",
            "3D Animation",
            "Visual Effects",
            "CGI Advertising"
        ]
    },
    {
        id: "04",
        title: "Video Post-Production",
        description: "I handle the final, critical stages of video creation, meticulously editing and enhancing your footage to deliver a polished and compelling final product.",
        services: [
            "Video Editing",
            "Color Grading"
        ]
    }
];

const ServiceList = ["Brand Identity & Design", "Motion Graphics & Animation", "3D & Visual Effects (VFX)", "Video Post-Production"];

const CreativeFields = () => {


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
                                            delay: 0.6 + (serviceIndex * 0.1)
                                        }}
                                        className={`${service === item.title ? "text-white" : "text-zinc-400"} transition-all duration-200 ease-in-out cursor-pointer leading-7`}
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
                                    className='border h-full'
                                    initial={{ scaleY: 0 }}
                                    whileInView={{ scaleY: 1 }}
                                    transition={{ duration: 1, delay: 0.8 }}
                                    style={{ transformOrigin: "top" }}
                                >
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
                                            className="border-t-white border-t hover:text-white transition-all duration-200 ease-in-out cursor-pointer"
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
                                        className='bg-white text-black w-full py-2 rounded-md font-SpaceGrotesk transition-all duration-200 ease-in-out hover:bg-black hover:text-white cursor-pointer'
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        Let's Build Together
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