/**
 * 360 Degree Panoramic WebGL Viewer
 * Uses Three.js to render an inverted sphere with equirectangular panorama texture.
 */

class Viewer360 {
  constructor(canvasId, imagePath) {
    this.canvas = document.getElementById(canvasId);
    this.imagePath = imagePath;

    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.sphere = null;

    this.isUserInteracting = false;
    this.onPointerDownPointerX = 0;
    this.onPointerDownPointerY = 0;
    this.lon = 0;
    this.onPointerDownLon = 0;
    this.lat = 0;
    this.onPointerDownLat = 0;

    this.phi = 0;
    this.theta = 0;
    this.initialized = false;
    this.animationFrameId = null;
  }

  init() {
    if (this.initialized || !this.canvas) return;

    if (typeof THREE === 'undefined') {
      console.warn("Three.js not loaded yet for 360 viewer");
      return;
    }

    const width = this.canvas.parentElement.clientWidth || 600;
    const height = this.canvas.parentElement.clientHeight || 380;

    // Scene & Camera
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, width / height, 1, 1100);
    this.camera.target = new THREE.Vector3(0, 0, 0);

    // Sphere Mesh
    const geometry = new THREE.SphereGeometry(500, 60, 40);
    // Invert geometry scale on X so texture faces inward
    geometry.scale(-1, 1, 1);

    const textureLoader = new THREE.TextureLoader();
    
    const applyTexture = (texture) => {
      texture.colorSpace = THREE.SRGBColorSpace;
      const material = new THREE.MeshBasicMaterial({ map: texture });
      this.sphere = new THREE.Mesh(geometry, material);
      this.scene.add(this.sphere);
      if (this.renderer) this.renderer.render(this.scene, this.camera);
    };

    textureLoader.load(
      this.imagePath,
      (texture) => applyTexture(texture),
      undefined,
      (err) => {
        console.warn("Error loading 360 texture from " + this.imagePath + ", trying fallback...");
        const fallbackPath = this.imagePath.includes("slides/") ? this.imagePath.replace("slides/", "") : "slides/" + this.imagePath;
        textureLoader.load(fallbackPath, (fallbackTex) => applyTexture(fallbackTex));
      }
    );

    // Renderer
    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(width, height);

    // Event Listeners for Dragging
    this.canvas.addEventListener('pointerdown', this.onPointerDown.bind(this));
    window.addEventListener('resize', this.onWindowResize.bind(this));

    this.initialized = true;
    this.animate();
  }

  onPointerDown(event) {
    this.isUserInteracting = true;
    this.onPointerDownPointerX = event.clientX;
    this.onPointerDownPointerY = event.clientY;
    this.onPointerDownLon = this.lon;
    this.onPointerDownLat = this.lat;

    const onPointerMove = (e) => {
      if (!this.isUserInteracting) return;
      this.lon = (this.onPointerDownPointerX - e.clientX) * 0.25 + this.onPointerDownLon;
      this.lat = (e.clientY - this.onPointerDownPointerY) * 0.25 + this.onPointerDownLat;
    };

    const onPointerUp = () => {
      this.isUserInteracting = false;
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
    };

    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
  }

  onWindowResize() {
    if (!this.renderer || !this.canvas) return;
    const width = this.canvas.parentElement.clientWidth;
    const height = this.canvas.parentElement.clientHeight;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  animate() {
    this.animationFrameId = requestAnimationFrame(this.animate.bind(this));

    // Slow auto-rotation when user is not dragging
    if (!this.isUserInteracting) {
      this.lon += 0.08;
    }

    this.lat = Math.max(-85, Math.min(85, this.lat));
    this.phi = THREE.MathUtils.degToRad(90 - this.lat);
    this.theta = THREE.MathUtils.degToRad(this.lon);

    const x = 500 * Math.sin(this.phi) * Math.cos(this.theta);
    const y = 500 * Math.cos(this.phi);
    const z = 500 * Math.sin(this.phi) * Math.sin(this.theta);

    this.camera.lookAt(x, y, z);
    if (this.renderer && this.scene) {
      this.renderer.render(this.scene, this.camera);
    }
  }

  destroy() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }
}

window.Viewer360 = Viewer360;
