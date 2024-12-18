// VanillaTilt for 3D Card Interaction
VanillaTilt.init(document.querySelectorAll(".card"), {
    max: 30,
    speed: 400,
    glare: true,
    "max-glare": 0.5,
});

// Particle Background (three.js)
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.querySelector('#bg') });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

const geometry = new THREE.BufferGeometry();
const count = 1000;
const positions = new Float32Array(count * 3);

for (let i = 0; i < count * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 20;
}
geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

const material = new THREE.PointsMaterial({ color: 0xffcc00, size: 0.05 });
const points = new THREE.Points(geometry, material);
scene.add(points);

camera.position.z = 5;

function animate() {
    requestAnimationFrame(animate);
    points.rotation.x += 0.001;
    points.rotation.y += 0.001;
    renderer.render(scene, camera);
}
animate();





