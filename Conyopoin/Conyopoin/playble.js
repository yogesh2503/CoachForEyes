var frequency = .5;
var camera, scene, renderer, Counter = 0,
    isResize = 0,
    objCount = 0,
    isClick = false,
    mSel = 0,
    isSound = 1;
var gameUI;
var mTex_logo = null,
    mTex_fonts = Array();
var BASEURL = ''
var ratio = 1;
var dis = 0.1;

var mPlan_background, mPlan_Winner;
var mTex_restart, mTex_or;

var mTex_1Player, mTex_2Player, mTex_connect, mTex_exit, mTex_pl1del, mTex_pl1sel, mTex_pl2del, mTex_pl2sel, mTex_play, mTex_pointer;
var mTex_Bar, mTex_bar1, mTex_Bar2, mTex_setting, mTex_back;
var colors;
var mTex_sound_off, mTex_sound_on, mTex_SetBck
var mp3_button, mp3_connect, mp3_error, mp3_win, mp3_start, audioLoader, listener;
const isAndroid = true;

function initstart() {
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 300);
    camera.position.set(0, 0, 60);
    camera.rotation.set(0, 0, 0);
    scene = new THREE.Scene();
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    gameUI = new ThreeUI(renderer.domElement, 720);
    renderer.setClearColor(0x333333, 1);
    CANVAS_HEIGHT = window.innerHeight;
    CANVAS_WIDTH = window.innerWidth;
    ratio = CANVAS_WIDTH / CANVAS_HEIGHT;
    var ambientLight = new THREE.AmbientLight(0xffffff, .71);
    scene.add(ambientLight);
    light = new THREE.DirectionalLight(0x999999, 1.0);
    light.position.set(0, 200, 200);
    scene.add(light);
    var manager = new THREE.LoadingManager(loadModel);
    manager.onProgress = function(item, loaded, total) {};

    function onProgress(xhr) { if (xhr.lengthComputable) { var percentComplete = (xhr.loaded / xhr.total) * 8 * objCount; } }

    function onError() {}
    var loader = new THREE.OBJLoader(manager);
    var textureLoader = new THREE.TextureLoader(manager);
    tex_Shadow = textureLoader.load(BASEURL + 'assets/shadow.png');
    tex_ball = textureLoader.load(BASEURL + 'assets/cube1.png');
    tex_cube2 = textureLoader.load(BASEURL + 'assets/cube2.png');
    tex_background = textureLoader.load(BASEURL + 'assets/background.jpg');
    tex_Winner = textureLoader.load(BASEURL + 'assets/winner.jpg');

    var meterial = new THREE.MeshStandardMaterial({ map: tex_background });
    mPlan_background = new THREE.Mesh(new THREE.PlaneGeometry(60, 60), meterial);
    mPlan_background.position.z = -12;
    scene.add(mPlan_background);
    var meterial = new THREE.MeshStandardMaterial({ map: tex_Winner });
    mPlan_Winner = new THREE.Mesh(new THREE.PlaneGeometry(60, 60), meterial);
    mPlan_Winner.position.z = -11.9;
    scene.add(mPlan_Winner);
    mPlan_Winner.visible = false;

    colors = Array();
    for (let i = 0; i < 36; i++) {
        colors.push(createColor(0));
    }
    colors.sort(compRan);
    for (let i = 0; i < 36; i++) {
        const element = new THREE.Group();
        vl = 0; //Math.random() * 3;
        var meterial = new THREE.MeshStandardMaterial({ color: colors[i], map: tex_ball, metalness: 0.1, roughness: 0, envMapIntensity: 1 });
        var obj_Ball = new THREE.Mesh(new THREE.SphereGeometry(1, 32, 32), meterial);
        mPlan_Shadow = new THREE.Mesh(new THREE.PlaneGeometry(5, 5), new THREE.MeshBasicMaterial({ map: tex_Shadow, transparent: true }));
        element.add(mPlan_Shadow);
        element.add(obj_Ball);
        scene.add(element);
        obj_Balls.push(element);
        mPlan_Shadow.position.set(0.1, -.1, -1);
        element.position.set(-10 + (i % 6) * 4, 16 - Math.floor(i / 6) * 6, 0);
    }

    for (var i = 0; i < 36; i++) {
        var material = new THREE.MeshStandardMaterial({ map: tex_cube2, color: createColor(), metalness: 0.1, roughness: 0, envMapIntensity: 1 });
        const element = new THREE.Mesh(new THREE.BoxBufferGeometry(1, 1, 1), material);
        scene.add(element);
        element.scale.set(1, .5, .5);
        scene.add(element);
        obj_Cube.push(element);
        element.visible = false;
        element.sx = 0;
        element.sy = 0;
        element.ex = 0;
        element.ey = 0;
        element.isSet = false;
    }






    listener = new THREE.AudioListener();
    audioLoader = new THREE.AudioLoader();
    camera.add(listener);
    mp3_button, mp3_connect, mp3_error, mp3_win

    mp3_button = new THREE.Audio(listener);
    mp3_connect = new THREE.Audio(listener);
    mp3_error = new THREE.Audio(listener);
    mp3_win = new THREE.Audio(listener);
    mp3_start = new THREE.Audio(listener);
    audioLoader.load('assets/sound/button.mp3', function(buffer) {
        mp3_button.setBuffer(buffer);
        mp3_button.setVolume(1.0);
    });
    audioLoader.load('assets/sound/connect.mp3', function(buffer) {
        mp3_connect.setBuffer(buffer);
        mp3_connect.setVolume(1.0);
    });
    audioLoader.load('assets/sound/error.mp3', function(buffer) {
        mp3_error.setBuffer(buffer);
        mp3_error.setVolume(1.0);
    });
    audioLoader.load('assets/sound/win.mp3', function(buffer) {
        mp3_win.setBuffer(buffer);
        mp3_win.setVolume(1.0);
    });
    audioLoader.load('assets/sound/start.mp3', function(buffer) {
        mp3_start.setBuffer(buffer);
        mp3_start.setVolume(1.0);
    });

    AssetLoader.add.webFont('font', 'font.css');
    AssetLoader.add.image(BASEURL + 'assets/logo.png');
    AssetLoader.add.image(BASEURL + 'assets/restart.png');
    AssetLoader.add.image(BASEURL + 'assets/1Player.png');
    AssetLoader.add.image(BASEURL + 'assets/2Player.png');
    AssetLoader.add.image(BASEURL + 'assets/connect.png');
    AssetLoader.add.image(BASEURL + 'assets/exit.png');
    AssetLoader.add.image(BASEURL + 'assets/pl1del.png');
    AssetLoader.add.image(BASEURL + 'assets/pl1sel.png');
    AssetLoader.add.image(BASEURL + 'assets/pl2del.png');
    AssetLoader.add.image(BASEURL + 'assets/pl2sel.png');
    AssetLoader.add.image(BASEURL + 'assets/play.png');
    AssetLoader.add.image(BASEURL + 'assets/pointer.png');
    AssetLoader.add.image(BASEURL + 'assets/bar.png');
    AssetLoader.add.image(BASEURL + 'assets/bar2.png');

    AssetLoader.add.image(BASEURL + 'assets/setting0.png');

    AssetLoader.add.image(BASEURL + 'assets/SettingsBackground.png');
    AssetLoader.add.image(BASEURL + 'assets/sound_off.png');
    AssetLoader.add.image(BASEURL + 'assets/sound_on.png');
    AssetLoader.add.image(BASEURL + 'assets/back.png');


    AssetLoader.progressListener = function(progress) {};
    AssetLoader.load(function() {
        mTex_logo = loadUI(BASEURL + 'assets/logo.png', 0, 0, 0);
        mTex_restart = loadUI(BASEURL + 'assets/restart.png', 0, -300, 0);
        mTex_1Player = loadUI(BASEURL + 'assets/1Player.png', 0, -300, 0);
        mTex_2Player = loadUI(BASEURL + 'assets/2Player.png', 0, -300, 0);
        mTex_connect = loadUI(BASEURL + 'assets/connect.png', 0, -300, 0);
        mTex_exit = loadUI(BASEURL + 'assets/exit.png', 0, -300, 0);
        mTex_pl1del = loadUI(BASEURL + 'assets/pl1del.png', 0, -300, 0);
        mTex_pl1sel = loadUI(BASEURL + 'assets/pl1sel.png', 0, -300, 0);
        mTex_pl2del = loadUI(BASEURL + 'assets/pl2del.png', 0, -300, 0);
        mTex_pl2sel = loadUI(BASEURL + 'assets/pl2sel.png', 0, -300, 0);
        mTex_play = loadUI(BASEURL + 'assets/play.png', 0, -300, 0);
        mTex_setting = loadUI(BASEURL + 'assets/setting0.png', 0, 210, 0);


        mTex_sound_off = loadUI(BASEURL + 'assets/sound_off.png', 0, 0, 0);
        mTex_sound_on = loadUI(BASEURL + 'assets/sound_on.png', 0, 0, 0);
        mTex_SetBck = loadUI(BASEURL + 'assets/SettingsBackground.png', 0, 0, 0);
        mTex_back = loadUI(BASEURL + 'assets/back.png', 0, 0, 0);
        console.log("~~~~~~~~");

        {
            mTex_Bar = loadUIBar(0, 0, 270, 8, '#fff');
            mTex_rexl = loadUIBar(-150, 0, 2, 20, '#fff');
            mTex_rexR = loadUIBar(150, 0, 2, 20, '#fff');
            mTex_rext = loadUIBar(0, -30, 2, 16, '#fff');
            mTex_bar1 = loadUI(BASEURL + 'assets/bar2.png', 0, 0, 0);
            mTex_Bar2 = loadUI(BASEURL + 'assets/bar.png', 0, 0, 0);
            mTex_min = createTexts('100', 8, FCOLOR, ThreeUI.anchors.center, ThreeUI.anchors.center, 'center', 'font');
            mTex_max = createTexts('100', 8, FCOLOR, ThreeUI.anchors.center, ThreeUI.anchors.center, 'center', 'font');
            mTex_current = createTexts('100', 8, FCOLOR, ThreeUI.anchors.center, ThreeUI.anchors.center, 'center', 'font');
            mTex_pointer = loadUI(BASEURL + 'assets/pointer.png', 0, 0, 0);
            DrawLbl(mTex_min, '30', 124, 42, '#fff', 26);
            DrawLbl(mTex_max, '8', -124, 42, '#fff', 26);
            DrawLbl(mTex_current, '15', 0, -42, '#fff', 26);
            mTex_pointer.isDown = false;
            mTex_pointer.cir = 8
            mTex_pointer.x = 0;
            mTex_bar1.height = 8;
            mTex_Bar2.height = 16;
            mTex_bar1.width = 280;
            mTex_Bar2.width = 280;
            mTex_bar1.parent = mTex_Bar;
            mTex_Bar2.parent = mTex_Bar;
            mTex_rexl.parent = mTex_Bar;
            mTex_rexR.parent = mTex_Bar;
            mTex_rext.parent = mTex_Bar;
            mTex_min.parent = mTex_Bar;
            mTex_max.parent = mTex_Bar;
            mTex_current.parent = mTex_Bar;
            mTex_pointer.parent = mTex_Bar;
            mTex_Bar.visible = mTex_bar1.visible = mTex_Bar2.visible = mTex_rexl.visible = mTex_rexR.visible = mTex_rext.visible = mTex_min.visible = true;
            mTex_min.visible = mTex_max.visible.visible = mTex_current.visible = mTex_pointer.visible = true;
        }

        for (var i = 0; i < 3; i++) {
            mTex_fonts.push(createTexts('100', 8, FCOLOR, ThreeUI.anchors.center, ThreeUI.anchors.center, 'center', 'font'));
        }
        Counter = 0;
        mTex_or = loadUIBar(-100, 0, 98, 2, '#fff');
        var _or = loadUIBar(200, 0, 98, 2, '#fff');
        var text_or = createTexts('OR', 58, FCOLOR, ThreeUI.anchors.center, ThreeUI.anchors.center, 'center', 'font');
        DrawLbl(text_or, 'OR', 100, 14, '#fff', 36);
        _or.parent = mTex_or;
        text_or.parent = mTex_or;
        mTex_or.visible = text_or.visible = _or.visible = true;

        setScreen(GAMELOGO);
        mTex_LandScape = loadUIRect('#222');
        var lndScp = createTexts('100', 150, '#fff', ThreeUI.anchors.center, ThreeUI.anchors.center, 'center', "HanaleiFill");
        lndScp.parent = mTex_LandScape;
        DrawLbl(lndScp, "Have to play in\n\nPortrait Mode", 0, -100, '#fafafa', 100);
        mTex_LandScape.visible = (window.innerWidth < window.innerHeight && isMobile.any());
        mTex_LandScape.visible = false;
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
    // gamereset();
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
            // setScreen(GAMESELCIR);
            break;
        case GAMEMENU:
            Draw_Menu();
            break;
        case GAMESELECT:
            Draw_SelectGame();
            break;
        case GAMESETTING:
            Draw_Setting();
            break;
        case GAMESELCIR:
            Draw_SelectCircle();
            break;
        case GAMEPLAY:
            DrawGameplay();
            break;
        case GAMEHELP:
            break;
        case GAMEOVER:
            DrawTransScal(mTex_restart, 0, 225, 60, 69, mSel == 1 ? 1.1 : 1, mSel == 1 ? 0.5 : 1);
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
const MULTI = 24.6;
var thita = 0;

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
        case GAMESELECT:
            Handle_SelectGame(type);
            break;
        case GAMESELCIR:
            Handle_SelectCircle(type);
            break;
        case GAMEPLAY:
            Handle_Gameplay(e, type);
            break;
        case GAMESETTING:
            Handle_Setting(type);
            break;
        case GAMEHELP:
        case GAMEOVER:
            mSel = 0;
            bounds = mTex_restart.getBounds();
            if (ThreeUI.isInBoundingBox(coords.x, coords.y, bounds.x, bounds.y, bounds.width, bounds.height)) {
                mSel = 1;
                if (type == 2) {
                    //setScreen(GAMEMENU);
                    setScreen(GAMESELCIR);
                    playSound("click");
                    mSel = 0;
                }
            }
            break;
    }
    // console.log(dis + " = thita = " + thita + ", " + mouse.y.toFixed(2));
}

