var frequency = .5;
var camera, scene, renderer, Counter = 0,
    isResize = 0,
    objCount = 0,
    isClick = false,
    mSel = 0;
var gameUI;
var isSound = true;
var mTex_fonts = Array(3);
var mTex_Empty = [];
var mTex_Emozy = [];
var mTex_Home, mTex_Restrt, mTex_Cup, mTex_hand, mTex_Swip = null,
    mTex_popup, mTex_star = Array();
var mTex_PlayNew, mTex_RestartNew, mTex_HomeNew, mTex_Settings, mTex_Soundoff, mTex_Soundon, mTex_Leader, mTex_Title, mTex_Logo, mTex_Top;
var mPlan_Block, mPlan_Base, mPlan_Background;
var mPlan_install = null;
var mTex_DWN;
var mp3_click, mp3_line, mp3_win, mp3_brick, mp3_star, audioLoader, listener;
var mBlocks = [];
var ratio = 1;
var selblack = -1;
var score = 0;
var totalScore = 0;
var linecount = 0;
var rects = [];
var mTex_nmp = [];
var isHand = true;
var NewGame = false;
var obj_cube, obj_cube2;
var obj_back = Array();
var obj_frant = Array();
var tex_back, tex_frant;
var gameLevel = 0;
var levelWIN = 0;
const MIN = .5,
    MAX = 1,
    MUL = 22.6,
    MAXLIN = 1;
const RAD = 1;
const blockScore = [5, 1, 5, 4, 4, 3, 9, 2, 3, 2, 4, 4, 3, 4];
const isAndroid = false;
const BASEURL = './';
var raycaster = new THREE.Raycaster();

function Block(type, ids, isActive, x, y) {
    this.type = type;
    this.ids = ids;
    this.isActive = isActive;
    this.x = x;
    this.y = y;
    this.scl = MIN;
}

