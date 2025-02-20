
class Model_3d {
    constructor(id, path, camera_z, light) {
        
        let container;
        let camera;
        let renderer;
        let scene;
        let laokoon;

        container = document.querySelector(id);

        //Create scene
        scene = new THREE.Scene();
        
        //Camera setup
        const fov = 35;
        const aspect = container.clientWidth / container.clientHeight;
        const near = 0.1;
        const far = 500;
        camera = new THREE.PerspectiveCamera(fov,aspect,near,far);
        camera.position.set(camera_z,0,0);
    
        //Light
        const ambient = new THREE.AmbientLight(light, 20)
        scene.add(ambient);
        // const light = new THREE.DirectionalLight(0xffffff, 20);
        // light.position.set(0,30,10);
        // scene.add(light);
    
        //Renderer
        renderer = new THREE.WebGLRenderer({antialias:true, alpha:true});
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        container.appendChild(renderer.domElement);
    
        var controls = new THREE.OrbitControls(camera, renderer.domElement);
        controls.update();
    
        //Load Model
        let loader = new THREE.GLTFLoader();
        loader.load(path, function(gltf){
            scene.add(gltf.scene);
            laokoon = gltf.scene.children[0];
            animate();
        }, undefined, function (error) {
            console.log(error);
        });
    
        //Animation
        function animate(){
            requestAnimationFrame(animate);
            // if (if (!IsMouseOver(oi)))
            laokoon.rotation.z += 0.002;
            renderer.render(scene, camera);
        }

        this.container = container;
        this.camera = camera;
        this.renderer = renderer;
        this.scene = scene;
        this.laokoon = laokoon;
    }
}



var gilly;
var caracalla;
var dresdnerMaenade;
var aphrodite;

function init(){
    gilly = new Model_3d("#gilly", "./Gilly/scene.gltf", 20, 0x151515);
    caracalla = new Model_3d("#caracalla", "./Caracalla_cleanup/scene.gltf", 20, 0x151515);
    dresdnerMaenade = new Model_3d("#dresdnerMaenade", "./DresdnerMaenade_cleanup/scene.gltf", 8, 0x151515);
    puesterich = new Model_3d("#puesterich", "./Puesterich_cleanup/scene.gltf", 7, 0x303030);

}

window.onload = init;


function onWindowRezise(){
    renderer.setSize(container.clientWidth, container.clientHeight);
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
}

window.addEventListener("resize", onWindowRezise);
