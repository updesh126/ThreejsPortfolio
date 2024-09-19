// src/components/Box.js

import * as THREE from "three";

export default class Box {
  constructor({
    position = { x: 0, y: 1, z: 0 },
    rotation = { x: 0, y: 0, z: 0 },
    scale = { x: 1, y: 1, z: 1 },
    visible = true,
    color = 0xffffff, // Default color
  } = {}) {
    // Create a basic material (or any other type of material)
    const material = new THREE.MeshBasicMaterial({ color: color });

    this.box = new THREE.Mesh(new THREE.BoxGeometry(), material);
    this.box.position.set(position.x, position.y, position.z);
    this.box.rotation.set(rotation.x, rotation.y, rotation.z);
    this.box.scale.set(scale.x, scale.y, scale.z);
    this.box.visible = visible;
  }

  getBox() {
    return this.box;
  }

  setPosition(x, y, z) {
    this.box.position.set(x, y, z);
  }

  setRotation(x, y, z) {
    this.box.rotation.set(x, y, z);
  }

  setScale(x, y, z) {
    this.box.scale.set(x, y, z);
  }

  hide() {
    this.box.visible = false;
  }

  show() {
    this.box.visible = true;
  }

  setMaterial(material) {
    if (material instanceof THREE.Material) {
      this.box.material = material;
    } else {
      console.error(
        "Invalid material provided. Must be an instance of THREE.Material."
      );
    }
  }
}
