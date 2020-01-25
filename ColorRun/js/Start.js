var camera, scene, renderer, gameUI, meshLoading, Counter = 0, isResize = 0;
var mTex_logo = null, mTex_LandScape, cCount = 0, mSel = 0;
var CANVAS_WIDTH = 480, CANVAS_HEIGHT = 854, P_CONST = .5621, delta = 0;//.56205
var mTex_fonts = [], mTex_But = [], mTex_Heart = [], mTex_EHeart = [], topPlan, mTex_LooseLife;
var mColorRun, dropTex, cupTex, timeoutHandle, mPlan_Drop = [];
var butArry = [], scoreStrip = [], mTex_Name;
function setDesktop() {
    CANVAS_HEIGHT = window.innerHeight;
    CANVAS_WIDTH = Math.floor(CANVAS_HEIGHT * P_CONST);
    camera = new THREE.PerspectiveCamera(45, CANVAS_WIDTH / CANVAS_HEIGHT, 0.01, 1500);
    scene = new THREE.Scene();
    renderer = new THREE.WebGLRenderer({ antialias: false });
    renderer.setSize(CANVAS_WIDTH, CANVAS_HEIGHT);
    document.body.appendChild(renderer.domElement);
    var style = 'width: ' + CANVAS_WIDTH + 'px; height: ' + CANVAS_HEIGHT + 'px; position: relative;'
    container = document.getElementById('myContent');
    container.setAttribute('style', style);
    container.appendChild(renderer.domElement);
}
function forMobile() {
    CANVAS_HEIGHT = window.innerHeight;
    CANVAS_WIDTH = window.innerWidth;
    camera = new THREE.PerspectiveCamera(45, CANVAS_WIDTH / CANVAS_HEIGHT, 0.01, 1500);
    scene = new THREE.Scene();
    renderer = new THREE.WebGLRenderer({ antialias: false });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
}
function init() {
    if (isMobile.any()) { forMobile(); } else { setDesktop(); }
    MAXMOVE = (CANVAS_WIDTH / CANVAS_HEIGHT) * .87;
    camera.rotation.set(0, 0, 0);
    camera.position.set(0, 0, 125);
    scene.background = new THREE.Color(0xf6f6f6);
    renderer.setClearColor(0xaaaaaa, 1);
    gameUI = new ThreeUI(renderer.domElement, 720);

    var material = new THREE.MeshNormalMaterial();
    var geometry = new THREE.BoxBufferGeometry(2.0, 2.0, 2.0);
    meshLoading = new THREE.Mesh(geometry, material);
    meshLoading.position.set(0, 50, -100);
    scene.add(meshLoading);

    var manager = new THREE.LoadingManager(loadModel);
    manager.onProgress = function (item, loaded, total) {/*console.log( item, loaded, total );*/ };
    function onProgress(xhr) { if (xhr.lengthComputable) { var percentComplete = (xhr.loaded / xhr.total) * 8 * objCount; objCount++; } }
    function onError() { }
    var textureLoader = new THREE.TextureLoader(manager);
    dropTex = textureLoader.load("assets/drop.png");
    cupTex = textureLoader.load("assets/cup.png");

    for (let i = 0; i < 8; i++) {
        mPlan_Drop.push(createPlanMesh());
        mPlan_Drop[i].visible = true;
        mPlan_Drop[i].scale.set(6, 6, 6);
        mPlan_Drop[i].material.color = new THREE.Color('rgb(255,255,255)')//createColor(0);
        scene.add(mPlan_Drop[i]);
    }


    mColorRun = new ColorRun();

    AssetLoader.add.webFont('HanaleiFill', 'js/font.css');
    // AssetLoader.add.image('assets/logo.png');
    AssetLoader.add.image('assets/but.png');
    AssetLoader.add.image('assets/heart.png');
    AssetLoader.add.image('assets/heartempty.png');
    AssetLoader.add.image('assets/strip.png');
    AssetLoader.add.image('assets/name.png');

    AssetLoader.progressListener = function (progress) {
        console.info('Progress: ' + (progress * 100) + '%');
    };
    AssetLoader.load(function () {
        console.log("AssetLoader~~~~~~~~" + gameUI);
        mTex_logo = loadUIRect();
        // httlogo = loadUI('assets/logo.png', 0, 0, 0);
        // httlogo.parent = mTex_logo;
        // httlogo.visible = true;
        mTex_logo.visible = false;
        mTex_arrow = Array(2);
        mTex_sound = Array(2);
        mTex_But.push(loadUI('assets/but.png', 0, -12, 0));
        mTex_But.push(loadUI('assets/but.png', 0, -12, 0));
        for (let i = 0; i < 3; i++) {
            mTex_Heart.push(loadUIS('assets/heart.png', 15 + i * 30, 16));
            mTex_EHeart.push(loadUIS('assets/heartempty.png', 15 + i * 30, 16));
        }
        mTex_LooseLife = loadUI('assets/heart.png', 0, -100);
        mTex_Name = loadUI('assets/name.png', 0, -100);

        for (var i = 0; i < 3; i++) {
            butArry.push(loadUIScal('assets/but.png', 120 - i * 120, 206, .4, .6));
            if (i == 1)
                butArry[i].width *= 1.2;
        }
        var noofStrip = (1 + ENDSET - STARTSET) * 2 + 1;
        console.log("noofStrip " + noofStrip);
        for (var i = 0; i < noofStrip; i++) {
            scoreStrip.push(loadUIScal('assets/strip.png', 0, -100 + i * 32, 2, 2));
        }

        for (var i = 0; i < noofStrip + 7; i++) {
            mTex_fonts[i] = createTexts('100', 20, '#fff', ThreeUI.anchors.center, ThreeUI.anchors.center, 'center', 'HanaleiFill');
        }


        mTex_LandScape = loadUIRect();
        lndScp = createTexts('Have to play in \n potrait Mode', 50, '#fff', ThreeUI.anchors.center, ThreeUI.anchors.center, 'center', 'HanaleiFill');
        lndScp.parent = mTex_LandScape;
        lndScp.visible = true;
        if (isMobile.any()) {
            mTex_LandScape.visible = window.innerWidth > window.innerHeight;
        } else {
            mTex_LandScape.visible = false;
        }
        counter = 0;
    });
    document.addEventListener('keydown', dealWithKeyboard);
    if (isMobile.any()) {
        document.addEventListener('touchstart', e => { touchEvent(e, 0); });
        document.addEventListener('touchend', e => { touchEvent(e, 2); });
    } else {
        document.addEventListener('mousedown', e => { touchEvent(e, 0); });
        document.addEventListener('mouseup', e => { touchEvent(e, 2); });
    }
    window.addEventListener('resize', onWindowResize, false);
    Draw();
}
function onWindowResize() {
    CANVAS_HEIGHT = window.innerHeight;
    CANVAS_WIDTH = window.innerWidth;
    if (!isMobile.any()) {
        CANVAS_WIDTH = Math.floor(CANVAS_HEIGHT * P_CONST);
        var style = 'width: ' + CANVAS_WIDTH + 'px; height: ' + CANVAS_HEIGHT + 'px; position: relative;'
        container = document.getElementById('myContent');
        container.setAttribute('style', style);
    }
    camera.aspect = CANVAS_WIDTH / CANVAS_HEIGHT;
    camera.updateProjectionMatrix();
    renderer.setSize(CANVAS_WIDTH, CANVAS_HEIGHT);
    this.gameUI.resize();
    mTex_LandScape.visible = CANVAS_WIDTH < CANVAS_HEIGHT;
    isResize = 5;
    MAXMOVE = (CANVAS_WIDTH / CANVAS_HEIGHT) * .87;
}
function Draw() {
    requestAnimationFrame(Draw);
    gameUI.render(renderer);
    renderer.render(scene, camera);
    if (mTex_logo == null) {
        meshLoading.position.set(0, 100, 40);
        return;
    }
    switch (GameScreen) {
        case GAMELOGO:
            mTex_logo.visible = true;
            meshLoading.visible = false;
            if (Counter > 6) {
                setScreen(GAMEMENU);
            }
            break;
        case COLORRUN:
            mColorRun.draw();
            break;
        case GAMEOVER:
        case GAMELEVEL:
            for (var i = 0; i < 3; i++) {
                //butArry.push(loadUIScal('assets/but.png', 120 - i * 120, 206, .4, .6));
                if (i == 1) {
                    DrawTransScal(butArry[i], 120 - i * 120, 206, 128, 34, mSel == 1 + i ? 1.1 : 1, mSel == 1 + i ? 0.5 : 1);
                } else {
                    DrawTransScal(butArry[i], 120 - i * 120, 206, 90, 34, mSel == 1 + i ? 1.1 : 1, mSel == 1 + i ? 0.5 : 1);
                }
            }
            break;
        case GAMEMENU:
            DrawTransScal(mTex_But[0], 0, 230, 100, 54, mSel == 1 ? 1.1 : 1, mSel == 1 ? 0.5 : 1);
            DrawLbl(mTex_fonts[0], "Play", 0, 239, BUTTONFONT, 35);
            // DrawTransScal(mTex_But[1], 0, 40, 256, 54, mSel == 2 ? 1.1 : 1, mSel == 2 ? 0.5 : 1);
            // DrawLbl(mTex_fonts[1], "Memory Game", 0, 50, BUTTONFONT, 35);
            break;
    }
    Counter++;
    if (isResize > 0) {
        camera.aspect = CANVAS_WIDTH / CANVAS_HEIGHT;
        camera.updateProjectionMatrix();
        renderer.setSize(CANVAS_WIDTH, CANVAS_HEIGHT);
        this.gameUI.resize();
        mTex_LandScape.visible = CANVAS_WIDTH > CANVAS_HEIGHT;
        isResize--;
    }
}
var mouse = new THREE.Vector2();
var coords = null;
function touchEvent(e, type) {
    var scale = gameUI.height / gameUI.gameCanvas.getBoundingClientRect().height;
    // console.log(window.innerWidth + " ~~~ " + gameUI.gameCanvas.getBoundingClientRect().width);
    //if (type == 0) 
    {
        if (e.touches != null) {
            if (e.touches.length > 0) {
                mouse.x = (e.touches[0].pageX / window.innerWidth) * 2 - 1;
                mouse.y = - (e.touches[0].pageY / window.innerHeight) * 2 + 1;
                coords = { x: e.touches[0].pageX, y: e.touches[0].pageY };
            }
        } else {
            mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
            mouse.y = - (e.clientY / window.innerHeight) * 2 + 1;
            coords = { x: e.clientX, y: e.clientY };
        }
    }
    coords.x = coords.x - (window.innerWidth - gameUI.gameCanvas.getBoundingClientRect().width) / 2;
    coords.x *= scale;
    coords.y *= scale;
    switch (GameScreen) {
        case GAMEMENU:

            bounds = mTex_But[0].getBounds();
            if (ThreeUI.isInBoundingBox(coords.x, coords.y, bounds.x, bounds.y, bounds.width, bounds.height)) {
                mSel = 1;
            }
            bounds = mTex_But[1].getBounds();
            if (ThreeUI.isInBoundingBox(coords.x, coords.y, bounds.x, bounds.y, bounds.width, bounds.height)) {
                mSel = 2;
            }
            if (type == 2) {
                switch (mSel) {
                    case 1:
                        setScreen(COLORRUN);
                        break;
                    case 2:
                        setScreen(GAMEMEMORY);
                        break;

                }

                mSel = 0;
            }
            break;
        case GAMEOVER:
        case GAMELEVEL:
            for (var i = 0; i < 3; i++) {
                bounds = butArry[i].getBounds();
                if (ThreeUI.isInBoundingBox(coords.x, coords.y, bounds.x, bounds.y, bounds.width, bounds.height)) {
                    mSel = i + 1;
                }
            }
            console.log(type, "mSel = " + mSel);
            if (type == 2) {
                switch (mSel) {
                    case 1:
                        setScreen(GAMEMENU);
                        break;
                    case 2:
                        if (GameScreen == GAMEOVER) {
                            // if (mColorRun.player.life <= 0) {
                            //     mColorRun.player.life = 3;
                            //     if (mColorRun.level > 0)
                            //         mColorRun.level--;
                            //     mColorRun.setNextLevel();
                            // }
                        } else {
                            mColorRun.setNextLevel();
                        }

                        break;
                    case 3:
                        mColorRun.replay();
                        break;
                }
                mSel = 0;
                //setScreen(ColorRun);
            }
            break;
        case COLORRUN:
            if (type == 0) {
                if (gameUI.gameCanvas.getBoundingClientRect().width / 2 < coords.x) {
                    mColorRun.move(39);
                } else {
                    mColorRun.move(37);
                }
            }
            break;

    }
}

