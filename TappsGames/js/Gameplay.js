var scene, camera, renderer, gameUI,counter = 0, isResize = 0;
var CANVAS_WIDTH = 480, CANVAS_HEIGHT = 854;
var mTex_fonts = Array(17),raycaster = new THREE.Raycaster();
var mRect = [],mPlan_White = [], mPlan_Black = [], mTex_Box = [];
var mTex_Play, mTex_AppStore, mTex_googleplay, mPlan_BG, mPlan_Icon,mTex_tell, mTex_start, mTex_loin;
var mouse = new THREE.Vector2(),vec2 = new THREE.Vector2();
var isClick = false,coords = null,ration = 1,isDown = false;
var mGroup = new THREE.Group();
var mGameMatrix = [],gCol=0;
const ROW = 5,COL = 5;
const arry=[ 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0,];
const dogArr=[ 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0,];
const gMatrix = [1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0];
var matrix = [5, 5, 5, 3, 2, 3, 3, 5, 5, 4];
function init() {
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 500);
    camera.position.set(0, 0, 300); camera.rotation.set(0, 0, 0);
    camera.position.set(0, 0, 250); camera.rotation.set(0, 0, 0);
    scene = new THREE.Scene(); scene.background = new THREE.Color(0x000000);
    var manager = new THREE.LoadingManager(loadModel);
    manager.onProgress = function (item, loaded, total) { };
    function onProgress(xhr) { if (xhr.lengthComputable) { } };
    function onError() { };
    scene.add(new THREE.AmbientLight(0xffffff, 0.6));
    directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
    directionalLight.position.set(3, -2, 2);
    scene.add(directionalLight);
    var textureLoader = new THREE.TextureLoader(manager);
    mTex_White = loadTexture(WHITE_64);
    mTex_Black = loadTexture(BLACK_64);
    mTex_Icon = loadTexture(BG_64);
    mTex_BG = loadTexture(BG0_64);
    mPlan_BG = new THREE.Mesh(new THREE.PlaneGeometry(300, 300), new THREE.MeshBasicMaterial({ map: mTex_BG }));
    scene.add(mPlan_BG);
    mPlan_BG.visible = false;
    mPlan_BG.position.set(0, 0, -100);
    mPlan_Icon = new THREE.Mesh(new THREE.PlaneGeometry(82, 82), new THREE.MeshBasicMaterial({ map: mTex_Icon, transparent: true }));
    mGroup.add(mPlan_Icon);
    var White = new THREE.Mesh(new THREE.PlaneGeometry(8, 8), new THREE.MeshBasicMaterial({ map: mTex_White }));
    var black = new THREE.Mesh(new THREE.PlaneGeometry(8, 8), new THREE.MeshBasicMaterial({ map: mTex_Black }));
    for (let i = 0; i < 81; i++) {
        mPlan_White.push(White.clone());
        mGroup.add(mPlan_White[i]);
        mPlan_Black.push(black.clone());
        mGroup.add(mPlan_Black[i]);
        mPlan_Black[i].position.set(-36 + (i % 9) * 9, 36 - Math.floor(i / 9) * 9, 0.2);
        mPlan_White[i].position.set(-36 + (i % 9) * 9, 36 - Math.floor(i / 9) * 9, 0.2);
        mPlan_Black[i].visible = false;
    }
    scene.add(mGroup);
    mGroup.anim = 0;
    mGroup.scale.set(.1, .1, .1);
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    document.body.appendChild(renderer.domElement);
    gameUI = new ThreeUI(renderer.domElement, 720);
    AssetLoader.add.image64('HAND_64', HAND_64);
    AssetLoader.add.image64('TELL_64', TELL_64);
    AssetLoader.add.image64('SELECT_64', SELECT_64);
    AssetLoader.add.image64('LOIN_64', LOIN_64);
    AssetLoader.add.image64('APPSTORE_64', APPSTORE_64);
    AssetLoader.add.image64('PLAY_64', PLAY_64);
    AssetLoader.add.image64('BOX_64', BOX_64);
    AssetLoader.add.image64('GOOGLEPLAY_64', GOOGLEPLAY_64);
    AssetLoader.progressListener = function (progress) { };
    AssetLoader.load(function () {
        for (let i = 0; i < 1; i++) {
            mRect.push(loadUIRect('#ccc', 34, 34));
        }
        for (let i = 0; i < 10; i++) {
            mTex_Box.push(loadUI('BOX_64', 0, 0, 0));
        }
        mTex_hand = loadUI('HAND_64', 0, 200, 0);
        mTex_hand.vy = -1;
        mTex_loin = loadUI('LOIN_64', 0, 0, 0);
        mTex_loin.s = 1;
        mTex_Play = loadUI('PLAY_64', 0, 0, 10);
        mTex_Play.s = 1;
        mTex_Play.sx = 1.1;
        mTex_AppStore = loadUI('APPSTORE_64', 0, 0, 11);
        mTex_googleplay = loadUI('GOOGLEPLAY_64', 0, 0, 12);
        mTex_tell = loadUI('TELL_64', 0, 0, 0);
        mTex_tell.s = 1;
        mTex_tell.sx = .1;
        mTex_start = loadUI('SELECT_64', 0, 0, 0);
        for (var i = 0; i < mTex_fonts.length; i++) {
            mTex_fonts[i] = createTexts("100", 20, "#fff", ThreeUI.anchors.center, ThreeUI.anchors.center, "center", "HanaleiFill");
        }
        setScreen(GAMESPLASH);
    });
    document.addEventListener('keydown', dealWithKeyboard);
    document.addEventListener('touchstart', e => { touchEvent(e, 0, 1); });
    document.addEventListener('touchmove', e => { touchEvent(e, 1, 1); });
    document.addEventListener('touchend', e => { touchEvent(e, 2, 1); });
    document.addEventListener('mousedown', e => { touchEvent(e, 0, 0); });
    document.addEventListener('mousemove', e => { touchEvent(e, 1, 0); });
    document.addEventListener('mouseup', e => { touchEvent(e, 2, 0); });
    window.addEventListener('resize', onWindowResize, false);
    Draw();
}
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    this.gameUI.resize();
    isResize = 5;
}
function touchEvent(e, type, sys) {
    CANVAS_WIDTH = window.innerWidth;
    CANVAS_HEIGHT = window.innerHeight;
    ration = CANVAS_WIDTH / CANVAS_HEIGHT;
    if (e.touches != null) {
        if (e.touches.length > 0) {
            mouse.x = (e.touches[0].pageX / window.innerWidth) * 2 - 1;
            mouse.y = -(e.touches[0].pageY / window.innerHeight) * 2 + 1;
            coords = { x: e.touches[0].pageX, y: e.touches[0].pageY };
            coords.x = coords.x - (window.innerWidth - gameUI.gameCanvas.getBoundingClientRect().width) / 2;
        }
    } else {
        mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
        coords = { x: e.clientX, y: e.clientY };
        coords.x = coords.x - (window.innerWidth - gameUI.gameCanvas.getBoundingClientRect().width) / 2;
        var elem = renderer.domElement, boundingRect = elem.getBoundingClientRect(),x = (event.clientX - boundingRect.left) * (elem.width / boundingRect.width),y = (event.clientY - boundingRect.top) * (elem.height / boundingRect.height);
        mouse.x = (x / CANVAS_WIDTH) * 2 - 1;
        mouse.y = -(y / CANVAS_HEIGHT) * 2 + 1;

    }
    raycaster.setFromCamera(mouse, camera);
    switch (GameScreen) {
        case GAMEPLAY:
            Handle_Game(type);
            break;
    }
}
function Draw() {
    requestAnimationFrame(Draw);
    renderer.render(scene, camera);
    gameUI.render(renderer);
    if (mTex_Play == null) {
        return;
    }
    switch (GameScreen) {
        case GAMEPLAY:
            drawGame();
            break;
        case GAMESPLASH:
            DrawSplash();
            break;
        case GAMEOVER:
            Draw_Gameover();
            break;
    }
    counter++;
    if (isResize > 0) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        this.gameUI.resize();
        isResize--;
    }
}
function Handle_Game(type) {
    if (type == 0) {
        isDown = true;
    }
    if (type == 2) {
        isDown = false;
    }
    var intersects = raycaster.intersectObjects(mPlan_White);
    if (isDown) {
        for (let i = 0; i < mPlan_White.length && intersects.length > 0; i++) {
            if (intersects[0].object == mPlan_White[i]) {
                if (i % COL == gCol && mGameMatrix[i] > 0) {
                    mPlan_White[i].visible = false;
                    mPlan_Black[i].visible = true;
                    mGameMatrix[i] = 0;
                    var isAll = 0;
                    for (let i = gCol; i < (ROW * COL); i += COL) {
                        if (mGameMatrix[i] > 0) {
                            isAll = mGameMatrix[i];
                        }
                    }
                    if (isAll == 0) {
                        gCol++;
                    }
                }
            }
        }
        checkRow();
    }
}

