// src/Camera.js
import * as THREE from "three";

export default class Camera {
  constructor() {
    this.camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      1,
      2500
    );
    this.camera.position.set(0, 3, 12);
    this.camera.lookAt(0, 4, 0);
  }

  getCamera() {
    return this.camera;
  }

  updateAspectRatio() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
  }

  setPosition(x, y, z) {
    this.camera.position.set(x, y, z);
  }
  getPosition() {
    return this.camera.position;
  }
  lookAt(target) {
    this.camera.lookAt(target);
  }
}