function Draw_Menu() {

    DrawTransScal(mTex_play, 0, -1, 174, 87, (mSel == 1 ? 1.05 : 1), mSel == 1 ? 0.5 : 1);
    DrawTransScal(mTex_exit, 0, 100, 174, 87, (mSel == 2 ? 1.05 : 1), mSel == 2 ? 0.5 : 1);
    DrawTransScal(mTex_setting, 0, 210, 75, 75, (mSel == 3 ? 1.0 : .91), mSel == 3 ? 0.5 : 1);
    // DrawTransScal(mTex_m_on, 100, 190, 75, 75, (mSel == 3 ? 1.1 : 1), mSel == 3 ? 0.5 : 1);
    // mTex_m_on.visible = (isSound == 1);
    // mTex_moff.visible = !(isSound == 1);
}

function Handle_Menu(type) {

    mSel = 0;
    bounds = mTex_play.getBounds();
    if (ThreeUI.isInBoundingBox(coords.x, coords.y, bounds.x, bounds.y, bounds.width, bounds.height)) {
        mSel = 1;
    }
    bounds = mTex_exit.getBounds();
    if (ThreeUI.isInBoundingBox(coords.x, coords.y, bounds.x, bounds.y, bounds.width, bounds.height)) {
        mSel = 2;
    }
    bounds = mTex_setting.getBounds();
    if (ThreeUI.isInBoundingBox(coords.x, coords.y, bounds.x, bounds.y, bounds.width, bounds.height)) {
        mSel = 3;
    }
    if (type == 2) {
        switch (mSel) {
            case 1:
                setScreen(GAMESELECT);
                break;
            case 2:
                Exit();
                //Exit
                break;
            case 3:
                setScreen(GAMESETTING);
                break;

        }
        if (mSel > 0) {
            playSound("click");
        }
        mSel = 0;
    }

}