function checkRow() {
    if (mGameMatrix[13] == 0 && mGameMatrix[18] == 0 && mGameMatrix[23] == 0) {
        DrawLbl(mTex_fonts[12], "X", -72 + 3 * 50, -20 + (0) * 50, '#3b3c3c', 30);
        DrawLbl(mTex_fonts[14], "X", -72 + 3 * 50, -20 + (1) * 50, '#3b3c3c', 30);
    }
    if (mGameMatrix[14] == 0 && mGameMatrix[19] == 0) {
        DrawLbl(mTex_fonts[13], "X", -72 + 4 * 50, -20 + (0) * 50, '#3b3c3c', 30);
        DrawLbl(mTex_fonts[15], "X", -72 + 4 * 50, -20 + (1) * 50, '#3b3c3c', 30);
    }
    var com = true;
    for (let i = 20; i < mGameMatrix.length && com; i++) {
        if (mGameMatrix[i] > 0)
            com = false;
    }
    if (com)
        DrawLbl(mTex_fonts[16], "X", -72 + 4 * 50, -20 + (4) * 50, '#3b3c3c', 30);
}

function DrawSplash() {
    for (let i = 0; i < mPlan_Black.length && i < mGroup.anim; i++) {
        mPlan_White[i].visible = arry[i] == 0;
        mPlan_Black[i].visible = arry[i] == 1;
    }
    if (mGroup.scale.x < .7) {
        mGroup.scale.x *= 1.05;
        mGroup.scale.y *= 1.05;
        mGroup.scale.z *= 1.05;
    } else if (mGroup.rotation.x > -.2) {
        mGroup.rotation.x -= .01;
        mGroup.rotation.y += .0245;
        mGroup.rotation.z += .02;
    }
    if (mGroup.rotation.x <= -.2 && mGroup.scale.x >= .5) {
        if (counter % 5 == 0) {
            mGroup.anim += 10;
        }
        DrawTexture(mTex_tell, -120, -200, 48 * mTex_tell.s, 48 * mTex_tell.s);
        DrawTexture(mTex_start, 20, -200, 256, 64);
        if (mTex_tell.s > 1.1) {
            mTex_tell.sx = -.005;
        }
        if (mTex_tell.s < 0.951) {
            mTex_tell.sx = 0.005;
        }
        mTex_tell.s += mTex_tell.sx;
        DrawLbl(mTex_fonts[0], "Solve the puzzle\nto reveal the picture!", 32, -204, '#0f0f0f', 22);
    }
    if (mGroup.anim > 300) {
        setScreen(GAMEPLAY);
    }
}
function drawGame() {
    if (mGroup.position.x < 8) {
        mGroup.position.x += .5;
        mGroup.position.y -= 1.25;
        if (mGroup.position.x >= 8) {
            for (let i = 0; i < 10; i++) {
                mTex_Box[i].visible = true;
                mTex_fonts[i].visible = true;
            }
        }
        if (mGroup.rotation.x < 0) {
            mGroup.rotation.x += .01;
            mGroup.rotation.y -= .0245;
            mGroup.rotation.z -= .02;
        }
        if (mGroup.position.x >= 8) {
            mTex_Box.forEach(element => { element.visible = true; });
        }
        return;
    }
    mGroup.position.set(8, -20, 0);
    mGroup.rotation.set(0, 0, 0);
    if (counter % 100 > 50) {
        mRect[0].alpha = (100 - (counter % 100)) * .01;
    } else {
        mRect[0].alpha = (counter % 100) * .01;
    }
    if (gCol < 3)
        DrawTexture(mRect[0], -72 + (gCol % 5) * 50, 70, 42, 244);
    else if (gCol < 4)
        DrawTexture(mRect[0], -72 + (gCol % 5) * 50, 120, 42, 144);
    else
        DrawTexture(mRect[0], -72 + (gCol % 5) * 50, 95, 42, 94);

    mRect[0].visible = true;
    if (gCol >= COL) {
        mRect[0].visible = mTex_tell.visible = mTex_start.visible = mTex_hand.visible = false;
        mTex_fonts[10].visible = false;
        if (mGroup.anim < 50) {
            mGroup.anim++;
        } else {
            mGroup.visible = false;
            mTex_Box.forEach(element => { element.visible = false; });
            mTex_fonts.forEach(element => { element.visible = false; });

            if (mTex_loin.x > 0) {
                DrawTexture(mTex_loin, mTex_loin.x, mTex_loin.y, mTex_loin.s * 260, mTex_loin.s * 260);
                mTex_loin.x -= 1;
                mTex_loin.y -= 4;
                mTex_loin.s *= .99;
            } else {

                mRect[0].alpha = 1;
                mRect[0].color = '#ffffff';
                DrawTexture(mRect[0], 0, -70, 256 + sx, 256 + sx);
                DrawLbl(mTex_fonts[0], "Lion", 0, -160, '#0f0f0f', 36);

                DrawTexture(mTex_tell, -120, -240, 48 * mTex_tell.s, 48 * mTex_tell.s);
                DrawTexture(mTex_start, 20, -240, 256, 64);
                if (mTex_tell.s > 1.1) {
                    mTex_tell.sx = -.01;
                }
                if (mTex_tell.s < 0.951) {
                    mTex_tell.sx = 0.01;
                }
                mTex_tell.s += mTex_tell.sx;
                DrawLbl(mTex_fonts[2], "Everyone's\nfavorite animal", 32, -245, '#0f0f0f', 22);
                mGroup.anim++;
                if (mGroup.anim > 150) {
                    setScreen(GAMEOVER);
                }
            }
        }

    } else {
        DrawTexture(mTex_tell, -120, -200, 48 * mTex_tell.s, 48 * mTex_tell.s);
        DrawTexture(mTex_start, 20, -200, 260, 64);
        if (mTex_tell.s > 1.1) {
            mTex_tell.sx = -.005;
        }
        if (mTex_tell.s < 0.951) {
            mTex_tell.sx = 0.005;
        }
        mTex_tell.s += mTex_tell.sx;
        DrawLbl(mTex_fonts[10], "Fill " + matrix[gCol] + " squares to\ncomplete this column", 32, -204, '#0f0f0f', 22);
        DrawTexture(mTex_hand, - 72 + gCol * 50, mTex_hand.y, 48 * .6, 64 * .6);
        mTex_hand.y += mTex_hand.vy;
        if (mTex_hand.y < -115) {
            mTex_hand.vy = .5;
        }
        if (mTex_hand.y > -105) {
            mTex_hand.vy = -.5;
        }
    }


}
function Draw_Gameover() {
    if (mGroup.scale.x > .7) {
        mGroup.scale.x *= 0.98;
        mGroup.scale.y *= 0.98;
        mGroup.scale.z *= 0.98;
    }
    if (mGroup.rotation.x > -.2) {
        mGroup.rotation.x -= .01;
        mGroup.rotation.y += .0245;
        mGroup.rotation.z += .02;
    }
    DrawTexture(mTex_Play, 0, 210, 200 * mTex_Play.s, 60 * mTex_Play.s);
    if (mTex_Play.s > 1.1)
        mTex_Play.sx = .995;
    if (mTex_Play.s < .9)
        mTex_Play.sx = 1.005;
    mTex_Play.s *= mTex_Play.sx;
    DrawTexture(mTex_AppStore, -82, 290, 128 * 1.1, 43 * 1.1);
    DrawTexture(mTex_googleplay, 74, 290, 143 * 1.1, 43 * 1.1);
    DrawTexture(mTex_tell, -130, -240, 48 * mTex_tell.s, 48 * mTex_tell.s);
    DrawTexture(mTex_start, 20 + 3, -240, 256 * 1.2, 64 * 1.2);
    if (mTex_tell.s > 1.2) {
        mTex_tell.sx = -.01;
    }
    if (mTex_tell.s < 1.0) {
        mTex_tell.sx = 0.01;
    }
    mTex_tell.s += mTex_tell.sx;
    DrawLbl(mTex_fonts[10], "Too easy?\nsolve more challenging\npuzzles now free", 35, -256, '#0f0f0f', 22);
    for (let i = 0; i < 64; i++) {
        mPlan_Black[i].position.set(-35 + (i % 8) * 10, 35 - Math.floor(i / 8) * 10, 0.2);
        mPlan_White[i].position.set(-35 + (i % 8) * 10, 35 - Math.floor(i / 8) * 10, 0.2);
        mPlan_Black[i].visible = dogArr[i] != 0;
        mPlan_White[i].visible = dogArr[i] == 0;
        mPlan_Black[i].scale.set(1.2, 1.2, 1.2);
        mPlan_White[i].scale.set(1.2, 1.2, 1.2);
    }
}
function setScreen(scr) {
    GameScreen = scr;
    mTex_tell.visible = mTex_start.visible = mTex_loin.visible = false;
    mTex_Play.visible = mTex_AppStore.visible = mTex_hand.visible = false;
    mPlan_Black.forEach(element => { element.visible = false; });
    mPlan_White.forEach(element => { element.visible = false; });
    mRect.forEach(element => { element.visible = false; });
    mTex_Box.forEach(element => { element.visible = false; });
    mTex_fonts.forEach(element => { element.visible = false; });
    mPlan_BG.visible = false;
    mPlan_BG.position.set(0, 0, -100);
    switch (GameScreen) {
        case GAMEPLAY:
            mPlan_BG.visible = true;
            mGroup.anim = 0;
            mGameMatrix.length = 0;
            for (let i = 0; i < gMatrix.length; i++) {
                mGameMatrix.push(gMatrix[i]);
            }
            mGroup.scale.set(.9, .9, .9);
            mGroup.position.set(0, 0, 0);
            for (let i = 0; i < 25; i++) {
                mPlan_Black[i].position.set(-16 * 2 + (i % 5) * 16, 16 * 2 - Math.floor(i / 5) * 16, 0.2);
                mPlan_White[i].position.set(-16 * 2 + (i % 5) * 16, 16 * 2 - Math.floor(i / 5) * 16, 0.2);
                mPlan_Black[i].scale.set(1.9, 1.9, 1.9);
                mPlan_White[i].scale.set(1.9, 1.9, 1.9);
                mPlan_Black[i].visible = false;
                mPlan_White[i].visible = true;
            }
            for (let i = 0; i < 5; i++) {
                DrawTexture(mTex_Box[i], - 72 + i * 50, -94, 30, 60);
                DrawLbl(mTex_fonts[i], matrix[i] + "", - 72 + i * 50, - 70, '#fafafa', 20);
            }
            for (let i = 5; i < 10; i++) {
                DrawTexture(mTex_Box[i], -134, -31 + (i - 5) * 50, 30, 60);
                mTex_Box[i].rotation = 90;
                DrawLbl(mTex_fonts[i], matrix[i] + "", 16 - 134, 6 - 31 + (i - 5) * 50, '#fafafa', 20);
            }
            for (let i = 0; i < 1; i++) {
                DrawTexture(mRect[i], -72 + (i % 5) * 50, -131 + Math.floor(i / 5) * 50, 42, 200);
                mRect[i].color = '#ff0000';
                mRect[i].alpha = .5;
                mRect[i].visible = false;
            }
            mTex_loin.s = 1;
            DrawTexture(mTex_loin, 30, 70, 260, 260);
            mTex_loin.visible = false;
            mRect.forEach(element => { element.visible = false; });
            mTex_Box.forEach(element => { element.visible = false; });
            mTex_fonts.forEach(element => { element.visible = false; });
            mPlan_BG.rotation.set(0, 0, 0);
            mTex_hand.y = -110;
            break;
        case GAMESPLASH:
            mPlan_BG.visible = true;
            mPlan_White.forEach(element => { element.visible = true; });
            break;
        case GAMEOVER:
            mPlan_BG.visible = true;
            mGroup.visible = true;
            mGroup.rotation.set(0, 0, 0);
            mGroup.position.set(0, 10, 0);
            mGroup.scale.set(1, 1, 1);
            DrawTexture(mTex_AppStore, 0, 290, 256 * .8, 85 * .8);
            DrawTexture(mTex_googleplay, 0, 290, 256 * .8, 85 * .8);
            DrawTexture(mTex_Play, 0, 210, 200, 48);
            mTex_tell.s = 1;
            DrawTexture(mTex_tell, -120, -240, 48 * mTex_tell.s, 48 * mTex_tell.s);
            DrawTexture(mTex_start, 20, -240, 256 * 1, 64 * 1);
            break;
    }
}
function Handle_Menu(val) {
    switch (val) {
        case 10:
            if (isMobile.Android()){callUrl(true);}else{callUrl(false);}
            break;
        case 11:
            callUrl(false);
            break;
        case 12:
            callUrl(true);
            break;
    }
}
var GameScreen = 0;
const GAMESPLASH = 0;
const GAMEPLAY = 1;
const GAMEOVER = 2;
var sx = 0, sy = 0, sz = 0, rx = 0, ry = 0, rz = 0, clr = 0;
function loadUI(assetpath, x, y, clickval) {
    var sprite = gameUI.createSprite(assetpath);
    sprite.alpha = 1;
    sprite.x = x;
    sprite.y = y;
    sprite.width = sprite.width * .85;
    sprite.height = sprite.height * .85;
    sprite.pivot.x = 0.5;
    sprite.pivot.y = 0.5;
    sprite.anchor.x = ThreeUI.anchors.center;
    sprite.anchor.y = ThreeUI.anchors.center;
    sprite.visible = false;
    sprite.alpha = 1;
    if (clickval > 0)
        sprite.onClick(() => { Handle_Menu(clickval); });
    return sprite;
}
function createTexts(text, size, color, anchorx, anchory, textAlign, tpye) {
    var lbltext = this.gameUI.createText(text, size, 'myfont', color);
    lbltext.anchor.x = anchorx;
    lbltext.anchor.y = anchory;
    lbltext.textAlign = textAlign;
    lbltext.visible = false;
    return lbltext;
}
function DrawTexture(tex, x, y, sx, sy) {
    tex.x = x;
    tex.y = y;
    tex.width = sx;
    tex.height = sy;
    tex.visible = true;
}
function DrawLbl(tex, lbl, x, y, color, siz) {
    tex.x = x;
    tex.y = y;
    tex.text = lbl;
    tex.color = color || '#fafafa';
    tex.size = siz || 50;
    tex.anchor.x = ThreeUI.anchors.center;
    tex.anchor.y = ThreeUI.anchors.center;
    tex.visible = true;
}
function loadUIRect(color, sx, sy) {
    var rect = this.gameUI.createRectangle(color || '#222222', 0, 0, sx, sy);
    rect.alpha = 1.0;
    rect.anchor.x = ThreeUI.anchors.center;
    rect.anchor.y = ThreeUI.anchors.center;
    return rect;
}
function dealWithKeyboard(e) {
    var vs = 1,rs = .1;
    switch (e.keyCode) {
        case 37:
            sx = sx - vs;
            break;
        case 38:
            sz = sz + vs;
            break;
        case 39:
            sx = sx + vs;
            break;
        case 40:
            sz = sz - vs;
            break;
        case 65:
            sy = sy + vs;
            break;
        case 66:
        case 90:
            sy = sy - vs;
            break;
        case 49:
            rx = rx - rs;
            break;
        case 50:
            rx = rx + rs;
            break;
        case 52:
            ry = ry + rs;
            break;
        case 53:
            ry = ry - rs;
            break;
        case 55:
            rz = rz + rs;
            break;
        case 56:
            rz = rz - rs;
            break;
        case 57:
            sx = sy = sz = 0;
            break;
        case 54:
            rx = ry = rz = 0;

            break;
    }
    console.log("sx = " + sx + ", sy = " + sy + ", sz =" + sz);
    console.log(e.keyCode + " rx = " + rx + ", ry = " + ry + ", rz =" + rz);
}
var isMobile = {
    Android: function () { return navigator.userAgent.match(/Android/i); },
    BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i); },
    iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i); },
    Opera: function () { return navigator.userAgent.match(/Opera Mini/i); },
    Windows: function () { return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i); },
    any: function () { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); }
};
function loadModel() { }
function loadTexture(str) {
    let image = new Image(); image.src = str;
    const texture = new THREE.Texture();
    texture.image = image;
    image.onload = function () { texture.needsUpdate = true; };
    return texture;
}
