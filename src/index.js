
/**
 * THREE.js --------------------------------------------------
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// Canvas
const canvas = document.querySelector('.page1-canvas');
const canvas2 = document.querySelector('.page2-canvas');
const canvas3 = document.querySelector('.page3-canvas');
const canvas4 = document.querySelector('.page4-canvas');

// Scene
const scene1 = new THREE.Scene();
const scene2 = new THREE.Scene();
const scene3 = new THREE.Scene();
const scene4 = new THREE.Scene();

//axeshelper
const axeshelper = new THREE.AxesHelper(3);
// scene2.add(axeshelper);

// Loading Manager
const loadingManager = new THREE.LoadingManager(
    //loaded
    () => {
        console.log('all items loaded');
        loadingScreen.style.opacity = '0';
        setTimeout( () => {
            loadingScreen.style.display = 'none';
        }, 1000);

    },
    //progress
    (itemUrl, itemsLoaded, itemsTotal) => {
        console.log(itemUrl, itemsLoaded, itemsTotal);
        const progressRatio = itemsLoaded / itemsTotal;
        console.log(progressRatio);
    }
)

// Models
const gltfLoader = new GLTFLoader(loadingManager);
let mixer1 = null;
let mixer2 = null;
let mixer25 = null;
let mixer3 = null;
let mixer4 = null;

gltfLoader.load(
    '/dist/mdl/buckmodel-animated.glb',
    (gltf) => {
        const model = gltf.scene;
        model.traverse(node => {
            if (node.isObject3D) {
                console.log()
                node.castShadow = true;
            }
        });

        scene1.add(model);
        console.log('intro model loaded')
        console.log(gltf);
        mixer1 = new THREE.AnimationMixer(gltf.scene);
        const metarigAction = mixer1.clipAction(gltf.animations[15]);
        metarigAction.loop = THREE.LoopOnce;
        metarigAction.play();
        mixer1.addEventListener('finished', () => {
            const metarigAction2 = mixer1.clipAction(gltf.animations[16]);
            metarigAction2.play();
        })
        // updateAllMaterials();
        // const eye1Action = mixer1.clipAction(gltf.animations[12]);
        // eye1Action.play();
        // const eye2Action = mixer1.clipAction(gltf.animations[13]);
        // eye2Action.play();

    }
);

gltfLoader.load(
    '/dist/mdl/allchips2.glb',
    (gltf) => {
        const model = gltf.scene;

        scene4.add(model);
        console.log('chips model loaded')
        console.log(gltf);
        mixer4 = new THREE.AnimationMixer(gltf.scene);        

        for (const action of gltf.animations) {

            const clipAction = mixer4.clipAction(action).play();
                clipAction.clampWhenFinished = true;
                clipAction.loop = THREE.LoopOnce;

            // if (action.name.includes('001')) {
            //     const clipAction = mixer4.clipAction(action).play();
            //     clipAction.clampWhenFinished = true;
            //     clipAction.loop = THREE.LoopOnce;
            // }
        }

    }
);

gltfLoader.load(
    '/dist/mdl/computer.glb',
    (gltf) => {
        const model = gltf.scene;
        model.position.y = -1;
        scene3.add(model);
        console.log('computer model loaded')
        console.log(gltf);
        mixer3 = new THREE.AnimationMixer(gltf.scene);

        for (const action of gltf.animations) {
                // const clipAction = mixer2.clipAction(action).play();
                mixer3.clipAction(action).play();
                // clipAction.clampWhenFinished = true;
                // clipAction.loop = THREE.LoopOnce;
        }
    }
);

gltfLoader.load(
    '/dist/mdl/college.glb',
    (gltf) => {
        const model = gltf.scene;
        model.position.y = -3;

        scene2.add(model);
        console.log('college model loaded')
        console.log(gltf);
        mixer2 = new THREE.AnimationMixer(gltf.scene);
        mixer25 = new THREE.AnimationMixer(gltf.scene);
        const buildingAnimations = [mixer2.clipAction(gltf.animations[0]), mixer2.clipAction(gltf.animations[1]), mixer2.clipAction(gltf.animations[2])];
        const hat1Animations = [mixer25.clipAction(gltf.animations[3]), mixer25.clipAction(gltf.animations[4]), mixer25.clipAction(gltf.animations[5])];
        const hat2Animations = [mixer25.clipAction(gltf.animations[6]), mixer25.clipAction(gltf.animations[7]), mixer25.clipAction(gltf.animations[8])];
        const hat3Animations = [mixer25.clipAction(gltf.animations[9]), mixer25.clipAction(gltf.animations[10]), mixer25.clipAction(gltf.animations[11])];

        for (const action of buildingAnimations) {
                const clipAction = action.play();
                // action.play();
                // clipAction.clampWhenFinished = true;
                // clipAction.loop = THREE.LoopOnce;
        }


        mixer2.addEventListener('loop', () => {
            // for (const action of buildingAnimations) {
            //     const clipAction = action.play();
            //     // clipAction.clampWhenFinished = true;
            //     clipAction.loop = THREE.LoopOnce;
            // }
            const hatAction1 = hat1Animations[Math.floor(Math.random() * 3)].play();
            const hatAction2 = hat2Animations[Math.floor(Math.random() * 3)].play();
            const hatAction3 = hat3Animations[Math.floor(Math.random() * 3)].play();

            // hatAction1.repetitions = 1;
            // hatAction2.repetitions = 1;
            // hatAction3.repetitions = 1;

        })
        mixer25.addEventListener('loop', () => {
            mixer25.stopAllAction();

        });

    }
);




/**
 * Walls
 */
