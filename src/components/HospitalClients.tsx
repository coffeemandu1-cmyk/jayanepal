import React from 'react';
import { Building2, CheckCircle2, ShieldCheck, Star } from 'lucide-react';
import { TRUSTED_HOSPITALS } from '../data/products';
import { Language } from '../types';

interface HospitalClientsProps {
  language: Language;
}

export const HospitalClients: React.FC<HospitalClientsProps> = ({ language }) => {
  const isNe = language === 'ne';

  return (
    <section id="clients" className="py-16 sm:py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold tracking-wide uppercase mb-3">
            <Building2 className="w-3.5 h-3.5 text-blue-600" />
            <span>{isNe ? 'स्वास्थ्य संस्था साझेदारी' : 'Hospital Collaborations'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            {isNe ? 'हाम्रा सेवा र सामानमा विश्वस्त अस्पतालहरू' : 'Trusted by Leading Hospitals Across Nepal'}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            {isNe
              ? 'नेपालका प्रमुख सरकारी, शिक्षण, प्रादेशिक र प्रतिष्ठित निजी अस्पतालहरूमा हाम्रो निरन्तर आपूर्ति जारी छ।'
              : 'Serving national teaching institutes, provincial healthcare hubs, and leading private tertiary care centers.'}
          </p>
        </div>

        {/* Hospital Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {TRUSTED_HOSPITALS.map((hosp, idx) => (
            <div
              key={idx}
              className="p-4 sm:p-5 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-red-200 hover:shadow-md transition-all flex items-center gap-3.5"
            >
              <div className="w-11 h-11 rounded-xl bg-white border border-slate-200 shadow-xs flex items-center justify-center text-red-600 shrink-0">
                <Building2 className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <h4 className="text-sm font-bold text-slate-900 truncate">
                  {hosp.name}
                </h4>
                <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-0.5">
                  <span className="font-medium text-slate-600">{hosp.location}</span>
                  <span>•</span>
                  <span className="text-[11px] text-slate-400 truncate">{hosp.type}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Testimonial Quote Banner */}
        <div className="mt-12 bg-slate-900 rounded-3xl p-6 sm:p-10 text-white relative overflow-hidden">
          <div className="relative z-10 max-w-3xl mx-auto text-center space-y-4">
            <div className="flex justify-center gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <p className="text-base sm:text-lg italic text-slate-200 leading-relaxed">
              {isNe
                ? '“जय नेपाल ट्रेडर्सबाट हामीले नियमित रूपमा सर्जिकल इन्स्ट्रुमेन्ट्स र आइसियूका आवश्यक सामान खरिद गर्दै आएका छौं। सामानको गुणस्तर, समयमै डेलिभरी र तुरुन्त प्राविधिक सहयोगका कारण हाम्रो विश्वास जितेको छ।”'
                : '“Jay Nepal Traders has been a highly reliable partner for our surgical instrument sets and OT consumables. Their responsiveness, genuine product certifications, and quick emergency dispatch make them stand out in Nepal.”'}
            </p>
            <div className="pt-2">
              <div className="text-sm font-bold text-white">
                {isNe ? 'वरिष्ठ शल्यचिकित्सक तथा खरिद समिति' : 'Senior Consultant Surgeon & Procurement Team'}
              </div>
              <div className="text-xs text-slate-400">
                {isNe ? 'काठमाडौं, नेपाल' : 'Kathmandu, Nepal'}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