function initstart() {
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 300);
    camera.position.set(0, 0, 0);
    camera.rotation.set(0, 0, 0);
    scene = new THREE.Scene();
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    gameUI = new ThreeUI(renderer.domElement, 720);
    renderer.setClearColor(0x222222, 1);
    CANVAS_HEIGHT = window.innerHeight;
    CANVAS_WIDTH = window.innerWidth;
    ratio = CANVAS_WIDTH / CANVAS_HEIGHT;
    var ambientLight = new THREE.AmbientLight(0xffffff, .51);
    scene.add(ambientLight);
    light = new THREE.DirectionalLight(0x555555, 1.0);
    light.position.set(0, 200, 200);
    scene.add(light);
    var manager = new THREE.LoadingManager(loadModel);
    manager.onProgress = function(item, loaded, total) { console.log(item, loaded, total); };

    function onProgress(xhr) { if (xhr.lengthComputable) { var percentComplete = (xhr.loaded / xhr.total) * 8 * objCount; } }

    function onError() {}

    meshLoading = new THREE.Mesh(new THREE.BoxBufferGeometry(10, 10, 10), new THREE.MeshNormalMaterial());
    meshLoading.position.set(0, 0, -50);
    scene.add(meshLoading);

    var textureLoader = new THREE.TextureLoader(manager);
    tex_back = textureLoader.load(BASEURL + '/assets/cube.png');
    tex_frant = textureLoader.load(BASEURL + '/assets/cube1.png');
    // tex_Ads = textureLoader.load('https://hututusoftwares.com/Link/ads_sqr.png');

    // textureLoader.load('https://hututusoftwares.com/Link/ads_sqr.png',
    //     function(texture) {
    //         var material = new THREE.MeshBasicMaterial({ map: texture });
    //         mPlan_install = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
    //         mPlan_install.visible = true;
    //         mPlan_install.position.set(0, -9, -40);
    //         scene.add(mPlan_install);
    //     },
    //     undefined,
    //     function(err) {
    //         console.error('An error happened.');
    //     }
    // );



    var texback = new THREE.TextureLoader().load(BASEURL + 'assets/base.png');
    mPlan_Base = new THREE.Mesh(new THREE.PlaneGeometry(22, 11), new THREE.MeshBasicMaterial({ map: texback, transparent: true }));
    mPlan_Base.visible = true;
    scene.add(mPlan_Base);
    mPlan_Base.position.set(0, -13, -60);


    var texture = new THREE.TextureLoader().load(BASEURL + 'assets/tile.jpg');
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(10, 10);

    mPlan_Block = new THREE.Mesh(new THREE.PlaneGeometry(16, 16), new THREE.MeshBasicMaterial({ map: texture }));
    scene.add(mPlan_Block);
    mPlan_Block.visible = false;


    var texbck = new THREE.TextureLoader().load(BASEURL + 'assets/back.jpg');

    mPlan_Background = new THREE.Mesh(new THREE.PlaneGeometry(39, 52), new THREE.MeshBasicMaterial({ map: texbck }));
    scene.add(mPlan_Background);
    mPlan_Background.visible = false;
    mPlan_Background.position.set(0, 0, -61);



    var loader = new THREE.OBJLoader(manager);
    loader.load(BASEURL + 'assets/onea.obj', function(obj) { obj_cube = obj; }, onProgress, onError);
    loader.load(BASEURL + 'assets/cube.obj', function(obj) { obj_cube2 = obj; }, onProgress, onError);



    mp3_click, mp3_line, mp3_win, mp3_brick, mp3_star, audioLoader, listener;



    listener = new THREE.AudioListener();
    audioLoader = new THREE.AudioLoader();
    camera.add(listener);

    mp3_click = new THREE.Audio(listener);
    mp3_line = new THREE.Audio(listener);
    mp3_win = new THREE.Audio(listener);
    mp3_brick = new THREE.Audio(listener);
    mp3_star = new THREE.Audio(listener);

    audioLoader.load(BASEURL + '/assets/sound/click.mp3', function(buffer) {
        mp3_click.setBuffer(buffer);
        mp3_click.setVolume(1.0);
    });
    audioLoader.load(BASEURL + '/assets/sound/lineComplete.mp3', function(buffer) {
        mp3_line.setBuffer(buffer);
        mp3_line.setVolume(1.0);
    });
    audioLoader.load(BASEURL + '/assets/sound/level_complete.mp3', function(buffer) {
        mp3_win.setBuffer(buffer);
        mp3_win.setVolume(1.0);
    });
    audioLoader.load(BASEURL + '/assets/sound/soft_brick.mp3', function(buffer) {
        mp3_brick.setBuffer(buffer);
        mp3_brick.setVolume(1.0);
    });
    audioLoader.load(BASEURL + '/assets/sound/star.mp3', function(buffer) {
        mp3_star.setBuffer(buffer);
        mp3_star.setVolume(1.0);
    });

    AssetLoader.add.webFont('PressStart2P', 'font.css');
    AssetLoader.add.image64('CUP_64', CUP_64);

    AssetLoader.add.image64('RST_64', RST_64);
    AssetLoader.add.image64('PLY_64', PLY_64);
    AssetLoader.add.image64('SWP_64', SWP_64);
    AssetLoader.add.image64('HND_64', HND_64);
    AssetLoader.add.image64('DWN_64', DWN_64);

    AssetLoader.add.image(BASEURL + 'assets/Play.png');
    AssetLoader.add.image(BASEURL + 'assets/Restart.png');
    AssetLoader.add.image(BASEURL + 'assets/Like.png');
    AssetLoader.add.image(BASEURL + 'assets/Sound-off.png');
    AssetLoader.add.image(BASEURL + 'assets/Sound-on.png');
    AssetLoader.add.image(BASEURL + 'assets/Stage.png');
    AssetLoader.add.image(BASEURL + 'assets/title.png');
    AssetLoader.add.image(BASEURL + 'assets/logo.png');
    AssetLoader.add.image(BASEURL + 'assets/popup.png');
    AssetLoader.add.image(BASEURL + 'assets/Home.png');
    AssetLoader.add.image(BASEURL + 'assets/star.png');
    AssetLoader.add.image(BASEURL + 'assets/top.png');
    AssetLoader.add.image(BASEURL + 'assets/home1.png');
    AssetLoader.add.image(BASEURL + 'assets/Restart1.png');
    var img = new Image();
    AssetLoader.progressListener = function(progress) {};
    AssetLoader.load(function() {
        // mTex_popup = loadUI(BASEURL + 'assets/popup.png', 0, -60, 0);
        mTex_popup = loadUI(BASEURL + 'assets/popup.png', 0, 0, 0);
        mTex_Logo = loadUI(BASEURL + 'assets/logo.png', 0, 0, 0);
        mTex_Top = loadUI(BASEURL + 'assets/top.png', 10, -320, 0);
        mTex_PlayNew = loadUI(BASEURL + 'assets/Play.png', 0, 0, 0);
        mTex_PlayNew = loadUI(BASEURL + 'assets/Play.png', 0, 0, 0);
        mTex_RestartNew = loadUI(BASEURL + 'assets/Restart.png', 0, 0, 0);
        mTex_Settings = loadUI(BASEURL + 'assets/Like.png', 0, 0, 0);
        mTex_Soundoff = loadUI(BASEURL + 'assets/Sound-off.png', 0, 0, 0);
        mTex_Soundon = loadUI(BASEURL + 'assets/Sound-on.png', 0, 0, 0);
        mTex_Leader = loadUI(BASEURL + 'assets/Stage.png', 0, 0, 0);
        mTex_Title = loadUI(BASEURL + 'assets/title.png', 0, 0, 0);
        mTex_Logo.color = 0xfff00f;

        mTex_star.push(loadUI(BASEURL + 'assets/star.png', 0, 0, 0));
        mTex_star.push(loadUI(BASEURL + 'assets/star.png', 0, 0, 0));
        mTex_star.push(loadUI(BASEURL + 'assets/star.png', 0, 0, 0));
        scale(mTex_Title, 1.5);
        scale(mTex_Top, 1.6);
        mTex_Top.visible = true;
        mTex_HomeNew = loadUI(BASEURL + 'assets/Home.png', 0, 0, 0);
        // img = AssetLoader.loadedAssets['HND_64'];
        // map = new THREE.TextureLoader(img.src);
        // console.table(img.width);

        scale(mTex_popup, .8);
        rects.push(loadUIBar(0, 0, 300, 140, '#63c5e2'));
        rects.push(loadUIBar(0, 0, 145, 140, '#b0ffe8'));
        rects.push(loadUIBar(0, 0, 145, 140, '#ffc99d'));

        for (var i = 0; i < mTex_fonts.length; i++) {
            mTex_fonts[i] = createTexts('100', 8, FCOLOR, ThreeUI.anchors.center, ThreeUI.anchors.center, 'center', 'PressStart2P');
        }
        mTex_Home = loadUI(BASEURL + 'assets/home1.png', 0, 0, 1);
        mTex_Cup = loadUI('CUP_64', 0, 0, 0);
        mTex_Restrt = loadUI(BASEURL + 'assets/Restart1.png', 0, 0, 2);
        DrawTextureAX(mTex_Home, 130, 40, 1.1, ThreeUI.anchors.center, ThreeUI.anchors.top);
        DrawTextureAX(mTex_Restrt, -130, 40, 1, ThreeUI.anchors.center, ThreeUI.anchors.top);
        DrawTexture(mTex_Cup, 0, -260);


        mTex_hand = loadUI('HND_64', 0, 0, 0);
        mTex_hand.vx = 5;
        //
        mTex_Swip = loadUI('SWP_64', 0, 0, 0);
        mTex_Swip.vx = .1;
        mTex_Swip.scl = 32;

        DrawLbl(mTex_fonts[0], "" + score, -50, -250, FCOLOR, 26);
        DrawLbl(mTex_fonts[1], "0", 50, -250, FCOLOR, 26);


        rects.push(loadUIBar(0, 0, 720, 720, '#000000'));
        mTex_DWN = loadUI('DWN_64', 0, 0, 1);

        Counter = 0;
        getStore();
        setScreen(GAMELOGO);
    });
    if (isMobile.any()) {
        document.addEventListener('touchstart', e => { touchEvent(e, 0); });
        document.addEventListener('touchend', e => { touchEvent(e, 2); });
        document.addEventListener('touchmove', e => { touchEvent(e, 1); });
    } else {
        document.addEventListener('mousedown', e => { touchEvent(e, 0); });
        document.addEventListener('mousemove', e => { touchEvent(e, 1); });
        document.addEventListener('mouseup', e => { touchEvent(e, 2); });
    }
    document.addEventListener('keydown', dealWithKeyboard);
    window.addEventListener('resize', onWindowResize, false);
    // gameWIN() ;
    Draw();
}

