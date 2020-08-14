var counter = 0,
    meshLoading, isResize = 0,
    mTex_logo = null,
    objCount = 0,
    mHScore = 0,
    mScore = 0,
    setVal = true,
    isResize = 0,
    mTCoins = 11;
var scene, camera, clock, renderer, water, gameUI, mPlyer;
const E0_64 = "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAA6lBMVEUAAADqrRvrrhv2wR31wB3/0h//0h//0h//0h7qrRv/0h//0h/qrhv/0h/rrhv/0h//0h/qrRvqrhv/0h/yuxz/1k7qrRv5yB7vtxzqrRv/11j/11X/0h//0h9CGhPqrRu+HAb7yx73xB3pvh2eexf6yR7yuxz/2Fv/67X/4pL/1DX8zx72yh7kuhztsxvmpBf/5Jn/34P/23P/2GH/1T/yxx6EZBZyUxX/45b0wB3wtxrBnBq0kBmuixiRcRbbjROxaxJrGhF9Gw/FSAn/6Kz/56n/4Ir/2WilghhSGhJpGhGCGw+iGwusHAmOMtQDAAAAHXRSTlMA96IPCvXu18zLop2Ni1lXKSkgHzz+8fDY2PX1Ow4G6zoAAAF/SURBVDjLfdPXeoJAEAXgBcReYouaZHYFFERF7Bp7SS/v/zpZWAKCwn+l3xnYmQGQRyhkkiKAmMwUBHTtLi3CRJtWwSKm7wJxLAeT0bgLnlzsMi8ntOUY/BJlL3+Kj4ZdCIpX3Ovjug431ErO+Ql9CTfVWR+50WsXbpKz9nzVzgRCkCItSA+HEEbl6f4eO+8QRuYEVBi/AGXs5hsv2Mx3BlBtkkcZsLUwxgo4FPqnBZREeJR8m0YVpNBDR4sq4JDGCtYYL/rg6C8wXrMeCJrqbEszpQeunjJjU9ACESKo9IgkRBjQJjNhIWuBRwX2e4sDtvYJdFECa8IIFhjWkISuGqW9VeLP4/fpaOcfdgeEtx63O/vpt2n7+cJzOvMzIfbjRjlgizg0XYe+vQOSdV45ZzvmmcVnE1jeiP2/tOBYmfu9uQJg978vIUelBn7SwMoryFWqy5f7UQnVKPk+vSxR5bYkSW1ZHRBLNob8ijxHXBxfRNeEPJ/iaJji8wJy/QHsp2P/l7hKeAAAAABJRU5ErkJggg==";


