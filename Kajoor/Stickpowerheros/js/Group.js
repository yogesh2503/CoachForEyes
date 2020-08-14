var scalx = 0;
var rot = 0;
var isScal = 0;
var mRod = 0;
var mNxt = 0;
var newRand = 0;
var perx, pervx, perstr;
var str = ['Perfect', 'Beautiful', 'Taintless', 'Excellent', 'Wonderful', 'Amazing'];
var pNo = 0;
var rDimond = false;
var ys = [32.5, 32, 32, 32, 32, 31.5];
var mDimond = 0;
var getDimond = false;
var mDimondscore = 0;
var mTotalDimond = 0;

function DrawGamePlay() {
    DrawLblA(mTex_fonts[0], "Score : " + mScore, 16, 40, "#fafafa", 35, ThreeUI.anchors.right, ThreeUI.anchors.top, "right");
    rod[mRod].Update(scalx, rot);
    if (isScal == 1) {
        scalx += 1;
        if (setVal && !mp3_linedraw.isPlaying) {
            mp3_linedraw.play();
        }
    }
    if (isScal == 2 && rot > -1.5708) {
        rot -= .1;
        if (rot < -1.5708) {
            rot = -1.5708;
            isScal = 3;
        }
    }
    if (isScal == 3) {
        var rt = mRod + 1;
        rt %= planBase.length;
        if (mPlayer.position.x < rod[mRod].plan.scale.y + planBase[mRod].position.x + planBase[mRod].scale.x / 2) {
            mPlayer.position.x += 1;
            if (rDimond == true) {
                mPlayer.rotation.set(0, 0, 3.140);
                mPlayer.position.y = -38;
                for (var i = 0; i < planDimond.length; i++) {
                    if (planDimond[i].position.x > mPlayer.position.x - 2.1 && planDimond[i].position.x < mPlayer.position.x + 2.1) {
                        planDimond[i].position.x = -1000;
                        mDimond++;
                        mTotalDimond++;
                        getDimond = true;
                        if (setVal) {
                            mp3_coincollect.play();
                        }
                    }
                }
                if (planBase[mNxt].position.x - planBase[mNxt].scale.x / 2 < mPlayer.position.x) {
                    isScal = 12;
                    if (setVal) {
                        mp3_chafall2.play();
                    }
                }
            } else {
                mPlayer.rotation.set(0, 0, 0);
                mPlayer.position.y = -ys[pNo];
            }
        } else {
            //isScal = 10;
            var line = rod[mRod].plan.scale.y;
            var mind = ((planBase[mNxt].position.x - planBase[mRod].position.x) - planBase[mRod].scale.x / 2 - planBase[mNxt].scale.x / 2);
            var maxd = ((planBase[mNxt].position.x - planBase[mRod].position.x) - planBase[mRod].scale.x / 2 + planBase[mNxt].scale.x / 2);
            var sr = mind + (maxd - mind) / 2;
            if (mind > line || line > maxd) {
                isScal = 12;
                if (setVal) {
                    mp3_line_fall.play();
                }

            } else {
                isScal = 10;
                mScore += (Math.abs(20 - planBase[mNxt].scale.x)) * 3;
                if (getDimond == true) {
                    mScore += 30;
                    mDimondscore += 30;
                    getDimond = false;
                }
                if (line > sr - 1 && line < sr + 1) {
                    mScore += 200;
                    perx = 2;
                    pervx = 5;
                    perstr = str[random(0, str.length)];
                    if (setVal) {
                        mp3_perfect.play();
                    }
                }
                DrawLblA(mTex_fonts[0], "Score : " + mScore, 16, 40, "#fafafa", 35, ThreeUI.anchors.right, ThreeUI.anchors.top, "right");
                console.log("Score " + mScore);
            }
        }
    }
    if (perx < 600) {
        DrawLblA(mTex_fonts[1], perstr, 0, perx, createColorHexa(), 45, ThreeUI.anchors.center, ThreeUI.anchors.center, "center");
        perx += pervx;
        pervx -= .2;
    }
    if (isScal == 10) {
        if (mPlayer.position.x > -35) {
            for (var i = 0; i < planBase.length; i++) {
                planBase[i].position.x -= 1;
                planDimond[i].position.x -= 1;
                rod[i].pivot.position.x -= 1;
            }
            mPlayer.position.x -= 1;
            for (var i = 0; i < mp_BG.length; i++) {
                mp_BG[i].position.x -= 1;
            }
            for (var i = 0; i < mp_BG.length; i++) {
                if (mp_BG[i].position.x < -700)
                    mp_BG[i].position.x = mp_BG[(i == 0 ? mp_BG.length : i) - 1].position.x + 512; //mp_BG[(i == 0 ? mp_BG.length ? i)-1].position.x + 512;
            }

        } else {
            setNext();
        }
    }
    if (isScal == 11) {
        if (mPlayer.position.x < planBase[mRod].position.x + planBase[mRod].scale.x / 2 - 3) {
            mPlayer.position.x++;
        } else {
            if (planBase[mNxt].position.x > newRand) {
                planBase[mNxt].position.x -= 5;
            } else {
                planDimond[mNxt].position.x = -10;
                isScal = 0;
            }
        }
    }
    if (isScal == 12) {
        if (rot > -3.14) {
            rot -= .1;
            if (rot < -3.14) {
                rot = -3.14;
            }
        }
        if (mPlayer.position.y > -75) {
            mPlayer.position.y--;
        } else {
            mScore = Math.floor(mScore);
            if (mHScore < mScore) {
                mHScore = mScore;
            }
            mPlayer.life--;
            for (let i = 0; i < uiHeart.length; i++) {
                uiHeart[i].visible = i < mPlayer.life;
            }
            if (mPlayer.life > 0) {
                var temp = mScore;
                GameReset();
                mScore = temp;
                DrawLblA(mTex_fonts[0], "Score : " + mScore, 16, 40, "#fafafa", 35, ThreeUI.anchors.right, ThreeUI.anchors.top, "right");
            } else {
                mGScore = mScore - mGScore;
                // submitScore(GAMEOVER);
                GetBestScore();
                setScreen(GAMEOVER);
                mGScore = mScore;
            }
        }
    }
    for (var i = 0; i < red.length; i++) {
        red[i].position.set(planBase[i].position.x, -35, 0);
    }
}

