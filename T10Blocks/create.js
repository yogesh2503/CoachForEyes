const SCALE = 2;

function DrawGameplay() {
    for (let i = 0; i < mBlocks.length; i++) {
        if (mBlocks[i].isActive) {
            moveBloack(mBlocks[i].type, mBlocks[i].x, mBlocks[i].y, mBlocks[i].ids, mBlocks[i].scl);
        }
    }

    for (let i = 0; i < mTex_Emozy.length; i++) {
        if (mTex_Emozy[i].stats > 2 && mTex_Emozy[i].stats < 26) {
            DrawScal(mTex_Emozy[i], MAX - mTex_Emozy[i].stats * .09, mTex_Emozy[i].stats + 1);
            var ss = (27 - mTex_Emozy[i].stats) / 26.0;
            mTex_Emozy[i].scale.set(ss, ss, ss);
            mTex_Emozy[i].rotation.set(mTex_Emozy[i].stats * .1, mTex_Emozy[i].stats * .1, mTex_Emozy[i].stats * .1);
            if (mTex_Emozy[i].stats == 26) {
                mTex_Emozy[i].visible = false;

            }
        }
    }

    if (isHand) {
        DrawAnim(mTex_Swip, 0, -170, 128, 32);
        DrawAnim(mTex_hand, 30, mTex_hand.y, 64, 64);
        if (mTex_hand.y < -100) {
            mTex_hand.y = 180;
        }
        mTex_hand.y -= 3;
    }
    if (levelWIN > 0) {
        levelWIN++;
        if (levelWIN == 30)
            gameWIN();
    }
}

function moveBloack(block, x, y, ids, siz) {
    siz = siz + .1;
    // console.log("moveBloack");
    switch (block) {
        case 0:
            return cL0(x, y, ids, siz);
        case 1:
            return single(x, y, ids, siz);
        case 2:
            return cL1(x, y, ids, siz);
        case 3:
            return cSqr(x, y, ids, siz);
        case 4:
            return cStrait4(x, y, ids, siz);
        case 5:
            return c3R(x, y, ids, siz);
        case 6:
            return c3x3(x, y, ids, siz);
        case 7:
            return c1x2(x, y, ids, siz);
        case 8:
            return c1x3(x, y, ids, siz);
        case 9:
            return cb2x1(x, y, ids, siz);
        case 10:
            return cc4x1(x, y, ids, siz);
        case 11:
            return cd3x2(x, y, ids, siz);
        case 12:
            return ce3x1(x, y, ids, siz);
        case 13:
            return cf3x2(x, y, ids, siz);
    }
}

function createBloack(block, x, y) {

    switch (block) {
        case 0:
            return cL0(x, y, getFreeIds(5), MIN);
        case 1:
            return single(x, y, getFreeIds(1), MIN);
        case 2:
            return cL1(x, y, getFreeIds(5), MIN);
        case 3:
            return cSqr(x, y, getFreeIds(4), MIN);
        case 4:
            return cStrait4(x, y, getFreeIds(4), MIN);
        case 5:
            return c3R(x, y, getFreeIds(3), MIN);
        case 6:
            return c3x3(x, y, getFreeIds(9), MIN);
        case 7:
            return c1x2(x, y, getFreeIds(2), MIN);
        case 8:
            return c1x3(x, y, getFreeIds(3), MIN);
        case 9:
            return cb2x1(x, y, getFreeIds(2), MIN);
        case 10:
            return cc4x1(x, y, getFreeIds(4), MIN);
        case 11:
            return cd3x2(x, y, getFreeIds(4), MIN);
        case 12:
            return ce3x1(x, y, getFreeIds(3), MIN);
        case 13:
            return cf3x2(x, y, getFreeIds(4), MIN);
    }
}
// * * *
// *
// *
function cL0(x, y, ids, wid) {
    // console.log("cL0 " + ids.length);

    for (let i = 0; i < ids.length; i++) {
        if (i < 3)
            DrawTextureS(mTex_Emozy[ids[i]], x - (SCALE * wid) + (SCALE * wid) * (i % 3), y + (SCALE * wid), wid, 1);
        else
            DrawTextureS(mTex_Emozy[ids[i]], x - (SCALE * wid), y + (i == 3 ? 0 : -(SCALE * wid)), wid, 1);
    }
    return ids;
}

// *
function single(x, y, ids, wid) {
    for (let i = 0; i < ids.length; i++) {
        mTex_Emozy[ids[i]].stats = 1;
        DrawTextureS(mTex_Emozy[ids[i]], x, y, wid, 1);
    }
    return ids;
}

//     *
//     *
// * * *
function cL1(x, y, ids, wid) {
    for (let i = 0; i < ids.length; i++) {
        mTex_Emozy[ids[i]].stats = 1;
        if (i < 3) {
            DrawTextureS(mTex_Emozy[ids[i]], x - (SCALE * wid) + (SCALE * wid) * (i % 3), y - (SCALE * wid), wid, 1);
        } else
            DrawTextureS(mTex_Emozy[ids[i]], x + (SCALE * wid), y + (i == 3 ? 0 : (SCALE * wid)), wid, 1);
    }
    return ids;
}

