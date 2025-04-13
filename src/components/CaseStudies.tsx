import React, { useState, useEffect, useRef } from 'react';
import { Award, BarChart2, Percent, TrendingUp } from 'lucide-react';
import { Card, CardContent } from './ui/card';

const CaseStudies = () => {
  const [activeCase, setActiveCase] = useState(0);
  const caseRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!caseRef.current) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!caseRef.current) return;
      
      const cards = caseRef.current.querySelectorAll('.case-card');
      
      cards.forEach((card) => {
        const cardRect = card.getBoundingClientRect();
        const cardCenterX = cardRect.left + cardRect.width / 2;
        const cardCenterY = cardRect.top + cardRect.height / 2;
        
        // Calculate distance from cursor to card center
        const distX = (e.clientX - cardCenterX) * 0.01;
        const distY = (e.clientY - cardCenterY) * 0.01;
        
        // Apply a subtle, elegant transformation
        (card as HTMLElement).style.transform = `translate3d(${distX}px, ${distY}px, 0) scale(1.01)`;
        (card as HTMLElement).style.transition = 'transform 0.3s cubic-bezier(0.17, 0.67, 0.83, 0.67)';
      });
    };
    
    const handleMouseLeave = () => {
      const cards = caseRef.current?.querySelectorAll('.case-card');
      cards?.forEach((card) => {
        (card as HTMLElement).style.transform = 'translate3d(0, 0, 0) scale(1)';
      });
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    caseRef.current.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      caseRef.current?.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);
  
  const caseStudies = [
    {
      title: "Ecommerce Revenue Growth",
      company: "Irontailor",
      description: "We boosted Irontailor's online sales by running targeted ad campaigns and optimizing their website for conversions. A focus on UX and retargeting led to a 156% revenue increase in just 6 months.",
      stats: [
        { label: "Revenue Growth", value: "156%", icon: <TrendingUp className="w-4 h-4" /> },
        { label: "ROAS", value: "4.8x", icon: <BarChart2 className="w-4 h-4" /> },
        { label: "Conversion Rate", value: "+87%", icon: <Percent className="w-4 h-4" /> }
      ],
      imageUrl: "/Banner-2.jpeg"
    },
    {
      title: "B2C Lead Generation",
      company: "Irontailor",
      description: "To attract premium B2C clients, we ran tailored social ads, launched lead magnets, and partnered with influencers. This drove a sharp rise in quality leads and bookings for key occasions.",
      stats: [
        { label: "Lead Growth", value: "+180%", icon: <TrendingUp className="w-4 h-4" /> },
        { label: "Consultation Bookings", value: "+132%", icon: <BarChart2 className="w-4 h-4" /> },
        { label: "Conversion Rate", value: "2.7x", icon: <Percent className="w-4 h-4" /> }
      ],
      imageUrl: "/Banner-3.jpeg"
    },
    {
      title: "Brand Repositioning",
      company: "Irontailor",
      description: "We refreshed Irontailor's brand identity and storytelling to reflect its premium tailoring. Strategic content and influencer partnerships enhanced visibility and elevated customer perception.",
      stats: [
        { label: "Social Engagement", value: "+40%", icon: <TrendingUp className="w-4 h-4" /> },
        { label: "Brand Perception", value: "+70%", icon: <BarChart2 className="w-4 h-4" /> },
        { label: "Market Positioning", value: "+55%", icon: <Percent className="w-4 h-4" /> }
      ],
      imageUrl: "/Banner-1.jpeg"
    }
  ];
  
  return (
    <section id="case-studies" className="py-20 px-6 md:px-10 relative overflow-hidden bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-medium mb-4">
            <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
            Success Stories
          </div>
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-4">
            Our <span className="text-gradient-blue">Case Studies</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore how we've helped businesses across various industries achieve remarkable growth
          </p>
        </div>
        
        <div ref={caseRef} className="flex flex-col lg:flex-row gap-8">
          {/* Case Study Selection */}
          <div className="lg:w-1/3 space-y-4">
            {caseStudies.map((caseStudy, index) => (
              <Card 
                key={index}
                className={`case-card cursor-pointer transition-all duration-300 overflow-hidden ${
                  activeCase === index 
                    ? 'border-blue-500 shadow-xl' 
                    : 'border-gray-200 hover:border-blue-200'
                }`}
                onClick={() => setActiveCase(index)}
              >
                <CardContent className="p-6 min-h-[150px] flex flex-col justify-center">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">{caseStudy.title}</h3>
                      <p className="text-gray-500 text-sm mt-1">{caseStudy.company}</p>
                    </div>
                    {activeCase === index && (
                      <div className="bg-blue-500 text-white p-1 rounded-full animate-ping-slow">
                        <Award className="w-4 h-4" />
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Case Study Details */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-xl overflow-hidden soft-shadow h-full case-card max-w-3xl mx-auto">
              <div className="h-56 sm:h-64 overflow-hidden">
                <img 
                  src={caseStudies[activeCase].imageUrl} 
                  alt={caseStudies[activeCase].title} 
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
              <div className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-1 sm:mb-2">{caseStudies[activeCase].title}</h3>
                <p className="text-blue-600 font-medium mb-2 sm:mb-3 text-sm sm:text-base">{caseStudies[activeCase].company}</p>
                <p className="text-gray-600 mb-4 sm:mb-6 text-xs sm:text-sm">{caseStudies[activeCase].description}</p>
                
                <div className="grid grid-cols-3 gap-1.5 sm:gap-3">
                  {caseStudies[activeCase].stats.map((stat, index) => (
                    <div key={index} className="bg-gradient-to-br from-blue-50 to-white p-1.5 sm:p-2.5 rounded-lg border border-blue-100 shadow-sm hover:shadow-md transition-all duration-300">
                      <div className="flex items-center">
                        <div className="text-blue-500 mr-1">
                          {stat.icon}
                        </div>
                        <div className="flex-1 text-center">
                          <p className="text-sm sm:text-base font-bold text-gradient-blue">{stat.value}</p>
                          <p className="text-gray-500 text-[8px] sm:text-xs">{stat.label}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;
