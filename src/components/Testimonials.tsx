import React, { useState, useEffect } from 'react';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      quote: "Partnering with Brand Accelerator was a turning point for us. Their Fractional CMO service gave us the direction we needed, resulting in a 30% boost in engagement and 20% increase in revenue within six months.",
      author: "Priya Sharma",
      position: "CEO, Tech Industry",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=256&q=80",
      rating: 5
    },
    {
      quote: "Thanks to Brand Accelerator, our brand visibility has grown exponentially. We've seen a 50% increase in reach and a stronger connection with our audience. Their expertise was exactly what we needed.",
      author: "Amit Desai",
      position: "Founder, Fashion Retail",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=256&q=80",
      rating: 4.8
    },
    {
      quote: "The Fractional CMO service has been invaluable. In just three months, our lead generation improved by 200%. The results were impactful and highly cost-effective.",
      author: "Rajesh Kumar",
      position: "Co-Founder, E-Commerce",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=256&q=80",
      rating: 4.9
    },
    {
      quote: "We were able to scale effectively with Brand Accelerator's guidance. Our website conversions went up by 40%, and revenue grew by 25%, all without the cost of a full-time CMO.",
      author: "Meera Rao",
      position: "CEO, Consumer Goods",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=256&q=80",
      rating: 5
    },
    {
      quote: "The results were almost immediate. Our social media engagement surged by 150%, and sales grew by 30% in just a few months, thanks to the leadership from Brand Accelerator.",
      author: "Vikram Singh",
      position: "Founder, Food & Beverage",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=256&q=80",
      rating: 4.9
    }
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState('right');

  const nextTestimonial = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection('right');
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const prevTestimonial = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection('left');
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  // Auto-rotate testimonials always from right
  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial();
    }, 6000);
    return () => clearInterval(interval);
  }, [isAnimating]);

  return (
    <section id="testimonials" className="py-20 px-6 md:px-10 relative overflow-hidden">
      <div className="absolute inset-0 grid-background opacity-30 pointer-events-none"></div>
      <div className="absolute top-20 right-0 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-medium mb-4">
            <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
            Client Success Stories
          </div>
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-4">
            What Our <span className="text-gradient-blue">Clients Say</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Hear from businesses that have partnered with Brand Accelerator to achieve extraordinary growth
          </p>
        </div>
        
        {/* Testimonial Carousel */}
        <div className="relative max-w-4xl mx-auto">
          <div className="flex justify-between absolute inset-y-0 w-full items-center z-10 pointer-events-none">
            <button 
              onClick={prevTestimonial}
              className="w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center text-blue-600 hover:bg-blue-50 transition-all duration-300 pointer-events-auto"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={nextTestimonial}
              className="w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center text-blue-600 hover:bg-blue-50 transition-all duration-300 pointer-events-auto"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
          
          <div className="overflow-hidden">
            <div 
              className={`flex transition-transform duration-500 ease-in-out ${direction === 'right' ? 'animate-slide-right' : 'animate-slide-left'}`}
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div 
                  key={index}
                  className="w-full flex-shrink-0 px-4"
                >
                  <div className="bg-white rounded-xl p-8 md:p-10 soft-shadow relative overflow-hidden">
                    <div className="absolute top-6 left-6 text-blue-500 opacity-10">
                      <Quote className="w-24 h-24" />
                    </div>
                    <div className="relative z-10">
                      <div className="flex items-center gap-1 mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-4 h-4 ${i < Math.floor(testimonial.rating) ? 'text-yellow-400' : 'text-gray-300'}`} fill={i < Math.floor(testimonial.rating) ? 'currentColor' : 'none'} />
                        ))}
                        <span className="text-sm text-gray-500 ml-2">{testimonial.rating.toFixed(1)}</span>
                      </div>
                      <p className="text-gray-700 text-lg md:text-xl font-medium italic relative z-10 mb-8">{testimonial.quote}</p>
                      <div className="flex items-center">
                        <img 
                          src={testimonial.image} 
                          alt={testimonial.author} 
                          className="w-14 h-14 rounded-full object-cover mr-4 ring-2 ring-blue-100"
                        />
                        <div>
                          <h4 className="text-gray-800 font-semibold text-lg">{testimonial.author}</h4>
                          <p className="text-blue-600 text-sm">{testimonial.position}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Pagination dots */}
          <div className="flex justify-center mt-8 gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  if (isAnimating) return;
                  setIsAnimating(true);
                  setDirection(index > activeIndex ? 'right' : 'left');
                  setActiveIndex(index);
                  setTimeout(() => setIsAnimating(false), 500);
                }}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  activeIndex === index ? 'bg-blue-600 w-6' : 'bg-blue-200'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