const walls = new THREE.Mesh(
    new THREE.BoxGeometry(100, 100, 100),
    new THREE.MeshBasicMaterial({
        color: 'white',
        side: THREE.BackSide,
    })
)
scene1.add(walls);

const walls2 = new THREE.Mesh(
    new THREE.BoxGeometry(100, 100, 100),
    new THREE.MeshBasicMaterial({
        color: 'white',
        side: THREE.BackSide,
    })
)
scene2.add(walls2);

const walls3 = new THREE.Mesh(
    new THREE.BoxGeometry(100, 100, 100),
    new THREE.MeshBasicMaterial({
        color: 'white',
        side: THREE.BackSide,
    })
)
scene3.add(walls3);


const walls4 = new THREE.Mesh(
    new THREE.BoxGeometry(100, 100, 100),
    new THREE.MeshBasicMaterial({
        color: 'white',
        side: THREE.BackSide,
    })
)

scene4.add(walls4);
/**
 * Floor
 */
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(100, 100),
    new THREE.MeshStandardMaterial({
        color: 'white',
        metalness: 0.3,
        roughness: 0.5,
        transparent: true,
        opacity: 0.5,
    })
)
floor.receiveShadow = true
floor.rotation.x = - Math.PI * 0.5
scene1.add(floor)

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 0.8)
scene1.add(ambientLight)

const ambientLight2 = new THREE.AmbientLight(0xffffff, 0.8)
scene2.add(ambientLight2)

const ambientLight3 = new THREE.AmbientLight(0xffffff, 0.8)
scene3.add(ambientLight3)

const ambientLight4 = new THREE.AmbientLight(0xffffff, 0.8)
scene4.add(ambientLight4)

const directionalLight = new THREE.DirectionalLight(0xffffff, 2.5)
directionalLight.castShadow = true
directionalLight.shadow.mapSize.set(1024, 1024)
directionalLight.shadow.camera.far = 15
directionalLight.shadow.camera.left = - 7
directionalLight.shadow.camera.top = 7
directionalLight.shadow.camera.right = 7
directionalLight.shadow.camera.bottom = - 7
directionalLight.position.set(-5, 5, 6)
scene1.add(directionalLight)

const directionalLight2 = new THREE.DirectionalLight(0xffffff, 1.5)
directionalLight2.castShadow = false
directionalLight2.shadow.mapSize.set(1024, 1024)
directionalLight2.shadow.camera.far = 15
directionalLight2.shadow.camera.left = - 7
directionalLight2.shadow.camera.top = 7
directionalLight2.shadow.camera.right = 7
directionalLight2.shadow.camera.bottom = - 7
directionalLight2.position.set(-10, 3, 10)
scene2.add(directionalLight2)

