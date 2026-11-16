import React, { useMemo } from 'react';
import * as THREE from 'three';
import {
  createWoodFloorTexture,
  createRugTexture,
  createWallArtTexture,
} from '../utils/proceduralTextures';
import { useShowroom } from '../context/ShowroomContext';

export function Room() {
  const { lightingMode } = useShowroom();

  const floorTexture = useMemo(() => createWoodFloorTexture(), []);
  const rugTexture = useMemo(() => createRugTexture(), []);
  const wallArtTexture = useMemo(() => createWallArtTexture(), []);

  const wallColor = lightingMode === 'evening' ? '#2a2624' : '#eae5dd';
  const ceilingColor = lightingMode === 'evening' ? '#222020' : '#f5f2ec';
  const glassColor = lightingMode === 'evening' ? '#3d4b5c' : '#c8e2f5';

  return (
    <group>
      {/* =====================================================================
          1. CONTINUOUS GRAND OAK HARDWOOD FLOOR (24m x 20m)
          ===================================================================== */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[26, 22]} />
        <meshStandardMaterial
          map={floorTexture}
          roughness={0.38}
          metalness={0.03}
        />
      </mesh>

      {/* =====================================================================
          2. DEDICATED DEPARTMENT ZONING AREA RUGS
          ===================================================================== */}
      {/* Zone 1: Living Lounge Department Rug */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-3.4, 0.005, 1.2]} receiveShadow>
        <planeGeometry args={[5.2, 4.4]} />
        <meshStandardMaterial map={rugTexture} roughness={0.95} />
      </mesh>

      {/* Zone 2: Bedroom Suite Counter Rug */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[4.0, 0.005, 1.2]} receiveShadow>
        <planeGeometry args={[5.0, 4.4]} />
        <meshStandardMaterial map={rugTexture} roughness={0.95} />
      </mesh>

      {/* Zone 3: Executive Study & Workspace Rug */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-4.2, 0.005, -5.0]} receiveShadow>
        <planeGeometry args={[4.8, 3.8]} />
        <meshStandardMaterial map={rugTexture} roughness={0.95} />
      </mesh>

      {/* Zone 4: Lighting & Accent Gallery Rug */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[4.2, 0.005, -5.0]} receiveShadow>
        <planeGeometry args={[4.8, 3.8]} />
        <meshStandardMaterial map={rugTexture} roughness={0.95} />
      </mesh>

      {/* =====================================================================
          3. PERIMETER WALLS & ARCHITECTURAL STRUCTURE
          ===================================================================== */}
      {/* Back Feature Wall (North, Z = -9.5) */}
      <mesh position={[0, 2.75, -9.5]} receiveShadow>
        <planeGeometry args={[26, 5.5]} />
        <meshStandardMaterial color={wallColor} roughness={0.85} />
      </mesh>

      {/* Back Wall Skirting Baseboard */}
      <mesh position={[0, 0.08, -9.48]} receiveShadow>
        <boxGeometry args={[26, 0.16, 0.03]} />
        <meshStandardMaterial color="#333" roughness={0.4} />
      </mesh>

      {/* Left Wall (West, X = -12) */}
      <mesh position={[-12, 2.75, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[22, 5.5]} />
        <meshStandardMaterial color={wallColor} roughness={0.85} />
      </mesh>
      <mesh position={[-11.98, 0.08, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <boxGeometry args={[22, 0.16, 0.03]} />
        <meshStandardMaterial color="#333" roughness={0.4} />
      </mesh>

      {/* Architectural Concrete Columns flanking center hallway */}
      {[-1.6, 1.6].map((cx, idx) => (
        <group key={`col-pair-1-${idx}`} position={[cx, 2.75, 3.0]}>
          <mesh castShadow receiveShadow>
            <cylinderGeometry args={[0.22, 0.22, 5.5, 24]} />
            <meshStandardMaterial color="#dfd8ce" roughness={0.7} />
          </mesh>
          {/* Brass Accent Rings at base and top */}
          <mesh position={[0, -2.65, 0]}>
            <cylinderGeometry args={[0.24, 0.24, 0.1, 24]} />
            <meshStandardMaterial color="#d4af37" metalness={0.8} roughness={0.25} />
          </mesh>
          <mesh position={[0, 2.65, 0]}>
            <cylinderGeometry args={[0.24, 0.24, 0.1, 24]} />
            <meshStandardMaterial color="#d4af37" metalness={0.8} roughness={0.25} />
          </mesh>
        </group>
      ))}

      {[-1.6, 1.6].map((cx, idx) => (
        <group key={`col-pair-2-${idx}`} position={[cx, 2.75, -3.5]}>
          <mesh castShadow receiveShadow>
            <cylinderGeometry args={[0.22, 0.22, 5.5, 24]} />
            <meshStandardMaterial color="#dfd8ce" roughness={0.7} />
          </mesh>
          <mesh position={[0, -2.65, 0]}>
            <cylinderGeometry args={[0.24, 0.24, 0.1, 24]} />
            <meshStandardMaterial color="#d4af37" metalness={0.8} roughness={0.25} />
          </mesh>
        </group>
      ))}

      {/* =====================================================================
          4. OAK SLAT ARCHITECTURAL ROOM DIVIDERS (Between Zones)
          ===================================================================== */}
      {/* Slat Screen between Living and Study (Left Wing) */}
      <group position={[-4.2, 1.6, -1.8]}>
        {[...Array(14)].map((_, i) => (
          <mesh key={`slat-left-${i}`} position={[-1.6 + i * 0.25, 0, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.04, 3.2, 0.1]} />
            <meshStandardMaterial color="#7a5530" roughness={0.4} />
          </mesh>
        ))}
        {/* Top & Bottom Horizontal Support Rails */}
        <mesh position={[0, 1.6, 0]}>
          <boxGeometry args={[3.6, 0.05, 0.12]} />
          <meshStandardMaterial color="#222" roughness={0.5} />
        </mesh>
        <mesh position={[0, -1.6, 0]}>
          <boxGeometry args={[3.6, 0.05, 0.12]} />
          <meshStandardMaterial color="#222" roughness={0.5} />
        </mesh>
      </group>

      {/* Slat Screen between Bedroom and Lighting Gallery (Right Wing) */}
      <group position={[4.0, 1.6, -1.8]}>
        {[...Array(14)].map((_, i) => (
          <mesh key={`slat-right-${i}`} position={[-1.6 + i * 0.25, 0, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.04, 3.2, 0.1]} />
            <meshStandardMaterial color="#7a5530" roughness={0.4} />
          </mesh>
        ))}
        <mesh position={[0, 1.6, 0]}>
          <boxGeometry args={[3.6, 0.05, 0.12]} />
          <meshStandardMaterial color="#222" roughness={0.5} />
        </mesh>
        <mesh position={[0, -1.6, 0]}>
          <boxGeometry args={[3.6, 0.05, 0.12]} />
          <meshStandardMaterial color="#222" roughness={0.5} />
        </mesh>
      </group>

      {/* =====================================================================
          5. PANORAMIC ARCHITECTURAL WINDOWS ON RIGHT WALL (X = 12)
          ===================================================================== */}
      <group position={[11.95, 2.75, 0]} rotation={[0, -Math.PI / 2, 0]}>
        {/* Black Industrial Steel Frame */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[18, 5.4, 0.08]} />
          <meshStandardMaterial color="#1f1f1f" roughness={0.3} metalness={0.7} />
        </mesh>
        {/* Glass Panes */}
        <mesh position={[0, 0, 0.05]}>
          <planeGeometry args={[17.6, 5.2]} />
          <meshPhysicalMaterial
            roughness={0.04}
            transmission={0.94}
            thickness={0.08}
            transparent
            opacity={0.35}
            color={glassColor}
          />
        </mesh>
        {/* Exterior Outdoor Landscaping Vista */}
        <group position={[0, -0.4, -4.5]}>
          <mesh position={[0, 0.8, 0]}>
            <planeGeometry args={[26, 8]} />
            <meshBasicMaterial
              color={lightingMode === 'evening' ? '#141c26' : '#88a894'}
            />
          </mesh>
          {/* Outdoor Trees & Bamboo Silhouettes */}
          {[-7, -4.5, -2, 0.5, 3.5, 6].map((tx, ti) => (
            <group key={`garden-tree-${ti}`} position={[tx, 1.2, 0.3]}>
              <mesh>
                <cylinderGeometry args={[0.08, 0.12, 2.8, 8]} />
                <meshBasicMaterial color="#2a221a" />
              </mesh>
              <mesh position={[0, 1.6, 0]}>
                <sphereGeometry args={[1.0, 8, 8]} />
                <meshBasicMaterial
                  color={lightingMode === 'evening' ? '#101e18' : '#3d5c4b'}
                />
              </mesh>
            </group>
          ))}
        </group>
      </group>

      {/* =====================================================================
          6. CENTER AISLE FEATURES: INDOOR OLIVE TREE & WELCOME PLINTH
          ===================================================================== */}
      {/* Indoor Olive Tree in Ceramic Planter */}
      <group position={[0, 0, -1.8]}>
        {/* Large Textured Terracotta Planter */}
        <mesh position={[0, 0.45, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.38, 0.28, 0.9, 24]} />
          <meshStandardMaterial color="#c26d53" roughness={0.85} />
        </mesh>
        {/* Soil */}
        <mesh position={[0, 0.88, 0]}>
          <cylinderGeometry args={[0.36, 0.36, 0.04, 20]} />
          <meshStandardMaterial color="#2e2118" roughness={0.9} />
        </mesh>
        {/* Natural Sculptural Wooden Trunk */}
        <mesh position={[0, 1.6, 0]} rotation={[0.05, 0, 0.04]} castShadow>
          <cylinderGeometry args={[0.05, 0.08, 1.5, 12]} />
          <meshStandardMaterial color="#554433" roughness={0.8} />
        </mesh>
        {/* Branch Clusters with Silvery Olive Leaves */}
        {[
          [0, 2.5, 0, 0.55],
          [-0.35, 2.7, 0.2, 0.45],
          [0.4, 2.6, -0.2, 0.48],
          [0.1, 2.9, 0.3, 0.4],
          [-0.25, 2.9, -0.3, 0.42],
        ].map(([lx, ly, lz, scale], idx) => (
          <mesh key={`olive-canopy-${idx}`} position={[lx, ly, lz]} castShadow>
            <sphereGeometry args={[scale, 10, 10]} />
            <meshStandardMaterial color="#536952" roughness={0.7} />
          </mesh>
        ))}
      </group>

      {/* Grand Hall Welcome Concierge Plinth at Front */}
      <group position={[0, 0, 5.6]}>
        <mesh position={[0, 0.48, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.7, 0.96, 0.5]} />
          <meshStandardMaterial color="#232220" roughness={0.4} metalness={0.5} />
        </mesh>
        {/* Brass Header Badge */}
        <mesh position={[0, 0.97, 0]}>
          <boxGeometry args={[0.66, 0.02, 0.46]} />
          <meshStandardMaterial color="#d4af37" metalness={0.85} roughness={0.2} />
        </mesh>
        {/* Catalog / Tablet Stand */}
        <mesh position={[0, 1.06, -0.05]} rotation={[-0.4, 0, 0]} castShadow>
          <boxGeometry args={[0.26, 0.18, 0.015]} />
          <meshStandardMaterial color="#ffffff" roughness={0.3} />
        </mesh>
      </group>

      {/* =====================================================================
          7. OVERSIZED GALLERY ARTWORKS
          ===================================================================== */}
      {/* Back Wall Left Gallery Canvas */}
      <group position={[-5.8, 2.8, -9.44]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[2.2, 2.8, 0.05]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.3} metalness={0.6} />
        </mesh>
        <mesh position={[0, 0, 0.028]}>
          <planeGeometry args={[2.0, 2.6]} />
          <meshStandardMaterial map={wallArtTexture} roughness={0.5} />
        </mesh>
      </group>

      {/* Back Wall Right Gallery Canvas */}
      <group position={[5.8, 2.8, -9.44]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[2.2, 2.8, 0.05]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.3} metalness={0.6} />
        </mesh>
        <mesh position={[0, 0, 0.028]}>
          <planeGeometry args={[2.0, 2.6]} />
          <meshStandardMaterial map={wallArtTexture} roughness={0.5} />
        </mesh>
      </group>

      {/* =====================================================================
          8. HIGH ARCHITECTURAL CEILING WITH COVE LIGHTING & SPOTLIGHT TRACKS
          ===================================================================== */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 5.5, 0]} receiveShadow>
        <planeGeometry args={[26, 22]} />
        <meshStandardMaterial color={ceilingColor} roughness={0.9} />
      </mesh>

      {/* Track Light Rails running down the hall */}
      {[-4.0, 0, 4.0].map((rx, rIdx) => (
        <group key={`track-${rIdx}`} position={[rx, 5.46, 0]}>
          <mesh>
            <boxGeometry args={[0.04, 0.03, 18]} />
            <meshStandardMaterial color="#151515" roughness={0.3} metalness={0.8} />
          </mesh>
          {/* Track Spotlights along the rails */}
          {[-6, -3, 0, 3, 6].map((sz, sIdx) => (
            <group key={`spot-${sIdx}`} position={[0, -0.06, sz]}>
              <mesh rotation={[-Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[0.04, 0.05, 0.08, 16]} />
                <meshStandardMaterial color="#222" roughness={0.4} />
              </mesh>
              <mesh position={[0, -0.045, 0]}>
                <circleGeometry args={[0.038, 16]} />
                <meshBasicMaterial color="#fff2db" />
              </mesh>
            </group>
          ))}
        </group>
      ))}
    </group>
  );
}
