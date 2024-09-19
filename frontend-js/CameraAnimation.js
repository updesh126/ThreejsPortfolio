// CameraAnimation.js

import * as THREE from "three";
import anime from "animejs/lib/anime.es.js";

export default class CameraAnimationPlay {
  constructor(camera, box) {
    this.camera = camera;
    this.box = box;
  }

  animateCamera(target, duration = 2000) {
    anime({
      targets: this.camera.position,
      x: target.x,
      y: target.y,
      z: target.z,
      duration,
      easing: "easeInOutQuad",
    });

    anime({
      targets: this.camera.rotation,
      x: 0,
      y: 0,
      z: 0,
      duration,
      easing: "easeInOutQuad",
    });
  }

  onClickBox() {
    const targetPosition = new THREE.Vector3();
    if (this.box instanceof THREE.Object3D) {
      this.box.getWorldPosition(targetPosition);
      this.animateCamera(targetPosition);
    } else {
      console.error("box is not an instance of THREE.Object3D");
    }
  }
}
