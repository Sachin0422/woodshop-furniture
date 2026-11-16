import React, { useMemo } from 'react';
import { useGLTF } from '@react-three/drei';

export function PendantChandelier({ position = [0, 4.4, 0] }) {
  const { scene } = useGLTF('/models/Chandelier_01/Chandelier_01.gltf');
  const model = useMemo(() => {
    const clone = scene.clone(true);
    clone.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
      }
    });
    return clone;
  }, [scene]);

  return (
    <group position={position}>
      <primitive object={model} scale={[0.8, 0.8, 0.8]} />
      {/* Warm downward showroom ambient light */}
      <pointLight position={[0, -0.6, 0]} color="#ffe8c7" intensity={1.1} distance={8} />
    </group>
  );
}

useGLTF.preload('/models/Chandelier_01/Chandelier_01.gltf');
