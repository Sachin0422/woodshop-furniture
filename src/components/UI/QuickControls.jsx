import React from 'react';
import { Compass } from 'lucide-react';
import { useShowroom } from '../../context/ShowroomContext';
import { ROOM_PRESETS } from '../../utils/productsData';

export function QuickControls() {
  const { activePresetId, setPreset, inShowroom } = useShowroom();

  if (!inShowroom) return null;

  return (
    <div className="quick-controls-wrapper">
      <div className="quick-dock">
        <div className="dock-label">
          <Compass size={15} />
          <span>Counters</span>
        </div>
        <div className="preset-buttons">
          {ROOM_PRESETS.map((preset) => {
            const isActive = activePresetId === preset.id;
            return (
              <button
                key={preset.id}
                className={`preset-btn ${isActive ? 'active' : ''}`}
                onClick={() => setPreset(preset.id)}
                title={`Glide camera to ${preset.name}`}
              >
                {preset.badge && <span className="preset-badge">{preset.badge}</span>}
                <span className="preset-title">{preset.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="interaction-hint">
        <span className="hint-mouse">🖱️ Left click + Drag to rotate</span>
        <span className="hint-sep">•</span>
        <span className="hint-mouse">Scroll to zoom</span>
        <span className="hint-sep">•</span>
        <span className="hint-mouse">Click any counter or furniture piece to inspect</span>
      </div>
    </div>
  );
}
