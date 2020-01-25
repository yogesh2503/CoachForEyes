var camera, scene, renderer, gameUI, meshLoading, Counter = 0, isResize = 0;
var mTex_logo = null, mTex_LandScape, cCount = 0, mSel = 0;
var CANVAS_WIDTH = 480, CANVAS_HEIGHT = 854, P_CONST = .5621, delta = 0;//.56205
var mTex_fonts = [], mTex_But = [], mTex_Heart = [], mTex_EHeart = [], topPlan, mTex_LooseLife;
var timeoutHandle;
var butArry = [], scoreStrip = [];
var tex_wrong, tex_wright, tex_fill, tex_empty, tex_gift, tex_tile;
var mMemory;
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
    manager.onProgress = function (item, loaded, total) {/*console.log( item, loaded, total );*/ };
    function onProgress(xhr) { if (xhr.lengthComputable) { var percentComplete = (xhr.loaded / xhr.total) * 8 * objCount; objCount++; } }
    function onError() { }
    var textureLoader = new THREE.TextureLoader(manager);

    tex_wrong = textureLoader.load("assets/wrong.png");
    tex_wright = textureLoader.load("assets/wright.png");
    tex_fill = textureLoader.load("assets/fill.png");
    tex_empty = textureLoader.load("assets/empty.png");
    tex_gift = textureLoader.load("assets/gift.png");

    var texture = new THREE.TextureLoader().load("assets/tile.jpg");
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(4, 8);


    mPlanBackground = createPlanMesh();
    scene.add(mPlanBackground);
    mPlanBackground.traverse(function (child) { if (child.isMesh) { child.material.map = texture; } });
    mPlanBackground.scale.set(60, 105, 50);
    mPlanBackground.visible = true;



    mMemory = new Memory();
    AssetLoader.add.webFont('HanaleiFill', 'js/font.css');
    // AssetLoader.add.image('assets/logo.png');
    AssetLoader.add.image('assets/but.png');
    AssetLoader.add.image('assets/heart.png');
    AssetLoader.add.image('assets/heartempty.png');
    AssetLoader.add.image('assets/strip.png');
    

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
        

        for (var i = 0; i < 3; i++) {
            butArry.push(loadUIScal('assets/but.png', 120 - i * 120, 206, .4, .6));
            if (i == 1)
                butArry[i].width *= 1.2;
        }
        var noofStrip = 10;
        console.log("noofStrip " + noofStrip);
        for (var i = 0; i < noofStrip; i++) {
            scoreStrip.push(loadUIScal('assets/strip.png', 0, -32 + i * 32, 2, 2));
        }

        for (var i = 0; i < noofStrip + 25; i++) {
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
            if (Counter > 6) {
                setScreen(GAMEMENU);
            }
            break;
        case COLORRUN:
            break;
        case GAMEMEMORY:
            mMemory.draw();
            break;
        case GAMEOVER:
        case GAMELEVEL:
            for (var i = 0; i < 3; i++) {
                if (i == 1) {
                    DrawTransScal(butArry[i], 120 - i * 120, 206, 128, 34, mSel == 1 + i ? 1.1 : 1, mSel == 1 + i ? 0.5 : 1);
                } else {
                    DrawTransScal(butArry[i], 120 - i * 120, 206, 90, 34, mSel == 1 + i ? 1.1 : 1, mSel == 1 + i ? 0.5 : 1);
                }
            }
            break;
        case GAMEMENU:
            DrawTransScal(mTex_But[0], 0, 243, 90, 44, mSel == 1 ? 1.1 : 1, mSel == 1 ? 0.5 : 1);
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
                coords.x = coords.x - (window.innerWidth - gameUI.gameCanvas.getBoundingClientRect().width) / 2;
                coords.x *= scale;
                coords.y *= scale;
            }
            console.log("e.touches.length = " + e.touches.length)
        } else {
            mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
            mouse.y = - (e.clientY / window.innerHeight) * 2 + 1;
            coords = { x: e.clientX, y: e.clientY };
            coords.x = coords.x - (window.innerWidth - gameUI.gameCanvas.getBoundingClientRect().width) / 2;
            coords.x *= scale;
            coords.y *= scale;




            var elem = renderer.domElement,boundingRect = elem.getBoundingClientRect(), 
            x = (event.clientX - boundingRect.left) * (elem.width / boundingRect.width),
            y = (event.clientY - boundingRect.top) * (elem.height / boundingRect.height);
            mouse.x = (x / CANVAS_WIDTH) * 2 - 1;
            mouse.y = - (y / CANVAS_HEIGHT) * 2 + 1;
       
        

            
        }
        raycaster.setFromCamera(mouse, camera);
    }


    console.log("[" + Math.floor(coords.x) + ", " + Math.floor(coords.y) + "] ~~~ [" + mouse.x.toFixed(2) + ", " + mouse.y.toFixed(2) + "]");
    switch (GameScreen) {
        case GAMEMENU:
            mSel = 0;
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
                        mMemory.numberofWin = 0;
                        mMemory.life = 3;
                        mMemory.level = 1;
                        mMemory.NumRows = mMemory.NumCols = 3; 
                        mMemory.timer = 0;
                        for (let i = 0; i < mMemory.levelScore.length; i++) {
                            mMemory.levelScore[i]=0;
                        }
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
                        if (GameScreen == GAMEOVER || mMemory.level >= 3) {

                        } else {
                            mMemory.numberofWin = 0;
                            // mMemory.life = 3;
                            mMemory.NumCols++;
                            mMemory.NumRows = mMemory.NumCols;
                            mMemory.level++;
                            // mMemory.timer = 0;
                            setScreen(GAMEMEMORY);
                        }

                        break;
                    case 3:
                        mMemory.numberofWin = 0;
                        mMemory.life = 3;
                        mMemory.levelScore[mMemory.level - 1] = 0;
                        mMemory.timer = 0;
                        setScreen(GAMEMEMORY);
                        break;
                }
                mSel = 0;
                //setScreen(ColorRun);
            }
            break;
        case COLORRUN:
            if (type == 0) {
                if (gameUI.gameCanvas.getBoundingClientRect().width / 2 < coords.x) {
                } else {
                }
            }
            break;
        case GAMEMEMORY:
            mMemory.handle_Gameplay(e, type);
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
    mMemory.plans.forEach(element => {
        element.visible = false;
    });
    
    switch (GameScreen) {
        case GAMEMENU:
            MX = 9;
            DrawLbl(mTex_fonts[ff++], "BIENVENUE\n\nMEMORY GAME", 0, -220, "#154c86", 28);
            // DrawLbl(mTex_fonts[ff++], "1. Memorize the position of each coloured box.\n\n2. Click and recreate the original share.\n\n3. You may click on gifts which are bouns points.", -180, 160, "#054d86", 16, "left");
            DrawLbl(mTex_fonts[ff++], "Play", 0, 250, BUTTONFONT, 22);
            var rows = 3, col = 3;
            
            for (let i = 0; i < rows; i++) {
                for (let j = 0; j < col; j++) {
                    mMemory.plans[i * col + j].position.set(-.5 * MX * (col - 1) + j * MX, -5+.5 * MX * (rows - 1) - i * MX, 0);
                    mMemory.plans[i * col + j].visible = true;
                    if (i == 0 && j == 0)
                        mMemory.plans[i * col + j].traverse(function (child) { if (child.isMesh) { child.material.map = tex_gift; } });
                    else if ((i == 1 || i == 2) && j == 1)
                        mMemory.plans[i * col + j].traverse(function (child) { if (child.isMesh) { child.material.map = tex_fill; } });
                    else
                        mMemory.plans[i * col + j].traverse(function (child) { if (child.isMesh) { child.material.map = tex_empty; } });
                    mMemory.plans[i * col + j].scale.set(MX, MX, MX);
                }
            }
            break;
        case COLORRUN:
            break;
        case GAMELEVEL:
        case GAMEOVER:
            var total = 0;
            for (var i = 0; i < mMemory.level; i++) {
                DrawLbl(mTex_fonts[ff++], (i + 1) + ". " + mMemory.levelScore[i], -100, -25 + i * 32, FONTCOLOR, 20, "left");
                scoreStrip[i].visible = true;
                total += mMemory.levelScore[i];
            }
            for (var i = 0; i < butArry.length; i++) {
                butArry[i].visible = true;
            }
            for (var i = 0; i < mMemory.life; i++) {
                DrawTextureAlign(mTex_Heart[i], 105 + i * 25, -200, ThreeUI.anchors.center, ThreeUI.anchors.center);
            }
            DrawLbl(mTex_fonts[ff++], "GAMEOVER\n---", 0, -250, FONTSCORE, 25, "center");
            if (GameScreen == GAMEOVER) {

                DrawLbl(mTex_fonts[ff++], "Congratulations!\n\nFinal Score " + total + " points", 0, -200, FONTSCORE, 20, "center");
            } else {
                DrawLbl(mTex_fonts[ff++], "Congratulations! you save", -50, -190, FONTSCORE, 24, "center");
                DrawLbl(mTex_fonts[ff++], "Bonus " + (mMemory.life * 20) + " Point!\n\nFinal Score " + total + " points", 0, -130, FONTSCORE, 20, "center");
            }

            DrawLbl(mTex_fonts[ff++], (GameScreen == GAMEOVER || mMemory.level >= 3) ? "Other Game" : "Next Game", 0, 212, BUTTONFONT, 22, "center");
            DrawLbl(mTex_fonts[ff++], "Replay", -120, 212, BUTTONFONT, 22, "center");
            DrawLbl(mTex_fonts[ff++], "Home", 120, 212, BUTTONFONT, 22, "center");
            break;
        case GAMEMEMORY:
            mMemory.gamereset();
            break;
    }
}

function loadModel() { }
