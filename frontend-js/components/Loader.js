// src/Loader.js
import * as THREE from 'three';
// Other imports and code

import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';
import { TextureLoader } from 'three';

export default class Loader {
    constructor() {
        this.gltfLoader = new GLTFLoader();
        const dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath('jsm/libs/draco/gltf/');
        this.gltfLoader.setDRACOLoader(dracoLoader);
        this.hdrLoader = new RGBELoader();
        this.textureLoader = new TextureLoader();
    }

    async loadEnvironment(url) {
        const envMap = await this.hdrLoader.loadAsync(url);
        envMap.mapping = THREE.EquirectangularReflectionMapping;
        return envMap;
    }

    loadModel(url, onLoad) {
        this.gltfLoader.load(url, onLoad);
    }

    loadTexture(url) {
        return this.textureLoader.load(url);
    }
}
