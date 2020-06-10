var frequency = .5;
var camera, scene, renderer, Counter = 0,
    isResize = 0,
    objCount = 0,
    isClick = false;
var gameUI;
var mTex_fonts = Array(3);
var mTex_Empty = [];
var mTex_Emozy = [];
var mTex_Home, mTex_Restrt, mTex_Cup, mTex_play, mTex_hand, mTex_Swip;
var mTex_DWN;
var fcolor = "#8bbdd1";
var mBlocks = [];
var ratio = 1;
var selblack = -1;
var score = 0;
var linecount = 0;
var rects = [];
var mTex_nmp = [];
var isHand = true;
var NewGame = false;
const MIN = .5,
    MAX = 1,
    MUL = 360,
    MAXLIN = 1000;
const RAD = 12;
const blockScore = [5, 1, 5, 4, 4, 3, 9, 2, 3];

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
    renderer.setClearColor(0x000000, 1);
    CANVAS_HEIGHT = window.innerHeight;
    CANVAS_WIDTH = window.innerWidth;
    ratio = CANVAS_WIDTH / CANVAS_HEIGHT;



    AssetLoader.add.image64('E0_64', E0_64);
    AssetLoader.add.image64('E1_64', E1_64);
    AssetLoader.add.image64('E2_64', E2_64);
    AssetLoader.add.image64('E3_64', E3_64);
    AssetLoader.add.image64('E4_64', E4_64);
    AssetLoader.add.image64('E5_64', E5_64);
    AssetLoader.add.image64('E6_64', E6_64);
    AssetLoader.add.image64('E7_64', E7_64);
    AssetLoader.add.image64('E8_64', E8_64);
    AssetLoader.add.image64('E9_64', E9_64);


    AssetLoader.add.image64('EMP_64', EMP_64);
    AssetLoader.add.image64('CUP_64', CUP_64);
    AssetLoader.add.image64('HOM_64', HOM_64);
    AssetLoader.add.image64('RST_64', RST_64);
    AssetLoader.add.image64('PLY_64', PLY_64);
    AssetLoader.add.image64('SWP_64', SWP_64);
    AssetLoader.add.image64('HND_64', HND_64);
    AssetLoader.add.image64('DWN_64', DWN_64);
    var img = new Image();
    AssetLoader.progressListener = function(progress) {};
    AssetLoader.load(function() {
        var noemg = 10;
        for (let i = 0; i < 100; i++) {
            mTex_Empty.push(loadUI('EMP_64', 0, 0, 0));
            mTex_Empty[i].isEmpty = true;
            DrawTexture(mTex_Empty[i], -144 + 32 * (i % 10), -200 + 32 * Math.floor(i / 10));
        }

        for (let i = 0; i < noemg; i++) {
            mTex_Emozy.push(loadUI('E0_64', 0, 0, 0));
        }
        for (let i = 0; i < noemg; i++) {
            mTex_Emozy.push(loadUI('E1_64', 0, 0, 0));
        }
        for (let i = 0; i < noemg; i++) {
            mTex_Emozy.push(loadUI('E2_64', 0, 0, 0));
        }
        for (let i = 0; i < noemg; i++) {
            mTex_Emozy.push(loadUI('E3_64', 0, 0, 0));
        }
        for (let i = 0; i < noemg; i++) {
            mTex_Emozy.push(loadUI('E4_64', 0, 0, 0));
        }
        for (let i = 0; i < noemg; i++) {
            mTex_Emozy.push(loadUI('E5_64', 0, 0, 0));
        }
        for (let i = 0; i < noemg; i++) {
            mTex_Emozy.push(loadUI('E6_64', 0, 0, 0));
        }
        for (let i = 0; i < noemg; i++) {
            mTex_Emozy.push(loadUI('E7_64', 0, 0, 0));
        }
        for (let i = 0; i < noemg; i++) {
            mTex_Emozy.push(loadUI('E8_64', 0, 0, 0));
        }
        for (let i = 0; i < noemg; i++) {
            mTex_Emozy.push(loadUI('E9_64', 0, 0, 0));
        }
        for (let i = 0; i < mTex_Emozy.length; i++) {
            mTex_Emozy[i].stats = 0;
        }
        for (let i = 0; i < 100; i++) {
            // mTex_Empty.push(loadUI('EMP_64', 0, 0, 0));
            mTex_Empty[i].isEmpty = true;
            DrawTexture(mTex_Empty[i], -144 + 32 * (i % 10), -200 + 32 * Math.floor(i / 10));
        }
        rects.push(loadUIBar(0, 0, 300, 140, '#63c5e2'));
        rects.push(loadUIBar(0, 0, 145, 140, '#b0ffe8'));
        rects.push(loadUIBar(0, 0, 145, 140, '#ffc99d'));

        for (var i = 0; i < mTex_fonts.length; i++) {
            mTex_fonts[i] = createTexts('100', 8, fcolor, ThreeUI.anchors.center, ThreeUI.anchors.center, 'center', 'HanaleiFill');
        }
        mTex_Home = loadUI('HOM_64', 0, 0, 1);
        mTex_Cup = loadUI('CUP_64', 0, 0, 2);
        mTex_Restrt = loadUI('RST_64', 0, 0, 3);
        mTex_play = loadUI('PLY_64', 0, 0, 4);
        mTex_play.vx = 0.99;
        mTex_play.scl = 32;
        DrawTextureAX(mTex_Home, 130, 40, 1.1, ThreeUI.anchors.center, ThreeUI.anchors.top);
        DrawTextureAX(mTex_Restrt, -130, 40, 1, ThreeUI.anchors.center, ThreeUI.anchors.top);
        DrawTexture(mTex_Cup, 0, -260);
        DrawTexture(mTex_play, 0, 320);


        mTex_hand = loadUI('HND_64', 0, 0, 0);
        mTex_hand.vx = 5;
        //
        mTex_Swip = loadUI('SWP_64', 0, 0, 0);
        mTex_Swip.vx = .1;
        mTex_Swip.scl = 32;

        DrawLbl(mTex_fonts[0], "" + score, -50, -250, fcolor, 26);
        DrawLbl(mTex_fonts[1], "0", 50, -250, fcolor, 26);


        rects.push(loadUIBar(0, 0, 720, 720, '#000000'));
        mTex_DWN = loadUI('DWN_64', 0, 0, 1);

        setGame();
        Counter = 0;
    });
    // if (isMobile.any()) {
    document.addEventListener('touchstart', e => { touchEvent(e, 0); });
    document.addEventListener('touchend', e => { touchEvent(e, 2); });
    document.addEventListener('touchmove', e => { touchEvent(e, 1); });
    // } else {
    document.addEventListener('mousedown', e => { touchEvent(e, 0); });
    document.addEventListener('mousemove', e => { touchEvent(e, 1); });
    document.addEventListener('mouseup', e => { touchEvent(e, 2); });
    // }
    // document.addEventListener('keydown', dealWithKeyboard);
    window.addEventListener('resize', onWindowResize, false);
    // gameWIN() ;
    Draw();
}