function Draw_Setting() {
    DrawTransScal(mTex_back, 0, 240, 64, 64, (mSel == 1 ? 1.05 : 1), mSel == 1 ? 0.5 : .81);
    DrawTransScal(mTex_sound_off, 0, 50, 100, 100, (mSel == 3 ? 1.05 : 1), mSel == 3 ? 0.5 : 1);
    DrawTransScal(mTex_sound_on, 0, 50, 100, 100, (mSel == 3 ? 1.05 : 1), mSel == 3 ? 0.5 : 1);
    mTex_sound_off.visible = (isSound == 0);
    mTex_sound_on.visible = (isSound == 1);
}

function Handle_Setting(type) {

    mSel = 0;
    bounds = mTex_back.getBounds();
    if (ThreeUI.isInBoundingBox(coords.x, coords.y, bounds.x, bounds.y, bounds.width, bounds.height)) {
        mSel = 1;
    }
    // bounds = mTex_2Player.getBounds();
    // if (ThreeUI.isInBoundingBox(coords.x, coords.y, bounds.x, bounds.y, bounds.width, bounds.height)) {
    //     mSel = 2;
    // }
    bounds = isSound ? mTex_sound_on.getBounds() : mTex_sound_off.getBounds();
    if (ThreeUI.isInBoundingBox(coords.x, coords.y, bounds.x, bounds.y, bounds.width, bounds.height)) {
        mSel = 3;
    }

    if (type == 2) {
        switch (mSel) {
            case 1:
                setScreen(GAMEMENU);
                isTwoPlayer = false;
                break;
            case 2:
                setScreen(GAMESELCIR);
                isTwoPlayer = true;
                break;
            case 3:
                isSound = (isSound == 1 ? 0 : 1);
                setStore();
                Counter = 0;
                break;

        }
        if (mSel > 0) {
            playSound("click");
        }
        mSel = 0;
    }
}




