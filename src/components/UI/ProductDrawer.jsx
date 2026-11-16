import React, { useState } from 'react';
import { X, Star, Check, Plus, Minus, ShoppingBag, ShieldCheck, Truck, RefreshCw } from 'lucide-react';
import { useShowroom } from '../../context/ShowroomContext';
import { PRODUCTS } from '../../utils/productsData';

export function ProductDrawer() {
  const {
    selectedProductId,
    closeProductPanel,
    colorVariants,
    setProductColor,
    addToCart,
  } = useShowroom();

  const [quantity, setQuantity] = useState(1);

  if (!selectedProductId) return null;

  const product = PRODUCTS.find((p) => p.id === selectedProductId);
  if (!product) return null;

  const activeColor = colorVariants[product.id] || product.colors[0];

  const handleAddToCart = () => {
    addToCart(product, activeColor, quantity);
    setQuantity(1);
  };

  return (
    <aside className="product-drawer">
      {/* Header with Close */}
      <div className="drawer-header">
        <span className="product-badge">{product.badge}</span>
        <button
          className="drawer-close-btn"
          onClick={closeProductPanel}
          title="Close details"
          aria-label="Close"
        >
          <X size={20} />
        </button>
      </div>

      <div className="drawer-scroll-body">
        {/* Category & Title */}
        <span className="product-category">{product.category}</span>
        <h2 className="product-title">{product.name}</h2>

        {/* Rating */}
        <div className="product-rating">
          <div className="stars">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={14}
                className={i < Math.floor(product.rating) ? 'star-filled' : 'star-empty'}
              />
            ))}
          </div>
          <span className="rating-text">
            {product.rating} ({product.reviewsCount} verified reviews)
          </span>
        </div>

        {/* Pricing */}
        <div className="product-price-row">
          <span className="current-price">${product.price}</span>
          <span className="original-price">${product.originalPrice}</span>
          <span className="save-badge">
            Save ${product.originalPrice - product.price}
          </span>
        </div>

        {/* Color Swatch Picker (Live 3D Update) */}
        <div className="swatch-section">
          <div className="swatch-header">
            <span className="section-title">Finish / Upholstery:</span>
            <span className="active-color-name">{activeColor.name}</span>
          </div>
          <div className="color-swatches">
            {product.colors.map((c) => {
              const isSelected = activeColor.name === c.name;
              return (
                <button
                  key={c.name}
                  className={`swatch-btn ${isSelected ? 'selected' : ''}`}
                  onClick={() => setProductColor(product.id, c)}
                  style={{ backgroundColor: c.hex }}
                  title={c.name}
                >
                  {isSelected && <Check size={14} className="check-icon" />}
                </button>
              );
            })}
          </div>
          <span className="swatch-hint">✨ Click a swatch to customize in 3D</span>
        </div>

        {/* Description */}
        <div className="desc-section">
          <p className="product-description">{product.description}</p>
        </div>

        {/* Dimensions & Specs */}
        <div className="specs-card">
          <div className="spec-row">
            <span className="spec-label">Dimensions</span>
            <span className="spec-value">{product.dimensions}</span>
          </div>
          <div className="spec-row">
            <span className="spec-label">Craftsmanship</span>
            <span className="spec-value">{product.materials}</span>
          </div>
          <div className="spec-row">
            <span className="spec-label">Lead Time</span>
            <span className="spec-value">In Stock (Dispatches in 48h)</span>
          </div>
        </div>

        {/* Guarantees */}
        <div className="guarantees-grid">
          <div className="guarantee-item">
            <Truck size={16} />
            <span>Complimentary White Glove Delivery</span>
          </div>
          <div className="guarantee-item">
            <ShieldCheck size={16} />
            <span>10-Year Craftsmanship Guarantee</span>
          </div>
          <div className="guarantee-item">
            <RefreshCw size={16} />
            <span>30-Day In-Home Trial</span>
          </div>
        </div>
      </div>

      {/* Footer with Quantity & Add to Cart */}
      <div className="drawer-footer">
        <div className="qty-picker">
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="qty-btn"
            aria-label="Decrease quantity"
          >
            <Minus size={15} />
          </button>
          <span className="qty-number">{quantity}</span>
          <button
            onClick={() => setQuantity((q) => q + 1)}
            className="qty-btn"
            aria-label="Increase quantity"
          >
            <Plus size={15} />
          </button>
        </div>

        <button
          className="add-to-cart-btn"
          onClick={handleAddToCart}
          id="add-to-cart-drawer-btn"
        >
          <ShoppingBag size={18} />
          <span>Add to Bag • ${(product.price * quantity).toLocaleString()}</span>
        </button>
      </div>
    </aside>
  );
}
