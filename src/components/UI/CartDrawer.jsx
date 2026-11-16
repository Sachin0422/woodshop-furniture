import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Tag, ShoppingBag } from 'lucide-react';
import { useShowroom } from '../../context/ShowroomContext';

export function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateCartQuantity,
    removeFromCart,
    cartSubtotal,
    cartCount,
    setIsCheckoutModalOpen,
  } = useShowroom();

  const [promoCode, setPromoCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [promoMessage, setPromoMessage] = useState('');

  if (!isCartOpen) return null;

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'WOODSHOP10') {
      setAppliedDiscount(0.1); // 10% off
      setPromoMessage('✨ 10% Woodshop discount applied!');
    } else if (promoCode.trim().length > 0) {
      setPromoMessage('❌ Invalid promo code. Try "WOODSHOP10"');
    }
  };

  const freeShippingThreshold = 500;
  const shippingCost = cartSubtotal >= freeShippingThreshold || cartSubtotal === 0 ? 0 : 49;
  const discountAmount = Math.round(cartSubtotal * appliedDiscount);
  const finalTotal = cartSubtotal - discountAmount + shippingCost;
  const progressPercent = Math.min(100, Math.round((cartSubtotal / freeShippingThreshold) * 100));

  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutModalOpen(true);
  };

  return (
    <div className="cart-backdrop" onClick={() => setIsCartOpen(false)}>
      <div className="cart-drawer" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="cart-header">
          <div className="cart-header-title">
            <ShoppingBag size={20} />
            <h2>Your Curated Bag</h2>
            <span className="cart-pill-count">{cartCount}</span>
          </div>
          <button
            className="drawer-close-btn"
            onClick={() => setIsCartOpen(false)}
            aria-label="Close cart"
          >
            <X size={20} />
          </button>
        </div>

        {/* Free Shipping Bar */}
        <div className="shipping-progress-box">
          <div className="shipping-label">
            {cartSubtotal >= freeShippingThreshold ? (
              <span>🎉 You unlocked <strong>FREE White-Glove Delivery!</strong></span>
            ) : (
              <span>
                Add <strong>${freeShippingThreshold - cartSubtotal}</strong> more for Free Shipping
              </span>
            )}
          </div>
          <div className="progress-track">
            <div
              className="progress-fill"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>

        {/* Items List */}
        <div className="cart-items-list">
          {cart.length === 0 ? (
            <div className="cart-empty-state">
              <span className="empty-emoji">🛋️</span>
              <h3>Your bag is waiting</h3>
              <p>Explore our 3D virtual showroom and click on any piece to add it to your space.</p>
              <button
                className="empty-cta-btn"
                onClick={() => setIsCartOpen(false)}
              >
                Explore Showroom
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={`${item.product.id}-${item.selectedColor.name}`}
                className="cart-item-card"
              >
                {/* Visual Color Swatch Preview */}
                <div
                  className="cart-item-swatch-thumb"
                  style={{ backgroundColor: item.selectedColor.hex }}
                >
                  <span className="thumb-letter">{item.product.category[0]}</span>
                </div>

                {/* Details */}
                <div className="cart-item-info">
                  <div className="item-title-row">
                    <h4 className="item-name">{item.product.name}</h4>
                    <button
                      className="item-remove-btn"
                      onClick={() => removeFromCart(item.product.id, item.selectedColor.name)}
                      title="Remove from bag"
                      aria-label="Remove item"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  <div className="item-color-pill">
                    <span
                      className="dot"
                      style={{ backgroundColor: item.selectedColor.hex }}
                    ></span>
                    <span>{item.selectedColor.name}</span>
                  </div>

                  <div className="item-bottom-row">
                    <div className="cart-qty-ctrl">
                      <button
                        onClick={() =>
                          updateCartQuantity(item.product.id, item.selectedColor.name, -1)
                        }
                        aria-label="Decrease quantity"
                      >
                        <Minus size={13} />
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() =>
                          updateCartQuantity(item.product.id, item.selectedColor.name, 1)
                        }
                        aria-label="Increase quantity"
                      >
                        <Plus size={13} />
                      </button>
                    </div>

                    <div className="item-subtotal">
                      ${(item.product.price * item.quantity).toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Summary */}
        {cart.length > 0 && (
          <div className="cart-footer">
            {/* Promo Code Form */}
            <form className="promo-form" onSubmit={handleApplyPromo}>
              <div className="promo-input-wrap">
                <Tag size={15} className="promo-icon" />
                <input
                  type="text"
                  placeholder="Promo code (try WOODSHOP10)"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                />
              </div>
              <button type="submit" className="promo-btn">
                Apply
              </button>
            </form>
            {promoMessage && (
              <span className={`promo-msg ${appliedDiscount > 0 ? 'success' : 'error'}`}>
                {promoMessage}
              </span>
            )}

            {/* Calculations */}
            <div className="cart-summary-lines">
              <div className="summary-line">
                <span>Subtotal</span>
                <span>${cartSubtotal.toLocaleString()}</span>
              </div>
              {appliedDiscount > 0 && (
                <div className="summary-line discount-line">
                  <span>Discount (10%)</span>
                  <span>-${discountAmount.toLocaleString()}</span>
                </div>
              )}
              <div className="summary-line">
                <span>White-Glove Shipping</span>
                <span>{shippingCost === 0 ? 'FREE' : `$${shippingCost}`}</span>
              </div>
              <div className="summary-line total-line">
                <span>Estimated Total</span>
                <span>${finalTotal.toLocaleString()}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              className="checkout-btn"
              onClick={handleCheckout}
              id="proceed-checkout-btn"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight size={18} />
            </button>

            <div className="checkout-trust">
              <ShieldCheck size={14} />
              <span>256-Bit SSL Encrypted &amp; Free 30-Day Returns</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