function init() {
    // scene
    scene = new THREE.Scene();
    // camera
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 500);
    camera.rotation.set(0, 0, 0);
    scene.background = new THREE.Color(0xfafa00);
    // scene.fog = new THREE.FogExp2( 0xeeeeee, 0.155 );
    // clock
    clock = new THREE.Clock();

    var manager = new THREE.LoadingManager(loadModel);
    manager.onProgress = function (item, loaded, total) {
        // console.log(item, loaded, total); 
    };

    function onProgress(xhr) {
        if (xhr.lengthComputable) {
            var percentComplete = (xhr.loaded / xhr.total) * 8 * objCount;
            // console.log('model ' + Math.round( percentComplete, 2 ) + '% downloaded' +" [loaded = "+xhr.loaded+"] [total = "+xhr.total+"] "+objCount);
            objCount++;
        }
    }

    function onError() { }
    let image = new Image();
    image.src = E0_64;


    texture = new THREE.Texture();
    texture.image = image;
    image.onload = function () {
        texture.needsUpdate = true;
    };
    texture.wrapS = texture.wrapT = THREE.MirroredRepeatWrapping;
    let material = new THREE.MeshLambertMaterial({ map: texture, side: THREE.DoubleSide });
    let cubeSize = 10;
    let cubeMesh = new THREE.BoxBufferGeometry(cubeSize, cubeSize, cubeSize);
    var cube = new THREE.Mesh(cubeMesh, material);
    scene.add(cube);



    var x = 10, y = 10;
    var extrudeSettings = { depth: 8, bevelEnabled: true, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 100 };

    var heartShape = new THREE.Shape();

    heartShape.moveTo(x + 25, y + 25)
    heartShape.bezierCurveTo(x + 25, y + 25, x + 20, y, x, y)
    heartShape.bezierCurveTo(x - 30, y, x - 30, y + 35, x - 30, y + 35)
    heartShape.bezierCurveTo(x - 30, y + 55, x - 10, y + 77, x + 25, y + 95)
    heartShape.bezierCurveTo(x + 60, y + 77, x + 80, y + 55, x + 80, y + 35)
    heartShape.bezierCurveTo(x + 80, y + 35, x + 80, y, x + 50, y)
    heartShape.bezierCurveTo(x + 35, y, x + 25, y + 25, x + 25, y + 25);




    // addShape(heartShape, extrudeSettings, 0xf00000, 60, 100, 0, 0, 0, Math.PI, 1);





    var circleRadius = 40;
    var circleShape = new THREE.Shape();
    circleShape.moveTo(0, circleRadius)
    circleShape.quadraticCurveTo(circleRadius, circleRadius, circleRadius, 0)
    circleShape.quadraticCurveTo(circleRadius, - circleRadius, 0, - circleRadius)
    circleShape.quadraticCurveTo(- circleRadius, - circleRadius, - circleRadius, 0)
    circleShape.quadraticCurveTo(- circleRadius, circleRadius, 0, circleRadius);

    // addShape(circleShape, extrudeSettings, 0xf00000, 60, 100, 0, 0, 0, Math.PI, 1);


    var smileyShape = new THREE.Shape();
    smileyShape.moveTo(0, 0)
    smileyShape.absarc(0, 0, 40, 0, Math.PI * 2, false);

    var smileyEye1Path = new THREE.Path();
    // smileyEye1Path.moveTo(35, 20)
    // smileyEye1Path.absellipse(40, 40, 39, 39, 0, Math.PI * 2, true);

    smileyEye1Path.moveTo(0, 0)
    smileyEye1Path.absellipse(0, 0, 39, 39, 0, Math.PI * 2, true);

    // var smileyEye2Path = new THREE.Path();
    // smileyEye2Path.moveTo(65, 20)
    // smileyEye2Path.absarc(55, 20, 10, 0, Math.PI * 2, true);

    // var smileyMouthPath = new THREE.Path();
    // smileyMouthPath.moveTo(20, 40)
    // smileyMouthPath.quadraticCurveTo(40, 60, 60, 40)
    // smileyMouthPath.bezierCurveTo(70, 45, 70, 50, 60, 60)
    // smileyMouthPath.quadraticCurveTo(40, 80, 20, 60)
    // smileyMouthPath.quadraticCurveTo(5, 50, 20, 40);

    smileyShape.holes.push(smileyEye1Path);
    // smileyShape.holes.push(smileyEye2Path);
    // smileyShape.holes.push(smileyMouthPath);


    circle = addShape(smileyShape, extrudeSettings, 0xf00000, 0, 0, 0, Math.PI * .5, 0, 0, 1);



    var points = [];

    for (var i = 0; i < 10; i++) {
        points.push(new THREE.Vector2(Math.sin(i * 0.2) * Math.sin(i * 0.2) * 15 + 50, i * 4));
    }

    object = new THREE.Mesh(new THREE.LatheBufferGeometry(points, 20), material);
    object.position.set(140, 0, - 240);
    scene.add(object);
    phiStart = 1;
    phiLength = 1;
    thetaStart = 1;
    thetaLength = 1;
    var geometry = new THREE.SphereGeometry(40, 32, 32, 0, Math.PI, 0, Math.PI);



    object = new THREE.Mesh(geometry, material);
    object.position.set(140, 0, - 240);
    scene.add(object);

    // object = new THREE.Mesh(new THREE.TorusBufferGeometry(50, 20, 20, 20), material);
    // object.position.set(100, 0, - 200);
    // scene.add(object);

    // object = new THREE.Mesh(new THREE.TorusKnotBufferGeometry(50, 10, 50, 20), material);
    // object.position.set(300, 0, - 200);
    // scene.add(object);




    console.log("isMobile.any() = " + isMobile.any());
    // mesh
    var material1 = new THREE.MeshNormalMaterial();
    var geometry = new THREE.BoxBufferGeometry(1.0, 1.0, 1.0);
    meshLoading = new THREE.Mesh(geometry, material1);
    meshLoading.scale.set(2, 2, 2);
    meshLoading.position.set(10, 4, 0);
    scene.add(meshLoading);

    // ground
    var textureLoader = new THREE.TextureLoader();
    // light
    var ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);
    directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
    directionalLight.position.set(3, -2, 2);
    scene.add(directionalLight);


    // renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    document.body.appendChild(renderer.domElement);

    // for (var i = 0; i < mTex_ply.length; i++) {
    //     mTex_ply[i] = textureLoader.load('textures/obj/' + i + '.jpg');
    // }
    // var str = ["a0", "a0", "a0", "a0", "android", "bird", "cow", "frankenstein", "horrer", "man", "man2", "ninja", "panda", "robot", "zombie"];
    // var loader = new THREE.OBJLoader(manager);
    // for (var i = 0; i < m3d_ply.length; i++) {
    //     const kkk = i;
    //     // console.log('str['+kkk+'] = '+str[kkk]);
    //     loader.load('textures/obj/' + str[kkk] + '.obj', function (obj) { m3d_ply[kkk] = obj; }, onProgress, onError);
    // }

    gameUI = new ThreeUI(renderer.domElement, 720);
    AssetLoader.add.image('assets/logo.png');

    AssetLoader.progressListener = function (progress) {
        // console.info('Progress: ' + (progress * 100) + '%');
    };
    AssetLoader.load(function () {
        mTex_logo = loadUIRect();
        httlogo = loadUI('assets/logo.png', 0, 0, 0);
        httlogo.parent = mTex_logo;
        httlogo.visible = true;
        mTex_logo.visible = false;


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
    mTex_LandScape.visible = window.innerWidth < window.innerHeight;
    isResize = 5;
}
var istap = false;
var mouse = new THREE.Vector2();
var mousedown = new THREE.Vector2();

function touchEvent(e, type, sys) {

}
function addShape(shape, extrudeSettings, color, x, y, z, rx, ry, rz, s) {

    // flat shape with texture
    // note: default UVs generated by THREE.ShapeBufferGeometry are simply the x- and y-coordinates of the vertices

    var geometry = new THREE.ShapeBufferGeometry(shape);

    var mesh = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({ side: THREE.DoubleSide, map: texture }));
    mesh.position.set(x, y, z - 175);
    mesh.rotation.set(rx, ry, rz);
    mesh.scale.set(s, s, s);
    // scene.add(mesh);

    // flat shape

    var geometry = new THREE.ShapeBufferGeometry(shape);

    var mesh = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({ color: color, side: THREE.DoubleSide }));
    mesh.position.set(x, y, z - 125);
    mesh.rotation.set(rx, ry, rz);
    mesh.scale.set(s, s, s);
    // scene.add(mesh);

    // extruded shape
    var blendings = [
        { name: 'No', constant: THREE.NoBlending },
        { name: 'Normal', constant: THREE.NormalBlending },
        { name: 'Additive', constant: THREE.AdditiveBlending },
        { name: 'Subtractive', constant: THREE.SubtractiveBlending },
        { name: 'Multiply', constant: THREE.MultiplyBlending }
    ];

    var geometry = new THREE.ExtrudeBufferGeometry(shape, extrudeSettings);

    var material = new THREE.MeshPhongMaterial({ color: color });//new THREE.MeshBasicMaterial({ map: map });
    material.transparent = true;
    material.blending = blendings[1].constant;

    var mesh = new THREE.Mesh(geometry, material);




    mesh.position.set(x, y, z);
    mesh.rotation.set(rx, ry, rz);
    mesh.scale.set(s, s, s);
    scene.add(mesh);
    return mesh;
    // addLineShape(shape, color, x, y, z, rx, ry, rz, s);

}

function Draw() {
    requestAnimationFrame(Draw);
    renderer.render(scene, camera);
    gameUI.render(renderer);
    if (mTex_logo == null) {
        return;
    }
    object.rotation.set(Math.PI * .5, 0, 0);
    object.position.set(0, sy + sx * .1, sz);
    // object.scale.set(rx, rx, rx);
    counter++;
    if (isResize > 0) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        this.gameUI.resize();
        mTex_LandScape.visible = window.innerWidth < window.innerHeight;
        isResize--;
    }
}



function setScreen(scr) {
    console.log("scr = " + scr);
    GameScreen = scr;

}


function loadModel() {
    console.log("loadModel");
    for (var i = 0; i < m3d_ply.length; i++) {
        m3d_ply[i].traverse(function (child) {
            if (child.isMesh) {
                child.material.map = mTex_ply[i];
                child.material.side = THREE.DoubleSide;
            }
        });
        m3d_ply[i].position.set(-10 + i, 1, -1);
        m3d_ply[i].scale.set(.025, .025, .025);
        m3d_ply[i].visible = false;
        scene.add(m3d_ply[i]);

    }
    // setScreen(GAMELOGO);
    // gamereset();
}