import {
  Clock,
  PerspectiveCamera,
  Scene,
  AmbientLight,
  TextureLoader,
  MeshLambertMaterial,
  PlaneBufferGeometry,
  Mesh,
  WebGLRenderer,
} from 'three';

const smokeImg = require('../images/smoke.png');

// variables
let container;
let camera;
let scene;
let renderer;
let clock;
let delta;
let smoke;

const onWindowResize = () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
};

// rotation direction function
const rotationDirection = number => (number < 0.5 ? -1 : 1);

// initialize scene
const init = () => {
  clock = new Clock();

  container = document.createElement('section');
  container.style = `
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  `;
  document.body.appendChild(container);

  // camera
  camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 3000);
  camera.position.z = 1000;

  scene = new Scene();

  // light
  const ambientLight = new AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  // loader
  const textureLoader = new TextureLoader();

  // smoke
  const smokeMaterial = new MeshLambertMaterial({
    color: 0xffffff,
    map: textureLoader.load(smokeImg),
    transparent: true,
  });
  const smokeGeo = new PlaneBufferGeometry(300, 300);
  smoke = [];

  // create smoke
  for (let i = 0; i < 25; i += 1) {
    const particle = new Mesh(smokeGeo, smokeMaterial);
    particle.position.x = Math.random() * 500 - 250;
    particle.position.y = Math.random() * 500 - 250;
    particle.position.z = Math.random() * 1000 - 100;
    particle.rotation.z = Math.random() * 360;
    particle.scale.y = 1 + Math.random() * 2;
    particle.scale.x = particle.scale.y;
    particle.rotation.directionZ = rotationDirection(Math.random());
    particle.rotation.speed = parseFloat(((Math.random() + 1) / 10).toFixed(2), 10);
    scene.add(particle);
    smoke.push(particle);
  }

  // initialise webgl renderer
  renderer = new WebGLRenderer();
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);

  // eventlistner for resize
  window.addEventListener('resize', onWindowResize, false);
};

// Render Function
const render = () => {
  delta = clock.getDelta();

  smoke.forEach((item) => {
    // eslint-disable-next-line no-param-reassign
    item.rotation.z += (delta * item.rotation.speed * item.rotation.directionZ);
  });

  renderer.render(scene, camera);
};

// Animation Loop
const animate = () => {
  requestAnimationFrame(animate);
  render();
};

init();
animate();
