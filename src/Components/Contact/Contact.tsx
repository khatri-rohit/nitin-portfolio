"use client";

import React, { useEffect, useRef, useState } from 'react';
import { Send, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';
import InlineInput from './InlineInput';
import InlineDropdown from './InlineDropdown';
import TypingTextAnimation from './TypingTextAnimation';

type Step = 'name' | 'statement1' | 'through' | 'statement3' | 'service' | 'statement2' | 'email' | 'completion' | 'complete';

interface Props {
    currentStep: Step;
    setCurrentStep: React.Dispatch<React.SetStateAction<Step>>;
    nameInputRef: React.RefObject<HTMLInputElement | null>;
    emailInputRef: React.RefObject<HTMLInputElement | null>;
}

const Contact = ({ currentStep, setCurrentStep, emailInputRef, nameInputRef }: Props) => {
    const [isRefreshing, setIsRefreshing] = useState(false);

    // Form state
    const [name, setName] = useState('');
    const [through, setThrough] = useState('');
    const [service, setService] = useState('');
    const [email, setEmail] = useState('');

    // Animation control state - isolated from form state
    const [animationTriggers, setAnimationTriggers] = useState({
        statement1: false,
        statement2: false,
        statement3: false,
        completion: false
    });

    // Animation completion tracking
    const [animationComplete, setAnimationComplete] = useState({
        statement1: false,
        statement2: false,
        statement3: false,
        completion: false
    });

    // Dropdown state
    const [isThroughOpen, setIsThroughOpen] = useState(false);
    const [isServiceOpen, setIsServiceOpen] = useState(false);

    // Reset key for animations
    const [resetKey, setResetKey] = useState('initial');


    const throughRef = useRef<HTMLDivElement | null>(null);
    const serviceRef = useRef<HTMLDivElement | null>(null);

    const throughOptions = ["Instagram", "LinkedIn", "Referral", "Website"];
    const serviceOptions = ["Brand Identity & Design", "Motion Graphics & Animation", "3D & Visual Effects (VFX)", "Video Post-Production"];

    const statements = {
        statement1: ' and I would like to inquire about your services. I found your studio through ',
        statement2: '. Here is my email address: ',
        statement3: '. I am particularly interested in ',
        completion: '. Looking forward to hearing from you!'
    };

    // // Auto-focus inputs when step changes
    // useEffect(() => {
    //     if (currentStep === 'name' && nameInputRef.current) {
    //         nameInputRef.current.focus();
    //     } else if (currentStep === 'email' && emailInputRef.current) {
    //         emailInputRef.current.focus();
    //     }
    // }, [currentStep]);

    // Handle outside clicks for dropdowns
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (throughRef.current && !throughRef.current.contains(event.target as Node)) {
                setIsThroughOpen(false);
            }
            if (serviceRef.current && !serviceRef.current.contains(event.target as Node)) {
                setIsServiceOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Handle name submission
    const handleNameSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && name.trim()) {
            setCurrentStep('statement1');
            setAnimationTriggers(prev => ({ ...prev, statement1: true }));
        }
    };

    // Handle email submission
    const handleEmailSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && email.trim()) {
            setCurrentStep('completion');
            setAnimationTriggers(prev => ({ ...prev, completion: true }));
        }
    };

    // Handle through selection
    const handleThroughSelect = (option: string) => {
        setThrough(option);
        setIsThroughOpen(false);
        setCurrentStep('statement3');
        setAnimationTriggers(prev => ({ ...prev, statement3: true }));
    };

    // Handle service selection
    const handleServiceSelect = (option: string) => {
        setService(option);
        setIsServiceOpen(false);
        setCurrentStep('statement2');
        setAnimationTriggers(prev => ({ ...prev, statement2: true }));
    };

    // Animation completion handlers
    const handleStatement1Complete = () => {
        setAnimationComplete(prev => ({ ...prev, statement1: true }));
        setCurrentStep('through');
    };

    const handleStatement2Complete = () => {
        setAnimationComplete(prev => ({ ...prev, statement2: true }));
        setCurrentStep('email');
    };

    const handleStatement3Complete = () => {
        setAnimationComplete(prev => ({ ...prev, statement3: true }));
        setCurrentStep('service');
    };

    const handleCompletionComplete = () => {
        setAnimationComplete(prev => ({ ...prev, completion: true }));
        setCurrentStep('complete');
    };

    // Reset form
    const handleRefresh = () => {
        setIsRefreshing(true);
        const newResetKey = `reset-${Date.now()}`;
        setResetKey(newResetKey);

        setCurrentStep('name');
        setName('');
        setThrough('');
        setService('');
        setEmail('');

        setAnimationTriggers({
            statement1: false,
            statement2: false,
            statement3: false,
            completion: false
        });

        setAnimationComplete({
            statement1: false,
            statement2: false,
            statement3: false,
            completion: false
        });

        setIsThroughOpen(false);
        setIsServiceOpen(false);

        setTimeout(() => setIsRefreshing(false), 600);
    };

    // Send message
    const handleSendMessage = () => {
        const message = `Hi Nitin,\n\nMy name is ${name} and I would like to inquire about your services. I found your studio through ${through}. I am particularly interested in ${service}. Here is my email address: ${email}.\n\nLooking forward to hearing from you.`;
        window.location.href = `mailto:nitinkhatri312@gmail.com?subject=Inquiry from ${name}&body=${encodeURIComponent(message)}`;
    };

    return (
        <section className="min-h-screen w-full flex items-center justify-center bg-gray-50 dark:bg-gray-900 transition-colors duration-500 ease-in-out relative overflow-hidden px-4 sm:px-6 lg:px-8">
            {/* Background subtle texture overlay */}
            <div className="absolute inset-0 opacity-30 dark:opacity-20">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.02),transparent_70%)] dark:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.02),transparent_70%)]" />
            </div>

            <div className="relative z-10 w-full mx-auto">
                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 xl:gap-16 items-center">

                    {/* Left Side - "Let's" */}
                    <div className="flex justify-center">
                        <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[21rem] font-light tracking-tight leading-none text-gray-900 dark:text-gray-100 transition-colors duration-500 ease-in-out select-none">
                            Let&apos;s
                        </h1>
                    </div>

                    {/* Center - Chat Card */}
                    <div className="flex flex-col items-center justify-center w-full h-full space-y-6">
                        {/* Chat Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            className="bg-white dark:bg-gray-800 rounded-2xl p-4 sm:p-6 shadow-lg shadow-gray-200/50 dark:shadow-gray-900/50 border border-gray-200/60 dark:border-gray-700/60 backdrop-blur-sm transition-all duration-500 ease-in-out hover:shadow-xl hover:shadow-gray-200/60 dark:hover:shadow-gray-900/60 hover:-translate-y-1 w-full"
                        >
                            <div className="flex items-start space-x-4">
                                {/* Profile Image */}
                                <div className="flex-shrink-0">
                                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl overflow-hidden ring-2 ring-gray-100 dark:ring-gray-700 transition-all duration-300 ease-in-out bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                                        <img src="/img/Nitin-preview.png" alt="Nitin" width={56} height={56} className="w-full h-full object-cover" />
                                    </div>
                                </div>

                                {/* Message Content */}
                                <div className="flex-1 font-SpaceGrotesk-Regular">
                                    <motion.p
                                        className="text-gray-900 dark:text-gray-100 font-medium text-2xl transition-colors duration-500 ease-in-out"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.3 }}
                                    >
                                        Hi Nitin,
                                    </motion.p>

                                    <div className="text-gray-600 dark:text-gray-300 mt-1 text-xl transition-colors duration-200 ease-in-out leading-relaxed">
                                        <span>My name is </span>

                                        {currentStep === 'name' ? (
                                            <InlineInput
                                                inputRef={nameInputRef}
                                                value={name}
                                                onChange={setName}
                                                onKeyDown={handleNameSubmit}
                                                placeholder="your name"
                                            />
                                        ) : (
                                            <span className="font-medium text-gray-900 dark:text-red-400 border-b border-dashed border-gray-300 dark:border-red-400/50">
                                                {name}
                                            </span>
                                        )}

                                        {/* Statement 1 Animation */}
                                        {animationTriggers.statement1 && (
                                            <>
                                                <TypingTextAnimation
                                                    text={statements.statement1}
                                                    resetKey={resetKey + '-statement1'}
                                                    onComplete={handleStatement1Complete}
                                                />

                                                {animationComplete.statement1 && currentStep === 'through' && !through && (
                                                    <InlineDropdown
                                                        dropdownRef={throughRef}
                                                        isOpen={isThroughOpen}
                                                        setIsOpen={setIsThroughOpen}
                                                        value={through}
                                                        options={throughOptions}
                                                        onSelect={handleThroughSelect}
                                                        placeholder="select source"
                                                    />
                                                )}

                                                {through && (
                                                    <span className="font-medium text-gray-900 dark:text-red-400 border-b border-dashed border-gray-300 dark:border-red-400/50">
                                                        {through}
                                                    </span>
                                                )}
                                            </>
                                        )}

                                        {/* Statement 3 Animation */}
                                        {animationTriggers.statement3 && through && (
                                            <>
                                                <TypingTextAnimation
                                                    text={statements.statement3}
                                                    resetKey={resetKey + '-statement3'}
                                                    onComplete={handleStatement3Complete}
                                                />

                                                {animationComplete.statement3 && currentStep === 'service' && !service && (
                                                    <InlineDropdown
                                                        dropdownRef={serviceRef}
                                                        isOpen={isServiceOpen}
                                                        setIsOpen={setIsServiceOpen}
                                                        value={service}
                                                        options={serviceOptions}
                                                        onSelect={handleServiceSelect}
                                                        placeholder="select service"
                                                    />
                                                )}

                                                {service && (
                                                    <span className="font-medium text-gray-900 dark:text-red-400 border-b border-dashed border-gray-300 dark:border-red-400/50">
                                                        {service}
                                                    </span>
                                                )}
                                            </>
                                        )}

                                        {/* Statement 2 Animation */}
                                        {animationTriggers.statement2 && service && (
                                            <>
                                                <TypingTextAnimation
                                                    text={statements.statement2}
                                                    resetKey={resetKey + '-statement2'}
                                                    onComplete={handleStatement2Complete}
                                                />

                                                {animationComplete.statement2 && currentStep === 'email' && (
                                                    <InlineInput
                                                        inputRef={emailInputRef}
                                                        type="email"
                                                        value={email}
                                                        onChange={setEmail}
                                                        onKeyDown={handleEmailSubmit}
                                                        placeholder="your@email.com"
                                                    />
                                                )}

                                                {email && currentStep !== 'email' && (
                                                    <span className="font-medium text-gray-900 dark:text-red-400 border-b border-dashed border-gray-300 dark:border-red-400/50">
                                                        {email}
                                                    </span>
                                                )}
                                            </>
                                        )}

                                        {/* Completion Animation */}
                                        {animationTriggers.completion && email && (
                                            <TypingTextAnimation
                                                text={statements.completion}
                                                resetKey={resetKey + '-completion'}
                                                showCursor={false}
                                                onComplete={handleCompletionComplete}
                                            />
                                        )}
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Action Buttons */}
                        <motion.div
                            className="flex items-center justify-between w-full space-x-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.6 }}
                        >
                            {/* Refresh Button */}
                            <button
                                onClick={handleRefresh}
                                className="w-12 h-12 sm:w-14 sm:h-14 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full flex items-center justify-center shadow-md shadow-gray-200/50 dark:shadow-gray-900/50 transition-all duration-300 ease-in-out hover:shadow-lg hover:shadow-gray-200/60 dark:hover:shadow-gray-900/60 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-gray-400/50 dark:focus:ring-gray-600/50 group"
                                aria-label="Refresh conversation"
                            >
                                <RefreshCw
                                    className={`w-5 h-5 sm:w-6 sm:h-6 text-gray-600 dark:text-gray-400 transition-all duration-300 ease-in-out group-hover:text-gray-900 dark:group-hover:text-gray-200 ${isRefreshing ? 'animate-spin' : ''}`}
                                />
                            </button>

                            {/* Send Message Button */}
                            <motion.button
                                onClick={handleSendMessage}
                                disabled={currentStep !== 'complete'}
                                whileTap={{ scale: 0.98 }}
                                className={`flex-1 max-w-112 px-6 py-3 sm:py-4 rounded-full flex items-center justify-center space-x-3 font-medium text-sm sm:text-base shadow-lg transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-400/50 dark:focus:ring-gray-600/50 ${currentStep === 'complete'
                                    ? 'bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 shadow-gray-900/25 dark:shadow-gray-100/25 hover:shadow-xl hover:shadow-gray-900/35 dark:hover:shadow-gray-100/35 group hover:scale-105 hover:-translate-y-0.5'
                                    : 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed hover:translate-y-0 hover:scale-100!'
                                    }`}
                            >
                                <span>Send Message</span>
                                <Send className="w-4 h-4 sm:w-5 sm:h-5 mt-0.5 transition-transform duration-300 ease-in-out group-hover:translate-x-1" />
                            </motion.button>
                        </motion.div>
                        {/* </div> */}
                    </div>

                    {/* Right Side - "Talk" */}
                    <div className="flex justify-center">
                        <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[21rem] font-light tracking-tight leading-none text-gray-900 dark:text-gray-100 transition-colors duration-500 ease-in-out select-none">
                            Talk
                        </h1>
                    </div>
                </div>

            </div>
        </section>
    );
};
export default Contact;