import React, { useState, useEffect } from 'react';
import { 
  X, 
  MessageSquare, 
  Mail, 
  Building2, 
  User, 
  Phone, 
  MapPin, 
  FileText, 
  Zap, 
  Sparkles,
  CheckCircle2,
  Package
} from 'lucide-react';
import { Product, Language } from '../types';
import { COMPANY_DETAILS, PRODUCTS } from '../data/products';

interface QuickOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  initialProduct?: Product | null;
}

export const QuickOrderModal: React.FC<QuickOrderModalProps> = ({
  isOpen,
  onClose,
  language,
  initialProduct = null,
}) => {
  const isNe = language === 'ne';

  const [formData, setFormData] = useState({
    hospitalName: '',
    contactPerson: '',
    phone: '',
    email: '',
    district: 'काठमाडौं (Kathmandu)',
    selectedProductTitle: initialProduct ? `${initialProduct.nameEn} (${initialProduct.sku})` : '',
    customRequirements: '',
    quantity: '1',
    isUrgent: true,
  });

  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (initialProduct) {
      setFormData((prev) => ({
        ...prev,
        selectedProductTitle: `${initialProduct.nameEn} [${initialProduct.sku}]`,
      }));
    }
  }, [initialProduct]);

  if (!isOpen) return null;

  const handleInputChange = (field: string, val: any) => {
    setFormData((prev) => ({ ...prev, [field]: val }));
  };

  const constructWhatsAppMessage = () => {
    const text = isNe
      ? `नमस्कार जय नेपाल ट्रेडर्स,\nहाम्रो अस्पतालका लागि सर्जिकल सामानको तत्काल अर्डर/कोटेशन अनुरोध गरिएको छ:\n\nसामान/आवश्यकता: ${formData.selectedProductTitle || formData.customRequirements || 'सामान्य सर्जिकल सामान'}\nपरिमाण: ${formData.quantity}\nआकस्मिकता: ${formData.isUrgent ? 'तुरुन्त (Urgent 24h)' : 'नियमित (Standard)'}\n\nअस्पताल: ${formData.hospitalName || 'उल्लेख नभएको'}\nसम्पर्क: ${formData.contactPerson || 'उल्लेख नभएको'} (${formData.phone || 'उल्लेख नभएको'})\nजिल्ला/स्थान: ${formData.district}\n${formData.customRequirements ? `थप माग: ${formData.customRequirements}\n` : ''}\nकृपया ताजा दररेट र डेलिभरी पुष्टि गरिदिनुहोला।`
      : `Hello Jay Nepal Traders,\nQuotation / Order request for hospital supplies:\n\nItem/Requirement: ${formData.selectedProductTitle || formData.customRequirements || 'General Surgical'}\nQuantity: ${formData.quantity}\nUrgency: ${formData.isUrgent ? 'Urgent (24h)' : 'Normal'}\n\nHospital: ${formData.hospitalName || 'Not specified'}\nContact: ${formData.contactPerson || 'Not specified'} (${formData.phone || 'Not specified'})\nLocation: ${formData.district}\n${formData.customRequirements ? `Details: ${formData.customRequirements}\n` : ''}\nPlease provide quote and availability.`;

    return `https://wa.me/${COMPANY_DETAILS.whatsappNumber}?text=${encodeURIComponent(text)}`;
  };

  const constructEmailUrl = () => {
    const subject = `[कोटेशन अनुरोध] ${formData.hospitalName || 'अस्पताल'} - ${formData.selectedProductTitle || 'सर्जिकल सामान'} - जय नेपाल ट्रेडर्स`;
    const body = `आदरणीय जय नेपाल ट्रेडर्स,\n\nहामीलाई तल उल्लेखित सर्जिकल तथा मेडिकल उपकरणको आधिकारिक कोटेशन आवश्यक परेको छ:\n\nसामान: ${formData.selectedProductTitle || 'विवरण तल हेर्नुहोस्'}\nपरिमाण: ${formData.quantity}\nथप विवरण / माग: ${formData.customRequirements || 'लागू नभएको'}\n\nअस्पताल / क्लिनिक: ${formData.hospitalName}\nसम्पर्क व्यक्ति: ${formData.contactPerson}\nफोन नम्बर: ${formData.phone}\nइमेल: ${formData.email}\nजिल्ला: ${formData.district}\n\nधन्यवाद।`;

    return `mailto:${COMPANY_DETAILS.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    window.open(constructWhatsAppMessage(), '_blank');
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 2500);
  };

  const handleEmailSubmit = () => {
    window.location.href = constructEmailUrl();
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl max-w-xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200 flex flex-col relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-5 bg-gradient-to-r from-slate-900 to-slate-800 text-white flex items-center justify-between rounded-t-3xl">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-red-600/30 text-red-400">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base sm:text-lg">
                {isNe ? 'तत्काल अर्डर तथा कोटेशन फारम' : 'Instant Order & RFQ Form'}
              </h3>
              <p className="text-xs text-slate-300">
                {isNe ? 'ह्वाट्सएप वा इमेलमार्फत तुरुन्तै आधिकारिक कोटेशन प्राप्त गर्नुहोस्' : 'Instant quotation and hospital procurement dispatch'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleWhatsAppSubmit} className="p-6 space-y-4 text-xs">
          
          {isSuccess && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>{isNe ? 'अनुरोध सफलतापूर्वक तयार भयो! सन्देश पठाइँदैछ...' : 'Inquiry generated successfully! Redirecting...'}</span>
            </div>
          )}

          {/* Hospital Name & Location */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                {isNe ? 'अस्पताल / स्वास्थ्य संस्थाको नाम *' : 'Hospital / Clinic Name *'}
              </label>
              <div className="relative">
                <Building2 className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={formData.hospitalName}
                  onChange={(e) => handleInputChange('hospitalName', e.target.value)}
                  placeholder={isNe ? 'उदा: सिभिल अस्पताल वा निजी क्लिनिक' : 'e.g. Kathmandu Hospital'}
                  className="w-full pl-8 pr-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-red-500 focus:outline-none text-xs"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                {isNe ? 'जिल्ला / ठेगाना *' : 'District / City in Nepal *'}
              </label>
              <div className="relative">
                <MapPin className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={formData.district}
                  onChange={(e) => handleInputChange('district', e.target.value)}
                  placeholder="काठमाडौं, ललितपुर, चितवन, पोखरा..."
                  className="w-full pl-8 pr-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-red-500 focus:outline-none text-xs"
                />
              </div>
            </div>
          </div>

          {/* Contact Person & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                {isNe ? 'सम्पर्क व्यक्ति (नाम / पद) *' : 'Contact Person (Name/Role) *'}
              </label>
              <div className="relative">
                <User className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={formData.contactPerson}
                  onChange={(e) => handleInputChange('contactPerson', e.target.value)}
                  placeholder={isNe ? 'डाक्टर / खरिद प्रबन्धक' : 'Dr. Sharma / Procurement Officer'}
                  className="w-full pl-8 pr-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-red-500 focus:outline-none text-xs"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                {isNe ? 'सम्पर्क फोन / ह्वाट्सएप नम्बर *' : 'Phone / WhatsApp Number *'}
              </label>
              <div className="relative">
                <Phone className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="98XXXXXXXX"
                  className="w-full pl-8 pr-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-red-500 focus:outline-none text-xs font-mono"
                />
              </div>
            </div>
          </div>

          {/* Selected Product or Custom Requirement */}
          <div>
            <label className="block font-bold text-slate-700 mb-1">
              {isNe ? 'आवश्यक सामान वा उपकरण चयन गर्नुहोस्:' : 'Select Product / Equipment:'}
            </label>
            <select
              value={formData.selectedProductTitle}
              onChange={(e) => handleInputChange('selectedProductTitle', e.target.value)}
              className="w-full p-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-red-500 focus:outline-none text-xs bg-white"
            >
              <option value="">{isNe ? '-- सूचीबाट सामान रोज्नुहोस् वा तल लेख्नुहोस् --' : '-- Choose from catalog or write custom below --'}</option>
              {PRODUCTS.map((prod) => (
                <option key={prod.id} value={`${prod.nameEn} [${prod.sku}]`}>
                  {prod.nameEn} ({prod.nameNe}) - {prod.sku}
                </option>
              ))}
              <option value="custom">{isNe ? 'अन्य / धेरै सामानहरूको एकमुष्ट सूची' : 'Other / Multiple Custom Items'}</option>
            </select>
          </div>

          {/* Custom Description textarea */}
          <div>
            <label className="block font-bold text-slate-700 mb-1">
              {isNe ? 'थप सामानहरूको विवरण वा विशेष माग:' : 'Item Details, Quantities & Specific Requirements:'}
            </label>
            <textarea
              rows={3}
              value={formData.customRequirements}
              onChange={(e) => handleInputChange('customRequirements', e.target.value)}
              placeholder={isNe ? 'उदा: ५ वटा ५-फङ्सन आइसियू बेड, १०० बक्स सर्जिकल ग्लोब्स (साइज ७.०), २ वटा ओटी लाइट...' : 'e.g. 5 units of ICU beds, 100 boxes surgical gloves size 7.0...'}
              className="w-full p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-red-500 focus:outline-none text-xs"
            />
          </div>

          {/* Quantity & Urgency */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-3 rounded-xl bg-slate-50 border border-slate-200">
            <div className="flex items-center gap-2">
              <label className="font-bold text-slate-700">{isNe ? 'परिमाण:' : 'Qty:'}</label>
              <input
                type="text"
                value={formData.quantity}
                onChange={(e) => handleInputChange('quantity', e.target.value)}
                className="w-20 px-2 py-1 bg-white border border-slate-300 rounded-lg text-center font-bold text-xs"
                placeholder="1 Set"
              />
            </div>

            <label className="inline-flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isUrgent}
                onChange={(e) => handleInputChange('isUrgent', e.target.checked)}
                className="rounded text-red-600 focus:ring-red-500"
              />
              <span className="font-bold text-slate-800 flex items-center gap-1">
                <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                <span>{isNe ? 'आपतकालीन प्राथमिकता (२४ घण्टा)' : 'Urgent Dispatch (24h)'}</span>
              </span>
            </label>
          </div>

          {/* Action Buttons: WhatsApp and Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <button
              type="submit"
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all"
            >
              <MessageSquare className="w-4 h-4" />
              <span>{isNe ? 'ह्वाट्सएपमार्फत तुरुन्त पठाउनुहोस्' : 'Send via WhatsApp'}</span>
            </button>

            <button
              type="button"
              onClick={handleEmailSubmit}
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition-all"
            >
              <Mail className="w-4 h-4" />
              <span>{isNe ? 'इमेलमार्फत आधिकारिक कोटेशन माग्नुहोस्' : 'Send RFQ via Email'}</span>
            </button>
          </div>

          <p className="text-[11px] text-center text-slate-400">
            {isNe ? 'हाम्रा प्रतिनिधिले १० मिनेटभित्र अस्पताल दररेट सहित सम्पर्क गर्नुहुनेछ।' : 'Our medical equipment specialist will respond within 10-15 minutes.'}
          </p>

        </form>
      </div>
    </div>
  );
};