// * *
// * *
function cSqr(x, y, ids, wid) {
    for (let i = 0; i < ids.length; i++) {
        mTex_Emozy[ids[i]].stats = 1;
        DrawTextureS(mTex_Emozy[ids[i]], x - ((SCALE * .5) * wid) + (SCALE * wid) * (i % 2), y - ((SCALE * .5) * wid) + (SCALE * wid) * Math.floor(i / 2), wid, 1);
    }
    return ids;
}


// * * * *
function cStrait4(x, y, ids, wid) {
    for (let i = 0; i < ids.length; i++) {
        mTex_Emozy[ids[i]].stats = 1;
        DrawTextureS(mTex_Emozy[ids[i]], x - (SCALE * 1.5 * wid) + (SCALE * wid) * i, y, wid, 1);
    }
    return ids;
}

// * *
// *
function c3R(x, y, ids, wid) {
    for (let i = 0; i < ids.length; i++) {
        mTex_Emozy[ids[i]].stats = 1;
        DrawTextureS(mTex_Emozy[ids[i]], x - (SCALE * .5 * wid) + (SCALE * wid) * (i % 2), y + ((SCALE * .5) * wid) - (SCALE * wid) * Math.floor(i / 2), wid, 1);
    }
    return ids;
}

// * * *
// * * *
// * * *
function c3x3(x, y, ids, wid) {
    for (let i = 0; i < ids.length; i++) {
        mTex_Emozy[ids[i]].stats = 1;
        DrawTextureS(mTex_Emozy[ids[i]], x - (SCALE * wid) + (SCALE * wid) * (i % 3), y - (SCALE * wid) + (SCALE * wid) * Math.floor(i / 3), wid, 1);
    }
    return ids;
}

// *
// *
function c1x2(x, y, ids, wid) {
    for (let i = 0; i < ids.length; i++) {
        mTex_Emozy[ids[i]].stats = 1;
        DrawTextureS(mTex_Emozy[ids[i]], x, y - ((SCALE * .5) * wid) + (SCALE * wid) * i, wid, 1);
    }
    return ids;
}
// *
// *
// *
function c1x3(x, y, ids, wid) {
    for (let i = 0; i < ids.length; i++) {
        mTex_Emozy[ids[i]].stats = 1;
        DrawTextureS(mTex_Emozy[ids[i]], x, y - (SCALE * wid) + (SCALE * wid) * i, wid, 1);
    }
    return ids;
}

// * * 
function cb2x1(x, y, ids, wid) {
    for (let i = 0; i < ids.length; i++) {
        mTex_Emozy[ids[i]].stats = 1;
        DrawTextureS(mTex_Emozy[ids[i]], x - (SCALE * wid * .5) + (SCALE * wid * i), y, wid, 1);
    }
    return ids;
}
// *
// *
// * 
// *
function cc4x1(x, y, ids, wid) {
    // console.log("cc4x1 " + ids.length);

    for (let i = 0; i < ids.length; i++) {
        mTex_Emozy[ids[i]].stats = 1;
        DrawTextureS(mTex_Emozy[ids[i]], x, y - (SCALE * 1.5 * wid) + (SCALE * wid) * i, wid, 1);
    }
    return ids;
}

//     *
// * * *
function cd3x2(x, y, ids, wid) {
    for (let i = 0; i < ids.length; i++) {
        mTex_Emozy[ids[i]].stats = 1;
        if (i < 3)
            DrawTextureS(mTex_Emozy[ids[i]], x - (SCALE * wid) + (SCALE * wid) * (i % 3), y, wid, 1);
        else
            DrawTextureS(mTex_Emozy[ids[i]], x + (SCALE * wid), y + (SCALE * wid), wid, 1);
    }
    return ids;
}

// * * *
function ce3x1(x, y, ids, wid) {
    for (let i = 0; i < ids.length; i++) {
        mTex_Emozy[ids[i]].stats = 1;
        DrawTextureS(mTex_Emozy[ids[i]], x - (SCALE * wid) + (SCALE * wid) * (i % 3), y, wid, 1);
    }
    return ids;
}
// * 
// * * *
function cf3x2(x, y, ids, wid) {
    for (let i = 0; i < ids.length; i++) {
        mTex_Emozy[ids[i]].stats = 1;
        DrawTextureS(mTex_Emozy[ids[i]], x - (SCALE * wid) + (SCALE * wid) * (i % 3), y + (SCALE * wid) * Math.floor(i / 3), wid, 1);
    }
    return ids;
}



function getFreeIds(no) {
    var ids = [];
    var color = createColor(Counter);
    for (let i = 0, j = 0; i < mTex_Emozy.length && j < no; i++) {
        if (!mTex_Emozy[i].visible) {
            mTex_Emozy[i].traverse(function(child) { if (child.isMesh) { child.material.color = color; } });
            mTex_Emozy[i].rotation.set(0, 0, 0);
            ids.push(i);
            j++;
        }
    }
    return ids;
}