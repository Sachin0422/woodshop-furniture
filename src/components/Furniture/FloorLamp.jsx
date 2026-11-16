import React, { useRef, useMemo, useEffect } from 'react';
import * as THREE from 'three';
import { useGLTF } from '@react-three/drei';
import { useShowroom } from '../../context/ShowroomContext';

export function FloorLamp({ position = [4.5, 0, -5.2], rotation = [0, -Math.PI / 6, 0] }) {
  const groupRef = useRef();
  const {
    selectedProductId,
    hoveredProductId,
    setHoveredProductId,
    focusProduct,
    lampPower,
    lightingMode,
  } = useShowroom();

  const isSelected = selectedProductId === 'lamp';
  const isHovered = hoveredProductId === 'lamp';

  // Load actual ready-made Poly Haven 3D Pendant Chandelier & Industrial Lighting models
  const cagedGltf = useGLTF('/models/caged_hanging_light/caged_hanging_light.gltf');
  const industrialGltf = useGLTF('/models/hanging_industrial_lamp/hanging_industrial_lamp.gltf');

  const cagedModel = useMemo(() => cagedGltf.scene.clone(true), [cagedGltf.scene]);
  const industrialModel = useMemo(() => industrialGltf.scene.clone(true), [industrialGltf.scene]);

  useEffect(() => {
    cagedModel.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
    industrialModel.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [cagedModel, industrialModel]);

  const isGlowing = lampPower;
  const lightIntensity = isGlowing ? (lightingMode === 'evening' ? 2.4 : 1.3) : 0;

  return (
    <group
      ref={groupRef}
      position={position}
      rotation={rotation}
      onClick={(e) => {
        e.stopPropagation();
        focusProduct('lamp');
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHoveredProductId('lamp');
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
          <ringGeometry args={[0.75, 0.95, 36]} />
          <meshBasicMaterial color="#dfa04c" transparent opacity={0.65} side={THREE.DoubleSide} />
        </mesh>
      )}

      {/* Gallery Display Pedestal Plinth */}
      <mesh position={[0, 0.45, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.1, 0.9, 0.8]} />
        <meshStandardMaterial color="#232220" roughness={0.4} metalness={0.4} />
      </mesh>
      <mesh position={[0, 0.91, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.05, 0.02, 0.75]} />
        <meshStandardMaterial color="#d4af37" metalness={0.85} roughness={0.2} />
      </mesh>

      {/* Realistic 3D Designer Cage Lamp Resting on Pedestal */}
      <primitive
        object={cagedModel}
        scale={[0.85, 0.85, 0.85]}
        position={[0, 1.55, 0]}
      />

      {/* Active Light Cast from Lamp */}
      {isGlowing && (
        <pointLight
          position={[0, 1.4, 0]}
          color="#ffbc73"
          intensity={lightIntensity}
          distance={6.5}
          decay={1.8}
          castShadow
          shadow-bias={-0.0005}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
      )}
    </group>
  );
}

useGLTF.preload('/models/caged_hanging_light/caged_hanging_light.gltf');
useGLTF.preload('/models/hanging_industrial_lamp/hanging_industrial_lamp.gltf');
