import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';

export function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail('');
        setSubscribed(false);
      }, 3500);
    }
  };

  return (
    <footer id="ateliers" className="luxury-footer">
      <div className="footer-top-container">
        {/* Brand Manifesto */}
        <div className="footer-brand-col">
          <div className="footer-logo">
            <span className="logo-main">WOODSHOP</span>
            <span className="logo-sub">HOME &amp; DÉCOR</span>
          </div>
          <p className="footer-manifesto">
            Dedicated to the quiet poetry of solid timber, architectural proportions, and
            unhurried craft. Designed in Europe and North America; tailored for generational residences worldwide.
          </p>
          <div className="footer-cert-tags">
            <span className="cert-tag">FSC® C108239 Certified Timber</span>
            <span className="cert-tag">Zero Synthetic Finishes</span>
          </div>
        </div>

        {/* Global Ateliers */}
        <div className="footer-ateliers-col">
          <h4 className="footer-col-title">Flagship Ateliers</h4>
          <ul className="atelier-list">
            <li>
              <strong>Milan</strong>
              <span>Via Montenapoleone 18, Quadrilatero</span>
            </li>
            <li>
              <strong>Copenhagen</strong>
              <span>Bredgade 32, Design District</span>
            </li>
            <li>
              <strong>Tokyo</strong>
              <span>5-Chome Minami-Aoyama, Minato-ku</span>
            </li>
            <li>
              <strong>New York</strong>
              <span>Franklin Street, Tribeca</span>
            </li>
          </ul>
        </div>

        {/* Private Newsletter */}
        <div className="footer-newsletter-col">
          <h4 className="footer-col-title">Private Previews</h4>
          <p className="newsletter-desc">
            Receive private exhibition invitations, architectural monographs, and seasonal edition previews.
          </p>
          <form className="newsletter-form" onSubmit={handleSubscribe}>
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" aria-label="Subscribe to newsletter">
              {subscribed ? <Check size={18} /> : <ArrowRight size={18} />}
            </button>
          </form>
          {subscribed && (
            <span className="newsletter-success">
              ✓ Invitation confirmed. Welcome to Woodshop.
            </span>
          )}
        </div>
      </div>

      {/* Footer Bottom Bar */}
      <div className="footer-bottom-bar">
        <span className="copyright-text">
          &copy; {new Date().getFullYear()} WOODSHOP Home &amp; Décor. All rights reserved.
        </span>
        <div className="footer-legal-links">
          <a href="#walkthrough">Architectural Spaces</a>
          <a href="#collection">Curated Catalogue</a>
          <a href="#craftsmanship">Joinery &amp; Timber Care</a>
          <a href="#">Privacy Protocol</a>
        </div>
      </div>
    </footer>
  );
}
