import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronRight, BarChart2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Change navbar styling on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
          behavior: 'smooth'
        });
      }, 100);
    } else {
      // Handle route navigation
      navigate(path);
    }
    
    setIsMobileMenuOpen(false);
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 md:px-10 lg:px-20 py-4 ${
        isScrolled ? 'neo-blur border-b border-gray-200/20' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/" className="relative flex items-center gap-2">
            <div className="relative w-10 h-10 flex items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 overflow-hidden group">
              <div className="absolute inset-0 bg-grid-background opacity-20"></div>
              <div className="absolute -inset-3 bg-gradient-radial from-blue-500/40 via-blue-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-glow-pulse-slow"></div>
              <div className="absolute -inset-2 bg-gradient-radial from-blue-600/30 via-blue-500/20 to-transparent animate-glow-pulse-slow" style={{ animationDelay: '-1.5s' }}></div>
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 via-transparent to-blue-900/30"></div>
              <div className="absolute -inset-4 rounded-full border-2 border-blue-900/50 animate-glow-pulse-slow"></div>
              <BarChart2 className="w-5 h-5 text-white relative z-10" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-gray-800 leading-none">
                Brand<span className="text-primary">Accelerator</span>
              </span>
              <span className="text-[10px] uppercase tracking-widest text-blue-600/80 font-light -mt-1">Business Growth Solutions</span>
            </div>
          </Link>
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center space-x-8">
          <NavLink href="#services" onClick={(e) => handleNavClick(e, '#services')}>Services</NavLink>
          <NavLink href="#how-it-works" onClick={(e) => handleNavClick(e, '#how-it-works')}>How It Works</NavLink>
          <NavLink href="#case-studies" onClick={(e) => handleNavClick(e, '#case-studies')}>Case Studies</NavLink>
          <NavLink href="#testimonials" onClick={(e) => handleNavClick(e, '#testimonials')}>Testimonials</NavLink>
          
          {/* Get Started Button */}
          <NavLink href="#contact-form" onClick={(e) => handleNavClick(e, '#contact-form')}>
            <span className="px-4 py-2 rounded-lg bg-primary hover:bg-primary/90 text-white transition-all duration-300 flex items-center gap-2 text-sm font-medium blue-glow">
              Get Started <ChevronRight className="w-4 h-4" />
            </span>
          </NavLink>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-gray-800 p-2 rounded-full glass-morphism"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden neo-blur mt-4 rounded-xl p-6 animate-fade-in-up">
          <div className="flex flex-col space-y-4">
            <MobileNavLink href="#services" onClick={(e) => handleNavClick(e, '#services')}>Services</MobileNavLink>
            <MobileNavLink href="#how-it-works" onClick={(e) => handleNavClick(e, '#how-it-works')}>How It Works</MobileNavLink>
            <MobileNavLink href="#case-studies" onClick={(e) => handleNavClick(e, '#case-studies')}>Case Studies</MobileNavLink>
            <MobileNavLink href="#testimonials" onClick={(e) => handleNavClick(e, '#testimonials')}>Testimonials</MobileNavLink>
            <div className="pt-4">
              <MobileNavLink href="#contact-form" onClick={(e) => handleNavClick(e, '#contact-form')}>
                <span className="px-4 py-3 rounded-lg bg-primary hover:bg-primary/90 text-white transition-all duration-300 flex items-center justify-center gap-2 w-full blue-glow">
                  Get Started <ChevronRight className="w-4 h-4" />
                </span>
              </MobileNavLink>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

const NavLink = ({ href, children, onClick }: { href: string; children: React.ReactNode; onClick: (e: React.MouseEvent<HTMLAnchorElement>) => void }) => {
  return (
    <a 
      href={href} 
      className="text-sm text-gray-600 hover:text-primary transition-colors duration-300 relative overflow-hidden group"
      onClick={onClick}
    >
      {children}
      <span className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent transform scale-x-0 origin-center transition-transform duration-300 group-hover:scale-x-100"></span>
    </a>
  );
};

const MobileNavLink = ({ href, children, onClick }: { href: string; children: React.ReactNode; onClick: (e: React.MouseEvent<HTMLAnchorElement>) => void }) => {
  return (
    <a 
      href={href} 
      className="text-gray-600 hover:text-primary transition-colors duration-300 py-2 text-base flex items-center"
      onClick={onClick}
    >
      <span className="w-1 h-1 rounded-full bg-primary mr-2"></span>
      {children}
    </a>
  );
};

export default Navbar;
