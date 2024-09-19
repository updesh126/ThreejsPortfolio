// src/ShaderMaterial.js
import * as THREE from "three";

export default class ShaderMaterial {
  constructor(envMap, texture) {
    this.material = new THREE.ShaderMaterial({
      uniforms: {
        color: { value: new THREE.Color(0xffffff) },
        metalness: { value: 0.7 },
        roughness: { value: 0.14 },
        tDiffuse: { value: texture },
        envMap: { value: envMap },
      },
      vertexShader: document.getElementById("vertexShader").textContent,
      fragmentShader: document.getElementById("fragmentShader").textContent,
    });
  }

  getMaterial() {
    return this.material;
  }

  setColor(color) {
    this.material.uniforms.color.value.set(color);
  }
}
