// src/components/Light.js

import * as THREE from "three";

export default class Light {
  constructor({
    ambientIntensity = 0.5,
    directionalIntensity = 1,
    directionalPosition = { x: 10, y: 10, z: 10 },
  } = {}) {
    // Ambient Light
    this.ambientLight = new THREE.AmbientLight(0xffffff, ambientIntensity);

    // Directional Light
    this.directionalLight = new THREE.DirectionalLight(
      0xffffff,
      directionalIntensity
    );
    this.directionalLight.position.set(
      directionalPosition.x,
      directionalPosition.y,
      directionalPosition.z
    );
    this.directionalLight.castShadow = true; // Enable shadows
  }

  getAmbientLight() {
    return this.ambientLight;
  }

  getDirectionalLight() {
    return this.directionalLight;
  }
}
