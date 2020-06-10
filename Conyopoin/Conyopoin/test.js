var obj_Balls = Array();
var obj_Cube = Array();
var start = new THREE.Vector2();
var cmove = new THREE.Vector2();
var lineno = 0;
var linedis = 0;
var pSel = 0;
var ranNumber = Array();
const MAXDIS = 1000;
var dist = Array();
var justCheck = 0;
var isTwoPlayer = true;
var overCounter = 0;
var bestScore = 0;
var sss = 0;

function gamereset() {
    // mTex_pointer.cir = 30;
    obj_Balls.sort(compRan);
    colors.push(createColor(0));
    hsx = -1000;
    for (let i = 0; i < obj_Balls.length; i++) {
        obj_Balls[i].isUsed = false;
        obj_Balls[i].visible = mTex_pointer.cir > i;
        obj_Balls[i].children[1].material.color = colors[i];

    }
    for (var i = 0; i < obj_Cube.length; i++) {
        obj_Cube[i].sx = 0;
        obj_Cube[i].sy = 0;
        obj_Cube[i].ex = 0;
        obj_Cube[i].ey = 0;
        obj_Cube[i].isSet = false;
        obj_Cube[i].visible = false;
    }
    pSel = 0;
    justCheck = 0;
    overCounter = 0;
    findNearest();
}

function DrawGameplay() {
    DrawTransScal(mTex_restart, 0, -315, 50, 57, mSel == 1 ? 1.1 : 1, mSel == 1 ? 0.5 : 1);
    mTex_pl1sel.visible = mTex_pl2del.visible = pSel == 0;
    mTex_pl1del.visible = mTex_pl2sel.visible = pSel == 1;
    if (overCounter > 0) {
        overCounter++;
        if (overCounter > 50) {
            setScreen(GAMEOVER);
        }
    }
    if (gameNew == true) {
        handAinm();
    }
}

function Handle_Gameplay(e, type) {

    mSel = 0;
    bounds = mTex_restart.getBounds();
    if (ThreeUI.isInBoundingBox(coords.x, coords.y, bounds.x, bounds.y, bounds.width, bounds.height)) {
        mSel = 1;
        if (type == 2) {
            gamereset();
            playSound("click");
            mSel = 0;
        }
    }
    bounds = mTex_back.getBounds();
    if (ThreeUI.isInBoundingBox(coords.x, coords.y, bounds.x, bounds.y, bounds.width, bounds.height)) {
        mSel = 10;
        if (type == 2) {
            setScreen(GAMESELCIR);
            playSound("click");
            mSel = 0;
        }
    }

    if (type == 0) {
        start.x = mouse.x * ratio * MULTI;
        start.y = mouse.y * MULTI;
        isClick = false;
        sss = mouse.y;
        console.log(ratio + "  " + start.x + "  " + start.y);
        for (var i = 0; i < obj_Balls.length; i++) {
            if (circir(obj_Balls[i].position.x, obj_Balls[i].position.y, 1.6, start.x, start.y, .2) && obj_Balls[i].isUsed == false) {
                start.x = obj_Balls[i].position.x;
                start.y = obj_Balls[i].position.y;
                start.i = i;
                lineno = findLine();
                obj_Cube[lineno].sx = start.x;
                obj_Cube[lineno].sy = start.y;
                obj_Cube[lineno].visible = true;
                isClick = true;
                break;
            }
        }
    }

    if (isClick) {
        if (type == 1 && isAndroid == false)
            mouse.y = mouse.y + (mouse.y - sss) * .6;
        GetLine(start.x, start.y, start.i, mouse.x * ratio * MULTI, mouse.y * MULTI, lineno);
    }
    if (type == 2 && isClick) {
        isClick = false;
        if (dist.length > 0 && linedis == MAXDIS && obj_Balls[cmove.i].isUsed == false) {
            obj_Cube[lineno].isSet = true;
            obj_Cube[lineno].ex = cmove.x;
            obj_Cube[lineno].ey = cmove.y;
            obj_Balls[start.i].isUsed = true;
            obj_Balls[cmove.i].isUsed = true;
            pSel = pSel == 0 ? 1 : 0;
            mTex_Hand.visible = mTex_Swipe.visible = gameNew = false;
            playSound('connect');
            if (pSel == 1 && isTwoPlayer == false) {
                computerChal();
            }

        } else {
            playSound('error');
            obj_Cube[lineno].visible = false;
        }
        checkOver();

    }
}

function findLine() {
    for (var i = 0; i < obj_Cube.length; i++) {
        if (obj_Cube[i].isSet == false) {
            return i;
        }
    }
    return -1;
}


function checkOver() {
    for (let i = 0; i < obj_Balls.length && overCounter == 0; i++) {
        for (let j = i + 1; j < obj_Balls.length && obj_Balls[i].visible && obj_Balls[i].isUsed == false; j++) {
            if (obj_Balls[j].visible && obj_Balls[j].isUsed == false) {
                var reqLine = GetLine(obj_Balls[i].position.x, obj_Balls[i].position.y, i, obj_Balls[j].position.x, obj_Balls[j].position.y, -1);
                if (reqLine >= 0) {
                    return false;
                }
            }
        }
    }
    overCounter = 1;
    console.log(" gameOver  Now  ");
    return true;
}

