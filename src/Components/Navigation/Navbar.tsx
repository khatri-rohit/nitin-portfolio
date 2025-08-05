"use client";

import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepConnector from '@mui/material/StepConnector';
import { styled } from '@mui/material/styles';
import { Home, Work, Person, BusinessCenter } from '@mui/icons-material';
import { motion, AnimatePresence } from 'motion/react';
import { StepLabel } from '@mui/material';

const steps = [
    {
        label: 'Home',
        icon: <Home />,
    },
    {
        label: 'About me',
        icon: <Person />,
    },
    {
        label: 'Work',
        icon: <Work />,
    },
    {
        label: 'Experience',
        icon: <BusinessCenter />,
    },
];

// Custom styled connector
const CustomConnector = styled(StepConnector)(({ theme }) => ({
    '&.MuiStepConnector-root': {
        marginLeft: 12, // align with icon center
        marginTop: 0,
        marginBottom: 0,
    },
    '& .MuiStepConnector-line': {
        borderColor: '#888',
        borderLeftWidth: 2,
        borderRadius: 1,
        minHeight: 80, // Adjust this value to control connector height
        marginTop: -22,
    },
}));

// Custom styled step icon
const CustomStepIcon = styled('div')(({ theme, active, completed }: any) => ({
    width: 24,
    height: 24,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: active ? '#fff' : 'transparent',
    border: `2px solid ${active ? '#fff' : '#888'}`,
    color: active ? '#000' : '#888',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    '&:hover': {
        backgroundColor: active ? '#fff' : 'rgba(255, 255, 255, 0.1)',
        borderColor: '#fff',
        color: active ? '#000' : '#fff',
    },
    '& .MuiSvgIcon-root': {
        fontSize: 16,
    },
}));

export default function Navbar() {
    const [activeStep, setActiveStep] = React.useState(0);
    const [isScrolling, setIsScrolling] = React.useState(false);
    const [scrollTimeout, setScrollTimeout] = React.useState<NodeJS.Timeout | null>(null);
    const [isHover, setIsHover] = React.useState(false);

    React.useEffect(() => {
        const handleScroll = () => {
            // Show navbar when scrolling
            setIsScrolling(true);

            // Clear existing timeout
            if (scrollTimeout) {
                clearTimeout(scrollTimeout);
            }

            // Set new timeout to hide navbar after scrolling stops
            const timeout = setTimeout(() => {
                if (isHover) return;
                setIsScrolling(false);
            }, 1000); // Hide after 2 seconds of no scrolling

            setScrollTimeout(timeout);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            if (scrollTimeout) {
                clearTimeout(scrollTimeout);
            }
        };
    }, [scrollTimeout]);

    const handleStepClick = (index: number) => {
        setActiveStep(index);
    };

    return (
        <AnimatePresence>
            {isScrolling && (
                <motion.div
                    onMouseEnter={() => setIsHover(true)}
                    onMouseLeave={() => {
                        setIsHover(false);
                        setIsScrolling(false);
                    }}
                    initial={{
                        opacity: 0,
                        x: -50,
                        scale: 0.8
                    }}
                    animate={{
                        opacity: 1,
                        x: 0,
                        scale: 1
                    }}
                    exit={{
                        opacity: 0,
                        x: -50,
                        scale: 0.8
                    }}
                    transition={{
                        duration: 0.3,
                        ease: "easeInOut"
                    }}
                    style={{
                        position: 'fixed',
                        left: 10,
                        top: 0,
                        bottom: 0,
                        height: '100vh',
                        display: 'flex',
                        alignItems: 'center',
                        zIndex: 1000,
                    }}
                >
                    <Box
                        sx={{
                            maxWidth: 400,
                            color: 'white',
                            height: 400,
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <Stepper
                            activeStep={activeStep}
                            orientation="vertical"
                            connector={<CustomConnector />}
                            sx={{
                                height: '100%',
                                flexGrow: 1,
                                '.MuiStep-root': {
                                    flex: 1,
                                    '&:not(:last-child)': {
                                        paddingBottom: 3,
                                    },
                                },
                                '.MuiStepLabel-root': {
                                    cursor: 'pointer',
                                    '&:hover .MuiStepLabel-label': {
                                        color: '#fff !important',
                                    },
                                },
                                '.MuiStepLabel-label': {
                                    color: '#888',
                                    fontSize: '0.875rem',
                                    fontWeight: 500,
                                    transition: 'color 0.3s ease',
                                    '&.Mui-active': {
                                        color: '#fff',
                                        fontWeight: 600,
                                    },
                                    '&.Mui-completed': {
                                        color: '#888',
                                    },
                                },
                            }}
                        >
                            {steps.map((step, index) => (
                                <Step key={step.label}>
                                    <StepLabel
                                        sx={{
                                            marginLeft: 0.2,
                                        }}
                                        onClick={() => handleStepClick(index)}
                                        StepIconComponent={({ active, completed }) => (
                                            <motion.div
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.95 }}
                                                transition={{ duration: 0.2 }}
                                            >
                                                <CustomStepIcon active={active} completed={completed}>
                                                    {step.icon}
                                                </CustomStepIcon>
                                            </motion.div>
                                        )}
                                    >
                                        {step.label}
                                    </StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                    </Box>
                </motion.div>
            )}
        </AnimatePresence>
    );
}