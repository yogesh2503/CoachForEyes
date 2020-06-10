var frequency = .5;
var camera, scene, renderer, Counter = 0,
    isResize = 0,
    objCount = 0,
    isClick = false,
    mSel = 0,
    isAndroid = false;
var gameUI;
var mTex_logo = null,
    mTex_fonts = Array();
var sky;
var isSound = 1;
const BASEURL = '';
var mScore = 0,
    bestScore = 0;
var mTex_title, mTex_over, mTex_help, mTex_home, mTex_how2play, mTex_left, mTex_moff, mTex_m_on, mTex_next, mTex_play, mTex_right;
var mTex_score, mPlan_Shadow, mTex_blast = Array();
var mp3_bounce, mp3_Over, mp3_click, audioLoader, listener;
var tex_sky = Array();

function initstart() {
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 300);
    camera.position.set(0, 8, 7.3);
    camera.rotation.set(-Math.PI * .2, 0, 0);
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
    manager.onProgress = function(item, loaded, total) {};

    function onProgress(xhr) { if (xhr.lengthComputable) { var percentComplete = (xhr.loaded / xhr.total) * 8 * objCount; } }

    function onError() {}
    var loader = new THREE.OBJLoader(manager);
    var textureLoader = new THREE.TextureLoader(manager);
    tex_Shadow = textureLoader.load(BASEURL + 'assets/shadow.png');
    tex_Cube = textureLoader.load(BASEURL + 'assets/cube1.png');

    tex_ball = textureLoader.load(BASEURL + 'assets/ball.jpg');
    for (let i = 0; i < 4; i++) {
        const l_sky = textureLoader.load(BASEURL + 'assets/sky' + i + '.jpg');
        l_sky.wrapS = THREE.RepeatWrapping;
        l_sky.wrapT = THREE.RepeatWrapping;
        l_sky.repeat.set(8, 4);
        tex_sky.push(l_sky);

    }



    frant = new THREE.MeshBasicMaterial({ map: tex_sky[2], side: THREE.DoubleSide });
    mPlan_sky = new THREE.Mesh(new THREE.SphereGeometry(200, 32, 32), frant);
    scene.add(mPlan_sky);

    var material = new THREE.MeshStandardMaterial({ color: createColor(), metalness: 0, roughness: 1, envMapIntensity: 1.0 });
    var geometry = new THREE.BoxBufferGeometry(ALLS, ALLS, ALLS);
    obj_Cube = new THREE.Mesh(geometry, material);
    // scene.add(obj_Cube);
    for (let i = 0; i < 20; i++) {
        objCubes.push(new THREE.Mesh(geometry, new THREE.MeshStandardMaterial({ map: tex_Cube, color: createColor(), metalness: 0, roughness: 1, envMapIntensity: 1.0 })));
        scene.add(objCubes[i]);
        objCubes[i].visible = false;
    }
    obj_BallGroup = new THREE.Group();
    var meterial = new THREE.MeshStandardMaterial({ map: tex_ball, metalness: 0.0, roughness: 1, envMapIntensity: 1 });
    obj_Ball = new THREE.Mesh(new THREE.SphereGeometry(.25, 32, 32), meterial);
    obj_Ball.position.y = .60;

    mPlan_Shadow = new THREE.Mesh(new THREE.PlaneGeometry(1.3, 1.3), new THREE.MeshBasicMaterial({ map: tex_Shadow, transparent: true }));
    mPlan_Shadow.rotation.x = -Math.PI * .5;
    mPlan_Shadow.visible = true;
    mPlan_Shadow.position.y = 0.51;
    obj_BallGroup.add(mPlan_Shadow);


    obj_BallGroup.add(obj_Ball);
    obj_BallGroup.add(camera); // CHANGED
    scene.add(obj_BallGroup);
    obj_BallGroup.visible = false;



    listener = new THREE.AudioListener();
    audioLoader = new THREE.AudioLoader();
    camera.add(listener);
    mp3_Over = new THREE.Audio(listener);
    mp3_bounce = new THREE.Audio(listener);
    mp3_click = new THREE.Audio(listener);
    audioLoader.load('assets/sound/gameover.mp3', function(buffer) {
        mp3_Over.setBuffer(buffer);
        mp3_Over.setVolume(1.0);
    });
    audioLoader.load('assets/sound/bounce.mp3', function(buffer) {
        mp3_bounce.setBuffer(buffer);
        mp3_bounce.setVolume(1.0);
    });
    audioLoader.load('assets/sound/click.mp3', function(buffer) {
        mp3_click.setBuffer(buffer);
        mp3_click.setVolume(1.0);
    });


    AssetLoader.add.webFont('font', 'font.css');
    AssetLoader.add.image(BASEURL + 'assets/logo.png');
    AssetLoader.add.image(BASEURL + 'assets/game_over.png');
    AssetLoader.add.image(BASEURL + 'assets/help.png');
    AssetLoader.add.image(BASEURL + 'assets/home.png');
    AssetLoader.add.image(BASEURL + 'assets/how_to_play.png');
    AssetLoader.add.image(BASEURL + 'assets/left_arrow.png');
    AssetLoader.add.image(BASEURL + 'assets/music_off.png');
    AssetLoader.add.image(BASEURL + 'assets/music.png');
    AssetLoader.add.image(BASEURL + 'assets/next.png');
    AssetLoader.add.image(BASEURL + 'assets/play.png');
    AssetLoader.add.image(BASEURL + 'assets/right_arrow.png');
    AssetLoader.add.image(BASEURL + 'assets/title.png');
    AssetLoader.add.image(BASEURL + 'assets/score.png');
    for (var i = 0; i < 17; i++) {
        AssetLoader.add.image(BASEURL + 'assets/blast/' + i + '.png');
    }
    AssetLoader.progressListener = function(progress) {};
    AssetLoader.load(function() {
        mTex_logo = loadUI(BASEURL + 'assets/logo.png', 0, 0, 0);


        mTex_how2play = loadUI(BASEURL + 'assets/how_to_play.png', 0, 0, 0);
        mTex_over = loadUI(BASEURL + 'assets/game_over.png', 0, 0, 0);
        mTex_title = loadUI(BASEURL + 'assets/title.png', 0, -100, 0);

        mTex_help = loadUI(BASEURL + 'assets/help.png', 0, 0, 0);
        mTex_home = loadUI(BASEURL + 'assets/home.png', 0, 0, 0);

        mTex_left = loadUI(BASEURL + 'assets/left_arrow.png', 0, 0, 0);
        mTex_moff = loadUI(BASEURL + 'assets/music_off.png', 0, 0, 0);
        mTex_m_on = loadUI(BASEURL + 'assets/music.png', 0, 200, 0);
        mTex_next = loadUI(BASEURL + 'assets/next.png', 0, 0, 0);
        mTex_play = loadUI(BASEURL + 'assets/play.png', 0, 100, 0);
        mTex_right = loadUI(BASEURL + 'assets/title.png', 0, 0, 0);
        mTex_score = loadUI(BASEURL + 'assets/score.png', 0, 0, 0);

        for (var i = 0; i < 3; i++) {
            mTex_fonts.push(createTexts('100', 8, FCOLOR, ThreeUI.anchors.center, ThreeUI.anchors.center, 'center', 'font'));
        }
        for (var i = 0; i < 17; i++) {
            mTex_blast.push(loadUI(BASEURL + 'assets/blast/' + i + '.png', 0, 145, 0));
        }
        Counter = 0;
        setScreen(GAMELOGO);
        mTex_LandScape = loadUIRect('#222');
        var lndScp = createTexts('100', 150, '#fff', ThreeUI.anchors.center, ThreeUI.anchors.center, 'center', "HanaleiFill");
        lndScp.parent = mTex_LandScape;
        DrawLbl(lndScp, "Have to play in\n\nPortrait Mode", 0, -100, '#fafafa', 100);
        mTex_LandScape.visible = (window.innerWidth < window.innerHeight && isMobile.any());

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
    getStore();
    Draw();
    gamereset();
}

function loadModel() {

}

function Draw() {
    setTimeout(function() { requestAnimationFrame(Draw); }, 20);
    if (mTex_logo == null) {
        return;
    }

    renderer.render(scene, camera);
    gameUI.render(renderer);
    switch (GameScreen) {
        case GAMELOGO:
            if (Counter > 50)
                setScreen(GAMEMENU);
            break;
        case GAMEMENU:
            Draw_Menu();
            break;
        case GAMEPLAY:
            DrawGameplay();
            break;
        case GAMEHELP:
            DrawTransScal(mTex_home, 0, 120, 75, 75, (mSel == 1 ? 1.1 : 1), mSel == 1 ? 0.5 : 1);
            break;
        case GAMEOVER:
            DrawTransScal(mTex_home, -150, 90, 84, 84, (mSel == 1 ? 1.1 : 1), mSel == 1 ? 0.5 : 1);
            DrawTransScal(mTex_next, 150, 90, 84, 84, (mSel == 2 ? 1.1 : 1), mSel == 2 ? 0.5 : 1);
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
        case GAMELOGO:
            break;
        case GAMEMENU:
            Handle_Menu(type);
            break;
        case GAMEPLAY:
            if (type == 0) {
                setDirections(mouse.x > 0 ? -1 : 1);
            }

            break;
        case GAMEHELP:
        case GAMEOVER:
            mSel = 0;
            bounds = mTex_home.getBounds();
            if (ThreeUI.isInBoundingBox(coords.x, coords.y, bounds.x, bounds.y, bounds.width, bounds.height)) {
                mSel = 1;

            }
            bounds = mTex_next.getBounds();
            if (ThreeUI.isInBoundingBox(coords.x, coords.y, bounds.x, bounds.y, bounds.width, bounds.height)) {
                mSel = 2;

            }

            if (type == 2 && mSel > 0) {
                setScreen(mSel == 1 ? GAMEMENU : GAMEPLAY);
                mSel = 0;
                playSound("click");
            }
            break;
    }

}

function Draw_Menu() {

    DrawTransScal(mTex_play, 0, 50, 300, 75, (mSel == 1 ? 1.1 : 1), mSel == 1 ? 0.5 : 1);
    DrawTransScal(mTex_help, -100, 190, 75, 75, (mSel == 2 ? 1.1 : 1), mSel == 2 ? 0.5 : 1);
    DrawTransScal(mTex_moff, 100, 190, 75, 75, (mSel == 3 ? 1.1 : 1), mSel == 3 ? 0.5 : 1);
    DrawTransScal(mTex_m_on, 100, 190, 75, 75, (mSel == 3 ? 1.1 : 1), mSel == 3 ? 0.5 : 1);
    mTex_m_on.visible = (isSound == 1);
    mTex_moff.visible = !(isSound == 1);
}

function Handle_Menu(type) {

    mSel = 0;
    bounds = mTex_play.getBounds();
    if (ThreeUI.isInBoundingBox(coords.x, coords.y, bounds.x, bounds.y, bounds.width, bounds.height)) {
        mSel = 1;
    }
    bounds = mTex_help.getBounds();
    if (ThreeUI.isInBoundingBox(coords.x, coords.y, bounds.x, bounds.y, bounds.width, bounds.height)) {
        mSel = 2;
    }
    bounds = isSound ? mTex_m_on.getBounds() : mTex_moff.getBounds();
    if (ThreeUI.isInBoundingBox(coords.x, coords.y, bounds.x, bounds.y, bounds.width, bounds.height)) {
        mSel = 3;
    }
    if (type == 2) {
        switch (mSel) {
            case 1:
                setScreen(GAMEPLAY);
                break;
            case 2:
                setScreen(GAMEHELP);
                break;
            case 3:
                isSound = (isSound == 1 ? 0 : 1);
                Counter = 0;
                break;

        }
        if (mSel > 0) {
            playSound("click");
        }
        mSel = 0;
    }

}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    this.gameUI.resize();
    isResize = 5;
    mTex_LandScape.visible = false; //(window.innerWidth > window.innerHeight && isMobile.any());
}

