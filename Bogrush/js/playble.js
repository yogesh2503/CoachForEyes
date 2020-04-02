var camera, scene, renderer, Counter = 0,
    isResize = 0,
    objCount = 0,
    mSel = 0,
    isSound = true;
var gameUI;
var mPly = new Player();
var mTex_fonts = Array(5);
var mPlan_Road = [],
    mPlan_Paper = [],
    mPlan_Virus = [],
    mPlan_Player = [],
    mPlan_Police = [],
    mPlan_Home, mPlan_Splash;
var mTex_hand, mTex_refress, mTex_Swipe, mTex_Play, mTex_logo, mTex_Menu, mTex_leader;
var mTex_soundon, mTex_soundoff, mTex_name, mTex_score, mTex_nam_02, mTex_nam_03, mTex_nexticn;
var mTex_gameover, mTex_gamepaus, mTex_gamewin, mTex_scorebox, mTex_popup, mTex_homeicn, mTex_playicn, mTex_retryicn;
var mTex_platinum, mTex_silvermedal, mTex_bronze, mTex_goldmedal, mTex_leaderboard, mTex_Rolls, mTex_selbar;
var mTex_kevin, mTex_karen, mTex_level;
var mTex_Heart = [],
    mTex_EHeart = [],
    anim = [];
var CANVAS_WIDTH = 480,
    CANVAS_HEIGHT = 854;
var BASEURL = "https://hututusoftwares.com/Games/Playble/";
BASEURL = "";
// BASEURL = "file:///android_asset/";
var isAndroid = false;
var raycaster = new THREE.Raycaster();
var input_div, input;

