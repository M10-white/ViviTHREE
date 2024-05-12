import * as THREE from 'three'
import GLTFLoader from 'gltfloader'
 
const scene = new THREE.Scene()
scene.background = new THREE.Color(0xCCCCCC) 

const camera = new THREE.PerspectiveCamera(70, iw / ih)

//VIVI
const geometry = await GLTFLoader.loadGeometry('assets/characters/bibi.glb')
const texture = await GLTFLoader.loadTexture('assets/characters/bibi.png')
const material = new THREE.MeshPhongMaterial({ map: texture, roughness: 0.5, metalness: 0.5 })
material.ambient = new THREE.Color(0xFFFFFF)
const mesh = new THREE.Mesh(geometry, material)

const ambientLight = new THREE.AmbientLight(0xFFFFFF)// Lumière ambiante
const light = new THREE.PointLight(0xffffff)
const textureLoader = new THREE.TextureLoader();

// SOL
const dialogGeometry = new THREE.BoxGeometry(700, 0.5, 600)
const dialogueTexture = textureLoader.load('assets/images/sand.png')
const dialogMaterial = new THREE.MeshPhongMaterial({ map: dialogueTexture, roughness: 0.5, metalness: 0.5 })
dialogMaterial.ambient = new THREE.Color(0xFFFFFF)
const dialogMesh = new THREE.Mesh(dialogGeometry, dialogMaterial)

//FOND
const backgroundTexture = textureLoader.load('assets/images/map.png');
const backgroundGeometry = new THREE.PlaneGeometry(2000, 1000, 1);
const backgroundMaterial = new THREE.MeshBasicMaterial({ map: backgroundTexture })
const backgroundMesh = new THREE.Mesh(backgroundGeometry, backgroundMaterial)

// Ajout scène
scene.add(backgroundMesh)
scene.add(light)
scene.add(mesh)
scene.add(ambientLight)
scene.add(dialogMesh)

backgroundMesh.position.set(0, 75, -600)
mesh.position.set(0, 0, 0) 
dialogMesh.position.set(0, 0.1, 0)
camera.position.set(0, 2.5, 3)
light.position.set(0, 0, 0)
ambientLight.position.set(0, 1, 1)

window.addEventListener('changeMeshPosition', (event) => {
  const { x, y, z } = event.detail;
  mesh.position.set(x, y, z);
});

window.addEventListener('changeMeshPositionInitial', (event) => {
  const { x, y, z } = event.detail;
  mesh.position.set(x, y, z);
});


const renderer = new THREE.WebGLRenderer({ canvas })

let t = 0
const clock = new THREE.Clock()

window.addEventListener('resize', handleWindowResize)

handleWindowResize()

loop()

function loop() {
  t += clock.getDelta()
  mesh.morphTargetInfluences[0] = Math.abs(Math.cos(t))
  //mesh.rotation.y = Math.cos(t/2)
  renderer.render(scene, camera)
  requestAnimationFrame(loop)
}

function handleWindowResize() {
    const width = window.innerWidth
    const height = window.innerHeight
    
    renderer.setSize(width, height)
    camera.aspect = width / height
    camera.updateProjectionMatrix()
}

//  A FAIRE PROCHAINEMENT
//  - IDEE D'AJOUT DE MUSIQUE
//      CHANGER LA MUSIQUE EN FONCTION DES ANIMATIONS DES BOUTONS
//  - AMELIORER LA TRANSITION  P1 -> P2

