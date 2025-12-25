/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, {
  Dispatch,
  RefObject,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { z } from "zod";
import { motion } from "motion/react";
import { Send, RefreshCw, Check } from "lucide-react";
import InlineDropdown from "./InlineDropdown";
import InlineInput from "./InlineInput";
import TypingTextAnimation from "./TypingTextAnimation";

type Step =
  | "name"
  | "statement1"
  | "through"
  | "statement3"
  | "service"
  | "statement2"
  | "email"
  | "completion"
  | "complete";

interface Props {
  contactRef: RefObject<HTMLElement | null>;
  currentStep: Step;
  setCurrentStep: Dispatch<SetStateAction<Step>>;
  nameInputRef: RefObject<HTMLInputElement | null>;
  emailInputRef: RefObject<HTMLInputElement | null>;
}

type AnimationTriggers = {
  statement1: boolean;
  statement2: boolean;
  statement3: boolean;
  completion: boolean;
};

type AnimationComplete = {
  statement1: boolean;
  statement2: boolean;
  statement3: boolean;
  completion: boolean;
};

type Statements = {
  statement1: string;
  statement2: string;
  statement3: string;
  completion: string;
};
const ContactSchema = z.object({
  name: z.string().min(2, "Name is too short"),
  email: z.string().email("Invalid email format"),
  service: z.string().min(2, "Select a service"),
  through: z.string().min(2, "Select how you found us"),
  message: z.string().min(10, "Message is too short"),
});

const Contact = ({
  contactRef,
  currentStep,
  setCurrentStep,
  emailInputRef,
  nameInputRef,
}: Props) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

  // Form state
  const [name, setName] = useState("");
  const [through, setThrough] = useState("");
  const [service, setService] = useState("");
  const [email, setEmail] = useState("");

  const [showOtherService, setShowOtherService] = useState(false);
  const [otherService, setOtherService] = useState("");
  const [formError, setFormError] = useState<string>("");

  // Animation control state - isolated from form state
  const [animationTriggers, setAnimationTriggers] = useState<AnimationTriggers>(
    {
      statement1: false,
      statement2: false,
      statement3: false,
      completion: false,
    }
  );

  // Animation completion tracking
  const [animationComplete, setAnimationComplete] = useState<AnimationComplete>(
    {
      statement1: false,
      statement2: false,
      statement3: false,
      completion: false,
    }
  );

  // Dropdown state
  const [isThroughOpen, setIsThroughOpen] = useState(false);
  const [isServiceOpen, setIsServiceOpen] = useState(false);

  // Reset key for animations
  const [resetKey, setResetKey] = useState("initial");

  const throughRef = useRef<HTMLDivElement | null>(null);
  const serviceRef = useRef<HTMLDivElement | null>(null);
  const otherServiceRef = useRef<HTMLInputElement | null>(null);

  const throughOptions = ["Instagram", "LinkedIn", "Referral", "Website"];
  const serviceOptions = [
    "Brand Identity & Design",
    "Motion Graphics & Animation",
    "3D & Visual Effects (VFX)",
    "Video Post-Production",
    "Other",
  ];

  const statements = {
    statement1:
      " and I would like to inquire about your services. I found your portfolio through ",
    statement2: ". Here is my email address: ",
    statement3: ". I am particularly interested in ",
    completion: ". Looking forward to hearing from you!",
  };

  // Handle outside clicks for dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        throughRef.current &&
        !throughRef.current.contains(event.target as Node)
      ) {
        setIsThroughOpen(false);
      }
      if (
        serviceRef.current &&
        !serviceRef.current.contains(event.target as Node)
      ) {
        setIsServiceOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle name submission
  const handleNameSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && name.trim()) {
      setCurrentStep("statement1");
      setAnimationTriggers((prev) => ({ ...prev, statement1: true }));
    }
  };

  // Handle email submission
  const handleEmailSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && email.trim()) {
      setCurrentStep("completion");
      setAnimationTriggers((prev) => ({ ...prev, completion: true }));
    }
  };

  // Handle through selection
  const handleThroughSelect = (option: string) => {
    setThrough(option);
    setIsThroughOpen(false);
    setCurrentStep("statement3");
    setAnimationTriggers((prev) => ({ ...prev, statement3: true }));
  };

  // Handle service selection
  const handleServiceSelect = (option: string) => {
    if (option === 'Other') {
      setShowOtherService(true);
      setIsServiceOpen(false);
      return;
    }

    setService(option);
    setIsServiceOpen(false);
    setCurrentStep("statement2");
    setAnimationTriggers((prev) => ({ ...prev, statement2: true }));
  };

  const handleOtherServiceSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && otherService.trim()) {
      setCurrentStep("statement2");
      setAnimationTriggers((prev) => ({ ...prev, statement2: true }));
      setShowOtherService(false);
      setService(otherService);
    }
  };

  // Animation completion handlers
  const handleStatement1Complete = () => {
    setAnimationComplete((prev) => ({ ...prev, statement1: true }));
    setCurrentStep("through");
  };

  const handleStatement2Complete = () => {
    setAnimationComplete((prev) => ({ ...prev, statement2: true }));
    setCurrentStep("email");
  };

  const handleStatement3Complete = () => {
    setAnimationComplete((prev) => ({ ...prev, statement3: true }));
    setCurrentStep("service");
  };

  const handleCompletionComplete = () => {
    setAnimationComplete((prev) => ({ ...prev, completion: true }));
    setCurrentStep("complete");
  };

  // Reset form
  const handleRefresh = () => {
    setIsRefreshing(true);
    setIsFlipped(false); // Reset flip state
    const newResetKey = `reset-${Date.now()}`;
    setResetKey(newResetKey);

    setCurrentStep("name");
    setName("");
    setThrough("");
    setService("");
    setEmail("");

    setAnimationTriggers({
      statement1: false,
      statement2: false,
      statement3: false,
      completion: false,
    });

    setAnimationComplete({
      statement1: false,
      statement2: false,
      statement3: false,
      completion: false,
    });

    setIsThroughOpen(false);
    setIsServiceOpen(false);

    setTimeout(() => setIsRefreshing(false), 600);
  };

  const handleSendMessage = async () => {
    setFormError(""); // reset previous errors

    // Build payload
    const payload = {
      name,
      email,
      service,
      through,
      message: `Hi, my name is ${name}. I’d like to inquire about ${service}. Found you through ${through}. My email: ${email}.`,
    };

    // Zod validation
    const parsed = ContactSchema.safeParse(payload);

    if (!parsed.success) {
      setFormError(parsed.error.issues[0].message);
      return;
    }

    try {
      setIsSending(true);
      setIsFlipped(true);

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });

      if (!res.ok) {
        throw new Error("Request failed");
      }

      // success flip animation
      setTimeout(() => {
        handleRefresh();
        setIsFlipped(false);
        setIsSending(false);
      }, 3500);

    } catch (err) {
      console.error("CONTACT ERROR:", err);
      setFormError("Failed to send message. Try again.");
      setIsFlipped(false);
      setIsSending(false);
    }
  };



  return (
    <section
      ref={contactRef}
      className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-neutral-900"
      id="contact"
    >
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0">
        {/* Base gradient background */}
        {/* <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800 animate-gradient-xy"></div> */}

        {/* Floating geometric shapes */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-full blur-xl"
            animate={{
              x: [0, 100, 0],
              y: [0, -50, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute top-3/4 right-1/4 w-24 h-24 bg-gradient-to-l from-red-500/5 to-orange-500/5 rounded-full blur-xl"
            animate={{
              x: [0, -80, 0],
              y: [0, 60, 0],
              scale: [1, 0.8, 1],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute top-1/2 right-1/3 w-20 h-20 bg-gradient-to-r from-green-500/5 to-teal-500/5 rounded-full blur-lg"
            animate={{
              x: [0, 60, 0],
              y: [0, -80, 0],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
                        `,
              backgroundSize: "50px 50px",
            }}
          />
        </div>

        {/* Animated noise texture */}
        <motion.div
          className="absolute inset-0 opacity-[0.015]"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear",
          }}
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.4'/%3E%3C/svg%3E")`,
            backgroundSize: "200px 200px",
          }}
        />

        {/* Subtle radial gradients for depth */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-radial from-indigo-500/5 via-transparent to-transparent blur-3xl opacity-60" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-radial from-violet-500/5 via-transparent to-transparent blur-3xl opacity-60" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-radial from-transparent via-slate-800/10 to-gray-900/20 opacity-40" />

        {/* Animated scanlines */}
        <motion.div
          className="absolute inset-0 opacity-[0.02]"
          animate={{
            backgroundPosition: ["0% 0%", "0% 100%"],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)",
            backgroundSize: "100% 40px",
          }}
        />

        {/* Subtle animated border glow */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute inset-0 rounded-none"
            animate={{
              boxShadow: [
                "inset 0 0 100px rgba(99, 102, 241, 0.03)",
                "inset 0 0 100px rgba(139, 92, 246, 0.03)",
                "inset 0 0 100px rgba(99, 102, 241, 0.03)",
              ],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
      </div>

      <div className="relative w-full px-4 sm:px-6 lg:px-8">
        {/* Mobile & Tablet Layout (< 1024px) */}
        <div className="lg:hidden">
          {/* Mobile Typography - Stacked */}
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-6xl xs:text-7xl sm:text-8xl md:text-9xl font-light tracking-tight leading-none text-gray-100 transition-colors duration-500 ease-in-out select-none">
              Let&apos;s
            </h1>
            <h1 className="text-6xl xs:text-7xl sm:text-8xl md:text-9xl font-light tracking-tight leading-none text-gray-100 transition-colors duration-500 ease-in-out select-none -mt-4 sm:-mt-6 md:-mt-8">
              Talk
            </h1>
          </div>

          {/* Mobile Chat Card */}
          <div className="max-w-2xl mx-auto space-y-10 z-50">
            <ChatCard
              currentStep={currentStep}
              name={name}
              setName={setName}
              handleNameSubmit={handleNameSubmit}
              nameInputRef={nameInputRef}
              animationTriggers={animationTriggers}
              statements={statements}
              resetKey={resetKey}
              handleStatement1Complete={handleStatement1Complete}
              animationComplete={animationComplete}
              through={through}
              throughRef={throughRef as any}
              isThroughOpen={isThroughOpen}
              setIsThroughOpen={setIsThroughOpen}
              throughOptions={throughOptions}
              handleThroughSelect={handleThroughSelect}
              handleStatement3Complete={handleStatement3Complete}
              service={service}
              serviceRef={serviceRef as any}
              showOtherService={showOtherService}
              otherService={otherService}
              setOtherService={setOtherService}
              handleOtherServiceSubmit={handleOtherServiceSubmit}
              otherServiceRef={otherServiceRef}
              isServiceOpen={isServiceOpen}
              setIsServiceOpen={setIsServiceOpen}
              serviceOptions={serviceOptions}
              handleServiceSelect={handleServiceSelect}
              handleStatement2Complete={handleStatement2Complete}
              email={email}
              setEmail={setEmail}
              handleEmailSubmit={handleEmailSubmit}
              emailInputRef={emailInputRef}
              handleCompletionComplete={handleCompletionComplete}
              isFlipped={isFlipped}
            />

            {/* Mobile Action Buttons */}
            <ActionButtons
              handleRefresh={handleRefresh}
              isRefreshing={isRefreshing}
              handleSendMessage={handleSendMessage}
              currentStep={currentStep}
              isMobile={true}
              isSending={isSending}
              isFlipped={isFlipped}
              formError={formError}
            />
          </div>
        </div>

        {/* Desktop Layout (>= 1024px) */}
        <div className="hidden lg:block">
          <div className="grid grid-cols-3 gap-8 xl:gap-16 items-center max-w-[1800px] mx-auto">
            {/* Left Side - "Let's" */}
            <div className="flex justify-center">
              <h1 className="text-9xl xl:text-[10rem] 2xl:text-[15rem] 3xl:text-[15rem] font-light tracking-tight leading-none text-gray-100 transition-colors duration-500 ease-in-out select-none">
                Let&apos;s
              </h1>
            </div>

            {/* Center - Chat Card */}
            <div className="flex flex-col items-center justify-center space-y-6">
              <ChatCard
                currentStep={currentStep}
                name={name}
                setName={setName}
                handleNameSubmit={handleNameSubmit}
                nameInputRef={nameInputRef}
                animationTriggers={animationTriggers}
                statements={statements}
                resetKey={resetKey}
                handleStatement1Complete={handleStatement1Complete}
                animationComplete={animationComplete}
                through={through}
                throughRef={throughRef as any}
                isThroughOpen={isThroughOpen}
                setIsThroughOpen={setIsThroughOpen}
                throughOptions={throughOptions}
                handleThroughSelect={handleThroughSelect}
                handleStatement3Complete={handleStatement3Complete}
                service={service}
                serviceRef={serviceRef as any}
                isServiceOpen={isServiceOpen}
                setIsServiceOpen={setIsServiceOpen}
                serviceOptions={serviceOptions}
                handleServiceSelect={handleServiceSelect}
                showOtherService={showOtherService}
                otherService={otherService}
                setOtherService={setOtherService}
                handleOtherServiceSubmit={handleOtherServiceSubmit}
                otherServiceRef={otherServiceRef}
                handleStatement2Complete={handleStatement2Complete}
                email={email}
                setEmail={setEmail}
                handleEmailSubmit={handleEmailSubmit}
                emailInputRef={emailInputRef}
                handleCompletionComplete={handleCompletionComplete}
                isFlipped={isFlipped}
              />

              <ActionButtons
                handleRefresh={handleRefresh}
                isRefreshing={isRefreshing}
                handleSendMessage={handleSendMessage}
                currentStep={currentStep}
                isMobile={false}
                isSending={isSending}
                isFlipped={isFlipped}
                formError={formError}
              />
            </div>

            {/* Right Side - "Talk" */}
            <div className="flex justify-center">
              <h1 className="text-9xl xl:text-[10rem] 2xl:text-[15rem] 3xl:text-[15rem] font-light tracking-tight leading-none text-gray-100 transition-colors duration-500 ease-in-out select-none">
                Talk
              </h1>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes gradient-xy {
          0%,
          100% {
            background-position: 0% 0%;
          }
          50% {
            background-position: 100% 100%;
          }
        }

        .animate-gradient-xy {
          background-size: 400% 400%;
          animation: gradient-xy 15s ease infinite;
        }

        .bg-gradient-radial {
          background: radial-gradient(
            ellipse at center,
            var(--tw-gradient-stops)
          );
        }
      `}</style>
    </section>
  );
};

interface ChartCardProps {
  currentStep: Step;
  name: string;
  setName: (name: string) => void;
  handleNameSubmit: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  nameInputRef: RefObject<HTMLInputElement | null>;
  animationTriggers: AnimationTriggers;
  statements: Statements;
  resetKey: string;
  handleStatement1Complete: () => void;
  animationComplete: AnimationComplete;
  through: string;
  throughRef: RefObject<HTMLDivElement | null>;
  isThroughOpen: boolean;
  setIsThroughOpen: (isOpen: boolean) => void;
  throughOptions: string[];
  handleThroughSelect: (option: string) => void;
  handleStatement3Complete: () => void;
  service: string;
  serviceRef: RefObject<HTMLDivElement | null>;
  isServiceOpen: boolean;
  setIsServiceOpen: (isOpen: boolean) => void;
  serviceOptions: string[];
  handleServiceSelect: (option: string) => void;
  showOtherService: boolean;
  otherService: string;
  setOtherService: (otherService: string) => void;
  handleOtherServiceSubmit: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  otherServiceRef: RefObject<HTMLInputElement | null>;
  handleStatement2Complete: () => void;
  email: string;
  setEmail: (email: string) => void;
  handleEmailSubmit: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  emailInputRef: RefObject<HTMLInputElement | null>;
  handleCompletionComplete: () => void;
  isFlipped: boolean;
}

// Extracted ChatCard component with flip animation
const ChatCard = ({
  currentStep,
  name,
  setName,
  handleNameSubmit,
  nameInputRef,
  animationTriggers,
  statements,
  resetKey,
  handleStatement1Complete,
  animationComplete,
  through,
  throughRef,
  isThroughOpen,
  setIsThroughOpen,
  throughOptions,
  handleThroughSelect,
  handleStatement3Complete,
  service,
  showOtherService,
  otherService,
  setOtherService,
  handleOtherServiceSubmit,
  otherServiceRef,
  serviceRef,
  isServiceOpen,
  setIsServiceOpen,
  serviceOptions,
  handleServiceSelect,
  handleStatement2Complete,
  email,
  setEmail,
  handleEmailSubmit,
  emailInputRef,
  handleCompletionComplete,
  isFlipped,
}: ChartCardProps) => (
  <div className="relative w-full max-w-xl lg:max-w-3xl xl:max-w-4xl mx-auto perspective z-10">
    <motion.div
      className="relative w-full h-full preserve-3d"
      animate={{ rotateX: isFlipped ? 180 : 0 }}
      transition={{
        duration: 0.6,
        ease: [0.23, 1, 0.32, 1], // Custom bezier for smooth flip
      }}
      style={{
        transformStyle: "preserve-3d",
        transformOrigin: "center center",
      }}
    >
      {/* Front Side - Original Chat Content */}
      <motion.div
        className="backface-hidden"
        style={{
          backfaceVisibility: "hidden",
          transform: "rotateX(0deg)",
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="bg-gray-800/80 backdrop-blur-lg rounded-2xl p-4 sm:p-6 lg:p-5 xl:p-5 shadow-lg shadow-gray-900/50 border border-gray-700/60 transition-all duration-500 ease-in-out hover:shadow-xl hover:shadow-gray-900/60 hover:-translate-y-1 w-full hover:bg-gray-800/90">
          <div className="flex items-start space-x-3 sm:space-x-4 lg:space-x-6">
            {/* Profile Image */}
            <div className="flex-shrink-0">
              <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 xl:w-18 xl:h-18 rounded-xl overflow-hidden ring-2 ring-gray-700 transition-all duration-300 ease-in-out bg-gray-700 flex items-center justify-center">
                <img
                  src="/img/Nitin-preview.png"
                  alt="Nitin"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Message Content */}
            <div className="flex-1 font-SpaceGrotesk-Regular min-w-0">
              <motion.p
                className="text-gray-100 font-medium text-xl sm:text-2xl lg:text-2xl transition-colors duration-500 ease-in-out"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Hi Nitin,
              </motion.p>

              <div className="text-gray-300 mt-1 text-base sm:text-lg lg:text-xl transition-colors duration-200 ease-in-out leading-relaxed">
                <span>My name is </span>

                {currentStep === "name" ? (
                  <InlineInput
                    inputRef={nameInputRef}
                    value={name}
                    onChange={setName}
                    onKeyDown={handleNameSubmit}
                    placeholder="your name"
                  />
                ) : (
                  <span className="font-medium text-red-400 border-b border-dashed border-red-400/50">
                    {name}
                  </span>
                )}

                {/* Statement 1 Animation */}
                {animationTriggers.statement1 && (
                  <>
                    <TypingTextAnimation
                      text={statements.statement1}
                      resetKey={resetKey + "-statement1"}
                      onComplete={handleStatement1Complete}
                    />

                    {animationComplete.statement1 &&
                      currentStep === "through" &&
                      !through && (
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
                      <span className="font-medium text-red-400 border-b border-dashed border-red-400/50">
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
                      resetKey={resetKey + "-statement3"}
                      onComplete={handleStatement3Complete}
                    />

                    {animationComplete.statement3 &&
                      currentStep === "service" &&
                      !service && !showOtherService && (
                        <InlineDropdown
                          dropdownRef={serviceRef}
                          isOpen={isServiceOpen}
                          setIsOpen={setIsServiceOpen}
                          value={service}
                          options={serviceOptions}
                          onSelect={handleServiceSelect}
                          placeholder="What are you looking for?"
                        />
                      )}
                    {showOtherService && (
                      <InlineInput
                        inputRef={otherServiceRef}
                        type="text"
                        value={otherService}
                        onChange={setOtherService}
                        onKeyDown={handleOtherServiceSubmit}
                        placeholder="Enter what you're looking for"
                      />
                    )}

                    {service && (
                      <span className="font-medium text-red-400 border-b border-dashed border-red-400/50">
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
                      resetKey={resetKey + "-statement2"}
                      onComplete={handleStatement2Complete}
                    />

                    {animationComplete.statement2 &&
                      currentStep === "email" && (
                        <InlineInput
                          inputRef={emailInputRef}
                          type="email"
                          value={email}
                          onChange={setEmail}
                          onKeyDown={handleEmailSubmit}
                          placeholder="your@email.com"
                        />
                      )}

                    {email && currentStep !== "email" && (
                      <span className="font-medium text-red-400 border-b border-dashed border-red-400/50">
                        {email}
                      </span>
                    )}
                  </>
                )}

                {/* Completion Animation */}
                {animationTriggers.completion && email && (
                  <TypingTextAnimation
                    text={statements.completion}
                    resetKey={resetKey + "-completion"}
                    showCursor={false}
                    onComplete={handleCompletionComplete}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Back Side - Success State */}
      <motion.div
        className="absolute inset-0 backface-hidden"
        style={{
          backfaceVisibility: "hidden",
          transform: "rotateX(180deg)",
        }}
      >
        <div className="bg-gradient-to-br from-green-500/20 to-emerald-600/20 backdrop-blur-lg rounded-2xl p-4 sm:p-6 lg:p-5 xl:p-5 shadow-lg shadow-green-900/30 border border-green-400/30 w-full h-full flex items-center justify-center">
          <motion.div
            className="text-center"
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: isFlipped ? 1 : 0,
              opacity: isFlipped ? 1 : 0,
            }}
            transition={{
              delay: isFlipped ? 0.3 : 0,
              duration: 0.5,
              ease: [0.68, -0.55, 0.265, 1.55], // Bouncy easing
            }}
          >
            <motion.div
              className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 mx-auto mb-4 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg shadow-green-500/30"
              animate={
                isFlipped
                  ? {
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0],
                  }
                  : {}
              }
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Check
                className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 text-white"
                strokeWidth={3}
              />
            </motion.div>

            <motion.h3
              className="text-xl sm:text-2xl lg:text-3xl font-semibold text-green-400 mb-2"
              animate={
                isFlipped
                  ? {
                    opacity: [0.8, 1, 0.8],
                  }
                  : {}
              }
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              Message Sent Successfully!
            </motion.h3>

            <motion.p
              className="text-gray-300 text-sm sm:text-base lg:text-lg"
              animate={
                isFlipped
                  ? {
                    y: [0, -2, 0],
                  }
                  : {}
              }
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              Thank you for reaching out. We&apos;ll get back to you soon!
            </motion.p>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>

    <style jsx>{`
      .perspective-1000 {
        perspective: 1000px;
      }

      .preserve-3d {
        transform-style: preserve-3d;
      }

      .backface-hidden {
        backface-visibility: hidden;
      }
    `}</style>
  </div>
);

interface ActionBtnProps {
  handleRefresh: () => void;
  isRefreshing: boolean;
  handleSendMessage: () => void;
  currentStep: Step;
  isMobile: boolean;
  isSending: boolean;
  isFlipped: boolean;
  formError: string;
}

const ActionButtons = ({
  handleRefresh,
  isRefreshing,
  handleSendMessage,
  currentStep,
  isMobile,
  isSending,
  isFlipped,
  formError,
}: ActionBtnProps) => (
  <motion.div
    className={`flex items-center justify-between w-full space-x-3 sm:space-x-4 ${isMobile ? "mt-6 sm:mt-8" : ""
      }`}
    initial={{ opacity: 0, y: 20 }}
    animate={{
      opacity: isFlipped ? 0.3 : 1,
      y: 0,
      scale: isFlipped ? 0.95 : 1,
    }}
    transition={{
      delay: 0.5,
      duration: 0.6,
      opacity: { duration: 0.3 },
      scale: { duration: 0.3 },
    }}
  >
    {/* Refresh Button */}
    <button
      onClick={handleRefresh}
      disabled={isFlipped}
      className={`w-12 h-12 sm:w-14 sm:h-14 bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-full flex items-center justify-center shadow-md shadow-gray-900/50 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-600/50 group flex-shrink-0 ${isFlipped
        ? "cursor-not-allowed opacity-50"
        : "hover:shadow-lg hover:shadow-900/60 hover:-translate-y-0.5 hover:bg-gray-800"
        }`}
      aria-label="Refresh conversation"
    >
      <RefreshCw
        className={`w-5 h-5 sm:w-6 sm:h-6 text-gray-400 transition-all duration-300 ease-in-out group-hover:text-gray-200 ${isRefreshing ? "animate-spin" : ""
          }`}
      />
    </button>

    {/* Send Message Button */}
    <motion.button
      onClick={handleSendMessage}
      disabled={currentStep !== "complete" || isFlipped}
      whileTap={{ scale: isFlipped ? 1 : 0.98 }}
      className={`flex-1 px-4 sm:px-6 py-3 sm:py-4 rounded-full flex items-center justify-center space-x-2 sm:space-x-3 font-medium text-sm sm:text-base shadow-lg transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-600/50 min-w-0 overflow-hidden ${currentStep === "complete" && !isFlipped
        ? "bg-gray-100 text-gray-900 shadow-gray-100/25 hover:shadow-xl hover:shadow-gray-100/35 group hover:scale-105 hover:-translate-y-0.5"
        : "bg-gray-700/80 backdrop-blur-sm text-gray-400 cursor-not-allowed hover:translate-y-0 hover:scale-100"
        }`}
    >
      <span className="truncate">
        {formError ? formError : isSending ? "Sending..." : "Send Message"}
      </span>

      <Send
        className={`w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 transition-transform duration-500 ease-in-out  ${isSending ? "-translate-y-10 translate-x-10 shadow-2xs" : ""
          }`}
      />
    </motion.button>
  </motion.div>
);

export default Contact;
