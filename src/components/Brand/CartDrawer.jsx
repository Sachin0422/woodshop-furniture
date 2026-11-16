import React, { useState } from 'react';
import { X, Trash2, ArrowRight, ShieldCheck, Tag, ShoppingBag, Plus, Minus } from 'lucide-react';

export function CartDrawer({ isOpen, onClose, cart, onUpdateQuantity, onRemoveItem, onCheckout }) {
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoMessage, setPromoMessage] = useState('');

  if (!isOpen) return null;

  // Calculate Subtotal from placeholder prices
  const parsePrice = (priceStr) => {
    const num = parseInt(priceStr.replace(/[^0-9]/g, ''), 10);
    return isNaN(num) ? 0 : num;
  };

  const subtotal = cart.reduce((acc, item) => {
    return acc + parsePrice(item.product.priceEstimate) * item.quantity;
  }, 0);

  const discountAmount = Math.round(subtotal * discountPercent);
  const total = subtotal - discountAmount;

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'WOODSHOP10') {
      setDiscountPercent(0.1);
      setPromoMessage('✨ 10% Architectural preview privilege applied');
    } else if (promoCode.trim().length > 0) {
      setPromoMessage('❌ Code not recognized. Try "WOODSHOP10"');
    }
  };

  return (
    <div className="cart-backdrop" onClick={onClose}>
      <div className="cart-drawer-panel" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="cart-drawer-header">
          <div className="cart-title-row">
            <ShoppingBag size={20} />
            <h3 className="cart-heading">Your Curated Selection</h3>
            <span className="cart-items-count-badge">
              {cart.reduce((a, c) => a + c.quantity, 0)} items
            </span>
          </div>
          <button
            className="cart-close-btn"
            onClick={onClose}
            aria-label="Close bag"
          >
            <X size={20} />
          </button>
        </div>

        {/* Free White-Glove Delivery Notice */}
        <div className="cart-white-glove-bar">
          <span>✨ <strong>Complimentary White-Glove Installation</strong> included with all bespoke orders.</span>
        </div>

        {/* Cart Items List */}
        <div className="cart-items-container">
          {cart.length === 0 ? (
            <div className="cart-empty-box">
              <span className="empty-symbol">🛋️</span>
              <h4 className="empty-title">Your bag is awaiting inspiration</h4>
              <p className="empty-text">
                Explore our curated architectural collection and select pieces to tailor for your residence.
              </p>
              <button className="empty-explore-btn" onClick={onClose}>
                Browse Collections
              </button>
            </div>
          ) : (
            cart.map((item) => {
              const itemPrice = parsePrice(item.product.priceEstimate);
              return (
                <div
                  key={`${item.product.id}-${item.finish.name}`}
                  className="cart-card-item"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="cart-item-thumbnail"
                  />
                  <div className="cart-item-content">
                    <div className="cart-item-top">
                      <h4 className="cart-item-name">{item.product.name}</h4>
                      <button
                        className="cart-item-delete"
                        onClick={() => onRemoveItem(item.product.id, item.finish.name)}
                        title="Remove piece"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <div className="cart-item-finish-badge">
                      <span
                        className="swatch-mini-dot"
                        style={{ backgroundColor: item.finish.hex }}
                      ></span>
                      <span>{item.finish.name}</span>
                    </div>

                    <div className="cart-item-bottom">
                      <div className="cart-qty-widget">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.finish.name, -1)}
                          aria-label="Decrease quantity"
                        >
                          <Minus size={13} />
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.finish.name, 1)}
                          aria-label="Increase quantity"
                        >
                          <Plus size={13} />
                        </button>
                      </div>

                      <div className="cart-item-price-sum">
                        ${(itemPrice * item.quantity).toLocaleString()}
                        <span className="est-tag">Est. MSRP</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer & Checkout */}
        {cart.length > 0 && (
          <div className="cart-drawer-footer">
            {/* Promo Code Form */}
            <form className="cart-promo-form" onSubmit={handleApplyPromo}>
              <div className="promo-input-box">
                <Tag size={15} className="promo-icon" />
                <input
                  type="text"
                  placeholder="Privilege code (try WOODSHOP10)"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                />
              </div>
              <button type="submit" className="apply-promo-btn">
                Apply
              </button>
            </form>
            {promoMessage && (
              <span className={`promo-feedback ${discountPercent > 0 ? 'success' : 'error'}`}>
                {promoMessage}
              </span>
            )}

            {/* Calculations */}
            <div className="cart-financial-summary">
              <div className="calc-row">
                <span>Estimated Pieces Subtotal</span>
                <span>${subtotal.toLocaleString()}</span>
              </div>
              {discountPercent > 0 && (
                <div className="calc-row discount-row">
                  <span>Privilege Savings (10%)</span>
                  <span>-${discountAmount.toLocaleString()}</span>
                </div>
              )}
              <div className="calc-row">
                <span>White-Glove Placement</span>
                <span className="free-tag">Complimentary</span>
              </div>
              <div className="calc-row total-calc-row">
                <div>
                  <span className="total-title">Estimated Acquisition Total</span>
                  <span className="total-subnote">Placeholder valuation for proposal preview</span>
                </div>
                <span className="total-figure">${total.toLocaleString()}</span>
              </div>
            </div>

            {/* Acquisition CTA */}
            <button
              className="proceed-acquisition-btn"
              onClick={onCheckout}
              id="proceed-acquisition-btn"
            >
              <span>Schedule Acquisition Consultation</span>
              <ArrowRight size={18} />
            </button>

            <div className="cart-assurance-line">
              <ShieldCheck size={14} />
              <span>Tailored to order • 10-year timber joinery guarantee</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
