var obj_Cube = null;
var objCubes = Array();
var ballDirection = 0;
var obj_BallGroup = null;
var obj_Ball = null;
var mPlan_Splash = null;
var moveDirection = 0;
const ALLS = 1;
const MAXS = 3;
var spd = .01;
var overCount = 0;

function gamereset() {
    obj_BallGroup.visible = true;
    obj_Ball.visible = true;

    objCubes.forEach(element => { element.visible = true; });
    objCubes[0].position.set(0, 0, 0);
    objCubes[0].scale.set(ALLS, ALLS, ALLS);
    objCubes[0].traverse(function(child) { if (child.isMesh) { child.material.color = createColor(); } });
    var last = 0;
    var old = 0;
    var scl = 10;
    for (let i = 1; i < objCubes.length; i++) {
        last = 0;
        if (i % 2 == 1) {
            objCubes[i].scale.set(ALLS, ALLS, scl);
            objCubes[i].position.set(objCubes[i - 1].position.x - (objCubes[i - 1].scale.x - ALLS) * (old == 0 ? -.5 : 0.5), 0, objCubes[i - 1].position.z - (scl + objCubes[i - 1].scale.z) * (last == 0 ? .5 : -.5));
        } else {
            last = Math.floor(Math.random() * 2);
            objCubes[i].scale.set(scl, ALLS, ALLS);
            objCubes[i].position.set(objCubes[i - 1].position.x - (scl + objCubes[i - 1].scale.x) * (last == 0 ? -.5 : 0.5), 0, objCubes[i - 1].position.z - (objCubes[i - 1].scale.z - ALLS) * .5);
        }
        objCubes[i].traverse(function(child) { if (child.isMesh) { child.material.color = createColor(); } });
        old = last;
        scl = ALLS * 2 + (Math.random() * MAXS);
    }
    spd = .11;
    overCount = 0;
    moveDirection = 0;
    ballDirection = 0;
    obj_BallGroup.rotation.set(0, 0, 0);
    obj_BallGroup.position.set(0, 0, 0);
    mScore = 0;
    mPlan_sky.traverse(function(child) { if (child.isMesh) { child.material.map = tex_sky[Math.floor(Math.random() * 4)]; } });

}

function DrawGameplay() {

    if (Math.PI * ballDirection * .5 > obj_BallGroup.rotation.y) {
        obj_BallGroup.rotation.y += .1;
        if (Math.PI * ballDirection * .5 < obj_BallGroup.rotation.y) {
            obj_BallGroup.rotation.y = Math.PI * ballDirection * .5;
        }
    }
    if (Math.PI * ballDirection * .5 < obj_BallGroup.rotation.y) {
        obj_BallGroup.rotation.y -= .1;
        if (Math.PI * ballDirection * .5 > obj_BallGroup.rotation.y) {
            obj_BallGroup.rotation.y = Math.PI * ballDirection * .5;
        }
    }
    obj_BallGroup.position.x -= Math.sin(Math.PI * ballDirection * .5) * spd;
    obj_BallGroup.position.z -= Math.cos(Math.PI * ballDirection * .5) * spd;

    obj_Ball.rotation.x -= Math.abs(Math.sin(Math.PI * ballDirection * .5) * spd);
    // if (Math.cos(Math.PI * ballDirection * .5) != 0)
    obj_Ball.rotation.x -= Math.cos(Math.PI * ballDirection * .5) * spd;

    mPlan_sky.position.set(obj_BallGroup.position.x, 0, obj_BallGroup.position.z);
    var isTuch = false;
    for (i = 0; i < objCubes.length; i++) {
        if (obj_BallGroup.position.z < objCubes[i].position.z - 16) {
            var j = (i == 0 ? objCubes.length : i) - 1;
            var scl = ALLS * 2 + (Math.random() * MAXS);
            last = 0;
            if (objCubes[j].scale.x < objCubes[j].scale.z) {
                last = Math.floor(Math.random() * 2);
                objCubes[i].scale.set(scl, ALLS, ALLS);
                objCubes[i].position.set(objCubes[j].position.x - (scl + objCubes[j].scale.x) * (last == 0 ? -.5 : 0.5), 0, objCubes[j].position.z - (objCubes[j].scale.z - ALLS) * .5);
            } else {
                objCubes[i].scale.set(ALLS, ALLS, scl);
                objCubes[i].position.set(objCubes[i - 1].position.x - (objCubes[i - 1].scale.x - ALLS) * (old == 0 ? -.5 : 0.5), 0, objCubes[i - 1].position.z - (scl + objCubes[i - 1].scale.z) * (last == 0 ? .5 : -.5));
            }
            old = last;
            objCubes[i].traverse(function(child) { if (child.isMesh) { child.material.color = createColor(); } });
        }


        if (CircRectsOverlap(objCubes[i].position.x, objCubes[i].position.z, objCubes[i].scale.x * .49, objCubes[i].scale.z * .49, obj_BallGroup.position.x, obj_BallGroup.position.z, .2)) {
            isTuch = true;
        }
    }
    if (isTuch == false) {
        overCount++;
        if (overCount > 5) {
            if (overCount > 50) {
                setScreen(GAMEOVER);
            }
            for (let i = 0; i < mTex_blast.length; i++) {
                mTex_blast[i].visible = Math.floor((overCount - 6) / 2) == i;
            }
            obj_Ball.visible = false;
            spd = 0;
            if (overCount == 7) {
                playSound("over");
            }
        }
    } else {
        overCount = 0;
        if (spd < .165 & Counter % 100 == 0) {
            spd += .004;
            console.log("spd = ", spd);
        }
    }
    for (i = 0; i < objCubes.length && spd != 0 && moveDirection != 0; i++) {
        if (CircRectsOverlap(objCubes[i].position.x, objCubes[i].position.z, objCubes[i].scale.x * .49, objCubes[i].scale.z * .49, obj_BallGroup.position.x, obj_BallGroup.position.z, .2)) {
            var j = (i == (objCubes.length - 1) ? 0 : (i + 1));
            if (objCubes[i].scale.x > objCubes[i].scale.z) {
                if (objCubes[i].position.x < objCubes[j].position.x) {
                    if (obj_BallGroup.position.x > objCubes[j].position.x) {
                        valueUpdate();
                        obj_BallGroup.position.x = objCubes[j].position.x;
                    }
                }
                if (objCubes[i].position.x > objCubes[j].position.x) {
                    if (obj_BallGroup.position.x < objCubes[j].position.x) {
                        valueUpdate();
                        obj_BallGroup.position.x = objCubes[j].position.x;
                    }
                }
            } else {
                if (obj_BallGroup.position.z < objCubes[j].position.z) {
                    valueUpdate();
                    obj_BallGroup.position.z = objCubes[j].position.z;

                }
            }


        }
    }
}

function valueUpdate() {
    ballDirection += moveDirection;
    moveDirection = 0;
    mScore++;
    DrawLblAling(mTex_fonts[0], "" + mScore, 50, 70, FCOLOR, 51, "left", ThreeUI.anchors.left, ThreeUI.anchors.top);
    playSound("bounce");
}

function setDirections(dir) {
    if (dir == 1) {
        moveDirection = 1;
    } else {
        moveDirection = -1;
    }
}