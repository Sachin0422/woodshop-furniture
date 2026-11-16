import React from 'react';
import {
  ShoppingBag,
  Sun,
  Moon,
  Lightbulb,
  RotateCcw,
  Layers,
} from 'lucide-react';
import { useShowroom } from '../../context/ShowroomContext';
import { DEPARTMENTS } from '../../utils/productsData';

export function Navbar() {
  const {
    cartCount,
    setIsCartOpen,
    lightingMode,
    setLightingMode,
    lampPower,
    setLampPower,
    setPreset,
    inShowroom,
    setInShowroom,
    activeDepartment,
    focusDepartment,
  } = useShowroom();

  return (
    <header className="navbar-container">
      {/* Brand / Logo */}
      <div className="nav-brand" onClick={() => setInShowroom(false)}>
        <span className="brand-icon">🛋️</span>
        <div>
          <h1 className="brand-title">Woodshop</h1>
          <span className="brand-subtitle">Grand 3D Showroom</span>
        </div>
      </div>

      {/* Specific Department Counters (Smooth access to Living, Bedroom, Study, Lighting) */}
      {inShowroom && (
        <div className="nav-categories">
          {DEPARTMENTS.map((dept) => {
            const isActive = activeDepartment === dept.id;
            return (
              <button
                key={dept.id}
                className={`cat-pill ${isActive ? 'active' : ''}`}
                onClick={() => focusDepartment(dept.id)}
                title={`Visit ${dept.name} Counter`}
              >
                <span className="dept-icon">{dept.icon}</span>
                <span>{dept.name}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* Action Controls */}
      <div className="nav-actions">
        {/* Toggle Day / Evening Ambiance */}
        <button
          className={`nav-btn icon-btn ${lightingMode === 'evening' ? 'evening-active' : ''}`}
          onClick={() => setLightingMode(lightingMode === 'day' ? 'evening' : 'day')}
          title={lightingMode === 'day' ? 'Switch to Evening Warm Mode' : 'Switch to Daylight Mode'}
          aria-label="Toggle Lighting"
        >
          {lightingMode === 'day' ? <Sun size={17} /> : <Moon size={17} />}
          <span className="btn-label">{lightingMode === 'day' ? 'Daylight' : 'Evening'}</span>
        </button>

        {/* 3D Lamp Switch */}
        <button
          className={`nav-btn icon-btn ${lampPower ? 'lamp-active' : ''}`}
          onClick={() => setLampPower(!lampPower)}
          title="Toggle Showroom Accent Lighting"
          aria-label="Toggle Lamp"
        >
          <Lightbulb size={17} />
          <span className="btn-label">{lampPower ? 'Lamps On' : 'Lamps Off'}</span>
        </button>

        {/* Reset Camera View */}
        <button
          className="nav-btn icon-btn"
          onClick={() => setPreset('hall-overview')}
          title="Reset to Grand Hall Entrance"
          aria-label="Reset Camera"
        >
          <RotateCcw size={16} />
          <span className="btn-label">Hall View</span>
        </button>

        {/* Shopping Cart Trigger */}
        <button
          className="nav-btn cart-btn"
          onClick={() => setIsCartOpen(true)}
          title="View Shopping Bag"
          aria-label="Shopping Bag"
        >
          <ShoppingBag size={18} />
          <span className="cart-text">Bag</span>
          {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </button>
      </div>
    </header>
  );
}