function initstart() {
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 300);
    camera.position.set(0, 0, 19);
    camera.rotation.set(0, 0, 0);
    scene = new THREE.Scene();
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;

    document.body.appendChild(renderer.domElement);
    gameUI = new ThreeUI(renderer.domElement, 720);
    renderer.setClearColor(0xf0e6c1, 1);
    var ambientLight = new THREE.AmbientLight(0xffffff, .81);
    scene.add(ambientLight);
    light = new THREE.DirectionalLight(0xffffff);
    light.position.set(80, 80, 80);
    scene.add(light);
    CANVAS_HEIGHT = window.innerHeight;
    CANVAS_WIDTH = window.innerWidth;

    gameUI.name = "yogesh";

    input_div = document.createElement('div');
    input_div.setAttribute('class', 'center-block');

    input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.setAttribute('id', 'fname');
    input.setAttribute('placeholder', 'User Name');
    input_div.appendChild(input);

    document.body.appendChild(input_div);
    input_div.style.display = "none";

    var geometry = new THREE.BoxGeometry(1, 1, 1);
    var material = new THREE.MeshNormalMaterial();
    // var material = new THREE.MeshStandardMaterial({ color: 0xeeeadf, metalness: 0, roughness: 1, envMapIntensity: 1.0 });
    meshLoading = new THREE.Mesh(geometry, material);
    meshLoading.position.set(0, 0, 0);
    meshLoading.scale.set(1, 1, 1); //14-111
    scene.add(meshLoading);

    var manager = new THREE.LoadingManager(loadModel);
    manager.onProgress = function(item, loaded, total) {};

    function onProgress(xhr) {
        if (xhr.lengthComputable) {
            var percentComplete = (xhr.loaded / xhr.total) * 8 * objCount;
            objCount++;
        }
    }

    function onError() {}
    var textureLoader = new THREE.TextureLoader(manager);
    mTex_road = textureLoader.load(BASEURL + 'assets/road.png');
    tex_vir = textureLoader.load(BASEURL + 'assets/virus.png');
    tex_paperroll = textureLoader.load(BASEURL + 'assets/paperroll.png');
    tex_home = textureLoader.load(BASEURL + 'assets/home.png');
    tex_male = textureLoader.load(BASEURL + 'assets/male.png');
    tex_female = textureLoader.load(BASEURL + 'assets/female.png');
    tex_Polish = textureLoader.load(BASEURL + 'assets/police.png');
    tex_splash = textureLoader.load(BASEURL + 'assets/splash.jpg');

    var geometry = new THREE.PlaneGeometry(16, 16);
    var material = new THREE.MeshBasicMaterial({ map: mTex_road });
    for (var i = 0; i < 4; i++) {
        if (i == 0)
            mPlan_Road.push(new THREE.Mesh(geometry, material));
        else
            mPlan_Road[i] = mPlan_Road[0].clone();
        mPlan_Road[i].position.set(-16 + i * 16, 0, 0);
        scene.add(mPlan_Road[i]);
        mPlan_Road[i].visible = false;
    }



    var geometry = new THREE.PlaneGeometry(8, 8);
    var material = new THREE.MeshBasicMaterial({ map: tex_home, transparent: true });
    mPlan_Home = new THREE.Mesh(geometry, material);
    scene.add(mPlan_Home);
    mPlan_Home.visible = false;

    var geometry = new THREE.PlaneGeometry(32, 16);
    var material = new THREE.MeshBasicMaterial({ map: tex_splash });
    mPlan_Splash = new THREE.Mesh(geometry, material)
    scene.add(mPlan_Splash);
    mPlan_Splash.visible = true;



    var geometry = new THREE.PlaneGeometry(2, 3);
    var material = new THREE.MeshBasicMaterial({ map: tex_male, transparent: true });
    mPlan_Player.push(new THREE.Mesh(geometry, material));
    scene.add(mPlan_Player[0]);
    mPlan_Player[0].visible = false;

    // var geometry = new THREE.PlaneGeometry(2, 4);
    var material = new THREE.MeshBasicMaterial({ map: tex_female, transparent: true });
    mPlan_Player.push(new THREE.Mesh(geometry, material));
    scene.add(mPlan_Player[1]);
    mPlan_Player[1].visible = false;

    // var geometry = new THREE.PlaneGeometry(2, 4);
    var material = new THREE.MeshBasicMaterial({ map: tex_Polish, transparent: true });
    for (var i = 0; i < 3; i++) {
        if (i == 0)
            mPlan_Police.push(new THREE.Mesh(geometry, material));
        else
            mPlan_Police[i] = mPlan_Police[0].clone();
        mPlan_Police[i].position.set(i, 0, 0);
        mPlan_Police[i].vy = .5;
        scene.add(mPlan_Police[i]);
        mPlan_Police[i].visible = false;
    }

    var geometry = new THREE.PlaneGeometry(1, 1);
    var material = new THREE.MeshBasicMaterial({ map: tex_vir, transparent: true });
    for (var i = 0; i < 40; i++) {
        if (i == 0)
            mPlan_Virus.push(new THREE.Mesh(geometry, material));
        else
            mPlan_Virus[i] = mPlan_Virus[0].clone();
        mPlan_Virus[i].position.set(i, 0, 0);
        scene.add(mPlan_Virus[i]);
        mPlan_Virus[i].visible = false;
    }
    var geometry = new THREE.PlaneGeometry(.8, .8);
    var material = new THREE.MeshBasicMaterial({ map: tex_paperroll, transparent: true });
    for (var i = 0; i < 100; i++) {
        if (i == 0)
            mPlan_Paper.push(new THREE.Mesh(geometry, material));
        else
            mPlan_Paper[i] = mPlan_Paper[0].clone();
        mPlan_Paper[i].position.set(i, 2, 0);
        scene.add(mPlan_Paper[i]);
        mPlan_Paper[i].visible = false;
    }

    mPly.paer1 = mPlan_Paper[0].clone();
    mPly.paer1.visible = false;
    mPly.paer1.position.set(-1, -.7, 0);
    mPly.group.add(mPly.paer1);


    mPly.paer2 = mPlan_Paper[0].clone();
    mPly.paer2.position.set(1, -.7, 0);
    mPly.paer2.visible = false;
    mPly.group.add(mPly.paer2);



    mPly.group.visible = false;
    scene.add(mPly.group);




    for (var i = 0; i < 50; i++) {
        var material = new THREE.MeshBasicMaterial({ color: createColor() });
        anim[i] = new THREE.Mesh(new THREE.PlaneBufferGeometry(1, 1, 1, 1), material);
        anim[i].position.set(0, 0, 1);
        anim[i].vx = Math.random() - .51;
        anim[i].vy = Math.random() - .51;
        anim[i].visible = false;
        scene.add(anim[i]);
    }


    // AssetLoader.add.image(BASEURL + 'assets/name.png');
    AssetLoader.add.image(BASEURL + 'assets/hand.png');
    AssetLoader.add.image(BASEURL + 'assets/refress.png');
    AssetLoader.add.image(BASEURL + 'assets/swipe.png');
    AssetLoader.add.image(BASEURL + 'assets/play.png');
    AssetLoader.add.image(BASEURL + 'assets/heart.png');
    AssetLoader.add.image(BASEURL + 'assets/heartempty.png');
    AssetLoader.add.image(BASEURL + 'assets/soundon.png');
    AssetLoader.add.image(BASEURL + 'assets/soundoff.png');
    AssetLoader.add.image(BASEURL + 'assets/name.png');


    AssetLoader.add.image(BASEURL + 'assets/gameover1.png');
    AssetLoader.add.image(BASEURL + 'assets/gamepause1.png');
    AssetLoader.add.image(BASEURL + 'assets/gamewin1.png');
    AssetLoader.add.image(BASEURL + 'assets/scorebox.png');
    AssetLoader.add.image(BASEURL + 'assets/popup.png');
    AssetLoader.add.image(BASEURL + 'assets/homeicn.png');
    AssetLoader.add.image(BASEURL + 'assets/playicn.png');
    AssetLoader.add.image(BASEURL + 'assets/retryicn.png');
    AssetLoader.add.image(BASEURL + 'assets/score.png');
    AssetLoader.add.image(BASEURL + 'assets/nam-02.png');
    AssetLoader.add.image(BASEURL + 'assets/nam-03.png');
    AssetLoader.add.image(BASEURL + 'assets/nexticn.png');
    AssetLoader.add.image(BASEURL + 'assets/leader.png');


    AssetLoader.add.image(BASEURL + 'assets/platinum.png');
    AssetLoader.add.image(BASEURL + 'assets/silvermedal.png');
    AssetLoader.add.image(BASEURL + 'assets/bronze.png');
    AssetLoader.add.image(BASEURL + 'assets/goldmedal.png');
    AssetLoader.add.image(BASEURL + 'assets/rolls.png');
    AssetLoader.add.image(BASEURL + 'assets/leaderboard.png');
    AssetLoader.add.image(BASEURL + 'assets/serbar.png');


    AssetLoader.add.image(BASEURL + 'assets/kevin.png');
    AssetLoader.add.image(BASEURL + 'assets/karen.png');
    AssetLoader.add.image(BASEURL + 'assets/level.png');

    AssetLoader.progressListener = function(progress) {
        // console.info('Progress: ' + (progress * 50) + '%');
    };
    AssetLoader.load(function() {
        // mTex_logo = loadUI(BASEURL + 'assets/logo.png', 0, 0, 0);
        // mTex_logo.visible = true;
        mTex_popup = loadUI(BASEURL + 'assets/popup.png', 0, 0, 0);
        mTex_hand = loadUI(BASEURL + 'assets/hand.png', 0, 0, 0);
        mTex_refress = loadUI(BASEURL + 'assets/refress.png', 0, -0, 0);
        mTex_Swipe = loadUI(BASEURL + 'assets/swipe.png', 0, -0, 0);
        mTex_Swipe.s = 1;
        mTex_Swipe.sx = 1.1;
        mTex_Play = loadUI(BASEURL + 'assets/play.png', -0, 0, 0);
        mTex_Menu = loadUI(BASEURL + 'assets/play.png', -0, 0, 0);

        mTex_soundon = loadUI(BASEURL + 'assets/soundon.png', -0, 0, 0);
        mTex_soundoff = loadUI(BASEURL + 'assets/soundoff.png', -0, 0, 0);
        mTex_name = loadUI(BASEURL + 'assets/name.png', 0, 0, 0);

        mTex_gameover = loadUI(BASEURL + 'assets/gameover1.png', 0, -180, 0);
        mTex_gamepaus = loadUI(BASEURL + 'assets/gamepause1.png', 0, -180, 0);
        mTex_gamewin = loadUI(BASEURL + 'assets/gamewin1.png', 0, -180, 0);
        mTex_scorebox = loadUI(BASEURL + 'assets/scorebox.png', 0, 0, 0);
        mTex_homeicn = loadUI(BASEURL + 'assets/homeicn.png', 0, 0, 0);
        mTex_playicn = loadUI(BASEURL + 'assets/playicn.png', 0, 0, 0);
        mTex_retryicn = loadUI(BASEURL + 'assets/retryicn.png', 0, 0, 0);
        mTex_score = loadUI(BASEURL + 'assets/score.png', 0, 0, 0);
        mTex_nam_02 = loadUI(BASEURL + 'assets/nam-02.png', 0, 0, 0);
        mTex_nam_03 = loadUI(BASEURL + 'assets/nam-03.png', 0, 0, 0);
        mTex_nexticn = loadUI(BASEURL + 'assets/nexticn.png', 0, 0, 0);
        mTex_leader = loadUI(BASEURL + 'assets/leader.png', 0, 0, 0);

        mTex_platinum = loadUI(BASEURL + 'assets/platinum.png', 170, 30, 0);
        mTex_silvermedal = loadUI(BASEURL + 'assets/silvermedal.png', 170, -60, 0);
        mTex_bronze = loadUI(BASEURL + 'assets/bronze.png', -170, -60, 0);
        mTex_goldmedal = loadUI(BASEURL + 'assets/goldmedal.png', -170, 30, 0);
        mTex_leaderboard = loadUI(BASEURL + 'assets/leaderboard.png', 0, -180, 0);
        mTex_Rolls = loadUI(BASEURL + 'assets/rolls.png', 0, -180, 0);
        mTex_selbar = loadUI(BASEURL + 'assets/serbar.png', 0, 0, 0);

        mTex_kevin = loadUI(BASEURL + 'assets/kevin.png', 0, 0, 0);
        mTex_karen = loadUI(BASEURL + 'assets/karen.png', 0, 0, 0);
        mTex_level = loadUI(BASEURL + 'assets/level.png', 0, 0, 0);


        for (var i = 0; i < 3; i++) {
            mTex_Heart.push(loadUIS(BASEURL + 'assets/heart.png', 32 + i * 64, 30, 1));
            mTex_EHeart.push(loadUIS(BASEURL + 'assets/heartempty.png', 32 + i * 64, 30, 1));
        }
        for (var i = 0; i < mTex_fonts.length; i++) {
            mTex_fonts[i] = createTexts('100', 200, '#000', ThreeUI.anchors.center, ThreeUI.anchors.center, 'center', 'HanaleiFill');
            mTex_fonts[i].visible = false;
        }
        Counter = 0;
        setScreen(GAMELOGO);
    });
    document.addEventListener('keydown', dealWithKeyboard);
    if (isMobile.any()) {
        document.addEventListener('touchstart', e => { touchEvent(e, 0); });
        document.addEventListener('touchend', e => { touchEvent(e, 2); });
        document.addEventListener('touchmove', e => { touchEvent(e, 1); });
    } else {
        document.addEventListener('mousedown', e => { touchEvent(e, 0); });
        document.addEventListener('mousemove', e => { touchEvent(e, 1); });
        document.addEventListener('mouseup', e => { touchEvent(e, 2); });
    }
    window.addEventListener('resize', onWindowResize, false);
    Draw();
}

