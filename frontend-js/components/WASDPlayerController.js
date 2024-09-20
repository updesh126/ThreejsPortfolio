import * as THREE from "three";
import Loader from "./Loader.js";
import AnimationPlay from "./Animation.js"; // Import your AnimationPlay class

export default class WASDPlayerController {
  constructor(scene, modelUrl, camera) {
    this.scene = scene;
    this.camera = camera;
    this.movementSpeed = 10; // Speed of the player
    this.keysPressed = {
      forward: false,
      backward: false,
      left: false,
      right: false,
    };

    this.loader = new Loader();
    this.player = null;
    this.animationPlay = new AnimationPlay(); // Initialize AnimationPlay
    this.mixer = null;
    this.currentAction = null;
    this.idleAction = null;
    this.walkingAction = null;

    this.loader.loadModel(modelUrl, (gltf) => {
      this.player = gltf.scene;

      // Set initial player position and scale
      this.player.position.set(0, 0, 0);
      this.player.scale.set(1, 1, 1);

      // Initialize animation mixer
      this.mixer = new THREE.AnimationMixer(this.player);

      // Load animations
      const animations = gltf.animations;
      if (animations && animations.length > 0) {
        this.idleAction = this.mixer.clipAction(
          animations.find((anim) => anim.name === "Skeleton|Idle")
        );
        this.walkingAction = this.mixer.clipAction(
          animations.find((anim) => anim.name === "Skeleton|Walking")
        );

        this.idleAction.play(); // Start with idle animation
        this.currentAction = this.idleAction;
      }

      this.scene.add(this.player); // Add player to the scene
    });

    this.initKeyListeners(); // Initialize key event listeners
  }

  initKeyListeners() {
    document.addEventListener("keydown", (event) => {
      switch (event.code) {
        case "KeyW":
          this.keysPressed.forward = true;
          break;
        case "KeyS":
          this.keysPressed.backward = true;
          break;
        case "KeyA":
          this.keysPressed.left = true;
          break;
        case "KeyD":
          this.keysPressed.right = true;
          break;
      }
    });

    document.addEventListener("keyup", (event) => {
      switch (event.code) {
        case "KeyW":
          this.keysPressed.forward = false;
          break;
        case "KeyS":
          this.keysPressed.backward = false;
          break;
        case "KeyA":
          this.keysPressed.left = false;
          break;
        case "KeyD":
          this.keysPressed.right = false;
          break;
      }
    });
  }

  update(deltaTime) {
    if (!this.player) return;

    // Update the animation mixer
    if (this.mixer) this.mixer.update(deltaTime);

    // Handle player movement and animations
    this.handleMovement(deltaTime);

    // Update the camera to follow the player with offset
    this.updateCameraPosition();
  }

  handleMovement(deltaTime) {
    const moveDistance = this.movementSpeed * deltaTime;

    // Reset velocity
    const velocity = new THREE.Vector2();

    if (this.keysPressed.forward) velocity.y = -moveDistance; // Forward
    if (this.keysPressed.backward) velocity.y = moveDistance; // Backward
    if (this.keysPressed.left) velocity.x = -moveDistance; // Left
    if (this.keysPressed.right) velocity.x = moveDistance; // Right

    // Move player based on velocity
    this.player.position.x += velocity.x;
    this.player.position.z += velocity.y; // Use z-axis for forward/backward movement

    // Change animation based on movement
    if (velocity.length() > 0) {
      this.playAnimation(this.walkingAction, true); // Loop walking
      this.rotatePlayer(velocity); // Call rotatePlayer with velocity only
    } else {
      this.playAnimation(this.idleAction, false); // Stop looping
    }
  }

  rotatePlayer(velocity) {
    const direction = new THREE.Vector3(velocity.x, 0, velocity.y);

    // If there's no velocity, return early
    if (direction.length() === 0) return;

    direction.normalize();

    // Calculate the target rotation
    const targetRotation = Math.atan2(direction.x, direction.z);

    // Create a quaternion for the target rotation
    const targetQuaternion = new THREE.Quaternion();
    targetQuaternion.setFromEuler(new THREE.Euler(0, targetRotation, 0));

    // Smooth rotation
    const currentQuaternion = this.player.quaternion.clone();
    currentQuaternion.slerp(targetQuaternion, 0.1); // Adjust this value for rotation speed

    // Apply the smoothed quaternion to the player
    this.player.quaternion.copy(currentQuaternion);
  }

  playAnimation(action, loop) {
    if (this.currentAction !== action) {
      if (this.currentAction) {
        this.animationPlay.playAnimation(this.currentAction); // Fade out current action
      }
      action.setLoop(loop ? THREE.LoopRepeat : THREE.LoopOnce); // Set looping
      action.reset().play(); // Reset and play new action
      this.currentAction = action;
    }
  }

  updateCameraPosition() {
    if (this.player) {
      // Set camera offset for a 2.5D-like view
      const cameraOffset = new THREE.Vector3(0, 5, 5); // Adjust the y and z values for height and distance
      const playerPosition = this.player.position.clone();
      playerPosition.add(cameraOffset);

      this.camera.position.copy(playerPosition);
      this.camera.lookAt(this.player.position);
    }
  }
}
