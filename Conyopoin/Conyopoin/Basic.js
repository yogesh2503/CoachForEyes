var GameScreen = 0;
const GAMELOGO = 0;
const GAMEMENU = 1;
const GAMESELECT = 2;
const GAMESELCIR = 3;
const GAMESETTING = 4;
const GAMEPLAY = 5;
const GAMEOVER = 6;

const GAMENAME = 6;

const GAMEHELP = 8;
const GAMEWIN = 9;
const GAMEINVITE = 10;

const FCOLOR = "#EEEEEE";
const FCOLOR2 = "#ffe53d";

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
var frequency = 0;

function createColor(val) {
    val = val || 0;
    r = Math.floor(Math.sin(val + frequency + 0) * 127 + 128);
    g = Math.floor(Math.sin(val + frequency + 2) * 127 + 128);
    b = Math.floor(Math.sin(val + frequency + 4) * 127 + 128);
    frequency += 0.19;
    return new THREE.Color('rgb(' + r + ',' + g + ',' + b + ')');
}

function loadUI(assetpath, x, y, clickval) {
    var sprite = gameUI.createSprite(assetpath);
    sprite.alpha = 1;
    sprite.x = x;
    sprite.y = y;
    sprite.width = sprite.width * 0.7;
    sprite.height = sprite.height * 0.7;
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

function DrawTextureAX(tex, x, y, ax, ay) {
    tex.x = x;
    tex.y = y;
    tex.anchor.x = ax;
    tex.anchor.y = ay;
    tex.visible = true;

}

function DrawSprite(sprite, x, y) {
    sprite.x = x;
    sprite.y = y;
    sprite.visible = true;
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

function DrawLblAling(tex, lbl, x, y, color, siz, alin, ax, ay) {
    tex.x = x;
    tex.y = y;
    tex.text = lbl;
    tex.color = color || '#fafafa';
    tex.size = siz || 50;
    tex.anchor.x = ax || ThreeUI.anchors.center;
    tex.anchor.y = ay || ThreeUI.anchors.center;
    tex.textAlign = alin;
    tex.visible = true;
}

function circir(x1, y1, r1, x2, y2, r2) {
    if (r1 + r2 > Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2))) {
        return true;
    }
    return false;
}

function CircRectsOverlap(CRX, CRY, CRDX, CRDY, centerX, centerY, radius) {
    if ((Math.abs(centerX - CRX) <= (CRDX + radius)) && (Math.abs(centerY - CRY) <= (CRDY + radius)))
        return true;

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

function loadUIRect(color) {
    var rect;
    if (window.innerWidth > window.innerHeight)
        rect = this.gameUI.createRectangle(color || '#222222', 0, 0, window.innerWidth * 2, window.innerWidth * 2);
    else
        rect = this.gameUI.createRectangle(color || '#222222', 0, 0, window.innerHeight * 2, window.innerHeight * 2);
    rect.alpha = 1.0;
    rect.anchor.x = ThreeUI.anchors.center;
    rect.anchor.y = ThreeUI.anchors.center;
    return rect;
}

function dealWithKeyboard(e) {
    var vs = 1,
        rs = .1;
    switch (e.keyCode) {
        case 37:
            sx = sx + vs;
            // setDirections(1);
            break;
        case 38:
            sz = sz + vs;
            break;
        case 39:
            // setDirections(-1);
            sx = sx - vs;
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
        case 32:
            setScreen(GAMEPLAY)
            break;
    }
    // console.log("sx = " + sx + ", sy = " + sy + ", sz =" + sz);
    // console.log(e.keyCode + " rx = " + rx + ", ry = " + ry + ", rz =" + rz);
}

function Handle_Common(clickval) {

}


function inteceptCircleLineSeg(cx, cy, cr, l1x, l1y, l2x, l2y) {
    var a, b, c, d, u1, u2, ret, retP1, retP2, v1, v2;
    v1 = {};
    v2 = {};
    v1.x = l2x - l1x;
    v1.y = l2y - l1y;
    v2.x = l1x - cx;
    v2.y = l1y - cy;
    b = (v1.x * v2.x + v1.y * v2.y);
    c = 2 * (v1.x * v1.x + v1.y * v1.y);
    b *= -2;
    d = Math.sqrt(b * b - 2 * c * (v2.x * v2.x + v2.y * v2.y - cr * cr));
    if (isNaN(d)) { // no intercept
        return [];
        // return false;
    }
    // return true;
    u1 = (b - d) / c; // these represent the unit distance of point one and two on the line
    u2 = (b + d) / c;
    retP1 = {}; // return points
    retP2 = {}
    ret = []; // return array
    if (u1 <= 1 && u1 >= 0) { // add point if on the line segment
        retP1.x = l1x + v1.x * u1;
        retP1.y = l1y + v1.y * u1;
        ret[0] = retP1;
    }
    if (u2 <= 1 && u2 >= 0) { // second add point if on the line segment
        retP2.x = l1x + v1.x * u2;
        retP2.y = l1y + v1.y * u2;
        ret[ret.length] = retP2;
    }
    return ret;
}

function doesLineInterceptCircle(cx, cy, cr, l1x, l1y, l2x, l2y) {
    var dist;
    const v1x = l2x - l1x;
    const v1y = l2y - l1y;
    const v2x = cx - l1x;
    const v2y = cy - l1y;
    // get the unit distance along the line of the closest point to
    // circle center
    const u = (v2x * v1x + v2y * v1y) / (v1y * v1y + v1x * v1x);


    // if the point is on the line segment get the distance squared
    // from that point to the circle center
    if (u >= 0 && u <= 1) {
        dist = (l1x + v1x * u - cx) ** 2 + (l1y + v1y * u - cy) ** 2;
    } else {
        // if closest point not on the line segment
        // use the unit distance to determine which end is closest
        // and get dist square to circle
        dist = u < 0 ?
            (l1x - cx) ** 2 + (l1y - cy) ** 2 :
            (l2x - cx) ** 2 + (l2y - cy) ** 2;
    }
    return dist < cr * cr;
}

function distance(x, y) {
    return Math.sqrt((x * x) + (y * y));
}
//get angle for getting direction of movment
var getAngle = function(currX, currY, endX, endY) {
    var angle = Math.atan2(currX - endX, currY - endY) * (180 / Math.PI);
    if (angle < 0) {
        angle = Math.abs(angle);
    } else {
        angle = 360 - angle;
    }

    return angle;
};

function compRan() {
    return 0.5 - Math.random();
}

function intersectionLine(s1x, s1y, e1x, e1y, s2x, s2y, e2x, e2y) {
    const dX = e1x - s1x;
    const dY = e1y - s1y;

    const determinant = dX * (e2y - s2y) - (e2x - s2x) * dY;
    if (determinant === 0) return undefined; // parallel lines

    const lambda = ((e2y - s2y) * (e2x - s1x) + (s2x - e2x) * (e2y - s1y)) / determinant;
    const gamma = ((s1y - e1y) * (e2x - s1x) + dX * (e2y - s1y)) / determinant;

    // check if there is an intersection
    if (!(0 <= lambda && lambda <= 1) || !(0 <= gamma && gamma <= 1)) return undefined;

    return {
        x: s1x + lambda * dX,
        y: s1y + lambda * dY,
    };
}

function compare_dis(a, b) {
    // a should come before b in the sorted order
    if (a.dis < b.dis) {
        return -1;
        // a should come after b in the sorted order
    } else if (a.dis > b.dis) {
        return 1;
        // a and b are the same
    } else {
        return 0;
    }
}