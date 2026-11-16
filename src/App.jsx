import React, { useState } from 'react';
import { Header } from './components/Brand/Header';
import { Hero } from './components/Brand/Hero';
import { Walkthrough } from './components/Brand/Walkthrough';
import { CraftsmanshipSection } from './components/Brand/CraftsmanshipSection';
import { CollectionGrid } from './components/Brand/CollectionGrid';
import { ProductModal } from './components/Brand/ProductModal';
import { CartDrawer } from './components/Brand/CartDrawer';
import { CheckoutModal } from './components/Brand/CheckoutModal';
import { Footer } from './components/Brand/Footer';
import { CATALOG_PRODUCTS } from './data/woodshopData';
import { playClickSound, playCartSound } from './utils/audio';
import './App.css';

export default function App() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Initial luxury sample item in bag
  const [cart, setCart] = useState([
    {
      product: CATALOG_PRODUCTS[0], // Nordic Haven Modular Sectional
      finish: CATALOG_PRODUCTS[0].finishes[0],
      quantity: 1,
    },
  ]);

  const cartCount = cart.reduce((acc, curr) => acc + curr.quantity, 0);

  const handleAddToCart = (product, finish, qty = 1) => {
    const selectedFinish = finish || product.finishes[0];
    setCart((prev) => {
      const idx = prev.findIndex(
        (item) => item.product.id === product.id && item.finish.name === selectedFinish.name
      );
      if (idx > -1) {
        const next = [...prev];
        next[idx] = { ...next[idx], quantity: next[idx].quantity + qty };
        return next;
      }
      return [...prev, { product, finish: selectedFinish, quantity: qty }];
    });
    playCartSound();
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (productId, finishName, delta) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId && item.finish.name === finishName) {
            const nextQ = item.quantity + delta;
            return nextQ > 0 ? { ...item, quantity: nextQ } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
    playClickSound();
  };

  const handleRemoveItem = (productId, finishName) => {
    setCart((prev) =>
      prev.filter(
        (item) => !(item.product.id === productId && item.finish.name === finishName)
      )
    );
    playClickSound();
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="woodshop-luxury-app">
      {/* 1. Global Minimalist Header */}
      <Header
        cartCount={cartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onSelectCategory={(catId) => setSelectedCategory(catId)}
      />

      {/* 2. Fullscreen Cinematic Hero Visual */}
      <Hero />

      {/* 3. Architectural Scroll Walkthrough */}
      <Walkthrough
        onSelectCategory={(catId) => setSelectedCategory(catId)}
      />

      {/* 4. Artisanal Craftsmanship & Material Philosophy */}
      <CraftsmanshipSection />

      {/* 5. Curated Furniture Collection Grid */}
      <CollectionGrid
        selectedCategory={selectedCategory}
        onSelectCategory={(catId) => setSelectedCategory(catId)}
        onSelectProduct={(prod) => setSelectedProduct(prod)}
        onAddToCart={handleAddToCart}
      />

      {/* 6. Global Luxury Footer & Ateliers */}
      <Footer />

      {/* --- Interactive Modals & Drawers --- */}

      {/* Product Detail & Specifications Modal */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Curated Bag / Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleCheckout}
      />

      {/* Acquisition Confirmation Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cart={cart}
      />
    </div>
  );
}
