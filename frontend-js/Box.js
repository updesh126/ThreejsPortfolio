import * as THREE from "three";

export default class Box {
  constructor({
    position = { x: 0, y: 0, z: 0 },
    rotation = { x: 0, y: 0, z: 0 },
    scale = { x: 1, y: 1, z: 1 },
    visible = true,
  } = {}) {
    this.box = new THREE.Mesh(
      new THREE.BoxGeometry(),
      new THREE.MeshBasicMaterial({ color: 0xffffff })
    );
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
}
