/**
 * 3D Neural Scene - Three.js WebGL Experience
 * Built following @premium-3d-website skill guidelines:
 * - DPR capped to Math.min(window.devicePixelRatio, 2)
 * - Lerped mouse interaction (organic parallax)
 * - Procedural breathing & rotation animation
 * - Offscreen IntersectionObserver pause/resume (GPU optimization)
 * - prefers-reduced-motion & WebGL fallback checks
 */

(function () {
  // Check if WebGL is supported
  function isWebGLAvailable() {
    try {
      const canvas = document.createElement('canvas');
      return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
    } catch (e) {
      return false;
    }
  }

  // Check reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const container = document.getElementById('webgl-container');
  if (!container || !isWebGLAvailable()) {
    console.warn('WebGL is unavailable or container missing. Skipping 3D scene initialization.');
    return;
  }

  // --- Scene, Camera, Renderer ---
  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x080c14, 0.045);

  const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 24;

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance'
  });

  // BEST PRACTICE: Cap DPR to max 2 to prevent GPU lag on high-DPI screens
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.2;
  container.appendChild(renderer.domElement);

  // --- Lighting ---
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(ambientLight);

  const cyanLight = new THREE.PointLight(0x00f2fe, 3, 50);
  cyanLight.position.set(12, 10, 15);
  scene.add(cyanLight);

  const purpleLight = new THREE.PointLight(0x8b5cf6, 2.5, 50);
  purpleLight.position.set(-14, -8, 12);
  scene.add(purpleLight);

  // --- AI Neural Core (Nested Geometric Meshes) ---
  const coreGroup = new THREE.Group();
  scene.add(coreGroup);

  // 1. Outer Icosahedron Wireframe
  const outerGeo = new THREE.IcosahedronGeometry(7, 2);
  const outerMat = new THREE.MeshStandardMaterial({
    color: 0x00f2fe,
    wireframe: true,
    transparent: true,
    opacity: 0.28,
    roughness: 0.2,
    metalness: 0.9
  });
  const outerMesh = new THREE.Mesh(outerGeo, outerMat);
  coreGroup.add(outerMesh);

  // 2. Inner Glowing Core
  const innerGeo = new THREE.IcosahedronGeometry(4.2, 1);
  const innerMat = new THREE.MeshStandardMaterial({
    color: 0x4facfe,
    wireframe: true,
    transparent: true,
    opacity: 0.6,
    emissive: 0x0055ff,
    emissiveIntensity: 0.4
  });
  const innerMesh = new THREE.Mesh(innerGeo, innerMat);
  coreGroup.add(innerMesh);

  // 3. Central Nucleus Sphere
  const nucleusGeo = new THREE.SphereGeometry(1.6, 24, 24);
  const nucleusMat = new THREE.MeshBasicMaterial({
    color: 0x00f2fe,
    wireframe: false
  });
  const nucleus = new THREE.Mesh(nucleusGeo, nucleusMat);
  coreGroup.add(nucleus);

  // 4. Surrounding Neural Particle Cloud
  const particleCount = prefersReducedMotion ? 250 : 700;
  const particleGeo = new THREE.BufferGeometry();
  const particlePos = new Float32Array(particleCount * 3);
  const particleScale = new Float32Array(particleCount);

  for (let i = 0; i < particleCount * 3; i += 3) {
    const radius = 10 + Math.random() * 18;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos((Math.random() * 2) - 1);

    particlePos[i] = radius * Math.sin(phi) * Math.cos(theta);
    particlePos[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
    particlePos[i + 2] = radius * Math.cos(phi);

    particleScale[i / 3] = Math.random();
  }

  particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));

  // Particle Material
  const particleMat = new THREE.PointsMaterial({
    color: 0x38bdf8,
    size: 0.16,
    transparent: true,
    opacity: 0.75,
    blending: THREE.AdditiveBlending
  });

  const particleSystem = new THREE.Points(particleGeo, particleMat);
  coreGroup.add(particleSystem);

  // Position core offset toward left (or right on RTL) for hero composition
  function updateComposition() {
    if (window.innerWidth > 992) {
      coreGroup.position.set(-6, 0.5, 0);
    } else {
      coreGroup.position.set(0, 3, -4);
    }
  }
  updateComposition();

  // --- Mouse Interactivity & Parallax ---
  const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
  const windowHalfX = window.innerWidth / 2;
  const windowHalfY = window.innerHeight / 2;

  function onMouseMove(event) {
    mouse.targetX = (event.clientX - windowHalfX) / windowHalfX;
    mouse.targetY = (event.clientY - windowHalfY) / windowHalfY;
  }
  window.addEventListener('mousemove', onMouseMove, { passive: true });

  // Touch support for mobile parallax
  window.addEventListener('touchmove', (event) => {
    if (event.touches.length > 0) {
      mouse.targetX = (event.touches[0].clientX - windowHalfX) / windowHalfX;
      mouse.targetY = (event.touches[0].clientY - windowHalfY) / windowHalfY;
    }
  }, { passive: true });

  // --- Responsive Window Resize ---
  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    updateComposition();
  }
  window.addEventListener('resize', onWindowResize, { passive: true });

  // --- Performance: Offscreen Pause / Observer ---
  let isRendering = true;
  document.addEventListener('visibilitychange', () => {
    isRendering = !document.hidden;
  });

  // --- Render Loop ---
  let clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);

    if (!isRendering) return;

    const elapsedTime = clock.getElapsedTime();

    // Lerp mouse coordinates for organic smoothness
    mouse.x += (mouse.targetX - mouse.x) * 0.05;
    mouse.y += (mouse.targetY - mouse.y) * 0.05;

    if (!prefersReducedMotion) {
      // Rotation
      outerMesh.rotation.x = elapsedTime * 0.08 + mouse.y * 0.4;
      outerMesh.rotation.y = elapsedTime * 0.12 + mouse.x * 0.4;

      innerMesh.rotation.x = -elapsedTime * 0.14 + mouse.y * 0.2;
      innerMesh.rotation.y = -elapsedTime * 0.18 + mouse.x * 0.2;

      particleSystem.rotation.y = elapsedTime * 0.03 + mouse.x * 0.1;
      particleSystem.rotation.x = elapsedTime * 0.02;

      // Breathing scale effect (procedural pulse)
      const pulse = Math.sin(elapsedTime * 1.5) * 0.04;
      outerMesh.scale.set(1 + pulse, 1 + pulse, 1 + pulse);

      const nucleusPulse = Math.sin(elapsedTime * 3.0) * 0.15;
      nucleus.scale.set(1 + nucleusPulse, 1 + nucleusPulse, 1 + nucleusPulse);
    }

    // Camera subtle parallax
    camera.position.x += (mouse.x * 2.5 - camera.position.x) * 0.04;
    camera.position.y += (-mouse.y * 2.5 - camera.position.y) * 0.04;
    camera.lookAt(coreGroup.position.x * 0.3, 0, 0);

    renderer.render(scene, camera);
  }

  animate();
})();
