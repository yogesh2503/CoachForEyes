function Handle_Gameplay(type) {

    if (type == 0 && NewGame == false) {
        vec2.x = mouse.x;
        vec2.y = mouse.y;
        isClick = true;
        selblack = -1;

        for (let i = 0; i < mBlocks.length; i++) {
            if (circir(mBlocks[i].x, mBlocks[i].y, 2, mouse.x * ratio * MUL, mouse.y * MUL, 1) && mBlocks[i].isActive) {
                selblack = i;
                isHand = false;
                mTex_Swip.visible = mTex_hand.visible = false;
            }
        }
    }
    if (type == 1 && NewGame == false) {
        if (selblack >= 0 && mBlocks[selblack].isActive) {
            mBlocks[selblack].x = mouse.x * ratio * MUL;
            mBlocks[selblack].y = mouse.y * MUL;
            mBlocks[selblack].scl = MAX;
        }
    }
    if (type == 2 && NewGame == false) {
        if (selblack >= 0) {
            if (testBloack(mBlocks[selblack])) {
                playSound("brick");
                score += blockScore[mBlocks[selblack].type];
                mBlocks[selblack].isActive = false;
                var isstate = Array(10);
                var isVerticle = Array(10);
                var localscore = 0;
                for (let i = 0; i < 10; i++) {
                    isVerticle[i] = isstate[i] = true;
                    for (let j = 0; j < 10 && isstate[i]; j++) {
                        if (mTex_Empty[i * 10 + j].isEmpty) {
                            isstate[i] = false;
                        }
                    }
                    for (let j = 0; j < 10 && isVerticle[i]; j++) {
                        if (mTex_Empty[j * 10 + i].isEmpty) {
                            isVerticle[i] = false;
                        }
                    }
                }
                for (let i = 0; i < 10; i++) {
                    for (let j = 0; j < 10 && isstate[i]; j++) {
                        console.log((i * 10 + j) + "  => " + mTex_Empty[i * 10 + j].eid);
                        mTex_Emozy[mTex_Empty[i * 10 + j].eid].stats = 3;
                        mTex_Empty[i * 10 + j].isEmpty = true;
                        localscore++;
                    }
                    for (let j = 0; j < 10 && isVerticle[i]; j++) {
                        mTex_Emozy[mTex_Empty[j * 10 + i].eid].stats = 3;
                        mTex_Empty[j * 10 + i].isEmpty = true;
                        localscore++;
                    }
                    if (isVerticle[i] || isstate[i]) {
                        linecount++;
                    }
                }
                score += (localscore * linecount);
                DrawLblAling(mTex_fonts[0], "" + score, 0, -255, FCOLOR2, 12, "left");
                console.log(linecount + "  " + (MAXLIN + parseInt(gameLevel)) + " " + levelWIN)
                if (linecount >= MAXLIN + parseInt(gameLevel) && levelWIN == 0) {
                    // gameWIN();
                    levelWIN = 1;
                }
                if (localscore > 0) {
                    playSound("line");
                }
            } else {
                mBlocks[selblack].x = -6 + selblack * 6;
                mBlocks[selblack].y = -12;
                mBlocks[selblack].scl = MIN;
            }

        }
        var isNewRoll = true;
        for (let i = 0; i < mBlocks.length; i++) {
            if (mBlocks[i].isActive) {
                isNewRoll = false;
            }
        }
        if (isNewRoll) {
            resetGame();
        }
        selblack = -1;
        isClick = false;
    }
}

function testBloack(block) {
    switch (block.type) {
        case 0:
            return test_cL0(block);
        case 1:
            return test_single(block);
        case 2:
            return test_cL1(block);
        case 3:
            return test_cSqr(block);
        case 4:
            return test_cStrait4(block);
        case 5:
            return test_c3R(block);
        case 6:
            return test_c3x3(block);
        case 7:
            return test_c1x2(block);
        case 8:
            return test_c1x3(block);
        case 9:
            return test_cb2x1(block);
        case 10:
            return test_cc4x1(block);
        case 11:
            return test_cd3x2(block);
        case 12:
            return test_ce3x1(block);
        case 13:
            return test_cf3x2(block);
    }
}

