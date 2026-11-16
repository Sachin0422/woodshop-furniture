import React, { useState, useEffect, useRef } from 'react';
import { ShoppingBag, Menu, X, ArrowUpRight, ChevronDown, ArrowRight, Sparkles } from 'lucide-react';
import { COLLECTIONS } from '../../data/woodshopData';

const COLLECTION_METAS = {
  all: {
    desc: 'Complete 2026 architectural catalogue',
    badge: 'All Pieces',
  },
  living: {
    desc: 'Modular sectionals, sculpted armchairs & tables',
    badge: 'Signature',
  },
  dining: {
    desc: 'Monolithic fluted walnut tables & bouclé chairs',
    badge: 'New Edition',
  },
  bedroom: {
    desc: 'Cantilever platform beds & floating ledges',
    badge: 'Ryokan Series',
  },
  office: {
    desc: 'Solid walnut executive desks & storage millwork',
    badge: 'Atelier',
  },
  lighting: {
    desc: 'Spun solid brass fixtures & marble pedestals',
    badge: 'Ambient Edit',
  },
};

export function Header({ cartCount, onOpenCart, onSelectCategory }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileCollectionsExpanded, setMobileCollectionsExpanded] = useState(false);
  
  const dropdownRef = useRef(null);
  const closeTimerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle outside click to close dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMouseEnter = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
    }
    setDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    closeTimerRef.current = setTimeout(() => {
      setDropdownOpen(false);
    }, 180);
  };

  const handleSelectCategory = (catId, e) => {
    if (e) e.preventDefault();
    setDropdownOpen(false);
    setMobileMenuOpen(false);
    if (onSelectCategory) {
      onSelectCategory(catId);
    }
    const collectionEl = document.getElementById('collection');
    if (collectionEl) {
      collectionEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    setDropdownOpen(false);
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`luxury-header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header-inner">
        {/* Mobile Hamburger */}
        <button
          className="mobile-menu-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        {/* Primary Desktop Navigation */}
        <nav className="desktop-nav">
          {/* Collections Dropdown Anchor */}
          <div
            className="nav-item-dropdown"
            ref={dropdownRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <button
              className={`nav-link dropdown-trigger-btn ${dropdownOpen ? 'dropdown-active' : ''}`}
              onClick={() => setDropdownOpen(!dropdownOpen)}
              aria-expanded={dropdownOpen}
              aria-haspopup="true"
            >
              <span>Collections</span>
              <ChevronDown
                size={14}
                className={`dropdown-chevron ${dropdownOpen ? 'rotated' : ''}`}
              />
            </button>

            {/* Dropdown Menu Panel */}
            <div className={`collections-dropdown-panel ${dropdownOpen ? 'open' : ''}`}>
              <div className="dropdown-panel-grid">
                {/* Left: Curated Categories List */}
                <div className="dropdown-categories-col">
                  <div className="dropdown-section-header">
                    <span className="dropdown-eyebrow">Explore Collections</span>
                    <span className="dropdown-count">{COLLECTIONS.length} Departments</span>
                  </div>

                  <div className="dropdown-categories-list">
                    {COLLECTIONS.map((col) => {
                      const meta = COLLECTION_METAS[col.id] || { desc: '', badge: '' };
                      return (
                        <div
                          key={col.id}
                          className="dropdown-cat-item"
                          onClick={(e) => handleSelectCategory(col.id, e)}
                        >
                          <div className="cat-item-content">
                            <div className="cat-item-title-row">
                              <span className="cat-item-name">{col.name}</span>
                              {meta.badge && (
                                <span className="cat-item-badge">{meta.badge}</span>
                              )}
                            </div>
                            <span className="cat-item-desc">{meta.desc}</span>
                          </div>
                          <ArrowRight size={14} className="cat-item-arrow" />
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Right: Featured Campaign Visual Card */}
                <div className="dropdown-feature-col">
                  <div
                    className="dropdown-feature-card"
                    onClick={(e) => handleSelectCategory('living', e)}
                  >
                    <div className="dropdown-feature-img-box">
                      <img
                        src="/images/prod_sofa.jpg"
                        alt="Nordic Haven Modular Sectional"
                        className="dropdown-feature-img"
                      />
                      <span className="feature-card-pill">
                        <Sparkles size={11} />
                        <span>Iconic Centerpiece</span>
                      </span>
                    </div>

                    <div className="dropdown-feature-info">
                      <span className="feature-sub">The Living Room Edit</span>
                      <h4 className="feature-title">Nordic Haven Modular Sectional</h4>
                      <p className="feature-desc">
                        Hand-waxed FSC European White Oak plinth with Belgian heavy linen weave.
                      </p>
                      <span className="feature-link">
                        <span>View Sectional Specifications</span>
                        <ArrowRight size={13} />
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Quick Bar */}
              <div className="dropdown-footer-bar">
                <span className="dropdown-footer-text">
                  ✨ Handcrafted to architectural specifications. White-Glove delivery included globally.
                </span>
                <a
                  href="#collection"
                  onClick={(e) => handleSelectCategory('all', e)}
                  className="dropdown-footer-link"
                >
                  <span>View All 2026 Pieces</span>
                  <ArrowRight size={13} />
                </a>
              </div>
            </div>
          </div>

          <a
            href="#walkthrough"
            onClick={(e) => handleLinkClick(e, '#walkthrough')}
            className="nav-link"
          >
            <span>Architectural Walkthrough</span>
          </a>

          <a
            href="#craftsmanship"
            onClick={(e) => handleLinkClick(e, '#craftsmanship')}
            className="nav-link"
          >
            <span>Craftsmanship</span>
          </a>

          <a
            href="#ateliers"
            onClick={(e) => handleLinkClick(e, '#ateliers')}
            className="nav-link"
          >
            <span>Ateliers</span>
          </a>
        </nav>

        {/* Central Brand Identity */}
        <div
          className="brand-logo"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <span className="logo-main">WOODSHOP</span>
          <span className="logo-sub">HOME &amp; DÉCOR</span>
        </div>

        {/* Secondary Actions */}
        <div className="header-actions">
          <a
            href="#collection"
            onClick={(e) => handleSelectCategory('all', e)}
            className="action-link-catalog"
          >
            <span>Catalogue</span>
            <ArrowUpRight size={14} />
          </a>

          <button
            className="cart-trigger-btn"
            onClick={onOpenCart}
            aria-label="View curated bag"
          >
            <ShoppingBag size={18} />
            <span className="cart-label">Bag</span>
            {cartCount > 0 && <span className="cart-count-pill">{cartCount}</span>}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="mobile-nav-drawer">
          <nav className="mobile-nav-links">
            {/* Mobile Collections Expandable Accordion */}
            <div className="mobile-coll-accordion">
              <button
                className="mobile-coll-accordion-header"
                onClick={() => setMobileCollectionsExpanded(!mobileCollectionsExpanded)}
              >
                <span>Collections</span>
                <ChevronDown
                  size={16}
                  className={`accordion-chevron ${mobileCollectionsExpanded ? 'rotated' : ''}`}
                />
              </button>

              {mobileCollectionsExpanded && (
                <div className="mobile-coll-sublinks">
                  {COLLECTIONS.map((col) => (
                    <button
                      key={col.id}
                      className="mobile-sublink-btn"
                      onClick={(e) => handleSelectCategory(col.id, e)}
                    >
                      <span>{col.name}</span>
                      <ArrowRight size={13} />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <a
              href="#walkthrough"
              onClick={(e) => handleLinkClick(e, '#walkthrough')}
              className="mobile-nav-link"
            >
              Architectural Walkthrough
            </a>

            <a
              href="#craftsmanship"
              onClick={(e) => handleLinkClick(e, '#craftsmanship')}
              className="mobile-nav-link"
            >
              Craftsmanship
            </a>

            <a
              href="#ateliers"
              onClick={(e) => handleLinkClick(e, '#ateliers')}
              className="mobile-nav-link"
            >
              Ateliers
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
