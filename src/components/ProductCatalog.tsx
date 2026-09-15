import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  ShoppingCart, 
  MessageSquare, 
  Mail, 
  Check, 
  Info, 
  Scissors, 
  BedDouble, 
  PackageCheck, 
  Activity, 
  HeartPulse, 
  Bone, 
  LayoutGrid, 
  ShieldCheck, 
  Sparkles,
  Zap,
  ArrowRight
} from 'lucide-react';
import { Product, Category, Language } from '../types';
import { CATEGORIES, PRODUCTS } from '../data/products';
import { createProductWhatsAppUrl, createProductEmailUrl } from '../utils/orderHelpers';

interface ProductCatalogProps {
  language: Language;
  onAddToCart: (product: Product, quantity?: number) => void;
  onViewProductDetails: (product: Product) => void;
  onOpenQuickRfq: (initialProduct?: Product) => void;
  cartItemIds: Set<string>;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  language,
  onAddToCart,
  onViewProductDetails,
  onOpenQuickRfq,
  cartItemIds,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [urgentOnly, setUrgentOnly] = useState<boolean>(false);
  const [copiedSku, setCopiedSku] = useState<string | null>(null);

  const isNe = language === 'ne';

  // Map category icons
  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Scissors':
        return <Scissors className="w-4 h-4" />;
      case 'BedDouble':
        return <BedDouble className="w-4 h-4" />;
      case 'PackageCheck':
        return <PackageCheck className="w-4 h-4" />;
      case 'Activity':
        return <Activity className="w-4 h-4" />;
      case 'HeartPulse':
        return <HeartPulse className="w-4 h-4" />;
      case 'Bone':
        return <Bone className="w-4 h-4" />;
      default:
        return <LayoutGrid className="w-4 h-4" />;
    }
  };

  // Filtered products list
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category filter
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }
      // Urgent filter
      if (urgentOnly && !product.urgentAvailable) {
        return false;
      }
      // Search query filter
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchNameNe = product.nameNe.toLowerCase().includes(query);
        const matchNameEn = product.nameEn.toLowerCase().includes(query);
        const matchSku = product.sku.toLowerCase().includes(query);
        const matchDesc = product.descriptionEn.toLowerCase().includes(query) || product.descriptionNe.toLowerCase().includes(query);
        return matchNameNe || matchNameEn || matchSku || matchDesc;
      }
      return true;
    });
  }, [selectedCategory, searchQuery, urgentOnly]);

  const copySkuToClipboard = (sku: string) => {
    navigator.clipboard.writeText(sku);
    setCopiedSku(sku);
    setTimeout(() => setCopiedSku(null), 2000);
  };

  return (
    <section id="catalog" className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-bold tracking-wide uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isNe ? 'अस्पताल आपूर्ति क्याटलग' : 'Hospital Supplies Catalog'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            {isNe ? 'प्रमाणित सर्जिकल औजार तथा मेडिकल उपकरणहरू' : 'Certified Surgical Instruments & Medical Equipment'}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            {isNe
              ? 'प्रत्येक उत्पादन DDA तथा ISO मापदण्ड अनुसार प्रमाणित छन्। कुनै पनि सामान तुरुन्त ह्वाट्सएप वा इमेलमार्फत अर्डर गर्न सक्नुहुन्छ।'
              : 'DDA Nepal approved & ISO certified medical hardware. Instant quotation and order dispatch via WhatsApp & Email.'}
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 mb-8">
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4">
            
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={isNe ? 'सामानको नाम वा SKU कोड खोज्नुहोस् (उदा: ICU Bed, Scissors, JNT-SI)...' : 'Search by product name or SKU (e.g. ICU Bed, Gloves, Monitor)...'}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm placeholder:text-slate-400"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 px-1.5 py-0.5 rounded bg-slate-100"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Urgent / Emergency Filter Toggle */}
            <div className="flex items-center gap-3">
              <label className="inline-flex items-center gap-2 cursor-pointer select-none bg-slate-50 hover:bg-slate-100 px-3 py-2 rounded-xl border border-slate-200 transition-colors">
                <input
                  type="checkbox"
                  checked={urgentOnly}
                  onChange={(e) => setUrgentOnly(e.target.checked)}
                  className="rounded text-red-600 focus:ring-red-500 h-4 w-4"
                />
                <span className="text-xs font-bold text-slate-700 flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  <span>{isNe ? 'तत्काल आपतकालीन डेलिभरी उपलब्ध' : 'Emergency Stock Ready'}</span>
                </span>
              </label>

              <div className="text-xs text-slate-500 font-medium px-2 shrink-0">
                {isNe ? `जम्मा ${filteredProducts.length} सामान` : `${filteredProducts.length} items`}
              </div>
            </div>

          </div>

          {/* Category Tabs Scrollable */}
          <div className="flex items-center gap-2 overflow-x-auto pt-4 border-t border-slate-100 scrollbar-thin">
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all shrink-0 ${
                    isSelected
                      ? 'bg-red-600 text-white shadow-sm shadow-red-600/20'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  {getCategoryIcon(cat.iconName)}
                  <span>{isNe ? cat.nameNe : cat.nameEn}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => {
              const isInCart = cartItemIds.has(product.id);
              const whatsAppUrl = createProductWhatsAppUrl(product, 1, '', language);
              const emailUrl = createProductEmailUrl(product, 1, '', language);

              return (
                <div
                  key={product.id}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col group"
                >
                  {/* Image Container with Badges */}
                  <div className="relative h-52 overflow-hidden bg-slate-100">
                    <img
                      src={product.imageUrl}
                      alt={product.nameEn}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                    {/* Stock Status Badge */}
                    <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
                      {product.inStock && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-bold bg-emerald-600 text-white shadow-xs">
                          <Check className="w-3 h-3" />
                          <span>{isNe ? 'स्टक उपलब्ध' : 'In Stock'}</span>
                        </span>
                      )}
                      {product.urgentAvailable && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-extrabold bg-amber-500 text-slate-900 shadow-xs">
                          <Zap className="w-3 h-3 fill-slate-900" />
                          <span>{isNe ? '२४ घण्टा डेलिभरी' : 'Fast Dispatch'}</span>
                        </span>
                      )}
                    </div>

                    {/* Certifications Badge */}
                    <div className="absolute top-3 right-3 flex items-center gap-1">
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-900/80 text-white backdrop-blur-xs">
                        {product.certification[0]}
                      </span>
                    </div>

                    {/* Quick View Button on Hover */}
                    <button
                      type="button"
                      onClick={() => onViewProductDetails(product)}
                      className="absolute bottom-3 right-3 px-3 py-1.5 rounded-lg bg-white/90 hover:bg-white text-slate-800 text-xs font-bold shadow-md opacity-90 hover:opacity-100 transition-opacity flex items-center gap-1"
                    >
                      <Info className="w-3.5 h-3.5 text-blue-600" />
                      <span>{isNe ? 'विस्तृत विवरण' : 'Details'}</span>
                    </button>
                  </div>

                  {/* Product Details Content */}
                  <div className="p-5 flex-1 flex flex-col">
                    
                    {/* SKU & Category */}
                    <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
                      <button
                        type="button"
                        onClick={() => copySkuToClipboard(product.sku)}
                        className="font-mono text-[11px] text-slate-500 hover:text-red-600 flex items-center gap-1"
                        title="Click to copy SKU"
                      >
                        <span>SKU: {product.sku}</span>
                        {copiedSku === product.sku && <span className="text-emerald-600 font-bold">✓ Copied</span>}
                      </button>
                      <span className="text-[11px] font-medium text-slate-400">{product.packaging}</span>
                    </div>

                    {/* Title in Nepali & English */}
                    <h3 
                      onClick={() => onViewProductDetails(product)}
                      className="text-base font-bold text-slate-900 leading-snug hover:text-red-600 transition-colors cursor-pointer mb-1 line-clamp-2"
                    >
                      {isNe ? product.nameNe : product.nameEn}
                    </h3>
                    <p className="text-xs text-slate-500 mb-3 font-english font-medium">
                      {isNe ? product.nameEn : product.nameNe}
                    </p>

                    {/* Short Description */}
                    <p className="text-xs text-slate-600 line-clamp-2 mb-4 leading-relaxed">
                      {isNe ? product.descriptionNe : product.descriptionEn}
                    </p>

                    {/* Key Specifications list */}
                    <div className="space-y-1 mb-4 pt-2 border-t border-slate-100 text-xs text-slate-600">
                      {product.featuresNe.slice(0, 2).map((feat, idx) => (
                        <div key={idx} className="flex items-start gap-1.5">
                          <span className="text-emerald-600 font-bold shrink-0 mt-0.5">•</span>
                          <span className="line-clamp-1">{isNe ? feat : product.featuresEn[idx] || feat}</span>
                        </div>
                      ))}
                    </div>

                    {/* Instant Order Buttons Grid */}
                    <div className="mt-auto pt-3 border-t border-slate-100 space-y-2">
                      
                      {/* Top Action Row: WhatsApp & Email Direct Buttons */}
                      <div className="grid grid-cols-2 gap-2">
                        {/* WhatsApp Instant Order */}
                        <a
                          href={whatsAppUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-bold transition-colors border border-emerald-200"
                        >
                          <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                          <span>{isNe ? 'WhatsApp अर्डर' : 'WhatsApp'}</span>
                        </a>

                        {/* Email RFQ */}
                        <a
                          href={emailUrl}
                          className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold transition-colors border border-blue-200"
                        >
                          <Mail className="w-3.5 h-3.5 text-blue-600" />
                          <span>{isNe ? 'इमेल कोटेशन' : 'Email RFQ'}</span>
                        </a>
                      </div>

                      {/* Bottom Action: Add to Quotation Cart */}
                      <button
                        type="button"
                        onClick={() => onAddToCart(product, 1)}
                        className={`w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-bold transition-all ${
                          isInCart
                            ? 'bg-slate-900 text-white hover:bg-slate-800'
                            : 'bg-red-600 hover:bg-red-700 text-white shadow-xs'
                        }`}
                      >
                        <ShoppingCart className="w-4 h-4" />
                        <span>
                          {isInCart
                            ? isNe ? 'कोटेशन सूचीमा थपियो (कार्ट हेर्नुहोस्)' : 'In Cart (Click to Add More)'
                            : isNe ? '+ कोटेशन सूचीमा थप्नुहोस्' : '+ Add to RFQ Cart'}
                        </span>
                      </button>

                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Empty Search State */
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 max-w-lg mx-auto">
            <div className="w-14 h-14 rounded-full bg-red-50 text-red-500 flex items-center justify-center mx-auto mb-4">
              <Search className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-slate-800">
              {isNe ? 'कुनै सामान फेला परेन' : 'No products found'}
            </h3>
            <p className="text-sm text-slate-500 mt-1 mb-5">
              {isNe
                ? 'तपाईंले खोज्नुभएको शब्द अनुसार कुनै उत्पादन फेला परेन। कृपया अर्को शब्द खोज्नुहोस् वा सिधै ह्वाट्सएपमा सोध्नुहोस्।'
                : 'No items match your search. You can reset filters or contact us directly on WhatsApp for custom procurement.'}
            </p>
            <div className="flex justify-center gap-3">
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                  setUrgentOnly(false);
                }}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold"
              >
                {isNe ? 'सबै फिल्टर रिसेट गर्नुहोस्' : 'Reset All Filters'}
              </button>
              <button
                type="button"
                onClick={() => onOpenQuickRfq()}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold"
              >
                {isNe ? 'कस्टम सोधपुछ पठाउनुहोस्' : 'Send Custom RFQ'}
              </button>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
