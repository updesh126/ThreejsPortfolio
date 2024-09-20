// Environment.js
import * as THREE from "three";
import Loader from "./Loader.js";

export default class Environment {
  constructor(scene, models) {
    this.scene = scene;
    this.loader = new Loader();
    this.environmentModels = [];

    this.loadEnvironments(models);
  }

  loadEnvironments(models) {
    models.forEach(({ url, position, rotation, scale, id }) => {
      this.loader.loadModel(url, (gltf) => {
        const environment = gltf.scene;

        // Set position, rotation, and scale
        environment.position.set(position.x, position.y, position.z);
        environment.rotation.set(rotation.x, rotation.y, rotation.z);
        environment.scale.set(scale.x, scale.y, scale.z);

        // Store model with its ID
        this.environmentModels.push({ id, model: environment });
        this.scene.add(environment); // Add environment to the scene
      });
    });
  }
}