function Draw_SelectGame() {
    DrawTransScal(mTex_back, 0, 240, 64, 64, (mSel == 10 ? 1.05 : 1), mSel == 10 ? 0.5 : .81);
    DrawTransScal(mTex_1Player, 0, -30, 190, 75, (mSel == 1 ? 1.05 : 1), mSel == 1 ? 0.5 : 1);
    DrawTransScal(mTex_2Player, 0, 150, 190, 75, (mSel == 2 ? 1.05 : 1), mSel == 2 ? 0.5 : 1);
    mTex_or.y = 60;
}

function Handle_SelectGame(type) {

    mSel = 0;
    bounds = mTex_back.getBounds();
    if (ThreeUI.isInBoundingBox(coords.x, coords.y, bounds.x, bounds.y, bounds.width, bounds.height)) {
        mSel = 10;
    }
    bounds = mTex_1Player.getBounds();
    if (ThreeUI.isInBoundingBox(coords.x, coords.y, bounds.x, bounds.y, bounds.width, bounds.height)) {
        mSel = 1;
    }
    bounds = mTex_2Player.getBounds();
    if (ThreeUI.isInBoundingBox(coords.x, coords.y, bounds.x, bounds.y, bounds.width, bounds.height)) {
        mSel = 2;
    }
    if (type == 2) {
        switch (mSel) {
            case 1:
                setScreen(GAMESELCIR);
                isTwoPlayer = false;
                break;
            case 2:
                setScreen(GAMESELCIR);
                isTwoPlayer = true;
                break;
            case 3:
                isSound = (isSound == 1 ? 0 : 1);
                Counter = 0;
                break;
            case 10:
                setScreen(GAMEMENU);
                break;

        }
        if (mSel > 0) {
            playSound("click");
        }
        mSel = 0;
    }
}

