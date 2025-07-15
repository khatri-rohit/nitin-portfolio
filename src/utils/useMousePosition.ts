import { useEffect, useState, useCallback, useRef } from "react";

interface MousePosition {
  x: number;
  y: number;
}

export default function useMousePosition(): MousePosition {
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });
  const rafId = useRef<number>(null);

  const updateMousePosition = useCallback((e: MouseEvent) => {
    if (rafId.current) cancelAnimationFrame(rafId.current);

    rafId.current = requestAnimationFrame(() => {
      setMousePosition({
        x: e.clientX + window.scrollX,
        y: e.clientY + window.scrollY
      });
    });
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", updateMousePosition, { passive: true });

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, [updateMousePosition]);

  return mousePosition;
}