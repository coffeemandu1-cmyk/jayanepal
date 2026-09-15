import React, { useState } from 'react';
import { 
  X, 
  Check, 
  MessageSquare, 
  Mail, 
  ShoppingCart, 
  ShieldCheck, 
  Package, 
  FileText, 
  Zap, 
  Share2,
  Building2
} from 'lucide-react';
import { Product, Language } from '../types';
import { createProductWhatsAppUrl, createProductEmailUrl } from '../utils/orderHelpers';

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  onAddToCart: (product: Product, quantity: number) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  isOpen,
  onClose,
  language,
  onAddToCart,
}) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [hospitalName, setHospitalName] = useState<string>('');
  const isNe = language === 'ne';

  if (!isOpen || !product) return null;

  const handleAddToCart = () => {
    onAddToCart(product, quantity);
    onClose();
  };

  const whatsAppUrl = createProductWhatsAppUrl(product, quantity, hospitalName, language);
  const emailUrl = createProductEmailUrl(product, quantity, hospitalName, language);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200 flex flex-col relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-8">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            
            {/* Left: Product Image & Badges */}
            <div className="md:col-span-5 space-y-4">
              <div className="relative rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 aspect-square">
                <img
                  src={product.imageUrl}
                  alt={product.nameEn}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 flex flex-col gap-1">
                  {product.inStock && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-bold bg-emerald-600 text-white shadow-xs">
                      <Check className="w-3.5 h-3.5" />
                      <span>{isNe ? 'स्टक उपलब्ध' : 'In Stock'}</span>
                    </span>
                  )}
                  {product.urgentAvailable && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-bold bg-amber-500 text-slate-900 shadow-xs">
                      <Zap className="w-3.5 h-3.5 fill-slate-900" />
                      <span>{isNe ? 'आकस्मिक डेलिभरी' : 'Fast Dispatch'}</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Packaging info card */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-slate-700">
                  <Package className="w-4 h-4 text-blue-600" />
                  <span>{isNe ? 'प्याकेजिङ विवरण:' : 'Packaging Unit:'}</span>
                </div>
                <div className="text-slate-600 font-medium pl-5">{product.packaging}</div>
              </div>

              {/* Certifications List */}
              <div className="space-y-1.5">
                <div className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>{isNe ? 'प्रमाणपत्र तथा गुणस्तर:' : 'Standards & Certifications:'}</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {product.certification.map((cert, idx) => (
                    <span key={idx} className="px-2 py-1 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-bold">
                      ✓ {cert}
                    </span>
                  ))}
                </div>
              </div>

            </div>

            {/* Right: Info, Specs, and Actions */}
            <div className="md:col-span-7 space-y-5">
              
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-slate-500 mb-1">
                  <span className="bg-slate-100 px-2 py-0.5 rounded font-semibold text-slate-700">SKU: {product.sku}</span>
                  <span>•</span>
                  <span className="capitalize">{product.category.replace('-', ' ')}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-tight">
                  {isNe ? product.nameNe : product.nameEn}
                </h3>
                <h4 className="text-sm font-semibold text-slate-500 mt-0.5 font-english">
                  {isNe ? product.nameEn : product.nameNe}
                </h4>
              </div>

              <p className="text-sm text-slate-600 leading-relaxed">
                {isNe ? product.descriptionNe : product.descriptionEn}
              </p>

              {/* Key Features */}
              <div className="space-y-1.5">
                <h5 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                  {isNe ? 'प्रमुख विशेषताहरू:' : 'Key Features:'}
                </h5>
                <ul className="space-y-1 text-xs text-slate-600">
                  {(isNe ? product.featuresNe : product.featuresEn).map((feat, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-red-600 font-bold shrink-0 mt-0.5">•</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technical Specifications Table */}
              <div className="border border-slate-200 rounded-xl overflow-hidden text-xs">
                <div className="bg-slate-100 px-3 py-2 font-bold text-slate-700 border-b border-slate-200 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-slate-500" />
                  <span>{isNe ? 'प्राविधिक विवरण (Specifications)' : 'Technical Specifications'}</span>
                </div>
                <div className="divide-y divide-slate-100">
                  {Object.entries(product.specifications).map(([key, val]) => (
                    <div key={key} className="grid grid-cols-5 p-2 text-slate-600">
                      <span className="col-span-2 font-semibold text-slate-700">{key}:</span>
                      <span className="col-span-3 text-slate-600">{val}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Hospital Customization & Quantity Box */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      {isNe ? 'अस्पताल / क्लिनिकको नाम:' : 'Hospital / Clinic Name:'}
                    </label>
                    <div className="relative">
                      <Building2 className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={hospitalName}
                        onChange={(e) => setHospitalName(e.target.value)}
                        placeholder={isNe ? 'उदा: सिभिल हस्पिटल...' : 'e.g. Civil Hospital...'}
                        className="w-full pl-8 pr-3 py-1.5 text-xs bg-white rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-red-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      {isNe ? 'आवश्यक परिमाण (Quantity):' : 'Required Quantity:'}
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min={1}
                        value={quantity}
                        onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                        className="w-24 px-3 py-1.5 text-xs bg-white rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-red-500 font-bold"
                      />
                      <span className="text-xs text-slate-500">{isNe ? 'एकाइ / बक्स' : 'Units'}</span>
                    </div>
                  </div>
                </div>

                {/* Instant Order Action Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                  <a
                    href={whatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-colors"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>{isNe ? 'ह्वाट्सएपमार्फत तत्काल अर्डर' : 'Order via WhatsApp'}</span>
                  </a>

                  <a
                    href={emailUrl}
                    className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                    <span>{isNe ? 'इमेल कोटेशन सोधपुछ' : 'Request Email RFQ'}</span>
                  </a>
                </div>

                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-xs transition-colors"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>{isNe ? 'यो सामान कोटेशन कार्टमा थप्नुहोस्' : 'Add to RFQ List'}</span>
                </button>
              </div>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
