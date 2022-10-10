var mLife = 3;
var overCount = 0;

function DrawGamePlay() {
    if (mWinCnt == 0 && isStart) {
        // var t         = (System.currentTimeMillis()-mGameTime);	
        var t = (Date.now() - mGameTime);
        mTimeCnt = ((t / 1000) + ((t % 10) / 1000));
        mTimeCnt = mTimeCnt.toFixed(2);
        // console.log("Time==========    "+mTimeCnt);
        // mTimeCnt    = new BigDecimal(mTimeCnt).setScale(1,BigDecimal.ROUND_HALF_UP).floatValue();
    }
    DrawScene();
    for (var i = 0; i < mbubble.length; i++) {
        if (mbubble[i].x > -1 && mbubble[i].x < 1) {
            if (mbubble[i].isShow && mStep[i % mStep.length].isOn) {
                var yy = -.575;
                if (mStep[i % mStep.length].no == 3)
                    yy = -.555;
                DrawTransScal(mTex_Ripple, mbubble[i].x, yy, mbubble[i].z, 1 - (mbubble[i].z) * .4);
            }
            mbubble[i].updateBubble();
        }
    }
    for (var i = 0; i < mStep.length; i++) {
        if (mStep[i].x > -1.2 && mStep[i].x < 1.2) {
            if (mStep[i].isOn) {
                var yy = -.45;
                if (mStep[i].no == 3)
                    yy = -.42;
                var y = parseFloat(DegreeToRadian((mStep[i].moveCnt) % 360));
                // console.log("  NNNNNNN    " + mStep[i].no);
                if (i == st)
                    DrawTexture(mTex_Step[mStep[i].no], mStep[i].x, (yy - Math.abs(Math.sin(y) * .025)) + hilana);
                else
                    DrawTexture(mTex_Step[mStep[i].no], mStep[i].x, (yy - Math.abs(Math.sin(y) * .025)));
            } else if (jumpCount < mTex_WaterAni.length && mStep[i].x > plrx - .05 && mStep[i].x < plrx + .25) {
                overCount++;
                if (jumpCount < 2)
                    DrawTexture(mTex_Frog[jumpCount + 6], mStep[i].x, -.35);

                DrawTexture(mTex_WaterAni[jumpCount % mTex_WaterAni.length], mStep[i].x + .05, -.40);
                if (Counter % 2 == 0)
                    jumpCount++;

                if (jumpCount > mTex_WaterAni.length - 1) {
                    mLife--;
                    if (mLife > 0) {
                        setlife();
                    } else {
                        if (setValue)
                            Snd_OVer.play();
                        if (mGameMode > 1)
                            UpDateScore(mGameMode);

                        mAni = .01;
                        mMenuAni = .005;
                        GameScreen = GAMEOVER;
                        setBubble();
                        Snd_GamePlay.stop();
                        GetBestScore();
                    }

                }
            }
        }
    }

    if (jumpCount >= mTex_WaterAni.length) {

        if (mCharAni >= 1 && mCharAni < 8) {
            DrawTexture(mTex_Frog[mCharAni], plrx, plry);
        } else {
            var y = DegreeToRadian((mStep[st].moveCnt) % 360);
            DrawTexture(mTex_Frog[0], plrx, (plry - Math.abs(Math.sin(y) * .025)) + hilana);

        }
    }
    DrawTexture(mTex_bgDark[mGameMode], BGDark[0], 0);
    DrawTexture(mTex_bgDark[mGameMode], BGDark[1], 0);

    DrawTransScal(mTex_BOne, -.80, -.8, mSel == 1 ? 1.15 : 1, mSel == 1 ? 0.5 : 1);
    DrawTransScal(mTex_BTwo, .80, -.8, mSel == 2 ? 1.15 : 1, mSel == 2 ? 0.5 : 1);
    // DrawTransScal(mTex_Pause, -.889, .819, mSel == 3 ? 1.15 : 1, mSel == 3 ? 0.5 : 1);

    DrawTexture(mTex_ScoreBox, .829, .869);
    if (mGameMode == 0)
        drawNumber(mTimeCnt + "", .849, .869, 0, 1);
    else
        drawNumber(mTileCnt + "", .849, .869, 0, 1);
    // if(mGameMode==0)
    //   DrawTexture(ScoreFont.setText(mTimeCnt+""),.849,.869,0,1);
    // else
    // 	// DrawTexture(ScoreFont.setText(mTileCnt+""),.849,.869,0,1);
    //   drawNumber(ScoreFont.setText(mTileCnt+""),.849,.869,0,1);

    DrawStarAni();

    KeyHandle();
    gamelogic();

    for (let i = 0; i < uiHeart.length; i++) {
        if (mLife > i)
            DrawTransScal(uiHeart[i], -.88 + i * .07, .87, .5, 1);
        else
            DrawTransScal(uiEmpty[i], -.88 + i * .07, .87, .5, 1);


    }


}

