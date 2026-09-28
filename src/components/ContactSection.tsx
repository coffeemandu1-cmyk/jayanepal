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
  const [contactModalType, setContactModalType] = useState<'whatsapp' | 'email' | null>(null);

  const openContactModal = (type: 'whatsapp' | 'email') => {
    setContactModalType(type);
  };

  const closeContactModal = () => {
    setContactModalType(null);
  };

  const getWhatsAppText = () => {
    const subjectLine = form.subject || (isNe ? 'अस्पताल आपूर्ति सोधपुछ' : 'Hospital Supply Inquiry');
    return isNe
      ? `नमस्कार जय नेपाल ट्रेडर्स,\n\nमलाई ${subjectLine} सम्बन्धमा सोधपुछ गर्नु परेको छ। पर्छ।\n\n• नाम: ${form.name || '________________'}\n• अस्पताल/संस्था: ${form.institution || '________________'}\n• फोन: ${form.phone || '________________'}\n• इमेल: ${form.email || '________________'}\n\nसन्देश:\n${form.message || 'कृपया विवरण दिनुहोस्।'}`
      : `Hello Jay Nepal Traders,\n\nI would like to enquire about: ${subjectLine}.\n\n• Name: ${form.name || '________________'}\n• Hospital/Facility: ${form.institution || '________________'}\n• Phone: ${form.phone || '________________'}\n• Email: ${form.email || '________________'}\n\nMessage:\n${form.message || 'Please share your requirements.'}`;
  };

  const getEmailSubject = () => (isNe ? `[कोटेशन अनुरोध] ${form.subject || 'अस्पताल आपूर्ति'} - ${form.name || 'नयाँ ग्राहक'}` : `[Quotation Request] ${form.subject || 'Hospital Supplies'} - ${form.name || 'New Client'}`);

  const getEmailBody = () => {
    const subjectLine = form.subject || (isNe ? 'अस्पताल आपूर्ति' : 'Hospital Supplies');
    return isNe
      ? `आदरणीय जय नेपाल ट्रेडर्स टीम,\n\nम निम्न विषयमा कोटेशन अनुरोध गर्न चाहन्छु:\n\nविषय: ${subjectLine}\nनाम: ${form.name || '________________'}\nअस्पताल/संस्था: ${form.institution || '________________'}\nफोन: ${form.phone || '________________'}\nइमेल: ${form.email || '________________'}\n\nसन्देश:\n${form.message || 'कृपया गरि उपलब्धता र कोटेशन पठाउनुहोस्।'}`
      : `Dear Jay Nepal Traders Team,\n\nI would like to request a quotation for the following requirement:\n\nSubject: ${subjectLine}\nName: ${form.name || '________________'}\nHospital/Facility: ${form.institution || '________________'}\nPhone: ${form.phone || '________________'}\nEmail: ${form.email || '________________'}\n\nMessage:\n${form.message || 'Please share stock availability and pricing details.'}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = getWhatsAppText();

    window.open(`https://wa.me/${COMPANY_DETAILS.whatsappNumber}?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
    setSubmitted(true);
    closeContactModal();
    setTimeout(() => setSubmitted(false), 5000);
  };

  const handleEmailSubmit = () => {
    const subjectText = getEmailSubject();
    const bodyText = getEmailBody();
    window.open(`mailto:${COMPANY_DETAILS.email}?subject=${encodeURIComponent(subjectText)}&body=${encodeURIComponent(bodyText)}`, '_blank', 'noopener,noreferrer');
    closeContactModal();
  };

  const handleWhatsAppSend = () => {
    const text = getWhatsAppText();
    window.open(`https://wa.me/${COMPANY_DETAILS.whatsappNumber}?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
    setSubmitted(true);
    closeContactModal();
    setTimeout(() => setSubmitted(false), 5000);
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
              ? 'काठमाडौंको शोरुममा प्रत्यक्ष आई सामान हेर्न सकिनेछ अथवा फोन, ह्वाट्सएप वा इमेलमार्फत अर्डर दिन सकिनेछ।'
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
                    (काठमाडौं-२९, काठमाडौं)
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
                <button
                  type="button"
                  onClick={() => openContactModal('whatsapp')}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>{isNe ? 'सिधै ह्वाट्सएपमा कुरा गर्नुहोस्' : 'Direct WhatsApp Chat'}</span>
                </button>
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
                <span>{isNe ? 'पुतलीसडक, काठमाडौं' : 'Putalisadak, Kathmandu'}</span>
                <a
                  href="https://maps.google.com/?q=Putalisadak+Kathmandu"
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
                    type="button"
                    onClick={() => openContactModal('whatsapp')}
                    className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-colors"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>{isNe ? 'ह्वाट्सएपमा सोधपुछ पठाउनुहोस्' : 'Send via WhatsApp'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => openContactModal('email')}
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

        {contactModalType && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/65 p-4 backdrop-blur-sm">
            <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl border border-slate-200 overflow-hidden">
              <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-5 py-4">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.18em] text-slate-500 font-bold">
                    {isNe ? 'सन्देश चयन' : 'Send Method'}
                  </p>
                  <h3 className="text-lg font-extrabold text-slate-900 mt-1">
                    {isNe ? 'इमेल वा ह्वाट्सएपमा पठाउनुहोस्' : 'Send your inquiry'}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={closeContactModal}
                  className="rounded-lg p-2 text-slate-400 hover:bg-slate-200 hover:text-slate-700 transition-colors"
                  aria-label="Close modal"
                >
                  ✕
                </button>
              </div>

              <div className="p-5 space-y-3">
                <p className="text-sm text-slate-600">
                  {isNe
                    ? 'तपाईंले भर्नुभएको विवरणलाई नयाँ सन्देशमा पठाउन सक्नुहुन्छ।'
                    : 'Use the form details to send your request through your preferred channel.'}
                </p>

                <button
                  type="button"
                  onClick={handleWhatsAppSend}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 text-xs font-bold text-white hover:bg-emerald-700 transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>{isNe ? 'ह्वाट्सएपमा पठाउनुहोस्' : 'Send via WhatsApp'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleEmailSubmit}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-xs font-bold text-white hover:bg-blue-700 transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  <span>{isNe ? 'इमेलमा पठाउनुहोस्' : 'Send via Email'}</span>
                </button>

                <button
                  type="button"
                  onClick={closeContactModal}
                  className="flex w-full items-center justify-center rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors"
                >
                  {isNe ? 'रद्द गर्नुहोस्' : 'Cancel'}
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
