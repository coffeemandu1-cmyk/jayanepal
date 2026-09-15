import React from 'react';
import { 
  ShieldCheck, 
  Truck, 
  BadgePercent, 
  Wrench, 
  Clock4, 
  FileCheck2, 
  Hospital, 
  Sparkles 
} from 'lucide-react';
import { Language } from '../types';
import { COMPANY_DETAILS } from '../data/products';

interface WhyChooseUsProps {
  language: Language;
}

export const WhyChooseUs: React.FC<WhyChooseUsProps> = ({ language }) => {
  const isNe = language === 'ne';

  const pillars = [
    {
      icon: <FileCheck2 className="w-6 h-6 text-red-600" />,
      titleNe: 'DDA नेपाल तथा ISO प्रमाणीकरण',
      titleEn: 'DDA Registered & ISO 13485',
      descNe: 'हाम्रा सबै सर्जिकल उपकरण र औषधिजन्य सामानहरू नेपाल औषधि व्यवस्था विभाग (DDA) मा विधिवत दर्ता तथा अन्तर्राष्ट्रिय गुणस्तर प्रमाणित छन्।',
      descEn: 'All products comply with the Department of Drug Administration (DDA Nepal) and international medical device ISO 13485 safety protocols.',
    },
    {
      icon: <Truck className="w-6 h-6 text-blue-600" />,
      titleNe: 'नेपालभर द्रुत तथा सुरक्षित आपूर्ति',
      titleEn: 'Express Delivery Across 77 Districts',
      descNe: 'काठमाडौं उपत्यकाभित्र ४ घण्टामा र उपत्यकाबाहिरका जुनसुकै जिल्ला वा प्रदेशका अस्पतालहरूमा २४ देखि ४८ घण्टाभित्र भरपर्दो डेलिभरी।',
      descEn: 'Priority 4-hour local dispatch in Kathmandu Valley and express cargo delivery within 24-48 hours to any hospital across Nepal.',
    },
    {
      icon: <BadgePercent className="w-6 h-6 text-emerald-600" />,
      titleNe: 'पारदर्शी अस्पताल दररेट र भ्याट बिल',
      titleEn: 'Institutional Pricing & 100% Tax Invoices',
      descNe: 'अस्पताल, नर्सिङ होम र मेडिकल कलेजहरूका लागि विशेष थोक छुट, आधिकारिक भ्याट बिल र स्पष्ट भुक्तानी सुविधा।',
      descEn: 'Special institutional procurement discounts, official VAT tax invoicing, and flexible credit payment terms for hospitals.',
    },
    {
      icon: <Wrench className="w-6 h-6 text-amber-600" />,
      titleNe: 'बायोमेडिकल इन्जिनियरिङ र वारेन्टी',
      titleEn: 'Biomedical Support & Official Warranty',
      descNe: 'बिक्री पछिको नियमित मर्मत, क्यालिब्रेसन, स्पेयर पार्टसको प्रत्याभूति र तालिमप्राप्त इन्जिनियरहरूबाट चौबीसै घण्टा प्राविधिक सेवा।',
      descEn: 'Dedicated post-sales support with factory trained biomedical engineers, equipment calibration, and genuine spare parts availability.',
    },
  ];

  return (
    <section id="why-us" className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-red-100 text-red-700 text-xs font-bold tracking-wide uppercase mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{isNe ? 'गुणस्तर र विश्वसनीयता' : 'Commitment to Quality'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            {isNe ? 'अस्पतालहरूले जय नेपाल ट्रेडर्स नै किन रोज्छन्?' : 'Why Healthcare Institutions Trust Jay Nepal Traders'}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            {isNe
              ? 'बिरामीको जीवन रक्षा गर्ने संवेदनशील क्षेत्रमा गुणस्तरमा कुनै सम्झौता हुँदैन। हामी अस्पतालहरूलाई भरपर्दो साझेदारी प्रदान गर्दछौं।'
              : 'In critical medical care, quality and reliability are non-negotiable. We bridge top global surgical manufacturing with Nepal.'}
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:shadow-md transition-shadow flex flex-col"
            >
              <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center mb-4">
                {item.icon}
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">
                {isNe ? item.titleNe : item.titleEn}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {isNe ? item.descNe : item.descEn}
              </p>
            </div>
          ))}
        </div>

        {/* Official Credentials Banner */}
        <div className="mt-10 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800 text-white p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1 text-center md:text-left">
            <div className="text-xs font-bold uppercase tracking-wider text-red-400">
              {isNe ? 'आधिकारिक सरकारी दर्ता र कानुनी विवरण' : 'Verified Business & Tax Accreditation'}
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white">
              {isNe ? 'नेपाल औषधि व्यवस्था विभाग दर्ता नं: १४२/MED/२०७९' : 'DDA Nepal Registered & Verified Healthcare Firm'}
            </h3>
            <p className="text-xs text-slate-300">
              {COMPANY_DETAILS.panVat} • {COMPANY_DETAILS.isoReg} • Kathmandu, Nepal
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href={`tel:${COMPANY_DETAILS.primaryPhone}`}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold border border-slate-700 transition-colors"
            >
              {isNe ? 'तत्काल कल गर्नुहोस्' : 'Call Sales'}
            </a>
            <a
              href={`https://wa.me/${COMPANY_DETAILS.whatsappNumber}?text=${encodeURIComponent('नमस्ते, मलाई दर्ता प्रमाणपत्र तथा भ्याट विवरण आवश्यक परेको छ।')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors"
            >
              {isNe ? 'कागजात सोधपुछ' : 'Request Documents'}
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
