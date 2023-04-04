import * as THREE from 'three';
import { Color } from 'three';



let scene
let camera
let renderer
let sceneObjects = []

async function init() {
  scene = new THREE.Scene();
  camera = new THREE.OrthographicCamera(0, 1, 1, 0, 0.1, 1000);

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  camera.position.set(0, 0, 1)

  await setUp()
  animate();
}


async function setUp() {
  const vsh = await fetch('vertexShader.glsl');
  const fsh = await fetch('fragShader.glsl');

  const material = new THREE.ShaderMaterial({
    uniforms: {
      time: {value: test.clock.getElapsedTime()},
    },
    vertexShader: await vsh.text(),
    fragmentShader: await fsh.text()
  });


  const geometry = new THREE.PlaneGeometry(1, 1);
  const plane = new THREE.Mesh(geometry, material);
  plane.position.set(0.5, 0.5, 0);
  scene.add(plane)

}

window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);

}

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

init()




