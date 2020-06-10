var frequency = .5;
var camera, scene, renderer, Counter = 0,
    isResize = 0,
    objCount = 0,
    isClick = false,
    mSel = 0,
    isAndroid = false;
var gameUI;
var mTex_logo = null;
var mTex_Gameover, mTex_Help, mTex_Home, mTex_h2Play, mTex_MusicOff, mTex_Music_On, mTex_Next, mTex_Best, mTex_Score, mTex_Title, mTex_Play;
var mTex_right, mTex_left;
var bestScore = 0,
    isSound = 1,
    mScore = 0;
var mp3_bounce, mp3_Over, mp3_click, audioLoader, listener;
var mp3_gameplay; // 13 May 2020
var tex_frant, mTex_fonts = Array();
var mTex_blast = Array();
var obj_cube = null;
var obj_Base = Array();
var obj_World = null;
var mPlan_Splash;
var obj_Ball, mPlan_Shadow;
var tex_Splash = Array();
// 13 May 2020 Start
var mTex_hempty = Array(),
    mTex_heart = Array();
// 13 May 2020 End

const BASEURL = '';

function initstart() {
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 300);
    camera.position.set(0, 30, 50);
    camera.rotation.set(-.50, 0, 0);
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
    tex_frant = textureLoader.load(BASEURL + 'assets/cube1.png');
    tex_Shadow = textureLoader.load(BASEURL + 'assets/shadow.png');
    for (let i = 0; i < 4; i++) {
        tex_Splash.push(textureLoader.load(BASEURL + 'assets/splash' + i + '.png'));
    }

    loader.load(BASEURL + 'assets/cube.obj', function(obj) { obj_cube = obj; }, onProgress, onError);


    mPlan_Splash = new THREE.Mesh(new THREE.PlaneGeometry(183, 366), new THREE.MeshBasicMaterial({ map: tex_Splash[0] }));
    scene.add(mPlan_Splash);
    mPlan_Splash.position.set(0, -106, -200);
    mPlan_Splash.rotation.set(-.50, 0, 0);

    mPlan_Shadow = new THREE.Mesh(new THREE.PlaneGeometry(4, 4), new THREE.MeshBasicMaterial({ map: tex_Shadow, transparent: true }));
    scene.add(mPlan_Shadow);
    mPlan_Shadow.position.y = -10;
    mPlan_Shadow.rotation.x = -Math.PI * .5;
    mPlan_Shadow.visible = true;
    mPlan_Shadow.position.y = -9.7;

    var geometry = new THREE.SphereGeometry(1, 32, 32);
    // var material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
    // var material = new THREE.MeshStandardMaterial({ color: createColor(), metalness: 0, roughness: 1, envMapIntensity: 1.0 });
    var material = new THREE.MeshStandardMaterial({ map: tex_frant, color: 0xffff00, metalness: 0.1, roughness: 1, envMapIntensity: 1 });
    obj_Ball = new THREE.Mesh(geometry, material);
    scene.add(obj_Ball);
    obj_Ball.spd = .4;
    obj_Ball.vy = .1;


    listener = new THREE.AudioListener();
    audioLoader = new THREE.AudioLoader();
    camera.add(listener);


    mp3_Over = new THREE.Audio(listener);
    mp3_bounce = new THREE.Audio(listener);
    mp3_click = new THREE.Audio(listener);
    mp3_gameplay = new THREE.Audio(listener); // 13 May 2020

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


    // 13 May 2020 Start
    audioLoader.load('assets/sound/gameplay.mp3', function(buffer) {
        mp3_gameplay.setBuffer(buffer);
        mp3_gameplay.setVolume(1.0);
        mp3_gameplay.setLoop(true);
    });
    // 13 May 2020 End

    AssetLoader.add.webFont('PressStart2P', 'font.css');
    AssetLoader.add.image(BASEURL + 'assets/logo.png');

    AssetLoader.add.image(BASEURL + 'assets/how_to_play.png');
    AssetLoader.add.image(BASEURL + 'assets/game_over.png');
    AssetLoader.add.image(BASEURL + 'assets/help.png');
    AssetLoader.add.image(BASEURL + 'assets/home.png');
    AssetLoader.add.image(BASEURL + 'assets/music_off.png');
    AssetLoader.add.image(BASEURL + 'assets/music.png');
    AssetLoader.add.image(BASEURL + 'assets/next.png');
    AssetLoader.add.image(BASEURL + 'assets/play.png');
    AssetLoader.add.image(BASEURL + 'assets/score_bt.png');
    AssetLoader.add.image(BASEURL + 'assets/score.png');
    AssetLoader.add.image(BASEURL + 'assets/title.png');
    AssetLoader.add.image(BASEURL + 'assets/left_arrow.png');
    AssetLoader.add.image(BASEURL + 'assets/right_arrow.png');
    AssetLoader.add.image(BASEURL + 'assets/heart.png'); // 13 May 2020
    AssetLoader.add.image(BASEURL + 'assets/heartempty.png'); // 13 May 2020
    for (var i = 0; i < 17; i++) {
        AssetLoader.add.image(BASEURL + 'assets/blast/' + i + '.png');
    }

    AssetLoader.progressListener = function(progress) {};
    AssetLoader.load(function() {
        mTex_logo = loadUI(BASEURL + 'assets/logo.png', 0, 0, 0);
        mTex_h2Play = loadUI(BASEURL + 'assets/how_to_play.png', 0, 0, 0);
        mTex_Gameover = loadUI(BASEURL + 'assets/game_over.png', 0, 0, 0);
        mTex_Help = loadUI(BASEURL + 'assets/help.png', 0, 0, 0);
        mTex_Home = loadUI(BASEURL + 'assets/home.png', 0, 0, 0);

        mTex_MusicOff = loadUI(BASEURL + 'assets/music_off.png', 0, 0, 0);
        mTex_Music_On = loadUI(BASEURL + 'assets/music.png', 0, 0, 0);
        mTex_Next = loadUI(BASEURL + 'assets/next.png', 0, 0, 0);
        mTex_Best = loadUI(BASEURL + 'assets/score_bt.png', 0, 0, 0);
        mTex_Score = loadUI(BASEURL + 'assets/score.png', 0, 0, 0);
        mTex_Title = loadUI(BASEURL + 'assets/title.png', 0, 0, 0);
        mTex_Play = loadUI(BASEURL + 'assets/play.png', 0, 0, 0);
        mTex_left = loadUI(BASEURL + 'assets/left_arrow.png', 0, 0, 0);
        mTex_right = loadUI(BASEURL + 'assets/right_arrow.png', 0, 0, 0);
        // 13 May 2020 Start
        for (let i = 0; i < 3; i++) {
            mTex_hempty.push(loadUI(BASEURL + 'assets/heartempty.png', 0, 0, 0));
            mTex_heart.push(loadUI(BASEURL + 'assets/heart.png', 0, 0, 0));
        }
        // 13 May 2020 End

        for (var i = 0; i < 5; i++) {
            mTex_fonts.push(createTexts('100', 8, FCOLOR, ThreeUI.anchors.center, ThreeUI.anchors.center, 'center', 'PressStart2P'));
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
        mTex_LandScape.visible = (window.innerWidth > window.innerHeight && isMobile.any());

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
}

function loadModel() {
    obj_World = new THREE.Group();
    obj_cube.traverse(function(child) {
        if (child.isMesh) {
            child.material.map = tex_frant;
        }
    });
    obj_cube.position.y = -10;
    for (var i = 0; i < 20; i++) {
        obj_Base.push(new THREE.Group());
        var mTex_Emozy = obj_cube.clone();
        mTex_Emozy.traverse(function(child) {
            if (child.isMesh) {
                child.material = child.material.clone();
                var color = createColor();
                child.material.color = color;
            }
        });

        obj_Base[i].add(mTex_Emozy);
        obj_Base[i].angle = 0;
        obj_World.add(obj_Base[i]);
        obj_Base[i].scale.set(3, 1, 10);
        // if (i > 0)
        //     obj_Base[i].position.set(0, 0, obj_Base[i - 1].position.z - 6.2 * i + 2);

    }
    scene.add(obj_World);
    obj_World.rot = 0;
    obj_World.dir = 0;
    obj_World.ang = 0;
    obj_World.visible = false;
}


function Draw_Menu() {
    DrawTransScal(mTex_Play, 0, 100, 256, 128, (mSel == 1 ? 1.1 : 1), mSel == 1 ? 0.5 : 1);
    DrawTransScal(mTex_Help, 100, 220, 128, 128, (mSel == 2 ? 1.1 : 1), mSel == 2 ? 0.5 : 1);
    DrawTransScal(mTex_MusicOff, -100, 220, 128, 128, (mSel == 3 ? 1.1 : 1), mSel == 3 ? 0.5 : 1);
    DrawTransScal(mTex_Music_On, -100, 220, 128, 128, (mSel == 3 ? 1.1 : 1), mSel == 3 ? 0.5 : 1);
    mTex_Music_On.visible = (isSound == 1);
    mTex_MusicOff.visible = !(isSound == 1);
}

function Handle_Menu(type) {

    mSel = 0;
    bounds = mTex_Play.getBounds();
    if (ThreeUI.isInBoundingBox(coords.x, coords.y, bounds.x, bounds.y, bounds.width, bounds.height)) {
        mSel = 1;
    }
    bounds = mTex_Help.getBounds();
    if (ThreeUI.isInBoundingBox(coords.x, coords.y, bounds.x, bounds.y, bounds.width, bounds.height)) {
        mSel = 2;
    }
    bounds = isSound ? mTex_Music_On.getBounds() : mTex_MusicOff.getBounds();
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





function Draw() {
    setTimeout(function() { requestAnimationFrame(Draw); }, 20);
    if (mTex_logo == null || obj_World == null) {
        return;
    }
    renderer.render(scene, camera);
    gameUI.render(renderer);
    switch (GameScreen) {
        case GAMELOGO:
            if (Counter > 6)
                setScreen(GAMEMENU);
            break;
        case GAMEMENU:
            Draw_Menu();
            break;
        case GAMEPLAY:
            drawGameplay();
            break;
        case GAMEHELP:
            DrawTransScal(mTex_Home, 0, 100, 128, 128, (mSel == 1 ? 1.1 : 1), mSel == 1 ? 0.5 : 1);
            break;
        case GAMEOVER:
            DrawTransScal(mTex_Home, -110, 30, 100, 100, (mSel == 1 ? 1.1 : 1), mSel == 1 ? 0.5 : 1);
            DrawTransScal(mTex_Next, 110, 30, 100, 100, (mSel == 2 ? 1.1 : 1), mSel == 2 ? 0.5 : 1);
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
        case GAMELOGO:
            break;
        case GAMEMENU:
            Handle_Menu(type);
            break;
        case GAMEPLAY:
            if (type == 0)
                setDirections(mouse.x > 0 ? -1 : 1);
            break;
        case GAMEHELP:
        case GAMEOVER:
            mSel = 0;
            bounds = mTex_Home.getBounds();
            if (ThreeUI.isInBoundingBox(coords.x, coords.y, bounds.x, bounds.y, bounds.width, bounds.height)) {
                mSel = 1;

            }
            bounds = mTex_Next.getBounds();
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

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    this.gameUI.resize();
    isResize = 5;
    mTex_LandScape.visible = (window.innerWidth > window.innerHeight && isMobile.any());
}


function setScreen(scr) {
    GameScreen = scr;
    mTex_hempty.forEach(element => { element.visible = false; }); // 13 May 2020
    mTex_heart.forEach(element => { element.visible = false; }); // 13 May 2020
    mTex_fonts.forEach(element => { element.visible = false; });
    mTex_blast.forEach(element => { element.visible = false; });
    mTex_Gameover.visible = mTex_Help.visible = mTex_Home.visible = mTex_h2Play.visible = mTex_MusicOff.visible = mTex_logo.visible = false;
    mTex_Music_On.visible = mTex_Next.visible = mTex_Best.visible = mTex_Score.visible = mTex_Title.visible = mTex_Play.visible = false;
    mTex_left.visible = mTex_right.visible = false;

    obj_Ball.visible = false;
    mPlan_Shadow.visible = false;
    if (obj_World != null)
        obj_World.visible = false;
    mp3_gameplay.pause(); // 13 May 2020
    switch (GameScreen) {
        case GAMELOGO:
            mTex_logo.visible = true;
            break;
        case GAMEMENU:
            DrawTransScal(mTex_Title, 0, -130, 464, 464, 1, 1);
            DrawTextureAX(mTex_Best, 70, 30, ThreeUI.anchors.left, ThreeUI.anchors.top);
            DrawLblAling(mTex_fonts[0], "" + bestScore, 93, 35, FCOLOR2, 11, "center", ThreeUI.anchors.left, ThreeUI.anchors.top);
            break;
        case GAMEHELP:
            DrawTransScal(mTex_h2Play, 0, -50, 380, 380, 1, 1);
            break;
        case GAMEOVER:
            DrawTransScal(mTex_Gameover, 0, -50, 380, 190, 1, 1);
            DrawLblAling(mTex_fonts[0], "SCORE : " + mScore + "\n\n\n\nBEST SCORE : " + bestScore, 00, -60, FCOLOR, 11, "center", ThreeUI.anchors.center, ThreeUI.anchors.center);
            showAds();
            break;
        case GAMEPLAY:
            playSound("gameplay"); // 13 May 2020
            gamereset();
            DrawTextureAX(mTex_Score, 70, 30, ThreeUI.anchors.left, ThreeUI.anchors.top);
            DrawLblAling(mTex_fonts[0], "" + mScore, 96, 35, FCOLOR2, 10, "center", ThreeUI.anchors.left, ThreeUI.anchors.top);
            DrawTextureAX(mTex_left, 40, 140, ThreeUI.anchors.left, ThreeUI.anchors.bottom);
            DrawTextureAX(mTex_right, 40, 140, ThreeUI.anchors.right, ThreeUI.anchors.bottom);
            mTex_right.alpha = mTex_left.alpha = .3;
            // 13 May 2020 Start
            for (var i = 0; i < mTex_hempty.length; i++) {
                DrawTextureAX(mTex_hempty[i], 16 + i * 32, 20, ThreeUI.anchors.right, ThreeUI.anchors.top);
                DrawTextureAX(mTex_heart[i], 16 + i * 32, 20, ThreeUI.anchors.right, ThreeUI.anchors.top);
            }
            // 13 May 2020 End
            break;
    }

}


const sid = "d";

function getStore() {
    try {
        if (isAndroid == true) {
            bestScore = app.getInt("score" + sid, 0);
            isSound = app.getInt("isSound" + sid, 0);
        } else {
            if (typeof(Storage) !== "undefined") {
                bestScore = localStorage.getItem("lvl" + sid);;
                if (bestScore > 0) {
                    bestScore = localStorage.getItem("score" + sid);
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
    mp3_bounce,
    mp3_Over,
    mp3_click
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
                // 13 May 2020 Start
            case "gameplay":
                mp3_gameplay.play();
                break;
                // 13 May 2020 End
        }
    }
}