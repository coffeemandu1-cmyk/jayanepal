import React, { useState, useEffect } from 'react';
import { 
  Phone, 
  Mail, 
  Clock, 
  ShoppingCart, 
  Menu, 
  X, 
  MessageSquare, 
  FileText, 
  ShieldCheck, 
  Search,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';
import { JayNepalLogo } from './JayNepalLogo';
import { COMPANY_DETAILS } from '../data/products';
import { Language } from '../types';

interface NavbarProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenQuickRfq: () => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  language,
  onLanguageChange,
  cartCount,
  onOpenCart,
  onOpenQuickRfq,
  activeSection,
  onNavigate,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isNe = language === 'ne';

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

  const navLinks = [
    { id: 'hero', labelNe: 'गृहपृष्ठ', labelEn: 'Home' },
    { id: 'catalog', labelNe: 'सर्जिकल क्याटलग', labelEn: 'Products Catalog' },
    { id: 'services', labelNe: 'अस्पताल सेवाहरू', labelEn: 'Hospital Services' },
    { id: 'why-us', labelNe: 'हामी किन?', labelEn: 'Why Us' },
    { id: 'clients', labelNe: 'सम्बद्ध अस्पताल', labelEn: 'Hospital Partners' },
    { id: 'contact', labelNe: 'सम्पर्क', labelEn: 'Contact' },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      {/* Top Notification / Hotline Bar */}
      <div className="bg-slate-900 text-slate-200 text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          {/* Left: Emergency hospital supply notice */}
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>{isNe ? 'आकस्मिक ओटी/आइसियू आपूर्ति २४/७ सेवा' : '24/7 Urgent OT & ICU Hospital Supply'}</span>
            </div>

            <div className="hidden md:flex items-center gap-1.5 text-slate-300">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
              <span>{isNe ? 'DDA दर्ता नं: १४२/MED/२०७९ | ISO १३४८५ प्रमाणित' : 'DDA Regd: 142/MED/2079 | ISO 13485'}</span>
            </div>
          </div>

          {/* Right: Phone, WhatsApp, and Language Switcher */}
          <div className="flex items-center gap-4 ml-auto">
            <a 
              href={`tel:${COMPANY_DETAILS.primaryPhone}`} 
              className="flex items-center gap-1 hover:text-red-400 transition-colors font-english font-medium"
            >
              <Phone className="w-3.5 h-3.5 text-red-400" />
              <span>{COMPANY_DETAILS.primaryPhone}</span>
            </a>

            <a
              href={`https://wa.me/${COMPANY_DETAILS.whatsappNumber}?text=${encodeURIComponent(isNe ? 'नमस्ते जय नेपाल ट्रेडर्स, म सर्जिकल सामानको सोधपुछ गर्न चाहन्छु।' : 'Hello Jay Nepal Traders, I would like to inquire about surgical supplies.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1 text-emerald-400 hover:text-emerald-300 transition-colors font-medium"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>

            {/* Language Switcher */}
            <div className="flex items-center bg-slate-800 rounded-md p-0.5 border border-slate-700">
              <button
                type="button"
                onClick={() => onLanguageChange('ne')}
                className={`px-2 py-0.5 text-xs font-semibold rounded transition-colors ${
                  language === 'ne'
                    ? 'bg-red-600 text-white shadow-sm'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                नेपाली
              </button>
              <button
                type="button"
                onClick={() => onLanguageChange('en')}
                className={`px-2 py-0.5 text-xs font-semibold rounded transition-colors ${
                  language === 'en'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                EN
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className={`bg-white/95 backdrop-blur-md transition-shadow duration-300 ${isScrolled ? 'shadow-md border-b border-slate-200' : 'border-b border-slate-100'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <button
            type="button"
            onClick={() => handleNavClick('hero')}
            className="flex items-center text-left focus:outline-none"
          >
            <JayNepalLogo size="md" />
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <button
                key={link.id}
                type="button"
                onClick={() => handleNavClick(link.id)}
                className={`text-sm font-semibold transition-colors relative py-1 ${
                  activeSection === link.id
                    ? 'text-red-600'
                    : 'text-slate-700 hover:text-red-600'
                }`}
              >
                {isNe ? link.labelNe : link.labelEn}
                {activeSection === link.id && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-red-600 rounded-full" />
                )}
              </button>
            ))}
          </nav>

          {/* Desktop Header Actions */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Quick RFQ / Quote Request Button */}
            <button
              type="button"
              onClick={onOpenQuickRfq}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-lg border border-slate-300 text-slate-700 hover:border-red-500 hover:text-red-600 hover:bg-red-50 transition-colors shadow-xs"
            >
              <FileText className="w-4 h-4 text-red-600" />
              <span>{isNe ? 'तत्काल कोटेशन फारम' : 'Quick RFQ'}</span>
            </button>

            {/* Direct WhatsApp Order Button */}
            <a
              href={`https://wa.me/${COMPANY_DETAILS.whatsappNumber}?text=${encodeURIComponent(isNe ? 'नमस्ते जय नेपाल ट्रेडर्स, मलाई अस्पतालका लागि सर्जिकल सामान अर्डर गर्नु परेको छ।' : 'Hello Jay Nepal Traders, I need to place an order for hospital surgical supplies.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white transition-colors shadow-xs"
            >
              <MessageSquare className="w-4 h-4" />
              <span>{isNe ? 'ह्वाट्सएप अर्डर' : 'WhatsApp Order'}</span>
            </a>

            {/* Cart / Inquiry Drawer Button with Badge */}
            <button
              type="button"
              onClick={onOpenCart}
              className="relative p-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors focus:outline-none"
              title={isNe ? 'कोटेशन सूची' : 'Quotation Cart'}
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-white text-[10px] font-extrabold shadow-sm animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex sm:hidden items-center gap-2">
            {/* Mobile Cart Button */}
            <button
              type="button"
              onClick={onOpenCart}
              className="relative p-2 rounded-lg bg-slate-100 text-slate-800"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-white text-[9px] font-bold">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 focus:outline-none"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 shadow-xl px-4 pt-3 pb-6 animate-in slide-in-from-top duration-200">
          <div className="space-y-1 mb-4">
            {navLinks.map((link) => (
              <button
                key={link.id}
                type="button"
                onClick={() => handleNavClick(link.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-semibold text-left transition-colors ${
                  activeSection === link.id
                    ? 'bg-red-50 text-red-600'
                    : 'text-slate-800 hover:bg-slate-50'
                }`}
              >
                <span>{isNe ? link.labelNe : link.labelEn}</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100 space-y-2.5">
            <button
              type="button"
              onClick={() => {
                onOpenQuickRfq();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-slate-100 text-slate-800 font-bold text-sm hover:bg-slate-200"
            >
              <FileText className="w-4 h-4 text-red-600" />
              <span>{isNe ? 'तत्काल कोटेशन फारम (RFQ)' : 'Quick RFQ Form'}</span>
            </button>

            <a
              href={`https://wa.me/${COMPANY_DETAILS.whatsappNumber}?text=${encodeURIComponent(isNe ? 'नमस्ते जय नेपाल ट्रेडर्स, म सर्जिकल सामानको अर्डर गर्न चाहन्छु।' : 'Hello Jay Nepal Traders, I need to place an order.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-emerald-600 text-white font-bold text-sm hover:bg-emerald-700"
            >
              <MessageSquare className="w-4 h-4" />
              <span>{isNe ? 'ह्वाट्सएपमार्फत तत्काल अर्डर' : 'Instant WhatsApp Order'}</span>
            </a>

            <div className="flex items-center justify-between text-xs text-slate-500 pt-2 px-1">
              <span>{isNe ? 'हटलाइन:' : 'Hotline:'} {COMPANY_DETAILS.primaryPhone}</span>
              <span className="text-emerald-600 font-medium">✓ DDA Registered</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
