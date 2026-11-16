import React, { useRef, useMemo, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { useShowroom } from '../../context/ShowroomContext';

export function Sofa({ position = [-3.6, 0, 0.4] }) {
  const groupRef = useRef();
  const {
    selectedProductId,
    hoveredProductId,
    setHoveredProductId,
    focusProduct,
    colorVariants,
  } = useShowroom();

  const isSelected = selectedProductId === 'sofa';
  const isHovered = hoveredProductId === 'sofa';
  const selectedColor = colorVariants.sofa ? colorVariants.sofa.hex : '#d9d0c1';

  // Load actual ready-made Poly Haven 3D Sofa model with 1K PBR textures
  const { scene } = useGLTF('/models/sofa_02/sofa_02.gltf');
  const model = useMemo(() => scene.clone(true), [scene]);

  // Enable shadows and apply real-time color tint to fabric
  useEffect(() => {
    model.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        if (child.material) {
          // Clone material so color tint doesn't affect other instances
          child.material = child.material.clone();
          child.material.color.set(selectedColor);
          child.material.needsUpdate = true;
        }
      }
    });
  }, [model, selectedColor]);

  // Subtle interactive hover breathing effect
  useFrame((state, delta) => {
    if (groupRef.current && (isSelected || isHovered)) {
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, 0.04, delta * 6);
    } else if (groupRef.current) {
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, 0, delta * 6);
    }
  });

  return (
    <group
      ref={groupRef}
      position={position}
      onClick={(e) => {
        e.stopPropagation();
        focusProduct('sofa');
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHoveredProductId('sofa');
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        setHoveredProductId(null);
        document.body.style.cursor = 'auto';
      }}
    >
      {/* Selection Glow Ring */}
      {isSelected && (
        <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[1.3, 1.48, 48]} />
          <meshBasicMaterial color="#dfa04c" transparent opacity={0.65} side={THREE.DoubleSide} />
        </mesh>
      )}

      {/* Realistic 3D Model with PBR upholstery fabric and cushions */}
      <primitive
        object={model}
        scale={[1.18, 1.18, 1.18]}
        position={[0, 0, 0]}
      />
    </group>
  );
}

useGLTF.preload('/models/sofa_02/sofa_02.gltf');
