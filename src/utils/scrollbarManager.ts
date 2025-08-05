import { useEffect, useRef } from 'react';

export const useScrollbarToggle = () => {
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Add CSS styles for truly overlapping scrollbar with no layout shifts
    const style = document.createElement('style');
    style.id = 'scrollbar-styles';
    style.textContent = `
      /* Hide default scrollbars completely */
      html {
        scrollbar-width: none;
        -ms-overflow-style: none;
      }
      
      html::-webkit-scrollbar {
        display: none;
      }
      
      /* Custom overlapping scrollbar */
      .custom-scrollbar {
        position: fixed;
        top: 0;
        right: 0;
        width: 16px;
        height: 100vh;
        z-index: 9999;
        pointer-events: none;
        opacity: 0;
        transition: opacity 0.3s ease;
      }
      
      .custom-scrollbar-track {
        width: 100%;
        height: 100%;
        background: transparent;
        position: relative;
      }
      
      .custom-scrollbar-thumb {
        position: absolute;
        right: 2px;
        width: 12px;
        background: rgb(33, 33, 33, 0.5);
        border-radius: 6px;
        transition: background 0.3s ease;
        cursor: pointer;
        pointer-events: auto;
      }

      .custom-scrollbar-thumb:active {
        background: rgba(255, 255, 0, 0.7);
      }

      
      .custom-scrollbar-thumb:hover {
        background: rgba(255, 255, 255, 0.5);
      }
      
      .custom-scrollbar.visible {
        opacity: 1;
      }
    `;
    document.head.appendChild(style);

    // Create custom scrollbar elements
    const scrollbar = document.createElement('div');
    scrollbar.className = 'custom-scrollbar';
    scrollbar.id = 'custom-scrollbar';

    const track = document.createElement('div');
    track.className = 'custom-scrollbar-track';

    const thumb = document.createElement('div');
    thumb.className = 'custom-scrollbar-thumb';

    track.appendChild(thumb);
    scrollbar.appendChild(track);
    document.body.appendChild(scrollbar);

    // Update scrollbar position and size
    const updateScrollbar = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;

      if (scrollHeight <= clientHeight) {
        scrollbar.style.display = 'none';
        return;
      }

      scrollbar.style.display = 'block';

      // Calculate thumb size and position
      const thumbHeight = Math.max((clientHeight / scrollHeight) * clientHeight, 30);
      const thumbTop = (scrollTop / (scrollHeight - clientHeight)) * (clientHeight - thumbHeight);

      thumb.style.height = thumbHeight + 'px';
      thumb.style.top = thumbTop + 'px';
    };

    // Handle scroll events
    const handleScroll = () => {
      updateScrollbar();

      // Show scrollbar while scrolling
      scrollbar.classList.add('visible');

      // Clear existing timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      // Set new timeout to hide scrollbar after scrolling stops
      scrollTimeoutRef.current = setTimeout(() => {
        scrollbar.classList.remove('visible');
      }, 1000);
    };

    // Handle thumb dragging
    let isDragging = false;
    let startY = 0;
    let startScrollTop = 0;

    const handleThumbMouseDown = (e: MouseEvent) => {
      isDragging = true;
      startY = e.clientY;
      startScrollTop = window.pageYOffset || document.documentElement.scrollTop;
      document.addEventListener('mousemove', handleThumbMouseMove);
      document.addEventListener('mouseup', handleThumbMouseUp);
      e.preventDefault();
    };

    const handleThumbMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;

      const deltaY = e.clientY - startY;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;
      const scrollRatio = deltaY / clientHeight;
      const newScrollTop = startScrollTop + (scrollRatio * (scrollHeight - clientHeight));

      window.scrollTo(0, Math.max(0, Math.min(newScrollTop, scrollHeight - clientHeight)));
    };

    const handleThumbMouseUp = () => {
      isDragging = false;
      document.removeEventListener('mousemove', handleThumbMouseMove);
      document.removeEventListener('mouseup', handleThumbMouseUp);
    };

    // Event listeners
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', updateScrollbar);
    thumb.addEventListener('mousedown', handleThumbMouseDown);

    // Initial update
    updateScrollbar();

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateScrollbar);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      // Remove custom scrollbar
      const customScrollbar = document.getElementById('custom-scrollbar');
      if (customScrollbar) {
        customScrollbar.remove();
      }

      // Remove styles
      const styleElement = document.getElementById('scrollbar-styles');
      if (styleElement) {
        styleElement.remove();
      }
    };
  }, []);
};