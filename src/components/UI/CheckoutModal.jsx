import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { CheckCircle2, PackageCheck, Calendar, ArrowRight, X } from 'lucide-react';
import { useShowroom } from '../../context/ShowroomContext';

export function CheckoutModal() {
  const { isCheckoutModalOpen, setIsCheckoutModalOpen, cart } = useShowroom();

  useEffect(() => {
    if (isCheckoutModalOpen) {
      // Fire confetti burst
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#dfa04c', '#5c3e21', '#7a8b7b', '#b86047'],
      });
    }
  }, [isCheckoutModalOpen]);

  if (!isCheckoutModalOpen) return null;

  const orderNum = 'WSH-' + Math.floor(100000 + Math.random() * 900000);

  return (
    <div className="modal-backdrop" onClick={() => setIsCheckoutModalOpen(false)}>
      <div className="checkout-modal-card" onClick={(e) => e.stopPropagation()}>
        <button
          className="modal-close-btn"
          onClick={() => setIsCheckoutModalOpen(false)}
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        <div className="modal-icon-wrap">
          <CheckCircle2 size={48} className="success-icon" />
        </div>

        <span className="order-pill">Order Confirmed • #{orderNum}</span>
        <h2 className="modal-title">Crafting Your Home Vision</h2>
        <p className="modal-desc">
          Thank you for choosing Woodshop Home &amp; Décor. Our master artisans have received
          your selection and will begin hand-finishing your pieces.
        </p>

        {/* Delivery Details */}
        <div className="order-details-box">
          <div className="order-detail-row">
            <PackageCheck size={18} className="detail-icon" />
            <div>
              <strong>White-Glove Delivery &amp; Assembly</strong>
              <span>Scheduled delivery with in-room assembly &amp; packaging removal.</span>
            </div>
          </div>
          <div className="order-detail-row">
            <Calendar size={18} className="detail-icon" />
            <div>
              <strong>Estimated Arrival</strong>
              <span>November 4 – November 7 (3–5 business days)</span>
            </div>
          </div>
        </div>

        {/* Selected Pieces Preview */}
        <div className="order-pieces-summary">
          <span className="pieces-title">Items in this order:</span>
          <div className="pieces-chips">
            {cart.map((item, idx) => (
              <span key={idx} className="piece-chip">
                {item.quantity}× {item.product.name} ({item.selectedColor.name})
              </span>
            ))}
          </div>
        </div>

        <button
          className="modal-primary-btn"
          onClick={() => setIsCheckoutModalOpen(false)}
        >
          <span>Continue Exploring Showroom</span>
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
