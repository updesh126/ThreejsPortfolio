import * as THREE from "three";

export default class GradientMaterial {
  constructor({
    topColor = new THREE.Color(0xffffff),
    bottomColor = new THREE.Color(0x0000ff),
    side = THREE.FrontSide,
  } = {}) {
    this.material = new THREE.ShaderMaterial({
      uniforms: {
        topColor: { value: topColor },
        bottomColor: { value: bottomColor },
      },
      vertexShader: `
        varying vec3 vPosition;
        
        void main() {
          vPosition = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 topColor;
        uniform vec3 bottomColor;
        varying vec3 vPosition;
        
        void main() {
          float gradient = vPosition.y;
          vec3 color = mix(bottomColor, topColor, gradient);
          gl_FragColor = vec4(color, 1.0);
        }
      `,
      side: side,
    });
  }

  getMaterial() {
    return this.material;
  }

  setTopColor(color) {
    if (color instanceof THREE.Color) {
      this.material.uniforms.topColor.value = color;
    } else {
      console.error(
        "Invalid color provided. Must be an instance of THREE.Color."
      );
    }
  }

  setBottomColor(color) {
    if (color instanceof THREE.Color) {
      this.material.uniforms.bottomColor.value = color;
    } else {
      console.error(
        "Invalid color provided. Must be an instance of THREE.Color."
      );
    }
  }

  setSide(side) {
    if ([THREE.FrontSide, THREE.BackSide, THREE.DoubleSide].includes(side)) {
      this.material.side = side;
    } else {
      console.error(
        "Invalid side provided. Must be THREE.FrontSide, THREE.BackSide, or THREE.DoubleSide."
      );
    }
  }
}