function loadModel() {
    obj_cube.traverse(function(child) {
        if (child.isMesh) {
            child.material.map = tex_back;
        }
    });
    for (var i = 0; i < 100; i++) {
        mTex_Empty.push(obj_cube.clone());
        // scene.add(mTex_Empty[i]);
    }

    for (var i = 0; i < mTex_Empty.length; i++) {
        mTex_Empty[i].position.set(-9 + (i % 10) * 2, 12.5 - Math.floor(i / 10) * 2, -54.5);
        mTex_Empty[i].isEmpty = true;
        mTex_Empty[i].eid = 0;
    }
    obj_cube2.traverse(function(child) {
        if (child.isMesh) {
            child.material.map = tex_frant;
        }
    });
    for (var i = 0; i < 100; i++) {
        mTex_Emozy.push(obj_cube2.clone());
        scene.add(mTex_Emozy[i]);
        mTex_Emozy[i].position.z = -55;
        mTex_Emozy[i].position.x = -20;
        mTex_Emozy[i].stats = 0;
        mTex_Emozy[i].visible = false;
        mTex_Emozy[i].traverse(function(child) {
            if (child.isMesh) {
                child.material = child.material.clone();
            }
        });
    }
    setGame();
}

function Handle_Common(clickval) {
    switch (clickval) {
        case 1: //Home
            setScreen(GAMEMENU);
            playSound("click");
            break;
        case 2: //Restart
            setScreen(GAMEPLAY);
            playSound("click");
            showAds();
            break;
    }
}


