import React from 'react';
import { BarChart2, Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="pt-16 pb-8 px-6 md:px-10 relative overflow-hidden bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-16">
          <div className="md:col-span-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="relative w-8 h-8 flex items-center justify-center rounded-md bg-gradient-to-br from-blue-500 to-blue-700">
                <BarChart2 className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-semibold tracking-tight text-gray-800">
                Brand<span className="text-blue-600">Accelerator</span>
              </span>
            </div>
            <p className="text-gray-600 mb-6">
              Strategic business growth solutions that help brands stand out and accelerate their market presence through data-driven marketing strategies.
            </p>
            <div className="flex space-x-4">
              <SocialLink icon={<Twitter className="w-5 h-5" />} />
              <SocialLink icon={<Linkedin className="w-5 h-5" />} />
              <SocialLink icon={<Facebook className="w-5 h-5" />} />
              <SocialLink icon={<Instagram className="w-5 h-5" />} />
            </div>
          </div>

          <div className="md:col-span-3">
            <h4 className="text-gray-800 font-medium mb-4">Services</h4>
            <ul className="space-y-3">
              <FooterLink href="#services">Market Analysis</FooterLink>
              <FooterLink href="#services">Brand Strategy</FooterLink>
              <FooterLink href="#services">Growth Strategy</FooterLink>
              <FooterLink href="#services">Analytics & Insights</FooterLink>
            </ul>
          </div>

          <div className="md:col-span-4">
            <h4 className="text-gray-800 font-medium mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 text-blue-500 mr-3 mt-0.5" />
                <span className="text-gray-600 text-sm">
                  Hiranandani Medows,<br />
                  Thane west ( 400610 ),<br />
                  Maharashtra.
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 text-blue-500 mr-3" />
                <span className="text-gray-600 text-sm">+91 82913 18921</span>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 text-blue-500 mr-3" />
                <span className="text-gray-600 text-sm">tewarivedant0910@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            © 2025 Brand Accelerator. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <span className="text-gray-500 text-sm hover:text-blue-600 cursor-pointer transition-colors">Privacy Policy</span>
            <span className="text-gray-500 text-sm hover:text-blue-600 cursor-pointer transition-colors">Terms of Service</span>
            <a 
              href="https://github.com/sakshikore16" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-500 text-sm hover:text-blue-600 cursor-pointer transition-colors"
            >
              Developer
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const SocialLink = ({ icon }: { icon: React.ReactNode }) => (
  <a 
    href="#" 
    className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:text-blue-600 hover:border-blue-600 transition-colors"
  >
    {icon}
  </a>
);

const FooterLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <li>
    <a 
      href={href} 
      className="text-gray-600 hover:text-blue-600 transition-colors text-sm"
    >
      {children}
    </a>
  </li>
);

export default Footer;
