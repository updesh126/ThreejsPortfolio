// src/Scene.js
import * as THREE from "three";
import { Sky } from "three/examples/jsm/objects/Sky.js";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";

export default class Skybox {
  constructor(type, options) {
    switch (type) {
      case "solidColor":
        this.skybox = this.createSolidColorSkybox(options.color || 0x87ceeb);
        break;

      case "cubemap":
        this.skybox = this.createCubemapSkybox(options.paths || {});
        break;

      case "gradient":
        this.skybox = this.createGradientSkybox(
          options.topColor || 0x87ceeb,
          options.bottomColor || 0xffffff
        );
        break;

      case "procedural":
        this.skybox = this.createProceduralSkybox(options.sunOptions || {});
        break;

      case "hdr":
        this.skybox = null; // Placeholder, HDR will be loaded asynchronously
        this.loadHDRISkybox(options.hdrPath);
        break;

      default:
        console.warn("Skybox type not recognized");
        this.skybox = new THREE.Color(0x000000); // Default to black if type not recognized
    }
  }

  // Solid Color Skybox
  createSolidColorSkybox(color) {
    return new THREE.Color(color);
  }

  // Cubemap Skybox
  createCubemapSkybox(paths) {
    const loader = new THREE.CubeTextureLoader();
    return loader.load([
      paths.px || "path/to/px.jpg", // Positive X
      paths.nx || "path/to/nx.jpg", // Negative X
      paths.py || "path/to/py.jpg", // Positive Y
      paths.ny || "path/to/ny.jpg", // Negative Y
      paths.pz || "path/to/pz.jpg", // Positive Z
      paths.nz || "path/to/nz.jpg", // Negative Z
    ]);
  }

  // Gradient Skybox
  createGradientSkybox(topColor, bottomColor) {
    const uniforms = {
      topColor: { type: "vec3", value: new THREE.Color(topColor) },
      bottomColor: { type: "vec3", value: new THREE.Color(bottomColor) },
      offset: { type: "f", value: 400 },
      exponent: { type: "f", value: 0.6 },
    };

    const material = new THREE.ShaderMaterial({
      uniforms: uniforms,
      vertexShader: `
                varying vec3 vWorldPosition;
                void main() {
                    vec4 worldPosition = modelMatrix * vec4(position, 1.0);
                    vWorldPosition = worldPosition.xyz;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
      fragmentShader: `
                uniform vec3 topColor;
                uniform vec3 bottomColor;
                uniform float offset;
                uniform float exponent;
                varying vec3 vWorldPosition;
                void main() {
                    float h = normalize(vWorldPosition + offset).y;
                    gl_FragColor = vec4(mix(bottomColor, topColor, max(pow(max(h, 0.0), exponent), 0.0)), 1.0);
                }
            `,
      side: THREE.BackSide,
      depthWrite: false,
    });

    const skyGeo = new THREE.SphereGeometry(1000, 32, 32);
    return new THREE.Mesh(skyGeo, material);
  }

  // Procedural Skybox using Sky module
  createProceduralSkybox(sunOptions) {
    const sky = new Sky();
    sky.scale.setScalar(450000);

    const sun = new THREE.Vector3();

    const uniforms = sky.material.uniforms;
    uniforms["turbidity"].value = sunOptions.turbidity || 10;
    uniforms["rayleigh"].value = sunOptions.rayleigh || 2;
    uniforms["mieCoefficient"].value = sunOptions.mieCoefficient || 0.005;
    uniforms["mieDirectionalG"].value = sunOptions.mieDirectionalG || 0.8;

    const phi = THREE.MathUtils.degToRad(90 - (sunOptions.elevation || 2));
    const theta = THREE.MathUtils.degToRad(sunOptions.azimuth || 180);

    sun.setFromSphericalCoords(1, phi, theta);
    uniforms["sunPosition"].value.copy(sun);

    return sky;
  }

  // HDRI Skybox (Async load)
  loadHDRISkybox(hdrPath) {
    const hdrLoader = new RGBELoader();
    hdrLoader.load(hdrPath, (texture) => {
      this.skybox = texture;
    });
  }

  // Get skybox object or texture
  getSkybox() {
    return this.skybox;
  }
}