function test_cL0(block) {
    var dis = [];
    var is = [];
    for (let i = 10; i < mTex_Empty.length - 10; i++) {
        if (i % 10 != 0 && i % 10 != 9) {
            if (circir(mTex_Empty[i].position.x, mTex_Empty[i].position.y, RAD, block.x, block.y, RAD)) {
                if (mTex_Empty[i - 11].isEmpty && mTex_Empty[i - 10].isEmpty && mTex_Empty[i - 9].isEmpty && mTex_Empty[i - 1].isEmpty && mTex_Empty[i + 9].isEmpty) {
                    dis.push(distance(block.x, block.y, mTex_Empty[i].position.x, mTex_Empty[i].position.y));
                    //dis.push(Math.sqrt((mTex_Empty[i].position.x - block.x) * (mTex_Empty[i].position.x - block.x) + (mTex_Empty[i].position.y - block.y) * (mTex_Empty[i].position.y - block.y)));
                    is.push(i);
                }
            }
        }
    }
    if (dis.length > 0) {
        let i = geti(dis, is);
        DrawTextureS(mTex_Emozy[block.ids[0]], mTex_Empty[i - 11].position.x, mTex_Empty[i - 11].position.y, MAX, 2);
        DrawTextureS(mTex_Emozy[block.ids[1]], mTex_Empty[i - 10].position.x, mTex_Empty[i - 10].position.y, MAX, 2);
        DrawTextureS(mTex_Emozy[block.ids[2]], mTex_Empty[i - 9].position.x, mTex_Empty[i - 9].position.y, MAX, 2);
        DrawTextureS(mTex_Emozy[block.ids[3]], mTex_Empty[i - 1].position.x, mTex_Empty[i - 1].position.y, MAX, 2);
        DrawTextureS(mTex_Emozy[block.ids[4]], mTex_Empty[i + 9].position.x, mTex_Empty[i + 9].position.y, MAX, 2);
        mTex_Empty[i - 11].isEmpty = mTex_Empty[i - 10].isEmpty = mTex_Empty[i - 9].isEmpty = mTex_Empty[i - 1].isEmpty = mTex_Empty[i + 9].isEmpty = false;
        mTex_Empty[i - 11].eid = block.ids[0];
        mTex_Empty[i - 10].eid = block.ids[1];
        mTex_Empty[i - 9].eid = block.ids[2];
        mTex_Empty[i - 1].eid = block.ids[3];
        mTex_Empty[i + 9].eid = block.ids[4];
        return true;
    }
    return false;
}

function test_single(block) {
    var dis = [];
    var is = [];

    for (let i = 0; i < mTex_Empty.length; i++) {
        if (circir(mTex_Empty[i].position.x, mTex_Empty[i].position.y, RAD, block.x, block.y, RAD) && mTex_Empty[i].isEmpty) {
            dis.push(distance(block.x, block.y, mTex_Empty[i].position.x, mTex_Empty[i].position.y));
            // dis.push(Math.sqrt((mTex_Empty[i].position.x - block.x) * (mTex_Empty[i].position.x - block.x) + (mTex_Empty[i].position.y - block.y) * (mTex_Empty[i].position.y - block.y)));
            is.push(i);

        }
    }
    if (dis.length > 0) {
        let i = geti(dis, is);
        DrawTextureS(mTex_Emozy[block.ids[0]], mTex_Empty[i].position.x, mTex_Empty[i].position.y, MAX, 2);
        mTex_Empty[i].isEmpty = false;
        mTex_Empty[i].eid = block.ids[0];
        return true;
    }
    return false;
}