function DrawStarAni() {
    for (var i = 0; i < mStarAni.length; i++) {
        if (mStarAni[i].x < 1.5 && mStarAni[i].x > -1.5 && mStarAni[i].y < 1.5 && mStarAni[i].y > -1.5) {
            if (mStarAni[i].scal > 0) {
                mStarAni[i].UpdateAni();
                DrawTransScal(mTex_Ani[mStarAni[i].star], mStarAni[i].x, mStarAni[i].y, mStarAni[i].scal, mStarAni[i].scal);
            }
        }
    }
}

// var isLeft  = true;
// var isRight = true;
function KeyHandle() {
    if (overCount > 0) {
        console.log("%%%%%%%%   overCount " + overCount);
        return;
    }
    if (mLeftKey.isDown && move == 0) {
        mSel = 1;
        if (!isStart) {
            // mGameTime = System.currentTimeMillis();
            mGameTime = Date.now();
            isStart = true;
            performAction();
        } else if ((jumpCount >= mTex_WaterAni.length)) {
            performAction();
        }
        st %= mStep.length;
        console.log("%%%%%%%%   KeyHandle" + overCount);
    } else if (mRightKey.isDown && move == 0) {
        mSel = 2;
        if (!isStart) {
            // mGameTime = System.currentTimeMillis();
            mGameTime = Date.now();
            isStart = false;
            performAction();
        } else if ((jumpCount >= mTex_WaterAni.length)) {
            performAction();
        }
        st %= mStep.length;
        console.log("%%%%%%%%   KeyHandle");
    } else {
        mSel = 0;
    }


}

function HandleGamePlay(pointer, events) {

    mSel = 0;
    if (move == 0 && CircRectsOverlap(-.80, -.8, floatWidth(mTex_BTwo.width) * .4, floatHeight(mTex_BTwo.height) * .4, screen2worldX(pointer.x), screen2worldY(pointer.y), .05)) {
        mSel = 1;
    }
    if (move == 0 && CircRectsOverlap(0.80, -.8, floatWidth(mTex_BTwo.width) * .4, floatHeight(mTex_BTwo.height) * .4, screen2worldX(pointer.x), screen2worldY(pointer.y), .05)) {
        mSel = 2;
    }
    if (CircRectsOverlap(-.889, .819, floatWidth(mTex_Pause.width) * .4, floatHeight(mTex_Pause.height) * .4, screen2worldX(pointer.x), screen2worldY(pointer.y), .05)) {
        mSel = 3;
    }
    if (events == 0) {
        if (!isStart) {
            // mGameTime = System.currentTimeMillis();
            mGameTime = Date.now();
            isStart = true;
            performAction();
        } else if ((jumpCount >= mTex_WaterAni.length)) {
            performAction();
        }
        st %= mStep.length;
    }
    if (events == 2) {
        if (mSel == 3) {
            // M.StopSound();
            // mGameTime -= System.currentTimeMillis();
            mGameTime -= Date.now();
            GameScreen = GAMEPAUSE;
            mAni = .01;
            mMenuAni = .005;
            setBubble();
        }
        mSel = 0;
    }
    // return true;
}

function performAction() {
    if (mWinCnt == 0) {
        switch (mSel) {
            case 1:
                // Jumpsound(M.randomRangeInt(0, 3));  
                PlayJump(RandomInt(0, 3));
                plry = -.23;
                plrvy = .1;
                st += 1;
                move = 0.03;
                mCharAni = 0;
                mScore += 1;
                mTileCnt += 1;
                hilana = 0;
                //			M.sound1(GameRenderer.mContext, R.raw.l_2_jump);
                break;
            case 2:
                // M.Jumpsound(M.randomRangeInt(0, 3));
                PlayJump(RandomInt(0, 3));
                plry = -.23;
                plrvy = .1;
                st += 2;
                move = 0.06;
                mCharAni = 0;
                mScore += 2;
                mTileCnt += 2;
                hilana = 0;
                //			M.sound2(GameRenderer.mContext, R.raw.l_2_second_jump);
                break;
        }
    }
}

function PlayJump(no) {
    if (setValue) {
        switch (no) {
            case 0:
                Snd_Jump0.play();
                break;
            case 1:
                Snd_Jump1.play();
                break;
            case 2:
                Snd_Jump2.play();
                break;
            case 3:
                Snd_Jump3.play();
                break;
        }
    }

}