function loadModel() {}
var mouse = new THREE.Vector2();
var coords = null;
var vec2 = new THREE.Vector2();
var isClick = false;

function Draw() {
    requestAnimationFrame(Draw);
    renderer.render(scene, camera);
    if (mTex_Empty.length == 0) {
        return;
    }
    gameUI.render(renderer);
    for (let i = 0; i < mBlocks.length; i++) {
        if (mBlocks[i].isActive) {
            moveBloack(mBlocks[i].type, mBlocks[i].x, mBlocks[i].y, mBlocks[i].ids, mBlocks[i].scl);
        }
    }

    for (let i = 0; i < mTex_Emozy.length; i++) {
        if (mTex_Emozy[i].stats > 2 && mTex_Emozy[i].stats < 13) {
            DrawScal(mTex_Emozy[i], MAX - mTex_Emozy[i].stats * .09, mTex_Emozy[i].stats + 1);
            if (mTex_Emozy[i].stats == 13) {
                mTex_Emozy[i].visible = false;

            }
        }
    }
    DrawAnim(mTex_play, 0, 320, mTex_play.scl * 2.56, mTex_play.scl);
    mTex_play.scl *= mTex_play.vx;
    if (mTex_play.scl > 36)
        mTex_play.vx = .99;
    if (mTex_play.scl < 26)
        mTex_play.vx = 1.01;

    if (isHand) {
        DrawAnim(mTex_Swip, 0, -170, mTex_play.scl * 4, mTex_play.scl);
        DrawAnim(mTex_hand, 30, mTex_hand.y, 64, 64);
        if (mTex_hand.y < -100) {
            mTex_hand.y = 180;
        }
        mTex_hand.y -= 3;
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
    if (type == 2 && NewGame == true) {
        Handle_Menu(4);

    }
    // console.log("~~~~~~~~~~");
    if (type == 0 && NewGame == false) {
        vec2.x = mouse.x;
        vec2.y = mouse.y;
        isClick = true;
        selblack = -1;
        for (let i = 0; i < mBlocks.length; i++) {
            if (circir(mBlocks[i].x, mBlocks[i].y, 30, mouse.x * ratio * MUL, -mouse.y * MUL, 5) && mBlocks[i].isActive) {
                selblack = i;
                isHand = false;
                mTex_Swip.visible = mTex_hand.visible = false;
            }
        }
    }
    if (type == 1 && NewGame == false) {
        // console.log(Counter + "~~~~~~~~~~" + selblack);
        if (selblack >= 0 && mBlocks[selblack].isActive) {
            mBlocks[selblack].x = mouse.x * ratio * MUL;
            mBlocks[selblack].y = -mouse.y * MUL;
            mBlocks[selblack].scl = MAX;
        }
        //
    }
    if (type == 2 && NewGame == false) {
        if (selblack >= 0) {
            if (testBloack(mBlocks[selblack])) {
                score += blockScore[mBlocks[selblack].type];
                mBlocks[selblack].isActive = false;
                var isstate = Array(10);
                var isVerticle = Array(10);
                for (let i = 0; i < 10; i++) {
                    isVerticle[i] = isstate[i] = true;
                    for (let j = 0; j < 10 && isstate[i]; j++) {
                        if (mTex_Empty[i * 10 + j].isEmpty) {
                            isstate[i] = false;
                        }
                    }
                    for (let j = 0; j < 10 && isVerticle[i]; j++) {
                        if (mTex_Empty[j * 10 + i].isEmpty) {
                            isVerticle[i] = false;
                        }
                    }
                }
                for (let i = 0; i < 10; i++) {
                    for (let j = 0; j < 10 && isstate[i]; j++) {
                        mTex_Emozy[mTex_Empty[i * 10 + j].id].stats = 3;
                        mTex_Empty[i * 10 + j].isEmpty = true;
                        score++;
                    }
                    for (let j = 0; j < 10 && isVerticle[i]; j++) {
                        mTex_Emozy[mTex_Empty[j * 10 + i].id].stats = 3;
                        mTex_Empty[j * 10 + i].isEmpty = true;
                        score++;
                    }
                    if (isVerticle[i] || isstate[i]) {
                        linecount++;
                    }
                }
                // for (let i = 0; i < mTex_Empty.length; i++) {
                //     if (!mTex_Empty[i].isEmpty)
                //         console.log(i + "  => " + mTex_Empty[i].isEmpty);
                // }
                DrawLbl(mTex_fonts[0], "" + score, -50, -250, fcolor, 26);
                if (linecount >= MAXLIN) {
                    gameWIN();
                }
            } else {
                mBlocks[selblack].x = -110 + selblack * 110;
                mBlocks[selblack].y = 200;
                mBlocks[selblack].scl = MIN;
            }
        }
        var isNewRoll = true;
        for (let i = 0; i < mBlocks.length; i++) {
            if (mBlocks[i].isActive) {
                isNewRoll = false;
            }
        }
        if (isNewRoll) {
            resetGame();
        }
        selblack = -1;
        isClick = false;
    }

}

function setGame() {
    score = 0;
    linecount = 0;
    for (let i = 0; i < 3; i++) {
        var id = random(0, 9);
        mBlocks.push(new Block(id, createBloack(id, -110 + i * 110, 200), true, -110 + i * 110, 200));
    }
}

function resetGame() {
    for (let i = 0; i < 3; i++) {
        var id = random(0, 9);
        mBlocks[i].type = id;
        mBlocks[i].ids = createBloack(id, -110 + i * 110, 200);
        mBlocks[i].isActive = true;
        mBlocks[i].x = -110 + i * 110;
        mBlocks[i].y = 200;
        mBlocks[i].scl = MIN;
    }
}

function getFreeIds(no) {
    var ids = [];
    for (let i = 0, j = 0; i < mTex_Emozy.length && j < no; i++) {
        if (!mTex_Emozy[i].visible) {
            ids.push(i);
            j++;
        }
    }
    return ids;
}

function createBloack(block, x, y) {
    switch (block) {
        case 0:
            return cL0(x, y, getFreeIds(5), MIN);
        case 1:
            return single(x, y, getFreeIds(1), MIN);
        case 2:
            return cL1(x, y, getFreeIds(5), MIN);
        case 3:
            return cSqr(x, y, getFreeIds(4), MIN);
        case 4:
            return cStrait4(x, y, getFreeIds(4), MIN);
        case 5:
            return c3R(x, y, getFreeIds(3), MIN);
        case 6:
            return c3x3(x, y, getFreeIds(9), MIN);
        case 7:
            return c1x2(x, y, getFreeIds(2), MIN);
        case 8:
            return c1x3(x, y, getFreeIds(3), MIN);
    }
}

function moveBloack(block, x, y, ids, siz) {
    switch (block) {
        case 0:
            return cL0(x, y, ids, siz);
        case 1:
            return single(x, y, ids, siz);
        case 2:
            return cL1(x, y, ids, siz);
        case 3:
            return cSqr(x, y, ids, siz);
        case 4:
            return cStrait4(x, y, ids, siz);
        case 5:
            return c3R(x, y, ids, siz);
        case 6:
            return c3x3(x, y, ids, siz);
        case 7:
            return c1x2(x, y, ids, siz);
        case 8:
            return c1x3(x, y, ids, siz);
    }
}
// * * *
// *
// *
function cL0(x, y, ids, wid) {
    for (let i = 0; i < ids.length; i++) {
        if (i < 3)
            DrawTextureS(mTex_Emozy[ids[i]], x - (32 * wid) + (32 * wid) * (i % 3), y - (32 * wid) + (32 * wid) * Math.floor(i / 3), wid, 1);
        else
            DrawTextureS(mTex_Emozy[ids[i]], x - (32 * wid), y + (i == 3 ? 0 : (32 * wid)), wid, 1);
    }
    return ids;
}

// *
function single(x, y, ids, wid) {
    for (let i = 0; i < ids.length; i++) {
        mTex_Emozy[ids[i]].stats = 1;
        DrawTextureS(mTex_Emozy[ids[i]], x, y, wid, 1);
    }
    return ids;
}

//     *
//     *
// * * *
function cL1(x, y, ids, wid) {
    for (let i = 0; i < ids.length; i++) {
        mTex_Emozy[ids[i]].stats = 1;
        if (i < 3) {
            DrawTextureS(mTex_Emozy[ids[i]], x - (32 * wid) + (32 * wid) * (i % 3), y + (32 * wid), wid, 1);
        } else
            DrawTextureS(mTex_Emozy[ids[i]], x + (32 * wid), y + (i == 3 ? 0 : -(32 * wid)), wid, 1);
    }
    return ids;
}

// * *
// * *
function cSqr(x, y, ids, wid) {
    for (let i = 0; i < ids.length; i++) {
        mTex_Emozy[ids[i]].stats = 1;
        DrawTextureS(mTex_Emozy[ids[i]], x - (16 * wid) + (32 * wid) * (i % 2), y - (16 * wid) + (32 * wid) * Math.floor(i / 2), wid, 1);
    }
    return ids;
}


// * * * *
function cStrait4(x, y, ids, wid) {
    for (let i = 0; i < ids.length; i++) {
        mTex_Emozy[ids[i]].stats = 1;
        DrawTextureS(mTex_Emozy[ids[i]], x - (48 * wid) + (32 * wid) * i, y, wid, 1);
    }
    return ids;
}

// * *
// *
function c3R(x, y, ids, wid) {
    for (let i = 0; i < ids.length; i++) {
        mTex_Emozy[ids[i]].stats = 1;
        DrawTextureS(mTex_Emozy[ids[i]], x - (16 * wid) + (32 * wid) * (i % 2), y - (16 * wid) + (32 * wid) * Math.floor(i / 2), wid, 1);
    }
    return ids;
}

// * * *
// * * *
// * * *
function c3x3(x, y, ids, wid) {
    for (let i = 0; i < ids.length; i++) {
        mTex_Emozy[ids[i]].stats = 1;
        DrawTextureS(mTex_Emozy[ids[i]], x - (32 * wid) + (32 * wid) * (i % 3), y - (32 * wid) + (32 * wid) * Math.floor(i / 3), wid, 1);
    }
    return ids;
}

// *
// *
function c1x2(x, y, ids, wid) {
    for (let i = 0; i < ids.length; i++) {
        mTex_Emozy[ids[i]].stats = 1;
        DrawTextureS(mTex_Emozy[ids[i]], x, y - (16 * wid) + (32 * wid) * i, wid, 1);
    }
    return ids;
}
// *
// *
// *
function c1x3(x, y, ids, wid) {
    for (let i = 0; i < ids.length; i++) {
        mTex_Emozy[ids[i]].stats = 1;
        DrawTextureS(mTex_Emozy[ids[i]], x, y - (32 * wid) + (32 * wid) * i, wid, 1);
    }
    return ids;
}



function Handle_Menu(clickval) {
    if (clickval == 3) {
        for (let i = 0; i < mTex_Empty.length; i++) {
            mTex_Empty[i].isEmpty = true;
        }
        for (let i = 0; i < mTex_Emozy.length; i++) {
            mTex_Emozy[i].visible = false;
        }
        resetGame();
    }
    if (clickval == 4) {
        if (isMobile.Android()) {
            mraid.open('https://play.google.com/store/apps/details?id=com.icubetechnology.tentenemojis');
        } else {
            mraid.open('https://apps.apple.com/us/app/1010-emojis/id1504590183?ls=1');
        }
        // if (isMobile.Android()) {
        //     FbPlayableAd.onCTAClick();
        // } else {
        //     FbPlayableAd.onCTAClick();
        // }
    }
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    this.gameUI.resize();
    isResize = 5;
}


function createColor() {
    r = Math.floor(Math.sin(frequency + 0) * 127 + 128);
    g = Math.floor(Math.sin(frequency + 2) * 127 + 128);
    b = Math.floor(Math.sin(frequency + 4) * 127 + 128);
    frequency += .5;
    return new THREE.Color('rgb(' + r + ',' + g + ',' + b + ')');
}

function loadUI(assetpath, x, y, clickval) {
    var sprite = gameUI.createSprite(assetpath);
    sprite.alpha = 1;
    sprite.x = x;
    sprite.y = y;
    sprite.width = sprite.width * 0.9;
    sprite.height = sprite.height * 0.9;
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
    var lbltext = this.gameUI.createText(text, size, tpye, color);
    lbltext.anchor.x = anchorx;
    lbltext.anchor.y = anchory;
    lbltext.textAlign = textAlign;
    lbltext.visible = false;
    return lbltext;
}

function DrawTextureS(tex, x, y, sx, stats) {
    tex.x = x;
    tex.y = y;
    tex.width = 32 * sx;
    tex.height = 32 * sx;
    tex.anchor.x = ThreeUI.anchors.center;
    tex.anchor.y = ThreeUI.anchors.center;
    tex.visible = true;
    tex.stats = stats;
}



function DrawTextureAX(tex, x, y, sx, ax, ay) {
    tex.x = x;
    tex.y = y;
    tex.width = 32 * sx;
    tex.height = 32 * sx;
    tex.anchor.x = ax;
    tex.anchor.y = ay;
    tex.visible = true;

}

function DrawScal(tex, sx, stats) {
    tex.width = 32 * sx;
    tex.height = 32 * sx;
    tex.stats = stats;
}

function DrawTexture(tex, x, y) {
    tex.x = x;
    tex.y = y;
    tex.width = 32;
    tex.height = 32;
    tex.visible = true;
}

function DrawAnim(tex, x, y, sx, sy) {
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

function circir(x1, y1, r1, x2, y2, r2) {
    if (r1 + r2 > Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2))) {
        return true;
    }
    return false;
}