function Draw() {
    requestAnimationFrame(Draw);
    if (mTex_Empty.length == 0 || mTex_Swip == null) {
        meshLoading.rotation.x += .1;
        meshLoading.rotation.y += .1;
        return;
    }
    renderer.render(scene, camera);
    gameUI.render(renderer);
    switch (GameScreen) {
        case GAMELOGO:
            if (Counter > 60) {
                setScreen(GAMEMENU);
                // setScreen(GAMEWIN);
            }
            break;
        case GAMEMENU:
            Draw_Menu();
            break;
        case GAMEPLAY:
            DrawGameplay();
            break;
        case GAMEWIN:
            Draw_WIN();
            break;
    }


    Counter++;
    if (isResize > 0) {
        isResize--;
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        gameUI.resize();
    }
}
var mouse = new THREE.Vector2();
var coords = null;
var vec2 = new THREE.Vector2();
var isClick = false;

function touchEvent(e, type) {
    CANVAS_HEIGHT = window.innerHeight;
    CANVAS_WIDTH = window.innerWidth;
    ratio = (CANVAS_WIDTH / CANVAS_HEIGHT);
    var scale = gameUI.height / gameUI.gameCanvas.getBoundingClientRect().height;
    if (e.touches != null) {
        if (e.touches.length > 0) {
            mouse.x = (e.touches[0].pageX / window.innerWidth) * 2 - 1;
            mouse.y = -(e.touches[0].pageY / window.innerHeight) * 2 + 1;
            coords = { x: e.touches[0].pageX, y: e.touches[0].pageY };
            coords.x = coords.x - (window.innerWidth - gameUI.gameCanvas.getBoundingClientRect().width) / 2;
            coords.x *= scale;
            coords.y *= scale;
        }
    } else {
        mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
        coords = { x: e.clientX, y: e.clientY };
        coords.x = coords.x - (window.innerWidth - gameUI.gameCanvas.getBoundingClientRect().width) / 2;
        coords.x *= scale;
        coords.y *= scale;
        var elem = renderer.domElement,
            boundingRect = elem.getBoundingClientRect(),
            x = (event.clientX - boundingRect.left) * (elem.width / boundingRect.width),
            y = (event.clientY - boundingRect.top) * (elem.height / boundingRect.height);
        mouse.x = (x / CANVAS_WIDTH) * 2 - 1;
        mouse.y = -(y / CANVAS_HEIGHT) * 2 + 1;

    }


    switch (GameScreen) {
        case GAMEMENU:
            raycaster.setFromCamera(mouse, camera);
            Handle_Menu(type);
            break;
        case GAMEPLAY:
            Handle_Gameplay(type);
            break;
        case GAMEWIN:
            raycaster.setFromCamera(mouse, camera);
            Handle_WIN(type);
            break;
    }



}

