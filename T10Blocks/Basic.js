var GameScreen = 0;
const GAMELOGO = 0;
const GAMEMENU = 1;
const GAMEPLAY = 2;
const GAMEOVER = 4;
const GAMESTART = 5;
const GAMENAME = 6;
const GAMEPAUSE = 7;
const GAMELEADER = 8;
const GAMEWIN = 9;
const GAMEINVITE = 10;

const FCOLOR = "#EEEEEE";
const FCOLOR2 = "#F54D4D";

var sx = 0,
    sy = 0,
    sz = 0,
    rx = 0,
    ry = 0,
    rz = 0;

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

function createColor() {
    r = Math.floor(Math.sin(frequency + 0) * 127 + 128);
    g = Math.floor(Math.sin(frequency + 2) * 127 + 128);
    b = Math.floor(Math.sin(frequency + 4) * 127 + 128);
    frequency += Math.random();
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
        sprite.onClick(() => { Handle_Common(clickval); });
    return sprite;
}

function scale(sprite, sx) {
    sprite.width = sprite.width * sx;
    sprite.height = sprite.height * sx;
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
    tex.position.set(x, y, -54.5);
    tex.scale.set(sx, sx, sx);
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
    // tex.width = 32;
    // tex.height = 32;
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
    tex.textAlign = "center";
    tex.visible = true;
}

function DrawLblAling(tex, lbl, x, y, color, siz, alin) {
    tex.x = x;
    tex.y = y;
    tex.text = lbl;
    tex.color = color || '#fafafa';
    tex.size = siz || 50;
    tex.anchor.x = ThreeUI.anchors.center;
    tex.anchor.y = ThreeUI.anchors.center;
    tex.textAlign = alin;
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

function dealWithKeyboard(e) {
    var vs = 1,
        rs = .1;
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