
import React, { useState, useEffect, useRef } from 'react';
import { CheckCircle, Briefcase, Star, ChevronLeft, ChevronRight, Search } from 'lucide-react';

// Sample talent data
const talents = [
  {
    id: 1,
    name: "Alex Morgan",
    role: "Senior AI Engineer",
    rating: 4.9,
    verified: true,
    experience: "8 years",
    skills: ["Machine Learning", "Python", "TensorFlow", "Data Science"],
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  },
  {
    id: 2,
    name: "Sarah Chen",
    role: "UX/UI Designer",
    rating: 4.8,
    verified: true,
    experience: "6 years",
    skills: ["Figma", "User Research", "Prototyping", "UI Design"],
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  },
  {
    id: 3,
    name: "Miguel Sanchez",
    role: "Full-Stack Developer",
    rating: 4.7,
    verified: true,
    experience: "5 years",
    skills: ["React", "Node.js", "TypeScript", "MongoDB"],
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  },
  {
    id: 4,
    name: "Priya Patel",
    role: "Data Scientist",
    rating: 4.9,
    verified: true,
    experience: "7 years",
    skills: ["Python", "R", "SQL", "Statistics", "Big Data"],
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  },
  {
    id: 5,
    name: "David Kim",
    role: "Cloud Architect",
    rating: 4.8,
    verified: true,
    experience: "9 years",
    skills: ["AWS", "Azure", "DevOps", "Kubernetes", "Docker"],
    image: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  }
];

const TalentShowcase = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const showcaseRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const nextTalent = () => {
    setActiveIndex((prev) => (prev + 1) % talents.length);
  };

  const prevTalent = () => {
    setActiveIndex((prev) => (prev - 1 + talents.length) % talents.length);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (showcaseRef.current) {
      observer.observe(showcaseRef.current);
    }

    return () => {
      if (showcaseRef.current) {
        observer.unobserve(showcaseRef.current);
      }
    };
  }, []);

  return (
    <section id="talents" className="py-20 px-6 md:px-10 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial from-purple-900/10 via-transparent to-transparent opacity-30"></div>
      
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4">
            <span className="text-gradient-purple">Top Verified</span> Talents
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Discover exceptional professionals with verified skills and proven experience
          </p>
        </div>

        <div className="flex justify-center mb-10">
          <div className="glass-morphism rounded-full flex items-center px-3 py-2 w-full max-w-md">
            <Search className="w-5 h-5 text-gray-400 mr-2" />
            <input 
              type="text" 
              placeholder="Search skills, roles, or industries..." 
              className="bg-transparent border-none outline-none text-white w-full placeholder:text-gray-500"
            />
          </div>
        </div>

        <div 
          ref={showcaseRef}
          className="relative"
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-medium text-white">Featured Talents</h3>
            <div className="flex gap-2">
              <button 
                onClick={prevTalent}
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white/5 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={nextTalent}
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white/5 transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {talents.map((talent, index) => (
              <div 
                key={talent.id}
                className={`glass-morphism rounded-xl p-6 transition-all duration-500 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start mb-4">
                  <div className="w-16 h-16 rounded-lg overflow-hidden mr-4 flex-shrink-0">
                    <img 
                      src={talent.image} 
                      alt={talent.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="flex items-center">
                      <h4 className="text-lg font-medium text-white mr-2">{talent.name}</h4>
                      {talent.verified && (
                        <CheckCircle className="w-4 h-4 text-primary" />
                      )}
                    </div>
                    <p className="text-gray-300 text-sm">{talent.role}</p>
                    <div className="flex items-center mt-1">
                      <Star className="w-4 h-4 text-yellow-400 mr-1" />
                      <span className="text-sm text-gray-300">{talent.rating}</span>
                    </div>
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="flex items-center mb-2">
                    <Briefcase className="w-4 h-4 text-gray-400 mr-2" />
                    <span className="text-sm text-gray-300">{talent.experience} experience</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm text-gray-300 font-medium">Top Skills:</div>
                  <div className="flex flex-wrap gap-2">
                    {talent.skills.map((skill, i) => (
                      <span 
                        key={i}
                        className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <button className="px-6 py-3 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-all duration-300">
              View All Talents
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TalentShowcase;