function Draw_SelectCircle() {

    DrawTransScal(mTex_play, 0, 120, 174, 87, (mSel == 2 ? 1.05 : 1), mSel == 2 ? 0.5 : 1);
    DrawTransScal(mTex_back, 0, 240, 64, 64, (mSel == 10 ? 1.05 : 1), mSel == 10 ? 0.5 : .81);

}

function Handle_SelectCircle(type) {

    mSel = 0;
    bounds = mTex_back.getBounds();
    if (ThreeUI.isInBoundingBox(coords.x, coords.y, bounds.x, bounds.y, bounds.width, bounds.height)) {
        mSel = 10;
    }

    bounds = mTex_pointer.getBounds();
    if (ThreeUI.isInBoundingBox(coords.x, coords.y, bounds.x, bounds.y, bounds.width, bounds.height)) {
        mSel = 1;
        if (type == 0)
            mTex_pointer.isDown = true;
        if (type == 2)
            mTex_pointer.isDown = false;
    }
    bounds = mTex_play.getBounds();
    if (ThreeUI.isInBoundingBox(coords.x, coords.y, bounds.x, bounds.y, bounds.width, bounds.height)) {
        mSel = 2;
    }
    if (mTex_pointer.isDown) {
        mTex_pointer.x = mouse.x * ratio * 360;
        console.log(mTex_pointer.x.toFixed(2) + "~~~~  " + mouse.x.toFixed(2));
        if (mTex_pointer.x < -120) {
            mTex_pointer.x = -120;
        }
        if (mTex_pointer.x > 120) {
            mTex_pointer.x = 120;
        }
        mTex_pointer.cir = 8 + Math.floor((mTex_pointer.x + 120) * .093);
    }

    mTex_bar1.width = Math.floor(mTex_pointer.x + 140);
    mTex_bar1.x = -0 + (mTex_pointer.x - mTex_bar1.width * .5);

    mTex_rext.x = mTex_pointer.x;
    DrawLbl(mTex_current, mTex_pointer.cir + '', mTex_pointer.x, -42, '#fff', 26);
    if (type == 2) {
        switch (mSel) {
            case 2:
                setScreen(GAMEPLAY);
                break;
            case 10:
                setScreen(GAMESELECT);
                break;
        }
        if (mSel > 0) {
            playSound("click");
        }
        mSel = 0;
        mTex_pointer.isDown = false;
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
    GameScreen = scr;
    mTex_fonts.forEach(element => { element.visible = false; });
    obj_Balls.forEach(element => { element.visible = false; });
    obj_Cube.forEach(element => { element.visible = false; });
    mTex_logo.visible = mTex_restart.visible = mTex_or.visible = false;
    mTex_1Player.visible = mTex_2Player.visible = mTex_connect.visible = mTex_exit.visible = mTex_pl1del.visible = false;
    mTex_pl1sel.visible = mTex_pl2del.visible = mTex_pl2sel.visible = mTex_play.visible = false;
    mTex_setting.visible = mTex_Bar.visible = mPlan_Winner.visible = mTex_back.visible = false;
    mTex_sound_off.visible = mTex_sound_on.visible = mTex_SetBck.visible = false;
    if (GameScreen == GAMEPLAY || GameScreen == GAMEOVER)
        showBanner(1);
    else
        showBanner(0);
    switch (GameScreen) {
        case GAMELOGO:
            mTex_logo.visible = true;
            break;
        case GAMESETTING:
            DrawTextureAX(mTex_connect, 0, 38, ThreeUI.anchors.center, ThreeUI.anchors.bottom);
            DrawTransScal(mTex_SetBck, 0, 50, 220, 220, 1, 1);
            DrawTexture(mTex_logo, 0, -210, 220, 220, 1, 1);
            break;
        case GAMEMENU:
            DrawTexture(mTex_logo, 0, -210, 220, 220, 1, 1);
            DrawTextureAX(mTex_connect, 0, 38, ThreeUI.anchors.center, ThreeUI.anchors.bottom);
            break;
        case GAMESELECT:
            DrawTexture(mTex_logo, 0, -210, 220, 220, 1, 1);
            DrawTextureAX(mTex_connect, 0, 38, ThreeUI.anchors.center, ThreeUI.anchors.bottom);
            mTex_or.visible = true;
            break;
        case GAMESELCIR:
            DrawTexture(mTex_logo, 0, -210, 220, 220, 1, 1);
            DrawTextureAX(mTex_connect, 0, 38, ThreeUI.anchors.center, ThreeUI.anchors.bottom);
            mTex_Bar.visible = true;
            mTex_rext.x = mTex_pointer.x;
            mTex_pointer.cir = 8 + Math.floor((mTex_pointer.x + 120) * .093);
            mTex_bar1.width = Math.floor(mTex_pointer.x + 140);
            mTex_bar1.x = -0 + (mTex_pointer.x - mTex_bar1.width * .5);

            DrawLbl(mTex_current, 8 + Math.floor((mTex_pointer.x + 120) * .093) + '', mTex_pointer.x, -42, '#fff', 26);
            break;
        case GAMEPLAY:
            playSound('start');
            mTex_restart.visible = true;
            DrawTextureAX(mTex_pl1del, -110, 38, ThreeUI.anchors.center, ThreeUI.anchors.top);
            DrawTextureAX(mTex_pl1sel, -110, 38, ThreeUI.anchors.center, ThreeUI.anchors.top);
            DrawTextureAX(mTex_pl2del, 110, 38, ThreeUI.anchors.center, ThreeUI.anchors.top);
            DrawTextureAX(mTex_pl2sel, 110, 38, ThreeUI.anchors.center, ThreeUI.anchors.top);
            DrawTransScal(mTex_back, 30, 260, 64, 64, 1, .81);
            mTex_back.anchor.x = ThreeUI.anchors.right; // Default
            // mTex_pl1del, mTex_pl1sel, mTex_pl2del, mTex_pl2sel
            gamereset();
            break;
        case GAMEOVER:
            showAds();
            playSound('win');
            var winner = (pSel == 0 ? 1 : 0) + 1;
            DrawLbl(mTex_fonts[0], 'PLAYER ' + winner, 0, -202, FCOLOR2, 46);
            if (isTwoPlayer == false && winner == 2) {
                DrawLbl(mTex_fonts[0], 'AI WIN', 0, -202, FCOLOR2, 46);
            }

            mPlan_Winner.visible = true;
            break;
    }
}
const sid = "f";

function getStore() {
    try {
        if (isAndroid == true) {
            bestScore = app.getInt("score" + sid, 0);
            isSound = app.getInt("isSound" + sid, 1);
        } else {
            if (typeof(Storage) !== "undefined") {
                bestScore = localStorage.getItem("score" + sid);
                console.log("getStore~~~ [bestScore = " + bestScore + "] ~~~~ [undefined] ~~ [isSound = " + isSound + "]");
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

function showBanner(visible) {
    try {
        if (isAndroid == true) {
            app.ShowBanner(visible);
        } else {
            console.log("~~~~~~~showBanner~~~~~~  " + visible);
        }
    } catch (err) {
        console.log("~~~~~~~showBanner Error~~~~~~ " + err);
    }
}

function Exit() {
    try {
        if (isAndroid == true) {
            app.Exit();
        } else {
            console.log("~~~~~~~Exit~~~~~~  ");
        }
    } catch (err) {
        console.log("~~~~~~~Exit Error~~~~~~ " + err);
    }
}


function playSound(type) {
    console.log(type + "~~~~~~~playSound~~~~~~" + isSound);
    if (isSound == 1) {
        if (isAndroid == true) {
            switch (type) {
                case "click":
                    mp3_button.play();
                    break;
                case "connect":
                    mp3_connect.play();
                    break;
                case "error":
                    mp3_error.play();
                    break;
                case "win":
                    mp3_win.play();
                    break;
                case "start":
                    mp3_start.play();
                    break;
            }
        } else {
            iosSend("sound", type);
        }
    }
}

function iosSend(usr, token) {
    var messagehidden = { username: usr, secretToken: token };
    window.webkit.messageHandlers.userLogin.postMessage(messagehidden);
}