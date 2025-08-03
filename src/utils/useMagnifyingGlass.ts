import { useEffect, useRef, RefObject } from 'react';

interface MagnifyingGlassConfig {
    glassRef: RefObject<HTMLDivElement>;
    magnifyFxLeftRef: RefObject<HTMLDivElement>;
    magnifyFxRightRef: RefObject<HTMLDivElement>;
    containerRef: RefObject<HTMLDivElement>;
    isHovered: boolean;
    mouseX: number;
    mouseY: number;
    isActive: boolean; // New prop to control when the effect is active
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

    // Enhanced reflection system - Refined chromatic dispersion
    const reflectionConfig: ReflectionConfig = {
        baseIntensity: 0.6,
        maxOffset: 3.5,
        colors: {
            primary: '#0096FF',          // Electric blue
            secondary: '#FF3200',        // Bright orange-red
            tertiary: '#FF1414',         // Pure red  
            accent: '#00FF32',           // Neon green
            highlight: '#8200FF'         // Electric purple
        },
        blur: 0.8,
        enlargedMultiplier: 1.8
    };

    /**
     * Calculate refined chromatic dispersion based on cursor position
     */
    const calculateReflection = (clientX: number, clientY: number): ReflectionResult => {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;

        const directionX = (clientX - centerX) / centerX;
        const directionY = (clientY - centerY) / centerY;

        const distance = Math.min(
            Math.sqrt(directionX * directionX + directionY * directionY),
            1
        );

        const lightX = -directionX * 0.7; // Reduced for subtlety
        const lightY = -directionY * 0.7;

        const intensityMultiplier = isHovered ? reflectionConfig.enlargedMultiplier : 1;
        const effectiveIntensity = reflectionConfig.baseIntensity * intensityMultiplier * (0.3 + distance * 0.7);

        const verticalStretchFactor = 1 + (Math.abs(directionY) * 1.5);
        const verticalBlurMultiplier = 1 + (Math.abs(directionY) * 1.2);

        // Refined shadow calculations for cleaner chromatic effect
        const primaryOffsetX = lightX * reflectionConfig.maxOffset * effectiveIntensity;
        const primaryOffsetY = lightY * reflectionConfig.maxOffset * effectiveIntensity * verticalStretchFactor;

        const secondaryOffsetX = lightY * reflectionConfig.maxOffset * effectiveIntensity * 0.6;
        const secondaryOffsetY = -lightX * reflectionConfig.maxOffset * effectiveIntensity * 0.6 * verticalStretchFactor;

        const tertiaryOffsetX = -lightX * reflectionConfig.maxOffset * effectiveIntensity * 0.4;
        const tertiaryOffsetY = -lightY * reflectionConfig.maxOffset * effectiveIntensity * 0.4 * verticalStretchFactor;

        const highlightOffsetX = lightX * reflectionConfig.maxOffset * effectiveIntensity * 0.3;
        const highlightOffsetY = lightY * reflectionConfig.maxOffset * effectiveIntensity * 0.3 * verticalStretchFactor;

        const accentOffsetX = -lightY * reflectionConfig.maxOffset * effectiveIntensity * 0.5;
        const accentOffsetY = lightX * reflectionConfig.maxOffset * effectiveIntensity * 0.5 * verticalStretchFactor;

        const baseBlur = reflectionConfig.blur + (distance * 1.5);
        const enhancedBlur = baseBlur * verticalBlurMultiplier;

        const trailIntensity = Math.abs(directionY) * effectiveIntensity * 0.5;
        const trailOffsetX = lightX * reflectionConfig.maxOffset * 0.2;
        const trailOffsetY = lightY * reflectionConfig.maxOffset * verticalStretchFactor * 1.4;

        return {
            primary: { x: primaryOffsetX, y: primaryOffsetY },
            secondary: { x: secondaryOffsetX, y: secondaryOffsetY },
            tertiary: { x: tertiaryOffsetX, y: tertiaryOffsetY },
            highlight: { x: highlightOffsetX, y: highlightOffsetY },
            accent: { x: accentOffsetX, y: accentOffsetY },
            trail: { x: trailOffsetX, y: trailOffsetY, intensity: trailIntensity },
            blur: enhancedBlur,
            intensity: effectiveIntensity,
            verticalStretch: verticalStretchFactor
        };
    };

