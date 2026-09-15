import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductCatalog } from './components/ProductCatalog';
import { HospitalServices } from './components/HospitalServices';
import { WhyChooseUs } from './components/WhyChooseUs';
import { HospitalClients } from './components/HospitalClients';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { FloatingActions } from './components/FloatingActions';
import { QuoteCartDrawer } from './components/QuoteCartDrawer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { QuickOrderModal } from './components/QuickOrderModal';
import { Product, QuoteItem, Language } from './types';

export default function App() {
  // Application language state: 'ne' for Nepali, 'en' for English
  const [language, setLanguage] = useState<Language>('ne');
  
  // Quotation Cart state
  const [cartItems, setCartItems] = useState<QuoteItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  // Modals state
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState<boolean>(false);
  const [isQuickRfqOpen, setIsQuickRfqOpen] = useState<boolean>(false);
  const [quickRfqProduct, setQuickRfqProduct] = useState<Product | null>(null);

  // Active section tracker for navbar highlight
  const [activeSection, setActiveSection] = useState<string>('hero');

  // Load cart from local storage if available
  useEffect(() => {
    try {
      const saved = localStorage.getItem('jaynepal_cart');
      if (saved) {
        setCartItems(JSON.parse(saved));
      }
    } catch (e) {
      console.warn('Could not read cart from localStorage', e);
    }
  }, []);

  // Save cart to local storage
  useEffect(() => {
    try {
      localStorage.setItem('jaynepal_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.warn('Could not save cart to localStorage', e);
    }
  }, [cartItems]);

  // Cart operations
  const handleAddToCart = (product: Product, quantity = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    // Open cart drawer immediately to confirm add
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleViewProductDetails = (product: Product) => {
    setSelectedProduct(product);
    setIsDetailModalOpen(true);
  };

  const handleOpenQuickRfq = (initialProd?: Product) => {
    setQuickRfqProduct(initialProd || null);
    setIsQuickRfqOpen(true);
  };

  // Scroll to section helper
  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const elem = document.getElementById(sectionId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const cartItemIds = new Set(cartItems.map((item) => item.product.id));
  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className={`min-h-screen bg-slate-50 flex flex-col ${language === 'ne' ? 'font-nepali' : 'font-english'}`}>
      
      {/* Top sticky navigation bar */}
      <Navbar
        language={language}
        onLanguageChange={setLanguage}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenQuickRfq={() => handleOpenQuickRfq()}
        activeSection={activeSection}
        onNavigate={handleNavigate}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          language={language}
          onExploreCatalog={() => handleNavigate('catalog')}
          onOpenQuickRfq={() => handleOpenQuickRfq()}
        />

        {/* Surgical & Medical Product Catalog Section */}
        <ProductCatalog
          language={language}
          onAddToCart={handleAddToCart}
          onViewProductDetails={handleViewProductDetails}
          onOpenQuickRfq={handleOpenQuickRfq}
          cartItemIds={cartItemIds}
        />

        {/* Turnkey Hospital Services (Modular OT, ICU, AMC) */}
        <HospitalServices
          language={language}
          onOpenQuickRfq={() => handleOpenQuickRfq()}
        />

        {/* Why Choose Us & Compliance (DDA Nepal, ISO 13485, Fast Dispatch) */}
        <WhyChooseUs language={language} />

        {/* Partner Hospitals & Healthcare Facilities in Nepal */}
        <HospitalClients language={language} />

        {/* Contact, Showroom & Direct Message Dispatch */}
        <ContactSection language={language} />
      </main>

      {/* Footer */}
      <Footer
        language={language}
        onNavigate={handleNavigate}
        onOpenQuickRfq={() => handleOpenQuickRfq()}
      />

      {/* Floating Instant WhatsApp & Call Actions */}
      <FloatingActions
        language={language}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Multi-item Quotation Cart Drawer */}
      <QuoteCartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        language={language}
      />

      {/* Product Detail & Spec Sheet Modal */}
      <ProductDetailModal
        product={selectedProduct}
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        language={language}
        onAddToCart={handleAddToCart}
      />

      {/* Quick RFQ / Custom Order Modal */}
      <QuickOrderModal
        isOpen={isQuickRfqOpen}
        onClose={() => setIsQuickRfqOpen(false)}
        language={language}
        initialProduct={quickRfqProduct}
      />

    </div>
  );
}
