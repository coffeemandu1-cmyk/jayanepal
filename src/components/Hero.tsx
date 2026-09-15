import React from 'react';
import { 
  ShieldCheck, 
  Truck, 
  Award, 
  MessageSquare, 
  Mail, 
  PhoneCall, 
  ChevronRight, 
  Activity, 
  Sparkles,
  HeartPulse,
  CheckCircle,
  FileSpreadsheet
} from 'lucide-react';
import { COMPANY_DETAILS } from '../data/products';
import { Language } from '../types';

interface HeroProps {
  language: Language;
  onExploreCatalog: () => void;
  onOpenQuickRfq: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  language,
  onExploreCatalog,
  onOpenQuickRfq
}) => {
  const isNe = language === 'ne';

  return (
    <section id="hero" className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 text-white pt-10 pb-20 lg:pt-16 lg:pb-28">
      {/* Background Decorative Pattern */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
      
      {/* Subtle Glow Spheres */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-red-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -right-32 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Trust Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800/90 border border-slate-700 text-xs font-semibold text-slate-200 backdrop-blur-md">
              <span className="flex h-2 w-2 rounded-full bg-red-500 animate-pulse" />
              <span>{isNe ? 'नेपाल औषधि व्यवस्था विभाग (DDA) प्रमाणित आपूर्तिकर्ता' : 'DDA Nepal Registered & ISO 13485 Partner'}</span>
              <span className="text-slate-500">|</span>
              <span className="text-emerald-400 font-bold">{COMPANY_DETAILS.panVat}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white">
              {isNe ? (
                <>
                  नेपालभरका अस्पतालका लागि <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-rose-300 to-blue-400">
                    भरपर्दो सर्जिकल तथा मेडिकल उपकरण
                  </span> आपूर्तिकर्ता
                </>
              ) : (
                <>
                  Empowering Healthcare in Nepal with <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-rose-300 to-blue-400">
                    Precision Surgical & Hospital Equipment
                  </span>
                </>
              )}
            </h1>

            {/* Sub-description */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              {isNe ? (
                <>
                  <strong className="text-white">जय नेपाल ट्रेडर्स</strong> - सरकारी तथा निजी अस्पताल, नर्सिङ होम, क्लिनिक र ल्याबहरूका लागि आवश्यक जर्मन-ग्रेड सर्जिकल औजार, ५-फङ्सन आइसियू बेड, ओटी लाइट, डिस्पोजेबल कन्ज्युमेबल्स र बायोमेडिकल उपकरणहरूको आधिकारिक विक्रेता।
                </>
              ) : (
                <>
                  <strong className="text-white">Jay Nepal Traders</strong> is a premier healthcare procurement partner supplying German-grade surgical instruments, ICU beds, shadowless OT lights, diagnostics, and sterile medical consumables across all 7 Provinces of Nepal.
                </>
              )}
            </p>

            {/* Call to Actions */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              {/* WhatsApp Instant Order Button */}
              <a
                href={`https://wa.me/${COMPANY_DETAILS.whatsappNumber}?text=${encodeURIComponent(isNe ? 'नमस्ते जय नेपाल ट्रेडर्स, मलाई अस्पतालका लागि सर्जिकल सामानको अर्डर र दररेट चाहियो।' : 'Hello Jay Nepal Traders, I need to place an order and get price quotes for hospital supplies.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm sm:text-base shadow-lg shadow-emerald-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <MessageSquare className="w-5 h-5" />
                <span>{isNe ? 'ह्वाट्सएपमार्फत तत्काल अर्डर' : 'Instant WhatsApp Order'}</span>
              </a>

              {/* Quick RFQ Quote Modal Button */}
              <button
                type="button"
                onClick={onOpenQuickRfq}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm sm:text-base shadow-lg shadow-red-600/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <Mail className="w-5 h-5" />
                <span>{isNe ? 'इमेल कोटेशन अनुरोध (RFQ)' : 'Request Quote by Email'}</span>
              </button>

              {/* Browse Catalog Button */}
              <button
                type="button"
                onClick={onExploreCatalog}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 hover:text-white font-semibold text-sm sm:text-base border border-slate-700 transition-colors"
              >
                <span>{isNe ? 'क्याटलग हेर्नुहोस्' : 'Explore Catalog'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Feature Highlights Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-slate-800 text-slate-300">
              <div className="flex items-start gap-2">
                <ShieldCheck className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-white">{isNe ? 'DDA प्रमाणित' : 'DDA Approved'}</div>
                  <div className="text-[11px] text-slate-400">{isNe ? '१००% सक्कली ब्रान्ड' : '100% Genuine'}</div>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Truck className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-white">{isNe ? 'देशभर डेलिभरी' : 'Nepal Delivery'}</div>
                  <div className="text-[11px] text-slate-400">{isNe ? '७७ वटै जिल्लामा' : 'All 77 Districts'}</div>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Award className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-white">{isNe ? 'अस्पताल दररेट' : 'Hospital Rates'}</div>
                  <div className="text-[11px] text-slate-400">{isNe ? 'थोक मूल्य छुट' : 'Institutional Discount'}</div>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Activity className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-white">{isNe ? 'बायोमेडिकल सेवा' : 'Tech Support'}</div>
                  <div className="text-[11px] text-slate-400">{isNe ? 'इन्स्टलेसन र वारेन्टी' : 'Warranty & AMC'}</div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Hero Visual Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Card with Medical Backdrop */}
              <div className="relative rounded-2xl overflow-hidden bg-slate-800/90 border border-slate-700 shadow-2xl backdrop-blur-xl p-3">
                <div className="relative h-64 sm:h-72 rounded-xl overflow-hidden group">
                  <img
                    src="https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=1000&q=80"
                    alt="Operation Theatre & Surgical Equipment"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent" />
                  
                  {/* Badge on Image */}
                  <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded-full border border-slate-700 flex items-center gap-1.5 text-xs text-white">
                    <HeartPulse className="w-3.5 h-3.5 text-red-400" />
                    <span>{isNe ? 'अस्पताल सर्जिकल तथा आइसियू सेटअप' : 'Hospital OT & ICU Turnkey Setup'}</span>
                  </div>

                  {/* Caption */}
                  <div className="absolute bottom-3 left-3 right-3 text-left">
                    <div className="text-xs font-semibold text-emerald-400 flex items-center gap-1">
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>{isNe ? 'नेपालका ५००+ अस्पतालहरूको भरोसा' : 'Supplying to 500+ Healthcare Centers'}</span>
                    </div>
                    <div className="text-sm font-bold text-white mt-0.5">
                      {isNe ? 'जर्मन प्रविधि सर्जिकल औजार र अस्पताल फर्निचर' : 'Precision Surgical Steel & Medical Electronics'}
                    </div>
                  </div>
                </div>

                {/* Floating Micro Highlights inside Card */}
                <div className="grid grid-cols-2 gap-2 mt-3 pt-1">
                  <div className="bg-slate-900/90 rounded-lg p-3 border border-slate-700/80">
                    <div className="text-xl sm:text-2xl font-extrabold text-red-400 font-english">1,200+</div>
                    <div className="text-[11px] text-slate-300 font-medium">
                      {isNe ? 'सर्जिकल औजार र सामग्रीहरू' : 'Medical & Surgical SKUs'}
                    </div>
                  </div>

                  <div className="bg-slate-900/90 rounded-lg p-3 border border-slate-700/80">
                    <div className="text-xl sm:text-2xl font-extrabold text-blue-400 font-english">२४/७</div>
                    <div className="text-[11px] text-slate-300 font-medium">
                      {isNe ? 'आकस्मिक अस्पताल आपूर्ति' : 'Emergency Hospital Dispatch'}
                    </div>
                  </div>
                </div>

                {/* Direct Hotline strip */}
                <div className="mt-3 p-2.5 rounded-lg bg-red-950/40 border border-red-800/40 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-full bg-red-600/30 text-red-400">
                      <PhoneCall className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-300 uppercase tracking-wider">{isNe ? 'तत्काल सोधपुछ हटलाइन' : 'Direct Inquiry Line'}</div>
                      <a href={`tel:${COMPANY_DETAILS.primaryPhone}`} className="text-xs sm:text-sm font-bold text-white hover:text-red-300 font-english">
                        {COMPANY_DETAILS.primaryPhone}
                      </a>
                    </div>
                  </div>

                  <a
                    href={`https://wa.me/${COMPANY_DETAILS.whatsappNumber}?text=${encodeURIComponent('नमस्ते जय नेपाल ट्रेडर्स, मलाई तुरुन्त सामान चाहियो।')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-md bg-emerald-600 hover:bg-emerald-700 text-[11px] font-bold text-white transition-colors"
                  >
                    {isNe ? 'च्याट' : 'Chat'}
                  </a>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