function test_cL1(block) {
    var dis = [];
    var is = [];
    for (let i = 10; i < mTex_Empty.length - 10; i++) {
        if (i % 10 != 0 && i % 10 != 9) {
            if (circir(mTex_Empty[i].position.x, mTex_Empty[i].position.y, RAD, block.x, block.y, RAD)) {
                if (mTex_Empty[i + 11].isEmpty && mTex_Empty[i + 10].isEmpty && mTex_Empty[i + 9].isEmpty && mTex_Empty[i + 1].isEmpty && mTex_Empty[i - 9].isEmpty) {
                    dis.push(distance(block.x, block.y, mTex_Empty[i].position.x, mTex_Empty[i].position.y));
                    //dis.push(Math.sqrt((mTex_Empty[i].position.x - block.x) * (mTex_Empty[i].position.x - block.x) + (mTex_Empty[i].position.y - block.y) * (mTex_Empty[i].position.y - block.y)));
                    is.push(i);

                }
            }
        }
    }
    if (dis.length > 0) {
        let i = geti(dis, is);
        DrawTextureS(mTex_Emozy[block.ids[0]], mTex_Empty[i + 9].position.x, mTex_Empty[i + 9].position.y, MAX, 2);
        DrawTextureS(mTex_Emozy[block.ids[1]], mTex_Empty[i + 10].position.x, mTex_Empty[i + 10].position.y, MAX, 2);
        DrawTextureS(mTex_Emozy[block.ids[2]], mTex_Empty[i + 11].position.x, mTex_Empty[i + 11].position.y, MAX, 2);
        DrawTextureS(mTex_Emozy[block.ids[3]], mTex_Empty[i + 1].position.x, mTex_Empty[i + 1].position.y, MAX, 2);
        DrawTextureS(mTex_Emozy[block.ids[4]], mTex_Empty[i - 9].position.x, mTex_Empty[i - 9].position.y, MAX, 2);
        mTex_Empty[i + 11].isEmpty = mTex_Empty[i + 10].isEmpty = mTex_Empty[i + 9].isEmpty = mTex_Empty[i + 1].isEmpty = mTex_Empty[i - 9].isEmpty = false;

        mTex_Empty[i + 9].eid = block.ids[0];
        mTex_Empty[i + 10].eid = block.ids[1];
        mTex_Empty[i + 11].eid = block.ids[2];
        mTex_Empty[i + 1].eid = block.ids[3];
        mTex_Empty[i - 9].eid = block.ids[4];

        return true;
    }
    return false;
}

function test_cSqr(block) {
    var dis = [];
    var is = [];
    for (let i = 0; i < mTex_Empty.length - 10; i++) {
        if (i % 10 != 9) {
            if (circir(mTex_Empty[i].position.x, mTex_Empty[i].position.y, RAD, block.x - (SCALE * .5 * MAX), block.y + (SCALE * .5 * MAX), RAD)) {
                console.log(mTex_Empty[i].isEmpty + " ~0~ " + mTex_Empty[i + 1].isEmpty + " ~~ " + mTex_Empty[i + 10].isEmpty + " ~~ " + mTex_Empty[i + 11].isEmpty);
                if (mTex_Empty[i].isEmpty && mTex_Empty[i + 1].isEmpty && mTex_Empty[i + 10].isEmpty && mTex_Empty[i + 11].isEmpty) {
                    dis.push(distance(block.x - (SCALE * .5 * MAX), block.y + (SCALE * .5 * MAX), mTex_Empty[i].position.x, mTex_Empty[i].position.y));
                    is.push(i);
                }

            }
        }
    }

    if (dis.length > 0) {
        let i = geti(dis, is);
        DrawTextureS(mTex_Emozy[block.ids[0]], mTex_Empty[i].position.x, mTex_Empty[i].position.y, MAX, 2);
        DrawTextureS(mTex_Emozy[block.ids[1]], mTex_Empty[i + 1].position.x, mTex_Empty[i + 1].position.y, MAX, 2);
        DrawTextureS(mTex_Emozy[block.ids[2]], mTex_Empty[i + 10].position.x, mTex_Empty[i + 10].position.y, MAX, 2);
        DrawTextureS(mTex_Emozy[block.ids[3]], mTex_Empty[i + 11].position.x, mTex_Empty[i + 11].position.y, MAX, 2);
        mTex_Empty[i].isEmpty = mTex_Empty[i + 1].isEmpty = mTex_Empty[i + 10].isEmpty = mTex_Empty[i + 11].isEmpty = false;

        mTex_Empty[i].eid = block.ids[0];
        mTex_Empty[i + 1].eid = block.ids[1];
        mTex_Empty[i + 10].eid = block.ids[2];
        mTex_Empty[i + 11].eid = block.ids[3];


        return true;
    }
    return false;
}

