import React, { useState } from 'react';
import { WALKTHROUGH_SCENES } from '../../data/woodshopData';
import { ArrowRight, Eye } from 'lucide-react';

export function Walkthrough({ onSelectCategory }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const activeScene = WALKTHROUGH_SCENES[activeIdx];

  const handleExploreScene = (sceneId) => {
    if (onSelectCategory) {
      onSelectCategory(sceneId);
    }
    const collectionEl = document.getElementById('collection');
    if (collectionEl) {
      collectionEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="walkthrough" className="walkthrough-section">
      <div className="section-header-wrap">
        <span className="section-eyebrow">Architectural Journey</span>
        <h2 className="section-main-heading">A Walkthrough in Four Acts</h2>
        <p className="section-sub-desc">
          Experience our furniture collection situated inside thoughtfully composed architectural
          volumes. Notice the play of warm morning light, natural textures, and generous proportions.
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="walkthrough-nav-tabs">
        {WALKTHROUGH_SCENES.map((scene, idx) => {
          const isActive = idx === activeIdx;
          return (
            <button
              key={scene.id}
              className={`wt-tab ${isActive ? 'active' : ''}`}
              onClick={() => setActiveIdx(idx)}
            >
              <span className="wt-tab-num">{scene.number}</span>
              <span className="wt-tab-name">{scene.subtitle}</span>
            </button>
          );
        })}
      </div>

      {/* Main Photographic Walkthrough Canvas */}
      <div className="walkthrough-canvas-card">
        {/* Full Image */}
        <div className="wt-image-viewport">
          <img
            key={activeScene.id}
            src={activeScene.image}
            alt={activeScene.title}
            className="wt-main-image"
          />
          <div className="wt-image-gradient"></div>

          {/* Floating Department Tag */}
          <div className="wt-space-tag">
            <span className="tag-index">Act {activeScene.number}</span>
            <span className="tag-name">{activeScene.subtitle}</span>
          </div>
        </div>

        {/* Editorial Text Card */}
        <div className="wt-editorial-panel">
          <span className="wt-scene-counter">Scene {activeScene.number} of 04</span>
          <h3 className="wt-scene-title">{activeScene.title}</h3>
          <p className="wt-scene-body">{activeScene.description}</p>

          <div className="wt-pieces-section">
            <span className="wt-pieces-label">Pieces in this space:</span>
            <ul className="wt-pieces-list">
              {activeScene.featureProducts.map((prod, pIdx) => (
                <li key={pIdx} className="wt-piece-item">
                  <span className="piece-bullet">•</span>
                  <span>{prod}</span>
                </li>
              ))}
            </ul>
          </div>

          <button
            className="wt-action-btn"
            onClick={() => handleExploreScene(activeScene.id)}
          >
            <span>Explore {activeScene.subtitle} Pieces</span>
            <ArrowRight size={17} />
          </button>
        </div>
      </div>
    </section>
  );
}