function loadModel() {}
var mouse = new THREE.Vector2();
var coords = null;
var vec2 = new THREE.Vector2();
var isClick = false;

function touchEvent(e, type) {
    var scale = gameUI.height / gameUI.gameCanvas.getBoundingClientRect().height;
    // console.log(window.innerWidth + " ~~~ " + gameUI.gameCanvas.getBoundingClientRect().width);
    //if (type == 0) 
    {
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
        raycaster.setFromCamera(mouse, camera);
    }
    if (type == 0) {
        vec2.x = mouse.x;
        vec2.y = mouse.y;
        isClick = true;
    }
    if (type == 2) {

        isClick = false;


    }
    switch (GameScreen) {
        case GAMEMENU:
            handle_Menu(e, type);
            break;
        case GAMENAME:
            bounds = mTex_nexticn.getBounds();
            if (ThreeUI.isInBoundingBox(coords.x, coords.y, bounds.x, bounds.y, bounds.width, bounds.height)) {
                mSel = 1;
            }
            if (type == 2) {
                if (mSel == 1) {
                    mPly.name = input.value;
                    if (mPly.name == '') {
                        DrawLbl(mTex_fonts[0], "Please enter name", 0, 0, "#ff0000", 28);
                    } else {
                        //                        localStorage.setItem("name", mPly.name);
                        setStore();
                        setScreen(GAMEMENU);
                    }
                    console.log(name);
                }
                mSel = 0;
            }
            break;
        case GAMESTART:
            if (type == 2) {
                setScreen(GAMEPLAY);
            }
            break;
        case GAMEPLAY:
            mPly.handle(e, type);
            break;
        case GAMEOVER:
        case GAMEWIN:
        case GAMEPAUSE:
        case GAMELEADER:
            handle_WinOver(e, type);
            break;
    }

}
var sanim = 1;