    /**
     * Convert hex to RGB for rgba usage
     */
    const hexToRgb = (hex: string): string => {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ?
            `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` :
            '255, 255, 255';
    };

    /**
     * Apply refined chromatic dispersion filter with performance optimization
     */
    const applyReflectionFilter = (reflection: ReflectionResult, element: HTMLElement) => {
        if (!element) return;

        const { colors } = reflectionConfig;
        const { primary, secondary, tertiary, highlight, accent, trail, blur, intensity } = reflection;

        // Build optimized filter stack for clean chromatic dispersion
        const filterComponents = [
            // Enhanced white core glow (stronger border luminosity)
            `drop-shadow(0px 0px ${(blur * 0.8).toFixed(2)}px rgba(255, 255, 255, ${(1.0).toFixed(3)}))`,

            // Electric blue (rainbow start - vivid)
            `drop-shadow(${primary.x.toFixed(2)}px ${primary.y.toFixed(2)}px ${(blur * 1.0).toFixed(2)}px rgba(0, 150, 255, ${(intensity * 0.9).toFixed(3)}))`,

            // Bright orange-red (rainbow warm - dominant)
            `drop-shadow(${tertiary.x.toFixed(2)}px ${tertiary.y.toFixed(2)}px ${(blur * 1.3).toFixed(2)}px rgba(255, 50, 0, ${(intensity * 1.0).toFixed(3)}))`,

            // Pure red (vibrant red accent)
            `drop-shadow(${accent.x.toFixed(2)}px ${accent.y.toFixed(2)}px ${(blur * 1.1).toFixed(2)}px rgba(255, 20, 20, ${(intensity * 0.8).toFixed(3)}))`,

            // Neon green (rainbow cool - electric)
            `drop-shadow(${highlight.x.toFixed(2)}px ${highlight.y.toFixed(2)}px ${(blur * 1.1).toFixed(2)}px rgba(0, 255, 50, ${(intensity * 0.9).toFixed(3)}))`,

            // Electric purple (completes rainbow spectrum)
            `drop-shadow(${(primary.x * -0.9).toFixed(2)}px ${(primary.y * -0.9).toFixed(2)}px ${(blur * 1.0).toFixed(2)}px rgba(130, 0, 255, ${(intensity * 0.7).toFixed(3)}))`
        ];

        // Add subtle trail effect for enhanced movement
        if (trail.intensity > 0.1) {
            filterComponents.push(
                `drop-shadow(${trail.x.toFixed(2)}px ${trail.y.toFixed(2)}px ${(blur * 1.1).toFixed(2)}px rgba(${hexToRgb(colors.primary)}, ${(trail.intensity * 0.6).toFixed(3)}))`
            );
        }

        // Apply the refined chromatic filter
        element.style.filter = filterComponents.join(' ');

        // Subtle brightness boost for luminous effect
        const brightness = 1 + (intensity * 0.08);
        element.style.filter += ` brightness(${brightness.toFixed(3)})`;
    };

    /**
     * Reset filters to clean state
     */
    const resetFilters = () => {
        if (magnifyFxLeftRef.current) {
            magnifyFxLeftRef.current.style.filter = 'none';
        }
        if (magnifyFxRightRef.current) {
            magnifyFxRightRef.current.style.filter = 'none';
        }
    };

    /**
     * Hide the magnifying glass when not active
     */
    const hideMagnifyingGlass = () => {
        if (glassRef.current) {
            glassRef.current.style.opacity = '0';
            glassRef.current.style.pointerEvents = 'none';
        }
    };

    /**
     * Show the magnifying glass when active
     */
    const showMagnifyingGlass = () => {
        if (glassRef.current) {
            glassRef.current.style.opacity = isHovered ? '1' : '0.6';
            glassRef.current.style.pointerEvents = 'none';
        }
    };

