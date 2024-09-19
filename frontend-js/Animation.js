import * as THREE from "three";

export default class AnimationPlay {
  playAnimation(ledAction) {
    if (ledAction) {
      ledAction.reset();
      ledAction.setLoop(THREE.LoopOnce);
      ledAction.clampWhenFinished = true;
      ledAction.timeScale = 2;
      ledAction.play();
    } else {
      console.error("ledAction is not defined");
    }
  }

  update(deltaTime) {
    if (this.mixer) {
      this.mixer.update(deltaTime);
    }
  }
}
