const ROT_SPD = .2;
const MAX_ANG = .25;
var overCount = 0;

function gamereset() {
    obj_Base[0].position.set(0, 0, 0);
    for (var i = 0; i < obj_Base.length; i++) {
        obj_Base[i].children[0].traverse(function(child) {
            if (child.isMesh) {
                var color = createColor();
                child.material.color = color;
            }
        });
        obj_Base[i].scale.set(3, 1, 12);
        if (i < 5) {
            obj_Base[i].rotation.set(0, 0, 0);
            obj_Base[i].angle = 0;
        } else {
            obj_Base[i].angle = obj_Base[i - 1].angle + (Math.random() > .5 ? 1 : -1);
            obj_Base[i].rotation.set(0, 0, obj_Base[i].angle * Math.PI * MAX_ANG);
        }
        if (i > 0)
            obj_Base[i].position.set(0, 0, obj_Base[i - 1].position.z - (obj_Base[i - 1].scale.z + obj_Base[i].scale.z) * 1.01);
    }
    overCount = 0;
    obj_World.rot = 0;
    obj_World.dir = 0;
    obj_World.ang = 0;
    obj_World.rotation.set(0, 0, 0);

    obj_Ball.spd = .8;
    obj_Ball.vy = .1;
    obj_Ball.position.y = -9.0;
    mScore = 0;
    obj_World.visible = true;

    obj_Ball.visible = true;
    mPlan_Shadow.visible = true;
    mPlan_Splash.traverse(function(child) {
        if (child.isMesh) {
            var no = Math.floor(Math.random() * 4);
            console.log("no = " + no);
            child.material.map = tex_Splash[no];
        }
    });
}

function drawGameplay() {
    obj_Ball.rotation.x = -Counter * .2;
    for (var i = 0; i < obj_Base.length && overCount == 0; i++) {
        obj_Base[i].position.z += obj_Ball.spd;
        if (obj_Base[i].position.z > -obj_Base[i].scale.z && obj_Base[i].position.z < obj_Base[i].scale.z && obj_Ball.position.y <= -8.9) {
            if ((obj_World.ang + obj_Base[i].angle) != 0) {
                obj_Ball.spd = 0;
                overCount = 1;
            }
        }
    }
    for (var i = 0; i < obj_Base.length; i++) {
        if (obj_Base[i].position.z > 50) {
            obj_Base[i].scale.set(3, 1, 7 + Math.random() * 10);
            var ik = (i == 0 ? obj_Base.length : i) - 1;
            obj_Base[i].position.z = obj_Base[ik].position.z - (obj_Base[ik].scale.z + obj_Base[i].scale.z);
            obj_Base[i].angle = obj_Base[ik].angle + (Math.random() > .5 ? 1 : -1);
            obj_Base[i].rotation.set(0, 0, obj_Base[i].angle * Math.PI * MAX_ANG);
            obj_Base[i].children[0].traverse(function(child) {
                if (child.isMesh) {
                    var color = createColor();
                    child.material.color = color;
                }
            });
        }
    }
    if (obj_World.rot != 0) {
        obj_World.rotation.z += obj_World.dir * ROT_SPD;
        obj_World.rot -= obj_World.dir * ROT_SPD;
        if (obj_World.dir < 0) {
            if (obj_World.rot > 0) {
                obj_World.rot = 0;
                obj_World.rotation.z = obj_World.ang * Math.PI * MAX_ANG;
            }
        }
        if (obj_World.dir > 0 && obj_World.rot < 0) {
            obj_World.rot = 0;
            obj_World.rotation.z = obj_World.ang * Math.PI * MAX_ANG;

        }
    }
    if (obj_Ball.position.y > -9) {
        obj_Ball.position.y += obj_Ball.position.vy;
        var sc = .5 + (-obj_Ball.position.y) / 20;
        mPlan_Shadow.scale.set(sc, sc, sc);
        obj_Ball.scale.set(sc, 1, 1);
        obj_Ball.position.vy -= .25;
        if (obj_Ball.position.y < -9) {
            obj_Ball.position.y = -9;
        }
    }
    if (obj_Ball.spd > .3 && obj_Ball.spd < 1.8 && Counter % 200 == 0) {
        obj_Ball.spd += .1;
    }
    if (overCount > 0) {
        for (var i = 0; i < mTex_blast.length; i++) {
            mTex_blast[i].visible = (i == Math.floor(overCount / 2));
        }
        overCount++;
        obj_Ball.visible = false;
        mPlan_Shadow.visible = false;
        if (overCount > 50) {
            gameover();
        }
        if (overCount == 2) {
            playSound("over");
        }
    }
}

function setDirections(dir) {
    if (obj_Ball.spd > .3 && obj_World.rot == 0) {
        var isCollide = false;
        for (var i = 0; i < obj_Base.length && isCollide == false; i++) {
            if (obj_Base[i].position.z > -obj_Base[i].scale.z && obj_Base[i].position.z < obj_Base[i].scale.z) {
                if ((obj_World.ang + obj_Base[i].angle) != 0) {
                    obj_Ball.spd = 0;
                    overCount = 1;
                    return;
                }
            }
        }
        obj_World.dir = dir;
        if (obj_World.dir == -1) //Left
        {
            obj_World.ang -= 1;
            obj_World.rot = -Math.PI * MAX_ANG;
        }
        if (obj_World.dir == 1) //ritght
        {
            obj_World.ang += 1;
            obj_World.rot = Math.PI * MAX_ANG;
        }
        playSound("bounce");
        obj_Ball.position.y = -8.5;
        obj_Ball.position.vy = 1.6;
        mScore++;
        DrawLblAling(mTex_fonts[0], "" + mScore, 96, 35, FCOLOR2, 10, "center", ThreeUI.anchors.left, ThreeUI.anchors.top);
    }
}

function detectCollisionCubes(object1, object2) {
    object2.geometry.computeBoundingBox();
    object1.geometry.computeBoundingBox(); //not needed if its already calculated

    object1.updateMatrixWorld();
    object2.updateMatrixWorld();

    var box1 = object1.geometry.boundingBox.clone();
    box1.applyMatrix4(object1.matrixWorld);

    var box2 = object2.geometry.boundingBox.clone();
    box2.applyMatrix4(object2.matrixWorld);

    return box1.intersectsBox(box2);
}

function gameover() {
    if (bestScore < mScore) {
        bestScore = mScore;
    }
    setScreen(GAMEOVER);
    setStore();
}