function setGame() {
    score = 0;
    linecount = 0;
    for (let i = 0; i < 3; i++) {
        var id = random(0, 14);
        mBlocks.push(new Block(id, createBloack(id, -6 + i * 6, -12), true, -6 + i * 6, -12));
    }
    mTex_Empty.forEach(element => { element.visible = false; });
    mTex_Emozy.forEach(element => { element.visible = false; });
}

function resetGame() {
    for (let i = 0; i < 3; i++) {
        var id = random(0, 14);
        mBlocks[i].type = id;
        mBlocks[i].ids = createBloack(id, -6 + i * 6, -12);
        mBlocks[i].isActive = true;
        mBlocks[i].x = -6 + i * 6;
        mBlocks[i].y = -12;
        mBlocks[i].scl = MIN;
    }
    levelWIN = 0;
}

function Draw_WIN() {
    var multip = 4;
    if (mTex_star[0].start > 64) {
        mTex_star[0].start *= .9;
        if (mTex_star[0].start <= 64) {
            mTex_star[1].start = 256;
            mTex_star[0].start = 64;
        }
        DrawTransScal(mTex_star[0], -76, -77, mTex_star[0].start, mTex_star[0].start, 1, 1);
    }
    if (mTex_star[1].start > 64) {
        mTex_star[1].start *= .9;
        if (mTex_star[1].start <= 64) {
            mTex_star[2].start = 256;
            mTex_star[1].start = 64;
        }
        DrawTransScal(mTex_star[1], -3, -77, mTex_star[1].start, mTex_star[1].start, 1, 1);
    }
    if (mTex_star[2].start > 64) {
        mTex_star[2].start *= .9;
        if (mTex_star[2].start <= 64) {
            mTex_star[2].start = 64;
        }
        DrawTransScal(mTex_star[2], 72, -77, mTex_star[2].start, mTex_star[2].start, 1, 1);
    }

    DrawTransScal(mTex_PlayNew, -100, 70, 64, 64, (mSel == 1 ? 1.1 : 1), mSel == 1 ? 0.5 : 1);
    DrawTransScal(mTex_Leader, 0, 70, 64, 64, (mSel == 2 ? 1.1 : 1), mSel == 2 ? 0.5 : 1);
    DrawTransScal(mTex_HomeNew, 100, 70, 64, 64, (mSel == 3 ? 1.1 : 1), mSel == 3 ? 0.5 : 1);
}

function Handle_WIN(type) {

    mSel = 0;
    bounds = mTex_PlayNew.getBounds();
    if (ThreeUI.isInBoundingBox(coords.x, coords.y, bounds.x, bounds.y, bounds.width, bounds.height)) {
        mSel = 1;
    }
    bounds = mTex_Leader.getBounds();
    if (ThreeUI.isInBoundingBox(coords.x, coords.y, bounds.x, bounds.y, bounds.width, bounds.height)) {
        mSel = 2;
    }
    bounds = mTex_HomeNew.getBounds();
    if (ThreeUI.isInBoundingBox(coords.x, coords.y, bounds.x, bounds.y, bounds.width, bounds.height)) {
        mSel = 3;
    }
    if (mPlan_install != null) {
        if (raycaster.intersectObject(mPlan_install).length > 0) {
            mSel = 4;
        }
    }
    if (type == 2) {
        switch (mSel) {
            case 1:
                setScreen(GAMEPLAY);
                break;
            case 2:
                break;
            case 3:
                setScreen(GAMEMENU);
                break;
            case 4:
                DawnloadUs();
                break;
        }
        if (mSel > 0) {
            playSound("click");
        }
        mSel = 0;
    }
    console.log(mSel, type);
}


function Draw_Menu() {
    DrawTransScal(mTex_PlayNew, 0, 30, 100, 100, (mSel == 1 ? 1.1 : 1), mSel == 1 ? 0.5 : 1);
    DrawTransScal(mTex_Settings, 100, 130, 64, 64, (mSel == 2 ? 1.1 : 1), mSel == 2 ? 0.5 : 1);
    DrawTransScal(mTex_Soundoff, -100, 130, 64, 64, (mSel == 3 ? 1.1 : 1), mSel == 3 ? 0.5 : 1);
    DrawTransScal(mTex_Soundon, -100, 130, 64, 64, (mSel == 3 ? 1.1 : 1), mSel == 3 ? 0.5 : 1);
    mTex_Soundon.visible = isSound;
    mTex_Soundoff.visible = !isSound;
}

