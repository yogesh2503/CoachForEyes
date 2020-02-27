var camera, scene, renderer, gameUI, meshLoading, Counter = 0,
    isResize = 0;
var mTex_logo = null,
    mTex_LandScape, cCount = 0,
    mSel = 0;
var CANVAS_WIDTH = 480,
    CANVAS_HEIGHT = 854,
    P_CONST = .5621,
    delta = 0; //.56205
var mTex_fonts = [],
    mTex_Heart = [],
    mTex_EHeart = [],
    topPlan, mTex_LooseLife;
var timeoutHandle;
var butArry = [],

    animGif = Array(6),
    scoreStrip = [];
var tex_wrong, tex_right, tex_empty, tex_Level, tex_menuBee;
// var tex_RapidoTile;
var mRapido = null;
var raycaster = new THREE.Raycaster();

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
    manager.onProgress = function(item, loaded, total) { /*console.log( item, loaded, total );*/ };

    function onProgress(xhr) {
        if (xhr.lengthComputable) {
            var percentComplete = (xhr.loaded / xhr.total) * 8 * objCount;
            objCount++;
        }
    }

    function onError() {}
    var textureLoader = new THREE.TextureLoader(manager);

    tex_empty = textureLoader.load("assets/p1.png");

    var texture = new THREE.TextureLoader().load("assets/tile.jpg");
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(6, 12);


    mPlanBackground = createPlanMesh();
    scene.add(mPlanBackground);
    mPlanBackground.traverse(function(child) { if (child.isMesh) { child.material.map = texture; } });
    mPlanBackground.scale.set(80, 160, 50);
    mPlanBackground.visible = true;
    mPlanBackground.position.set(0, 10, 0);


    AssetLoader.add.webFont('HanaleiFill', 'js/font.css');

    AssetLoader.add.image('assets/but.png');
    AssetLoader.add.image('assets/heart.png');
    AssetLoader.add.image('assets/heartempty.png');
    AssetLoader.add.image('assets/strip.png');
    AssetLoader.add.image('assets/wrong.png');
    AssetLoader.add.image('assets/right.png');
    AssetLoader.add.image('assets/levelUpdate.png');

    AssetLoader.add.image('assets/p0.png');
    AssetLoader.add.image('assets/p1.png');
    AssetLoader.add.image('assets/p2.png');
    AssetLoader.add.image('assets/p3.png');
    AssetLoader.add.image('assets/p4.png');
    for (let i = 0; i < animGif.length; i++) {
        AssetLoader.add.image('assets/' + i + '.png');
    }


    AssetLoader.progressListener = function(progress) {
        console.info('Progress: ' + (progress * 100) + '%');
    };
    AssetLoader.load(function() {
        console.log("AssetLoader~~~~~~~~" + gameUI);
        mTex_logo = loadUIRect();
        mTex_logo.visible = false;
        mTex_arrow = Array(2);
        mTex_sound = Array(2);
        mRapido = new Rapido();
        for (let i = 0; i < 3; i++) {
            mTex_Heart.push(loadUIS('assets/heart.png', 30 + i * 35, 20));
            mTex_EHeart.push(loadUIS('assets/heartempty.png', 30 + i * 35, 20));
        }
        tex_menuBee = loadBLOCK('assets/p4.png');
        mTex_LooseLife = loadUI('assets/heart.png', 0, -100);

        tex_wrong = loadUI('assets/wrong.png', 0, -100);
        tex_right = loadUI('assets/right.png', 0, -100);
        DrawTextureAlign(tex_wrong, 60, 50, ThreeUI.anchors.left, ThreeUI.anchors.bottom);
        DrawTextureAlign(tex_right, 60, 50, ThreeUI.anchors.left, ThreeUI.anchors.bottom);

        tex_right.width = tex_right.height = tex_wrong.width = tex_wrong.height = 64;

        tex_wrong.visible = tex_right.visible = false;

        tex_Level = loadUIScal('assets/levelUpdate.png', 0, 0, .6, .6);

        for (var i = 0; i < 3; i++) {
            butArry.push(loadUIScal('assets/but.png', 120 - i * 120, 206, .4, .6));

            if (i == 1)
                butArry[i].width *= 1.2;
        }
        var noofStrip = 20;
        console.log("noofStrip " + noofStrip);
        for (var i = 0; i < 13; i++) {
            scoreStrip.push(loadUIScal('assets/strip.png', 0, -132 + i * 32, 1, 1));
        }

        for (var i = 0; i < noofStrip; i++) {
            mTex_fonts[i] = createTexts('100', 20, '#fff', ThreeUI.anchors.center, ThreeUI.anchors.center, 'center', 'HanaleiFill');
        }

        for (let i = 0; i < animGif.length; i++) {
            animGif[i] = loadUIScal('assets/' + i + '.png', 0, 0, 1, 1.2);
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
        document.addEventListener('touchmove', e => { touchEvent(e, 1); });
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
            if (Counter > 6 && mRapido != null) {
                setScreen(GAMEMENU);
            }
            break;
        case GAMERAPIDO:
            mRapido.draw();
            break;
        case GAMEOVER:
            for (var i = 0; i < 3; i++) {
                DrawTransScal(butArry[i], 120 - i * 120, 300, 90, 48, mSel == 1 + i ? 1.1 : 1, mSel == 1 + i ? 0.5 : 1);
            }
            break;
        case GAMEMENU:
            DrawTransScal(butArry[0], 0, 193, 100, 40, mSel == 1 ? 1.1 : 1, mSel == 1 ? 0.5 : 1);
            break;
        case GAMELEVEL:
            if (Counter > 100) {
                mRapido.numberofWin = 0;
                mRapido.level++;
                setScreen(GAMERAPIDO);
            }
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
                mouse.y = -(e.touches[0].pageY / window.innerHeight) * 2 + 1;
                coords = { x: e.touches[0].pageX, y: e.touches[0].pageY };
                coords.x = coords.x - (window.innerWidth - gameUI.gameCanvas.getBoundingClientRect().width) / 2;
                coords.x *= scale;
                coords.y *= scale;
            }
            console.log("e.touches.length = " + e.touches.length)
        } else {

            console.log(e.clientX + "e.touches.length = " + e.clientY)

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


    // console.log("[" + Math.floor(coords.x) + ", " + Math.floor(coords.y) + "] ~~~ [" + mouse.x.toFixed(2) + ", " + mouse.y.toFixed(2) + "]");
    switch (GameScreen) {
        case GAMEMENU:
            mSel = 0;
            bounds = butArry[0].getBounds();
            if (ThreeUI.isInBoundingBox(coords.x, coords.y, bounds.x, bounds.y, bounds.width, bounds.height)) {
                mSel = 1;
            }
            console.log(type + " mSel = " + mSel);



            if (type == 2) {
                switch (mSel) {
                    case 1:
                        mRapido.numberofWin = 0;
                        mRapido.life = 3;
                        mRapido.level = 1;
                        mRapido.NumRows = mRapido.NumCols = 3;
                        mRapido.timer = 0;
                        while (mRapido.levelScore.length > 0) {
                            mRapido.levelScore.pop();
                        }
                        setScreen(GAMERAPIDO);
                        break;

                }
                mSel = 0;
            }
            break;
        case GAMEOVER:
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
                        if (mRapido.life <= 0 || mRapido.timer >= LVLTIMER) {

                        } else {
                            mRapido.numberofWin = 0;
                            mRapido.level++;
                            setScreen(GAMERAPIDO);
                        }
                        break;
                    case 3:
                        if (mRapido.life <= 0 || mRapido.timer >= LVLTIMER) {
                            mRapido.life = 3;
                            mRapido.timer = 0;
                        }
                        mRapido.numberofWin = 0;
                        mRapido.levelScore.pop();
                        setScreen(GAMERAPIDO);
                        break;
                }
                mSel = 0;
            }
            break;
        case GAMERAPIDO:
            mRapido.handle_Gameplay(e, type);
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
    animGif.forEach(element => { element.visible = false; });
    tex_Level.visible = tex_wrong.visible = tex_right.visible = false;
    if (mRapido != null) {
        mRapido.mBlock.forEach(element => { element.setVisible(false); });
    }
    tex_menuBee.visible = mTex_LooseLife.visible = false;
    for (let i = 0; i < 3; i++) {
        mTex_Heart[i].visible = false;
        mTex_EHeart[i].visible = false;
    }
    mTex_fonts[2].rotation = 0;
    mTex_fonts[3].rotation = 0;
    switch (GameScreen) {
        case GAMEMENU:

            DrawLbl(mTex_fonts[ff++], "WELCOME\n\nRAPIDO BEE", 0, -220, "#c85a52", 28);
            DrawLbl(mTex_fonts[ff++], "Play", 0, 200, BUTTONFONT, 22);
            for (let i = 0; i < 4; i++) {
                if (i % 3 == 0)
                    mRapido.mBlock[i].setMenu(0, -55 + Math.floor(i / 3) * 110, 2);
                else if (i == 2)
                    DrawTransScal(tex_menuBee, 93, Math.floor(i / 3) * 110, 128, 128, 1, 1);
                else
                    mRapido.mBlock[i].setMenu(i % 3 == 1 ? -93 : 93, Math.floor(i / 3) * 110, i == 2 ? 1 : 2);
            }


            break;
        case GAMEOVER:
            var total = 0;
            var j = mRapido.levelScore.length > scoreStrip.length ? (mRapido.levelScore.length - scoreStrip.length) : 0;

            for (var i = 0; j < mRapido.levelScore.length; i++, j++) {
                DrawLbl(mTex_fonts[ff++], (j + 1) + ". " + mRapido.levelScore[j], -100, -125 + i * 32, FONTCOLOR, 20, "left");
                scoreStrip[i].visible = true;
            }
            for (var i = 0; i < mRapido.levelScore.length; i++) {
                total += mRapido.levelScore[i];
            }
            for (var i = 0; i < butArry.length; i++) {
                butArry[i].visible = true;
            }
            for (var i = 0; i < mRapido.life; i++) {
                DrawTextureAlign(mTex_Heart[i], 105 + i * 27, -260, ThreeUI.anchors.center, ThreeUI.anchors.center);
            }
            DrawLbl(mTex_fonts[ff++], "GAMEOVER\n---", 0, -300, FONTSCORE, 25, "center");
            if (GameScreen == GAMEOVER && mRapido.life <= 0) {
                DrawLbl(mTex_fonts[ff++], "Congratulations!\n\nFinal Score " + total + " points", 0, -250, FONTSCORE, 20, "center");
            } else {
                DrawLbl(mTex_fonts[ff++], "Congratulations! you save", -50, -250, FONTSCORE, 24, "center");
                DrawLbl(mTex_fonts[ff++], "Bonus " + (mRapido.life * 20) + " Point!\n\nFinal Score " + total + " points", 0, -210, FONTSCORE, 20, "center");
            }

            DrawLbl(mTex_fonts[ff++], (mRapido.life <= 0 || mRapido.timer >= LVLTIMER) ? "Other\nGame" : "Next\nGame", 0, 296, BUTTONFONT, 20, "center");
            DrawLbl(mTex_fonts[ff++], "Replay", -120, 304, BUTTONFONT, 20, "center");
            DrawLbl(mTex_fonts[ff++], "Home", 120, 304, BUTTONFONT, 20, "center");
            break;
        case GAMERAPIDO:
            mRapido.gamereset();
            break;

        case GAMELEVEL:
            Counter = 0;
            DrawLblRT(mTex_fonts[ff++], "Score : " + (mRapido.allscore + mRapido.points), 50, 30, FONTSCORE, 20);
            DrawLblRT(mTex_fonts[ff++], "Level : " + mRapido.level, 50, 60, FONTSCORE, 20);
            DrawLblLT(mTex_fonts[ff++], "Time : " + (LVLTIMER - mRapido.timer) + " sec", 50, 30, FONTSCORE, 20);
            for (let i = 0; i < 3; i++) {
                mTex_Heart[i].visible = true;
                DrawTextureAlign(mTex_Heart[i], 30 + i * 35, 20, ThreeUI.anchors.right, ThreeUI.anchors.bottom);
            }
            tex_right.visible = true;
            tex_Level.visible = true;
            DrawLbl(mTex_fonts[ff++], "Upgrade to", 0, -15, FONTSCORE, 34);
            DrawLbl(mTex_fonts[ff++], "Level " + (mRapido.level + 1), 0, 35, FONTSCORE, 34);
            DrawLbl(mTex_fonts[ff++], "CONGRATULATIONS!", 0, -105, BUTTONFONT, 30);
            break;
    }
}

function loadModel() {}