function Draw() {
    requestAnimationFrame(Draw);
    renderer.render(scene, camera);
    gameUI.render(renderer);
    if (mTex_Play == null) {
        meshLoading.rotation.set(Counter * .01, Counter * .01, Counter * .01);
        return;
    }
    switch (GameScreen) {
        case GAMELOGO:
            if (Counter > 100) {
                getStore();
                if (mPly.name) {
                    setScreen(GAMEMENU);
                } else {
                    setScreen(GAMENAME);
                }
            }
            break;
        case GAMEMENU:
            DrawTransScal(mTex_Play, -138, 280, 240, 120, mSel == 1 ? 1.1 : 1, mSel == 1 ? 0.5 : 1);
            DrawTransScal(mTex_soundon, 138, 280, 240, 120, mSel == 2 ? 1.1 : 1, mSel == 2 ? 0.5 : 1);
            DrawTransScal(mTex_soundoff, 138, 280, 240, 120, mSel == 2 ? 1.1 : 1, mSel == 2 ? 0.5 : 1);
            mTex_soundon.visible = isSound;
            mTex_soundoff.visible = !isSound;


            break;
        case GAMENAME:
            // DrawTransScal(mTex_Play, 0, 100, 256, 64, mSel == 1 ? 1.1 : 1, mSel == 1 ? 0.5 : 1);
            DrawTransScal(mTex_nexticn, 0, 100, 128, 128, mSel == 1 ? 1.1 : 1, mSel == 1 ? 0.5 : 1);
            break;
        case GAMESTART:
            DrawTransScal(mTex_Swipe, 0, 100, 256, 64, mTex_Swipe.s, 1);
            if (mTex_Swipe.s > 1.1)
                mTex_Swipe.sx = .99;
            if (mTex_Swipe.s < 0.9)
                mTex_Swipe.sx = 1.01;
            mTex_Swipe.s *= mTex_Swipe.sx;
            for (let i = 0; i < mPlan_Police.length; i++) {
                if (mPlan_Police[i].position.y < -5) {
                    mPlan_Police[i].vy = .05;
                }
                if (mPlan_Police[i].position.y > 5) {
                    mPlan_Police[i].vy = -.05;
                }
                mPlan_Police[i].position.y += mPlan_Police[i].vy;

            }
            // for (var i = 0; i < 18; i++) {
            //     mPlan_Virus[i].position.set(-7, -5.7 + i * .5, 0);
            //     mPlan_Virus[i].visible = true;
            // }

            break;
        case GAMEPLAY:
            mPly.update();
            if (sanim > .1) {
                sanim -= .015;
            }
            for (var i = 0; i < anim.length && sanim > .1; i++) {
                anim[i].position.x += anim[i].vx;
                anim[i].position.y += anim[i].vy;
                anim[i].vy -= .01;
                anim[i].rotation.z += .1;
                anim[i].scale.set(sanim, sanim, sanim);
                if (sanim <= .14) {
                    anim[i].visible = false;
                    mTex_fonts[0].visible = false;
                }
            }


            break;
        case GAMEOVER:
            DrawTransScal(mTex_homeicn, -150, 200, 128, 128, mSel == 2 ? 1.1 : 1, mSel == 2 ? 0.5 : 1);
            DrawTransScal(mTex_leader, 0, 200, 128, 128, mSel == 3 ? 1.1 : 1, mSel == 3 ? 0.5 : 1);
            DrawTransScal(mTex_retryicn, 150, 200, 128, 128, mSel == 1 ? 1.1 : 1, mSel == 1 ? 0.5 : 1);
            break;
        case GAMEPAUSE:
            DrawTransScal(mTex_homeicn, -150, 200, 128, 128, mSel == 2 ? 1.1 : 1, mSel == 2 ? 0.5 : 1);
            DrawTransScal(mTex_leader, 0, 200, 128, 128, mSel == 3 ? 1.1 : 1, mSel == 3 ? 0.5 : 1);
            DrawTransScal(mTex_playicn, 150, 200, 128, 128, mSel == 1 ? 1.1 : 1, mSel == 1 ? 0.5 : 1);
            break
        case GAMEWIN:
            DrawTransScal(mTex_homeicn, -150, 200, 128, 128, mSel == 2 ? 1.1 : 1, mSel == 2 ? 0.5 : 1);
            DrawTransScal(mTex_leader, 0, 200, 128, 128, mSel == 3 ? 1.1 : 1, mSel == 3 ? 0.5 : 1);
            DrawTransScal(mTex_nexticn, 150, 200, 128, 128, mSel == 1 ? 1.1 : 1, mSel == 1 ? 0.5 : 1);
            break;
        case GAMELEADER:
            DrawTransScal(mTex_homeicn, 0, 300, 128, 128, mSel == 2 ? 1.1 : 1, mSel == 2 ? 0.5 : 1);
            break;

    }

    Counter++;
    if (isResize > 0) {
        isResize--;
        var frustumSize = 150;
        var aspect = window.innerWidth / window.innerHeight;
        camera.left = frustumSize * aspect / -2;
        camera.right = frustumSize * aspect / 2;
        camera.top = frustumSize / 2;
        camera.bottom = frustumSize / -2;
        camera.updateProjectionMatrix();
        gameUI.resize();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }
}