function Handle_Menu(type) {

    mSel = 0;
    bounds = mTex_PlayNew.getBounds();
    if (ThreeUI.isInBoundingBox(coords.x, coords.y, bounds.x, bounds.y, bounds.width, bounds.height)) {
        mSel = 1;
    }
    bounds = mTex_Settings.getBounds();
    if (ThreeUI.isInBoundingBox(coords.x, coords.y, bounds.x, bounds.y, bounds.width, bounds.height)) {
        mSel = 2;
    }
    bounds = isSound ? mTex_Soundon.getBounds() : mTex_Soundoff.getBounds();
    if (ThreeUI.isInBoundingBox(coords.x, coords.y, bounds.x, bounds.y, bounds.width, bounds.height)) {
        mSel = 3;
    }
    if (mPlan_install != null) {
        if (raycaster.intersectObject(mPlan_install).length > 0) {
            mSel = 4;
        }
    }
    if (type == 2) {
        switch (mSel) {
            case 1:
                setScreen(GAMEPLAY);
                break;
            case 2:
                Leaderboard();
                break;
            case 3:
                isSound = !isSound;
                break;
            case 4:
                DawnloadUs();
                break;
        }
        if (mSel > 0) {
            playSound("click");
        }
        mSel = 0;
    }
    console.log(mSel, type);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    this.gameUI.resize();
    isResize = 5;
}

function gameWIN() {
    rects[3].alpha = 0.7;
    rects[3].visible = true;
    DrawAnim(rects[3], 0, 0, 720, 720);
    DrawAnim(mTex_DWN, 0, 0, 180, 64);
    NewGame = true;
    gameLevel = parseInt(gameLevel) + 1;
    linecount = 0;
    setScreen(GAMEWIN);

}

function setScreen(scr) {
    GameScreen = scr;
    if (mPlan_install != null) {
        mPlan_install.visible = false;
    }
    mTex_fonts.forEach(element => { element.visible = false; });
    mTex_Empty.forEach(element => { element.visible = false; });
    mTex_Emozy.forEach(element => { element.visible = false; });
    mTex_star.forEach(element => { element.visible = false; });
    mTex_Home.visible = mTex_Restrt.visible = mTex_Cup.visible = mTex_hand.visible = mPlan_Base.visible = mTex_popup.visible = mTex_HomeNew.visible = mTex_Swip.visible = false;
    mTex_PlayNew.visible = mTex_RestartNew.visible = mTex_Settings.visible = mTex_Soundoff.visible = mTex_Soundon.visible = mTex_Leader.visible = mTex_Title.visible = mTex_Logo.visible = false;
    rects[3].visible = mPlan_Block.visible = mTex_DWN.visible = mTex_Top.visible = meshLoading.visible = false;
    switch (GameScreen) {
        case GAMELOGO:
            mTex_Logo.visible = true;

            break;
        case GAMEMENU:
            mPlan_Background.visible = true;
            DrawTexture(mTex_Title, 0, -200);
            if (mPlan_install != null) {
                mPlan_install.visible = true;
            }
            break;
        case GAMEPLAY:
            score = 0;
            linecount = 0;
            mPlan_Block.visible = true;
            mPlan_Block.position.set(0, 3.8, -60);
            mPlan_Block.scale.set(1.38, 1.38, 1.38);
            mPlan_Base.visible = true;
            for (let i = 0; i < mTex_Empty.length; i++) {
                mTex_Empty[i].isEmpty = true;
            }
            for (let i = 0; i < mTex_Emozy.length; i++) {
                mTex_Emozy[i].visible = false;
            }
            resetGame();
            DrawTextureAX(mTex_Home, 130, 30, 1.1, ThreeUI.anchors.center, ThreeUI.anchors.top);
            DrawTextureAX(mTex_Restrt, -130, 30, 1, ThreeUI.anchors.center, ThreeUI.anchors.top);
            DrawTexture(mTex_Cup, -20, -260);
            DrawLblAling(mTex_fonts[0], "" + score, 0, -255, FCOLOR2, 12, "left");
            DrawLblAling(mTex_fonts[1], "LEVEL : " + (parseInt(gameLevel) + 1), 0, -300, FCOLOR2, 8, "center");
            console.log("setScreen [totalScore = " + totalScore + "] ~~GAMEPLAY~~ [gameLevel = " + gameLevel + "] ~~ [linecount = " + linecount + "]");
            NewGame = false;
            mTex_Top.visible = true;
            break;
        case GAMEWIN:
            showAds();
            setStore();
            DrawTexture(mTex_popup, 0, -60);
            DrawLbl(mTex_fonts[0], "GAMEWIN", 0, -180, FCOLOR, 18);
            DrawLbl(mTex_fonts[1], "LEVEL : " + (gameLevel), 0, -120, FCOLOR, 12);
            DrawLbl(mTex_fonts[2], "SCORE : " + score, 0, -0, FCOLOR, 14);
            mTex_star.forEach(element => { element.start = 0; });
            mTex_star[0].start = 256;

            if (mPlan_install != null) {
                mPlan_install.visible = true;
            }
            break;

    }

}


