import React, { useEffect, useRef } from 'react';
import { BarChart, Megaphone, PieChart, Target, TrendingUp, Users, Briefcase, Users2 } from 'lucide-react';

const Features = () => {
  const featuresRef = useRef<HTMLDivElement>(null);
  const mindmapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const elements = entry.target.querySelectorAll('.feature-card');
            elements.forEach((el, index) => {
              setTimeout(() => {
                el.classList.add('opacity-100', 'translate-y-0');
                el.classList.remove('opacity-0', 'translate-y-10');
              }, index * 100);
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    if (featuresRef.current) {
      observer.observe(featuresRef.current);
    }

    // Handle mindmap connections
    if (mindmapRef.current) {
      drawConnections();
    }

    const handleResize = () => {
      if (mindmapRef.current) {
        drawConnections();
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (featuresRef.current) {
        observer.unobserve(featuresRef.current);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Function to draw connection lines
  const drawConnections = () => {
    if (!mindmapRef.current) return;

    const centerCard = mindmapRef.current.querySelector('.center-card');
    const serviceCards = mindmapRef.current.querySelectorAll('.service-card');
    
    if (!centerCard) return;

    const centerRect = centerCard.getBoundingClientRect();
    const centerX = centerRect.left + centerRect.width / 2;
    const centerY = centerRect.top + centerRect.height / 2;

    const svg = mindmapRef.current.querySelector('svg');
    if (svg) {
      // Clear existing lines
      while (svg.firstChild) {
        svg.removeChild(svg.firstChild);
      }

      // Draw new lines
      serviceCards.forEach((card) => {
        const cardRect = card.getBoundingClientRect();
        const cardX = cardRect.left + cardRect.width / 2;
        const cardY = cardRect.top + cardRect.height / 2;

        // Calculate relative positions
        const mindmapRect = mindmapRef.current!.getBoundingClientRect();
        const relCenterX = centerX - mindmapRect.left;
        const relCenterY = centerY - mindmapRect.top;
        const relCardX = cardX - mindmapRect.left;
        const relCardY = cardY - mindmapRect.top;

        // Create line
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', relCenterX.toString());
        line.setAttribute('y1', relCenterY.toString());
        line.setAttribute('x2', relCardX.toString());
        line.setAttribute('y2', relCardY.toString());
        line.setAttribute('stroke', '#94A3B8');
        line.setAttribute('stroke-width', '2');
        line.setAttribute('stroke-dasharray', '5,5');
        line.setAttribute('stroke-dashoffset', '0');
        
        // Add animation
        line.style.animation = 'drawLine 1s ease-out forwards';
        
        svg.appendChild(line);
      });
    }
  };

  return (
    <section id="services" className="py-20 px-6 md:px-10 relative overflow-hidden bg-gradient-to-br from-white via-blue-50 to-white">
      <style>
        {`
          @keyframes drawLine {
            from {
              stroke-dashoffset: 1000;
            }
            to {
              stroke-dashoffset: 0;
            }
          }
        `}
      </style>
      <div className="absolute inset-0 grid-background opacity-20 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-medium mb-4">
            <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
            Our Services
          </div>
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-4">
            Comprehensive <span className="text-gradient-blue">Business Growth</span> Solutions
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our strategic services are designed to help your brand stand out in the market and achieve sustainable business growth
          </p>
        </div>

        <div 
          ref={featuresRef}
          className="relative"
        >
          {/* Mobile View - Stacked Cards */}
          <div className="md:hidden">
            {/* Center Card - Fractional CMO */}
            <div className="feature-card transition-all duration-500 ease-out opacity-0 translate-y-10 mb-8">
              <div className="bg-blue-600 rounded-xl p-8 shadow-xl">
                <div className="w-14 h-14 rounded-lg flex items-center justify-center mb-6 text-white bg-white/20">
                  <Briefcase className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-semibold mb-3 text-white">Fractional CMO</h3>
                <p className="text-blue-50">Executive-level marketing leadership without the full-time cost. Strategic guidance to optimize your marketing initiatives and drive growth.</p>
              </div>
            </div>

            {/* Grid of Service Cards */}
            <div className="grid grid-cols-2 gap-4">
              <ServiceCard 
                icon={<BarChart />}
                title="Market Analysis" 
                description="Comprehensive market research and competitor analysis to identify growth opportunities."
                delay={1}
              />
              
              <ServiceCard 
                icon={<Megaphone />}
                title="Brand Strategy" 
                description="Strategic brand positioning and messaging frameworks that resonate with your target audience."
                delay={2}
              />
              
              <ServiceCard 
                icon={<Target />}
                title="Performance Marketing" 
                description="Maximising your ROI and driving growth"
                delay={3}
              />
              
              <ServiceCard 
                icon={<TrendingUp />}
                title="Growth Strategy" 
                description="Tailored growth strategies that align with your business objectives."
                delay={4}
              />
              
              <ServiceCard 
                icon={<Users />}
                title="Customer Acquisition" 
                description="Innovative customer acquisition tactics that expand your customer base."
                delay={5}
              />
              
              <ServiceCard 
                icon={<PieChart />}
                title="Analytics & Insights" 
                description="Advanced analytics and reporting that provide actionable insights."
                delay={6}
              />
              
              <ServiceCard 
                icon={<Users2 />}
                title="Influencer Marketing" 
                description="Strategic partnerships with relevant influencers to amplify your brand message."
                delay={7}
              />
              
              <ServiceCard 
                icon={<BarChart />}
                title="Content Strategy" 
                description="Comprehensive content planning to engage your audience and drive conversions."
                delay={8}
              />
            </div>
          </div>

          {/* Desktop View - Mind Map */}
          <div 
            ref={mindmapRef} 
            className="hidden md:block relative w-full mx-auto"
            style={{ height: '1000px' }}
          >
            {/* SVG for connections */}
            <svg className="absolute inset-0 w-full h-full z-0 pointer-events-none"></svg>
            
            {/* Center Card - Fractional CMO */}
            <div className="center-card absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-2/4 z-10 feature-card transition-all duration-500 ease-out opacity-0 translate-y-10">
              <div className="bg-blue-600 rounded-xl p-8 shadow-xl max-w-xs">
                <div className="w-14 h-14 rounded-lg flex items-center justify-center mb-6 text-white bg-white/20">
                  <Briefcase className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-semibold mb-3 text-white">Fractional CMO</h3>
                <p className="text-blue-50">Executive-level marketing leadership without the full-time cost. Strategic guidance to optimize your marketing initiatives and drive growth.</p>
              </div>
            </div>
            
            {/* Top Services */}
            <ServiceCard 
              icon={<BarChart />}
              title="Market Analysis" 
              description="Comprehensive market research and competitor analysis to identify growth opportunities."
              position="top-2 left-1/4 -translate-x-1/4"
              delay={1}
            />
            
            <ServiceCard 
              icon={<Megaphone />}
              title="Brand Strategy" 
              description="Strategic brand positioning and messaging frameworks that resonate with your target audience."
              position="top-2 right-1/4 translate-x-1/4"
              delay={2}
            />
            
            {/* Right Services */}
            <ServiceCard 
              icon={<Target />}
              title="Performance Marketing" 
              description="Maximising your ROI and driving growth"
              position="top-1/4 right-8"
              delay={3}
            />
            
            <ServiceCard 
              icon={<TrendingUp />}
              title="Growth Strategy" 
              description="Tailored growth strategies that align with your business objectives."
              position="bottom-1/4 right-8"
              delay={4}
            />
            
            {/* Bottom Services */}
            <ServiceCard 
              icon={<Users />}
              title="Customer Acquisition" 
              description="Innovative customer acquisition tactics that expand your customer base."
              position="bottom-0 right-1/4 translate-x-1/2"
              delay={5}
            />
            
            <ServiceCard 
              icon={<PieChart />}
              title="Analytics & Insights" 
              description="Advanced analytics and reporting that provide actionable insights."
              position="bottom-0 left-1/4 -translate-x-1/2"
              delay={6}
            />
            
            {/* Left Services */}
            <ServiceCard 
              icon={<Users2 />}
              title="Influencer Marketing" 
              description="Strategic partnerships with relevant influencers to amplify your brand message."
              position="bottom-1/4 left-8"
              delay={7}
            />
            
            <ServiceCard 
              icon={<BarChart />}
              title="Content Strategy" 
              description="Comprehensive content planning to engage your audience and drive conversions."
              position="top-1/4 left-8"
              delay={8}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

// Service Card Component for Mind Map
const ServiceCard = ({ 
  icon, 
  title, 
  description,
  position,
  delay
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string;
  position?: string;
  delay: number;
}) => (
  <div 
    className={`service-card ${position ? `absolute ${position}` : ''} feature-card transition-all duration-500 ease-out opacity-0 translate-y-10 z-10`}
    style={{ 
      transitionDelay: `${delay * 100}ms`,
    }}
  >
    <div className="bg-white rounded-xl p-6 shadow-md max-w-[250px] hover:shadow-lg transition-shadow">
      <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4 text-blue-600 bg-blue-50">
        {icon}
      </div>
      <h3 className="text-lg font-semibold mb-2 text-gray-800">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  </div>
);

export default Features;
