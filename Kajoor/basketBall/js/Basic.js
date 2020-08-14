var GameScreen = 0;
const GAMELOGO = 0;
const GAMEPLAY = 2;
const GAMEOVER = 3;
const GAMEEXT = 4;
const GAMELODING = 5;
const SCOREMUL = 3;

var sx = 0,
    sy = 0,
    sz = 0,
    rx = 0,
    ry = 0,
    rz = 0,
    clr = 0;
var vs = 5,
    rs = .1;

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
            break;
        case 54:
            rx = ry = rz = 0;
            break;
    }
    // console.log(" sx = " + sx + ", sy = " + sy + ", sz =" + sz);
    // console.log(e.keyCode + " rx = " + rx.toFixed(3) + ", ry = " + ry.toFixed(3) + ", rz =" + rz.toFixed(3));

}


var isMobile = {
    Android: function() { return navigator.userAgent.match(/Android/i); },
    BlackBerry: function() { return navigator.userAgent.match(/BlackBerry/i); },
    iOS: function() { return navigator.userAgent.match(/iPhone|iPad|iPod/i); },
    Opera: function() { return navigator.userAgent.match(/Opera Mini/i); },
    Windows: function() { return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i); },
    any: function() { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); }
};