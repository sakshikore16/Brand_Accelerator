
import React, { useEffect, useRef } from 'react';

const MarketingElements3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Initial setup of animation
    const elements = containerRef.current.querySelectorAll('.element-3d');
    elements.forEach((el) => {
      el.classList.add('animate-float');
    });
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const moveX = (e.clientX - centerX) / 25;
      const moveY = (e.clientY - centerY) / 25;
      
      elements.forEach((el, index) => {
        const depth = 1 - (index % 3) * 0.2;
        (el as HTMLElement).style.transform = `translate3d(${moveX * depth}px, ${moveY * depth}px, 0)`;
      });
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  return (
    <div ref={containerRef} className="relative w-full h-full perspective-1000">
      {/* All 3D elements have been removed */}
    </div>
  );
};

export default MarketingElements3D;
