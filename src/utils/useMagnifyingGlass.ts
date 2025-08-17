import { useEffect, useRef, RefObject, useCallback } from 'react';

interface MagnifyingGlassConfig {
    glassRef: RefObject<HTMLDivElement>;
    magnifyFxLeftRef: RefObject<HTMLDivElement>;
    magnifyFxRightRef: RefObject<HTMLDivElement>;
    containerRef: RefObject<HTMLDivElement>;
    isHovered: boolean;
    mouseX: number;
    mouseY: number;
    isActive: boolean;
}

interface ReflectionConfig {
    baseIntensity: number;
    maxOffset: number;
    colors: {
        primary: string;
        secondary: string;
        tertiary: string;
        highlight: string;
        accent: string;
        magenta: string;
        cyan: string;
        gold: string;
    };
    blur: number;
    enlargedMultiplier: number;
}

interface ReflectionResult {
    primary: { x: number; y: number; };
    secondary: { x: number; y: number; };
    tertiary: { x: number; y: number; };
    highlight: { x: number; y: number; };
    accent: { x: number; y: number; };
    trail: { x: number; y: number; intensity: number; };
    blur: number;
    intensity: number;
    verticalStretch: number;
}

const useMagnifyingGlass = ({
    glassRef,
    magnifyFxLeftRef,
    magnifyFxRightRef,
    containerRef,
    isHovered,
    mouseX,
    mouseY,
    isActive
}: MagnifyingGlassConfig) => {
    const rafId = useRef<number | null>(null);
    const lastX = useRef(0);
    const lastY = useRef(0);
    const lastHoverState = useRef(isHovered);
    const lastActiveState = useRef(isActive);
    const containerRect = useRef<DOMRect | null>(null);
    const isTransitioning = useRef(false);

    // Optimized refresh system
    const lastRefreshTime = useRef(Date.now());
    const refreshInterval = useRef<NodeJS.Timeout | null>(null);
    const isRefreshing = useRef(false);
    const intersectionObserver = useRef<IntersectionObserver | null>(null);
    const isElementVisible = useRef(true);
    const performanceMode = useRef<'high' | 'medium' | 'low'>('high');

    // Performance detection
    useEffect(() => {
        const detectPerformance = () => {
            // Simple performance detection based on device capabilities
            const memory = (navigator as any).deviceMemory;
            const cores = navigator.hardwareConcurrency || 4;
            const connection = (navigator as any).connection?.effectiveType;

            if (memory && memory < 4 || cores < 4 || connection === 'slow-2g' || connection === '2g') {
                performanceMode.current = 'low';
            } else if (memory && memory < 8 || cores < 8 || connection === '3g') {
                performanceMode.current = 'medium';
            } else {
                performanceMode.current = 'high';
            }

            console.log(`🚀 Performance mode: ${performanceMode.current}`);
        };

        detectPerformance();
    }, []);

    const reflectionConfig: ReflectionConfig = {
        baseIntensity: 1, // Increased from 0.6 for more vibrancy
        maxOffset: 3, // Increased from 5 for stronger effect
        colors: {
            primary: '#00B4FF',    // More electric blue
            secondary: '#FF1E00',  // Deeper orange-red  
            tertiary: '#FF0028',   // Pure vibrant red
            accent: '#00FF1E',     // Electric lime green
            highlight: '#9600FF',  // Deep electric purple
            magenta: '#FF0080',    // Hot magenta
            cyan: '#00FFFF',       // Electric cyan
            gold: '#FFD700'        // Bright gold accent
        },
        blur: 1, // Increased from 0.5 for more glow
        enlargedMultiplier: 7 // Increased from 5 for stronger enlarged effect
    };

    /**
     * Gentle refresh without interrupting user interaction
     */
    const gentleRefresh = () => {
        if (isRefreshing.current || !containerRef.current || !glassRef.current) return;

        isRefreshing.current = true;

        // Only refresh container rect - don't reset everything
        const newRect = containerRef.current.getBoundingClientRect();

        // Validate the new rect before applying
        if (newRect.width > 0 && newRect.height > 0) {
            containerRect.current = newRect;
        }

        lastRefreshTime.current = Date.now();

        // Brief delay to prevent flickering
        setTimeout(() => {
            isRefreshing.current = false;
        }, 100);
    };

    /**
     * Initialize smart refresh system
     */
    const initializeSmartRefresh = useCallback(() => {
        // Clear existing interval
        if (refreshInterval.current) {
            clearInterval(refreshInterval.current);
        }

        // Adjust refresh interval based on performance mode
        const getRefreshInterval = () => {
            switch (performanceMode.current) {
                case 'low': return 20000; // 20 seconds for low-end devices
                case 'medium': return 15000; // 15 seconds for medium devices
                case 'high': return 12000; // 12 seconds for high-end devices
                default: return 15000;
            }
        };

        refreshInterval.current = setInterval(() => {
            // Only refresh if element is visible and active
            if (isElementVisible.current && isActive && !isRefreshing.current) {
                gentleRefresh();
            }
        }, getRefreshInterval());

    }, [isActive, gentleRefresh]);

    /**
     * Initialize intersection observer for visibility tracking
     */
    const initializeVisibilityObserver = useCallback(() => {
        if (!containerRef.current || intersectionObserver.current) return;

        intersectionObserver.current = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const wasVisible = isElementVisible.current;
                    isElementVisible.current = entry.isIntersecting;

                    // Only refresh when becoming visible after being hidden
                    if (!wasVisible && entry.isIntersecting) {
                        const timeSinceLastRefresh = Date.now() - lastRefreshTime.current;

                        // Only refresh if it's been a while since last refresh
                        if (timeSinceLastRefresh > 5000) {
                            gentleRefresh();
                        }
                    }
                });
            },
            {
                threshold: 0.1,
                rootMargin: '50px'
            }
        );

        intersectionObserver.current.observe(containerRef.current);
    }, [gentleRefresh]);

    // Calculate refined chromatic dispersion (optimized for performance)
    const calculateReflection = useCallback((clientX: number, clientY: number): ReflectionResult => {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;

        const directionX = (clientX - centerX) / centerX;
        const directionY = (clientY - centerY) / centerY;

        const distance = Math.min(
            Math.sqrt(directionX * directionX + directionY * directionY),
            1
        );

        const lightX = -directionX * 0.7;
        const lightY = -directionY * 0.7;

        const intensityMultiplier = isHovered ? reflectionConfig.enlargedMultiplier : 1;
        const effectiveIntensity = reflectionConfig.baseIntensity * intensityMultiplier * (0.3 + distance * 0.7);

        const verticalStretchFactor = 1 + (Math.abs(directionY) * 1.5);

        // Reduce calculations for low-end devices
        const complexityFactor = performanceMode.current === 'low' ? 0.7 : 1.0;

        return {
            primary: {
                x: lightX * reflectionConfig.maxOffset * effectiveIntensity * complexityFactor,
                y: lightY * reflectionConfig.maxOffset * effectiveIntensity * verticalStretchFactor * complexityFactor
            },
            secondary: {
                x: lightY * reflectionConfig.maxOffset * effectiveIntensity * 0.6 * complexityFactor,
                y: -lightX * reflectionConfig.maxOffset * effectiveIntensity * 0.6 * verticalStretchFactor * complexityFactor
            },
            tertiary: {
                x: -lightX * reflectionConfig.maxOffset * effectiveIntensity * 0.4 * complexityFactor,
                y: -lightY * reflectionConfig.maxOffset * effectiveIntensity * 0.4 * verticalStretchFactor * complexityFactor
            },
            highlight: {
                x: lightX * reflectionConfig.maxOffset * effectiveIntensity * 0.3 * complexityFactor,
                y: lightY * reflectionConfig.maxOffset * effectiveIntensity * 0.3 * verticalStretchFactor * complexityFactor
            },
            accent: {
                x: -lightY * reflectionConfig.maxOffset * effectiveIntensity * 0.5 * complexityFactor,
                y: lightX * reflectionConfig.maxOffset * effectiveIntensity * 0.5 * verticalStretchFactor * complexityFactor
            },
            trail: {
                x: lightX * reflectionConfig.maxOffset * 0.2 * complexityFactor,
                y: lightY * reflectionConfig.maxOffset * verticalStretchFactor * 1.4 * complexityFactor,
                intensity: Math.abs(directionY) * effectiveIntensity * 0.5 * complexityFactor
            },
            blur: (reflectionConfig.blur + (distance * 1.5)) * (1 + (Math.abs(directionY) * 1.2)) * complexityFactor,
            intensity: effectiveIntensity,
            verticalStretch: verticalStretchFactor
        };
    }, [isHovered, performanceMode.current]);

    const hexToRgb = (hex: string): string => {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ?
            `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` :
            '255, 255, 255';
    };

    const applyReflectionFilter = (reflection: ReflectionResult, element: HTMLElement) => {
        if (!element) return;

        const { colors } = reflectionConfig;
        const { primary, secondary, tertiary, highlight, accent, trail, blur, intensity } = reflection;

        // Reduce filter complexity for low-end devices
        const filterComponents = performanceMode.current === 'low' ? [
            // Low-end: Essential vibrant filters only
            `drop-shadow(0px 0px ${(blur * 1.0).toFixed(2)}px rgba(255, 255, 255, ${(1.0).toFixed(3)}))`,
            `drop-shadow(${primary.x.toFixed(2)}px ${primary.y.toFixed(2)}px ${(blur * 1.2).toFixed(2)}px rgba(0, 180, 255, ${(intensity * 1.0).toFixed(3)}))`,
            `drop-shadow(${tertiary.x.toFixed(2)}px ${tertiary.y.toFixed(2)}px ${(blur * 1.5).toFixed(2)}px rgba(255, 30, 0, ${(intensity * 1.1).toFixed(3)}))`
        ] : [
            // High-end: Full vibrant rainbow spectrum
            `drop-shadow(0px 0px ${(blur * 1.0).toFixed(2)}px rgba(255, 255, 255, ${(1.0).toFixed(3)}))`,
            `drop-shadow(${primary.x.toFixed(2)}px ${primary.y.toFixed(2)}px ${(blur * 1.2).toFixed(2)}px rgba(0, 180, 255, ${(intensity * 1.0).toFixed(3)}))`,
            `drop-shadow(${tertiary.x.toFixed(2)}px ${tertiary.y.toFixed(2)}px ${(blur * 1.5).toFixed(2)}px rgba(255, 30, 0, ${(intensity * 1.1).toFixed(3)}))`,
            `drop-shadow(${accent.x.toFixed(2)}px ${accent.y.toFixed(2)}px ${(blur * 1.3).toFixed(2)}px rgba(255, 0, 40, ${(intensity * 0.9).toFixed(3)}))`,
            `drop-shadow(${highlight.x.toFixed(2)}px ${highlight.y.toFixed(2)}px ${(blur * 1.2).toFixed(2)}px rgba(0, 255, 30, ${(intensity * 1.0).toFixed(3)}))`,
            `drop-shadow(${(primary.x * -1.0).toFixed(2)}px ${(primary.y * -1.0).toFixed(2)}px ${(blur * 1.1).toFixed(2)}px rgba(150, 0, 255, ${(intensity * 0.8).toFixed(3)}))`,
        ];

        // Enhanced trail effect for more vibrancy
        if (trail.intensity > 0.1 && performanceMode.current !== 'low') {
            filterComponents.push(
                `drop-shadow(${trail.x.toFixed(2)}px ${trail.y.toFixed(2)}px ${(blur * 1.3).toFixed(2)}px rgba(0, 255, 150, ${(trail.intensity * 0.8).toFixed(3)}))`,
                `drop-shadow(${(trail.x * 0.6).toFixed(2)}px ${(trail.y * 0.6).toFixed(2)}px ${(blur * 0.9).toFixed(2)}px rgba(255, 80, 255, ${(trail.intensity * 0.5).toFixed(3)}))`
            );
        }

        element.style.filter = filterComponents.join(' ');

        if (performanceMode.current !== 'low') {
            const brightness = 1 + (intensity * 0.08);
            element.style.filter += ` brightness(${brightness.toFixed(3)})`;
        }
    };

    const resetFilters = () => {
        if (magnifyFxLeftRef.current) {
            magnifyFxLeftRef.current.style.filter = 'none';
        }
        if (magnifyFxRightRef.current) {
            magnifyFxRightRef.current.style.filter = 'none';
        }
    };

    const hideMagnifyingGlass = () => {
        if (glassRef.current) {
            glassRef.current.style.opacity = '0';
            glassRef.current.style.pointerEvents = 'none';
        }
    };

    const showMagnifyingGlass = () => {
        if (glassRef.current) {
            glassRef.current.style.opacity = isHovered ? '1' : '0.6';
            glassRef.current.style.pointerEvents = 'none';
        }
    };

    /**
     * Optimized glass position update without frequent refreshes
     */
    const updateGlassPosition = useCallback((clientX: number, clientY: number) => {
        if (!glassRef.current || !containerRef.current || !isActive || !isElementVisible.current || isRefreshing.current) {
            return;
        }

        // Use cached container rect, only update if null
        if (!containerRect.current) {
            containerRect.current = containerRef.current.getBoundingClientRect();
        }

        const baseSize = { width: 80, height: 80, radius: 40 };
        const hoverSize = { width: 320, height: 320, radius: 160 };
        const currentSize = isHovered ? hoverSize : baseSize;

        const glassX = clientX - currentSize.radius;
        const glassY = clientY - currentSize.radius;

        // Simplified calculations for better performance
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const relativeX = (clientX - centerX) / centerX;
        const relativeY = (clientY - centerY) / centerY;

        const maxTilt = isHovered ? (performanceMode.current === 'low' ? 6 : 12) : (performanceMode.current === 'low' ? 4 : 8);
        const tiltX = -relativeY * maxTilt;
        const tiltY = relativeX * maxTilt;

        const distance = Math.sqrt(relativeX * relativeX + relativeY * relativeY);
        const zOffset = Math.min(distance * (isHovered ? 35 : 20), isHovered ? 50 : 30);

        glassRef.current.style.transform = `
            translate3d(${glassX}px, ${glassY}px, ${zOffset}px) 
            rotateX(${tiltX}deg) 
            rotateY(${tiltY}deg)
        `;

        if (isHovered && !glassRef.current.classList.contains('enlarged')) {
            glassRef.current.classList.add('enlarged');
        } else if (!isHovered && glassRef.current.classList.contains('enlarged')) {
            glassRef.current.classList.remove('enlarged');
        }

        // Optimized magnified content positioning
        const magnifiedContainer = glassRef.current.querySelector('div') as HTMLElement;
        if (magnifiedContainer && containerRect.current) {
            const offsetX = containerRect.current.left - glassX;
            const offsetY = containerRect.current.top - glassY;
            magnifiedContainer.style.transform = `translate3d(${offsetX}px, ${offsetY}px, 0)`;
        }

        // Apply effects based on performance mode
        if (isHovered && (performanceMode.current === 'high' || performanceMode.current === 'medium')) {
            const reflection = calculateReflection(clientX, clientY);

            if (magnifyFxLeftRef.current) {
                applyReflectionFilter(reflection, magnifyFxLeftRef.current);
            }

            if (magnifyFxRightRef.current) {
                applyReflectionFilter(reflection, magnifyFxRightRef.current);
            }
        } else if (lastHoverState.current && !isHovered) {
            resetFilters();
        }

        showMagnifyingGlass();
        lastHoverState.current = isHovered;
    }, [isActive, isHovered, calculateReflection, applyReflectionFilter]);

    const handleMouseMove = (clientX: number, clientY: number) => {
        if (!isActive || !isElementVisible.current || isRefreshing.current) {
            if (lastActiveState.current !== isActive) {
                hideMagnifyingGlass();
                resetFilters();
            }
            lastActiveState.current = isActive;
            return;
        }

        // Increase movement threshold for low-end devices
        const movementThreshold = performanceMode.current === 'low' ? 3 : 1.5;
        const deltaX = Math.abs(clientX - lastX.current);
        const deltaY = Math.abs(clientY - lastY.current);

        if (deltaX < movementThreshold && deltaY < movementThreshold && !isTransitioning.current && lastActiveState.current === isActive) return;

        lastX.current = clientX;
        lastY.current = clientY;

        if (rafId.current) {
            cancelAnimationFrame(rafId.current);
        }

        rafId.current = requestAnimationFrame(() => {
            updateGlassPosition(clientX, clientY);
            isTransitioning.current = false;
        });

        lastActiveState.current = isActive;
    };

    // Handle hover state changes
    useEffect(() => {
        if (lastHoverState.current !== isHovered) {
            isTransitioning.current = true;
        }
        handleMouseMove(mouseX, mouseY);
    }, [mouseX, mouseY, isHovered, isActive]);

    // Handle active state changes
    useEffect(() => {
        if (!isActive) {
            hideMagnifyingGlass();
            resetFilters();
        }
    }, [isActive]);

    // Initialize smart systems
    useEffect(() => {
        if (isActive) {
            initializeVisibilityObserver();
            initializeSmartRefresh();
        }

        return () => {
            if (refreshInterval.current) {
                clearInterval(refreshInterval.current);
            }
            if (intersectionObserver.current) {
                intersectionObserver.current.disconnect();
            }
        };
    }, [isActive, initializeVisibilityObserver, initializeSmartRefresh]);

    // Enhanced resize handler
    useEffect(() => {
        let resizeTimeout: NodeJS.Timeout;

        const updateContainerRect = () => {
            if (containerRef.current && !isRefreshing.current) {
                containerRect.current = containerRef.current.getBoundingClientRect();
            }
        };

        const handleResize = () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(updateContainerRect, 200); // Increased debounce for stability
        };

        window.addEventListener('resize', handleResize, { passive: true });
        updateContainerRect();

        return () => {
            window.removeEventListener('resize', handleResize);
            if (rafId.current) {
                cancelAnimationFrame(rafId.current);
            }
            clearTimeout(resizeTimeout);
        };
    }, []);

    return {
        refreshMagnifyingGlass: gentleRefresh
    };
};

export default useMagnifyingGlass;