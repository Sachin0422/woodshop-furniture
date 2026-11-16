import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useThree, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useShowroom } from '../context/ShowroomContext';

export function CameraController() {
  const { camera } = useThree();
  const controlsRef = useRef();
  const { cameraView } = useShowroom();

  const targetPos = useRef(new THREE.Vector3(...cameraView.position));
  const targetLook = useRef(new THREE.Vector3(...cameraView.target));
  const isTransitioning = useRef(false);

  useEffect(() => {
    targetPos.current.set(...cameraView.position);
    targetLook.current.set(...cameraView.target);
    isTransitioning.current = true;
  }, [cameraView]);

  useFrame((state, delta) => {
    if (isTransitioning.current && controlsRef.current) {
      // Smooth natural lerp towards selected zone or object
      camera.position.lerp(targetPos.current, delta * 3.6);
      controlsRef.current.target.lerp(targetLook.current, delta * 3.8);
      controlsRef.current.update();

      // Once arrived within micro threshold, hand back fluid manual orbit control
      if (
        camera.position.distanceTo(targetPos.current) < 0.04 &&
        controlsRef.current.target.distanceTo(targetLook.current) < 0.04
      ) {
        isTransitioning.current = false;
      }
    }
  });

  return (
    <OrbitControls
      ref={controlsRef}
      enableDamping
      dampingFactor={0.06}
      maxPolarAngle={Math.PI / 2 - 0.04} // Stop at floor level
      minPolarAngle={0.15} // Prevent flip at apex
      minDistance={1.2}
      maxDistance={25.0} // Accommodate grand overview & dollhouse map
      makeDefault
    />
  );
}
