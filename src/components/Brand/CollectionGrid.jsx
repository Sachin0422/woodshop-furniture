import React, { useState } from 'react';
import { COLLECTIONS, CATALOG_PRODUCTS } from '../../data/woodshopData';
import { ShoppingBag, Eye, Plus, Check } from 'lucide-react';

export function CollectionGrid({ onSelectProduct, onAddToCart, selectedCategory, onSelectCategory }) {
  const [activeCategory, setActiveCategory] = useState(selectedCategory || 'all');
  const [addedNoticeId, setAddedNoticeId] = useState(null);

  const filteredProducts = activeCategory === 'all'
    ? CATALOG_PRODUCTS
    : CATALOG_PRODUCTS.filter((p) => p.collection === activeCategory);

  const handleQuickAdd = (product, e) => {
    e.stopPropagation();
    onAddToCart(product, product.finishes[0]);
    setAddedNoticeId(product.id);
    setTimeout(() => setAddedNoticeId(null), 1800);
  };

  const handleCategoryClick = (catId) => {
    setActiveCategory(catId);
    if (onSelectCategory) {
      onSelectCategory(catId);
    }
  };

  return (
    <section id="collection" className="collection-section">
      <div className="collection-header-wrapper">
        <span className="section-eyebrow">The 2026 Catalogue</span>
        <h2 className="section-main-heading">Curated Furniture Collection</h2>
        <p className="section-sub-desc">
          Each piece is proportioned for architectural clarity and built to order using sustainably
          sourced hardwoods, tailored upholstery, and hand-finished brass fittings.
        </p>

        {/* Collection Filter Tabs */}
        <div className="collection-tabs-bar">
          {COLLECTIONS.map((col) => (
            <button
              key={col.id}
              className={`coll-tab-btn ${activeCategory === col.id ? 'active' : ''}`}
              onClick={() => handleCategoryClick(col.id)}
            >
              {col.name}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Luxury Furniture Cards */}
      <div className="product-cards-grid">
        {filteredProducts.map((product) => {
          const isJustAdded = addedNoticeId === product.id;
          return (
            <div
              key={product.id}
              className="furniture-card"
              onClick={() => onSelectProduct(product)}
            >
              {/* Product Visual Frame */}
              <div className="card-image-box">
                <img
                  src={product.image}
                  alt={product.name}
                  className="card-img"
                  loading="lazy"
                />
                <span className="card-tag">{product.tag}</span>

                {/* Hover Quick Actions */}
                <div className="card-hover-actions">
                  <button
                    className="quick-view-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectProduct(product);
                    }}
                    title="View details"
                  >
                    <Eye size={16} />
                    <span>View Specifications</span>
                  </button>
                </div>
              </div>

              {/* Card Meta */}
              <div className="card-info">
                <span className="card-collection-label">{product.collectionName}</span>
                <h3 className="card-title">{product.name}</h3>

                {/* Finishes Swatch Dots */}
                <div className="card-swatches-row">
                  {product.finishes.map((f) => (
                    <span
                      key={f.name}
                      className="card-swatch-dot"
                      style={{ backgroundColor: f.hex }}
                      title={f.name}
                    ></span>
                  ))}
                  <span className="swatches-count">
                    {product.finishes.length} Finishes
                  </span>
                </div>

                {/* Price Row with Explicit Placeholder Notice */}
                <div className="card-price-row">
                  <div className="price-stack">
                    <span className="card-price">{product.priceEstimate}</span>
                    <span className="price-placeholder-badge">Estimated MSRP · Placeholder</span>
                  </div>

                  <button
                    className={`card-add-btn ${isJustAdded ? 'added' : ''}`}
                    onClick={(e) => handleQuickAdd(product, e)}
                    aria-label={`Add ${product.name} to bag`}
                  >
                    {isJustAdded ? (
                      <>
                        <Check size={15} />
                        <span>Added</span>
                      </>
                    ) : (
                      <>
                        <Plus size={15} />
                        <span>Add</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Legal & Transparent Inventory Disclaimer */}
      <div className="catalog-disclaimer-banner">
        <span>
          ℹ️ <strong>Pricing Transparency:</strong> Prices indicated above are preliminary architectural placeholder estimates for demonstration. Formal quotes are provided upon timber and upholstery selection at our regional ateliers.
        </span>
      </div>
    </section>
  );
}
