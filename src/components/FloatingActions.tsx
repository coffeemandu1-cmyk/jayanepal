import React, { useState, useEffect } from 'react';
import { MessageSquare, Phone, ShoppingCart, ChevronUp } from 'lucide-react';
import { COMPANY_DETAILS } from '../data/products';
import { Language } from '../types';

interface FloatingActionsProps {
  language: Language;
  cartCount: number;
  onOpenCart: () => void;
}

export const FloatingActions: React.FC<FloatingActionsProps> = ({
  language,
  cartCount,
  onOpenCart,
}) => {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const isNe = language === 'ne';

  useEffect(() => {
    const checkScroll = () => {
      if (window.scrollY > 400) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };
    window.addEventListener('scroll', checkScroll);
    return () => window.removeEventListener('scroll', checkScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const whatsAppText = isNe
    ? 'नमस्ते जय नेपाल ट्रेडर्स, मलाई अस्पतालका लागि सर्जिकल सामानको अर्डर गर्नु परेको छ।'
    : 'Hello Jay Nepal Traders, I would like to inquire about hospital supplies.';

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3 pointer-events-none">
      
      {/* Scroll to Top */}
      {showBackToTop && (
        <button
          type="button"
          onClick={scrollToTop}
          className="pointer-events-auto p-2.5 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white shadow-lg backdrop-blur-xs transition-all hover:-translate-y-0.5"
          aria-label="Back to top"
        >
          <ChevronUp className="w-5 h-5" />
        </button>
      )}

      {/* Floating Cart Button */}
      {cartCount > 0 && (
        <button
          type="button"
          onClick={onOpenCart}
          className="pointer-events-auto flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-red-600 hover:bg-red-700 text-white shadow-xl shadow-red-600/30 transition-all transform hover:scale-105 active:scale-95 animate-bounce"
        >
          <ShoppingCart className="w-4 h-4" />
          <span className="text-xs font-extrabold">
            {isNe ? `कोटेशन (${cartCount})` : `Cart (${cartCount})`}
          </span>
        </button>
      )}

      {/* Direct Phone Call Button */}
      <a
        href={`tel:${COMPANY_DETAILS.primaryPhone}`}
        className="pointer-events-auto flex items-center justify-center p-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/30 transition-all hover:scale-105"
        title={COMPANY_DETAILS.primaryPhone}
        aria-label="Call Jay Nepal Traders"
      >
        <Phone className="w-5 h-5" />
      </a>

      {/* Floating WhatsApp Quick Action with Pulsing Ring */}
      <a
        href={`https://wa.me/${COMPANY_DETAILS.whatsappNumber}?text=${encodeURIComponent(whatsAppText)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="pointer-events-auto group relative flex items-center gap-2 px-4 py-3 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-xl shadow-emerald-500/35 transition-all transform hover:scale-105"
        aria-label="Instant WhatsApp Order"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
        </span>
        <MessageSquare className="w-5 h-5 fill-white text-emerald-500" />
        <span className="hidden sm:inline-block text-xs font-extrabold tracking-wide">
          {isNe ? 'तत्काल ह्वाट्सएप अर्डर' : 'Instant WhatsApp'}
        </span>
      </a>

    </div>
  );
};
