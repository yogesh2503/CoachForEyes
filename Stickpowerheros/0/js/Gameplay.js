var Counter = 0,
    meshLoading, isResize = 0,
    mTex_logo = null,
    objCount = 0,
    mHScore = 0,
    mScore = 0,
    setVal = true,
    isResize = 0,
    mTCoin = 1,
    mGScore = 0;
var scene, camera, clock, renderer, gameUI, planBase = Array(5),
    red = Array(5),
    rod = Array(5),
    mPlayer, mp_BG = Array(3),
    mTex_BG = Array(6);
var planDimond = Array(5);
var uiHeart = Array(3),
    uiEmpty = Array(3);
var uiName, uiHelp, uiPlay, uiSnd = Array(2),
    uiScorebox, mTex_fonts = Array(10),
    uiletsgo, txtPlayer = Array(6);
var uiButton, btext, uiExit;
var audioLoader, listener, mp3_bg, mp3_click, mp3_swing, mp3_perfect, mp3_newbrick, mp3_coincollect, mp3_line_fall, mp3_linedraw, mp3_chafall2;
var div_Code, div_register;
var lndScp;

function init() {
    parseURLParams();
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.set(0, 0, 100);
    camera.rotation.set(0, 0, 0);
    scene.background = new THREE.Color(0x000000);
    clock = new THREE.Clock();
    var manager = new THREE.LoadingManager(loadModel);
    manager.onProgress = function(item, loaded, total) {};

    function onProgress(xhr) {
        if (xhr.lengthComputable) {
            var percentComplete = (xhr.loaded / xhr.total) * 3 * objCount;
            objCount++;
            // console.log("percentComplete = "+objCount);
            DrawLblA(mTex_load, "Loading : " + Math.floor(objCount) + "%", 0, 100, "#FFFFFF", 55, ThreeUI.anchors.center, ThreeUI.anchors.center, "center");
            FBInstant.setLoadingProgress(percentComplete);
        }
    }

    function onError() {}
    var material = new THREE.MeshNormalMaterial();
    var geometry = new THREE.BoxBufferGeometry(1.0, 1.0, 1.0);
    meshLoading = new THREE.Mesh(geometry, material);
    meshLoading.scale.set(2, 2, 2);
    meshLoading.position.set(2, 6, -18);
    scene.add(meshLoading);

    var ambientLight = new THREE.AmbientLight(0xffffff, 0.99);
    scene.add(ambientLight);
    directionalLight = new THREE.DirectionalLight(0xffffff, 0.1);
    directionalLight.position.set(3, -2, 2);
    scene.add(directionalLight);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    // var ele = document.getElementById("httgame");
    // ele.appendChild(renderer.domElement);
    document.body.appendChild(renderer.domElement);
    var textureLoader = new THREE.TextureLoader(manager);
    gameUI = new ThreeUI(renderer.domElement, 720);
    mTex_load = createTexts('10000000', 20, '#fff', ThreeUI.anchors.center, ThreeUI.anchors.center, 'center', 'HanaleiFill');
    mTex_load.visible = false;



    div_Code = addInputBox(couponids);
    div_register = addregistertion();

    imond = textureLoader.load('assets/diamond.png');
    for (var i = 0; i < txtPlayer.length; i++) {
        txtPlayer[i] = textureLoader.load('assets/obj/p' + i + '.png');
    }
    for (var i = 0; i < mTex_BG.length; i++) {
        mTex_BG[i] = textureLoader.load('assets/bg' + i + '.jpg');
    }
    var material = new THREE.MeshStandardMaterial({ color: 0x000000 });
    var matRed = new THREE.MeshStandardMaterial({ color: 0xFF0000 });
    for (var i = 0; i < planBase.length; i++) {
        planBase[i] = new THREE.Mesh(new THREE.PlaneBufferGeometry(1, 20, 4, 4), material);
        red[i] = new THREE.Mesh(new THREE.PlaneBufferGeometry(1, 1, 4, 4), matRed);
        scene.add(red[i]);
        scene.add(planBase[i]);
        planBase[i].visible = false;
    }

    for (var i = 0; i < rod.length; i++) {
        rod[i] = new Player();
        rod[i].plan = new THREE.Mesh(new THREE.PlaneBufferGeometry(1, 1, 4, 4), material);
        rod[i].pivot = new THREE.Object3D();
        rod[i].pivot.add(rod[i].plan);
        scene.add(rod[i].pivot);
        rod[i].pivot.position.x = -50;
        rod[i].pivot.visible = false;
    }
    var material = new THREE.MeshBasicMaterial({ map: txtPlayer[0] });
    material.transparent = true;
    mPlayer = new THREE.Mesh(new THREE.PlaneBufferGeometry(4, 4, 4, 4), material);
    scene.add(mPlayer);

    var material = new THREE.MeshBasicMaterial({ map: imond });
    material.transparent = true;
    for (var i = 0; i < planDimond.length; i++) {
        if (i == 0)
            planDimond[i] = new THREE.Mesh(new THREE.PlaneBufferGeometry(4, 4, 4, 4), material);
        else
            planDimond[i] = planDimond[0].clone();
        scene.add(planDimond[i]);
        planDimond[i].visible = false;
    }


    var material = new THREE.MeshBasicMaterial({ map: mTex_BG[0] });
    for (var i = 0; i < mp_BG.length; i++) {
        mp_BG[i] = new THREE.Mesh(new THREE.PlaneBufferGeometry(512, 427, 4, 4), material);
        scene.add(mp_BG[i]);
        mp_BG[i].position.set(-510 + i * 512, 0, -415);
    }


    listener = new THREE.AudioListener();
    audioLoader = new THREE.AudioLoader();
    camera.add(listener);

    mp3_bg = new THREE.Audio(listener);
    mp3_click = new THREE.Audio(listener);
    mp3_swing = new THREE.Audio(listener);
    mp3_perfect = new THREE.Audio(listener);
    mp3_newbrick = new THREE.Audio(listener);
    mp3_coincollect = new THREE.Audio(listener);
    mp3_line_fall = new THREE.Audio(listener);
    mp3_linedraw = new THREE.Audio(listener);
    mp3_chafall2 = new THREE.Audio(listener);

    audioLoader.load('assets/sound/line_fall.mp3', function(buffer) {
        mp3_line_fall.setBuffer(buffer);
        mp3_line_fall.setVolume(1.0);
    });
    audioLoader.load('assets/sound/linedraw.mp3', function(buffer) {
        mp3_linedraw.setBuffer(buffer);
        mp3_linedraw.setVolume(1.0);
    });
    audioLoader.load('assets/sound/chafall1.mp3', function(buffer) {
        mp3_chafall2.setBuffer(buffer);
        mp3_chafall2.setVolume(1.0);
    });
    audioLoader.load('assets/sound/bg.mp3', function(buffer) {
        mp3_bg.setBuffer(buffer);
        mp3_bg.setVolume(1.0);
        mp3_bg.setLoop(true);
    });
    audioLoader.load('assets/sound/swing.mp3', function(buffer) {
        mp3_swing.setBuffer(buffer);
        mp3_swing.setVolume(1.0);
    });
    audioLoader.load('assets/sound/click.mp3', function(buffer) {
        mp3_click.setBuffer(buffer);
        mp3_click.setVolume(1.0);
    });
    audioLoader.load('assets/sound/perfect.mp3', function(buffer) {
        mp3_perfect.setBuffer(buffer);
        mp3_perfect.setVolume(1.0);
    });
    audioLoader.load('assets/sound/newbrick.mp3', function(buffer) {
        mp3_newbrick.setBuffer(buffer);
        mp3_newbrick.setVolume(1.0);
    });
    audioLoader.load('assets/sound/coincollect.mp3', function(buffer) {
        mp3_coincollect.setBuffer(buffer);
        mp3_coincollect.setVolume(1.0);

    });


    AssetLoader.add.webFont('HanaleiFill', 'js/font.css');
    AssetLoader.add.image('assets/logo.png');

    AssetLoader.add.image('assets/scorebox.png');
    AssetLoader.add.image('assets/name.png');
    AssetLoader.add.image('assets/help_btn.png');
    AssetLoader.add.image('assets/play_btn.png');
    AssetLoader.add.image('assets/sound_off.png');
    AssetLoader.add.image('assets/sound.png');

    AssetLoader.add.image('assets/home_btn.png');
    AssetLoader.add.image('assets/lether.png');
    AssetLoader.add.image('assets/retray.png');
    AssetLoader.add.image('assets/letsgo.png');
    AssetLoader.add.image('assets/button.png');


    AssetLoader.add.image('assets/heart.png');
    AssetLoader.add.image('assets/heartempty.png');

    AssetLoader.progressListener = function(progress) {
        DrawLblA(mTex_load, "Loading : " + Math.floor(50 + progress * 50) + "%", 0, 100, "#FFFFFF", 55, ThreeUI.anchors.center, ThreeUI.anchors.center, "center");
    };
    AssetLoader.load(function() {
        mTex_logo = loadUIRect();
        httlogo = loadUI('assets/logo.png', 0, 0, 0);
        httlogo.parent = mTex_logo;
        httlogo.visible = true;
        mTex_logo.visible = true;
        uiScorebox = loadUIS('assets/scorebox.png', 0, 0, 1.4, 0);
        uiName = loadUI('assets/name.png', 0, 0, 0);
        uiHelp = loadUI('assets/help_btn.png', 0, 0, 2);
        uiPlay = loadUI('assets/play_btn.png', 0, 0, 1);
        uiSnd[0] = loadUI('assets/sound_off.png', 0, 0, 6);
        uiSnd[1] = loadUI('assets/sound.png', 0, 0, 6);
        uiHome = loadUI('assets/home_btn.png', 0, 0, 3);
        uiLeader = loadUI('assets/lether.png', 0, 0, 4);
        uiRetry = loadUI('assets/retray.png', 0, 0, 5);
        uiletsgo = loadUI('assets/letsgo.png', 0, 0, 1);
        uiButton = loadUIS('assets/button.png', 0, 0, .9, 7);
        uiExit = loadUIS('assets/button.png', 0, 0, .9, 8);
        for (var i = 0; i < uiHeart.length; i++) {
            uiHeart[i] = loadUIS('assets/heart.png', 0, 0, .6, 0);
            uiEmpty[i] = loadUIS('assets/heartempty.png', 0, 0, .6, 0);
            DrawTextureA(uiHeart[i], -38 + i * 39, 20, ThreeUI.anchors.center, ThreeUI.anchors.top);
            DrawTextureA(uiEmpty[i], -38 + i * 39, 20, ThreeUI.anchors.center, ThreeUI.anchors.top);
            uiHeart[i].visible = uiEmpty[i].visible = false;
        }
        btext = createTexts('1000', 0, '#fff', ThreeUI.anchors.center, ThreeUI.anchors.center, 'center', 'HanaleiFill');
        DrawLbl(btext, "Submit", 0, 10, '#0a0a0a', 35);
        btext.visible = true;
        btext.parent = uiButton;
        for (var i = 0; i < mTex_fonts.length; i++) {
            mTex_fonts[i] = createTexts('100', 20, '#fff', ThreeUI.anchors.center, ThreeUI.anchors.center, 'center', 'HanaleiFill');
        }
        mTex_LandScape = loadUIRect();
        lndScp = createTexts('100', 50, '#fff', ThreeUI.anchors.center, ThreeUI.anchors.center, 'center', "HanaleiFill");
        lndScp.parent = mTex_LandScape;
        DrawLbl(lndScp, "Have to play in\n\nLandscape Mode", 0, -50, '#fafafa', 25);
        mTex_LandScape.visible = window.innerWidth < window.innerHeight;
        mTex_load.visible = false;
        console.log("gameuser.UserSessionID = " + gameuser.UserSessionID);
        if (!gameuser.UserSessionID) {
            DrawLbl(lndScp, "You do not have UserSessionID please enter and play", 0, -50, '#fafafa', 25);
            mTex_LandScape.visible = true;
            window.location.href = "./index1.html";
            console.log("reset");
        }


    });
    document.addEventListener('keydown', dealWithKeyboard);
    document.addEventListener('keyup', upWithKeyboard);
    if (isMobile.any()) {
        document.addEventListener('touchstart', e => { touchEvent(e, 0); });
        // document.addEventListener('touchmove', e =>{touchEvent(e,1);});
        document.addEventListener('touchend', e => { touchEvent(e, 2); });
    } else {
        document.addEventListener('mousedown', e => { touchEvent(e, 0); });
        // document.addEventListener('mousemove',    e =>{touchEvent(e,1);});
        document.addEventListener('mouseup', e => { touchEvent(e, 2); });
    }
    window.addEventListener('resize', onWindowResize, false);
    Draw();
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    this.gameUI.resize();
    if (mTex_LandScape)
        mTex_LandScape.visible = window.innerWidth < window.innerHeight;
    isResize = 5;
}
var istap = false;
var mouse = new THREE.Vector2();
var mousedown = new THREE.Vector2();

