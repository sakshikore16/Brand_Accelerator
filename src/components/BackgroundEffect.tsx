import React, { useRef, useEffect } from 'react';

const BackgroundEffect = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    console.log('Canvas initialized');

    let width = window.innerWidth;
    let height = window.innerHeight;
    let particleArray: Particle[] = [];
    const numberOfParticles = Math.min(100, Math.floor(width / 20)); // Increased particle count
    
    canvas.width = width;
    canvas.height = height;

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      opacity: number;
      pulse: number;
      pulseSpeed: number;
      trail: Array<{x: number, y: number, size: number}>;
      trailLength: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 5 + 1;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
        this.color = `hsl(${260 + Math.random() * 40}, ${80 + Math.random() * 20}%, ${60 + Math.random() * 20}%)`;
        this.opacity = 0.1 + Math.random() * 0.5;
        this.pulse = 0;
        this.pulseSpeed = 0.01 + Math.random() * 0.02;
        this.trail = [];
        this.trailLength = Math.floor(Math.random() * 10) + 5; // Random trail length
      }

      update() {
        // Add current position to trail
        this.trail.push({
          x: this.x,
          y: this.y,
          size: this.size + Math.sin(this.pulse) * 1.5
        });
        
        // Keep trail at designed length
        if (this.trail.length > this.trailLength) {
          this.trail.shift();
        }
        
        this.x += this.speedX;
        this.y += this.speedY;
        
        // Pulse size for 3D effect
        this.pulse += this.pulseSpeed;
        
        if (this.x > width || this.x < 0) {
          this.speedX = -this.speedX;
        }
        
        if (this.y > height || this.y < 0) {
          this.speedY = -this.speedY;
        }
      }

      draw() {
        if (!ctx) return;
        const sizeOffset = Math.sin(this.pulse) * 1.5;
        const radius = Math.max(this.size + sizeOffset, 0); // Ensure radius is not negative
        
        // Draw trail with fading effect
        this.trail.forEach((point, index) => {
          const fadeRatio = index / this.trail.length;
          const trailOpacity = this.opacity * fadeRatio * 0.6;
          
          // Create glow effect for trail points
          const trailGradient = ctx.createRadialGradient(
            point.x, point.y, 0,
            point.x, point.y, Math.max(point.size * fadeRatio, 0) // Ensure radius is not negative
          );
          
          trailGradient.addColorStop(0, this.color);
          trailGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
          
          ctx.beginPath();
          ctx.arc(point.x, point.y, Math.max(point.size * fadeRatio, 0), 0, Math.PI * 2); // Ensure radius is not negative
          ctx.fillStyle = trailGradient;
          ctx.globalAlpha = trailOpacity;
          ctx.fill();
        });
        
        // Create enhanced glow effect for current point
        const gradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, Math.max(this.size + sizeOffset + 8, 0) // Ensure radius is not negative
        );
        
        gradient.addColorStop(0, this.color);
        gradient.addColorStop(0.5, `${this.color.replace('hsl', 'hsla').replace(')', ', 0.5)')}`);
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        
        ctx.beginPath();
        ctx.arc(this.x, this.y, radius, 0, Math.PI * 2); // Use validated radius
        ctx.fillStyle = gradient;
        ctx.globalAlpha = this.opacity;
        ctx.fill();
        
        // Reset global alpha
        ctx.globalAlpha = 1;
      }
    }

    function init() {
      console.log('Particles initialized');
      particleArray = [];
      for (let i = 0; i < numberOfParticles; i++) {
        particleArray.push(new Particle());
      }
    }

    function connect() {
      if (!ctx) return;
      
      const maxDistance = width * 0.2; // Increased connection distance
      
      for (let a = 0; a < particleArray.length; a++) {
        for (let b = a; b < particleArray.length; b++) {
          const dx = particleArray[a].x - particleArray[b].x;
          const dy = particleArray[a].y - particleArray[b].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < maxDistance) {
            const opacity = 0.2 - (distance / maxDistance);
            ctx.beginPath();
            ctx.strokeStyle = `rgba(155, 135, 245, ${opacity})`;
            ctx.lineWidth = 0.8;
            ctx.moveTo(particleArray[a].x, particleArray[a].y);
            ctx.lineTo(particleArray[b].x, particleArray[b].y);
            ctx.stroke();
          }
        }
      }
    }

    function animate() {
      console.log('Animation frame');
      if (!ctx) return;
      
      ctx.clearRect(0, 0, width, height);
      
      // Add subtle grid pattern
      drawGrid();
      
      for (let i = 0; i < particleArray.length; i++) {
        particleArray[i].update();
        particleArray[i].draw();
      }
      
      connect();
      requestAnimationFrame(animate);
    }
    
    function drawGrid() {
      if (!ctx) return;
      
      const gridSize = 50;
      ctx.strokeStyle = 'rgba(155, 135, 245, 0.05)';
      ctx.lineWidth = 0.5;
      
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
    }

    function handleResize() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      init();
    }

    init();
    animate();
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 z-[-1] w-full h-full pointer-events-none bg-[#0A071A]"
    />
  );
};

export default BackgroundEffect;