function handle_Menu(e, type) {
    mSel = 0;
    for (let i = 0; i < this.mPlan_Player.length; i++) {
        if (raycaster.intersectObject(mPlan_Player[i]).length > 0) {
            // meshLoading.position.set(i == 0 ? -2 : 2, -3, 0);
            mPly.no = i;
            DrawTexture(mTex_selbar, mPly.no == 0 ? -90 : 90, 145);
        }
    }
    bounds = mTex_Play.getBounds();
    if (ThreeUI.isInBoundingBox(coords.x, coords.y, bounds.x, bounds.y, bounds.width, bounds.height)) {
        mSel = 1;
    }

    bounds = isSound ? mTex_soundon.getBounds() : mTex_soundoff.getBounds();

    if (ThreeUI.isInBoundingBox(coords.x, coords.y, bounds.x, bounds.y, bounds.width, bounds.height)) {
        mSel = 2;
    }
    console.log(type + " mSel = " + mSel);

    if (type == 2) {
        if (mSel == 1) {
            setScreen(GAMESTART);
        }
        if (mSel == 2) {
            isSound = !isSound;
        }
        mSel = 0;
    }
}

function handle_WinOver(e, type) {
    mSel = 0;
    bounds = mTex_retryicn.getBounds();
    if (GameScreen == GAMEWIN) {
        bounds = mTex_nexticn.getBounds();
    }
    if (GameScreen == GAMEPAUSE) {
        bounds = mTex_playicn.getBounds();
    }
    if (ThreeUI.isInBoundingBox(coords.x, coords.y, bounds.x, bounds.y, bounds.width, bounds.height)) {
        mSel = 1;
    }
    bounds = mTex_homeicn.getBounds();
    if (ThreeUI.isInBoundingBox(coords.x, coords.y, bounds.x, bounds.y, bounds.width, bounds.height)) {
        mSel = 2;
    }
    bounds = mTex_leader.getBounds();
    if (ThreeUI.isInBoundingBox(coords.x, coords.y, bounds.x, bounds.y, bounds.width, bounds.height)) {
        mSel = 3;
    }

    console.log(type + " mSel = " + mSel);

    if (type == 2) {
        if (mSel == 1) {
            if (GameScreen == GAMEWIN) {
                mPly.lvl++;
                setStore();
            }
            setScreen(GAMESTART);
        }
        if (mSel == 2) {
            setScreen(GAMEMENU);
        }
        if (mSel == 3) {
            setScreen(GAMELEADER);
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
}

function setScreen(scr) {
    GameScreen = scr;
    // console.log("GameScreen = " + GameScreen);
    sanim = 0;
    // GameScreen = GAMEWIN;    
    // mTex_logo.visible = false;
    mTex_platinum.visible = mTex_silvermedal.visible = mTex_bronze.visible = mTex_goldmedal.visible = false;
    mTex_gameover.visible = mTex_gamepaus.visible = mTex_gamewin.visible = mTex_scorebox.visible = false;
    mTex_popup.visible = mTex_homeicn.visible = mTex_playicn.visible = mTex_retryicn.visible = false;
    mTex_nam_02.visible = mTex_nam_03.visible = mTex_nexticn.visible = mTex_leader.visible = false;
    mTex_soundon.visible = mTex_soundoff.visible = mTex_name.visible = mTex_score.visible = false;
    meshLoading.visible = mTex_Menu.visible = mPlan_Splash.visible = mTex_name.visible = false;
    mPlan_Home.visible = mTex_hand.visible = mTex_refress.visible = mTex_Swipe.visible = mTex_Play.visible = false;
    mTex_leaderboard.visible = mTex_Rolls.visible = mTex_selbar.visible = false;
    mTex_kevin.visible = mTex_karen.visible = mTex_level.visible = false;
    mTex_fonts.forEach(element => { element.visible = false; });
    mPlan_Road.forEach(element => { element.visible = false; });
    mPlan_Paper.forEach(element => { element.visible = false; });
    mPlan_Police.forEach(element => { element.visible = false; });
    mPlan_Virus.forEach(element => { element.visible = false; });
    mPlan_Player.forEach(element => { element.visible = false; });
    mTex_Heart.forEach(element => { element.visible = false; });
    mTex_EHeart.forEach(element => { element.visible = false; });
    anim.forEach(element => { element.visible = false; });

    mPly.group.visible = false;
    switch (GameScreen) {
        case GAMELOGO:
            // mTex_logo.visible = true;
            DrawTexture(mTex_name, 0, 0);
            break;
        case GAMENAME:
            input_div.style.display = "block";
            // DrawTransScal(mTex_Play, 0, 100, 256, 64, 1, 1);
            // DrawLbl(mTex_fonts[1], "GO", 0, 116, BUTTONCOL2, 48);
            break;
        case GAMEMENU:
            input_div.style.display = "none";
            DrawTexture(mTex_name, 0, -140);
            DrawTransScal(mTex_Play, 0, 200, 128, 128, 1, 1);
            mPlan_Road.forEach(element => { element.visible = true; });
            mPlan_Player[0].position.set(-2, -1.4, 0);
            mPlan_Player[1].position.set(2, -1.4, 0);
            mPlan_Player[0].visible = mPlan_Player[1].visible = false;
            mPlan_Player.forEach(element => { element.visible = true; });
            DrawTexture(mTex_selbar, mPly.no == 0 ? -90 : 90, 145);
            mPlan_Splash.visible = true;
            DrawTexture(mTex_kevin, -100, -30);
            DrawTexture(mTex_karen, 100, -30);
            showAds();
            break;
        case GAMESTART:
            mPlan_Road.forEach(element => { element.visible = true; });
            mPlan_Player[mPly.no].position.set(-10, 0, 0);
            mPlan_Player[mPly.no].visible = true;
            mTex_Swipe.visible = true;
            for (let i = 0; i < mPlan_Virus.length; i++) {
                mPlan_Virus[i].position.set(10 + i * 10, random(-5, 3), 0);
                mPlan_Virus[i].visible = true;
                if (i > 2)
                    mPlan_Virus[i].position.x = -100
            }
            for (let i = 0; i < mPlan_Paper.length; i++) {
                mPlan_Paper[i].position.set(5 + i * 10, random(-5, 3), 0);
                mPlan_Paper[i].visible = true;
                if (i > 2)
                    mPlan_Paper[i].position.x = -100
            }
            DrawTexture(mTex_level, -50, -330);
            DrawLblA(mTex_fonts[0], "" + mPly.lvl, 20, -318, BUTTONFONT, 40, ThreeUI.anchors.center, ThreeUI.anchors.center, "left");
            LoadAds();
            break;
        case GAMEPLAY:
            DrawTextureA(mTex_Rolls, 80, 25, ThreeUI.anchors.left, ThreeUI.anchors.top);
            mPlan_Road.forEach(element => { element.visible = true; });
            mPlan_Player[mPly.no].visible = true;
            mTex_Heart.forEach(element => { element.visible = true; });
            mTex_EHeart.forEach(element => { element.visible = true; });
            mPlan_Home.visible = true;
            mPly.set();
            DrawTexture(mTex_level, -50, -330);
            DrawLblA(mTex_fonts[0], "" + mPly.lvl, 20, -318, BUTTONFONT, 40, ThreeUI.anchors.center, ThreeUI.anchors.center, "left");
            break;
        case GAMEOVER:
        case GAMEPAUSE:
        case GAMEWIN:
            mPlan_Road.forEach(element => { element.visible = true; });
            mTex_popup.visible = true;
            mTex_gameover.visible = (GameScreen == GAMEOVER);
            mTex_gamepaus.visible = (GameScreen == GAMEPAUSE);
            mTex_gamewin.visible = (GameScreen == GAMEWIN);
            DrawTexture(mTex_score, 0, -84);
            DrawTexture(mTex_scorebox, 0, -10);
            DrawTexture(mTex_nam_02, 0, 80);
            DrawLbl(mTex_fonts[3], "" + mPly.roll, 0, 5, COLOR0, 48);

            // if(mPly.hroll > 100)
            mTex_platinum.visible = mPly.platinum == 1;
            mTex_silvermedal.visible = mPly.silver == 1;
            mTex_bronze.visible = mPly.bronze == 1;
            mTex_goldmedal.visible = mPly.gold == 1;
            //  DrawLbl(mTex_fonts[3], "LEVEL : " + mPly.lvl + "\n\nScore : " + mPly.roll, 0, -40, BUTTONCOL2, 48);

            if (mPly.hroll == 0) {
                mPly.hroll = mPly.roll;
            }
            if (GAMEWIN == GameScreen) {
                mPly.hroll += mPly.roll;
                writeScoreData(mPly.name, mPly.hroll);
            }
            setStore();
            readScore();
            showAds();
            break;
        case GAMELEADER:
            var str1 = "",
                str2 = "";
            mPlan_Road.forEach(element => { element.visible = true; });
            mTex_leaderboard.visible = true;
            scoreList.forEach(element => {
                str1 += " : " + element[0] + "\n";
                str2 += element[1] + "\n";
            });
            mTex_popup.visible = true;
            DrawLblA(mTex_fonts[2], str1, 50., -70, BUTTONFONT, 30, ThreeUI.anchors.center, ThreeUI.anchors.center, "left");
            DrawLblA(mTex_fonts[3], str2, 30, -70, BUTTONFONT, 30, ThreeUI.anchors.center, ThreeUI.anchors.center, "right");
            break;

    }
}

function getStore() {
    try {
        if (isAndroid == true) {
            mPly.hroll = app.getInt("score", 0);
            mPly.lvl = app.getInt("lvl", 1);
            mPly.bronze = app.getInt("bronze", 0);
            mPly.silver = app.getInt("silver", 0);
            mPly.gold = app.getInt("gold", 0);
            mPly.platinum = app.getInt("platinum", 0);
            mPly.name = app.getString("name", "");
        } else {
            if (typeof(Storage) !== "undefined") {
                mPly.name = localStorage.getItem("name");
                if (mPly.name) {
                    mPly.hroll = localStorage.getItem("score");
                    mPly.lvl = localStorage.getItem("lvl");
                    mPly.bronze = localStorage.getItem("bronze", 0);
                    mPly.silver = localStorage.getItem("silver");
                    mPly.gold = localStorage.getItem("gold");;
                    mPly.platinum = localStorage.getItem("platinum");
                    if (mPly.hroll == undefined) {
                        mPly.hroll = 0;
                    }
                    if (mPly.lvl == undefined) {
                        mPly.lvl = 1;
                    }
                    if (mPly.bronze == undefined) {
                        mPly.bronze = 0;
                    }
                    if (mPly.silver == undefined) {
                        mPly.silver = 0;
                    }
                    if (mPly.gold == undefined) {
                        mPly.gold = 0;
                    }
                    if (mPly.platinum == undefined) {
                        mPly.platinum = 0;
                    }
                } else {
                    mPly.hroll = 0;
                    mPly.lvl = 1;
                    mPly.platinum = mPly.silver = mPly.bronze = mPly.gold = 0;
                    setStore();
                }
                console.log(mPly.lvl + "  getStore  " + mPly.hroll + " ~~~~ " + mPly.bronze + " ~~ " + mPly.silver + " ~~ " + mPly.gold + " ~~ " + mPly.platinum);
            }
        }
    } catch (err) {
        console.log("~~~~~~~getStore JS~~~~~~" + err);
    }
}

function setStore() {
    console.log(mPly.lvl + "  setStore  " + mPly.hroll + " ~~~~ " + mPly.bronze + " ~~ " + mPly.silver + " ~~ " + mPly.gold + " ~~ " + mPly.platinum);
    try {
        if (isAndroid == true) {
            app.setInt("score", mPly.hroll);
            app.setInt("lvl", mPly.lvl);
            app.setInt("bronze", mPly.bronze);
            app.setInt("silver", mPly.silver);
            app.setInt("gold", mPly.gold);
            app.setInt("platinum", mPly.platinum);
            app.setString("name", mPly.name);
        } else {
            localStorage.setItem("score", mPly.hroll);
            localStorage.setItem("lvl", mPly.lvl);
            localStorage.setItem("bronze", mPly.bronze);
            localStorage.setItem("silver", mPly.silver);
            localStorage.setItem("gold", mPly.gold);
            localStorage.setItem("platinum", mPly.platinum);
        }
    } catch (err) {
        console.log("~~~~~~~setStore JS~~~~~~" + err);
    }
    console.log(mPly.lvl + "    " + mPly.hroll + " ~~~~ " + mPly.bronze + " ~~ " + mPly.silver + " ~~ " + mPly.gold + " ~~ " + mPly.platinum);
}

function showAds() {

    try {
        if (isAndroid == true)
            app.showAds();
        else {
            var message = { username: "Michael Phelps", secretToken: "secret" };
            var one = window.webkit.messageHandlers.userLogin.postMessage(message);
            console.log("userContentController~~~~~~~one~~~" + one)
        }
    } catch (err) {
        console.log("~~~~~~~showAds JS~~~~~~" + err);
    }
}

function LoadAds() {
    console.log("~~~~~~~LoadAds JS~~~~~~");
    try {
        if (isAndroid == true)
            app.LoadAds();
    } catch (err) {
        console.log("~~~~~~~LoadAds JS~~~~~~" + err);
    }
}

function setnaim(str) {
    for (var i = 0; i < anim.length; i++) {
        anim[i].position.set(0, 0, .1);
        anim[i].vx = Math.random() - .51;
        anim[i].vy = Math.random() - .51;
        anim[i].visible = true;
    }
    DrawLbl(mTex_fonts[0], str, 0, 0, COLOR1, 48);
    sanim = 1;
}