function touchEvent(e, type) {
    if (GameScreen == GAMEPLAY) {
        console.log("type " + type);
        if (type == 0) {
            tap(1);
        }
        if (type == 2) {
            tap(2);
        }
    }
}

function Draw() {
    delta = clock.getDelta();
    requestAnimationFrame(Draw);
    renderer.render(scene, camera);
    gameUI.render(renderer);
    if (mTex_logo == null) {
        meshLoading.visible = true;
        meshLoading.rotation.set(mScore * .03, mScore * .06, mScore * .09);
        mScore++;
        return;
    }
    switch (GameScreen) {
        case GAMELOGO:
            mTex_logo.visible = true;
            meshLoading.visible = false;
            if (Counter == 50) {
                mTex_logo.visible = false;
                mTex_logo.alpha = .9;
                httlogo.visible = false;
                setScreen(GAMEMENU);
            }
            break;
        case GAMEHELP:
            DrawHelp();
            break;
        case GAMEPLAY:
            DrawGamePlay();
            break;
        case GAMEOVER:
            break;

    }
    Counter++;
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
    GameScreen = scr;

    mTex_logo.visible = uiSnd[1].visible = uiScorebox.visible = false;
    uiName.visible = uiHelp.visible = uiPlay.visible = uiSnd[0].visible = false;
    uiHome.visible = uiLeader.visible = uiRetry.visible = false;
    uiButton.visible = uiExit.visible = uiletsgo.visible = false;
    uiHeart.forEach(element => { element.visible = false; });
    uiEmpty.forEach(element => { element.visible = false; });

    for (var i = 0; i < planBase.length; i++) {
        planBase[i].visible = false;
        red[i].visible = false;
    }
    for (var i = 0; i < rod.length; i++) {
        rod[i].pivot.visible = false;
    }
    for (var i = 0; i < mTex_fonts.length; i++) {
        mTex_fonts[i].visible = false;
    }
    for (var i = 0; i < planDimond.length; i++) {
        planDimond[i].visible = false;
    }
    div_register.style.display = div_Code.style.display = "none";
    switch (GameScreen) {
        case GAMEEXT:
            DrawLblA(mTex_fonts[1], "Enter new coupon to continue", 0, 100, "#fafafa", 45, ThreeUI.anchors.center, ThreeUI.anchors.top, "center");
            DrawLblA(mTex_fonts[0], "Enter new coupon to continue", 4, 104, "#0a0a0a", 45, ThreeUI.anchors.center, ThreeUI.anchors.top, "center");

            DrawTextureS(uiButton, 0, 180, 256, 64);
            div_Code.style.display = "block";
            btext.text = 'Submit';

            DrawTexture(uiExit, 0, 280);
            DrawLblA(mTex_fonts[8], "Exit", 0, 292, "#111111", 35, ThreeUI.anchors.center, ThreeUI.anchors.center, "center");

            break;
        case GAMECODE:
            DrawLblA(mTex_fonts[1], "WELCOME", 0, 100, "#fafafa", 65, ThreeUI.anchors.center, ThreeUI.anchors.top, "center");
            DrawLblA(mTex_fonts[0], "WELCOME", 4, 104, "#0a0a0a", 65, ThreeUI.anchors.center, ThreeUI.anchors.top, "center");

            DrawTextureA(uiButton, 0, 45, ThreeUI.anchors.center, ThreeUI.anchors.center);
            div_Code.style.display = "block";
            btext.text = 'Submit';
            break;
        case GAMEREG:
            DrawLblA(mTex_fonts[1], "Registration", 0, 100, "#fafafa", 65, ThreeUI.anchors.center, ThreeUI.anchors.top, "center");
            DrawLblA(mTex_fonts[0], "Registration", 4, 104, "#0a0a0a", 65, ThreeUI.anchors.center, ThreeUI.anchors.top, "center");
            DrawTextureA(uiButton, 0, 245, ThreeUI.anchors.center, ThreeUI.anchors.center);
            btext.text = 'Submit';
            div_register.style.display = "block";
            break;
        case GAMEPLAY:
            if (setVal) {
                mp3_bg.play();
            }
            mPlayer.life = 3;
            uiHeart.forEach(element => { element.visible = true; });
            uiEmpty.forEach(element => { element.visible = true; });
            GameReset();
            break;
        case GAMEHELP:
            GameReset();
            uiletsgo.visible = true;
            helpReset();
            break;
        case GAMEMENU:
            DrawTextureA(uiName, 0, 160, ThreeUI.anchors.center, ThreeUI.anchors.top);
            DrawTextureA(uiPlay, 0, 60, ThreeUI.anchors.center, ThreeUI.anchors.center);
            DrawTextureA(uiHelp, -100, 200, ThreeUI.anchors.center, ThreeUI.anchors.center);
            DrawTextureA(uiSnd[0], 100, 200, ThreeUI.anchors.center, ThreeUI.anchors.center);
            DrawTextureA(uiSnd[1], 100, 200, ThreeUI.anchors.center, ThreeUI.anchors.center);
            for (var i = 0; i < mp_BG.length; i++) {
                mp_BG[i].position.set(-510 + i * 512, 0, -415);
            }
            mPlayer.position.set(0, -23, 0);
            uiSnd[0].visible = !setVal;
            uiSnd[1].visible = setVal;
            break;
        case GAMEOVER:
            if (mp3_bg.isPlaying) {
                mp3_bg.stop();
            }
            DrawLblA(mTex_fonts[0], "GAMEOVER", 0, 84, "#fafafa", 65, ThreeUI.anchors.center, ThreeUI.anchors.top, "center");
            DrawTextureA(uiScorebox, 0, -110, ThreeUI.anchors.center, ThreeUI.anchors.center);
            // DrawTextureA(uiHome, -120, 140, ThreeUI.anchors.center, ThreeUI.anchors.center);
            // DrawTextureA(uiLeader, 0, 140, ThreeUI.anchors.center, ThreeUI.anchors.center);
            // DrawTextureA(uiRetry, 120, 140, ThreeUI.anchors.center, ThreeUI.anchors.center);
            for (var i = 0; i < mp_BG.length; i++) {
                mp_BG[i].position.set(-510 + i * 512, 0, -415);
            }
            DrawLblA(mTex_fonts[1], "Score : " + mScore, 0, -160, "#fafafa", 35, ThreeUI.anchors.center, ThreeUI.anchors.center, "center");
            // DrawLblA(mTex_fonts[2], "Game Best  : ", 0, -100, "#fafafa", 35, ThreeUI.anchors.center, ThreeUI.anchors.center, "center");
            DrawLblA(mTex_fonts[3], "Gain Score : " + mGScore, 0, -40, "#FFD700", 35, ThreeUI.anchors.center, ThreeUI.anchors.center, "center");
            DrawLblA(mTex_fonts[4], "Total  : " + mTotalDimond, 15, 40, "#FFD700", 35, ThreeUI.anchors.right, ThreeUI.anchors.top, "right");

            DrawLblA(mTex_fonts[5], gameuser.PinCode + " keep it\nYou will be notified if you won", 2, 72, "#0F0A0A", 45, ThreeUI.anchors.center, ThreeUI.anchors.center, "center");
            DrawLblA(mTex_fonts[6], gameuser.PinCode + " keep it\nYou will be notified if you won", 0, 70, "#FFFAFA", 45, ThreeUI.anchors.center, ThreeUI.anchors.center, "center");

            DrawTextureS(uiButton, 0, 180, 400, 100);
            btext.text = '';
            DrawLblA(mTex_fonts[7], "Enter new coupon\nto continue", 0, 172, "#111111", 35, ThreeUI.anchors.center, ThreeUI.anchors.center, "center");

            DrawTexture(uiExit, 0, 280);
            DrawLblA(mTex_fonts[8], "Exit", 0, 292, "#111111", 35, ThreeUI.anchors.center, ThreeUI.anchors.center, "center");

            break;
        case GAMELEADER:
            for (var i = 0; i < mp_BG.length; i++) {
                //mp_BG[i].position.set(-sx+i*sx,0,-415);
                mp_BG[i].position.set(-510 + i * 512, 0, -415);
            }
            // mTex_logo.visible = true;
            var aname = "";
            var ascore = "";
            if (allScore != null) {
                for (var i = 0; i < allScore.length && i < 10; i++) {
                    aname = aname + "\n" + (i < 9 ? "0" : "") + allScore[i].getRank() + ") " + allScore[i].getPlayer().getName();
                    ascore = ascore + "\n" + allScore[i].getScore();
                }
            } else {
                for (var i = 0; i < 10; i++) {

                    aname = aname + "\n" + (i < 9 ? "0" : "") + (i + 1) + ": " + name;
                    ascore = ascore + "\n" + mHScore;
                }
            }
            DrawLblA(mTex_fonts[3], name + ": " + mHScore, 0, 140, "#222222", 55, ThreeUI.anchors.center, ThreeUI.anchors.top, "center");
            DrawLblA(mTex_fonts[2], name + ": " + mHScore, 2, 142, "#ffffff", 55, ThreeUI.anchors.center, ThreeUI.anchors.top, "center");

            DrawLblA(mTex_fonts[0], "" + aname, -250, -194, '#0a0a0a', 35, ThreeUI.anchors.center, ThreeUI.anchors.center, "left");
            DrawLblA(mTex_fonts[1], "" + ascore, 182, -194, '#0a0a0a', 35, ThreeUI.anchors.center, ThreeUI.anchors.center, "left");
            DrawLblA(mTex_fonts[4], "" + aname, -252, -196, '#fafafa', 35, ThreeUI.anchors.center, ThreeUI.anchors.center, "left");
            DrawLblA(mTex_fonts[5], "" + ascore, 180, -196, '#fafafa', 35, ThreeUI.anchors.center, ThreeUI.anchors.center, "left");

            DrawTextureA(uiHome, 200, 270, ThreeUI.anchors.center, ThreeUI.anchors.center);
            DrawTextureA(uiRetry, -200, 270, ThreeUI.anchors.center, ThreeUI.anchors.center);
            break;
    }
}

