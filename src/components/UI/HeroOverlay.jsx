import React from 'react';
import { ArrowRight, Sparkles, Building2, Bed, Armchair, Laptop, Lamp } from 'lucide-react';
import { useShowroom } from '../../context/ShowroomContext';
import { DEPARTMENTS } from '../../utils/productsData';

export function HeroOverlay() {
  const { setInShowroom, focusDepartment } = useShowroom();

  const handleEnterHall = (deptId = 'all') => {
    setInShowroom(true);
    setTimeout(() => {
      focusDepartment(deptId);
    }, 250);
  };

  const departmentIcons = {
    all: <Building2 size={16} />,
    living: <Armchair size={16} />,
    bedroom: <Bed size={16} />,
    study: <Laptop size={16} />,
    lighting: <Lamp size={16} />,
  };

  return (
    <div className="hero-overlay">
      <div className="hero-glass-card">
        {/* Brand Chip */}
        <div className="hero-pill">
          <Sparkles size={14} className="sparkle-icon" />
          <span>Architectural 3D Grand Hall</span>
        </div>

        {/* Headline */}
        <h1 className="hero-title">
          Explore Our <span className="highlight-text">Grand Showroom</span>
        </h1>

        {/* Subtitle */}
        <p className="hero-desc">
          Step inside our open-concept 3D architectural gallery. Explore dedicated counters for
          <strong> Living Lounges</strong>, <strong>Bedroom Suites</strong>, <strong>Executive Study Workspaces</strong>, and <strong>Designer Lighting</strong> with real-time finishes and natural lighting.
        </p>

        {/* Main CTA Button */}
        <div className="hero-cta-group">
          <button
            className="hero-primary-btn"
            onClick={() => handleEnterHall('all')}
            id="enter-showroom-btn"
          >
            <span>Enter Grand Hall Gallery</span>
            <ArrowRight size={20} className="arrow-icon" />
          </button>
        </div>

        {/* Specific Counter Quick-Teleport Buttons */}
        <div className="hero-quick-jump">
          <span className="jump-label">Direct access to showroom counters:</span>
          <div className="jump-pills">
            {DEPARTMENTS.filter((d) => d.id !== 'all').map((dept) => (
              <button
                key={dept.id}
                className="jump-pill"
                onClick={() => handleEnterHall(dept.id)}
              >
                <span className="pill-icon">{dept.icon}</span>
                <span>{dept.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
