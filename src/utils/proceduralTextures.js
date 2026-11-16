import * as THREE from 'three';

// 1. Procedural Natural Wide-Plank Oak Floor Texture
export function createWoodFloorTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');

  // Base natural honey oak
  ctx.fillStyle = '#bfa588';
  ctx.fillRect(0, 0, 1024, 1024);

  const plankHeight = 64;
  const numPlanks = 1024 / plankHeight;
  const plankWidth = 256;

  for (let row = 0; row < numPlanks; row++) {
    const y = row * plankHeight;
    const rowOffset = (row % 2) * (plankWidth / 2);

    for (let col = -1; col < 1024 / plankWidth + 2; col++) {
      const x = col * plankWidth + rowOffset;
      // Soft organic natural tonal variation
      const toneVariation = (Math.random() - 0.5) * 16;
      const r = Math.min(255, Math.max(0, 192 + toneVariation));
      const g = Math.min(255, Math.max(0, 168 + toneVariation * 0.9));
      const b = Math.min(255, Math.max(0, 138 + toneVariation * 0.75));

      ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
      ctx.fillRect(x + 1, y + 1, plankWidth - 2, plankHeight - 2);

      // Fine wood grain lines inside each plank
      ctx.strokeStyle = `rgba(110, 85, 60, 0.12)`;
      ctx.lineWidth = 1;
      for (let gStep = 4; gStep < plankHeight - 4; gStep += 3) {
        ctx.beginPath();
        ctx.moveTo(x, y + gStep);
        ctx.bezierCurveTo(
          x + plankWidth * 0.35,
          y + gStep + (Math.random() - 0.5) * 3,
          x + plankWidth * 0.65,
          y + gStep + (Math.random() - 0.5) * 3,
          x + plankWidth,
          y + gStep
        );
        ctx.stroke();
      }

      // Micro bevel shadow line
      ctx.strokeStyle = 'rgba(75, 55, 38, 0.35)';
      ctx.lineWidth = 1.2;
      ctx.strokeRect(x, y, plankWidth, plankHeight);
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(6, 6);
  texture.needsUpdate = true;
  return texture;
}

// 2. Procedural Woven Wool Rug Texture
export function createRugTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  // Warm textured ivory wool
  ctx.fillStyle = '#f0ebe1';
  ctx.fillRect(0, 0, 512, 512);

  for (let i = 0; i < 5000; i++) {
    const x = Math.random() * 512;
    const y = Math.random() * 512;
    const alpha = Math.random() * 0.07;
    ctx.fillStyle = Math.random() > 0.5 ? `rgba(80, 70, 60, ${alpha})` : `rgba(255, 255, 255, ${alpha * 2})`;
    ctx.fillRect(x, y, 2, 2);
  }

  // Scandinavian minimalist border
  ctx.strokeStyle = 'rgba(110, 95, 80, 0.18)';
  ctx.lineWidth = 3;
  ctx.strokeRect(24, 24, 512 - 48, 512 - 48);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(1, 1);
  texture.needsUpdate = true;
  return texture;
}

// 3. Procedural Washed French Bed Linen Texture
export function createBedLinenTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#faf8f5';
  ctx.fillRect(0, 0, 256, 256);

  // Soft organic weave
  ctx.strokeStyle = 'rgba(0, 0, 0, 0.04)';
  ctx.lineWidth = 1;
  for (let i = 0; i < 256; i += 3) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, 256);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, i);
    ctx.lineTo(256, i);
    ctx.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(8, 8);
  texture.needsUpdate = true;
  return texture;
}

// 4. Procedural Cross-Hatch Bouclé / Fabric Texture
export function createFabricTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, 256, 256);

  ctx.strokeStyle = 'rgba(0, 0, 0, 0.05)';
  ctx.lineWidth = 1;
  for (let i = 0; i < 256; i += 4) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, 256);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, i);
    ctx.lineTo(256, i);
    ctx.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(6, 6);
  texture.needsUpdate = true;
  return texture;
}

// 5. Procedural Abstract Gallery Wall Canvas
export function createWallArtTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 768;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#f5efe6';
  ctx.fillRect(0, 0, 512, 768);

  // Terracotta & Ochre organic balance
  ctx.fillStyle = '#c86d51';
  ctx.beginPath();
  ctx.arc(256, 340, 150, Math.PI, 0, false);
  ctx.lineTo(406, 540);
  ctx.lineTo(106, 540);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#2b2d2f';
  ctx.beginPath();
  ctx.arc(320, 240, 85, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#dfa04c';
  ctx.beginPath();
  ctx.arc(190, 490, 75, 0, Math.PI, true);
  ctx.closePath();
  ctx.fill();

  ctx.strokeStyle = '#2b2d2f';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(130, 160);
  ctx.lineTo(380, 600);
  ctx.stroke();

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

// 6. Procedural Carrera Marble Texture
export function createMarbleTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#fbfbf9';
  ctx.fillRect(0, 0, 512, 512);

  ctx.strokeStyle = 'rgba(150, 140, 130, 0.22)';
  ctx.lineWidth = 2.5;
  for (let i = 0; i < 6; i++) {
    ctx.beginPath();
    ctx.moveTo(Math.random() * 80, Math.random() * 512);
    ctx.bezierCurveTo(
      140 + Math.random() * 120,
      80 + Math.random() * 320,
      280 + Math.random() * 120,
      180 + Math.random() * 320,
      480 + Math.random() * 40,
      Math.random() * 512
    );
    ctx.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}
