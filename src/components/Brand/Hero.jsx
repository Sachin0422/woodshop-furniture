import React from 'react';
import { ArrowDown, ArrowRight, Compass, Sparkles } from 'lucide-react';

export function Hero() {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero-section">
      {/* Cinematic Full-Bleed Architectural Image Background */}
      <div className="hero-bg-wrapper">
        <img
          src="/images/hero_living.jpg"
          alt="WOODSHOP Luxury Architectural Living Space"
          className="hero-bg-img"
        />
        <div className="hero-overlay-gradient"></div>
      </div>

      {/* Hero Content Layer */}
      <div className="hero-content-container">
        {/* Curated Campaign Pill */}
        <div className="hero-season-pill">
          <span className="pill-dot"></span>
          <span>Architectural Campaign 2026</span>
          <span className="pill-sep">•</span>
          <span className="pill-loc">Milan &amp; Copenhagen</span>
        </div>

        {/* Main Headline */}
        <h1 className="hero-main-title">
          Furniture That <br />
          <span className="title-serif-italic">Defines</span> Your Space.
        </h1>

        {/* Supporting Copy */}
        <p className="hero-subtext">
          Thoughtfully designed furniture for the way you live. Hand-selected European oak,
          sculpted American walnut, and French washed linen woven for generational calm.
        </p>

        {/* Action CTAs */}
        <div className="hero-cta-row">
          <button
            className="hero-btn-primary"
            onClick={() => scrollTo('collection')}
            id="hero-explore-cta"
          >
            <span>Explore Collection</span>
            <ArrowRight size={18} />
          </button>

          <button
            className="hero-btn-secondary"
            onClick={() => scrollTo('craftsmanship')}
            id="hero-discover-cta"
          >
            <span>Discover Woodshop</span>
          </button>
        </div>

        {/* Architectural Vignette Bar */}
        <div className="hero-vignette-bar">
          <div className="vignette-col">
            <span className="v-label">Featured Space</span>
            <span className="v-value">The Grand Atrium Residence</span>
          </div>
          <div className="vignette-sep"></div>
          <div className="vignette-col">
            <span className="v-label">Materials</span>
            <span className="v-value">Quarter-Sawn Oak &amp; Travertine</span>
          </div>
          <div className="vignette-sep"></div>
          <div className="vignette-col">
            <span className="v-label">Craftsmanship</span>
            <span className="v-value">Hand-Waxed Solid Joinery</span>
          </div>
        </div>
      </div>

      {/* Scroll Down Hint */}
      <div
        className="hero-scroll-indicator"
        onClick={() => scrollTo('walkthrough')}
      >
        <span className="scroll-text">Scroll to Walkthrough</span>
        <ArrowDown size={16} className="scroll-arrow-anim" />
      </div>
    </section>
  );
}