var isMobile = {
    Android: function() { return navigator.userAgent.match(/Android/i); },
    BlackBerry: function() { return navigator.userAgent.match(/BlackBerry/i); },
    iOS: function() { return navigator.userAgent.match(/iPhone|iPad|iPod/i); },
    Opera: function() { return navigator.userAgent.match(/Opera Mini/i); },
    Windows: function() { return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i); },
    any: function() { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); }
};

function random(min, max) {
    return (min + Math.floor(Math.random() * (max - min)));
}

function loadUIBar(x, y, dx, dy, color) {
    var rect = this.gameUI.createRectangle(color, x, y, dx, dy);
    rect.alpha = 1.01;
    rect.anchor.x = ThreeUI.anchors.center;
    rect.anchor.y = ThreeUI.anchors.center;
    rect.visible = false;
    return rect;
}

function gameWIN() {
    // DrawAnim(rects[2], 76, 15,145, 140);
    // DrawAnim(rects[1], -76, 15,145, 140);
    // DrawAnim(rects[0], 0, -132,300, 140);
    // DrawTextureAX(mTex_Cup, 0, -150, 2.5, ThreeUI.anchors.center, ThreeUI.anchors.center);
    // DrawTextureAX(mTex_Home, -72, 14, 1.5, ThreeUI.anchors.center, ThreeUI.anchors.center);
    // DrawTextureAX(mTex_Restrt, 72, 14, 1.0, ThreeUI.anchors.center, ThreeUI.anchors.center);
    // DrawLbl(mTex_fonts[0], "" + score, 0, -75, '#ffffff', 40);
    // mTex_fonts[1].visible = false;
    rects[3].alpha = 0.7;
    rects[3].visible = true;
    DrawAnim(rects[3], 0, 0, 720, 720);
    DrawAnim(mTex_DWN, 0, 0, 180, 64);


    NewGame = true;
}