function bgMove() {
    BG1 -= (move / 2);
    BG2 -= (move / 2);
    if (BG1 < -2)
        BG1 = BG2 + floatWidth(mTex_BG[0].width) * .833;
    if (BG2 < -2)
        BG2 = BG1 + floatWidth(mTex_BG[0].width) * .833;

    BGDark[0] -= move;
    BGDark[1] -= move;
    if (BGDark[0] < -2)
        BGDark[0] = BGDark[1] + floatWidth(mTex_bgDark[0].width) * .833;
    if (BGDark[1] < -2)
        BGDark[1] = BGDark[0] + floatWidth(mTex_bgDark[0].width) * .833;


    BGWave[0] -= (move * .75);
    BGWave[1] -= (move * .75);
    if (BGWave[0] < -2)
        BGWave[0] = BGWave[1] + floatWidth(mTex_Wave[0].width) * .833;
    if (BGWave[1] < -2)
        BGWave[1] = BGWave[0] + floatWidth(mTex_Wave[0].width) * .833;
}

function gamelogic() {
    Counter2++;
    if (Counter2 > 360)
        Counter2 = 0;
    if (plry > -.24) {
        plry += plrvy;
        plrvy -= .03;
        if (plry < -.24) {
            hilana -= .03;
        }
    } else {
        plrvy = 0;
        plry = -.24;
    }
    for (var i = 0; i < mStep.length; i++) {
        mStep[i].moveCnt += 3;
        if (mStep[i].moveCnt > 360)
            mStep[i].moveCnt = 0;
    }
    if (mCharAni < 8) {
        for (var i = 0; i < mStep.length; i++) {
            mStep[i].x -= (move);
        }
        for (var i = 0; i < mbubble.length; i++) {
            mbubble[i].x -= (move);
        }
        bgMove();
        for (var i = 0; i < mStep.length; i++) {
            if (mStep[i].x < -1.2) {
                mStep[i].set(mStep[i == 0 ? mStep.length - 1 : i - 1].x + .24, true, parseInt((mScore / 10) % mTex_Step.length));
                if (mStep[i].isOn) {
                    for (var j = 0; j < mbubble.length; j++) {
                        if (mbubble[j].x < -1.2)
                            mbubble[j].set(mStep[i].x, 0);
                    }
                }
                if (wCount % (mScore / 25 + 6) == 0)
                    mStep[i].Watch = true;
                if (Space <= 0) {
                    Space = RandomInt(0, 3) + 2 //(M.mRand.nextInt(4) + 2);
                    mStep[i].isOn = false;
                    mStep[i].Watch = false;
                }
                wCount++;
                Space--;
            }
        }
        mCharAni++;
        if (mCharAni == 8) {
            if (!mStep[st].isOn) {
                if (setValue)
                    Snd_Dump.play();
                move = -.03;
                mCharAni = 0;
                st--;
                if (st < 0)
                    st = (mStep.length - 1);
                mScore -= 1;
                mTileCnt -= 1;
                jumpCount = 0;
            }
            if (mStep[st].Watch) {
                mStep[st].Watch = false;
            }
        }
    } else
        move = 0;

    CheckGameWin();

}

function UpDateScore(mode) {
    switch (mode) {
        case 0: //Arcade
            // var t    = (System.currentTimeMillis()-mGameTime);
            var t = (Date.now() - mGameTime);
            if (mBestScore[mode][mGameType] <= 0) {
                mBestScore[mode][mGameType] = mTimeCnt;
            } else if (mTimeCnt < mBestScore[mode][mGameType]) {
                mBestScore[mode][mGameType] = mTimeCnt;
            }
            break;
        case 1: //Time
            if (mTileCnt > mBestScore[mode][mGameType]) {
                mBestScore[mode][mGameType] = mTileCnt;
            }
            break;
        case 2:
            if (mTileCnt > mBestScore[mode][0]) {
                mBestScore[mode][0] = mTileCnt;
            }
            break;
    }
}