function Handle_Menu(sel) {
    switch (sel) {
        case 1: //play
            setScreen(GAMEPLAY);
            break;
        case 2: //Help
            setScreen(GAMEHELP);
            break;
        case 3: //Home
            setScreen(GAMEMENU);
            break;
        case 4:
            setScreen(GAMELEADER);
            break;
        case 5:
            setScreen(GAMEPLAY);
            break;
        case 6:
            setVal = !setVal;
            uiSnd[0].visible = !setVal;
            uiSnd[1].visible = setVal;
            break;
        case 7: //Submitting
            switch (GameScreen) {
                case GAMECODE:
                    setScreen(GAMEREG);
                    break;
                case GAMEOVER:
                    setScreen(GAMEEXT);
                    break;
                case GAMEEXT:
                    var httincode = document.getElementById('httincode');
                    console.log(httincode.value.length + ' httincode.value = ' + httincode.value);
                    if (httincode.value.length > 0) {
                        validateagain(httincode.value);
                    } else {
                        alert("Please Enter code");
                    }

                    break;
                default:
                    setScreen(GAMEPLAY);
                    break;
            }
            break;
        case 8:
            alert("Clicked Exit");
            break;
        case 99:

            break;


    }
    if (setVal) {
        mp3_click.play();
    }
}



function loadModel() {}