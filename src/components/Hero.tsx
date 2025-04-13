import React from 'react';
import { ArrowRight, BarChart2, PieChart, TrendingUp, Users } from 'lucide-react';
import MarketingElements3D from './MarketingElements3D';

const Hero = () => {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    const href = e.currentTarget.getAttribute('href');
    if (!href) return;

    if (href.startsWith('#')) {
      // Handle hash links (scroll to section)
      const targetElement = document.querySelector(href);
      if (!targetElement) {
        console.error(`Target element ${href} not found`);
        return;
      }

      // Add a small delay to ensure the element is rendered
      setTimeout(() => {
        window.scrollTo({
          top: targetElement.getBoundingClientRect().top + window.scrollY - 100,
          behavior: 'smooth',
        });
      }, 100);
    }
  };

  return (
    <section className="pt-32 pb-20 px-6 md:px-10 lg:px-20 overflow-hidden relative">
      {/* Background elements */}
      <div className="absolute inset-0 grid-background opacity-30 pointer-events-none"></div>

      {/* Primary gradient blobs */}
      <div className="absolute top-20 right-10 w-96 h-96 bg-blue-400/15 rounded-full blur-[64px] animate-gradient-slow"></div>
      <div className="absolute -top-10 right-32 w-72 h-72 bg-purple-400/10 rounded-full blur-[64px] animate-gradient-slow-reverse"></div>
      <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-blue-600/15 rounded-full blur-[80px] animate-gradient-slow-reverse"></div>
      <div className="absolute bottom-32 left-32 w-64 h-64 bg-cyan-400/10 rounded-full blur-[64px] animate-gradient-slow"></div>

      {/* Central effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-radial from-blue-200/20 via-transparent to-transparent opacity-70 animate-scale-pulse-slow"></div>

      {/* Floating accent elements */}
      <div className="absolute top-40 left-1/4 w-32 h-32 bg-purple-300/10 rounded-full blur-[32px] animate-float-slow"></div>
      <div className="absolute bottom-40 right-1/4 w-32 h-32 bg-cyan-300/10 rounded-full blur-[32px] animate-float-slow" style={{ animationDelay: '-2s' }}></div>

      <div className="max-w-7xl mx-auto relative">
        <div className="flex flex-col lg:flex-row items-center">
          {/* Left content */}
          <div className="lg:w-1/2 lg:pr-10 mb-12 lg:mb-0">
            {/* Badge */}
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-medium mb-6">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
              Trusted by 500+ businesses worldwide
            </div>

            {/* Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Accelerate Your Brand's <span className="text-gradient-blue">Growth</span> With Proven Strategies
            </h1>

            {/* Description */}
            <p className="text-gray-600 text-lg mb-8 max-w-xl">
              We help businesses scale their operations and expand their market presence through data-driven marketing solutions and strategic brand positioning.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <a
                href="#contact-form"
                onClick={(e) => handleNavClick(e, '#contact-form')}
                className="px-6 py-3 rounded-lg bg-primary hover:bg-primary/90 text-white transition-all duration-300 flex items-center gap-2 font-medium blue-glow"
              >
                Get Started <ArrowRight className="w-5 h-5" />
              </a>
              <a
                href="#case-studies"
                onClick={(e) => handleNavClick(e, '#case-studies')}
                className="px-6 py-3 rounded-lg border border-gray-200 hover:border-primary/30 hover:bg-blue-50 text-gray-700 transition-all duration-300 font-medium"
              >
                View Case Studies
              </a>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6 mt-8 sm:mt-12">
              <div className="text-center p-4 bg-white/50 rounded-lg backdrop-blur-sm border border-gray-100 hover:border-blue-100 transition-all duration-300">
                <p className="text-2xl sm:text-3xl font-bold text-gray-800 mb-1">97%</p>
                <p className="text-gray-500 text-xs sm:text-sm">Client Satisfaction</p>
              </div>
              <div className="text-center p-4 bg-white/50 rounded-lg backdrop-blur-sm border border-gray-100 hover:border-blue-100 transition-all duration-300">
                <p className="text-2xl sm:text-3xl font-bold text-gray-800 mb-1">250+</p>
                <p className="text-gray-500 text-xs sm:text-sm">Projects Completed</p>
              </div>
              <div className="text-center p-4 bg-white/50 rounded-lg backdrop-blur-sm border border-gray-100 hover:border-blue-100 transition-all duration-300">
                <p className="text-2xl sm:text-3xl font-bold text-gray-800 mb-1">12x</p>
                <p className="text-gray-500 text-xs sm:text-sm">Average ROI</p>
              </div>
            </div>
          </div>

          {/* Right content - 3D Element */}
          <div className="lg:w-1/2 relative perspective-1000">
            <div className="relative bg-white p-6 rounded-2xl shadow-xl soft-shadow gradient-border overflow-hidden animate-float max-w-md mx-auto">
              <div className="absolute inset-0 bg-grid-background opacity-30"></div>

              <div className="relative z-10">
                <div className="flex items-center mb-6">
                  <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center text-blue-600 mr-4">
                    <BarChart2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">Performance Dashboard</h3>
                    <p className="text-gray-500 text-sm">Real-time marketing metrics</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-600">Website Traffic</span>
                      <span className="text-green-600 text-sm font-medium flex items-center">
                        <TrendingUp className="w-3 h-3 mr-1" /> +24%
                      </span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: '78%' }}></div>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-600">Conversion Rate</span>
                      <span className="text-green-600 text-sm font-medium flex items-center">
                        <TrendingUp className="w-3 h-3 mr-1" /> +12%
                      </span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 rounded-full" style={{ width: '63%' }}></div>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-600">Brand Awareness</span>
                      <span className="text-green-600 text-sm font-medium flex items-center">
                        <TrendingUp className="w-3 h-3 mr-1" /> +37%
                      </span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-purple-500 rounded-full" style={{ width: '89%' }}></div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-100">
                  <div className="flex items-center text-sm text-gray-600">
                    <Users className="w-4 h-4 mr-1 text-blue-500" />
                    <span>12k new visitors this week</span>
                  </div>
                  <PieChart className="w-5 h-5 text-blue-500" />
                </div>
              </div>
            </div>

            {/* 3D Marketing Elements */}
            <MarketingElements3D />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
