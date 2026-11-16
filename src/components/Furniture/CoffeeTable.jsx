import React, { useRef, useMemo, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { useShowroom } from '../../context/ShowroomContext';

export function CoffeeTable({ position = [-3.6, 0, 1.8] }) {
  const groupRef = useRef();
  const {
    selectedProductId,
    hoveredProductId,
    setHoveredProductId,
    focusProduct,
    colorVariants,
  } = useShowroom();

  const isSelected = selectedProductId === 'coffee-table';
  const isHovered = hoveredProductId === 'coffee-table';
  const selectedColor = colorVariants['coffee-table'] ? colorVariants['coffee-table'].hex : '#5c4033';

  // Load actual ready-made Poly Haven 3D Coffee Table model with natural wood grain
  const { scene } = useGLTF('/models/CoffeeTable_01/CoffeeTable_01.gltf');
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
      onClick={(e) => {
        e.stopPropagation();
        focusProduct('coffee-table');
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHoveredProductId('coffee-table');
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
          <ringGeometry args={[0.85, 1.05, 36]} />
          <meshBasicMaterial color="#dfa04c" transparent opacity={0.65} side={THREE.DoubleSide} />
        </mesh>
      )}

      {/* Realistic 3D Coffee Table Model with authentic wood grain */}
      <primitive
        object={model}
        scale={[0.95, 0.95, 0.95]}
        position={[0, 0, 0]}
      />
    </group>
  );
}

useGLTF.preload('/models/CoffeeTable_01/CoffeeTable_01.gltf');
