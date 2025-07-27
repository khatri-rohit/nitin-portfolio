"use client"

import React, { useRef, ReactElement } from 'react'

import gsap from 'gsap';
import { SplitText } from "gsap/SplitText"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(SplitText);
gsap.registerPlugin(ScrollTrigger);

interface Props {
    children: ReactElement | ReactElement[];
    animationOnScroll?: boolean;
    delay?: number;
}

const TextReveal = ({ children, animationOnScroll = true, delay = 0 }: Props) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const elementRef = useRef<HTMLElement[]>([]);
    const splitRef = useRef<SplitText[]>([]);
    const lines = useRef<HTMLElement[]>([]);

    useGSAP(() => {
        if (!containerRef.current) return;

        splitRef.current = []
        elementRef.current = []
        lines.current = []

        let elements: HTMLElement[] = [];

        if (containerRef.current.hasAttribute("data-copy-wrapper")) {
            elements = Array.from(containerRef.current.children) as HTMLElement[];
        } else {
            elements = [containerRef.current];
        }

        elements.forEach((element) => {
            elementRef.current.push(element);

            const split = SplitText.create(element, {
                type: "lines",
                mask: "lines",
                linesClass: "line++"
            });

            splitRef.current.push(split);

            const computedStyle = window.getComputedStyle(element);
            const textIndent = computedStyle.textIndent;

            if (textIndent && textIndent === '0px') {
                if (split.lines && split.lines.length > 0) {
                    (split.lines[0] as HTMLElement).style.paddingLeft = textIndent;
                }
                element.style.textIndent = '0';
            }

            lines.current.push(...(split.lines as HTMLElement[]));
        })

        gsap.set(lines.current, { y: "100%" });

        const animationProps = {
            y: "0%",
            duration: 1,
            stagger: 0.2,
            ease: "power4.out",
            delay: delay
        };

        if (animationOnScroll) {
            gsap.to(lines.current, {
                ...animationProps,
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 75%",
                    once: true,
                }
            })
        } else {
            gsap.to(lines.current, animationProps);
        }

        return () => {
            splitRef.current.forEach((split: SplitText) => {
                if (split && typeof split.revert === 'function') {
                    split.revert();
                }
            });
        }

    }, {
        scope: containerRef,
        dependencies: [animationOnScroll, delay]
    })

    if (React.Children.count(children) === 1) {
        if (typeof children === 'string') {
            return React.cloneElement(children, { ref: containerRef } as any);
        }
    }

    return (
        <div ref={containerRef} data-copy-wrapper="true">
            {children}
        </div>
    )
}

export default TextReveal