import React, { useState, useEffect } from 'react';
import { X, Check, ShieldCheck, Truck, ShoppingBag, Eye } from 'lucide-react';

export function ProductModal({ product, onClose, onAddToCart }) {
  const [selectedFinish, setSelectedFinish] = useState(null);
  const [viewMode, setViewMode] = useState('studio'); // 'studio' or 'in-situ'
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  // Sync selectedFinish whenever product opens/changes
  useEffect(() => {
    if (product && product.finishes && product.finishes.length > 0) {
      setSelectedFinish(product.finishes[0]);
    }
  }, [product]);

  if (!product) return null;

  const activeFinish = selectedFinish || (product.finishes && product.finishes[0]) || { name: 'Natural', hex: '#ccc' };

  const displayImage = viewMode === 'in-situ' && product.heroSceneImage
    ? product.heroSceneImage
    : product.image;

  const handleAdd = () => {
    onAddToCart(product, activeFinish, quantity);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="product-modal-backdrop" onClick={onClose}>
      <div className="product-modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button
          className="modal-close-icon-btn"
          onClick={onClose}
          aria-label="Close modal"
        >
          <X size={22} />
        </button>

        {/* Modal Layout: 2 Columns */}
        <div className="modal-content-grid">
          {/* Left: Imagery Column with View Switcher */}
          <div className="modal-imagery-col">
            <div className="modal-image-wrapper">
              <img
                src={displayImage}
                alt={product.name}
                className="modal-main-img"
              />
              <span className="modal-img-tag">{product.tag}</span>

              {/* View Switcher: Studio vs In-Situ Architectural Scene */}
              {product.heroSceneImage && (
                <div className="modal-view-switcher">
                  <button
                    className={`view-toggle-btn ${viewMode === 'studio' ? 'active' : ''}`}
                    onClick={() => setViewMode('studio')}
                  >
                    <span>Studio View</span>
                  </button>
                  <button
                    className={`view-toggle-btn ${viewMode === 'in-situ' ? 'active' : ''}`}
                    onClick={() => setViewMode('in-situ')}
                  >
                    <Eye size={13} />
                    <span>In Architectural Space</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Right: Specifications & Purchasing Column */}
          <div className="modal-details-col">
            <span className="modal-collection-category">{product.collectionName}</span>
            <h2 className="modal-product-title">{product.name}</h2>

            {/* Pricing Stack with Explicit Placeholder Annotation */}
            <div className="modal-pricing-stack">
              <span className="modal-price-number">{product.priceEstimate}</span>
              <span className="modal-price-note">
                (Estimated MSRP · Placeholder Price for Portfolio Display)
              </span>
            </div>

            {/* Editorial Description */}
            <p className="modal-product-desc">{product.description}</p>

            {/* Finish Selector */}
            <div className="modal-finish-section">
              <div className="finish-header-row">
                <span className="finish-label">Select Finish &amp; Upholstery:</span>
                <span className="finish-current-name">{activeFinish.name}</span>
              </div>
              <div className="finish-swatches-list">
                {product.finishes.map((f) => {
                  const isSelected = activeFinish.name === f.name;
                  return (
                    <button
                      key={f.name}
                      className={`finish-swatch-circle ${isSelected ? 'selected' : ''}`}
                      style={{ backgroundColor: f.hex }}
                      onClick={() => setSelectedFinish(f)}
                      title={f.name}
                    >
                      {isSelected && <Check size={14} className="finish-check-icon" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Dimensions & Material Specs Table */}
            <div className="modal-specs-table">
              <div className="spec-item">
                <span className="spec-k">Dimensions</span>
                <span className="spec-v">{product.dimensions}</span>
              </div>
              <div className="spec-item">
                <span className="spec-k">Materials</span>
                <span className="spec-v">{product.materials}</span>
              </div>
            </div>

            {/* Feature Bullets */}
            <div className="modal-features-list">
              {product.features.map((feat, fIdx) => (
                <div key={fIdx} className="feature-bullet-row">
                  <Check size={14} className="feature-check" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>

            {/* Guarantees */}
            <div className="modal-guarantees">
              <div className="m-guarantee">
                <Truck size={15} />
                <span>Complimentary White-Glove Placement</span>
              </div>
              <div className="m-guarantee">
                <ShieldCheck size={15} />
                <span>10-Year Master Joinery Warranty</span>
              </div>
            </div>

            {/* Purchase Row */}
            <div className="modal-purchase-row">
              <div className="modal-qty-picker">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="qty-btn"
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="qty-val">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="qty-btn"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              <button
                className={`modal-add-to-bag-btn ${added ? 'added' : ''}`}
                onClick={handleAdd}
              >
                {added ? (
                  <>
                    <Check size={18} />
                    <span>Added to Curated Bag</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag size={18} />
                    <span>Add to Curated Bag</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