function testBloack(block) {
    switch (block.type) {
        case 0:
            return test_cL0(block);
        case 1:
            return test_single(block);
        case 2:
            return test_cL1(block);
        case 3:
            return test_cSqr(block);
        case 4:
            return test_cStrait4(block);
        case 5:
            return test_c3R(block);
        case 6:
            return test_c3x3(block);
        case 7:
            return test_c1x2(block);
        case 8:
            return test_c1x3(block);
    }
}

function test_cL0(block) {
    var dis = [];
    var is = [];
    for (let i = 10; i < mTex_Empty.length - 10; i++) {
        if (i % 10 != 0 && i % 10 != 9) {
            if (circir(mTex_Empty[i].x, mTex_Empty[i].y, RAD, block.x, block.y, RAD)) {
                if (mTex_Empty[i - 11].isEmpty && mTex_Empty[i - 10].isEmpty && mTex_Empty[i - 9].isEmpty && mTex_Empty[i - 1].isEmpty && mTex_Empty[i + 9].isEmpty) {
                    dis.push(Math.sqrt((mTex_Empty[i].x - block.x) * (mTex_Empty[i].x - block.x) + (mTex_Empty[i].y - block.y) * (mTex_Empty[i].y - block.y)));
                    is.push(i);
                }
            }
        }
    }
    if (dis.length > 0) {
        let i = geti(dis, is);
        DrawTextureS(mTex_Emozy[block.ids[0]], mTex_Empty[i - 11].x, mTex_Empty[i - 11].y, MAX, 2);
        DrawTextureS(mTex_Emozy[block.ids[1]], mTex_Empty[i - 10].x, mTex_Empty[i - 10].y, MAX, 2);
        DrawTextureS(mTex_Emozy[block.ids[2]], mTex_Empty[i - 9].x, mTex_Empty[i - 9].y, MAX, 2);
        DrawTextureS(mTex_Emozy[block.ids[3]], mTex_Empty[i - 1].x, mTex_Empty[i - 1].y, MAX, 2);
        DrawTextureS(mTex_Emozy[block.ids[4]], mTex_Empty[i + 9].x, mTex_Empty[i + 9].y, MAX, 2);
        mTex_Empty[i - 11].isEmpty = mTex_Empty[i - 10].isEmpty = mTex_Empty[i - 9].isEmpty = mTex_Empty[i - 1].isEmpty = mTex_Empty[i + 9].isEmpty = false;
        mTex_Empty[i - 11].id = block.ids[0];
        mTex_Empty[i - 10].id = block.ids[1];
        mTex_Empty[i - 9].id = block.ids[2];
        mTex_Empty[i - 1].id = block.ids[3];
        mTex_Empty[i + 9].id = block.ids[4];
        return true;
    }
    return false;
}

