import React, { useRef, useMemo, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { useShowroom } from '../../context/ShowroomContext';

export function PlatformBed({ position = [4.4, 0, 0.8], rotation = [0, 0, 0] }) {
  const groupRef = useRef();
  const {
    selectedProductId,
    hoveredProductId,
    setHoveredProductId,
    focusProduct,
    colorVariants,
  } = useShowroom();

  const isSelected = selectedProductId === 'platform-bed';
  const isHovered = hoveredProductId === 'platform-bed';
  const selectedColor = colorVariants['platform-bed'] ? colorVariants['platform-bed'].hex : '#c29d6d';

  // Load actual ready-made Poly Haven 3D Bed model with 1K PBR textures
  const { scene } = useGLTF('/models/vintage_day_bed/vintage_day_bed.gltf');
  const model = useMemo(() => scene.clone(true), [scene]);

  useEffect(() => {
    model.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        if (child.material) {
          child.material = child.material.clone();
          child.material.color.set(selectedColor);
          child.material.needsUpdate = true;
        }
      }
    });
  }, [model, selectedColor]);

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
      rotation={rotation}
      onClick={(e) => {
        e.stopPropagation();
        focusProduct('platform-bed');
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHoveredProductId('platform-bed');
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
          <ringGeometry args={[1.4, 1.65, 48]} />
          <meshBasicMaterial color="#dfa04c" transparent opacity={0.65} side={THREE.DoubleSide} />
        </mesh>
      )}

      {/* Realistic 3D Bed Model with mattress, detailed headboard & woodwork */}
      <primitive
        object={model}
        scale={[1.2, 1.15, 1.35]}
        position={[0, 0, 0]}
      />
    </group>
  );
}

useGLTF.preload('/models/vintage_day_bed/vintage_day_bed.gltf');