function test_cStrait4(block) {
    var dis = [];
    var is = [];
    for (let i = 0; i < mTex_Empty.length; i++) {
        if (i % 10 != 0 && i % 10 != 8 && i % 10 != 9) {
            if (circir(mTex_Empty[i].position.x, mTex_Empty[i].position.y, RAD, block.x - (SCALE * .5 * MAX), block.y, RAD)) {
                if (mTex_Empty[i - 1].isEmpty && mTex_Empty[i].isEmpty && mTex_Empty[i + 1].isEmpty && mTex_Empty[i + 2].isEmpty) {
                    dis.push(distance(block.x - (SCALE * .5 * MAX), block.y, mTex_Empty[i].position.x, mTex_Empty[i].position.y));
                    // dis.push(Math.sqrt((mTex_Empty[i].position.x - (block.x - (SCALE * .5 * MAX))) * (mTex_Empty[i].position.x - (block.x - (SCALE * .5 * MAX))) + (mTex_Empty[i].position.y - block.y) * (mTex_Empty[i].position.y - block.y)));
                    is.push(i);

                }

            }
        }
    }
    console.log(is);
    console.log(dis);
    if (dis.length > 0) {
        let i = geti(dis, is);
        DrawTextureS(mTex_Emozy[block.ids[0]], mTex_Empty[i - 1].position.x, mTex_Empty[i - 1].position.y, MAX, 2);
        DrawTextureS(mTex_Emozy[block.ids[1]], mTex_Empty[i + 0].position.x, mTex_Empty[i + 0].position.y, MAX, 2);
        DrawTextureS(mTex_Emozy[block.ids[2]], mTex_Empty[i + 1].position.x, mTex_Empty[i + 1].position.y, MAX, 2);
        DrawTextureS(mTex_Emozy[block.ids[3]], mTex_Empty[i + 2].position.x, mTex_Empty[i + 2].position.y, MAX, 2);
        mTex_Empty[i - 1].isEmpty = mTex_Empty[i + 0].isEmpty = mTex_Empty[i + 1].isEmpty = mTex_Empty[i + 2].isEmpty = false;


        mTex_Empty[i - 1].eid = block.ids[0];
        mTex_Empty[i + 0].eid = block.ids[1];
        mTex_Empty[i + 1].eid = block.ids[2];
        mTex_Empty[i + 2].eid = block.ids[3];


        return true;
    }
    return false;
}

function test_c3R(block) {
    var dis = [];
    var is = [];
    for (let i = 0; i < mTex_Empty.length - 10; i++) {
        if (i % 10 != 9) {
            if (circir(mTex_Empty[i].position.x, mTex_Empty[i].position.y, RAD, block.x - (SCALE * .5 * MAX), block.y + (SCALE * .5 * MAX), RAD)) {
                if (mTex_Empty[i].isEmpty && mTex_Empty[i + 1].isEmpty && mTex_Empty[i + 10].isEmpty) {
                    dis.push(distance(block.x - (SCALE * .5 * MAX), block.y + (SCALE * .5 * MAX), mTex_Empty[i].position.x, mTex_Empty[i].position.y));
                    // dis.push(Math.sqrt((mTex_Empty[i].position.x - (block.x - (SCALE * .5 * MAX))) * (mTex_Empty[i].position.x - (block.x - (SCALE * .5 * MAX))) +
                    //     (mTex_Empty[i].position.y - (block.y + (SCALE * .5 * MAX))) * (mTex_Empty[i].position.y - (block.y + (SCALE * .5 * MAX)))));
                    is.push(i);
                }
            }
        }
    }
    if (dis.length > 0) {
        let i = geti(dis, is);

        DrawTextureS(mTex_Emozy[block.ids[0]], mTex_Empty[i + 0].position.x, mTex_Empty[i].position.y, MAX, 2);
        DrawTextureS(mTex_Emozy[block.ids[1]], mTex_Empty[i + 1].position.x, mTex_Empty[i + 1].position.y, MAX, 2);
        DrawTextureS(mTex_Emozy[block.ids[2]], mTex_Empty[i + 10].position.x, mTex_Empty[i + 10].position.y, MAX, 2);
        mTex_Empty[i].isEmpty = mTex_Empty[i + 1].isEmpty = mTex_Empty[i + 10].isEmpty = false;

        mTex_Empty[i + 0].eid = block.ids[0];
        mTex_Empty[i + 1].eid = block.ids[1];
        mTex_Empty[i + 10].eid = block.ids[2];


        return true;
    }
    return false;
}

