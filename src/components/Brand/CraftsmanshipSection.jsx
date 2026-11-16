import React from 'react';
import { ShieldCheck, Trees, Sparkles, Award } from 'lucide-react';

export function CraftsmanshipSection() {
  return (
    <section id="craftsmanship" className="craftsmanship-section">
      <div className="craft-grid-container">
        {/* Left Editorial Visual */}
        <div className="craft-image-col">
          <div className="craft-image-frame">
            <img
              src="/images/craft_heritage.jpg"
              alt="Artisanal mortise-and-tenon joinery with brass inlay"
              className="craft-main-image"
            />
            <div className="craft-image-caption">
              <span className="caption-badge">Macro Detail</span>
              <span>Traditional mortise-and-tenon timber joinery sealed with solid brass key inlay.</span>
            </div>
          </div>
        </div>

        {/* Right Editorial Story */}
        <div className="craft-content-col">
          <span className="section-eyebrow">Material Philosophy</span>
          <h2 className="craft-title">
            Honest Timber. <br />
            <span className="title-serif-italic">Generational</span> Form.
          </h2>
          <p className="craft-lead-text">
            At WOODSHOP, we resist the disposable. Every console, dining table, and bed frame
            originates from carefully seasoned hardwoods, shaped by artisans who honor the natural
            character, tension, and living grain of the tree.
          </p>

          <div className="craft-pillars">
            <div className="pillar-item">
              <div className="pillar-icon-box">
                <Trees size={20} />
              </div>
              <div>
                <h4 className="pillar-heading">FSC-Certified Hardwoods</h4>
                <p className="pillar-desc">
                  Slow-grown European White Oak and American Black Walnut air-dried for 18 months
                  to ensure dimensional stability across seasons.
                </p>
              </div>
            </div>

            <div className="pillar-item">
              <div className="pillar-icon-box">
                <Award size={20} />
              </div>
              <div>
                <h4 className="pillar-heading">Enduring Traditional Joinery</h4>
                <p className="pillar-desc">
                  Interlocking mortise-and-tenon connections reinforced with concealed brass hardware,
                  eliminating synthetic glues and fragile brackets.
                </p>
              </div>
            </div>

            <div className="pillar-item">
              <div className="pillar-icon-box">
                <Sparkles size={20} />
              </div>
              <div>
                <h4 className="pillar-heading">Hand-Rubbed Natural Oils</h4>
                <p className="pillar-desc">
                  Non-toxic vegetable wax oils penetrate the wood grain, imparting a rich tactile matte
                  sheen that deepens in patina over decades of daily touch.
                </p>
              </div>
            </div>
          </div>

          <div className="craft-quote-box">
            <p className="quote-text">
              &ldquo;We do not invent the beauty of the timber; we simply reveal what time has already perfected.&rdquo;
            </p>
            <span className="quote-author">— Henrik Lindqvist, Master Woodworker &amp; Lead Designer</span>
          </div>
        </div>
      </div>
    </section>
  );
}
