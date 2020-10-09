var Counter = 0, meshLoading, isResize = 0;
var scene, camera, clock, renderer, gameUI;
var mTex_fonts = Array(11);
function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 55);
    camera.rotation.set(0, 0, 0);
    scene.background = new THREE.Color(0xf0f0f0);
    var manager = new THREE.LoadingManager(loadModel);
    manager.onProgress = function (item, loaded, total) { };
    function onProgress(xhr) { }
    function onError() { }
    var ambientLight = new THREE.AmbientLight(0xffffff, .81);
    scene.add(ambientLight);
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    document.body.appendChild(renderer.domElement);


    var world = new CANNON.World();
    world.gravity.set(0, 0, -9.82); // m/s²
    var radius = 1; // m
    sphereBody = new CANNON.Body({
        mass: 5, // kg
        position: new CANNON.Vec3(0, 0, 10), // m
        shape: new CANNON.Sphere(radius)
    });
    world.addBody(sphereBody);

    var groundBody = new CANNON.Body({
        mass: 0 // mass == 0 makes the body static
    });
    var groundShape = new CANNON.Plane();
    groundBody.addShape(groundShape);
    world.addBody(groundBody);
    var fixedTimeStep = 1.0 / 60.0; // seconds
    var maxSubSteps = 3;
    var lastTime;

    (function simloop(time) {
        requestAnimationFrame(simloop);
        if (lastTime !== undefined) {
            var dt = (time - lastTime) / 1000;
            world.step(fixedTimeStep, dt, maxSubSteps);
        }
        lastTime = time;
    })();



    const sphere_geometry = new THREE.SphereGeometry(5, 8, 8);
    mesh = new THREE.Mesh(sphere_geometry, new THREE.MeshLambertMaterial({ color: 0x008888 }));
    scene.add(mesh);

    gameUI = new ThreeUI(renderer.domElement, 720);
    AssetLoader.add.image('assets/continue.png');
    AssetLoader.progressListener = function (progress) { };
    AssetLoader.load(function () {
        mTex_Continue = loadUI('assets/continue.png', 0, 0, 0);
        setScreen(GAMEPLAY);
    });
    document.addEventListener('keydown', dealWithKeyboard);
    if (isMobile.any()) {
        document.addEventListener('touchstart', e => { touchEvent(e, 0, 1); });
        document.addEventListener('touchmove', e => { touchEvent(e, 1, 1); });
        document.addEventListener('touchend', e => { touchEvent(e, 2, 1); });
    } else {
        document.addEventListener('mousedown', e => { touchEvent(e, 0, 0); });
        document.addEventListener('mousemove', e => { touchEvent(e, 1, 0); });
        document.addEventListener('mouseup', e => { touchEvent(e, 2, 0); });
    }
    window.addEventListener('resize', onWindowResize, false);
    Draw();
}
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    this.gameUI.resize();
    isResize = 5;
}

function touchEvent(e, type, sys) {

}
var mTex_Continue;
function Draw() {
    requestAnimationFrame(Draw);
    renderer.render(scene, camera);
    gameUI.render(renderer);
    if (mTex_Continue == null) {
        return;
    }

    Counter++;
    if (isResize > 0) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        this.gameUI.resize();
        isResize--;
    }
    mesh.position.copy(sphereBody.position);
    mesh.quaternion.copy(sphereBody.quaternion);
}

function setScreen(scr) {
    GameScreen = scr;
    DrawTexture(mTex_Continue, 0, 320, 256, 64);
}

function Handle_Menu(sel) {
}

function loadModel() {
}