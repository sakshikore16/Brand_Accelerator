
import React, { useEffect, useState } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);
  const [splashes, setSplashes] = useState<Array<{ id: number, x: number, y: number }>>([]);
  let splashId = 0;

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      if (!visible) setVisible(true);
    };

    const handleMouseDown = (e: MouseEvent) => {
      setClicked(true);
      
      // Create splash effect
      setSplashes(prev => [
        ...prev, 
        { id: splashId++, x: e.clientX, y: e.clientY }
      ]);
      
      // Remove splash after animation completes
      setTimeout(() => {
        setSplashes(prev => prev.filter(splash => splash.id !== splashId - 1));
      }, 1000);
    };
    
    const handleMouseUp = () => setClicked(false);

    const handleLinkHover = () => setLinkHovered(true);
    const handleLinkLeave = () => setLinkHovered(false);

    document.addEventListener('mousemove', updatePosition);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    
    // Add event listeners to interactive elements
    const links = document.querySelectorAll('a, button, .case-card, [role="button"]');
    links.forEach(link => {
      link.addEventListener('mouseenter', handleLinkHover);
      link.addEventListener('mouseleave', handleLinkLeave);
    });

    return () => {
      document.removeEventListener('mousemove', updatePosition);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      
      links.forEach(link => {
        link.removeEventListener('mouseenter', handleLinkHover);
        link.removeEventListener('mouseleave', handleLinkLeave);
      });
    };
  }, [visible]);

  return (
    <>
      {/* Thin cursor */}
      <div 
        className="custom-cursor-outer"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          opacity: visible ? 1 : 0,
          transform: `scale(${clicked ? 0.8 : 1})`,
          width: '16px',
          height: '16px',
          border: '1px solid rgba(59, 130, 246, 0.5)',
          borderRadius: '50%',
          position: 'fixed',
          pointerEvents: 'none',
          zIndex: 9999,
          marginLeft: '-8px',
          marginTop: '-8px',
          transition: 'transform 0.15s ease, opacity 0.15s ease'
        }}
      />
      <div 
        className={`custom-cursor-inner ${linkHovered ? 'cursor-grow' : ''}`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          opacity: visible ? 1 : 0,
          width: linkHovered ? '8px' : '3px',
          height: linkHovered ? '8px' : '3px',
          backgroundColor: 'rgba(59, 130, 246, 0.8)',
          borderRadius: '50%',
          position: 'fixed',
          pointerEvents: 'none',
          zIndex: 9999,
          marginLeft: linkHovered ? '-4px' : '-1.5px',
          marginTop: linkHovered ? '-4px' : '-1.5px',
          transition: 'width 0.2s ease, height 0.2s ease, opacity 0.2s ease, margin 0.2s ease'
        }}
      />
      
      {/* Splash elements */}
      {splashes.map(splash => (
        <div
          key={splash.id}
          className="cursor-splash"
          style={{
            left: `${splash.x}px`,
            top: `${splash.y}px`,
            position: 'fixed',
            width: '3px',
            height: '3px',
            borderRadius: '50%',
            backgroundColor: 'rgba(59, 130, 246, 0.4)',
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none',
            zIndex: 9998,
            animation: 'splash-effect 0.8s ease-out forwards'
          }}
        />
      ))}
    </>
  );
};

export default CustomCursor;
