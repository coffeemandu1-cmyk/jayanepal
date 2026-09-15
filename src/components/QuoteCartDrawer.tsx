import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  MessageSquare, 
  Mail, 
  ShoppingCart, 
  Building2, 
  User, 
  Phone, 
  MapPin, 
  FileText,
  AlertCircle,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { QuoteItem, Language } from '../types';
import { createCartWhatsAppUrl, createCartEmailUrl } from '../utils/orderHelpers';

interface QuoteCartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: QuoteItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  language: Language;
}

export const QuoteCartDrawer: React.FC<QuoteCartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  language,
}) => {
  const [customerInfo, setCustomerInfo] = useState({
    hospitalName: '',
    contactPerson: '',
    phone: '',
    district: '',
    remarks: '',
  });

  const [orderSentMessage, setOrderSentMessage] = useState<string | null>(null);
  const isNe = language === 'ne';

  if (!isOpen) return null;

  const handleInputChange = (field: string, value: string) => {
    setCustomerInfo((prev) => ({ ...prev, [field]: value }));
  };

  const whatsAppUrl = createCartWhatsAppUrl(items, customerInfo, language);
  const emailUrl = createCartEmailUrl(items, customerInfo, language);

  const handleSendViaWhatsApp = () => {
    window.open(whatsAppUrl, '_blank');
    setOrderSentMessage(isNe ? 'ह्वाट्सएप खोलिँदैछ... तपाईंको अर्डर विवरण तयार छ!' : 'Opening WhatsApp with your order summary!');
    setTimeout(() => setOrderSentMessage(null), 4000);
  };

  const handleSendViaEmail = () => {
    window.location.href = emailUrl;
    setOrderSentMessage(isNe ? 'इमेल एप खोलिँदैछ... आधिकारिक कोटेशन अनुरोध तयार छ!' : 'Opening your email client with formal quotation draft!');
    setTimeout(() => setOrderSentMessage(null), 4000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md sm:max-w-lg bg-white shadow-2xl flex flex-col relative z-10">
          
          {/* Drawer Header */}
          <div className="p-4 sm:p-5 bg-slate-900 text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-red-600/30 text-red-400">
                <ShoppingCart className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-base leading-tight">
                  {isNe ? 'अस्पताल अर्डर तथा कोटेशन सूची' : 'Hospital Quotation & Order Cart'}
                </h3>
                <p className="text-xs text-slate-300">
                  {isNe ? `जम्मा ${items.length} सामानहरू थपिएका छन्` : `${items.length} item(s) selected`}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Success Banner */}
          {orderSentMessage && (
            <div className="bg-emerald-50 border-b border-emerald-200 p-3 text-emerald-800 text-xs font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{orderSentMessage}</span>
            </div>
          )}

          {/* Items Content Scrollable */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-16 px-4">
                <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
                  <ShoppingCart className="w-8 h-8" />
                </div>
                <h4 className="font-bold text-slate-800 text-sm">
                  {isNe ? 'तपाईंको कोटेशन सूची खाली छ' : 'Your quote list is empty'}
                </h4>
                <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
                  {isNe
                    ? 'सर्जिकल क्याटलगबाट आवश्यक औजार वा उपकरण चयन गरी "कोटेशन सूचीमा थप्नुहोस्" क्लिक गर्नुहोस्।'
                    : 'Browse our surgical catalog and add items you wish to procure for your hospital.'}
                </p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between text-xs text-slate-500 pb-2 border-b border-slate-100">
                  <span className="font-semibold text-slate-700">{isNe ? 'छानिएका सामानहरू' : 'Selected Products'}</span>
                  <button
                    type="button"
                    onClick={onClearCart}
                    className="text-red-600 hover:text-red-700 font-bold hover:underline"
                  >
                    {isNe ? 'सबै हटाउनुहोस्' : 'Clear List'}
                  </button>
                </div>

                <div className="space-y-3">
                  {items.map(({ product, quantity }) => (
                    <div
                      key={product.id}
                      className="flex gap-3 p-3 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white transition-colors"
                    >
                      <img
                        src={product.imageUrl}
                        alt={product.nameEn}
                        className="w-16 h-16 rounded-lg object-cover bg-slate-200 shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-1">
                          <h4 className="text-xs font-bold text-slate-900 line-clamp-1">
                            {isNe ? product.nameNe : product.nameEn}
                          </h4>
                          <button
                            type="button"
                            onClick={() => onRemoveItem(product.id)}
                            className="text-slate-400 hover:text-red-600 p-1"
                            title="Remove"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <div className="text-[11px] font-mono text-slate-500">SKU: {product.sku}</div>
                        <div className="text-[11px] text-slate-400 mb-2">{product.packaging}</div>

                        {/* Quantity Counter */}
                        <div className="flex items-center gap-2">
                          <div className="flex items-center border border-slate-300 rounded-lg bg-white overflow-hidden">
                            <button
                              type="button"
                              onClick={() => onUpdateQuantity(product.id, Math.max(1, quantity - 1))}
                              className="p-1 text-slate-600 hover:bg-slate-100"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-2.5 text-xs font-bold text-slate-800">{quantity}</span>
                            <button
                              type="button"
                              onClick={() => onUpdateQuantity(product.id, quantity + 1)}
                              className="p-1 text-slate-600 hover:bg-slate-100"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <span className="text-[11px] text-slate-500">{isNe ? 'परिमाण' : 'units'}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Hospital / Buyer Information Form */}
                <div className="pt-4 border-t border-slate-200 space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                    {isNe ? 'अस्पताल तथा सम्पर्क विवरण (वैकल्पिक तर सिफारिस गरिएको)' : 'Hospital & Contact Details'}
                  </h4>

                  <div className="space-y-2 text-xs">
                    <div>
                      <label className="block text-slate-600 font-medium mb-1">
                        {isNe ? 'अस्पताल / क्लिनिक / ल्याबको नाम' : 'Hospital / Clinic / Lab Name'}
                      </label>
                      <div className="relative">
                        <Building2 className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          value={customerInfo.hospitalName}
                          onChange={(e) => handleInputChange('hospitalName', e.target.value)}
                          placeholder={isNe ? 'उदा: सिभिल हस्पिटल वा ग्रिनल्याण्ड क्लिनिक...' : 'e.g. Bir Hospital, Care Clinic...'}
                          className="w-full pl-8 pr-3 py-1.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-red-500 text-xs"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-slate-600 font-medium mb-1">
                          {isNe ? 'सम्पर्क व्यक्ति' : 'Contact Person'}
                        </label>
                        <div className="relative">
                          <User className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                          <input
                            type="text"
                            value={customerInfo.contactPerson}
                            onChange={(e) => handleInputChange('contactPerson', e.target.value)}
                            placeholder={isNe ? 'डा. / प्रबन्धक' : 'Doctor / Manager'}
                            className="w-full pl-8 pr-3 py-1.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-red-500 text-xs"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-slate-600 font-medium mb-1">
                          {isNe ? 'सम्पर्क फोन / मोबाइल' : 'Phone / Mobile'}
                        </label>
                        <div className="relative">
                          <Phone className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                          <input
                            type="text"
                            value={customerInfo.phone}
                            onChange={(e) => handleInputChange('phone', e.target.value)}
                            placeholder="98XXXXXXXX"
                            className="w-full pl-8 pr-3 py-1.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-red-500 text-xs font-mono"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-slate-600 font-medium mb-1">
                        {isNe ? 'जिल्ला / सहर' : 'District / City'}
                      </label>
                      <div className="relative">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          value={customerInfo.district}
                          onChange={(e) => handleInputChange('district', e.target.value)}
                          placeholder={isNe ? 'उदा: काठमाडौं, पोखरा, चितवन...' : 'e.g. Kathmandu, Pokhara, Chitwan...'}
                          className="w-full pl-8 pr-3 py-1.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-red-500 text-xs"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-slate-600 font-medium mb-1">
                        {isNe ? 'थप टिप्पणी वा विशेष आवश्यकता' : 'Special Notes / Urgency'}
                      </label>
                      <textarea
                        rows={2}
                        value={customerInfo.remarks}
                        onChange={(e) => handleInputChange('remarks', e.target.value)}
                        placeholder={isNe ? 'उदा: भोलिसम्म डेलिभरी चाहियो, भ्याट बिल आवश्यक...' : 'e.g. Need urgent delivery by tomorrow, VAT bill required...'}
                        className="w-full p-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-red-500 text-xs"
                      />
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Drawer Footer Actions */}
          {items.length > 0 && (
            <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 space-y-2.5">
              
              <div className="text-[11px] text-slate-500 text-center">
                {isNe
                  ? 'कुनै पनि बटन क्लिक गर्दा तपाईंको अर्डर लिस्ट स्वतः भरिनेछ।'
                  : 'Clicking either button auto-populates all selected items into a formatted order.'}
              </div>

              {/* Instant WhatsApp Multi-product Order */}
              <button
                type="button"
                onClick={handleSendViaWhatsApp}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-md transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                <span>{isNe ? 'ह्वाट्सएपमार्फत एकमुष्ट अर्डर पठाउनुहोस्' : 'Send Bulk Order via WhatsApp'}</span>
              </button>

              {/* Instant Email Quotation Request */}
              <button
                type="button"
                onClick={handleSendViaEmail}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-md transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>{isNe ? 'इमेलमार्फत आधिकारिक कोटेशन माग्नुहोस्' : 'Request Official Quote via Email'}</span>
              </button>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