function setScreen(scr) {
    var ff = 0;
    GameScreen = scr;
    mTex_logo.visible = false;
    scoreStrip.forEach(element => { element.visible = false; });
    mTex_fonts.forEach(element => { element.visible = false; });
    butArry.forEach(element => { element.visible = false; });
    mTex_But.forEach(element => { element.visible = false; });
    mTex_LooseLife.visible = false;
    for (let i = 0; i < 3; i++) {
        mTex_Heart[i].visible = false;
        mTex_EHeart[i].visible = false;
    }
    mPlan_Drop.forEach(element => {
        element.scale.set(6, 6, 6);
        element.scale.set(6, 6, 6);
        element.material.color = new THREE.Color('rgb(255,255,255)')//createColor(0);
    });
    mTex_Name.visible = false;
    mColorRun.setVisible(false);
    switch (GameScreen) {
        case GAMEMENU:
            DrawLbl(mTex_fonts[2], "COLOR DROPS", 0, -70, "#054d86", 35);
            mPlan_Drop[0].position.set(-20, 40, 0); mPlan_Drop[0].visible = true; mPlan_Drop[0].material.color = new THREE.Color('rgb(5,77,134)');
            mPlan_Drop[1].position.set(-20, -30, 0); mPlan_Drop[1].visible = true; mPlan_Drop[1].material.color = new THREE.Color('rgb(247,138,138)');
            mPlan_Drop[2].position.set(20, 35, 0); mPlan_Drop[2].visible = true; mPlan_Drop[2].material.color = new THREE.Color('rgb(169,215,190)');
            mPlan_Drop[3].position.set(20, -35, 0); mPlan_Drop[3].visible = true; mPlan_Drop[3].material.color = new THREE.Color('rgb(248,196,119)');
            for (let i = 0; i < 4; i++) {
                mPlan_Drop[i].scale.set(10, 10, 10);
            }
            mColorRun.player.position.set(0, -4, 0); mColorRun.player.visible = true; mColorRun.player.material.color = new THREE.Color('rgb(163,200,207)')//createColor(0);
            mColorRun.player.scale.set(13, 13, 13);
            break;
        case COLORRUN:
            mPlan_Drop[0].position.set(-22, 30, 0);
            mPlan_Drop[1].position.set(-22, 10, 0);
            mPlan_Drop[2].position.set(-7.5, 20, 0);
            mPlan_Drop[3].position.set(-7.5, 00, 0);
            mPlan_Drop[4].position.set(7.5, 20, 0);
            mPlan_Drop[5].position.set(7.5, 00, 0);
            mPlan_Drop[6].position.set(22, 30, 0);
            mPlan_Drop[7].position.set(22, 10, 0);
            mColorRun.gamereset();
            break;
        case GAMELEVEL:
        case GAMEOVER:
            var total = 0;
            for (var i = 0; i < butArry.length; i++) {
                butArry[i].visible = true;
            }

            for (i = 0; i < mColorRun.player.life && GameScreen != GAMEOVER; i++)
                DrawTextureAlign(mTex_Heart[i], 105 + i * 25, -260, ThreeUI.anchors.center, ThreeUI.anchors.center);

            for (let i = 0; i < mColorRun.level; i++) {
                DrawLbl(mTex_fonts[ff++], (i + 1) + ". " + mColorRun.points[i], -100, -95 + i * 32, FONTCOLOR, 20, "left");
                scoreStrip[i].visible = true;
                total += mColorRun.points[i];
            }
            if (GameScreen == GAMEOVER) {
                DrawLbl(mTex_fonts[ff++], "GAMEOVER\n---", 0, -250, FONTCOLOR, 25, "center");
                DrawLbl(mTex_fonts[ff++], "Congratulations!\n\nFinal Score " + total + " points", 0, -200, FONTCOLOR, 20, "center");
                DrawLbl(mTex_fonts[ff++], "Other Game", 0, 212, BUTTONFONT, 21, "center");
            } else {
                DrawLbl(mTex_fonts[ff++], "Congratulations! you save", -50, -250, FONTCOLOR, 24, "center");
                DrawLbl(mTex_fonts[ff++], "Bonus " + (mColorRun.player.life * 20) + " points\n\nFinal Score " + total + " points", 0, -200, FONTCOLOR, 20, "center");
                DrawLbl(mTex_fonts[ff++], "Next Game", 0, 212, BUTTONFONT, 22, "center");
            }

            DrawLbl(mTex_fonts[ff++], "Replay", -120, 212, BUTTONFONT, 22, "center");
            DrawLbl(mTex_fonts[ff++], "Home", 120, 212, BUTTONFONT, 22, "center");

            break;
    }
}

function loadModel() { }
function nextTurn() {
    clearTimeout(timeoutHandle);
    if (mColorRun.isStart && (mColorRun.timer >= LVLTIMER || mColorRun.points[mColorRun.level] >= 300)) {
        console.log("nextTurn");
        if (mColorRun.SPD == MAX_SPD)
            mColorRun.NumColour++;

        mColorRun.SPD = mColorRun.SPD == MIN_SPD ? MAX_SPD : MIN_SPD;
        mColorRun.levelUpConter = 150;
        mColorRun.timer = 0;
        mColorRun.colordiff -= COLOR_CHANGE_BY_LEVEL;
        mColorRun.points[mColorRun.level] += mColorRun.player.life * 20;
        mColorRun.level++;
        mColorRun.SPD = 0;
        return;
    }
    timeoutHandle = setTimeout(nextTurn, 1000);
    mColorRun.timer++;
    DrawLblLT(mTex_fonts[2], "Time : " + (LVLTIMER - mColorRun.timer) + " sec", 55, 20, FONTCOLOR, 20);
    mColorRun.isStart = true;
}