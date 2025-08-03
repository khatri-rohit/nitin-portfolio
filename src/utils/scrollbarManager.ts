import { useEffect, useRef } from 'react';

export const useScrollbarToggle = () => {
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Add CSS styles for scrollbar with transitions
    const style = document.createElement('style');
    style.id = 'scrollbar-styles';
    style.textContent = `
      /* Default state - scrollbar hidden */
      html, body {
        scrollbar-width: none;
        -ms-overflow-style: none;
      }
      
      html::-webkit-scrollbar, body::-webkit-scrollbar {
        width: 16px;
        opacity: 0;
        transition: opacity 0.3s ease;
      }
      
      html::-webkit-scrollbar-track, body::-webkit-scrollbar-track {
        background: transparent;
      }
      
      html::-webkit-scrollbar-thumb, body::-webkit-scrollbar-thumb {
        background: rgba(255, 255, 255, 0.3);
        border-radius: 4px;
        border: 1px solid rgba(255, 255, 255, 0.1);
        transform: scaleY(0);
        transition: transform 0.4s ease;
      }
      
      html::-webkit-scrollbar-thumb:hover, body::-webkit-scrollbar-thumb:hover {
        background: rgba(255, 255, 255, 0.5);
      }
      
      /* Show scrollbar while scrolling */
      html.scrolling, body.scrolling {
        scrollbar-width: thin;
        -ms-overflow-style: scrollbar;
      }
      
      html.scrolling::-webkit-scrollbar, body.scrolling::-webkit-scrollbar {
        opacity: 1;
      }
      
      html.scrolling::-webkit-scrollbar-thumb, body.scrolling::-webkit-scrollbar-thumb {
        transform: scaleY(1);
      }
    `;
    document.head.appendChild(style);

    const handleScroll = () => {
      // Show scrollbar while scrolling
      document.documentElement.classList.add('scrolling');
      document.body.classList.add('scrolling');

      // Clear existing timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      // Set new timeout to hide scrollbar after scrolling stops
      scrollTimeoutRef.current = setTimeout(() => {
        document.documentElement.classList.remove('scrolling');
        document.body.classList.remove('scrolling');
      }, 1000); // Hide after 1 second of no scrolling
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      // Remove styles and classes
      const styleElement = document.getElementById('scrollbar-styles');
      if (styleElement) {
        styleElement.remove();
      }
      document.documentElement.classList.remove('scrolling');
      document.body.classList.remove('scrolling');
    };
  }, []);
};