function setScreen(scr) {
    mTex_fonts.forEach(element => { element.visible = false; });
    mTex_blast.forEach(element => { element.visible = false; });
    GameScreen = scr;
    mTex_logo.visible = false;
    obj_BallGroup.visible = false;
    obj_Ball.visible = false;
    mTex_title.visible = mTex_over.visible = mTex_help.visible = mTex_home.visible = mTex_how2play.visible = mTex_left.visible = false;
    mTex_moff.visible = mTex_m_on.visible = mTex_next.visible = mTex_play.visible = mTex_right.visible = mTex_score.visible = false;
    objCubes.forEach(element => { element.visible = false; });
    switch (GameScreen) {
        case GAMELOGO:
            mTex_logo.visible = true;
            break;
        case GAMEMENU:
            DrawSprite(mTex_title, 0, -150);
            DrawTransScal(mTex_play, 0, 50, 300, 75, 1, 1);
            DrawTransScal(mTex_moff, 100, 190, 75, 75, 1, 1);
            DrawTransScal(mTex_help, -100, 190, 75, 75, 1, 1);
            break;
        case GAMEHELP:
            mTex_how2play.visible = true;
            break;
        case GAMEOVER:
            if (bestScore < mScore) {
                bestScore = mScore;
            }
            setStore();
            DrawTransScal(mTex_over, 0, -50, 512, 512, 1, 1);
            DrawLblAling(mTex_fonts[0], "SCORE : " + mScore + "\n\nBEST : " + bestScore, 00, -100, FCOLOR, 51, "center", ThreeUI.anchors.center, ThreeUI.anchors.center);
            showAds();
            break;
        case GAMEPLAY:
            gamereset();
            DrawLblAling(mTex_fonts[0], "" + mScore, 50, 70, FCOLOR, 51, "left", ThreeUI.anchors.left, ThreeUI.anchors.top);
            break;

    }

}

