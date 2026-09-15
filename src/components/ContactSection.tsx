import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  MessageSquare, 
  Send, 
  CheckCircle2, 
  Building2,
  ShieldCheck,
  ExternalLink
} from 'lucide-react';
import { COMPANY_DETAILS } from '../data/products';
import { Language } from '../types';

interface ContactSectionProps {
  language: Language;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ language }) => {
  const isNe = language === 'ne';

  const [form, setForm] = useState({
    name: '',
    institution: '',
    phone: '',
    email: '',
    subject: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = isNe
      ? `नमस्कार जय नेपाल ट्रेडर्स,\nसम्पर्क फारममार्फत नयाँ सोधपुछ:\n\nनाम: ${form.name}\nसंस्था: ${form.institution || 'व्यक्तिगत'}\nफोन: ${form.phone}\nविषय: ${form.subject}\nसन्देश: ${form.message}`
      : `Hello Jay Nepal Traders,\nNew contact inquiry:\n\nName: ${form.name}\nFacility: ${form.institution || 'Individual'}\nPhone: ${form.phone}\nSubject: ${form.subject}\nMessage: ${form.message}`;

    window.open(`https://wa.me/${COMPANY_DETAILS.whatsappNumber}?text=${encodeURIComponent(text)}`, '_blank');
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  const handleEmailSubmit = () => {
    const subjectText = `[सोधपुछ] ${form.subject || 'अस्पताल आपूर्ति'} - ${form.name}`;
    const bodyText = `नाम: ${form.name}\nसंस्था: ${form.institution}\nफोन: ${form.phone}\nइमेल: ${form.email}\n\nसन्देश:\n${form.message}`;
    window.location.href = `mailto:${COMPANY_DETAILS.email}?subject=${encodeURIComponent(subjectText)}&body=${encodeURIComponent(bodyText)}`;
  };

  return (
    <section id="contact" className="py-16 sm:py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-red-100 text-red-700 text-xs font-bold tracking-wide uppercase mb-3">
            <Mail className="w-3.5 h-3.5" />
            <span>{isNe ? 'सम्पर्क तथा सोधपुछ' : 'Contact & Procurement'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            {isNe ? 'हाम्रो कार्यालय तथा शोरुममा सम्पर्क गर्नुहोस्' : 'Connect with Our Medical Equipment Specialists'}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            {isNe
              ? 'काठमाडौंको त्रिपुरेश्वरस्थित शोरुममा प्रत्यक्ष आई सामान हेर्न सकिनेछ अथवा फोन, ह्वाट्सएप वा इमेलमार्फत अर्डर दिन सकिनेछ।'
              : 'Visit our medical showroom in Tripureshwor, Kathmandu, or connect via direct hotline, WhatsApp, or email.'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Direct Info Cards & Map */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Contact Details Card */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-5">
              <h3 className="text-lg font-bold text-slate-900 pb-3 border-b border-slate-100 flex items-center justify-between">
                <span>{isNe ? 'आधिकारिक सम्पर्क विवरण' : 'Official Details'}</span>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                  {isNe ? 'सक्रिय' : 'Open'}
                </span>
              </h3>

              {/* Address */}
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-red-50 text-red-600 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    {isNe ? 'कार्यालय तथा गोदाम ठेगाना' : 'Office & Warehouse'}
                  </div>
                  <div className="text-sm font-bold text-slate-800 mt-0.5">
                    {isNe ? COMPANY_DETAILS.addressNe : COMPANY_DETAILS.addressEn}
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">
                    (हस्पिटल इक्विपमेन्ट जोन, त्रिपुरेश्वर, काठमाडौं)
                  </div>
                </div>
              </div>

              {/* Phones */}
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600 shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    {isNe ? 'फोन तथा आपतकालीन हटलाइन' : 'Hotlines'}
                  </div>
                  <div className="flex flex-col gap-1 mt-1">
                    <a
                      href={`tel:${COMPANY_DETAILS.primaryPhone}`}
                      className="text-sm font-bold text-slate-900 hover:text-red-600 font-english"
                    >
                      {COMPANY_DETAILS.primaryPhone} (मोबाइल / WhatsApp)
                    </a>
                    <a
                      href={`tel:${COMPANY_DETAILS.secondaryPhone}`}
                      className="text-sm text-slate-700 hover:text-red-600 font-english"
                    >
                      {COMPANY_DETAILS.secondaryPhone} (ल्याण्डलाइन)
                    </a>
                  </div>
                </div>
              </div>

              {/* Emails */}
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-purple-50 text-purple-600 shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    {isNe ? 'कोटेशन तथा अर्डर इमेल' : 'Email Quotes'}
                  </div>
                  <div className="flex flex-col gap-1 mt-1">
                    <a
                      href={`mailto:${COMPANY_DETAILS.email}`}
                      className="text-sm font-bold text-slate-900 hover:text-red-600 font-english"
                    >
                      {COMPANY_DETAILS.email}
                    </a>
                    <a
                      href={`mailto:${COMPANY_DETAILS.orderEmail}`}
                      className="text-xs text-slate-600 hover:text-red-600 font-english"
                    >
                      {COMPANY_DETAILS.orderEmail}
                    </a>
                  </div>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-amber-50 text-amber-600 shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    {isNe ? 'खुल्ने समय' : 'Business Hours'}
                  </div>
                  <div className="text-xs text-slate-800 font-medium mt-0.5">
                    {isNe ? COMPANY_DETAILS.hoursNe : COMPANY_DETAILS.hoursEn}
                  </div>
                </div>
              </div>

              {/* Instant WhatsApp Quick Button */}
              <div className="pt-2 border-t border-slate-100">
                <a
                  href={`https://wa.me/${COMPANY_DETAILS.whatsappNumber}?text=${encodeURIComponent('नमस्ते जय नेपाल ट्रेडर्स, म सम्पर्क गर्न चाहन्छु।')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>{isNe ? 'सिधै ह्वाट्सएपमा कुरा गर्नुहोस्' : 'Direct WhatsApp Chat'}</span>
                </a>
              </div>
            </div>

            {/* Google Map Representation Card */}
            <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs overflow-hidden">
              <div className="rounded-xl overflow-hidden relative aspect-video bg-slate-100 border border-slate-200">
                {/* Embedded OSM / Google Map iframe for Kathmandu Tripureshwor */}
                <iframe
                  title="Jay Nepal Traders Kathmandu Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14131.066465814045!2d85.30872685!3d27.6935292!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19b027c73dbb%3A0xc304ff2b9c71887e!2sTripureshwor%2C%20Kathmandu!5e0!3m2!1sen!2snp!4v1700000000000!5m2!1sen!2snp"
                  className="w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <div className="flex items-center justify-between text-xs text-slate-600 pt-2 px-1">
                <span>{isNe ? 'त्रिपुरेश्वर, काठमाडौं (हस्पिटल रोड नजिक)' : 'Tripureshwor, Kathmandu'}</span>
                <a
                  href="https://maps.google.com/?q=Tripureshwor+Kathmandu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-red-600 font-bold hover:underline flex items-center gap-1"
                >
                  <span>Google Maps मा हेर्नुहोस्</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Inquiry Message Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs">
              <h3 className="text-xl font-extrabold text-slate-900 mb-1">
                {isNe ? 'अनलाइन सोधपुछ तथा दररेट फारम' : 'Online Procurement Inquiry Form'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mb-6">
                {isNe
                  ? 'कुनै पनि सामान वा अस्पताल सेटअप सम्बन्धी सोधपुछका लागि फारम भर्नुहोस्। ह्वाट्सएप वा इमेलमार्फत तुरुन्तै जवाफ दिइनेछ।'
                  : 'Submit your requirements below. Receive an institutional price quotation within minutes.'}
              </p>

              {submitted && (
                <div className="p-4 mb-6 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs font-bold flex items-center gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>{isNe ? 'सोधपुछ सफलतापूर्वक पठाइयो! हामी छिट्टै सम्पर्क गर्नेछौं।' : 'Message generated! Opening messaging window...'}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      {isNe ? 'तपाईंको पूरा नाम *' : 'Full Name *'}
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder={isNe ? 'उदा: डा. सन्तोष श्रेष्ठ' : 'e.g. Dr. Santosh Shrestha'}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      {isNe ? 'अस्पताल / क्लिनिक / संस्थाको नाम' : 'Hospital / Healthcare Center'}
                    </label>
                    <input
                      type="text"
                      value={form.institution}
                      onChange={(e) => setForm({ ...form, institution: e.target.value })}
                      placeholder={isNe ? 'उदा: लाइफकेयर अस्पताल...' : 'e.g. LifeCare Hospital...'}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      {isNe ? 'सम्पर्क फोन / मोबाइल नम्बर *' : 'Phone / Mobile *'}
                    </label>
                    <input
                      type="tel"
                      required
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="98XXXXXXXX"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-red-500 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      {isNe ? 'इमेल ठेगाना' : 'Email Address'}
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="hospital@example.com"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-red-500 font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    {isNe ? 'सोधपुछको विषय *' : 'Subject of Inquiry *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    placeholder={isNe ? 'उदा: ओटी लाइट र क्युटरी मेसिनको दररेट सोधपुछ' : 'e.g. Quotation for OT Lights and ICU Beds'}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    {isNe ? 'विस्तृत सन्देश वा सामानहरूको सूची *' : 'Requirements & Details *'}
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder={isNe ? 'आवश्यक परिमाण, साइज, डेलिभरी मिति वा विशेष माग यहाँ उल्लेख गर्नुहोस्...' : 'Please specify quantities, required delivery timeline, or hospital budget specifications...'}
                    className="w-full p-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                {/* Submit actions: WhatsApp and Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <button
                    type="submit"
                    className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-colors"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>{isNe ? 'ह्वाट्सएपमा सोधपुछ पठाउनुहोस्' : 'Send via WhatsApp'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleEmailSubmit}
                    className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                    <span>{isNe ? 'इमेलमार्फत कोटेशन पठाउनुहोस्' : 'Send via Email'}</span>
                  </button>
                </div>

              </form>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