function test_c3x3(block) {
    var dis = [];
    var is = [];
    for (let i = 10; i < mTex_Empty.length - 10; i++) {
        if (i % 10 != 0 && i % 10 != 9) {
            if (circir(mTex_Empty[i].position.x, mTex_Empty[i].position.y, RAD, block.x, block.y, RAD)) {
                if (mTex_Empty[i - 11].isEmpty && mTex_Empty[i - 10].isEmpty && mTex_Empty[i - 9].isEmpty &&
                    mTex_Empty[i - 1].isEmpty && mTex_Empty[i + 0].isEmpty && mTex_Empty[i + 1].isEmpty &&
                    mTex_Empty[i + 9].isEmpty && mTex_Empty[i + 10].isEmpty && mTex_Empty[i + 11].isEmpty) {
                    dis.push(distance(block.x, block.y, mTex_Empty[i].position.x, mTex_Empty[i].position.y));
                    // dis.push(Math.sqrt((mTex_Empty[i].position.x - block.x) * (mTex_Empty[i].position.x - block.x) + (mTex_Empty[i].position.y - block.y) * (mTex_Empty[i].position.y - block.y)));
                    is.push(i);

                }
            }
        }
    }
    if (dis.length > 0) {
        let i = geti(dis, is);
        DrawTextureS(mTex_Emozy[block.ids[0]], mTex_Empty[i - 11].position.x, mTex_Empty[i - 11].position.y, MAX, 2);
        DrawTextureS(mTex_Emozy[block.ids[1]], mTex_Empty[i - 10].position.x, mTex_Empty[i - 10].position.y, MAX, 2);
        DrawTextureS(mTex_Emozy[block.ids[2]], mTex_Empty[i - 9].position.x, mTex_Empty[i - 9].position.y, MAX, 2);
        DrawTextureS(mTex_Emozy[block.ids[3]], mTex_Empty[i - 1].position.x, mTex_Empty[i - 1].position.y, MAX, 2);
        DrawTextureS(mTex_Emozy[block.ids[4]], mTex_Empty[i + 0].position.x, mTex_Empty[i + 0].position.y, MAX, 2);
        DrawTextureS(mTex_Emozy[block.ids[5]], mTex_Empty[i + 1].position.x, mTex_Empty[i + 1].position.y, MAX, 2);
        DrawTextureS(mTex_Emozy[block.ids[6]], mTex_Empty[i + 9].position.x, mTex_Empty[i + 9].position.y, MAX, 2);
        DrawTextureS(mTex_Emozy[block.ids[7]], mTex_Empty[i + 10].position.x, mTex_Empty[i + 10].position.y, MAX, 2);
        DrawTextureS(mTex_Emozy[block.ids[8]], mTex_Empty[i + 11].position.x, mTex_Empty[i + 11].position.y, MAX, 2);
        mTex_Empty[i - 11].isEmpty = mTex_Empty[i - 10].isEmpty = mTex_Empty[i - 9].isEmpty = mTex_Empty[i - 1].isEmpty = mTex_Empty[i + 0].isEmpty = false;
        mTex_Empty[i + 1].isEmpty = mTex_Empty[i + 9].isEmpty = mTex_Empty[i + 10].isEmpty = mTex_Empty[i + 11].isEmpty = false;
        mTex_Empty[i - 11].eid = block.ids[0];
        mTex_Empty[i - 10].eid = block.ids[1];
        mTex_Empty[i - 9].eid = block.ids[2];
        mTex_Empty[i - 1].eid = block.ids[3];
        mTex_Empty[i + 0].eid = block.ids[4];
        mTex_Empty[i + 1].eid = block.ids[5];
        mTex_Empty[i + 9].eid = block.ids[6];
        mTex_Empty[i + 10].eid = block.ids[7];
        mTex_Empty[i + 11].eid = block.ids[8];


        return true;
    }
    return false;
}

