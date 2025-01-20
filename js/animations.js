// VanillaTilt for 3D Card Interaction
VanillaTilt.init(document.querySelectorAll(".card"), {
    max: 30,
    speed: 400,
    glare: true,
    "max-glare": 0.5,
});

// Particle Background with Multiple Textures (three.js)
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.querySelector('#bg'), alpha: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

const textureLoader = new THREE.TextureLoader();
const texturePaths = [
    'images/bowling.png',   // Bowling
    'images/darts.png',     // Darts
    'images/morti.png',    // Arcade
    'images/food.png',      // Food
    'images/music.png'      // Music
];

const textures = [];
let loadedTextures = 0;

function preloadTextures() {
    return new Promise((resolve, reject) => {
        texturePaths.forEach((path, index) => {
            textureLoader.load(
                path,
                (texture) => {
                    texture.flipY = false; // Correct the vertical flip for all textures
                    textures[index] = texture; // Assign texture to the array
                    loadedTextures++;
                    if (loadedTextures === texturePaths.length) {
                        resolve(); // All textures are loaded
                    }
                },
                undefined,
                (error) => {
                    console.error(`Error loading texture ${path}:`, error);
                    reject(error);
                }
            );
        });
    });
}

preloadTextures()
    .then(() => {
        console.log('All textures loaded:', textures);

        // Geometry for particles
        const geometry = new THREE.BufferGeometry();
        const count = 1000; // Number of particles
        const positions = new Float32Array(count * 3);
        const textureIndexes = new Float32Array(count); // To hold texture indices

        for (let i = 0; i < count; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 20; // x
            positions[i * 3 + 1] = (Math.random() - 0.5) * 20; // y
            positions[i * 3 + 2] = (Math.random() - 0.5) * 20; // z

            textureIndexes[i] = Math.floor(Math.random() * textures.length); // Random texture index
        }
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('textureIndex', new THREE.BufferAttribute(textureIndexes, 1));

        // Shader material to use multiple textures
        const material = new THREE.ShaderMaterial({
            uniforms: {
                textures: { value: textures },
            },
            vertexShader: `
                attribute float textureIndex;
                varying float vTextureIndex;

                void main() {
                    vTextureIndex = textureIndex;
                    gl_PointSize = 300.0 / - (modelViewMatrix * vec4(position, 1.0)).z; // Adjust size based on depth
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                uniform sampler2D textures[${textures.length}];
                varying float vTextureIndex;

                void main() {
                    vec2 uv = gl_PointCoord; // Get particle UV coordinates
                    vec4 textureColor = vec4(0.0);

                    // Use the correct texture based on textureIndex
                    if (vTextureIndex < 0.5) {
                        textureColor = texture2D(textures[0], uv);
                    } else if (vTextureIndex < 1.5) {
                        textureColor = texture2D(textures[1], uv);
                    } else if (vTextureIndex < 2.5) {
                        textureColor = texture2D(textures[2], uv);
                    } else if (vTextureIndex < 3.5) {
                        textureColor = texture2D(textures[3], uv);
                    } else {
                        textureColor = texture2D(textures[4], uv);
                    }

                    if (textureColor.a < 0.1) discard; // Discard transparent areas
                    gl_FragColor = textureColor;
                }
            `,
            transparent: true,
            depthWrite: false
        });

        // Create particle system
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
    })
    .catch((error) => {
        console.error('Error loading textures:', error);
    });

// Handle resizing
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