function test_single(block) {
    var dis = [];
    var is = [];
    for (let i = 0; i < mTex_Empty.length; i++) {
        if (circir(mTex_Empty[i].x, mTex_Empty[i].y, RAD, block.x, block.y, RAD) && mTex_Empty[i].isEmpty) {
            dis.push(Math.sqrt((mTex_Empty[i].x - block.x) * (mTex_Empty[i].x - block.x) + (mTex_Empty[i].y - block.y) * (mTex_Empty[i].y - block.y)));
            is.push(i);

        }
    }
    if (dis.length > 0) {
        let i = geti(dis, is);
        DrawTextureS(mTex_Emozy[block.ids[0]], mTex_Empty[i].x, mTex_Empty[i].y, MAX, 2);
        mTex_Empty[i].isEmpty = false;
        mTex_Empty[i].id = block.ids[0];
        return true;
    }
    return false;
}

function test_cL1(block) {
    var dis = [];
    var is = [];
    for (let i = 10; i < mTex_Empty.length - 10; i++) {
        if (i % 10 != 0 && i % 10 != 9) {
            if (circir(mTex_Empty[i].x, mTex_Empty[i].y, RAD, block.x, block.y, RAD)) {
                if (mTex_Empty[i + 11].isEmpty && mTex_Empty[i + 10].isEmpty && mTex_Empty[i + 9].isEmpty && mTex_Empty[i + 1].isEmpty && mTex_Empty[i - 9].isEmpty) {
                    dis.push(Math.sqrt((mTex_Empty[i].x - block.x) * (mTex_Empty[i].x - block.x) + (mTex_Empty[i].y - block.y) * (mTex_Empty[i].y - block.y)));
                    is.push(i);

                }
            }
        }
    }
    if (dis.length > 0) {
        let i = geti(dis, is);
        DrawTextureS(mTex_Emozy[block.ids[0]], mTex_Empty[i + 9].x, mTex_Empty[i + 9].y, MAX, 2);
        DrawTextureS(mTex_Emozy[block.ids[1]], mTex_Empty[i + 10].x, mTex_Empty[i + 10].y, MAX, 2);
        DrawTextureS(mTex_Emozy[block.ids[2]], mTex_Empty[i + 11].x, mTex_Empty[i + 11].y, MAX, 2);
        DrawTextureS(mTex_Emozy[block.ids[3]], mTex_Empty[i + 1].x, mTex_Empty[i + 1].y, MAX, 2);
        DrawTextureS(mTex_Emozy[block.ids[4]], mTex_Empty[i - 9].x, mTex_Empty[i - 9].y, MAX, 2);
        mTex_Empty[i + 11].isEmpty = mTex_Empty[i + 10].isEmpty = mTex_Empty[i + 9].isEmpty = mTex_Empty[i + 1].isEmpty = mTex_Empty[i - 9].isEmpty = false;

        mTex_Empty[i + 9].id = block.ids[0];
        mTex_Empty[i + 10].id = block.ids[1];
        mTex_Empty[i + 11].id = block.ids[2];
        mTex_Empty[i + 1].id = block.ids[3];
        mTex_Empty[i - 9].id = block.ids[4];

        return true;
    }
    return false;
}

