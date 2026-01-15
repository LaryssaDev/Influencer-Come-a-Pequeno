import React, { useRef, useState, useEffect } from 'react';
import { Slide } from './components/Slide';
import { ProgressBar } from './components/ProgressBar';
import { SLIDES, CHECKOUT_LINK } from './constants';
import { ShoppingBag } from 'lucide-react';

const App: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleScroll = () => {
    if (containerRef.current) {
      const { scrollTop, clientHeight } = containerRef.current;
      const index = Math.round(scrollTop / clientHeight);
      setCurrentSlide(index);
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const progress = ((currentSlide + 1) / SLIDES.length) * 100;

  return (
    <div className="relative w-full h-[100dvh] bg-black font-sans overflow-hidden">
      <ProgressBar progress={progress} />

      {/* Persistent Floating Buy Button (Appears after slide 2) */}
      <div 
        className={`fixed top-4 right-4 z-50 transition-all duration-500 transform ${
          currentSlide > 1 && currentSlide < 9 ? 'translate-y-0 opacity-100' : '-translate-y-20 opacity-0'
        }`}
      >
        <button
          onClick={() => window.open(CHECKOUT_LINK, '_blank')}
          className="bg-gradient-to-r from-pink-500 to-orange-500 text-white p-3 rounded-full shadow-lg shadow-pink-500/30 hover:scale-110 transition-transform"
        >
          <ShoppingBag className="w-5 h-5" />
        </button>
      </div>

      <main 
        ref={containerRef}
        className="w-full h-full overflow-y-scroll snap-y snap-mandatory scroll-smooth no-scrollbar"
      >
        {SLIDES.map((slide, index) => (
          <Slide 
            key={slide.id} 
            data={slide} 
            isLast={index === SLIDES.length - 1}
          />
        ))}
      </main>

      {/* Global Style for scrollbar hiding if needed via CSS utility, 
          but usually 'no-scrollbar' in Tailwind plugin or custom css works better. 
          We'll rely on a basic style injection for cleanup. */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default App;
