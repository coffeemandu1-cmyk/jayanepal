import React from 'react';
import { 
  ShieldAlert, 
  HeartPulse, 
  Wrench, 
  Truck, 
  CheckCircle, 
  ArrowRight, 
  MessageSquare,
  Sparkles
} from 'lucide-react';
import { HOSPITAL_SERVICES, COMPANY_DETAILS } from '../data/products';
import { Language } from '../types';

interface HospitalServicesProps {
  language: Language;
  onOpenQuickRfq: () => void;
}

export const HospitalServices: React.FC<HospitalServicesProps> = ({
  language,
  onOpenQuickRfq,
}) => {
  const isNe = language === 'ne';

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'ShieldAlert':
        return <ShieldAlert className="w-6 h-6 text-red-600" />;
      case 'HeartPulse':
        return <HeartPulse className="w-6 h-6 text-blue-600" />;
      case 'Wrench':
        return <Wrench className="w-6 h-6 text-amber-600" />;
      case 'Truck':
        return <Truck className="w-6 h-6 text-emerald-600" />;
      default:
        return <Sparkles className="w-6 h-6 text-red-600" />;
    }
  };

  return (
    <section id="services" className="py-16 sm:py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold tracking-wide uppercase mb-3 border border-blue-100">
            <span>{isNe ? 'अस्पताल पूर्वाधार तथा सेवाहरू' : 'Hospital Turnkey Solutions'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            {isNe ? 'अपरेसन थिएटर देखि आइसियू सम्मका पूर्ण समाधान' : 'From Modular OT Design to ICU & Biomedical Support'}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            {isNe
              ? 'सामान आपूर्ति मात्र नभई अस्पतालको सुरुवाती इन्जिनियरिङ, मेडिकल ग्यास पाइपलाइन, जडान र वार्षिक मर्मत सम्भार (AMC) समेत हामी गर्दछौं।'
              : 'Complete hospital engineering services, laminar airflow cleanrooms, equipment commissioning, and preventive maintenance across Nepal.'}
          </p>
        </div>

        {/* 4 Cards Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {HOSPITAL_SERVICES.map((srv) => (
            <div
              key={srv.id}
              className="bg-slate-50/70 hover:bg-slate-50 rounded-2xl p-7 border border-slate-200 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-white shadow-xs border border-slate-200 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  {getServiceIcon(srv.icon)}
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">
                  {isNe ? srv.titleNe : srv.titleEn}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-5">
                  {isNe ? srv.descNe : srv.descEn}
                </p>

                {/* Bullet Points */}
                <div className="space-y-2 border-t border-slate-200/80 pt-4 mb-6">
                  {(isNe ? srv.pointsNe : srv.pointsEn).map((pt, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                      <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Service Action Button */}
              <div className="flex items-center gap-3 pt-3 border-t border-slate-200/80">
                <button
                  type="button"
                  onClick={onOpenQuickRfq}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-red-600 hover:text-red-700"
                >
                  <span>{isNe ? 'यस सेवाको परामर्श लिनुहोस्' : 'Consult for this Service'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <a
                  href={`https://wa.me/${COMPANY_DETAILS.whatsappNumber}?text=${encodeURIComponent(isNe ? `नमस्ते, मलाई ${srv.titleNe} बारे थप जानकारी चाहिएको छ।` : `Hello, I would like to consult about ${srv.titleEn}.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-auto inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 hover:text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200"
                >
                  <MessageSquare className="w-3 h-3" />
                  <span>{isNe ? 'ह्वाट्सएप परामर्श' : 'WhatsApp'}</span>
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