function test_cSqr(block) {
    var dis = [];
    var is = [];
    for (let i = 0; i < mTex_Empty.length - 10; i++) {
        if (i % 10 != 9) {
            if (circir(mTex_Empty[i].x, mTex_Empty[i].y, RAD, block.x - (16 * MAX), block.y - (16 * MAX), RAD)) {
                console.log(mTex_Empty[i].isEmpty + " ~0~ " + mTex_Empty[i + 1].isEmpty + " ~~ " + mTex_Empty[i + 10].isEmpty + " ~~ " + mTex_Empty[i + 11].isEmpty);
                if (mTex_Empty[i].isEmpty && mTex_Empty[i + 1].isEmpty && mTex_Empty[i + 10].isEmpty && mTex_Empty[i + 11].isEmpty) {
                    dis.push(Math.sqrt((mTex_Empty[i].x - block.x) * (mTex_Empty[i].x - block.x) + (mTex_Empty[i].y - block.y) * (mTex_Empty[i].y - block.y)));
                    is.push(i);
                }
                console.log(mTex_Empty[i].isEmpty + " ~~ " + mTex_Empty[i + 1].isEmpty + " ~~ " + mTex_Empty[i + 10].isEmpty + " ~~ " + mTex_Empty[i + 11].isEmpty);
            }
        }
    }
    if (dis.length > 0) {
        let i = geti(dis, is);
        console.log(mTex_Empty[i].isEmpty + " ~1~ " + mTex_Empty[i + 1].isEmpty + " ~~ " + mTex_Empty[i + 10].isEmpty + " ~~ " + mTex_Empty[i + 11].isEmpty);
        DrawTextureS(mTex_Emozy[block.ids[0]], mTex_Empty[i].x, mTex_Empty[i].y, MAX, 2);
        DrawTextureS(mTex_Emozy[block.ids[1]], mTex_Empty[i + 1].x, mTex_Empty[i + 1].y, MAX, 2);
        DrawTextureS(mTex_Emozy[block.ids[2]], mTex_Empty[i + 10].x, mTex_Empty[i + 10].y, MAX, 2);
        DrawTextureS(mTex_Emozy[block.ids[3]], mTex_Empty[i + 11].x, mTex_Empty[i + 11].y, MAX, 2);
        mTex_Empty[i].isEmpty = mTex_Empty[i + 1].isEmpty = mTex_Empty[i + 10].isEmpty = mTex_Empty[i + 11].isEmpty = false;

        mTex_Empty[i].id = block.ids[0];
        mTex_Empty[i + 1].id = block.ids[1];
        mTex_Empty[i + 10].id = block.ids[2];
        mTex_Empty[i + 11].id = block.ids[3];


        return true;
    }
    return false;
}

