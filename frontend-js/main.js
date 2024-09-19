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
  let roomModel, fridgeModel, ledAction, customMaterial;

  const envMap = await loader.loadEnvironment(Paths.envMap);
  const scene = new Scene(envMap);

  const controls = new Controls(camera.getCamera(), renderer.getRenderer());

  loader.loadModel(Paths.roomModel, (gltf) => {
    roomModel = gltf.scene;
    roomModel.scale.set(3, 3, 3);
    roomModel.position.set(0, 45, -40);
    scene.getScene().add(roomModel);

    loader.loadModel(Paths.fridgeModel, (gltfFridge) => {
      fridgeModel = gltfFridge.scene;
      fridgeModel.scale.set(15, 15, 15);
      fridgeModel.position.set(1, -49, -5);
      roomModel.add(fridgeModel);

      mixer = new THREE.AnimationMixer(fridgeModel);
      ledAction = mixer.clipAction(
        gltfFridge.animations.find(
          (anim) => anim.name === Paths.fridgeAnimation
        )
      );

      const texture = loader.loadTexture(Paths.silverMetalTexture);
      customMaterial = new ShaderMaterial(envMap, texture);

      fridgeModel.traverse((child) => {
        if (
          child.isMesh &&
          ["door1", "door2", "outside"].includes(child.name)
        ) {
          child.material = customMaterial.getMaterial();
        }
      });
    });

    const box = new Box({
      position: { x: 0, y: 10, z: 80 },
      scale: { x: 4, y: 4, z: 4 },
      visible: false,
    });

    scene.getScene().add(box.getBox());

    const animation = new AnimationPlay();
    const cameraAnimation = new CameraAnimationPlay(
      camera.getCamera(),
      box.getBox()
    );

    document.getElementById("animation1").addEventListener("click", () => {
      animation.playAnimation(ledAction);
      cameraAnimation.onClickBox();
    });

    document.querySelectorAll(".color").forEach((option) => {
      option.addEventListener("click", function () {
        const color = this.getAttribute("data-color");
        changeModelColor(color, customMaterial);
      });
    });

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
  });

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
