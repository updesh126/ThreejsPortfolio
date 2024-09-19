// src/Scene.js
import * as THREE from 'three';

export default class Scene {
    constructor(environment) {
        this.scene = new THREE.Scene();
        this.scene.environment = environment;
    }

    getScene() {
        return this.scene;
    }
}
