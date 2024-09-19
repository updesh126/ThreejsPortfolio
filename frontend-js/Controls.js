// src/Controls.js
import * as THREE from 'three';
// Other imports and code

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

export default class Controls {
    constructor(camera, renderer) {
        this.controls = new OrbitControls(camera, renderer.domElement);
        this.controls.target.set(0, 2, 0);
        this.controls.maxPolarAngle = THREE.MathUtils.degToRad(90);
        this.controls.maxDistance = 200;
        this.controls.minDistance = 20;
        this.controls.enablePan = false;
        this.controls.update();
    }

    getControls() {
        return this.controls;
    }
}
