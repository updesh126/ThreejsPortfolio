// src/main.js

import * as THREE from "three";
import Camera from "./components/Camera.js";
import Renderer from "./components/Renderer.js";
import Scene from "./components/Scene.js";
import Controls from "./components/Controls.js";
import Loader from "./components/Loader.js";
import ShaderMaterial from "./components/ShaderMaterial.js";
import AnimationPlay from "./components/Animation.js";
import CameraAnimationPlay from "./components/CameraAnimation.js";
import Box from "./components/Box.js";
import Paths from "./components/Path.js"; // Import the paths
import GradientMaterial from "./components/GradientMaterial";

import Floor from "./components/Floor.js";
import Light from "./components/Light.js";
import Skybox from "./components/Skybox.js";

import WASDPlayerController from "./components/WASDPlayerController.js";

let mixer;

async function init() {
  const camera = new Camera();
  const renderer = new Renderer();
  const loader = new Loader();
  const animation = new AnimationPlay();
  let roomModel, fridgeModel, ledAction, customMaterial;

  const clock = new THREE.Clock();
  // const envMap = await loader.loadEnvironment(Paths.envMap);
  const scene = new Scene();

  const playerController = new WASDPlayerController(
    scene.getScene(),
    Paths.playerModel,
    camera.getCamera() // Pass camera
  );
  const controls = new Controls(camera.getCamera(), renderer.getRenderer());

  loader.loadModel(Paths.playerModel, (gltfFridge) => {
    const playerModel = gltfFridge.scene;
    playerModel.scale.set(15, 15, 15);
    playerModel.position.set(1, -49, -5);
  });

  // Create and add lighting to the scene
  const light = new Light();
  scene.getScene().add(light.getAmbientLight());
  scene.getScene().add(light.getDirectionalLight());

  // Gradient skybox options with orange and its shade
  let skyboxType = "gradient"; // Choose the gradient skybox type
  let skyboxOptions = {
    topColor: 0xc0d6e4, // Light color at the top (Moccasin)
    bottomColor: 0xe5e9f0, // Softer yellow color at the bottom (Gold)
  };

  // Create skybox based on selected type and options
  const skybox = new Skybox(skyboxType, skyboxOptions);

  // Add the gradient skybox to the scene
  scene.getScene().add(skybox.getSkybox());

  const gradientMat = new GradientMaterial({
    topColor: new THREE.Color(0xff0000), // Red
    bottomColor: new THREE.Color(0x0000ff), // Blue
  });

  // Create and add a nearly endless floor to the scene with gradient dissolve effect
  const floor = new Floor({
    width: 10000,
    height: 10000,
    topColor: 0xc0d6e4, // Matching color to the skybox
    bottomColor: 0xe5e9f0, // Matching color to the skybox
  });
  scene.getScene().add(floor.getFloor());
  // Create a Box with a basic material
  const box = new Box({
    position: { x: 0, y: 2, z: 0 },
    scale: { x: 2, y: 2, z: 2 },
    color: 0xff0000, // Red color
  });
  box.setMaterial(gradientMat.getMaterial());

  // Add the box to your scene
  scene.getScene().add(box.getBox());

  setTimeout(() => {
    const loadingpage = document.querySelector(".load");
    const container = document.getElementById("container");
    container.style.display = "block";
    loadingpage.style.display = "none";
  }, 500);

  function animate() {
    requestAnimationFrame(animate);
    const deltaTime = clock.getDelta();

    playerController.update(deltaTime);
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