function CheckGameWin() {
    switch (mGameMode) {
        case 0: //arcade
            if (mTileCnt >= mTargetTile) {
                mWinCnt++;
                UpDateScore(mGameMode);
            }
            break;
        case 1: //Time
            console.log(mTimeCnt + " mTargetTime = " + mTargetTime);
            // drawNumber(30 - Math.floor(mTimeCnt) + "", .849, .7, 0, 1);
            DrawTexture(ScoreFont.setText((30 - Math.floor(mTimeCnt)) + " sec"), .849, .7);
            if (mTimeCnt >= mTargetTime) {
                mWinCnt++;
                UpDateScore(mGameMode);

            }
            break;

    }
    if (mWinCnt > 0) {
        if (Counter % 15 == 0)
            AniReset(0, 0);
        mWinCnt++;
    }
    if (mWinCnt > 100) {
        mAni = .01;
        mMenuAni = .005;
        GameScreen = GAMECONG;
        setBubble();
        Snd_GamePlay.loop = false;
        Snd_GamePlay.stop();
        if (setValue)
            Snd_Cong.play();
        // M.StopSound();
        // M.CongSound(GameRenderer.mContext,R.raw.congratulations);
        GetBestScore();
    }
}

function AniReset(x, y) {
    //		int count = 0; 
    for (var i = 0; i < mStarAni.length; i++) {
        if (mStarAni[i].x > 1 || mStarAni[i].x < -1 || mStarAni[i].y > 1 || mStarAni[i].y < -1) {
            //			  count++;
            mStarAni[i].setAni(x, y, randomBoolean ? Randomfloat(.005, .05) : -Randomfloat(.005, .05), Randomfloat(.005, .05), RandomInt(0, mTex_Ani.length - 1), 0);
        }
    }
}

function GameReset(_type) {
    mGameType = _type - 1;
    resetBubble();
    mLife = 3;
    //		try{LoadAD.sendEmptyMessage(0);} catch (Exception e){}
    //		mStart.loadInter();
    // mGameTime = SystecurrentTimeMillis();
    mGameTime = Date.now();
    // console.log("mGameTime======= "+mGameTime);
    mScore = 0;
    mWinCnt = 0;
    isStart = false;
    resetTarget();
    set();
    BGDark[0] = 0;
    BGDark[1] = floatWidth(mTex_bgDark[0].width) * .833;

    BGWave[0] = 0;
    BGWave[1] = floatWidth(mTex_Wave[0].width) * .833;
    switch (mGameMode) {
        case 0: //Arcade
            switch (mGameType) {
                case 0:
                    mTargetTile = 50; //50 Tile
                    break;
                case 1:
                    mTargetTile = 100; //100 Tile
                    break;
                case 2:
                    mTargetTile = 500; //500 Tile
                    break;
            }
            break;
        case 1: //Time
            switch (mGameType) {
                case 0:
                    mTargetTime = 30.0; //Sec
                    break;
                case 1:
                    mTargetTime = 60.0; //Sec
                    break;
                case 2:
                    mTargetTime = 120.0; //Sec
                    break;
            }
            break;
    }
    // if(GameRenderer.mStart.addFree)
    {
        // BGPlay(GameRenderer.mContext,R.raw.gameplay);
        if (SetBG) {
            Snd_GamePlay.loop = true;
            Snd_GamePlay.play();

        }
        GameScreen = GAMEPLAY;
    }
    // else
    // {
    // 	GameScreen = GAMELOADING;
    // 	root.Counter=0;
    // }
    GetBestScore();
}

function set() {
    jumpCount = mTex_WaterAni.length;
    plrx = -.30;
    plry = -.24;
    plrvy = 0;
    BG1 = 0;
    BG2 = floatWidth(mTex_BG[0].width) * .833;
    move = 0.01;
    Space = 5;
    st = 0;
    for (var i = 0; i < mStep.length; i++) {
        mStep[i].set(-.3 + i * .24, true, 0);
        if (wCount % 6 == 0)
            mStep[i].Watch = true;
        if (Space <= 0) {
            Space = RandomInt(0, 5) + 2; // (mRand.nextInt(5) + 2);
            mStep[i].isOn = false;
            mStep[i].Watch = false;
        }
        wCount++;
        Space--;
    }
    for (var i = 0; i < mbubble.length; i++) {
        mbubble[i].set(-.3 + ((i % mStep.length) * .24), 0);
    }
    mStep[0].Watch = false;
    mCharAni = 10;
    overCount = 0;
}

function setlife() {
    // jumpCount = mTex_WaterAni.length;
    plrx = -.30;
    // plry = -.24;
    // plrvy = 0;
    // BG1 = 0;
    // BG2 = floatWidth(mTex_BG[0].width) * .833;
    // move = 0.01;
    // Space = 5;
    // st = 0;
    // for (var i = 0; i < mbubble.length; i++) {
    //     mbubble[i].set(-.3 + ((i % mStep.length) * .24), 0);
    // }
    // mStep[0].Watch = false;
    // mCharAni = 10;
    GameScreen = GAMEPLAY;
    overCount = 0;
    console.log("%%%%%%%%   setlife " + overCount);

    // jumpCount = 1;
}