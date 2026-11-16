import React, { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useShowroom } from '../../context/ShowroomContext';

export function Nightstand({ position = [2.2, 0, 0.8], rotation = [0, 0, 0] }) {
  const groupRef = useRef();
  const {
    selectedProductId,
    hoveredProductId,
    setHoveredProductId,
    focusProduct,
    colorVariants,
  } = useShowroom();

  const isSelected = selectedProductId === 'nightstand';
  const isHovered = hoveredProductId === 'nightstand';
  const finishColor = colorVariants.nightstand ? colorVariants.nightstand.hex : '#b08354';

  useFrame((state, delta) => {
    if (groupRef.current && (isSelected || isHovered)) {
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, 0.03, delta * 6);
    } else if (groupRef.current) {
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, 0, delta * 6);
    }
  });

  return (
    <group
      ref={groupRef}
      position={position}
      rotation={rotation}
      onClick={(e) => {
        e.stopPropagation();
        focusProduct('nightstand');
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHoveredProductId('nightstand');
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        setHoveredProductId(null);
        document.body.style.cursor = 'auto';
      }}
    >
      {/* Selection Glow */}
      {isSelected && (
        <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.38, 0.48, 32]} />
          <meshBasicMaterial color="#dfa04c" transparent opacity={0.6} side={THREE.DoubleSide} />
        </mesh>
      )}

      {/* Main Nightstand Body */}
      <mesh position={[0, 0.28, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.5, 0.32, 0.42]} />
        <meshStandardMaterial color={finishColor} roughness={0.4} metalness={0.05} />
      </mesh>

      {/* Fluted Drawer Detail */}
      <mesh position={[0, 0.31, 0.212]} castShadow>
        <boxGeometry args={[0.46, 0.22, 0.01]} />
        <meshStandardMaterial color={finishColor} roughness={0.35} />
      </mesh>

      {/* Brass Pull Handle */}
      <mesh position={[0, 0.31, 0.225]} castShadow>
        <cylinderGeometry args={[0.014, 0.014, 0.08, 16]} rotation={[0, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#d4af37" metalness={0.85} roughness={0.2} />
      </mesh>

      {/* 4 Minimalist Spindle Legs */}
      {[
        [-0.2, -0.16],
        [0.2, -0.16],
        [-0.2, 0.16],
        [0.2, 0.16],
      ].map(([lx, lz], i) => (
        <mesh key={`ns-leg-${i}`} position={[lx, 0.06, lz]} castShadow>
          <cylinderGeometry args={[0.014, 0.01, 0.12, 12]} />
          <meshStandardMaterial color="#222222" roughness={0.5} />
        </mesh>
      ))}

      {/* Glass Bedside Water Carafe & Tumbler on Top */}
      <group position={[-0.1, 0.45, 0]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.035, 0.045, 0.14, 16]} />
          <meshPhysicalMaterial
            roughness={0.05}
            transmission={0.92}
            thickness={0.05}
            transparent
            opacity={0.65}
            color="#d8ebfa"
          />
        </mesh>
        <mesh position={[0.12, -0.03, 0.04]} castShadow>
          <cylinderGeometry args={[0.028, 0.022, 0.08, 16]} />
          <meshPhysicalMaterial
            roughness={0.05}
            transmission={0.92}
            thickness={0.04}
            transparent
            opacity={0.6}
            color="#d8ebfa"
          />
        </mesh>
      </group>
    </group>
  );
}
