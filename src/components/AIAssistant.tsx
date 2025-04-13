
import React, { useState, useEffect, useRef } from 'react';
import { Brain, MessageSquare, Send, User } from 'lucide-react';

const AIAssistant = () => {
  const [chatActive, setChatActive] = useState(false);
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([
    { text: "Hello! I'm QredifiQ's AI Assistant. How can I help you find the perfect talent today?", isUser: false }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const toggleChat = () => {
    setChatActive(!chatActive);
  };

  const sendMessage = () => {
    if (!inputMessage.trim()) return;
    
    // Add user message
    setMessages(prev => [...prev, { text: inputMessage, isUser: true }]);
    setInputMessage('');
    
    // Simulate AI response after a short delay
    setTimeout(() => {
      const aiResponses = [
        "I can help you find talents with verified AI and machine learning skills. What specific expertise are you looking for?",
        "Based on your requirements, I'd recommend focusing on candidates with experience in natural language processing and computer vision.",
        "Our database has 42 verified talents matching your criteria. Would you like me to analyze team compatibility for your top choices?",
        "I've analyzed the skill profiles. Sarah Chen has a 96% match rate with your requirements and excellent team compatibility scores."
      ];
      
      setMessages(prev => [...prev, { 
        text: aiResponses[Math.floor(Math.random() * aiResponses.length)], 
        isUser: false 
      }]);
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Animation for container entry
  useEffect(() => {
    if (chatActive && containerRef.current) {
      containerRef.current.classList.add('animate-slide-up');
      containerRef.current.classList.remove('opacity-0');
    }
  }, [chatActive]);

  return (
    <div id="companies" className="fixed bottom-8 right-8 z-40">
      {/* Chat toggle button */}
      <button 
        onClick={toggleChat}
        className="w-14 h-14 rounded-full bg-primary flex items-center justify-center text-white shadow-lg hover:bg-primary/90 transition-all duration-300 purple-glow"
      >
        {chatActive ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
      </button>
      
      {/* Chat container */}
      {chatActive && (
        <div 
          ref={containerRef}
          className="absolute bottom-20 right-0 w-80 sm:w-96 bg-[#121218] rounded-xl shadow-xl border border-white/10 flex flex-col opacity-0 overflow-hidden"
          style={{ maxHeight: 'calc(100vh - 180px)' }}
        >
          {/* Chat header */}
          <div className="p-4 border-b border-white/10 flex items-center bg-gradient-to-r from-[#1A1F2C] to-[#2A243C]">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mr-3">
              <Brain className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-medium text-white">QredifiQ Assistant</h3>
              <p className="text-xs text-gray-400">AI-powered talent matching</p>
            </div>
          </div>
          
          {/* Chat messages */}
          <div className="flex-1 p-4 overflow-y-auto">
            <div className="space-y-4">
              {messages.map((msg, index) => (
                <div 
                  key={index}
                  className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`
                      max-w-[80%] p-3 rounded-lg ${
                        msg.isUser 
                          ? 'bg-primary text-white rounded-tr-none' 
                          : 'bg-[#1E1E2A] text-gray-200 rounded-tl-none'
                      }
                    `}
                  >
                    <div className="flex items-start mb-1">
                      {!msg.isUser && (
                        <Brain className="w-4 h-4 mr-1 text-primary" />
                      )}
                      <div className={`text-xs font-medium ${msg.isUser ? 'text-white/90' : 'text-primary'}`}>
                        {msg.isUser ? 'You' : 'QredifiQ AI'}
                      </div>
                    </div>
                    <p className="text-sm">{msg.text}</p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>
          
          {/* Input area */}
          <div className="p-3 border-t border-white/10">
            <div className="flex items-center bg-white/5 rounded-lg px-3 py-2">
              <input 
                type="text" 
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about talent matching..."
                className="flex-1 bg-transparent outline-none text-white text-sm"
              />
              <button 
                onClick={sendMessage}
                disabled={!inputMessage.trim()}
                className={`w-8 h-8 flex items-center justify-center rounded-full ${
                  inputMessage.trim() ? 'text-primary hover:bg-primary/10' : 'text-gray-500'
                } transition-colors`}
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// X icon for closing
const X = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
);

export default AIAssistant;
