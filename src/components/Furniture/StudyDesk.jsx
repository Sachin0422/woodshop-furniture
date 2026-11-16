import React, { useRef, useMemo, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { useShowroom } from '../../context/ShowroomContext';

export function StudyDesk({ position = [-4.2, 0, -4.8], rotation = [0, 0, 0] }) {
  const groupRef = useRef();
  const deskLightRef = useRef();
  const {
    selectedProductId,
    hoveredProductId,
    setHoveredProductId,
    focusProduct,
    colorVariants,
    lightingMode,
  } = useShowroom();

  const isSelected = selectedProductId === 'study-desk';
  const isHovered = hoveredProductId === 'study-desk';
  const selectedColor = colorVariants['study-desk'] ? colorVariants['study-desk'].hex : '#b88955';

  // Load actual ready-made Poly Haven 3D models: Table, Chair, and Articulated Lamp
  const deskGltf = useGLTF('/models/wooden_table_02/wooden_table_02.gltf');
  const chairGltf = useGLTF('/models/GreenChair_01/GreenChair_01.gltf');
  const lampGltf = useGLTF('/models/desk_lamp_arm_01/desk_lamp_arm_01.gltf');

  const deskModel = useMemo(() => deskGltf.scene.clone(true), [deskGltf.scene]);
  const chairModel = useMemo(() => chairGltf.scene.clone(true), [chairGltf.scene]);
  const lampModel = useMemo(() => lampGltf.scene.clone(true), [lampGltf.scene]);

  useEffect(() => {
    deskModel.traverse((child) => {
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
    chairModel.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
    lampModel.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [deskModel, chairModel, lampModel, selectedColor]);

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
        focusProduct('study-desk');
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHoveredProductId('study-desk');
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
          <ringGeometry args={[1.25, 1.45, 48]} />
          <meshBasicMaterial color="#dfa04c" transparent opacity={0.65} side={THREE.DoubleSide} />
        </mesh>
      )}

      {/* 1. Realistic 3D Solid Timber Desk Table */}
      <primitive
        object={deskModel}
        scale={[1.35, 1.05, 1.25]}
        position={[0, 0, 0]}
      />

      {/* 2. Realistic 3D Designer Chair with fabric cushion */}
      <primitive
        object={chairModel}
        scale={[0.95, 0.95, 0.95]}
        position={[0, 0, 0.72]}
        rotation={[0, Math.PI, 0]}
      />

      {/* 3. Realistic 3D Articulated Metal Desk Lamp on tabletop */}
      <primitive
        object={lampModel}
        scale={[0.55, 0.55, 0.55]}
        position={[0.42, 0.84, -0.15]}
        rotation={[0, -0.6, 0]}
      />

      {/* Warm Task Light radiating from the desk lamp */}
      <pointLight
        ref={deskLightRef}
        position={[0.25, 1.15, 0]}
        color="#ffecd1"
        intensity={lightingMode === 'evening' ? 1.6 : 0.8}
        distance={2.8}
        decay={1.8}
      />
    </group>
  );
}

useGLTF.preload('/models/wooden_table_02/wooden_table_02.gltf');
useGLTF.preload('/models/GreenChair_01/GreenChair_01.gltf');
useGLTF.preload('/models/desk_lamp_arm_01/desk_lamp_arm_01.gltf');
