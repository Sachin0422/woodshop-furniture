import React, { useRef, useMemo, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { useShowroom } from '../../context/ShowroomContext';

export function Armchair({ position = [-1.6, 0, 1.6], rotation = [0, -Math.PI / 4, 0] }) {
  const groupRef = useRef();
  const {
    selectedProductId,
    hoveredProductId,
    setHoveredProductId,
    focusProduct,
    colorVariants,
  } = useShowroom();

  const isSelected = selectedProductId === 'armchair';
  const isHovered = hoveredProductId === 'armchair';
  const selectedColor = colorVariants.armchair ? colorVariants.armchair.hex : '#a25b2f';

  // Load actual ready-made Poly Haven 3D Armchair model with 1K PBR textures
  const { scene } = useGLTF('/models/ArmChair_01/ArmChair_01.gltf');
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
        focusProduct('armchair');
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHoveredProductId('armchair');
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
          <ringGeometry args={[0.7, 0.85, 36]} />
          <meshBasicMaterial color="#dfa04c" transparent opacity={0.65} side={THREE.DoubleSide} />
        </mesh>
      )}

      {/* Realistic 3D Armchair Model */}
      <primitive
        object={model}
        scale={[1.05, 1.05, 1.05]}
        position={[0, 0, 0]}
      />
    </group>
  );
}

useGLTF.preload('/models/ArmChair_01/ArmChair_01.gltf');
