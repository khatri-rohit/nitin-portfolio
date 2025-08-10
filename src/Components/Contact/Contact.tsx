import React, { useState } from 'react';
import { Send, RefreshCw } from 'lucide-react';
import Image from 'next/image';

interface ContactProps {
    className?: string;
}

const Contact: React.FC<ContactProps> = ({ className = '' }) => {
    const [isRefreshing, setIsRefreshing] = useState(false);

    const handleRefresh = () => {
        setIsRefreshing(true);
        setTimeout(() => setIsRefreshing(false), 600);
    };

    const handleSendMessage = () => {
        // Add your contact form logic or mailto functionality here
        window.location.href = 'mailto:hello@miux.team?subject=Let\'s Talk&body=Hi MIUX Team,%0A%0AMy name is ';
    };

    return (
        <section
            className={`
        min-h-screen w-full flex items-center justify-center
        bg-gray-50 dark:bg-zinc-900
        transition-colors duration-500 ease-in-out
        relative overflow-hidden px-4 sm:px-6 lg:px-8
        ${className}
      `}
        >
            {/* Background subtle texture overlay */}
            <div className="absolute inset-0 opacity-30 dark:opacity-20">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.02),transparent_70%)] dark:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.02),transparent_70%)]" />
            </div>

            <div className="relative z-10 w-full max-w-7xl mx-auto">
                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 xl:gap-16 items-center">

                    {/* Left Side - "Let's" */}
                    <div className="flex justify-center lg:justify-end">
                        <h1 className="
              text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem]
              font-light tracking-tight leading-none
              text-gray-900 dark:text-gray-100
              transition-colors duration-500 ease-in-out
              select-none
            ">
                            Let&apos;s
                        </h1>
                    </div>

                    {/* Center - Chat Card */}
                    <div className="flex flex-col items-center space-y-6 lg:space-y-8">
                        {/* Chat Card */}
                        <div className="
              bg-white dark:bg-gray-800
              rounded-2xl p-4 sm:p-6
              shadow-lg shadow-gray-200/50 dark:shadow-gray-900/50
              border border-gray-200/60 dark:border-gray-700/60
              backdrop-blur-sm
              transition-all duration-500 ease-in-out
              hover:shadow-xl hover:shadow-gray-200/60 dark:hover:shadow-gray-900/60
              hover:-translate-y-1
              max-w-sm w-full
            ">
                            <div className="flex items-start space-x-4">
                                {/* Profile Image */}
                                <div className="flex-shrink-0">
                                    <div className="
                    w-12 h-12 sm:w-14 sm:h-14
                    rounded-xl overflow-hidden
                    ring-2 ring-gray-100 dark:ring-gray-700
                    transition-all duration-300 ease-in-out
                  ">
                                        <Image
                                            src="/api/placeholder/56/56"
                                            alt="MIUX Team"
                                            width={56}
                                            height={56}
                                            className="w-full h-full object-cover"
                                            priority
                                        />
                                    </div>
                                </div>

                                {/* Message Content */}
                                <div className="flex-1 min-w-0">
                                    <p className="
                    text-gray-900 dark:text-gray-100
                    font-medium text-sm sm:text-base
                    transition-colors duration-500 ease-in-out
                  ">
                                        Hi MIUX Team,
                                    </p>
                                    <p className="
                    text-gray-600 dark:text-gray-400
                    text-sm sm:text-base mt-1
                    transition-colors duration-500 ease-in-out
                  ">
                                        My name is
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center justify-between w-full max-w-sm space-x-4">
                            {/* Refresh Button */}
                            <button
                                onClick={handleRefresh}
                                className="
                  w-12 h-12 sm:w-14 sm:h-14
                  bg-white dark:bg-gray-800
                  border border-gray-200 dark:border-gray-700
                  rounded-full
                  flex items-center justify-center
                  shadow-md shadow-gray-200/50 dark:shadow-gray-900/50
                  transition-all duration-300 ease-in-out
                  hover:shadow-lg hover:shadow-gray-200/60 dark:hover:shadow-gray-900/60
                  hover:-translate-y-0.5
                  focus:outline-none focus:ring-2 focus:ring-gray-400/50 dark:focus:ring-gray-600/50
                  group
                "
                                aria-label="Refresh conversation"
                            >
                                <RefreshCw
                                    className={`
                    w-5 h-5 sm:w-6 sm:h-6
                    text-gray-600 dark:text-gray-400
                    transition-all duration-300 ease-in-out
                    group-hover:text-gray-900 dark:group-hover:text-gray-200
                    ${isRefreshing ? 'animate-spin' : ''}
                  `}
                                />
                            </button>

                            {/* Send Message Button */}
                            <button
                                onClick={handleSendMessage}
                                className="
                  flex-1 min-w-0
                  bg-gray-900 dark:bg-gray-100
                  text-white dark:text-gray-900
                  px-6 py-3 sm:py-4
                  rounded-full
                  flex items-center justify-center space-x-3
                  font-medium text-sm sm:text-base
                  shadow-lg shadow-gray-900/25 dark:shadow-gray-100/25
                  transition-all duration-300 ease-in-out
                  hover:shadow-xl hover:shadow-gray-900/35 dark:hover:shadow-gray-100/35
                  hover:-translate-y-0.5
                  focus:outline-none focus:ring-2 focus:ring-gray-400/50 dark:focus:ring-gray-600/50
                  group
                "
                            >
                                <span>Send Message</span>
                                <Send className="
                  w-4 h-4 sm:w-5 sm:h-5
                  transition-transform duration-300 ease-in-out
                  group-hover:translate-x-1
                " />
                            </button>
                        </div>
                    </div>

                    {/* Right Side - "Talk" */}
                    <div className="flex justify-center lg:justify-start">
                        <h1 className="
              text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem]
              font-light tracking-tight leading-none
              text-gray-900 dark:text-gray-100
              transition-colors duration-500 ease-in-out
              select-none
            ">
                            Talk
                        </h1>
                    </div>
                </div>

                {/* Optional decorative elements for enhanced visual appeal */}
                <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gray-200/20 dark:bg-gray-700/20 rounded-full blur-3xl -z-10" />
                <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-gray-300/20 dark:bg-gray-600/20 rounded-full blur-3xl -z-10" />
            </div>
        </section>
    );
};

export default Contact;