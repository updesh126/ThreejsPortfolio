// src/Renderer.js
import * as THREE from 'three';

export default class Renderer {
    constructor() {
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    }

    getRenderer() {
        return this.renderer;
    }

    resize() {
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    render(scene, camera) {
        this.renderer.render(scene, camera);
    }
}
