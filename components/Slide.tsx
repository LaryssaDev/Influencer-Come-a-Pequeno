import React from 'react';
import { SlideContent } from '../types';
import { CHECKOUT_LINK } from '../constants';
import { CheckCircle2, ChevronDown, Lock, Star, Zap } from 'lucide-react';

interface SlideProps {
  data: SlideContent;
  isLast: boolean;
}

export const Slide: React.FC<SlideProps> = ({ data, isLast }) => {
  const isOffer = data.isOffer;

  const handleBuyClick = () => {
    window.open(CHECKOUT_LINK, '_blank');
  };

  return (
    <div className="relative w-full h-full snap-start flex flex-col items-center justify-center overflow-hidden bg-gray-900 text-white">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={data.imageKeyword} 
          alt={data.title} 
          className="w-full h-full object-cover opacity-60 transition-transform duration-[10000ms] ease-linear hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/50 via-gray-900/70 to-gray-900/95" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-md px-6 flex flex-col items-center text-center space-y-6 animate-fade-in-up">
        
        {/* Special Badge for Offer */}
        {isOffer && (
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold px-4 py-1 rounded-full text-sm uppercase tracking-wider mb-2 shadow-lg shadow-orange-500/30 animate-pulse">
            Oportunidade Única
          </div>
        )}

        {/* Title Section */}
        <div className="space-y-2">
          {data.subtitle && (
            <h3 className="text-pink-400 font-medium tracking-wide text-sm md:text-base uppercase">
              {data.subtitle}
            </h3>
          )}
          <h1 className={`font-extrabold leading-tight ${isOffer ? 'text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400' : 'text-3xl md:text-4xl'}`}>
            {data.title}
          </h1>
        </div>

        {/* Divider */}
        <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-orange-500 rounded-full" />

        {/* Description */}
        <p className="text-gray-200 text-lg md:text-xl leading-relaxed font-light">
          {data.description}
        </p>

        {/* Offer Specific Content */}
        {isOffer && data.bulletPoints && (
          <div className="w-full bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/10 shadow-xl mt-4 text-left">
            <ul className="space-y-3">
              {data.bulletPoints.map((point, index) => (
                <li key={index} className="flex items-center space-x-3 text-white">
                  <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span className="font-medium text-sm md:text-base">{point}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 pt-4 border-t border-white/10 flex flex-col items-center">
               <span className="text-gray-400 text-sm line-through">De R$ 97,00</span>
               <span className="text-3xl font-bold text-white">Por R$ 39,70</span>
            </div>
          </div>
        )}

        {/* Call to Action Buttons */}
        {data.ctaText && (
          <button 
            onClick={handleBuyClick}
            className={`
              mt-6 w-full py-4 px-8 rounded-full font-bold text-lg shadow-xl transform transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2
              ${isOffer || isLast 
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white shadow-purple-500/40 ring-2 ring-purple-400/50' 
                : 'bg-white text-gray-900 hover:bg-gray-100'
              }
            `}
          >
            {isOffer && <Star className="w-5 h-5 fill-current" />}
            {data.ctaText}
            {!isOffer && <Zap className="w-5 h-5" />}
          </button>
        )}

        {/* Secure Payment Icon for Offer */}
        {(isOffer || isLast) && (
            <div className="flex items-center justify-center gap-2 text-xs text-gray-400 mt-2">
                <Lock className="w-3 h-3" />
                <span>Compra 100% Segura via Kiwify</span>
            </div>
        )}

      </div>

      {/* Scroll Indicator (Hidden on last slide) */}
      {!isLast && (
        <div className="absolute bottom-8 z-20 animate-bounce text-white/50">
          <ChevronDown className="w-8 h-8" />
        </div>
      )}
    </div>
  );
};