function test_cStrait4(block) {
    var dis = [];
    var is = [];
    for (let i = 0; i < mTex_Empty.length; i++) {
        if (i % 10 != 0 && i % 10 != 8 && i % 10 != 9) {
            if (circir(mTex_Empty[i].x, mTex_Empty[i].y, RAD, block.x - (16 * MAX), block.y, RAD)) {
                if (mTex_Empty[i - 1].isEmpty && mTex_Empty[i].isEmpty && mTex_Empty[i + 1].isEmpty && mTex_Empty[i + 2].isEmpty) {
                    dis.push(Math.sqrt((mTex_Empty[i].x - block.x) * (mTex_Empty[i].x - block.x) + (mTex_Empty[i].y - block.y) * (mTex_Empty[i].y - block.y)));
                    is.push(i);

                }

            }
        }
    }
    if (dis.length > 0) {
        let i = geti(dis, is);
        DrawTextureS(mTex_Emozy[block.ids[0]], mTex_Empty[i - 1].x, mTex_Empty[i - 1].y, MAX, 2);
        DrawTextureS(mTex_Emozy[block.ids[1]], mTex_Empty[i + 0].x, mTex_Empty[i + 0].y, MAX, 2);
        DrawTextureS(mTex_Emozy[block.ids[2]], mTex_Empty[i + 1].x, mTex_Empty[i + 1].y, MAX, 2);
        DrawTextureS(mTex_Emozy[block.ids[3]], mTex_Empty[i + 2].x, mTex_Empty[i + 2].y, MAX, 2);
        mTex_Empty[i - 1].isEmpty = mTex_Empty[i + 0].isEmpty = mTex_Empty[i + 1].isEmpty = mTex_Empty[i + 2].isEmpty = false;


        mTex_Empty[i - 1].id = block.ids[0];
        mTex_Empty[i + 0].id = block.ids[1];
        mTex_Empty[i + 1].id = block.ids[2];
        mTex_Empty[i + 2].id = block.ids[3];


        return true;
    }
    return false;
}

function test_c3R(block) {
    var dis = [];
    var is = [];
    for (let i = 0; i < mTex_Empty.length - 10; i++) {
        if (i % 10 != 9) {
            if (circir(mTex_Empty[i].x, mTex_Empty[i].y, RAD, block.x - (16 * MAX), block.y - (16 * MAX), RAD)) {
                if (mTex_Empty[i].isEmpty && mTex_Empty[i + 1].isEmpty && mTex_Empty[i + 10].isEmpty) {
                    dis.push(Math.sqrt((mTex_Empty[i].x - block.x) * (mTex_Empty[i].x - block.x) + (mTex_Empty[i].y - block.y) * (mTex_Empty[i].y - block.y)));
                    is.push(i);
                }
            }
        }
    }
    if (dis.length > 0) {
        let i = geti(dis, is);

        DrawTextureS(mTex_Emozy[block.ids[0]], mTex_Empty[i + 0].x, mTex_Empty[i].y, MAX, 2);
        DrawTextureS(mTex_Emozy[block.ids[1]], mTex_Empty[i + 1].x, mTex_Empty[i + 1].y, MAX, 2);
        DrawTextureS(mTex_Emozy[block.ids[2]], mTex_Empty[i + 10].x, mTex_Empty[i + 10].y, MAX, 2);
        mTex_Empty[i].isEmpty = mTex_Empty[i + 1].isEmpty = mTex_Empty[i + 10].isEmpty = false;

        mTex_Empty[i + 0].id = block.ids[0];
        mTex_Empty[i + 1].id = block.ids[1];
        mTex_Empty[i + 10].id = block.ids[2];


        return true;
    }
    return false;
}

