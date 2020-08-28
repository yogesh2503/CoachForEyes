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
function loadUIS(assetpath, x, y, sx, clickval) {
    var sprite = gameUI.createSprite(assetpath);
    sprite.alpha = 1;
    sprite.x = x;
    sprite.y = y;
    sprite.width = sprite.width * sx;
    sprite.height = sprite.height * sx;
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
function loadUIBar(x, y, dx, dy, color) {
    var rect = this.gameUI.createRectangle(color, x, y, dx * .9, dy * .5);
    rect.alpha = 1.0;
    rect.anchor.x = ThreeUI.anchors.center;
    rect.anchor.y = ThreeUI.anchors.center;
    rect.visible = false;
    return rect;
}
function createCube(x, y, color) {
    var material = new THREE.MeshBasicMaterial({ color: color });
    var geometry = new THREE.BoxBufferGeometry(2.0, 2.0, 1.0);
    var cube = new THREE.Mesh(geometry, material);
    cube.position.set(x, y, 0);
    scene.add(cube);
    return cube;
}
function Rect2RectIntersection(ax, ay, adx, ady, bx, by, bdx, bdy) {
    ax -= adx / 2;
    ay += ady / 2;
    bx -= bdx / 2;
    by += bdy / 2;
    if (ax + adx > bx && ay - ady < by && bx + bdx > ax && by - bdy < ay) {
        return true;
    }
    return false;
}
function CircRectsOverlap(CRX, CRY, CRDX, CRDY, centerX, centerY, radius) {
    if ((Math.abs(centerX - CRX) <= (CRDX + radius)) && (Math.abs(centerY - CRY) <= (CRDY + radius)))
        return true;
    return false;
}
function random(min, max) {
    return (min + Math.floor(Math.random() * (max - min)));
}
function rands(max) {
    return Math.floor(Math.random() * max);
}
function dealWithKeyboard(e) {
    var vs = 1,
        rs = .1;
    switch (e.keyCode) {
        case 188:
            gamereset();
            break;
        case 190:
            mAnim.setAnim(20);
            mAnim.setFilAination(mTube[0].group.position.x, mTube[0].group.position.y + 10, mTube[0].group.position.z);
            break;
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

function createColor() {
    clr++;
    var frequency = 0.03;
    r = Math.floor(Math.sin(frequency * clr + 0) * 127 + 128);
    g = Math.floor(Math.sin(frequency * clr + 2) * 127 + 128);
    b = Math.floor(Math.sin(frequency * clr + 4) * 127 + 128);
    return new THREE.Color('rgb(' + r + ',' + g + ',' + b + ')');
}
function wColor(clr) {
    colors = ['rgb(255,0,0)', 'rgb(255,127,0)', 'rgb(0,0,255)', 'rgb(0,255,255)',
        'rgb(85,253,0)', 'rgb(255,255,0)', 'rgb(255,0,255)', 'rgb(150,0,255)'];
    return new THREE.Color(colors[clr]);
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

function CustomSinCurve(scale) {
    THREE.Curve.call(this);
    this.scale = (scale === undefined) ? 1 : scale;
}
function Createtube(material) {
    CustomSinCurve.prototype = Object.create(THREE.Curve.prototype);
    CustomSinCurve.prototype.constructor = CustomSinCurve;
    CustomSinCurve.prototype.getPoint = function (t) {
        var tx = t * 1;
        var ty = 0;
        var tz = 0;
        return new THREE.Vector3(tx, ty, tz).multiplyScalar(this.scale);
    };
    var path = new CustomSinCurve(24);
    var geometry = new THREE.TubeGeometry(path, 32, 4.5, 8, false);
    var mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.set(0, 0, -Math.PI * .5);
    scene.add(mesh);
    return mesh;
}