function GetLine(_sx, _sy, _si, _x, _y, _lno) {
    dist = [];
    cmove.x = _x; //mouse.x * ratio * MULTI;
    cmove.y = _y; //mouse.y * MULTI;
    start.x = _sx;
    start.y = _sy;
    start.i = _si;
    for (var i = 0; i < obj_Balls.length; i++) {
        if (start.i != i && obj_Balls[i].visible) {
            points = inteceptCircleLineSeg(obj_Balls[i].position.x, obj_Balls[i].position.y, 1.1, start.x, start.y, cmove.x, cmove.y);
            if (points.length > 0) {
                dist.push({ pos: i, dis: distance((obj_Balls[i].position.x - start.x), (obj_Balls[i].position.y - start.y)) });
            }
        }
    };
    var sortAr = dist.sort(compare_dis);
    if (sortAr.length > 0) {
        cmove.x = obj_Balls[sortAr[0].pos].position.x;
        cmove.y = obj_Balls[sortAr[0].pos].position.y;
        cmove.i = sortAr[0].pos;
    }

    linedis = MAXDIS;
    var temp = new THREE.Vector2();
    for (var i = 0; i < obj_Cube.length; i++) {
        if (obj_Cube[i].isSet == true) {
            var point = intersectionLine(start.x, start.y, cmove.x, cmove.y, obj_Cube[i].sx, obj_Cube[i].sy, obj_Cube[i].ex, obj_Cube[i].ey);
            if (point != undefined) {
                dis = distance((point.x - start.x), (point.y - start.y));
                if (linedis > dis) {
                    linedis = dis;
                    temp.x = point.x;
                    temp.y = point.y;

                }

            }
        }
    }
    if (linedis < MAXDIS) {
        cmove.x = temp.x;
        cmove.y = temp.y;
    }

    dis = distance((start.x - cmove.x), (start.y - cmove.y));
    thita = (90 + getAngle(cmove.x, cmove.y, start.x, start.y)); //Get direction angle
    thita *= Math.PI / 180;
    if (_lno >= 0) {
        obj_Cube[_lno].scale.x = dis + .01;
        obj_Cube[_lno].rotation.z = thita;
        obj_Cube[_lno].position.x = start.x + (dis * .5 * Math.cos(thita));
        obj_Cube[_lno].position.y = start.y + (dis * .5 * Math.sin(thita));

    }
    if (dist.length > 0 && linedis == MAXDIS && obj_Balls[cmove.i].isUsed == false) {
        return cmove.i;
    }
    return -1;
}

function computerChal() {
    var cirBet = Array();
    for (let i = 0; i < obj_Balls.length; i++) {
        if (obj_Balls[i].visible && obj_Balls[i].isUsed == false) {
            cirBet.push(i);
        }
    }

    if (cirBet.length > 0) {
        cirBet.sort(compRan);
        lineno = findLine();
        obj_Cube[lineno].visible = true;
        var reqLine = -1;
        for (let i = 0; i < cirBet.length && reqLine == -1; i++) {
            for (let j = i + 1; j < cirBet.length && reqLine == -1; j++) {
                reqLine = GetLine(obj_Balls[cirBet[i]].position.x, obj_Balls[cirBet[i]].position.y, cirBet[i], obj_Balls[cirBet[j]].position.x, obj_Balls[cirBet[j]].position.y, lineno);
            }
        }

        if (dist.length > 0 && linedis == MAXDIS && obj_Balls[cmove.i].isUsed == false && reqLine >= 0) {
            obj_Cube[lineno].isSet = true;
            obj_Cube[lineno].sx = start.x;
            obj_Cube[lineno].sy = start.y;
            obj_Cube[lineno].ex = cmove.x;
            obj_Cube[lineno].ey = cmove.y;
            obj_Balls[start.i].isUsed = true;
            obj_Balls[cmove.i].isUsed = true;
            pSel = pSel == 0 ? 1 : 0;
        } else {
            obj_Cube[lineno].visible = false;
        }
    }


}

var hsx, hsy, hex, hey, hang;
var ssx = 1,
    svx = .99;
var gameNew = true;

function handAinm() {
    mTex_Hand.position.x += (Math.sin(hang) * .1);
    mTex_Hand.position.y -= (Math.cos(hang) * .1);
    if (mTex_Hand.position.y < hey) {
        mTex_Hand.position.set(hsx, hsy, 1);
    }
    mTex_Hand.visible = true;
    DrawTransScal(mTex_Swipe, 0, 120, 256, 128, ssx, 1);
    if (ssx > 1.1) {
        svx = 0.99;
    }
    if (ssx < 0.9) {
        svx = 1.01;
    }
    ssx *= svx;

}

function findNearest() {
    hsy = -16;
    hsx = 10;
    var dis = 20;
    for (let i = 0; i < obj_Balls.length && i < mTex_pointer.cir; i++) {
        if (obj_Balls[i].position.y > hsy) {
            hsy = obj_Balls[i].position.y;
        }
    }
    for (let i = 0; i < obj_Balls.length && i < mTex_pointer.cir; i++) {
        if (obj_Balls[i].position.y == hsy && obj_Balls[i].position.x < hsx) {
            hsx = obj_Balls[i].position.x;
        }
    }
    for (let i = 0; i < obj_Balls.length && i < mTex_pointer.cir; i++) {
        if (obj_Balls[i].position.y < hsy && Math.abs(obj_Balls[i].position.y - hsy) < dis) {
            dis = Math.abs(obj_Balls[i].position.y - hsy);
            hex = obj_Balls[i].position.x;
            hey = obj_Balls[i].position.y;

        }
    }
    hsx += 1.3;
    hsy -= 1.3;
    hex += 1.3;
    hey -= 1.3;
    hang = getAngle(hsx, hsy, hex, hey) * (Math.PI / 180);
    mTex_Hand.position.set(hsx, hsy, 1);

}