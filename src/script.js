import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// initialize the scene
const scene = new THREE.Scene();

// add objects to the scene
const cubeGeometry = new THREE.BoxGeometry(1,1,1);
const cubeMaterial = new THREE.MeshBasicMaterial({color: "red"});

const cubeMesh = new THREE.Mesh(
  cubeGeometry,
  cubeMaterial
);
scene.add(cubeMesh);

// initialize the perspective camera
const aspectRatio = window.innerWidth / window.innerHeight;

const camera = new THREE.PerspectiveCamera(
  75, 
  aspectRatio,
  0.1,
  30
);

// initialize the orthographic camera
// const camera = new THREE.OrthographicCamera(
  // -1 * aspectRatio, 1 * aspectRatio, 1, -1, 0.1, 200
// )

camera.position.z = 5;

// initialize the renderer
const canvas = document.querySelector('canvas.threejs');
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);

// Init orbit controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.autoRotate = true;

// Add resize event listener
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Set render loop
const renderLoop = () => {
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(renderLoop);
}

// Run render loop
renderLoop();
