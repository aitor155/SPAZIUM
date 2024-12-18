// VanillaTilt for 3D Card Interaction
VanillaTilt.init(document.querySelectorAll(".card"), {
    max: 30,
    speed: 400,
    glare: true,
    "max-glare": 0.5,
});

// Particle Background with Bowling Images (three.js)
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.querySelector('#bg'), alpha: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

const textureLoader = new THREE.TextureLoader();
const bowlingTexture = textureLoader.load('images/bowling.png'); // Path to your bowling image

// Geometry for particles
const geometry = new THREE.BufferGeometry();
const count = 1000; // Number of particles
const positions = new Float32Array(count * 3);

for (let i = 0; i < count * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 20; // Random position in 3D space
}
geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

// Material using the bowling image
const material = new THREE.PointsMaterial({
    map: bowlingTexture,
    size: 0.5, // Size of each particle
    transparent: true, // Enable transparency
    depthWrite: false // Prevent overlapping issues
});

const points = new THREE.Points(geometry, material);
scene.add(points);

camera.position.z = 10;

function animate() {
    requestAnimationFrame(animate);
    points.rotation.x += 0.001; // Subtle rotation for animation
    points.rotation.y += 0.001;
    renderer.render(scene, camera);
}

animate();

// Handle resizing
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});






