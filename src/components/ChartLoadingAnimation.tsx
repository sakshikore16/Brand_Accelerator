import React, { useState, useEffect, FC } from 'react';
import { motion } from 'framer-motion';

const ChartLoadingAnimation: FC = () => {
  const [progress, setProgress] = useState<number>(0);
  
  // Create data points for the line graph
  const pointCount = 20;
  const [points, setPoints] = useState<number[]>(Array(pointCount).fill(0));
  
  // Initialize points with varying heights for a graph-like appearance
  const initialPoints = Array(pointCount).fill(0).map((_, i) => {
    // Create a wave-like pattern with varying heights
    const baseHeight = 30 + Math.sin(i * 0.5) * 20;
    return baseHeight;
  });
  
  useEffect(() => {
    // Reset progress and points on mount
    setProgress(0);
    setPoints(initialPoints);
    
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = Math.min(prev + Math.random() * 3, 100);
        return newProgress;
      });
    }, 70);
    
    return () => clearInterval(interval);
  }, []);
  
  // Update points based on progress
  useEffect(() => {
    if (progress > 0) {
      setPoints(initialPoints.map((baseHeight, index) => {
        // Create a more dynamic wave effect that increases over time
        const wave = Math.sin((progress * 0.05) + (index * 0.3)) * 15;
        // Add an increasing trend based on progress
        const trend = (progress / 100) * 20;
        return Math.max(0, Math.min(baseHeight + wave + trend, 100));
      }));
    }
  }, [progress]);
  
  // Generate SVG path for the line graph
  const generatePath = () => {
    if (points.length === 0) return '';
    
    const width = 224; // w-56 = 14rem = 224px
    const height = 160; // h-40 = 10rem = 160px
    const xStep = width / (points.length - 1);
    
    return points.map((point, index) => {
      const x = index * xStep;
      const y = height - (point / 100) * height;
      return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
    }).join(' ');
  };
  
  return (
    <motion.div 
      className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col items-center">
        {/* Brand name */}
        <motion.div 
          className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text mb-8"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          BrandAccelerator
        </motion.div>
        
        {/* Line graph - clearly visible above the progress bar */}
        <div className="w-56 h-40 mb-6 flex items-center justify-center">
          <svg width="224" height="160" className="overflow-visible">
            {/* Grid lines */}
            <line x1="0" y1="40" x2="224" y2="40" stroke="#e2e8f0" strokeWidth="1" />
            <line x1="0" y1="80" x2="224" y2="80" stroke="#e2e8f0" strokeWidth="1" />
            <line x1="0" y1="120" x2="224" y2="120" stroke="#e2e8f0" strokeWidth="1" />
            
            {/* Line graph */}
            <motion.path
              d={generatePath()}
              fill="none"
              stroke="#6366f1"
              strokeWidth="3"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, ease: "easeInOut" }}
            />
            
            {/* Data points */}
            {points.map((point, index) => {
              const x = (index / (points.length - 1)) * 224;
              const y = 160 - (point / 100) * 160;
              
              return (
                <motion.circle
                  key={index}
                  cx={x}
                  cy={y}
                  r="4"
                  fill="#818cf8"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.01 }}
                />
              );
            })}
          </svg>
        </div>
        
        {/* Progress indicator */}
        <div className="w-56 h-1.5 bg-gray-200 rounded-full overflow-hidden">
          <motion.div 
            className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        
        {/* Loading text */}
        <motion.div 
          className="mt-4 text-sm text-gray-500 font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Loading {Math.round(progress)}%
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ChartLoadingAnimation;