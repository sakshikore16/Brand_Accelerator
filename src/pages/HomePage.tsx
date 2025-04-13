import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Features from '../components/Features';
import HowItWorks from '../components/HowItWorks';
import CaseStudies from '../components/CaseStudies';
import Testimonials from '../components/Testimonials';
import ContactForm from '../components/ContactForm';
import Footer from '../components/Footer';
import BackgroundEffect from '../components/BackgroundEffect';
import CustomCursor from '../components/CustomCursor';

const HomePage = () => {
  // Smooth scroll implementation
  useEffect(() => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const href = this.getAttribute('href');
        if (!href) return;
        
        const targetElement = document.querySelector(href);
        if (!targetElement) return;
        
        window.scrollTo({
          top: targetElement.getBoundingClientRect().top + window.scrollY - 100,
          behavior: 'smooth'
        });
      });
    });

    // Add resize event listener for mindmap connections
    const handleResize = () => {
      const event = new Event('resize');
      window.dispatchEvent(event);
    };

    // Trigger resize after page load to ensure mindmap connections are drawn
    window.addEventListener('load', handleResize);
    
    return () => {
      window.removeEventListener('load', handleResize);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <CustomCursor />
      <BackgroundEffect />
      <Navbar />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <CaseStudies />
        <Testimonials />
        <ContactForm />
      </main>
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
      <Footer />
    </div>
  );
};

export default HomePage; 