var camera, scene, renderer, Counter = 0,
    isResize = 0,
    objCount = 0,
    isClick = false;


function initstart() {
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 300);
    camera.position.set(0, 0, 0);
    camera.rotation.set(0, 0, 0);
    scene = new THREE.Scene();
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    // gameUI = new ThreeUI(renderer.domElement, 720);
    renderer.setClearColor(0x000000, 1);
    CANVAS_HEIGHT = window.innerHeight;
    CANVAS_WIDTH = window.innerWidth;
    ratio = CANVAS_WIDTH / CANVAS_HEIGHT;



    var geometry = new THREE.PlaneGeometry(8, 8);
    var material = new THREE.MeshBasicMaterial({ color: 0xff00ff });
    mPlan_Home = new THREE.Mesh(geometry, material);
    scene.add(mPlan_Home);

    Draw();

}

function Draw() {
    requestAnimationFrame(Draw);
    renderer.render(scene, camera);
    // gameUI.render(renderer);
    mPlan_Home.position.set(0, 0, -10);

    // console.log('THREE.OBJLoader:')
}