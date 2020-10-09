var camera, scene, renderer, controls;


function init() {

    var info = document.createElement('div');
    info.style.position = 'absolute';
    info.style.top = '10px';
    info.style.width = '100%';
    info.style.textAlign = 'center';
    info.style.color = '#fff';
    info.style.link = '#f80';
    info.innerHTML = '<a href="https://threejs.org" target="_blank" rel="noopener">three.js</a> webgl - geometry extrude shapes';
    // document.body.appendChild(info);

    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x222222);

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.set(0, 0, 500);

    controls = new THREE.TrackballControls(camera, renderer.domElement);
    controls.minDistance = 200;
    controls.maxDistance = 500;

    scene.add(new THREE.AmbientLight(0x999999));

    // var light = new THREE.PointLight(0xffffff);
    var light = new THREE.DirectionalLight(0x999999);
    light.position.set(3, 2, 2);
    // light.position.copy(camera.position);
    scene.add(light);


    loadobj();
    var load_screen = document.getElementById("load_screen");
    document.body.removeChild(load_screen);
    document.addEventListener('keydown', dealWithKeyboard);
    animate();
}

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

function CreateCards() {
    for (var i = 0; i < tex_Cards.length; i++) {
        mCube.push(new Cube(m3d_cube, tex_Cards[i]));
        mCube[i].group.position.set(-180 + (i % 9) * 45, 150 - Math.floor(i / 9) * 60, 0);
    }
    // scene.add(m3d_table);

}

function Handle_Menu(clickval) {
    console.log("clickval = " + clickval);
}