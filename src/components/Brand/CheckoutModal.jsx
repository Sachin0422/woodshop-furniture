import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { CheckCircle2, Calendar, MapPin, PackageCheck, ArrowRight, X } from 'lucide-react';

export function CheckoutModal({ isOpen, onClose, cart }) {
  useEffect(() => {
    if (isOpen) {
      confetti({
        particleCount: 70,
        spread: 65,
        origin: { y: 0.55 },
        colors: ['#c27b38', '#3e2b20', '#d4af37', '#e8e4dc'],
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const inquiryCode = 'WSH-ACQ-' + Math.floor(10000 + Math.random() * 90000);

  return (
    <div className="checkout-modal-overlay" onClick={onClose}>
      <div className="checkout-modal-card" onClick={(e) => e.stopPropagation()}>
        <button
          className="modal-dismiss-btn"
          onClick={onClose}
          aria-label="Close inquiry window"
        >
          <X size={20} />
        </button>

        <div className="checkout-badge-wrap">
          <CheckCircle2 size={44} className="gold-success-icon" />
        </div>

        <span className="inquiry-ref-pill">Inquiry Confirmed • {inquiryCode}</span>
        <h2 className="inquiry-title">Your Architectural Vision Begins</h2>
        <p className="inquiry-desc">
          Thank you for your interest in WOODSHOP. Our senior interior architectural concierge
          has received your curated selection and will coordinate complimentary material swatches.
        </p>

        {/* Schedule & Consultation Details */}
        <div className="inquiry-service-box">
          <div className="service-row">
            <PackageCheck size={18} className="service-icon" />
            <div>
              <strong>Material Sample Box Dispatched</strong>
              <span>Hand-cut walnut, oak blocks and woven textile swatches sent within 48 hours.</span>
            </div>
          </div>
          <div className="service-row">
            <Calendar size={18} className="service-icon" />
            <div>
              <strong>Design Concierge Review</strong>
              <span>An architect will connect with you to review spatial dimensions and finishes.</span>
            </div>
          </div>
        </div>

        {/* Selected Pieces Preview */}
        <div className="inquiry-items-summary">
          <span className="inquiry-items-label">Selected Portfolio Pieces:</span>
          <div className="inquiry-chips-wrap">
            {cart.map((item, idx) => (
              <span key={idx} className="inquiry-chip">
                {item.quantity}× {item.product.name} ({item.finish.name})
              </span>
            ))}
          </div>
        </div>

        <button className="inquiry-finish-btn" onClick={onClose}>
          <span>Continue Exploring Collections</span>
          <ArrowRight size={17} />
        </button>
      </div>
    </div>
  );
}