function test_c1x2(block) {
    var dis = [];
    var is = [];
    for (let i = 0; i < mTex_Empty.length - 10; i++) {
        if (circir(mTex_Empty[i].position.x, mTex_Empty[i].position.y, RAD, block.x, block.y + (SCALE * .5 * MAX), RAD)) {
            if (mTex_Empty[i].isEmpty && mTex_Empty[i + 10].isEmpty) {
                dis.push(distance(block.x, block.y + (SCALE * .5 * MAX), mTex_Empty[i].position.x, mTex_Empty[i].position.y));
                // dis.push(Math.sqrt((mTex_Empty[i].position.x - block.x) * (mTex_Empty[i].position.x - block.x) + (mTex_Empty[i].position.y - (block.y + (SCALE * .5 * MAX))) * (mTex_Empty[i].position.y - (block.y + (SCALE * .5 * MAX)))));
                is.push(i);
            }
        }
    }
    if (dis.length > 0) {
        let i = geti(dis, is);
        DrawTextureS(mTex_Emozy[block.ids[0]], mTex_Empty[i + 0].position.x, mTex_Empty[i].position.y, MAX, 2);
        DrawTextureS(mTex_Emozy[block.ids[1]], mTex_Empty[i + 10].position.x, mTex_Empty[i + 10].position.y, MAX, 2);
        mTex_Empty[i].isEmpty = mTex_Empty[i + 10].isEmpty = false;
        mTex_Empty[i + 0].eid = block.ids[0];
        mTex_Empty[i + 10].eid = block.ids[1];
        return true;
    }
    return false;
}

function test_c1x3(block) {
    var dis = [];
    var is = [];
    for (let i = 10; i < mTex_Empty.length - 10; i++) {
        if (circir(mTex_Empty[i].position.x, mTex_Empty[i].position.y, RAD, block.x, block.y, RAD)) {
            if (mTex_Empty[i - 10].isEmpty && mTex_Empty[i + 0].isEmpty && mTex_Empty[i + 10].isEmpty) {
                dis.push(distance(block.x, block.y, mTex_Empty[i].position.x, mTex_Empty[i].position.y));
                // dis.push(Math.sqrt((mTex_Empty[i].position.x - block.x) * (mTex_Empty[i].position.x - block.x) + (mTex_Empty[i].position.y - block.y) * (mTex_Empty[i].position.y - block.y)));
                is.push(i);
            }
        }
    }
    if (dis.length > 0) {
        let i = geti(dis, is);
        DrawTextureS(mTex_Emozy[block.ids[0]], mTex_Empty[i - 10].position.x, mTex_Empty[i - 10].position.y, MAX, 2);
        DrawTextureS(mTex_Emozy[block.ids[1]], mTex_Empty[i + 0].position.x, mTex_Empty[i + 0].position.y, MAX, 2);
        DrawTextureS(mTex_Emozy[block.ids[2]], mTex_Empty[i + 10].position.x, mTex_Empty[i + 10].position.y, MAX, 2);
        mTex_Empty[i].isEmpty = mTex_Empty[i + 10].isEmpty = mTex_Empty[i - 10].isEmpty = false;
        mTex_Empty[i - 10].eid = block.ids[0];
        mTex_Empty[i + 0].eid = block.ids[1];
        mTex_Empty[i + 10].eid = block.ids[2];
        return true;
    }
    return false;
}




function test_cb2x1(block) {
    var dis = [];
    var is = [];
    for (let i = 0; i < mTex_Empty.length; i++) {
        if (i % 10 != 9) {
            if (circir(mTex_Empty[i].position.x, mTex_Empty[i].position.y, RAD, block.x - (SCALE * .5 * MAX), block.y, RAD)) {
                if (mTex_Empty[i].isEmpty && mTex_Empty[i + 1].isEmpty) {
                    dis.push(distance(block.x - (SCALE * .5 * MAX), block.y, mTex_Empty[i].position.x, mTex_Empty[i].position.y));
                    // dis.push(Math.sqrt((mTex_Empty[i].position.x - block.x) * (mTex_Empty[i].position.x - block.x) + (mTex_Empty[i].position.y - (block.y + (SCALE * .5 * MAX))) * (mTex_Empty[i].position.y - (block.y + (SCALE * .5 * MAX)))));
                    is.push(i);
                }
            }
        }
    }
    if (dis.length > 0) {
        let i = geti(dis, is);
        DrawTextureS(mTex_Emozy[block.ids[0]], mTex_Empty[i + 0].position.x, mTex_Empty[i].position.y, MAX, 2);
        DrawTextureS(mTex_Emozy[block.ids[1]], mTex_Empty[i + 1].position.x, mTex_Empty[i + 1].position.y, MAX, 2);
        mTex_Empty[i].isEmpty = mTex_Empty[i + 1].isEmpty = false;
        mTex_Empty[i + 0].eid = block.ids[0];
        mTex_Empty[i + 1].eid = block.ids[1];
        return true;
    }
    return false;
}

