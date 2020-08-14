var GameScreen = 0;
const GAMELOGO = 0;
const GAMEMENU = 1;
const GAMEPLAY = 2;
const GAMEOVER = 3;
const GAMELEADER = 4;
const GAMESTART = 5;
const GAMEHELP = 6;
const GAMECODE = 7;
const GAMEREG = 8;
const GAMEEXT = 9;
const GAMELODING = 9;

var sx = 0,
    sy = 0,
    sz = 0,
    rx = 0,
    ry = 0,
    rz = 0,
    clr = 0;
var vs = 5,
    rs = .1;

function loadUI(assetpath, x, y, clickval, anchorx, anchory) {
    var sprite = gameUI.createSprite(assetpath);
    sprite.alpha = 1;
    sprite.x = x;
    sprite.y = y;
    sprite.width = sprite.width * 1.1;
    sprite.height = sprite.height * 1.1;
    sprite.pivot.x = 0.5;
    sprite.pivot.y = 0.5;
    sprite.anchor.x = anchorx || ThreeUI.anchors.center;
    sprite.anchor.y = anchory || ThreeUI.anchors.center;
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
    sprite.anchor.x = ThreeUI.anchors.center; // Default
    sprite.anchor.y = ThreeUI.anchors.center; // Default
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

function DrawTexture(tex, x, y, isvisible) {
    tex.x = x;
    tex.y = y;
    tex.anchor.x = ThreeUI.anchors.center; // Default
    tex.anchor.y = ThreeUI.anchors.center; // Default
    tex.visible = true;
}

function DrawTextureA(tex, x, y, ax, ay) {
    tex.x = x;
    tex.y = y;
    tex.visible = true;
    tex.anchor.x = ax;
    tex.anchor.y = ay;

}

function DrawTextureS(tex, x, y, sx, sy) {
    tex.x = x;
    tex.y = y;
    tex.visible = true;
    tex.width = sx;
    tex.height = sy;
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

function DrawLblA(tex, lbl, x, y, color, siz, ax, ay, textAlign) {
    tex.x = x;
    tex.y = y;
    tex.text = lbl;
    tex.color = color || '#fafafa';
    tex.size = siz || 50;
    tex.anchor.x = ax;
    tex.anchor.y = ay;
    tex.textAlign = textAlign;
    tex.visible = true;
}

function loadUIRect(color) {
    var rect = this.gameUI.createRectangle(color || '#222222', 0, 0, window.innerWidth * 3, window.innerHeight * 3);
    rect.alpha = 1.0;
    rect.anchor.x = ThreeUI.anchors.center;
    rect.anchor.y = ThreeUI.anchors.center;
    return rect;
}

function loadUIBar(x, y, dx, dy, color) {
    var rect = this.gameUI.createRectangle(color, x, y, dx * .9, dy * .5);
    rect.alpha = 1.0;
    rect.anchor.x = ThreeUI.anchors.left;
    rect.anchor.y = ThreeUI.anchors.center;
    rect.visible = false;

    return rect;
}

function createCube(x, y, color) {
    // var material = new THREE.MeshNormalMaterial();
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

function upWithKeyboard(e) {
    switch (e.keyCode) {
        case 37: //left

            break;
        case 39: //right
            break;
        case 38: //Up
            tap(2);
            break;
        case 40: //Down

            break;
    }
    // Handle_Menu(3);
}

function dealWithKeyboard(e) {
    switch (e.keyCode) {
        case 188:
            break;
        case 190:
            break;
        case 37:
            sx = sx - vs;
            break;
        case 38:
            tap(1);
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
            //GameReset();
            //GameScreen = GAMEPLAY;
            // setScreen(GAMEPLAY);
            break;
        case 54:
            rx = ry = rz = 0;
            break;
    }
    // console.log(" sx = " + sx + ", sy = " + sy + ", sz =" + sz);
    // console.log(e.keyCode + " rx = " + rx.toFixed(3) + ", ry = " + ry.toFixed(3) + ", rz =" + rz.toFixed(3));

}

function createColor() {
    clr++;
    var frequency = 0.01;
    r = Math.floor(Math.sin(frequency * clr + 0) * 127 + 128);
    g = Math.floor(Math.sin(frequency * clr + 2) * 127 + 128);
    b = Math.floor(Math.sin(frequency * clr + 4) * 127 + 128);
    return new THREE.Color('rgb(' + r + ',' + g + ',' + b + ')');
}

function createColorHexa() {
    clr++;
    var frequency = 0.01;
    r = Math.floor(Math.sin(frequency * clr + 0) * 127 + 128);
    g = Math.floor(Math.sin(frequency * clr + 2) * 127 + 128);
    b = Math.floor(Math.sin(frequency * clr + 4) * 127 + 128);
    return "#" + fullColorHex(r, g, b);
}
var rgbToHex = function(rgb) {
    var hex = Number(rgb).toString(16);
    if (hex.length < 2) {
        hex = "0" + hex;
    }
    return hex;
};
var fullColorHex = function(r, g, b) {
    var red = rgbToHex(r);
    var green = rgbToHex(g);
    var blue = rgbToHex(b);
    return red + green + blue;
};
var isMobile = {
    Android: function() { return navigator.userAgent.match(/Android/i); },
    BlackBerry: function() { return navigator.userAgent.match(/BlackBerry/i); },
    iOS: function() { return navigator.userAgent.match(/iPhone|iPad|iPod/i); },
    Opera: function() { return navigator.userAgent.match(/Opera Mini/i); },
    Windows: function() { return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i); },
    any: function() { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); }
};

function createPlan(tex, width, hight, trans) {
    var material = new THREE.MeshBasicMaterial({ map: tex });
    var mashs = new THREE.Mesh(new THREE.PlaneBufferGeometry(width, hight, 4, 4), material); //hello123
    mashs.material.side = THREE.DoubleSide;
    mashs.material.transparent = trans;
    scene.add(mashs);
    return mashs;
}

function skyBox() {
    // skybox
    var cubeTextureLoader = new THREE.CubeTextureLoader();
    cubeTextureLoader.setPath('assets/');
    // var cubeTexture = cubeTextureLoader.load( [
    //   'right.jpg', 'left.jpg',
    //   'top.jpg', 'bottom.jpg',
    //   'front.jpg', 'back.jpg',
    // ] );
    var cubeTexture = cubeTextureLoader.load([
        '6.jpg', '6.jpg',
        '6.jpg', '6.jpg',
        '6.jpg', '6.jpg',
    ]);
    var cubeShader = THREE.ShaderLib['cube'];
    cubeShader.uniforms['tCube'].value = cubeTexture;
    var skyBoxMaterial = new THREE.ShaderMaterial({
        fragmentShader: cubeShader.fragmentShader,
        vertexShader: cubeShader.vertexShader,
        uniforms: cubeShader.uniforms,
        side: THREE.BackSide
    });
    skyBox = new THREE.Mesh(new THREE.BoxBufferGeometry(1000, 1000, 1000), skyBoxMaterial);
    scene.add(skyBox);
}