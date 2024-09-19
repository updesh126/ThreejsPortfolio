// src/main.js

import * as THREE from "three";
import Camera from "./Camera.js";
import Renderer from "./Renderer.js";
import Scene from "./Scene.js";
import Controls from "./Controls.js";
import Loader from "./Loader.js";
import ShaderMaterial from "./ShaderMaterial.js";
import AnimationPlay from "./Animation.js";
import CameraAnimationPlay from "./CameraAnimation.js";
import Box from "./Box.js";
import Paths from "./Path.js"; // Import the paths

let mixer;

async function init() {
  const camera = new Camera();
  const renderer = new Renderer();
  const loader = new Loader();
  const animation = new AnimationPlay();
  let roomModel, fridgeModel, ledAction, customMaterial;

  // const envMap = await loader.loadEnvironment(Paths.envMap);
  const scene = new Scene();

  const controls = new Controls(camera.getCamera(), renderer.getRenderer());

  setTimeout(() => {
    const loadingpage = document.querySelector(".load");
    const container = document.getElementById("container");
    container.style.display = "block";
    loadingpage.style.display = "none";
  }, 500);

  function animate() {
    requestAnimationFrame(animate);
    animation.update(0.01);
    if (mixer) {
      mixer.update(0.01);
    }
    renderer.render(scene.getScene(), camera.getCamera());
  }
  animate();

  document.body.appendChild(renderer.getRenderer().domElement);

  window.addEventListener("resize", () => {
    camera.updateAspectRatio();
    renderer.resize();
  });
}

function changeModelColor(color, customMaterial) {
  customMaterial.setColor(color);
}

init();
