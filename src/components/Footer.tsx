import React from 'react';
import { 
  ShieldCheck, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  MessageSquare, 
  Heart,
  ChevronRight,
  Award
} from 'lucide-react';
import { JayNepalLogo } from './JayNepalLogo';
import { COMPANY_DETAILS, CATEGORIES } from '../data/products';
import { Language } from '../types';

interface FooterProps {
  language: Language;
  onNavigate: (sectionId: string) => void;
  onOpenQuickRfq: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  language,
  onNavigate,
  onOpenQuickRfq,
}) => {
  const isNe = language === 'ne';

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800/80">
          
          {/* Brand & Mission Column */}
          <div className="lg:col-span-4 space-y-4">
            <JayNepalLogo size="md" textColor="text-white" />
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm pt-2">
              {isNe
                ? 'जय नेपाल ट्रेडर्स - नेपालका सरकारी तथा निजी अस्पताल, नर्सिङ होम र डायग्नोस्टिक ल्याबहरूका लागि उच्चस्तरीय सर्जिकल औजार, अपरेसन थिएटर उपकरण र मेडिकल कन्ज्युमेबल्सको भरपर्दो आपूर्तिकर्ता।'
                : 'Jay Nepal Traders is a dedicated healthcare equipment supplier delivering precision surgical tools, critical care ICU infrastructure, and sterile medical consumables across Nepal.'}
            </p>

            {/* Certifications Badge Row */}
            <div className="pt-2 flex flex-wrap gap-2">
              <div className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-[11px] font-bold text-slate-300 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-red-500" />
                <span>{COMPANY_DETAILS.ddaReg}</span>
              </div>
              <div className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-[11px] font-bold text-slate-300 flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-blue-500" />
                <span>{COMPANY_DETAILS.panVat}</span>
              </div>
            </div>
          </div>

          {/* Quick Categories */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              {isNe ? 'प्रमुख उत्पादन वर्ग' : 'Product Categories'}
            </h4>
            <ul className="space-y-2 text-xs">
              {CATEGORIES.slice(1).map((cat) => (
                <li key={cat.id}>
                  <button
                    type="button"
                    onClick={() => onNavigate('catalog')}
                    className="hover:text-red-400 transition-colors flex items-center gap-1 text-slate-400"
                  >
                    <ChevronRight className="w-3 h-3 text-slate-600" />
                    <span>{isNe ? cat.nameNe : cat.nameEn}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Hospital Solutions */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              {isNe ? 'अस्पताल सेवाहरू' : 'Hospital Solutions'}
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button type="button" onClick={() => onNavigate('services')} className="hover:text-white">
                  {isNe ? 'मोडुलर ओटी सेटअप' : 'Modular OT Design'}
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onNavigate('services')} className="hover:text-white">
                  {isNe ? 'आइसियू पूर्वाधार' : 'ICU Infrastructure'}
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onNavigate('services')} className="hover:text-white">
                  {isNe ? 'बायोमेडिकल क्यालिब्रेसन' : 'Biomedical AMC'}
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onNavigate('why-us')} className="hover:text-white">
                  {isNe ? 'थोक टेन्डर आपूर्ति' : 'Institutional Tender'}
                </button>
              </li>
              <li>
                <button type="button" onClick={onOpenQuickRfq} className="text-red-400 font-bold hover:underline">
                  {isNe ? 'कोटेशन अनुरोध (RFQ)' : 'Request RFQ'}
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details Column */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              {isNe ? 'सम्पर्क तथा शोरुम' : 'Contact & Support'}
            </h4>
            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <span>{isNe ? COMPANY_DETAILS.addressNe : COMPANY_DETAILS.addressEn}</span>
              </div>
              <div className="flex items-start gap-2 font-english">
                <Phone className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                <div className="flex flex-col">
                  <a href={`tel:${COMPANY_DETAILS.primaryPhone}`} className="hover:text-white font-semibold text-slate-200">
                    {COMPANY_DETAILS.primaryPhone}
                  </a>
                  <span className="text-[11px] text-slate-500">{COMPANY_DETAILS.secondaryPhone}</span>
                </div>
              </div>
              <div className="flex items-start gap-2 font-english">
                <Mail className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <a href={`mailto:${COMPANY_DETAILS.email}`} className="hover:text-white text-slate-300">
                  {COMPANY_DETAILS.email}
                </a>
              </div>
              <div className="pt-1">
                <a
                  href={`https://wa.me/${COMPANY_DETAILS.whatsappNumber}?text=${encodeURIComponent('नमस्ते जय नेपाल ट्रेडर्स, म सम्पर्क गर्न चाहन्छु।')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold hover:bg-emerald-600/30 transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>{isNe ? 'WhatsApp हटलाइन' : 'WhatsApp Support'}</span>
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Compliance Notice */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © {new Date().getFullYear()} जय नेपाल ट्रेडर्स (Jay Nepal Traders). सर्वाधिकार सुरक्षित।
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>{isNe ? 'नेपाल औषधि व्यवस्था विभाग मान्यता प्राप्त' : 'DDA Nepal Compliant'}</span>
            <span>•</span>
            <span>{isNe ? 'भ्याट बिल अनिवार्य' : 'Tax Invoiced'}</span>
            <span>•</span>
            <span>{isNe ? 'काठमाडौं, नेपाल' : 'Kathmandu, Nepal'}</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
