var GameScreen = 0;
const GAMELOGO = 0;
const GAMEMENU = 1;
const GAMENUMBERS = 3;
const GAMEOVER = 4;
const GAMELEVEL = 5;
var sx = 0,
    sy = 0,
    sz = 0,
    rx = 0,
    ry = 0,
    rz = 0;
const FONTCOLOR = "#444444";
const FONTSCORE = "#c85a52";
const BUTTONFONT = "#f0f0f0";
const FONTGREEN = "#225b3d";

function loadUI(assetpath, x, y, clickval) {
    var sprite = gameUI.createSprite(assetpath);
    sprite.alpha = 1;
    sprite.x = x;
    sprite.y = y;
    sprite.width = sprite.width * .85;
    sprite.height = sprite.height * .85;
    sprite.pivot.x = 0.5;
    sprite.pivot.y = 0.5;
    sprite.anchor.x = ThreeUI.anchors.center; // Default
    sprite.anchor.y = ThreeUI.anchors.center; // Default
    sprite.visible = false;
    return sprite;
}

function loadUIScal(assetpath, x, y, sx, sy) {
    var sprite = gameUI.createSprite(assetpath);
    sprite.alpha = 1;
    sprite.x = x;
    sprite.y = y;
    sprite.width = sprite.width * sx;
    sprite.height = sprite.height * sy;
    sprite.pivot.x = 0.5;
    sprite.pivot.y = 0.5;
    sprite.anchor.x = ThreeUI.anchors.center; // Default
    sprite.anchor.y = ThreeUI.anchors.center; // Default
    sprite.visible = false;
    return sprite;
}

function loadUIS(assetpath, x, y) {
    var sprite = gameUI.createSprite(assetpath);
    sprite.alpha = 1;
    sprite.x = x;
    sprite.y = y;
    sprite.pivot.x = 0.5;
    sprite.pivot.y = 0.5;
    sprite.anchor.x = ThreeUI.anchors.right; // Default
    sprite.anchor.y = ThreeUI.anchors.bottom; // Default
    sprite.visible = false;
    sprite.alpha = 1;

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

function DrawLblRT(tex, lbl, x, y, color, siz) {
    tex.x = x;
    tex.y = y;
    tex.text = lbl;
    tex.color = color || '#fafafa';
    tex.size = siz || 50;
    tex.anchor.x = ThreeUI.anchors.right;
    tex.anchor.y = ThreeUI.anchors.top;
    tex.visible = true;
    tex.textAlign = 'right' || 'center';
}

function DrawLblLT(tex, lbl, x, y, color, siz) {
    tex.x = x;
    tex.y = y;
    tex.text = lbl;
    tex.color = color || '#fafafa';
    tex.size = siz || 50;
    tex.anchor.x = ThreeUI.anchors.left;
    tex.anchor.y = ThreeUI.anchors.top;
    tex.visible = true;
    tex.textAlign = 'left'
}

function DrawLbl(tex, lbl, x, y, color, siz, aling) {
    tex.x = x;
    tex.y = y;
    tex.text = lbl;
    tex.color = color || '#fafafa';
    tex.size = siz || 50;
    tex.anchor.x = ThreeUI.anchors.center;
    tex.anchor.y = ThreeUI.anchors.center;
    tex.textAlign = aling || 'center';
    // tex.lineHeight = 2;
    tex.visible = true;
}

function DrawTransScal(tex, x, y, sx, sy, z, t) {
    tex.x = x;
    tex.y = y;
    tex.anchor.x = ThreeUI.anchors.center; // Default
    tex.anchor.y = ThreeUI.anchors.center; // Default
    tex.width = sx * z;
    tex.height = sy * z;
    tex.visible = true;
    tex.alpha = t;
}

function DrawTextureAlign(tex, x, y, ax, ay) {
    tex.x = x;
    tex.y = y;
    tex.anchor.x = ax; // Default
    tex.anchor.y = ay; // Default
    tex.visible = true;
}

function loadUIRect(color) {
    var rect = this.gameUI.createRectangle(color || '#222222', 0, 0, window.innerWidth * 3, window.innerHeight * 3);
    rect.alpha = 1.0;
    rect.anchor.x = ThreeUI.anchors.center;
    rect.anchor.y = ThreeUI.anchors.center;
    return rect;
}

function dealWithKeyboard(e) {
    var vs = 1,
        rs = .1;
    switch (e.keyCode) {
        case 37: //Left
            sx = sx - vs;
            break;
        case 38: //Up

            sz = sz + vs;
            break;
        case 39: //right
            sx = sx + vs;
            break;
        case 40: //DOWN
            sz = sz - vs;
            break;
        case 65: //A
            sy = sy + vs;
            break;
        case 90: //Z
            sy = sy - vs;
            break;
        case 49: //1
            rx = rx - rs;
            break;
        case 50: //2
            rx = rx + rs;
            break;
        case 52: //4
            ry = ry - rs;
            break;
        case 53: //5
            ry = ry + rs;
            break;
        case 55: //7
            rz = rz - rs;
            break;
        case 56: //8
            rz = rz + rs;
            break;
        case 57: //9
            sx = sy = sz = 0;
            break;
        case 54: //6
            rx = ry = rz = 0;
            GameScreen = GAMEOVER;
            break;
        case 110: //.
            break;
    }
    // console.log("sx = " + sx + ", sy = " + sy + ", sz =" + sz);
    // console.log(e.keyCode + " rx = " + rx + ", ry = " + ry + ", rz =" + rz);

}

function createColor(i) {
    r = Math.floor(Math.sin(frequency * i + 0) * 127 + 128);
    g = Math.floor(Math.sin(frequency * i + 2) * 127 + 128);
    b = Math.floor(Math.sin(frequency * i + 4) * 127 + 128);
    return new THREE.Color('rgb(' + r + ',' + g + ',' + b + ')');
}
var isMobile = {
    Android: function() { return navigator.userAgent.match(/Android/i); },
    BlackBerry: function() { return navigator.userAgent.match(/BlackBerry/i); },
    iOS: function() { return navigator.userAgent.match(/iPhone|iPad|iPod/i); },
    Opera: function() { return navigator.userAgent.match(/Opera Mini/i); },
    Windows: function() { return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i); },
    any: function() { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); }
};

function createPlan(tex, width, hight, trans) {
    var material = new THREE.MeshBasicMaterial({ color: 0xffffff });
    var mashs = new THREE.Mesh(new THREE.PlaneBufferGeometry(width, hight, 4, 4), material); //hello123
    mashs.material.side = THREE.DoubleSide;
    mashs.material.transparent = trans;
    scene.add(mashs);
    return mashs;
}

function createPlanMesh() {
    var material = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true });
    var mashs = new THREE.Mesh(new THREE.PlaneBufferGeometry(1, 1, 1, 1), material);
    mashs.no = 0;
    //scene.add(mashs);
    return mashs;
}

function createPlayer() {
    var material = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, blending: THREE.CustomBlending, blendSrc: THREE.OneFactor, blendDst: THREE.OneMinusSrcAlphaFactor });
    var mashs = new THREE.Mesh(new THREE.PlaneBufferGeometry(2, 1, 1, 1), material);
    mashs.no = 0;
    // scene.add(mashs);
    return mashs;
}

function createPlanBox() {
    var material = new THREE.MeshBasicMaterial({ color: 0xffffff })
    var mashs = new THREE.Mesh(new THREE.PlaneBufferGeometry(4, 1, 1, 1), material);
    scene.add(mashs);
    return mashs;
}

function compRan() {
    return 0.5 - Math.random();
}

function getRan(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}