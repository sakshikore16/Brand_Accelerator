
import React, { useRef, useEffect, useState } from 'react';
import { Brain, Network, Zap, Cpu, Layers3 } from 'lucide-react';

const FuturisticGraphic = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  
  // Neural network simulation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions to match container
    const updateCanvasSize = () => {
      if (containerRef.current) {
        canvas.width = containerRef.current.offsetWidth;
        canvas.height = containerRef.current.offsetHeight;
      }
    };
    
    window.addEventListener('resize', updateCanvasSize);
    updateCanvasSize();
    
    // Create nodes for neural network visualization
    const nodes: {x: number, y: number, connections: number[], size: number, pulsePhase: number}[] = [];
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    
    // Create a central node
    nodes.push({
      x: centerX,
      y: centerY,
      connections: [],
      size: 25,
      pulsePhase: 0
    });
    
    // Create surrounding nodes in layers
    const createNodesInCircle = (centerX: number, centerY: number, radius: number, count: number, startIdx: number) => {
      for (let i = 0; i < count; i++) {
        const angle = (i / count) * Math.PI * 2;
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;
        nodes.push({
          x,
          y,
          connections: [0], // Connect to central node
          size: 5 + Math.random() * 5,
          pulsePhase: Math.random() * Math.PI * 2
        });
        
        // Connect central node to this node
        nodes[0].connections.push(startIdx + i);
      }
      return startIdx + count;
    };
    
    // Create three layers of nodes
    let nextIdx = 1;
    nextIdx = createNodesInCircle(centerX, centerY, 80, 8, nextIdx);
    nextIdx = createNodesInCircle(centerX, centerY, 140, 12, nextIdx);
    createNodesInCircle(centerX, centerY, 190, 16, nextIdx);
    
    // Add some random connections between nodes for complexity
    for (let i = 1; i < nodes.length; i++) {
      const connectionsCount = Math.floor(Math.random() * 3) + 1;
      for (let j = 0; j < connectionsCount; j++) {
        const targetIdx = 1 + Math.floor(Math.random() * (nodes.length - 1));
        if (targetIdx !== i && !nodes[i].connections.includes(targetIdx)) {
          nodes[i].connections.push(targetIdx);
        }
      }
    }
    
    // Data packets for animation
    const dataPackets: {sourceIdx: number, targetIdx: number, progress: number, speed: number, color: string}[] = [];
    
    // Animation loop
    let animationFrame: number;
    let lastTime = 0;
    
    const animate = (time: number) => {
      if (!ctx) return;
      
      const deltaTime = time - lastTime;
      lastTime = time;
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        for (const connIdx of node.connections) {
          const connectedNode = nodes[connIdx];
          
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(connectedNode.x, connectedNode.y);
          ctx.strokeStyle = 'rgba(155, 135, 245, 0.2)';
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
      
      // Randomly create new data packets
      if (Math.random() < 0.05) {
        const sourceIdx = Math.floor(Math.random() * nodes.length);
        const source = nodes[sourceIdx];
        
        if (source.connections.length > 0) {
          const targetIdx = source.connections[Math.floor(Math.random() * source.connections.length)];
          
          dataPackets.push({
            sourceIdx,
            targetIdx,
            progress: 0,
            speed: 0.001 + Math.random() * 0.003,
            color: `hsl(${260 + Math.random() * 40}, 80%, 65%)`
          });
        }
      }
      
      // Update and draw data packets
      for (let i = dataPackets.length - 1; i >= 0; i--) {
        const packet = dataPackets[i];
        packet.progress += packet.speed * deltaTime;
        
        if (packet.progress >= 1) {
          dataPackets.splice(i, 1);
          continue;
        }
        
        const sourceNode = nodes[packet.sourceIdx];
        const targetNode = nodes[packet.targetIdx];
        
        const x = sourceNode.x + (targetNode.x - sourceNode.x) * packet.progress;
        const y = sourceNode.y + (targetNode.y - sourceNode.y) * packet.progress;
        
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fillStyle = packet.color;
        ctx.fill();
        
        // Add glow effect
        ctx.beginPath();
        ctx.arc(x, y, 6, 0, Math.PI * 2);
        const gradient = ctx.createRadialGradient(x, y, 2, x, y, 6);
        gradient.addColorStop(0, packet.color);
        gradient.addColorStop(1, 'rgba(155, 135, 245, 0)');
        ctx.fillStyle = gradient;
        ctx.fill();
      }
      
      // Draw nodes
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        
        // Update pulse phase
        node.pulsePhase += 0.002 * deltaTime;
        if (node.pulsePhase > Math.PI * 2) {
          node.pulsePhase -= Math.PI * 2;
        }
        
        const pulseSize = Math.sin(node.pulsePhase) * 0.3 + 1;
        const displaySize = node.size * pulseSize;
        
        // Draw node with glow
        ctx.beginPath();
        ctx.arc(node.x, node.y, displaySize, 0, Math.PI * 2);
        
        // Central node gets special treatment
        if (i === 0) {
          const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, displaySize * 2);
          gradient.addColorStop(0, 'rgba(155, 135, 245, 0.8)');
          gradient.addColorStop(0.5, 'rgba(155, 135, 245, 0.4)');
          gradient.addColorStop(1, 'rgba(155, 135, 245, 0)');
          
          ctx.fillStyle = gradient;
          ctx.fill();
          
          // Inner solid part
          ctx.beginPath();
          ctx.arc(node.x, node.y, displaySize * 0.7, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(155, 135, 245, 0.9)';
          ctx.fill();
        } else {
          const opacity = 0.3 + Math.sin(node.pulsePhase) * 0.2;
          ctx.fillStyle = `rgba(155, 135, 245, ${opacity})`;
          ctx.fill();
        }
      }
      
      animationFrame = requestAnimationFrame(animate);
    };
    
    animationFrame = requestAnimationFrame(animate);
    
    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', updateCanvasSize);
    };
  }, []);
  
  return (
    <div 
      ref={containerRef}
      className="relative w-full h-[400px] md:h-[500px] perspective-1000 my-12 preserve-3d"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Animated grid background */}
      <div className="absolute inset-0 grid-background opacity-20"></div>
      
      {/* Neural network canvas */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full"
      />
      
      {/* Central Brain Icon */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 transition-all duration-500 ${isHovering ? 'scale-110' : 'scale-100'}`}>
        <div className="relative animate-pulse-glow purple-glow rounded-full p-8 hologram">
          <Brain className="w-20 h-20 text-primary opacity-90" />
          <div className="absolute inset-0 rounded-full animate-ping opacity-20 bg-primary"></div>
        </div>
      </div>
      
      {/* AI labels in different places */}
      <div className="absolute top-[15%] left-[20%] glass-morphism px-3 py-1.5 rounded-full animate-float" style={{animationDelay: '0.5s'}}>
        <div className="flex items-center gap-2">
          <Cpu className="w-4 h-4 text-primary" />
          <span className="text-xs text-white/80">Neural Processing</span>
        </div>
      </div>
      
      <div className="absolute bottom-[20%] right-[15%] glass-morphism px-3 py-1.5 rounded-full animate-float" style={{animationDelay: '1.5s'}}>
        <div className="flex items-center gap-2">
          <Network className="w-4 h-4 text-primary" />
          <span className="text-xs text-white/80">Deep Learning</span>
        </div>
      </div>
      
      <div className="absolute bottom-[30%] left-[25%] glass-morphism px-3 py-1.5 rounded-full animate-float" style={{animationDelay: '2s'}}>
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-primary" />
          <span className="text-xs text-white/80">Quantum AI</span>
        </div>
      </div>
      
      <div className="absolute top-[25%] right-[20%] glass-morphism px-3 py-1.5 rounded-full animate-float" style={{animationDelay: '1s'}}>
        <div className="flex items-center gap-2">
          <Layers3 className="w-4 h-4 text-primary" />
          <span className="text-xs text-white/80">Advanced Analytics</span>
        </div>
      </div>
      
      {/* Scan line effect */}
      <div className="absolute inset-0 scan-lines pointer-events-none"></div>
    </div>
  );
};

export default FuturisticGraphic;