function test_cc4x1(block) {
    var dis = [];
    var is = [];
    for (let i = 10; i < mTex_Empty.length - 20; i++) {
        if (circir(mTex_Empty[i].position.x, mTex_Empty[i].position.y, RAD, block.x, block.y + (SCALE * .5 * MAX), RAD)) {
            if (mTex_Empty[i - 10].isEmpty && mTex_Empty[i].isEmpty && mTex_Empty[i + 10].isEmpty && mTex_Empty[i + 20].isEmpty) {
                dis.push(distance(block.x, block.y + (SCALE * .5 * MAX), mTex_Empty[i].position.x, mTex_Empty[i].position.y));
                is.push(i);
            }
        }
    }
    if (dis.length > 0) {
        let i = geti(dis, is);
        DrawTextureS(mTex_Emozy[block.ids[0]], mTex_Empty[i - 10].position.x, mTex_Empty[i - 10].position.y, MAX, 2);
        DrawTextureS(mTex_Emozy[block.ids[1]], mTex_Empty[i + 00].position.x, mTex_Empty[i + 00].position.y, MAX, 2);
        DrawTextureS(mTex_Emozy[block.ids[2]], mTex_Empty[i + 10].position.x, mTex_Empty[i + 10].position.y, MAX, 2);
        DrawTextureS(mTex_Emozy[block.ids[3]], mTex_Empty[i + 20].position.x, mTex_Empty[i + 20].position.y, MAX, 2);
        mTex_Empty[i - 10].isEmpty = mTex_Empty[i + 0].isEmpty = mTex_Empty[i + 10].isEmpty = mTex_Empty[i + 20].isEmpty = false;


        mTex_Empty[i - 10].eid = block.ids[0];
        mTex_Empty[i + 00].eid = block.ids[1];
        mTex_Empty[i + 10].eid = block.ids[2];
        mTex_Empty[i + 20].eid = block.ids[3];


        return true;
    }
    return false;

}

function test_cd3x2(block) {
    var dis = [];
    var is = [];
    for (let i = 10; i < mTex_Empty.length; i++) {
        if (i % 10 != 0 && i % 10 != 9) {
            if (circir(mTex_Empty[i].position.x, mTex_Empty[i].position.y, RAD, block.x, block.y, RAD)) {
                console.log("test_cf3x2 = " + i);
                if (mTex_Empty[i - 9].isEmpty && mTex_Empty[i - 1].isEmpty && mTex_Empty[i - 0].isEmpty && mTex_Empty[i + 1].isEmpty) {
                    dis.push(distance(block.x, block.y, mTex_Empty[i].position.x, mTex_Empty[i].position.y));
                    is.push(i);
                }
            }
        }
    }
    if (dis.length > 0) {
        let i = geti(dis, is);
        DrawTextureS(mTex_Emozy[block.ids[0]], mTex_Empty[i - 1].position.x, mTex_Empty[i - 1].position.y, MAX, 2);
        DrawTextureS(mTex_Emozy[block.ids[1]], mTex_Empty[i - 0].position.x, mTex_Empty[i - 0].position.y, MAX, 2);
        DrawTextureS(mTex_Emozy[block.ids[2]], mTex_Empty[i + 1].position.x, mTex_Empty[i + 1].position.y, MAX, 2);
        DrawTextureS(mTex_Emozy[block.ids[3]], mTex_Empty[i - 9].position.x, mTex_Empty[i - 9].position.y, MAX, 2);
        mTex_Empty[i - 1].isEmpty = mTex_Empty[i + 0].isEmpty = mTex_Empty[i + 1].isEmpty = mTex_Empty[i - 9].isEmpty = false;
        mTex_Empty[i - 1].eid = block.ids[0];
        mTex_Empty[i - 0].eid = block.ids[1];
        mTex_Empty[i + 1].eid = block.ids[2];
        mTex_Empty[i - 9].eid = block.ids[3];
        return true;
    }
    return false;
}

