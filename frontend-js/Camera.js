// src/Camera.js
import * as THREE from 'three';

export default class Camera {
    constructor() {
        this.camera = new THREE.PerspectiveCamera(
            45,
            window.innerWidth / window.innerHeight,
            1,
            2500
        );
        this.camera.position.set(0, -300, 120);
        this.camera.lookAt(0, 4, 0);
    }

    getCamera() {
        return this.camera;
    }

    updateAspectRatio() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
    }
}
