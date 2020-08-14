var tex_Cards = [];
var mCube = [];
var m3d_cube;
var objCount = 0;
var m2D_Background;
var m3d_table, m3d_tableTop;
var mColors = ['#ffffff', '#015293', '#ff451e', '#0f9270', '#7128c0', '#fed932', '#990100', '#ff8c01', '#929292'];
var tex_Back, tex_planBack;
var tablebase = Array();
const BASEURL = '';

function loadobj() {
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

    var textureLoader = new THREE.TextureLoader();
    tableTex = textureLoader.load(BASEURL + 'assets/mohjong.jpg');
    tablebase.push(textureLoader.load(BASEURL + 'assets/table0.jpg'));
    tablebase.push(textureLoader.load(BASEURL + 'assets/table1.jpg'));
    tex_Back = textureLoader.load(BASEURL + 'assets/cardBack.jpg');

    for (var i = 0; i < 50; i++) {
        tex_Cards.push(textureLoader.load(BASEURL + 'textures/' + i + '.jpg'));
    }
    mTex_BG = [];
    for (let i = 0; i < 2; i++) {
        mTex_BG.push(textureLoader.load(BASEURL + 'assets/bg' + i + '.jpg'));
    }

    m2D_Background = new THREE.Mesh(new THREE.PlaneGeometry(120, 56), new THREE.MeshBasicMaterial({ map: mTex_BG[0] }));
    var loader = new THREE.OBJLoader(manager);
    loader.load(BASEURL + 'assets/cube2.obj', function (obj) { m3d_cube = obj; }, onProgress, onError);
    loader.load(BASEURL + 'assets/mohjong.obj', function (obj) { m3d_table = obj; }, onProgress, onError);

}

function loadModel() {
    console.log("~");
    m3d_cube.traverse(function (child) {
        if (child.isMesh) {
            child.material.color = hexToRgb(mColors[0]);
            child.material.map = tex_Back;
        }
    });
    m3d_table.traverse(function (child) {
        if (child.isMesh) {
            child.material.map = tableTex;
        }
    });

    m3d_tableTop = new THREE.Mesh(new THREE.PlaneGeometry(12, 12), new THREE.MeshBasicMaterial({ map: tablebase[0], color: hexToRgb(mColors[0]) }));
    m3d_tableTop.rotation.set(-Math.PI * .5, 0, 0);
    m3d_tableTop.position.set(0, .6, 0);
    m3d_table.rotation.set(Math.PI * .5, 0, 0);
    m3d_table.scale.set(3, 3, 3);
    m3d_table.add(m3d_tableTop);
    CreateCards();


}