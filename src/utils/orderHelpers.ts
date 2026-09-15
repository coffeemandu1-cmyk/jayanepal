import { Product, QuoteItem } from '../types';
import { COMPANY_DETAILS } from '../data/products';

export const createProductWhatsAppUrl = (product: Product, quantity = 1, hospitalName = '', language: 'ne' | 'en' = 'ne'): string => {
  const isNe = language === 'ne';
  const text = isNe
    ? `नमस्कार जय नेपाल ट्रेडर्स,\nम तल उल्लेखित सर्जिकल/मेडिकल सामान अर्डर/कोटेशनका लागि सम्पर्क गर्दैछु:\n\n सामान: ${product.nameNe} (${product.nameEn})\n SKU/कोड: ${product.sku}\n क्याटगोरी: ${product.category}\n आवश्यक परिमाण: ${quantity}\n${hospitalName ? ` अस्पताल/संस्था: ${hospitalName}\n` : ''}\nकृपया यसको ताजा अस्पताल मूल्य (Hospital Rate) र डेलिभरी समय उपलब्ध गराउनुहोला।\nधन्यवाद!`
    : `Hello Jay Nepal Traders,\nI would like to inquire/order the following surgical item:\n\n Product: ${product.nameEn}\n SKU: ${product.sku}\n Required Quantity: ${quantity}\n${hospitalName ? ` Hospital/Facility: ${hospitalName}\n` : ''}\nPlease provide institutional pricing and delivery availability in Nepal.\nThank you!`;

  return `https://wa.me/${COMPANY_DETAILS.whatsappNumber}?text=${encodeURIComponent(text)}`;
};

export const createProductEmailUrl = (product: Product, quantity = 1, hospitalName = '', language: 'ne' | 'en' = 'ne'): string => {
  const isNe = language === 'ne';
  const subject = isNe
    ? `अर्डर/कोटेशन सोधपुछ: ${product.nameEn} (${product.sku}) - ${hospitalName || 'हस्पिटल अर्डर'}`
    : `Quotation Inquiry: ${product.nameEn} [${product.sku}] - ${hospitalName || 'Hospital Order'}`;

  const body = isNe
    ? `आदरणीय जय नेपाल ट्रेडर्स टिम,\n\nम निम्न सामानको आधिकारिक कोटेशन (Quotation) र उपलब्धता जान्न चाहन्छु:\n\nसामानको नाम: ${product.nameNe} / ${product.nameEn}\nSKU कोड: ${product.sku}\nआवश्यक परिमाण: ${quantity} ${product.packaging}\nअस्पताल/क्लिनिकको नाम: ${hospitalName || '__________________'}\nठेगाना / जिल्ला: __________________\nसम्पर्क फोन: __________________\n\nकृपया आधिकारिक भ्याट कोटेशन पठाउनुहोला।\nधन्यवाद।`
    : `Dear Jay Nepal Traders Sales Team,\n\nPlease send us an official quotation and stock availability for:\n\nItem: ${product.nameEn}\nSKU: ${product.sku}\nQuantity Required: ${quantity}\nPackaging: ${product.packaging}\nHospital/Facility: ${hospitalName || '__________________'}\nLocation/City: __________________\nContact Phone: __________________\n\nLooking forward to your prompt response.\nBest regards.`;

  return `mailto:${COMPANY_DETAILS.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
};

export const createCartWhatsAppUrl = (
  items: QuoteItem[],
  customerInfo: { hospitalName: string; contactPerson: string; phone: string; district: string; remarks: string },
  language: 'ne' | 'en' = 'ne'
): string => {
  const isNe = language === 'ne';
  const itemsText = items
    .map(
      (item, idx) =>
        `${idx + 1}. ${item.product.nameEn} [${item.product.sku}] - परिमाण: ${item.quantity} (${item.product.packaging})`
    )
    .join('\n');

  const text = isNe
    ? `नमस्ते जय नेपाल ट्रेडर्स,\nहाम्रो अस्पताल/संस्थाका लागि एकमुष्ट सर्जिकल अर्डर/कोटेशन अनुरोध गरिएको छ:\n\n📋 अर्डर गरिएका सामानहरू:\n${itemsText}\n\n🏥 अस्पताल/संस्था: ${customerInfo.hospitalName || 'उल्लेख नभएको'}\n👤 सम्पर्क व्यक्ति: ${customerInfo.contactPerson || 'उल्लेख नभएको'}\n📞 फोन नम्बर: ${customerInfo.phone || 'उल्लेख नभएको'}\n📍 जिल्ला/स्थान: ${customerInfo.district || 'नेपाल'}\n${customerInfo.remarks ? `📝 थप टिप्पणी: ${customerInfo.remarks}\n` : ''}\nकृपया छिटो कोटेशन र स्टक विवरण पठाउनुहोला।\nजय नेपाल!`
    : `Hello Jay Nepal Traders,\nWe have submitted a bulk surgical equipment order/quotation inquiry:\n\n📋 Items List:\n${itemsText}\n\n🏥 Facility Name: ${customerInfo.hospitalName || 'Not specified'}\n👤 Contact Person: ${customerInfo.contactPerson || 'Not specified'}\n📞 Phone: ${customerInfo.phone || 'Not specified'}\n📍 District/City: ${customerInfo.district || 'Nepal'}\n${customerInfo.remarks ? `📝 Note: ${customerInfo.remarks}\n` : ''}\nPlease review and provide official quotation.\nThank you!`;

  return `https://wa.me/${COMPANY_DETAILS.whatsappNumber}?text=${encodeURIComponent(text)}`;
};

export const createCartEmailUrl = (
  items: QuoteItem[],
  customerInfo: { hospitalName: string; contactPerson: string; phone: string; district: string; remarks: string },
  language: 'ne' | 'en' = 'ne'
): string => {
  const isNe = language === 'ne';
  const subject = `[कोटेशन अनुरोध] ${customerInfo.hospitalName || 'अस्पताल अर्डर'} - ${items.length} सामानहरू - जय नेपाल ट्रेडर्स`;

  const itemsText = items
    .map(
      (item, idx) =>
        `${idx + 1}. ${item.product.nameEn} (SKU: ${item.product.sku}) | परिमाण: ${item.quantity} | प्याकेजिङ: ${item.product.packaging}`
    )
    .join('\n');

  const body = `आदरणीय जय नेपाल ट्रेडर्स,\n\nनिम्न विवरण अनुसार अस्पताल उपकरण तथा सर्जिकल सामानको आधिकारिक कोटेशन पठाइदिनुहुन अनुरोध छ:\n\nसामानहरूको विवरण:\n--------------------------------------------------\n${itemsText}\n--------------------------------------------------\n\nअस्पताल/संस्थाको नाम: ${customerInfo.hospitalName}\nसम्पर्क व्यक्ति: ${customerInfo.contactPerson}\nसम्पर्क नम्बर: ${customerInfo.phone}\nजिल्ला / ठेगाना: ${customerInfo.district}\nथप विवरण: ${customerInfo.remarks || 'लागू नभएको'}\n\nकृपया भ्याट (VAT) सहितको दररेट उपलब्ध गराउनुहोला।\nधन्यवाद।`;

  return `mailto:${COMPANY_DETAILS.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
};
