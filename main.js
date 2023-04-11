import * as THREE from 'three';
import { BoxGeometry, Clock, Color, SphereGeometry } from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';





let scene
let camera
let renderer
let sceneObjects = []
let uniforms
let clock = new Clock;
let controls






async function init() {
  clock.start();
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  controls = new OrbitControls(camera, renderer.domElement);
  camera.position.z = 5;
  controls.update();



  await setUp()
  animate();
}



async function setUp() {
  const vsh = await fetch('vertexShader.glsl');
  const fsh = await fetch('fragShader.glsl');

  uniforms = {
    time: { value: clock.getElapsedTime() },
    size: { value: 0 }
  }

  const material = new THREE.ShaderMaterial({
    uniforms: uniforms,
    vertexShader: await vsh.text(),
    fragmentShader: await fsh.text(),

  });
  const loader = new THREE.CubeTextureLoader();
  const texture = loader.load([
    './resources/Cold_Sunset__Cam_2_Left+X.png',
    './resources/Cold_Sunset__Cam_3_Right-X.png',
    './resources/Cold_Sunset__Cam_4_Up+Y.png',
    './resources/Cold_Sunset__Cam_5_Down-Y.png',
    './resources/Cold_Sunset__Cam_0_Front+Z.png',
    './resources/Cold_Sunset__Cam_1_Back-Z.png',
  ]);
  scene.background = texture;



  const geometry = new THREE.BoxGeometry(1, 1, 1);
  uniforms.size.value = new THREE.Vector3(geometry.parameters.width, geometry.parameters.height, geometry.parameters.depth).multiplyScalar(0.5)

  const plane = new THREE.Mesh(geometry, material);

  scene.add(plane)

}

window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);

}

function animate() {
  uniforms.time.value = clock.getElapsedTime();
  requestAnimationFrame(animate);
  controls.update()
  renderer.render(scene, camera);

}

init()