function test_ce3x1(block) {
    var dis = [];
    var is = [];
    for (let i = 0; i < mTex_Empty.length; i++) {
        if (i % 10 != 0 && i % 10 != 9) {
            if (circir(mTex_Empty[i].position.x, mTex_Empty[i].position.y, RAD, block.x, block.y, RAD)) {
                if (mTex_Empty[i - 1].isEmpty && mTex_Empty[i - 0].isEmpty && mTex_Empty[i + 1].isEmpty) {
                    dis.push(distance(block.x, block.y, mTex_Empty[i].position.x, mTex_Empty[i].position.y));
                    is.push(i);
                }
            }
        }
    }
    if (dis.length > 0) {
        let i = geti(dis, is);
        DrawTextureS(mTex_Emozy[block.ids[0]], mTex_Empty[i - 1].position.x, mTex_Empty[i - 1].position.y, MAX, 2);
        DrawTextureS(mTex_Emozy[block.ids[1]], mTex_Empty[i - 0].position.x, mTex_Empty[i - 0].position.y, MAX, 2);
        DrawTextureS(mTex_Emozy[block.ids[2]], mTex_Empty[i + 1].position.x, mTex_Empty[i + 1].position.y, MAX, 2);
        mTex_Empty[i - 1].isEmpty = mTex_Empty[i + 0].isEmpty = mTex_Empty[i + 1].isEmpty = false;
        mTex_Empty[i - 1].eid = block.ids[0];
        mTex_Empty[i - 0].eid = block.ids[1];
        mTex_Empty[i + 1].eid = block.ids[2];
        return true;
    }
    return false;
}

function test_cf3x2(block) {
    var dis = [];
    var is = [];
    for (let i = 10; i < mTex_Empty.length; i++) {
        if (i % 10 != 0 && i % 10 != 9) {
            if (circir(mTex_Empty[i].position.x, mTex_Empty[i].position.y, RAD, block.x, block.y, RAD)) {
                console.log("test_cf3x2 = " + i);
                if (mTex_Empty[i - 11].isEmpty && mTex_Empty[i - 1].isEmpty && mTex_Empty[i - 0].isEmpty && mTex_Empty[i + 1].isEmpty) {
                    dis.push(distance(block.x, block.y, mTex_Empty[i].position.x, mTex_Empty[i].position.y));
                    is.push(i);
                }
            }
        }
    }
    if (dis.length > 0) {
        let i = geti(dis, is);
        DrawTextureS(mTex_Emozy[block.ids[0]], mTex_Empty[i - 1].position.x, mTex_Empty[i - 1].position.y, MAX, 2);
        DrawTextureS(mTex_Emozy[block.ids[1]], mTex_Empty[i - 0].position.x, mTex_Empty[i - 0].position.y, MAX, 2);
        DrawTextureS(mTex_Emozy[block.ids[2]], mTex_Empty[i + 1].position.x, mTex_Empty[i + 1].position.y, MAX, 2);
        DrawTextureS(mTex_Emozy[block.ids[3]], mTex_Empty[i - 11].position.x, mTex_Empty[i - 11].position.y, MAX, 2);
        mTex_Empty[i - 1].isEmpty = mTex_Empty[i + 0].isEmpty = mTex_Empty[i + 1].isEmpty = mTex_Empty[i - 11].isEmpty = false;
        mTex_Empty[i - 1].eid = block.ids[0];
        mTex_Empty[i - 0].eid = block.ids[1];
        mTex_Empty[i + 1].eid = block.ids[2];
        mTex_Empty[i - 11].eid = block.ids[3];
        return true;
    }
    return false;
}


function geti(dis, is) {
    let len = dis[0];
    let i = is[0];
    for (let j = 1; j < dis.length; j++) {
        if (len > dis[j]) {
            len = dis[j];
            i = is[j];
        }
    }
    return i;
}

function distance(x1, y1, x2, y2) {
    return Math.sqrt(((x1 - x2) * (x1 - x2)) + ((y1 - y2) * (y1 - y2)));

}