import React, { useState } from 'react';
import { Html } from '@react-three/drei';
import { useShowroom } from '../../context/ShowroomContext';

export function HotspotMarker({ product, position }) {
  const [isHovered, setIsHovered] = useState(false);
  const { focusProduct, selectedProductId, hoveredProductId } = useShowroom();

  const isSelected = selectedProductId === product.id;
  const isGlobalHovered = hoveredProductId === product.id;

  return (
    <Html position={position} center distanceFactor={7}>
      <div
        className={`hotspot-tag ${isHovered || isSelected || isGlobalHovered ? 'active' : ''}`}
        onClick={(e) => {
          e.stopPropagation();
          focusProduct(product.id);
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <span className="hotspot-pulse"></span>
        <span className="hotspot-dot"></span>
        <div className="hotspot-tooltip">
          <span className="hotspot-title">{product.name.split(' ')[0]} {product.category}</span>
          <span className="hotspot-price">${product.price}</span>
        </div>
      </div>
    </Html>
  );
}
