import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Room } from './Room';
import { CameraController } from './CameraController';
import { Sofa } from './Furniture/Sofa';
import { Armchair } from './Furniture/Armchair';
import { CoffeeTable } from './Furniture/CoffeeTable';
import { PlatformBed } from './Furniture/PlatformBed';
import { Nightstand } from './Furniture/Nightstand';
import { Wardrobe } from './Furniture/Wardrobe';
import { StudyDesk } from './Furniture/StudyDesk';
import { Bookshelf } from './Furniture/Bookshelf';
import { FloorLamp } from './Furniture/FloorLamp';
import { PendantChandelier } from './Furniture/PendantChandelier';
import { HotspotMarker } from './UI/HotspotMarker';
import { PRODUCTS } from '../utils/productsData';
import { useShowroom } from '../context/ShowroomContext';

export function ShowroomCanvas() {
  const { lightingMode, activeDepartment } = useShowroom();
  const isDay = lightingMode === 'day';

  // 3D Hotspot Coordinates across the Grand Hall
  const hotspotPositions = {
    sofa: [-3.6, 1.05, 0.4],
    armchair: [-1.6, 0.95, 1.6],
    'coffee-table': [-3.6, 0.65, 1.8],
    'platform-bed': [4.4, 0.95, 0.8],
    nightstand: [2.2, 0.65, 0.8],
    wardrobe: [4.4, 0.8, -1.2],
    'study-desk': [-4.2, 1.05, -4.8],
    bookshelf: [-7.0, 1.95, -5.2],
    lamp: [4.5, 1.85, -5.2],
  };

  const shouldShow = (dept) => {
    return !activeDepartment || activeDepartment === 'all' || activeDepartment === dept;
  };

  return (
    <div className="canvas-container">
      <Canvas
        shadows
        camera={{ position: [0, 4.2, 8.5], fov: 46 }}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: 'high-performance',
        }}
      >
        <Suspense fallback={null}>
          {/* =================================================================
              NATURAL LIGHTING & ATMOSPHERE
              ================================================================= */}
          {isDay ? (
            <>
              {/* Daylight Warm Ambient */}
              <ambientLight color="#fff4eb" intensity={0.92} />

              {/* Natural Sun Streaming in from Panoramic East Windows */}
              <directionalLight
                position={[13, 8.5, 2.5]}
                color="#ffecd1"
                intensity={2.1}
                castShadow
                shadow-mapSize-width={2048}
                shadow-mapSize-height={2048}
                shadow-camera-near={1.0}
                shadow-camera-far={28}
                shadow-camera-left={-12}
                shadow-camera-right={12}
                shadow-camera-top={12}
                shadow-camera-bottom={-12}
                shadow-bias={-0.0003}
              />

              {/* Skylight Fill from West Ceiling */}
              <directionalLight position={[-8, 7, 4]} color="#d9ecfc" intensity={0.55} />

              {/* Dedicated Department Overhead Fill Lights */}
              <pointLight position={[-3.6, 4.8, 1.2]} color="#fff0db" intensity={0.9} distance={12} />
              <pointLight position={[4.0, 4.8, 1.2]} color="#fff0db" intensity={0.9} distance={12} />
              <pointLight position={[-4.2, 4.8, -5.0]} color="#fff0db" intensity={0.8} distance={12} />
              <pointLight position={[4.2, 4.8, -5.0]} color="#fff0db" intensity={0.8} distance={12} />
            </>
          ) : (
            <>
              {/* Cozy Evening Twilight Atmosphere */}
              <ambientLight color="#322d3d" intensity={0.42} />

              {/* Soft Cool Moonlight through Windows */}
              <directionalLight position={[12, 7, 2]} color="#465a78" intensity={0.35} />

              {/* Warm Architectural Track Spots & Downlights */}
              <pointLight position={[0, 4.8, 3.0]} color="#ffcb8a" intensity={1.2} distance={10} />
              <pointLight position={[0, 4.8, -3.0]} color="#ffcb8a" intensity={1.2} distance={10} />

              {/* Zone Accent Lights in Evening */}
              <pointLight position={[-3.6, 3.8, 1.2]} color="#ffba66" intensity={1.1} distance={8} />
              <pointLight position={[4.0, 3.8, 1.2]} color="#ffba66" intensity={1.1} distance={8} />
              <pointLight position={[-4.2, 3.8, -5.0]} color="#ffba66" intensity={1.1} distance={8} />
              <pointLight position={[4.2, 3.8, -5.0]} color="#ffba66" intensity={1.1} distance={8} />
            </>
          )}

          {/* =================================================================
              ARCHITECTURAL GRAND SHOWROOM HALL
              ================================================================= */}
          <Room />

          {/* Ceiling Chandelier Fixtures */}
          <PendantChandelier position={[-3.6, 5.1, 1.2]} />
          <PendantChandelier position={[0, 5.1, -1.8]} />

          {/* =================================================================
              FURNITURE BY DEPARTMENT COUNTERS (100% REAL 3D ASSETS)
              ================================================================= */}
          <group>
            {/* Zone 1: Living Lounge Department */}
            {shouldShow('living') && (
              <>
                <Sofa position={[-3.6, 0, 0.4]} />
                <CoffeeTable position={[-3.6, 0, 1.8]} />
                <Armchair position={[-1.6, 0, 1.6]} rotation={[0, -Math.PI / 4, 0]} />
              </>
            )}

            {/* Zone 2: Bedroom Suite Counter */}
            {shouldShow('bedroom') && (
              <>
                <PlatformBed position={[4.4, 0, 0.8]} />
                <Nightstand position={[2.2, 0, 0.8]} />
                <Wardrobe position={[4.4, 0, -1.2]} />
              </>
            )}

            {/* Zone 3: Executive Study & Workspace Zone */}
            {shouldShow('study') && (
              <>
                <StudyDesk position={[-4.2, 0, -4.8]} />
                <Bookshelf position={[-7.0, 0, -5.2]} />
              </>
            )}

            {/* Zone 4: Lighting & Accent Gallery Counter */}
            {shouldShow('lighting') && (
              <FloorLamp position={[4.5, 0, -5.2]} rotation={[0, -Math.PI / 6, 0]} />
            )}
          </group>

          {/* =================================================================
              3D INTERACTIVE HOTSPOT MARKERS
              ================================================================= */}
          {PRODUCTS.map((prod) => {
            if (!shouldShow(prod.department)) return null;
            return (
              <HotspotMarker
                key={`hotspot-${prod.id}`}
                product={prod}
                position={hotspotPositions[prod.id]}
              />
            );
          })}

          {/* =================================================================
              SMOOTH FLUID CAMERA CONTROLLER
              ================================================================= */}
          <CameraController />
        </Suspense>
      </Canvas>
    </div>
  );
}
