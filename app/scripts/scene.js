// variables
var container;
var camera, scene, renderer;
var clock, delta;
var smoke;

var width, height;

init();
animate();

// initialize scene
function init() {

	width = window.innerWidth;
	height = window.innerHeight;

	clock = new THREE.Clock();

	container = document.createElement( 'section' );
	document.body.appendChild( container );

	// camera
	camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 3000 );
	camera.position.z = 1000;

	scene = new THREE.Scene();

	// light
	ambientLight = new THREE.AmbientLight( 0xffffff, 0.5 );
	scene.add( ambientLight );

	// loader
	var textureLoader = new THREE.TextureLoader();

	// smoke
	smokeMaterial = new THREE.MeshLambertMaterial({
		color: 0xffffff,
		map: textureLoader.load( './images/smoke.png' ),
		transparent: true
	});
	smokeGeo = new THREE.PlaneBufferGeometry( 300, 300 );
	smoke = [];

	// create smoke
	for ( var i = 0; i < 25; i++ ) {
		var particle = new THREE.Mesh(smokeGeo, smokeMaterial);
		particle.position.x = Math.random() * 500 - 250;
		particle.position.y = Math.random() * 500 - 250;
		particle.position.z = Math.random() * 1000 - 100;
		particle.rotation.z = Math.random() * 360;
		particle.scale.x = particle.scale.y = 1 + Math.random() * 2;
		particle.rotation.directionZ = rotationDirection(Math.random());
		particle.rotation.speed = (( Math.random() + 1) / 10 ).toFixed( 2 );
		scene.add( particle );
		smoke.push( particle );
	}

	// initialise webgl renderer
	renderer = new THREE.WebGLRenderer();
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	container.appendChild( renderer.domElement );

	// eventlistner for resize
	window.addEventListener( 'resize', onWindowResize, false );

}

// Render Function
function render() {

	delta = clock.getDelta();

	var i = smoke.length;
	// rotate smoke
	while ( i-- ) {
		smoke[i].rotation.z += ( delta * smoke[i].rotation.speed * smoke[i].rotation.directionZ );
	}

	renderer.render( scene, camera );

}

// Animation Loop
function animate() {

	requestAnimationFrame( animate );

	render();

}

function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );
}

// rotation direction function
function rotationDirection(number) {
	return number < 0.5 ? -1 : 1;
}