const sid = "e";

function getStore() {
    try {
        if (isAndroid == true) {
            bestScore = app.getInt("score" + sid, 0);
            isSound = app.getInt("isSound" + sid, 0);
        } else {
            if (typeof(Storage) !== "undefined") {
                bestScore = localStorage.getItem("score" + sid);;
                console.log("getStore [bestScore = " + bestScore + "] ~~~~ [] ~~ [isSound = " + isSound + "]");
                if (bestScore > 0) {
                    isSound = localStorage.getItem("isSound" + sid);
                } else {
                    bestScore = 0;
                    isSound = 1;
                }
            }
        }
    } catch (err) {
        console.log("~~~~~~~getStore JS~~~~~~" + err);
    }
    console.log("getStore [bestScore = " + bestScore + "] ~~~~ [] ~~ [isSound = " + isSound + "]");
}

function setStore() {
    try {
        if (isAndroid == true) {
            app.setInt("score" + sid, bestScore);
            app.setInt("isSound" + sid, isSound);
        } else {
            localStorage.setItem("score" + sid, bestScore);
            localStorage.setItem("isSound" + sid, isSound);
        }
    } catch (err) {
        console.log("~~~~~~~setStore JS~~~~~~" + err);
    }
    console.log("setStore [bestScore = " + bestScore + "] ~~~~ [] ~~ [isSound = " + isSound + "]");
}

function showAds() {
    try {
        if (isAndroid == true) {
            app.showAds();
        } else {
            console.log("~~~~~~~showAds ~JS~~~~~~");
        }
    } catch (err) {
        console.log("~~~~~~~showAds JS~~~~~~" + err);
    }
}

function playSound(type) {
    if (isSound == 1) {
        switch (type) {
            case "click":
                mp3_click.play();;
                break;
            case "over":
                mp3_Over.play();;
                break;
            case "bounce":
                mp3_bounce.play();;
                break;
        }
    }
}