function test_c3x3(block) {
    var dis = [];
    var is = [];
    for (let i = 10; i < mTex_Empty.length - 10; i++) {
        if (i % 10 != 0 && i % 10 != 9) {
            if (circir(mTex_Empty[i].x, mTex_Empty[i].y, RAD, block.x, block.y, RAD)) {
                if (mTex_Empty[i - 11].isEmpty && mTex_Empty[i - 10].isEmpty && mTex_Empty[i - 9].isEmpty &&
                    mTex_Empty[i - 1].isEmpty && mTex_Empty[i + 0].isEmpty && mTex_Empty[i + 1].isEmpty &&
                    mTex_Empty[i + 9].isEmpty && mTex_Empty[i + 10].isEmpty && mTex_Empty[i + 11].isEmpty) {
                    dis.push(Math.sqrt((mTex_Empty[i].x - block.x) * (mTex_Empty[i].x - block.x) + (mTex_Empty[i].y - block.y) * (mTex_Empty[i].y - block.y)));
                    is.push(i);

                }
            }
        }
    }
    if (dis.length > 0) {
        let i = geti(dis, is);
        DrawTextureS(mTex_Emozy[block.ids[0]], mTex_Empty[i - 11].x, mTex_Empty[i - 11].y, MAX, 2);
        DrawTextureS(mTex_Emozy[block.ids[1]], mTex_Empty[i - 10].x, mTex_Empty[i - 10].y, MAX, 2);
        DrawTextureS(mTex_Emozy[block.ids[2]], mTex_Empty[i - 9].x, mTex_Empty[i - 9].y, MAX, 2);
        DrawTextureS(mTex_Emozy[block.ids[3]], mTex_Empty[i - 1].x, mTex_Empty[i - 1].y, MAX, 2);
        DrawTextureS(mTex_Emozy[block.ids[4]], mTex_Empty[i + 0].x, mTex_Empty[i + 0].y, MAX, 2);
        DrawTextureS(mTex_Emozy[block.ids[5]], mTex_Empty[i + 1].x, mTex_Empty[i + 1].y, MAX, 2);
        DrawTextureS(mTex_Emozy[block.ids[6]], mTex_Empty[i + 9].x, mTex_Empty[i + 9].y, MAX, 2);
        DrawTextureS(mTex_Emozy[block.ids[7]], mTex_Empty[i + 10].x, mTex_Empty[i + 10].y, MAX, 2);
        DrawTextureS(mTex_Emozy[block.ids[8]], mTex_Empty[i + 11].x, mTex_Empty[i + 11].y, MAX, 2);
        mTex_Empty[i - 11].isEmpty = mTex_Empty[i - 10].isEmpty = mTex_Empty[i - 9].isEmpty = mTex_Empty[i - 1].isEmpty = mTex_Empty[i + 0].isEmpty = false;
        mTex_Empty[i + 1].isEmpty = mTex_Empty[i + 9].isEmpty = mTex_Empty[i + 10].isEmpty = mTex_Empty[i + 11].isEmpty = false;
        mTex_Empty[i - 11].id = block.ids[0];
        mTex_Empty[i - 10].id = block.ids[1];
        mTex_Empty[i - 9].id = block.ids[2];
        mTex_Empty[i - 1].id = block.ids[3];
        mTex_Empty[i + 0].id = block.ids[4];
        mTex_Empty[i + 1].id = block.ids[5];
        mTex_Empty[i + 9].id = block.ids[6];
        mTex_Empty[i + 10].id = block.ids[7];
        mTex_Empty[i + 11].id = block.ids[8];


        return true;
    }
    return false;
}

function test_c1x2(block) {
    var dis = [];
    var is = [];
    for (let i = 0; i < mTex_Empty.length - 10; i++) {
        if (circir(mTex_Empty[i].x, mTex_Empty[i].y, RAD, block.x, block.y - (16 * MAX), RAD)) {
            if (mTex_Empty[i].isEmpty && mTex_Empty[i + 10].isEmpty) {
                dis.push(Math.sqrt((mTex_Empty[i].x - block.x) * (mTex_Empty[i].x - block.x) + (mTex_Empty[i].y - block.y) * (mTex_Empty[i].y - block.y)));
                is.push(i);
            }
        }
    }
    if (dis.length > 0) {
        let i = geti(dis, is);
        DrawTextureS(mTex_Emozy[block.ids[0]], mTex_Empty[i + 0].x, mTex_Empty[i].y, MAX, 2);
        DrawTextureS(mTex_Emozy[block.ids[1]], mTex_Empty[i + 10].x, mTex_Empty[i + 10].y, MAX, 2);
        mTex_Empty[i].isEmpty = mTex_Empty[i + 10].isEmpty = false;
        mTex_Empty[i + 0].id = block.ids[0];
        mTex_Empty[i + 10].id = block.ids[1];
        return true;
    }
    return false;
}

function test_c1x3(block) {
    var dis = [];
    var is = [];
    for (let i = 10; i < mTex_Empty.length - 10; i++) {
        if (circir(mTex_Empty[i].x, mTex_Empty[i].y, RAD, block.x, block.y, RAD)) {
            if (mTex_Empty[i - 10].isEmpty && mTex_Empty[i + 0].isEmpty && mTex_Empty[i + 10].isEmpty) {
                dis.push(Math.sqrt((mTex_Empty[i].x - block.x) * (mTex_Empty[i].x - block.x) + (mTex_Empty[i].y - block.y) * (mTex_Empty[i].y - block.y)));
                is.push(i);
            }
        }
    }
    if (dis.length > 0) {
        let i = geti(dis, is);
        DrawTextureS(mTex_Emozy[block.ids[0]], mTex_Empty[i - 10].x, mTex_Empty[i - 10].y, MAX, 2);
        DrawTextureS(mTex_Emozy[block.ids[1]], mTex_Empty[i + 0].x, mTex_Empty[i + 0].y, MAX, 2);
        DrawTextureS(mTex_Emozy[block.ids[2]], mTex_Empty[i + 10].x, mTex_Empty[i + 10].y, MAX, 2);
        mTex_Empty[i].isEmpty = mTex_Empty[i + 10].isEmpty = mTex_Empty[i - 10].isEmpty = false;
        mTex_Empty[i - 10].id = block.ids[0];
        mTex_Empty[i + 0].id = block.ids[1];
        mTex_Empty[i + 10].id = block.ids[2];
        return true;
    }
    return false;
}

function geti(dis, is) {
    let len = dis[0];
    let i = is[0];
    for (let j = 1; j < dis.length; j++) {
        if (len > dis[j]) {
            len = dis[j];
            i = is[j];
        }
    }
    return i;
}