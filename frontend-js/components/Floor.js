// src/components/Floor.js

import * as THREE from "three";

export default class Floor {
  constructor({
    width = 10000, // Width of the floor
    height = 10000, // Height of the floor
    topColor = 0xeeeeee, // Default top color
    bottomColor = 0xaaaaaa, // Default bottom color
    rotation = { x: -Math.PI / 2, y: 0, z: 0 }, // Rotate the floor to be horizontal
  } = {}) {
    // Create gradient material for the floor
    this.material = this.createDissolveMaterial(topColor, bottomColor);

    // Create the plane geometry and apply the gradient material
    const geometry = new THREE.PlaneGeometry(width, height);
    this.floor = new THREE.Mesh(geometry, this.material);

    // Set position, rotation, and scale
    this.floor.rotation.set(rotation.x, rotation.y, rotation.z);
  }

  getFloor() {
    return this.floor;
  }

  setMaterial(material) {
    if (material instanceof THREE.Material) {
      this.floor.material = material;
    } else {
      console.error(
        "Invalid material provided. Must be an instance of THREE.Material."
      );
    }
  }

  createDissolveMaterial(topColor, bottomColor) {
    const uniforms = {
      topColor: { type: "vec3", value: new THREE.Color(topColor) },
      bottomColor: { type: "vec3", value: new THREE.Color(bottomColor) },
      offset: { type: "f", value: 400 },
      exponent: { type: "f", value: 0.6 },
      alpha: { type: "f", value: 0.5 }, // Adjust alpha for dissolving effect
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
        uniform float alpha;
        varying vec3 vWorldPosition;
        void main() {
          float h = normalize(vWorldPosition + offset).y;
          vec3 color = mix(bottomColor, topColor, max(pow(max(h, 0.0), exponent), 0.0));
          gl_FragColor = vec4(color, alpha); // Set alpha for transparency
        }
      `,
      side: THREE.DoubleSide,
      transparent: true, // Enable transparency
      depthWrite: false,
    });

    return material;
  }
}