const directionalLight3 = new THREE.DirectionalLight(0xffffff, 1.8)
directionalLight3.castShadow = false
directionalLight3.shadow.mapSize.set(1024, 1024)
directionalLight3.shadow.camera.far = 15
directionalLight3.shadow.camera.left = - 7
directionalLight3.shadow.camera.top = 7
directionalLight3.shadow.camera.right = 7
directionalLight3.shadow.camera.bottom = - 7
directionalLight3.position.set(-10, 2, -10)
scene3.add(directionalLight3)

const directionalLight4 = new THREE.DirectionalLight(0xffffff, 0.2)
//  directionalLight4.castShadow = true
directionalLight4.shadow.mapSize.set(1024, 1024)
directionalLight4.shadow.camera.far = 15
directionalLight4.shadow.camera.left = - 7
directionalLight4.shadow.camera.top = 7
directionalLight4.shadow.camera.right = 7
directionalLight4.shadow.camera.bottom = - 7
directionalLight4.position.set(0, -10, 0)
scene4.add(directionalLight4)

/**
* Canvas Sizes
*/
const sizes = {
    width: canvas.clientWidth,
    height: canvas.clientHeight
}

const sizes4 = {
    width: canvas4.clientWidth,
    height: canvas4.clientHeight
}
// console.log('sizes4.width: ' + sizes4.width);
// console.log('sizes4.height: ' + sizes4.height);

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.set(5.5, 5.5, 7.5);
scene1.add(camera);

const camera2 = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera2.position.set(-5, -2, -8);
scene2.add(camera2);

const camera3 = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera3.position.set(6, 4, -5);
scene2.add(camera3);

const camera4 = new THREE.PerspectiveCamera(75, sizes4.width / sizes4.height, 0.1, 100)
camera4.position.set(2.5, -9, 0);
camera4.up.set(0,0,1);
scene4.add(camera4);

// Controls
const controls = new OrbitControls(camera, canvas)
controls.target.set(0, 1, 0)
// controls.enableZoom = false;
controls.enabled = false;

const controls2 = new OrbitControls(camera2, canvas2)
controls2.target.set(0, 1, 0)
controls2.enabled = false;

const controls3 = new OrbitControls(camera3, canvas3)
controls3.target.set(0, 1, 0)
controls3.enabled = false;

const controls4 = new OrbitControls(camera4, canvas4)
controls4.target.set(0, 0, 0)
controls4.enabled = false;


/**
 * Renderer
 */
const renderer1 = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
})
renderer1.shadowMap.enabled = true
renderer1.shadowMap.type = THREE.PCFSoftShadowMap
renderer1.setSize(sizes.width, sizes.height)
renderer1.setPixelRatio(Math.min(window.devicePixelRatio, 2))

const renderer2 = new THREE.WebGLRenderer({
    canvas: canvas2,
    antialias: true
})
renderer2.setSize(sizes.width, sizes.height)
renderer2.setPixelRatio(Math.min(window.devicePixelRatio, 2))

const renderer3 = new THREE.WebGLRenderer({
    canvas: canvas3,
    antialias: true
})
renderer3.setSize(sizes.width, sizes.height)
renderer3.setPixelRatio(Math.min(window.devicePixelRatio, 2))

const renderer4 = new THREE.WebGLRenderer({
    canvas: canvas4,
    antialias: true
})
renderer4.setSize(sizes4.width, sizes4.height)
renderer4.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()
let previousTime = 0

const tick = () => {
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - previousTime
    previousTime = elapsedTime

    if (mixer1 && currentPage === 0) {
        mixer1.update(deltaTime)
    }

    if (mixer2 && currentPage === 1) {
        mixer2.update(deltaTime)
        mixer25.update(deltaTime)
    }

    if (mixer3 && currentPage === 2) {
        mixer3.update(deltaTime)
    }
    if (mixer4 && currentPage === 3) {
        mixer4.update(deltaTime)
    }

    // Update controls
    controls.update()
    // controls4.update()

    // Render
    if (currentPage === 0) {
        renderer1.render(scene1, camera)

    }

    renderer2.render(scene2, camera2)

    renderer3.render(scene3, camera3)

    if (currentPage === 3) {
        renderer4.render(scene4, camera4)
    }

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick();

// document.addEventListener('keydown', (e) => {
//     if (e.key === ' ') {
//         console.log(scene1);
//         console.log(scene4);
//     }
// })
