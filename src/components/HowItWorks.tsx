import React, { useEffect, useRef } from 'react';
import { ClipboardCheck, FileText, Lightbulb, LineChart } from 'lucide-react';

const HowItWorks = () => {
  const stepsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const steps = entry.target.querySelectorAll('.step');
            steps.forEach((step, index) => {
              // Add progressive delay for each step with a more noticeable animation
              setTimeout(() => {
                step.classList.add('opacity-100', 'translate-y-0', 'animate-bounce-subtle');
                step.classList.remove('opacity-0', 'translate-y-20');
                
                // Add animation for the connector line after step appears
                const connector = step.querySelector('.connector');
                if (connector) {
                  setTimeout(() => {
                    connector.classList.add('scale-y-100', 'origin-top');
                    connector.classList.remove('scale-y-0');
                  }, 300);
                }
                
                // Add animation for the circle node
                const node = step.querySelector('.node');
                if (node) {
                  setTimeout(() => {
                    node.classList.add('scale-100', 'animate-pulse-subtle');
                    node.classList.remove('scale-0');
                  }, 200);
                }
              }, index * 400); // Shorter delay for a snappier feel
            });
          }
        });
      },
      { threshold: 0.2, rootMargin: "-50px 0px" } // Increased threshold and adjusted rootMargin for earlier triggering
    );

    if (stepsRef.current) {
      observer.observe(stepsRef.current);
    }

    return () => {
      if (stepsRef.current) {
        observer.unobserve(stepsRef.current);
      }
    };
  }, []);

  return (
    <section id="how-it-works" className="py-20 px-6 md:px-10 relative overflow-hidden">
      <style>
        {`
          .connector {
            transform-origin: top;
            transition: transform 0.8s ease-out;
          }
          .scale-y-0 {
            transform: scaleY(0);
          }
          .scale-y-100 {
            transform: scaleY(1);
          }
        `}
      </style>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-medium mb-4">
            <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
            Our Process
          </div>
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-4">
            How <span className="text-gradient-blue">Brand Accelerator</span> Works
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our proven methodology helps businesses achieve sustainable growth through a structured, data-driven approach
          </p>
        </div>

        <div 
          ref={stepsRef}
          className="relative"
        >
          {/* Center timeline for desktop */}
          <div className="hidden lg:block absolute left-1/2 top-24 bottom-24 w-0.5 bg-gradient-to-b from-blue-500/60 via-blue-400/40 to-blue-300/10 transform -translate-x-1/2 opacity-0 scale-y-0 transition-all duration-1000 delay-300 connector"></div>
          
          <div className="space-y-16 lg:space-y-32 relative">
            <Step 
              number="01"
              title="Strategic Assessment"
              description="We begin with a comprehensive analysis of your current market position, competitive landscape, and growth opportunities to establish a baseline for your strategy."
              icon={<Lightbulb className="w-8 h-8" />}
              position="left"
            />
            
            <Step 
              number="02"
              title="Custom Strategy Development"
              description="Our team develops a tailored growth strategy based on your business objectives, target audience, and unique value proposition."
              icon={<FileText className="w-8 h-8" />}
              position="right"
            />
            
            <Step 
              number="03"
              title="Implementation & Execution"
              description="We execute the strategy across all relevant channels, implementing high-impact marketing initiatives to drive measurable results."
              icon={<ClipboardCheck className="w-8 h-8" />}
              position="left"
            />
            
            <Step 
              number="04"
              title="Analysis & Optimization"
              description="Continuous monitoring and analysis of performance metrics allows us to optimize your strategy for maximum ROI and sustainable growth."
              icon={<LineChart className="w-8 h-8" />}
              position="right"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

const Step = ({ 
  number, 
  title, 
  description, 
  icon, 
  position 
}: { 
  number: string; 
  title: string; 
  description: string; 
  icon: React.ReactNode;
  position: 'left' | 'right';
}) => (
  <div className={`flex flex-col lg:flex-row ${position === 'right' ? 'lg:flex-row-reverse' : ''} items-center step opacity-0 translate-y-20 transition-all duration-700 ease-out`}>
    <div className={`bg-white rounded-xl p-8 lg:w-1/2 soft-shadow relative z-10 hover:shadow-lg transition-all duration-300`}>
      <div className="flex items-center mb-4">
        <div className="bg-blue-50 w-12 h-12 rounded-lg flex items-center justify-center text-blue-600 mr-4">
          {icon}
        </div>
        <div>
          <div className="text-sm font-medium text-blue-600 mb-1">Step {number}</div>
          <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
        </div>
      </div>
      <p className="text-gray-600">{description}</p>
    </div>
    
    <div className="hidden lg:flex w-16 relative justify-center">
      <div className="w-6 h-6 rounded-full bg-blue-500 relative z-10 transform scale-0 transition-transform duration-500 ease-out node"></div>
      {/* Vertical connecting lines for steps 1-3 */}
      {number !== "04" && position === "left" && (
        <div className="absolute top-0 bottom-0 w-0.5 bg-blue-400/30 -translate-y-full h-32 origin-bottom scale-y-0 transition-transform duration-700 delay-300 connector"></div>
      )}
      {number !== "04" && position === "right" && (
        <div className="absolute top-0 bottom-0 w-0.5 bg-blue-400/30 -translate-y-full h-32 origin-bottom scale-y-0 transition-transform duration-700 delay-300 connector"></div>
      )}
    </div>
    
    <div className="lg:w-1/2"></div>
  </div>
);

export default HowItWorks;