    /**
     * Optimized glass position update with smooth transitions
     */
    const updateGlassPosition = (clientX: number, clientY: number) => {
        if (!glassRef.current || !containerRef.current || !isActive) {
            return;
        }

        // Update container rect if needed (debounced)
        if (!containerRect.current) {
            containerRect.current = containerRef.current.getBoundingClientRect();
        }

        // Smooth size transitions based on hover state
        const baseSize = { width: 80, height: 80, radius: 40 };
        const hoverSize = { width: 320, height: 320, radius: 160 };
        const currentSize = isHovered ? hoverSize : baseSize;

        // Position glass at cursor
        const glassX = clientX - currentSize.radius;
        const glassY = clientY - currentSize.radius;

        // Enhanced 3D perspective calculations
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const relativeX = (clientX - centerX) / centerX;
        const relativeY = (clientY - centerY) / centerY;

        // Refined gyroscopic tilt
        const maxTilt = isHovered ? 12 : 8;
        const tiltX = -relativeY * maxTilt;
        const tiltY = relativeX * maxTilt;

        const distance = Math.sqrt(relativeX * relativeX + relativeY * relativeY);
        const zOffset = Math.min(distance * (isHovered ? 35 : 20), isHovered ? 50 : 30);

        // Apply smooth 3D transform
        glassRef.current.style.transform = `
            translate3d(${glassX}px, ${glassY}px, ${zOffset}px) 
            rotateX(${tiltX}deg) 
            rotateY(${tiltY}deg)
        `;

        // Handle smooth size transitions with CSS classes
        if (isHovered && !glassRef.current.classList.contains('enlarged')) {
            glassRef.current.classList.add('enlarged');
        } else if (!isHovered && glassRef.current.classList.contains('enlarged')) {
            glassRef.current.classList.remove('enlarged');
        }

        // Synchronize magnified content position
        const magnifiedContainer = glassRef.current.querySelector('div') as HTMLElement;
        if (magnifiedContainer) {
            const offsetX = containerRect.current.left - glassX;
            const offsetY = containerRect.current.top - glassY;
            magnifiedContainer.style.transform = `translate3d(${offsetX}px, ${offsetY}px, 0)`;
        }

        // Apply chromatic effects only when hovering text (performance optimization)
        if (isHovered) {
            const reflection = calculateReflection(clientX, clientY);

            if (magnifyFxLeftRef.current) {
                applyReflectionFilter(reflection, magnifyFxLeftRef.current);
            }

            if (magnifyFxRightRef.current) {
                applyReflectionFilter(reflection, magnifyFxRightRef.current);
            }
        } else if (lastHoverState.current && !isHovered) {
            // Reset filters smoothly when stopping hover
            resetFilters();
        }

        // Show glass with appropriate opacity
        showMagnifyingGlass();

        lastHoverState.current = isHovered;
    };

    /**
     * Optimized mouse movement handler with performance throttling
     */
    const handleMouseMove = (clientX: number, clientY: number) => {
        // Early return if not active
        if (!isActive) {
            if (lastActiveState.current !== isActive) {
                hideMagnifyingGlass();
                resetFilters();
            }
            lastActiveState.current = isActive;
            return;
        }

        // Enhanced movement threshold for performance
        const deltaX = Math.abs(clientX - lastX.current);
        const deltaY = Math.abs(clientY - lastY.current);

        if (deltaX < 1.5 && deltaY < 1.5 && !isTransitioning.current && lastActiveState.current === isActive) return;

        lastX.current = clientX;
        lastY.current = clientY;

        // Cancel previous frame to prevent queue buildup
        if (rafId.current) {
            cancelAnimationFrame(rafId.current);
        }

        rafId.current = requestAnimationFrame(() => {
            updateGlassPosition(clientX, clientY);
            isTransitioning.current = false;
        });

        lastActiveState.current = isActive;
    };

    // Handle hover state changes with transition flag
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

    // Debounced resize handler for optimal performance
    useEffect(() => {
        let resizeTimeout: NodeJS.Timeout;

        const updateContainerRect = () => {
            if (containerRef.current) {
                containerRect.current = containerRef.current.getBoundingClientRect();
            }
        };

        const handleResize = () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(updateContainerRect, 150); // Increased debounce
        };

        // Passive listener for better performance
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
};

export default useMagnifyingGlass;