const sid = "d";

function getStore() {
    try {
        if (isAndroid == true) {
            totalScore = app.getInt("score" + sid, 0);
            gameLevel = app.getInt("lvl" + sid, 1);
            isSound = app.getInt("isSound" + sid, 0);
        } else {
            if (typeof(Storage) !== "undefined") {
                gameLevel = localStorage.getItem("lvl" + sid);;
                if (gameLevel > 0) {
                    totalScore = localStorage.getItem("score" + sid);
                    isSound = localStorage.getItem("isSound" + sid);
                } else {
                    gameLevel = 0;
                    totalScore = 0;
                    isSound = 0;
                }
            }
        }
    } catch (err) {
        console.log("~~~~~~~getStore JS~~~~~~" + err);
    }
    console.log("getStore [totalScore = " + totalScore + "] ~~~~ [gameLevel = " + gameLevel + "] ~~ [isSound = " + isSound + "]");
}

function setStore() {
    try {
        if (isAndroid == true) {
            app.setInt("score" + sid, totalScore);
            app.setInt("lvl" + sid, parseInt(gameLevel));
            app.setInt("isSound" + sid, isSound);
        } else {
            localStorage.setItem("score" + sid, totalScore);
            localStorage.setItem("lvl" + sid, parseInt(gameLevel));
            localStorage.setItem("isSound" + sid, isSound);
        }
    } catch (err) {
        console.log("~~~~~~~setStore JS~~~~~~" + err);
    }
    console.log("setStore [totalScore = " + totalScore + "] ~~~~ [gameLevel = " + gameLevel + "] ~~ [isSound = " + isSound + "]");
}

function showAds() {
    console.log("~~~~~~~showAds JS~~~~~~");
    try {
        if (isAndroid == true)
            app.showAds();
        else {
            iosSend("test", "token");
        }
    } catch (err) {}
}

function LoadAds() {
    try {
        if (isAndroid == true)
            app.LoadAds();
    } catch (err) {}
}

function RateUs() {
    try {
        if (isAndroid == true)
            app.RateUs();
        else {
            iosSend("rate", "" + mPly.name);
        }
    } catch (err) {}
}

function ShareApp() {
    mPly.hroll += 100;
    try {
        if (isAndroid == true)
            app.ShareApp(mPly.name);
        else { iosSend("share", "" + mPly.name); }
    } catch (err) {}
}

function Show(visible) {
    try {
        if (isAndroid == true)
            app.Show(visible);
        else {
            if (visible) {
                iosSend("show", "secret");
            } else {
                iosSend("hidden", "secret");
            }
        }
    } catch (err) {}
}

function DawnloadUs() {
    try {
        if (isAndroid == true)
            app.Download();
        else {
            console.log("Download");
        }
    } catch (err) {}
}

function Leaderboard() {
    try {
        if (isAndroid == true)
            app.Leaderboard();
        else {
            console.log("Leaderboard");
        }
    } catch (err) {}
}

function playSound(type) {
    if (isSound) {
        switch (type) {
            case "click":
                mp3_click.play();;
                break;
            case "line":
                mp3_line.play();;
                break;
            case "win":
                mp3_win.play();;
                break;
            case "brick":
                mp3_brick.play();;
                break;
            case "star":
                mp3_star.play();;
                break;
        }
    }
}