function setNext() {
    if (setVal) {
        mp3_newbrick.play();
    }
    scalx = 0.1;
    rot = 0;
    mRod++;
    mRod %= planBase.length;
    newRand = 0;
    mNxt = (mRod + 1) % planBase.length;
    newRand = random(0, 35);


    planBase[mNxt].scale.x = random(4, 20);
    planBase[(mRod + 1) % planBase.length].position.set(100, -45, 0);
    rod[mRod].Setplayer(planBase[mRod].position.x + planBase[mRod].scale.x / 2, scalx, rot);
    // mPlayer.position.set(planBase[mRod].position.x+planBase[mRod].scale.x/2 - 3,-33.5,0);
    isScal = 11;
    //
}

function GameReset() {
    getDimond = false;
    mScore = 0;
    scalx = 0.1;
    rot = 0;
    isScal = 0;
    mRod = 0;
    Counter = 0;
    rDimond = false;
    //pNo = random(0,txtPlayer.length);
    // pNo++;
    pNo %= 6;
    mPlayer.material.map = txtPlayer[pNo];
    mPlayer.scale.set(1.5, pNo > 2 ? 3 : 1.5, 1.5);
    if (pNo == 5)
        mPlayer.scale.set(1, 2, 1);
    for (var i = 0; i < rod.length; i++) {
        rod[i].pivot.visible = true;
        rod[i].pivot.position.set(1000, 0, 0);
    }
    for (var i = 0; i < planBase.length; i++) {
        planBase[i].position.set(1000, -45, 0);
        planBase[i].scale.x = 15;
        planBase[i].visible = true;
        red[i].visible = true;
    }
    planBase[mRod].position.set(-35, -45, 0);
    planBase[1].position.set(0, -45, 0);
    mRod = 0;
    rod[mRod].Setplayer(planBase[mRod].position.x + planBase[mRod].scale.x / 2, scalx, rot);
    mPlayer.position.set(-35 + planBase[mRod].scale.x / 2 - 3, -ys[pNo], 0);
    mNxt = (mRod + 1) % planBase.length;
    perx = 1000;
    pervx = 1;
    perstr = str[random(0, str.length)];
    //mp_BG[0].material.map = mTex_BG[random(0, mTex_BG.length)];
    for (var i = 0; i < planDimond.length; i++) {
        planDimond[i].visible = true;
        planDimond[i].position.set(-1000, -38, 0);
    }
    mDimond = 0;
    mPlayer.rotation.set(0, 0, 0);
    DrawLblA(mTex_fonts[0], "Score : " + mScore, 16, 40, "#fafafa", 35, ThreeUI.anchors.right, ThreeUI.anchors.top, "right");
}

function tap(val) {
    if (GameScreen == GAMEPLAY) {
        if (isScal == 0 && val == 1)
            isScal = val;
        if (isScal == 1 && val == 2)
            isScal = val;
        if (isScal == 3 && val == 1) {
            rDimond = !rDimond;
            if (setVal) {
                mp3_swing.play();
            }
        }

    }
}