Game.GamePlay = function(game) {};
var bmd;
var GameScreen = 0,
    mSel = 0;
var GAMESPLSH = 1,
    GAMEMENU = 2,
    GAMESETTING = 3,
    GAMEWORLD = 4,
    GAMEPLAY = 5,
    GAMEABTUS = 6,
    GAMEHELP = 7,
    GAMEADFREE = 8,
    GAMEPAUSE = 9,
    GAMEOVER = 10,
    GAMELOADING = 11,
    GAMEMODE = 12,
    GAMEEXT = 13,
    GAMECONG = 14,
    GAMELODING = 15;

var TEST = 100;
var outX = -100;
var setValue = true,
    SetBG = true;
var Counter = 0,
    Counter2 = 0;
var hilana = 0;

var mStep, mStarAni, mbubble;
var mBestScore;
var BGDark = Array(2),
    BGWave = Array(2);


var mGameMode = 0,
    mGameType = 0,
    mScore = 0,
    mTargetTile = 0,
    mTileCnt = 0;
var mWinCnt = 0;

var mAni = .01,
    mMenuAni = .005,
    mJoinAnim;
var BG1 = 0,
    BG2 = 0,
    move = 0;
var plrx = 0,
    plry = 0,
    plrvy = 0;
var mTargetTime = 0.0,
    mTimeCnt = 0.0;
var st = 0,
    Space = 0,
    jumpCount = 0,
    mCharAni = 0,
    wCount = 0;
var isStart = false,
    isJoin;
var mGameTime = 0;
var Snd_Click, Snd_Cong, Snd_Dump, Snd_Frog, Snd_OVer, Snd_GamePlay, Snd_Jump0, Snd_Jump1, Snd_Jump2, Snd_Jump3, Snd_Theme, Snd_Swing;
var mLeftKey, mRightKey;
var input_Box;
Game.GamePlay.prototype = {

    init: function() {
        GameScreen = GAMEMENU;
        //GameScreen = GAMEOVER;
        mAni = .01;
        mMenuAni = .005;

        // GameScreen = GAMEEXT;
    },
    preload: function() {},
    create: function() {

        bmd = this.game.add.bitmapData(maxX, maxY);
        bmd.addToWorld();
        bmd.smoothed = false;
        this.game.stage.backgroundColor = '#FFFFFF';
        this.game.add.plugin(PhaserInput.Plugin);

        // div_Code = addInputBox(couponids);

        mLeftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        mRightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);


        for (var i = 0; i < mTex_BG.length; i++) {
            mTex_BG[i] = this.add.image(XPos(outX), YPos(outX), "bg" + i);
            mTex_BG[i].anchor.set(.5, .5);

            mTex_bgDark[i] = this.add.image(XPos(outX), YPos(outX), "bgdark" + i);
            mTex_bgDark[i].anchor.set(.5, .5);

            mTex_Wave[i] = this.add.image(XPos(outX), YPos(outX), "wave" + i);
            mTex_Wave[i].anchor.set(.5, .5);
        }

        for (var i = 0; i < mTex_Step.length; i++) {
            mTex_Step[i] = this.add.image(XPos(outX), YPos(outX), 'step' + i);
            mTex_Step[i].anchor.set(.5, .5);
        }


        mTex_BOne = this.add.image(XPos(outX), YPos(outX), "one_jump");
        mTex_BOne.anchor.set(.5, .5);
        mTex_BTwo = this.add.image(XPos(outX), YPos(outX), "two_jump");
        mTex_BTwo.anchor.set(.5, .5);


        for (var i = 0; i < mTex_Frog.length; i++) {
            mTex_Frog[i] = this.add.image(XPos(outX), YPos(outX), "smallfrog" + i);
            mTex_Frog[i].anchor.set(.5, .5);
        }

        mTex_Ripple = this.add.image(XPos(outX), YPos(outX), "waterripple");
        mTex_Ripple.anchor.set(.5, .5);


        for (var i = 0; i < mTex_WaterAni.length; i++) {
            mTex_WaterAni[i] = this.add.image(XPos(outX), YPos(outX), "waterani" + i);
            mTex_WaterAni[i].anchor.set(.5, .5);
        }


        mTex_SplashTxt = this.add.image(XPos(outX), YPos(outX), 'splash_text');
        mTex_SplashTxt.anchor.set(.5, .5);
        mTex_Board = this.add.image(XPos(outX), YPos(outX), 'big_bord');
        mTex_Board.anchor.set(.5, .5);

        for (var i = 0; i < mTex_SplashFrog.length; i++) {
            mTex_SplashFrog[i] = this.add.image(XPos(outX), YPos(outX), 'frogbig' + i);
            mTex_SplashFrog[i].anchor.set(.5, .5);
        }

        mTex_Drum = this.add.image(XPos(outX), YPos(outX), 'drum');
        mTex_Drum.anchor.set(.5, .5);

        for (var i = 0; i < mTex_Menu.length; i++) {
            mTex_Menu[i] = this.add.image(XPos(outX), YPos(outX), 'menu' + i);
            mTex_Menu[i].anchor.set(.5, .5);
        }

        mTex_SmallBoard = this.add.image(XPos(outX), YPos(outX), 'small_board');
        mTex_SmallBoard.anchor.set(.5, .5);
        // mTex_Gooe = this.add.image(XPos(outX), YPos(outX), 'g');
        // mTex_Gooe.anchor.set(.5, .5);

        for (var i = 0; i < mTex_Setting.length; i++) {
            mTex_Setting[i] = this.add.image(XPos(outX), YPos(outX), 'setting' + i);
            mTex_Setting[i].anchor.set(.5, .5);
        }


        // mTex_SettingIcn[0][0] = this.add.image('settingicn00');
        for (var i = 0; i < mTex_SettingIcn.length; i++) {
            for (var j = 0; j < mTex_SettingIcn[0].length; j++) {
                mTex_SettingIcn[i][j] = this.add.image(XPos(outX), YPos(outX), i + 'settingicn' + j);
                mTex_SettingIcn[i][j].anchor.set(.5, .5);
            }
        }

        // mTex_FB = this.add.image(XPos(outX), YPos(outX), 'fb');
        // mTex_FB.anchor.set(.5, .5);
        mTex_HelpBtn = this.add.image(XPos(outX), YPos(outX), 'help_btn');
        mTex_HelpBtn.anchor.set(.5, .5);
        mTex_Home = this.add.image(XPos(outX), YPos(outX), 'home');
        mTex_Home.anchor.set(.5, .5);
        // mTex_AbtBtn = this.add.image(XPos(outX), YPos(outX), 'about');
        // mTex_AbtBtn.anchor.set(.5, .5);
        mTex_Help = this.add.image(XPos(outX), YPos(outX), 'help');
        mTex_Help.anchor.set(.5, .5);
        // mTex_Abt = this.add.image(XPos(outX), YPos(outX), 'about_text');
        // mTex_Abt.anchor.set(.5, .5);
        // mTex_More = this.add.image(XPos(outX), YPos(outX), 'more');
        // mTex_More.anchor.set(.5, .5);
        // mTex_AdFree = this.add.image(XPos(outX), YPos(outX), 'buy_ads');
        // mTex_AdFree.anchor.set(.5, .5);
        // mTex_BubbleIcn = this.add.image(XPos(outX), YPos(outX), 'bubble_icon');
        // mTex_BubbleIcn.anchor.set(.5, .5);
        mTex_Buybtn = this.add.image(XPos(outX), YPos(outX), 'buy_btn');
        mTex_Buybtn.anchor.set(.5, .5);
        mTex_GameOver = this.add.image(XPos(outX), YPos(outX), 'game-over');
        mTex_GameOver.anchor.set(.5, .5);
        mTex_GamePause = this.add.image(XPos(outX), YPos(outX), 'gamepaused');
        mTex_GamePause.anchor.set(.5, .5);
        mTex_ScoreBoard = this.add.image(XPos(outX), YPos(outX), 'scoree');
        mTex_ScoreBoard.anchor.set(.5, .5);
        mTex_LeaderBoard = this.add.image(XPos(outX), YPos(outX), 'leader');
        mTex_LeaderBoard.anchor.set(.5, .5);
        mTex_Retry = this.add.image(XPos(outX), YPos(outX), 'retry');
        mTex_Retry.anchor.set(.5, .5);
        // mTex_Play = this.add.image(XPos(outX), YPos(outX), 'play');
        // mTex_Play.anchor.set(.5, .5);
        // mTex_ChangeGame = this.add.image(XPos(outX), YPos(outX), 'change-game');
        // mTex_ChangeGame.anchor.set(.5, .5);
        mTex_Makdi = this.add.image(XPos(outX), YPos(outX), 'spider_web');
        mTex_Makdi.anchor.set(.5, .5);
        // mTex_WorldBoard = this.add.image(XPos(outX), YPos(outX), 'world_bord');
        // mTex_WorldBoard.anchor.set(.5, .5);
        for (var i = 0; i < mTex_WorldIcn.length; i++) {
            mTex_WorldIcn[i] = this.add.image(XPos(outX), YPos(outX), 'worldIcn' + i);
            mTex_WorldIcn[i].anchor.set(.5, .5);
            mTex_WorldTxt[i] = this.add.image(XPos(outX), YPos(outX), 'worldtxt' + i);
            mTex_WorldTxt[i].anchor.set(.5, .5);
        }

        // for (var i = 0; i < 2; i++) {
        //     for (var j = 0; j < 3; j++) {
        //         mTex_Mode[i][j] = this.add.image(XPos(outX), YPos(outX), i + 'mode' + j);
        //         mTex_Mode[i][j].anchor.set(.5, .5);
        //     }
        // }
        // mTex_ModeBoard = this.add.image(XPos(outX), YPos(outX), 'world_bord_small');
        // mTex_ModeBoard.anchor.set(.5, .5);
        mTex_ScoreBox = this.add.image(XPos(outX), YPos(outX), 'score_box');
        mTex_ScoreBox.anchor.set(.5, .5);
        // mTex_Pause = this.add.image(XPos(outX), YPos(outX), 'pause_btn');
        // mTex_Pause.anchor.set(.5, .5);
        // mTex_Cong = this.add.image(XPos(outX), YPos(outX), 'congratulation');
        // mTex_Cong.anchor.set(.5, .5);


        for (var i = 0; i < 3; i++) {
            uiHeart[i] = this.add.image(XPos(outX), YPos(outX), 'heart');
            uiHeart[i].anchor.set(.5, .5);

            uiEmpty[i] = this.add.image(XPos(outX), YPos(outX), 'heartempty');
            uiEmpty[i].anchor.set(.5, .5);
        }

        // mTex_Dot[0] = this.add.image(XPos(outX), YPos(outX), 'dot0');
        // mTex_Dot[0].anchor.set(.5, .5);
        // mTex_Dot[1] = this.add.image(XPos(outX), YPos(outX), 'dot1');
        // mTex_Dot[1].anchor.set(.5, .5);

        for (var i = 0; i < mTex_Ani.length; i++) {
            mTex_Ani[i] = this.add.image(XPos(outX), YPos(outX), 'drop' + i);
            mTex_Ani[i].anchor.set(.5, .5);
        }

        for (var i = 0; i < mTex_Font.length; i++) {
            mTex_Font[i] = this.add.image(XPos(outX), YPos(outX), 'font' + i);
            mTex_Font[i].anchor.set(.5, .5);
        }

        Snd_Click = this.game.add.audio('button_click');
        Snd_Cong = this.game.add.audio('congratulations');
        Snd_Dump = this.game.add.audio('dumping');
        Snd_Frog = this.game.add.audio('frog');
        Snd_OVer = this.game.add.audio('gameover');
        Snd_GamePlay = this.game.add.audio('gameplay');
        Snd_Jump0 = this.game.add.audio('jump0');
        Snd_Jump1 = this.game.add.audio('jump1');
        Snd_Jump2 = this.game.add.audio('jump2');
        Snd_Jump3 = this.game.add.audio('jump3');
        Snd_Theme = this.game.add.audio('menu_theme');
        Snd_Swing = this.game.add.audio('swing');
        input_Box = game.add.inputField(250, 80, {
            font: '18px Arial',
            fill: '#212121',
            fontWeight: 'bold',
            width: 300,
            padding: 8,
            borderWidth: 1,
            borderColor: '#000',
            borderRadius: 6,
            placeHolder: 'Enter coupon code',
        });
        input_Box.visible = false;
        if (SetBG) {
            Snd_Theme.loop = true;
            Snd_Theme.play();

        }

        InitGameObj();
        setBubble();

        ScoreFont = this.add.text(XPos(outX), YPos(outX), '', { fontSize: '24px', fontWeight: 'bold', fill: '#FFFFFF', strokeThickness: 1, boundsAlignH: "center", boundsAlignV: "middle" }); //stroke:'',
        ScoreFont.anchor.set(.5, .5);
        BestFont = this.add.text(XPos(outX), YPos(outX), '', { fontSize: '24px', fontWeight: 'bold', fill: '#FFFFFF', strokeThickness: 3, stroke: '#000000', boundsAlignH: "center", boundsAlignV: "middle" }); //stroke:'',
        BestFont.anchor.set(.5, .5);



        var isPressed = false;
        this.game.input.onDown.add(function(pointer) {
            console.log("GameScreen = " + GameScreen);
            isPressed = true;
            switch (GameScreen) {
                case GAMESPLSH:
                    // Handle_Splash(pointer,0);
                    break;
                case GAMEMENU:
                    HandleMenu(pointer, 0);
                    break;
                case GAMESETTING:
                    HandleSetting(pointer, 0);
                    break;
                case GAMEHELP:
                    HandleHelp(pointer, 0);
                    break;
                case GAMEABTUS:
                    HandleAbtUs(pointer, 0);
                    break;
                case GAMEWORLD:
                    HandleWorld(pointer, 0);
                    break;
                case GAMEMODE:
                    HandleMode(pointer, 0);
                    break;
                case GAMEOVER:
                case GAMEPAUSE:
                case GAMECONG:
                    HandleOverPause(pointer, 0);
                    break;
                    // case GAMECONG:
                    //     HandleCong(pointer, 0);
                    //     break
                case GAMEPLAY:
                    HandleGamePlay(pointer, 0);
                    break
                case GAMEEXT:
                    Handle_EXT(pointer, 0);
                    break;
            }
            if (setValue && mSel > 0)
                Snd_Click.play();

        });
        this.game.input.addMoveCallback(function(pointer) {

            if (isPressed) {
                switch (GameScreen) {
                    case GAMESPLSH:
                        // Handle_Splash(pointer,1);
                        break;
                    case GAMEMENU:
                        HandleMenu(pointer, 1);
                        break;
                    case GAMESETTING:
                        HandleSetting(pointer, 1);
                        break;
                    case GAMEHELP:
                        HandleHelp(pointer, 1);
                        break;
                    case GAMEABTUS:
                        HandleAbtUs(pointer, 1);
                        break;
                    case GAMEWORLD:
                        HandleWorld(pointer, 1);
                        break;
                    case GAMEMODE:
                        HandleMode(pointer, 1);
                        break;
                    case GAMEOVER:
                    case GAMEPAUSE:
                    case GAMECONG:
                        HandleOverPause(pointer, 1);
                        break;
                        // case GAMECONG:
                        //     HandleCong(pointer, 1);
                        //     break
                    case GAMEPLAY:
                        HandleGamePlay(pointer, 1);
                        break
                    case GAMEEXT:
                        Handle_EXT(pointer, 1);
                        break;
                }
            }

        });
        this.game.input.onUp.add(function(pointer) {
            switch (GameScreen) {

                case GAMESPLSH:
                    // Handle_Splash(pointer,2);
                    break;
                case GAMEMENU:
                    HandleMenu(pointer, 2);
                    break;
                case GAMESETTING:
                    HandleSetting(pointer, 2);
                    break;
                case GAMEHELP:
                    HandleHelp(pointer, 2);
                    break;
                case GAMEABTUS:
                    HandleAbtUs(pointer, 2);
                    break;
                case GAMEWORLD:
                    HandleWorld(pointer, 2);
                    break;
                case GAMEMODE:
                    HandleMode(pointer, 2);
                    break;
                case GAMEOVER:
                case GAMEPAUSE:
                case GAMECONG:
                    HandleOverPause(pointer, 2);
                    break;
                    // case GAMECONG:
                    //     HandleCong(pointer, 2);
                    //     break
                case GAMEPLAY:
                    HandleGamePlay(pointer, 2);
                    break
                case GAMEEXT:
                    Handle_EXT(pointer, 2);
                    break;
            }
            isPressed = false;


        });
        this.game.input.onTap.add(function() {

            // console.log("22222222222222");
        });

    },



    update: function() {

        bmd.cls();
        switch (GameScreen) {
            case TEST:
                DrawTest();
                break;
            case GAMEEXT:
                DrawEXT();
                break;
            case GAMESPLSH:
                // Draw_Splash();
                break;
            case GAMEMENU:
                DrawMenu();
                break;
            case GAMESETTING:
                DrawSetting();
                break;
            case GAMEABTUS:
                DrawAbtUs();
                break;
            case GAMEHELP:
                DrawHelp();
                break;
            case GAMEWORLD:
                DrawWorld();
                break;
            case GAMEMODE:
                DrawGameMode();
                break;
            case GAMEPAUSE:
            case GAMEOVER:
            case GAMECONG:
                DrawOverPause();
                break;
                // case GAMECONG:
                //     DrawCong();
                //     break;
            case GAMEPLAY:
                DrawGamePlay();
                break;
        }
        Counter++;
    }

};


function InitGameObj() {

    mStarAni = new Array(50);
    for (var i = 0; i < mStarAni.length; i++) {
        mStarAni[i] = new StarAnimation();
        mStarAni[i].check();

    }

    mStep = new Array(10);
    for (var i = 0; i < mStep.length; i++) {
        mStep[i] = new Step(0, true);
        mStep[i].check();
    }

    mBestScore = new Array(3);
    for (var i = 0; i < 2; i++) {
        mBestScore[i] = Array(3);
        for (var k = 0; k < mBestScore[i].length; k++) {
            mBestScore[i][k] = 0.0;
        }
    }

    mBestScore[2] = Array(1);
    mBestScore[2][0] = 0.0;

    mbubble = new Array(30);
    for (var i = 0; i < mbubble.length; i++) {
        mbubble[i] = new Bubble();
        mbubble[i].check();
    }

}

function resetTarget() {
    mTargetTile = 0;
    mTileCnt = 0;
    mTargetTime = 0.0;
    mTimeCnt = 0.0;
    mWinCnt = 0;
}

function DrawTest() {
    DrawCommonBg();
    var str = "Enter new coupon to continue";
    DrawTexture(ScoreFont.setText(str), 0, 0.8); //Score
    input_Box.visible = true;
    DrawTransScal(mTex_Buybtn, 0, -.0, mSel == 1 ? 1.3 : 1.2, mSel == 1 ? .5 : 1);
    DrawTransScal(mTex_LeaderBoard, 0, -.3, mSel == 2 ? 1.3 : 1.2, mSel == 2 ? .5 : 1);
}

function DrawEXT() {
    DrawCommonBg();
    var str = "Enter new coupon to continue";
    DrawTexture(ScoreFont.setText(str), 0, 0.8); //Score
    input_Box.visible = true;
    DrawTransScal(mTex_Buybtn, 0, -.0, mSel == 1 ? 1.3 : 1.2, mSel == 1 ? .5 : 1);
    DrawTransScal(mTex_LeaderBoard, 0, -.3, mSel == 2 ? 1.3 : 1.2, mSel == 2 ? .5 : 1);
}

function Handle_EXT(pointer, events) {
    mSel = 0;
    if (CircRectsOverlap(0, 0, floatWidth(mTex_Buybtn.width) * .4, floatHeight(mTex_Buybtn.height) * .4, screen2worldX(pointer.x), screen2worldY(pointer.y), .05))
        mSel = 1; //Home
    if (CircRectsOverlap(0, -.3, floatWidth(mTex_LeaderBoard.width) * .4, floatHeight(mTex_LeaderBoard.height) * .4, screen2worldX(pointer.x), screen2worldY(pointer.y), .05))
        mSel = 2; //World

    if (events == 2) {
        switch (mSel) {
            case 1:
                //console.log("Handle_EXT " + JSON.stringify(input_Box.value));
                validateagain(input_Box.value);
                break;
            case 2:
                submitScore(100);
                break;
        }
        mSel = 0;
    }
    return true;
}

function setBubble2() //World
{
    resetBubble();
    mbubble[0].set(.529, -.859);
    mbubble[1].set(.529, -.859);
    mbubble[2].set(.529, -.859);
    for (var i = 0; i < 12; i++) {
        mbubble[i + 3].set(0, 0);
    }

}

function setBubble() //Common
{
    resetBubble();
    if (GameScreen == GAMEPAUSE || GameScreen == GAMEOVER || GameScreen == GAMECONG) {
        mbubble[0].set(.03, -.68);
        mbubble[1].set(-.709, -.53);
        mbubble[2].set(.529, -.859);

        mbubble[3].set(.03, -.68);
        mbubble[4].set(-.709, -.53);
        mbubble[5].set(.529, -.859);

        mbubble[6].set(.03, -.68);
        mbubble[7].set(-.709, -.53);
        mbubble[8].set(.529, -.859);
    } else {
        mbubble[0].set(.03, -.919);
        mbubble[1].set(-.809, -.639);
        mbubble[2].set(.529, -.859);

        mbubble[3].set(.03, -.919);
        mbubble[4].set(-.809, -.639);
        mbubble[5].set(.529, -.859);

        mbubble[6].set(.03, -.919);
        mbubble[7].set(-.809, -.639);
        mbubble[8].set(.529, -.859);
    }
}

function resetBubble() {
    for (var i = 0; i < mbubble.length; i++) {
        mbubble[i].set(100, 100);
    }
}

function Drawbubble() {
    for (var i = 0; i < mbubble.length; i++) {
        if (mbubble[i].x > -1 && mbubble[i].x < 1) {
            if (mbubble[i].isShow)
                DrawTransScal(mTex_Ripple, mbubble[i].x, mbubble[i].y, mbubble[i].z, 1 - (mbubble[i].z) * .4);
            mbubble[i].updateBubble();
        }
    }
}
var ani = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 3, 4];

function DrawCommonBg() {

    // if(Counter%79==1 && ScreenReceiver.wasScreenOn)
    //  	  FrogSound(GameRenderer.mContext,R.raw.frog);

    if (Counter % 79 == 1 && setValue)
        Snd_Frog.play();

    DrawTexture(mTex_BG[0], 0, 0);
    if (GameScreen != GAMEWORLD && GameScreen != GAMEMODE) {
        Drawbubble();
    }
}

function DrawCommonFront() {
    var y = DegreeToRadian((Counter * 2) % 360);
    if (Counter % 4 == 0)
        Counter2++;
    if (Counter2 > 100)
        Counter2 = 0;

    DrawTexture(mTex_Drum, .529, -.789 + Math.abs(Math.sin(y) * .02));
    DrawTexture(mTex_SplashFrog[ani[Counter2 % ani.length]], .509, -.479 + Math.abs(Math.sin(y) * .02));

    for (var i = 0; i < BGDark.length; i++) {
        DrawTexture(mTex_bgDark[0], GameScreen == GAMEWORLD ? worldX + i * floatWidth(mTex_bgDark[0].width) * .833 : 0, 0);


    }

    if (GameScreen == GAMEWORLD) {
        for (var i = 0; i < BGDark.length; i++) {
            BGDark[i] += MoveVX;
            if (BGDark[i] < -2) {
                BGDark[i] = BGDark[i == 0 ? BGDark.length - 1 : i - 1] + 2;
            }
        }
    }
}

function DrawMenu() {

    DrawCommonBg();
    DrawTexture(mTex_SplashTxt, -.529, .539);
    DrawTexture(mTex_Makdi, -.549, -.27);
    DrawTextureSS(mTex_Board, 0, -.28, 1, mAni);
    // DrawTextureSS(mTex_SmallBoard,-.819,-.459,1,mSel==4?1.2:mAni);
    // DrawTextureSS(mTex_Gooe,-.819,-.399-floatHeight(mTex_Gooe.height)*.4,1,mSel==4?1.2:mAni);

    for (var i = 0; i < mTex_Menu.length - 1 && mAni == 1; i++)
        DrawTransScal(mTex_Menu[i], 0, .139 - i * mMenuAni, mSel == i + 1 ? 1.2 : 1, mSel == i + 1 ? .5 : 1);


    DrawCommonFront();
    if (Counter > 20) {
        if (mAni < 1)
            mAni *= 1.25;
        else {
            mAni = 1;
            if (mMenuAni < .33)
                mMenuAni *= 1.25;
            else
                mMenuAni = .33;
        }
    }
}

function HandleMenu(pointer, events) {
    mSel = 0;
    for (var i = 0; i < mTex_Menu.length - 1 && mAni == 1; i++)
        if (CircRectsOverlap(0, .139 - i * mMenuAni, floatWidth(mTex_Menu[0].width * .4), floatHeight(mTex_Menu[0].height * .25), screen2worldX(pointer.x), screen2worldY(pointer.y), .02)) {
            mSel = i + 1; //Menu
        }
        // if(CircRectsOverlap(-.5, -.73, floatWidth(mTex_40sec.width*.5), floatHeight(mTex_40sec.height*.5), screen2worldX(pointer.x), screen2worldY(pointer.y), .02)){
        // 	// sel = 1;
        // }

    if (events == 2) {
        switch (mSel) {
            case 1:
                // BgStop();
                // Snd_Theme.loop = false;
                // Snd_Theme.stop();
                // GameScreen = GAMEWORLD;
                // setBubble2();
                console.log(mGameMode + " HandleMode " + mSel);
                mGameMode = 1;
                GameReset(mSel);
                break;
            case 2:
                // SplashPlay(GameRenderer.mContext,R.raw.menu_theme);
                GameScreen = GAMESETTING;
                mMenuAni = .005;
                mAni = .01;
                break;
        }
        mSel = 0;
    }
    //playAll();

}

function DrawSetting() {
    DrawCommonBg();
    DrawTexture(mTex_Makdi, -.549, -.27);
    DrawTextureSS(mTex_Board, 0, -.28, 1, mAni, 0);
    // DrawTextureSS(mTex_SmallBoard, -.819, -.459, 1, mSel == 5 ? 1.2 : mAni);
    // DrawTextureSS(mTex_AbtBtn, -.819, -.399, 1, mSel == 5 ? 1.2 : mAni);

    for (var i = 0; i < mTex_Setting.length - 1 && mAni == 1; i++) {
        DrawTransScal(mTex_Setting[i], -.079, .129 - i * mMenuAni, mSel == i + 1 ? 1.2 : 1, mSel == i + 1 ? .5 : 1);
        DrawTransScal(mTex_SettingIcn[i][0], .19, .18 - i * mMenuAni, mSel == i + 1 ? 1.2 : 1, mSel == i + 1 ? .5 : 1);
        if (i == 0 && !setValue)
            DrawTransScal(mTex_SettingIcn[i][1], .19, .18 - i * mMenuAni, mSel == i + 1 ? 1.2 : 1, mSel == i + 1 ? .5 : 1);
        if (i == 1 && !SetBG)
            DrawTransScal(mTex_SettingIcn[i][1], .19, .18 - i * mMenuAni, mSel == i + 1 ? 1.2 : 1, mSel == i + 1 ? .5 : 1);
        // if(i==2 && !Vibrate)
        //    DrawTransScal(,mTex_SettingIcn[i][1],.19,.18-i*mMenuAni,mSel==i+1?1.2:1,mSel==i+1?.5:1);
    }
    if (mAni == 1)
        DrawTransScal(mTex_HelpBtn, 0, .059 - 3 * mMenuAni, mSel == 4 ? 1.2 : 1, mSel == 4 ? .5 : 1);

    DrawTransScal(mTex_Home, -.889, .819, mSel == 6 ? 1.2 : 1, mSel == 6 ? .5 : 1);
    DrawCommonFront();
    if (Counter > 20) {
        if (mAni < 1)
            mAni *= 1.25;
        else {
            mAni = 1;
            if (mMenuAni < .23)
                mMenuAni *= 1.25;
            else
                mMenuAni = .23;
        }
    }

}

function HandleSetting(pointer, events) {
    mSel = 0;
    for (var i = 0; i < mTex_Setting.length - 1 && mAni == 1; i++)
        if (CircRectsOverlap(0, .139 - i * mMenuAni, floatWidth(mTex_Setting[0].width * .4), floatHeight(mTex_Setting[0].height * .3), screen2worldX(pointer.x), screen2worldY(pointer.y), .02)) {
            mSel = i + 1; //Sound
        }
    if (CircRectsOverlap(0, .059 - 3 * mMenuAni, floatWidth(mTex_HelpBtn.width) * .4, floatHeight(mTex_HelpBtn.height) * .4, screen2worldX(pointer.x), screen2worldY(pointer.y), .02))
        mSel = 4; //Help

    if (CircRectsOverlap(-.819, -.459, floatWidth(mTex_SmallBoard.width) * .4, floatHeight(mTex_SmallBoard.height) * .3, screen2worldX(pointer.x), screen2worldY(pointer.y), .02)) {
        // mSel = 5; //About
    }

    if (CircRectsOverlap(-.889, .819, floatWidth(mTex_Home.width) * .4, floatHeight(mTex_Home.height) * .4, screen2worldX(pointer.x), screen2worldY(pointer.y), .02))
        mSel = 6; //Home

    if (events == 2) {
        switch (mSel) {
            case 1:
                setValue = !setValue;
                break;
            case 2:
                SetBG = !SetBG;
                if (SetBG) {
                    Snd_Theme.play();
                    Snd_Theme.loop = true;
                } else {
                    Snd_Theme.stop();
                }
                break;
                // case 3:
                // 	Vibrate =!Vibrate;
                // 	break;
            case 4:
                mAni = .01;
                GameScreen = GAMEHELP;
                break;
            case 5:
                mAni = .01;
                GameScreen = GAMEABTUS;
                break;
            case 6:
                mAni = .01;
                mMenuAni = .005;
                GameScreen = GAMEMENU;
                if (SetBG) {
                    Snd_Theme.play();
                    Snd_Theme.loop = true;
                }
                break;
        }
        mSel = 0;
    }
    //playAll();

}


function DrawHelp() {
    DrawTexture(mTex_BG[0], 0, 0);
    DrawTexture(mTex_bgDark[0], 0, 0);
    DrawTextureSS(mTex_Help, 0, 1 - mAni, mAni);
    DrawTransScal(mTex_Home, .889, -.819, mSel == 1 ? 1.2 : 1, mSel == 1 ? .5 : 1);
    if (mAni < 1)
        mAni *= 1.5;
    else
        mAni = 1;

}

function HandleHelp(pointer, events) {
    mSel = 0;
    if (CircRectsOverlap(.889, -.819, floatWidth(mTex_Home.width) * .4, floatHeight(mTex_Home.height) * .4, screen2worldX(pointer.x), screen2worldY(pointer.y), .05))
        mSel = 1; //Home

    if (events == 2) {
        switch (mSel) {
            case 1:
                mAni = .01;
                mMenuAni = .005;
                GameScreen = GAMESETTING;
                break;
        }
        mSel = 0;
    }
    return true;
}

function DrawAbtUs() {
    DrawCommonBg();
    DrawTexture(mTex_Makdi, -.549, -.27);
    DrawTextureSS(mTex_Board, 0, -.28, 1, mAni);
    DrawTextureSS(mTex_Abt, 0, -.1, 1, mAni);
    DrawTextureSS(mTex_SmallBoard, -.819, -.459, 1, mSel == 2 ? 1.2 : mAni);
    // DrawTextureSS(mTex_More,-.819,-.399,1,mSel==2?1.2:mAni);
    DrawTransScal(mTex_Home, -.889, .819, mSel == 1 ? 1.2 : 1, mSel == 1 ? .5 : 1);
    DrawCommonFront();
    if (mAni < 1)
        mAni *= 1.25;
    else
        mAni = 1;

}

function HandleAbtUs(pointer, events) {
    mSel = 0;
    if (CircRectsOverlap(-.889, .819, floatWidth(mTex_Home.width) * .4, floatHeight(mTex_Home.height) * .4, screen2worldX(pointer.x), screen2worldY(pointer.y), .05))
        mSel = 1; //Home
    // if(CircRectsOverlap(-.819,-.459,floatWidth(mTex_Home.width)*.4,floatHeight(mTex_Home.height)*.4,screen2worldX(pointer.x),screen2worldY(pointer.x),.05))
    // mSel=2;//More

    if (events == 2) {
        switch (mSel) {
            case 1:
                mAni = .01;
                mMenuAni = .005;
                GameScreen = GAMESETTING;
                break;
                // case 2:
                // 	MoreGame();
                // 	break;
        }
        mSel = 0;
    }
}
var worldX = 0;
var MoveX = 0;
var MoveVX = 0;
var DotSel = 0;

function DrawWorld() {
    DrawCommonBg();
    for (var i = 0; i < mbubble.length; i++) {
        if (mbubble[i].x > -1 && mbubble[i].x < 1) {
            if (mbubble[i].isShow) {
                if (i < 3)
                    DrawTransScal(mTex_Ripple, mbubble[i].x, mbubble[i].y, mbubble[i].z, 1 - (mbubble[i].z) * .4);
                else
                    DrawTransScal(mTex_Ripple, worldX + (i % 3) * 1.329, 0, mbubble[i].z, 1 - (mbubble[i].z) * .4);
            }
            mbubble[i].updateBubble();
        }
    }
    for (var i = 0; i < mTex_WorldIcn.length; i++) {
        if (worldX + i * 1.329 > -1.2 && worldX + i * 1.329 < 1.2) {
            DrawTexture(mTex_WorldBoard, worldX + i * 1.329, 0);
            DrawTransScal(mTex_WorldIcn[i], worldX + i * 1.329, .21, mSel == i + 1 ? 1.1 : 1, mSel == i + 1 ? .7 : 1);
            DrawTransScal(mTex_WorldTxt[i], worldX + i * 1.329, -.349, mSel == i + 1 ? 1.1 : 1, mSel == i + 1 ? .7 : 1);
        }
        if (worldX + i * 1.329 > -.4 && worldX + i * 1.329 < .4) {
            DotSel = i;
        }
    }
    //		float y= (float)Math.toRadians((Counter*2)%360);
    //		DrawTexture(mTex_Drum,.529f,-.789f+Math.abs((float)Math.sin(y)*.02f));
    //		DrawTexture(mTex_SplashFrog[ani[Counter2%ani.length]],.509f,-.479f+Math.abs((float)Math.sin(y)*.02f));
    for (var i = 0; i < 3; i++) {
        if (DotSel == i)
            DrawTexture(mTex_Dot[0], -.13 + i * .13, -.849);
        else
            DrawTexture(mTex_Dot[1], -.13 + i * .13, -.849);
    }
    DrawCommonFront();
    if (MoveVX > 0) {
        MoveVX -= MoveVX * .1;
        if (MoveVX <= .001)
            MoveVX = 0;
    }
    if (MoveVX < 0) {
        MoveVX -= MoveVX * .1;
        if (MoveVX >= -0.001)
            MoveVX = 0;
    }
    if (worldX + (2 * 1.329) < -.6) {
        MoveVX = .04;
    }
    if (worldX > .6) {
        MoveVX = -.04;
    }
    worldX += MoveVX;
    DrawTransScal(mTex_Home, -.889, .819, mSel == 4 ? 1.2 : 1, mSel == 4 ? .5 : 1);
}

function HandleWorld(pointer, events) {
    mSel = 0;
    for (var i = 0; i < mTex_WorldIcn.length; i++)
        if (MoveVX == 0 && CircRectsOverlap(worldX + i * 1.329, 0, floatWidth(mTex_WorldBoard.width) * .35, floatHeight(mTex_WorldBoard.height) * .25, screen2worldX(pointer.x), screen2worldY(pointer.y), .05))
            mSel = i + 1;

    if (CircRectsOverlap(-.889, .819, floatWidth(mTex_Home.width) * .4, floatHeight(mTex_Home.height) * .4, screen2worldX(pointer.x), screen2worldY(pointer.y), .05))
        mSel = 4;

    if (events == 0) {
        MoveX = screen2worldX(pointer.x);
        console.log("Sel=======   " + mSel);

    }
    var dx = Math.abs(MoveX - screen2worldX(pointer.x));
    if (events == 1 && dx > .1 /*&& mSel==0*/ ) {

        if (MoveX < screen2worldX(pointer.x)) {
            // SwingSound(GameRenderer.mContext,R.raw.swing);
            if (setValue)
                Snd_Swing.play();
            MoveVX = Math.abs(MoveX - screen2worldX(pointer.x)) * .45;
            MoveVX += .04;
            MoveX = screen2worldX(pointer.x);
        }
        if (MoveX > screen2worldX(pointer.x)) {
            // SwingSound(GameRenderer.mContext,R.raw.swing);
            if (setValue)
                Snd_Swing.play();
            MoveVX = -Math.abs(MoveX - screen2worldX(pointer.x)) * .45;
            MoveVX -= .04;
            MoveX = screen2worldX(pointer.x);
        }
    }
    if (events == 2) {
        // console.log("Sel===222====   "+mSel);		
        switch (mSel) {
            case 1:
            case 2:
            case 3:
                mGameMode = mSel - 1;
                if (mGameMode < 2) {
                    GameScreen = GAMEMODE;
                    setBubble2();
                    for (var i = 0; i < Scal.length; i++) {
                        Scal[i] = .005;
                        Cnt = 0;
                    }
                } else {
                    GameReset(mSel); //classic
                }
                break;
            case 4:
                // SplashPlay(GameRenderer.mContext,R.raw.menu_theme);
                if (SetBG) {
                    Snd_Theme.play();
                    Snd_Theme.loop = true;
                }
                mAni = .01;
                mMenuAni = .005;
                setBubble();
                GameScreen = GAMEMENU;
                break;
        }
        mSel = 0;
    }
}

var pos = [
    [-.089, -.549, .179],
    [-.139, -.379, -.559]
];
var Scal = [.005, .005, .005];
var Cnt = 0;

function DrawGameMode() {
    DrawCommonBg();
    for (var i = 0; i < mbubble.length; i++) {
        if (mbubble[i].x > -1 && mbubble[i].x < 1) {
            if (mbubble[i].isShow) {
                if (i < 3)
                    DrawTransScal(mTex_Ripple, mbubble[i].x, mbubble[i].y - floatHeight(mTex_ModeBoard.height * .25), mbubble[i].z, 1 - (mbubble[i].z) * .4);
                else {
                    DrawTransScal(mTex_Ripple, pos[0][i % 3], pos[1][i % 3] - floatHeight(mTex_ModeBoard.height * .25), mbubble[i].z, 1 - (mbubble[i].z) * .4);
                }
            }
            mbubble[i].updateBubble();
        }
    }
    for (var i = 0; i < 3; i++) {
        DrawTextureSS(mTex_ModeBoard, pos[0][i], pos[1][i], 1, mSel == i + 1 ? 1.1 : Scal[i]);
        DrawTextureSS(mTex_Mode[mGameMode][i], pos[0][i], (pos[1][i] + .079), 1, mSel == i + 1 ? 1.1 : Scal[i]);
    }
    //		float y= (float)Math.toRadians((Counter*2)%360);
    //		DrawTexture(,mTex_Drum,.529f,-.789f+Math.abs((float)Math.sin(y)*.02f));
    //		DrawTexture(,mTex_SplashFrog[ani[Counter2%ani.length]],.509f,-.479f+Math.abs((float)Math.sin(y)*.02f));

    DrawTransScal(mTex_Home, -.889, .819, mSel == 4 ? 1.2 : 1, mSel == 4 ? .5 : 1);
    DrawCommonFront();
    if (Scal[Cnt] < 1) {
        Scal[Cnt] *= 2;
        if (setValue && Scal[Cnt] > .8) {
            Snd_Swing.play();
        }
        // if(Scal[Cnt]>.8)
        // SwingSound(GameRenderer.mContext,R.raw.swing);
    } else {

        Scal[Cnt] = 1;
        Cnt++;
        if (Cnt > 2)
            Cnt = 2;
    }

}

function HandleMode(pointer, events) {
    mSel = 0;
    for (var i = 0; i < 3; i++) {
        if (CircRectsOverlap(pos[0][i], pos[1][i], floatWidth(mTex_ModeBoard.width) * .3, floatHeight(mTex_ModeBoard.height) * .3, screen2worldX(pointer.x), screen2worldY(pointer.y), .05))
            mSel = i + 1;
    }
    if (CircRectsOverlap(-.889, .819, floatWidth(mTex_Home.width) * .4, (mTex_Home.height) * .4, screen2worldX(pointer.x), screen2worldY(pointer.y), .05))
        mSel = 4;

    if (events == 2) {
        console.log(mGameMode + " HandleMode " + mSel);
        switch (mSel) {
            case 1:
            case 2:
            case 3:
                GameReset(mSel);
                break;
            case 4:
                GameScreen = GAMEWORLD;
                setBubble2();
                for (var i = 0; i < 3; i++) {
                    Scal[i] = .005;
                    Cnt = 0;
                }
                break;
        }
        mSel = 0;
    }

}

function DrawOverPause() {
    DrawCommonBg();
    // DrawTexture(mTex_Makdi, -.549, -.27);
    var dy = .2;
    DrawTextureSS(mTex_Board, 0, dy, 1, mAni);
    DrawTextureSS(mTex_ScoreBoard, 0, .18 + dy, 1, mAni);
    if (mAni == 1) {
        var yy;
        // if (GameScreen == GAMEOVER)
        //     DrawTextureR(mTex_GameOver, 0, .469 + dy, -12.9);
        // if (GameScreen == GAMEPAUSE)
        //     DrawTextureR(mTex_GamePause, 0, .469 + dy, -12.9);
        DrawTextureR(mTex_GameOver, 0, .469 + dy, -12.9);
        var str = mGameMode == 0 ? parseFloat(mTimeCnt) + "" : parseInt(mTileCnt + "");

        str += "";
        if (str.length < 3)
            yy = .35;
        else
            yy = .34;
        drawNumber(str, .09, yy + dy, .015, 1); //Score
        var sc = mBestScore[mGameMode][mGameType % mBestScore[mGameMode].length];
        str = gameuser.allbest + "";
        if (str.length < 4)
            yy = .175;
        else
            yy = .17;
        drawNumber(str, .09, yy + dy, .015, 1); //Best

    }
    dy = 0;
    // DrawTextureSS(mTex_ChangeGame, -.719, -.3 - dy, 1, mSel == 5 ? 1.2 : mAni);
    // DrawTransScal(mTex_Home, -.88, .819, mSel == 4 ? 1.2 : 1, mSel == 4 ? .5 : 1);
    var no;

    var str = "Your Pin code is " + gameuser.PinCode + " keep it,\nyou will be notified if you won";
    DrawTexture(ScoreFont.setText(str), 0, -.2); //Score
    if (GameScreen == GAMEPAUSE)
        no = 2;
    else
        no = 1;

    DrawTransScal(mTex_Retry, 0, -.6, mSel == 1 ? 1.3 : 1.2, mSel == 1 ? .5 : 1);
    DrawTransScal(mTex_LeaderBoard, 0, -.9, mSel == 2 ? 1.3 : 1.2, mSel == 2 ? .5 : 1);
    // for (var i = 0; i < no && mAni == 1; i++) {
    //     if (i == 0)
    //         DrawTransScal(mTex_Retry, 0, -.15, mSel == i + 1 ? 1.3 : 1.2, mSel == i + 1 ? .5 : 1);
    //     if (i == 1)
    //         DrawTransScal(mTex_LeaderBoard, 0, -.5, mSel == i + 1 ? 1.3 : 1.2, mSel == i + 1 ? .5 : 1);
    //     if (i == 1)
    //         DrawTransScal(mTex_Play, -.129 + 1 * mMenuAni, -.079 + i * .042, mSel == i + 1 ? 1.2 : 1, mSel == i + 1 ? .5 : 1);

    // }
    DrawCommonFront();
    var dd;
    if (GameScreen == GAMEOVER)
        dd = .3;
    else
        dd = .17;
    if (mAni < .7)
        mAni *= 1.35;
    else {
        mAni = 1;
        if (mMenuAni < dd)
            mMenuAni *= 1.15;
        else
            mMenuAni = dd;
    }
    // DrawFree(, 0.8f, .68f);
}

function HandleOverPause(pointer, events) {
    mSel = 0;
    // var no;
    // if (GameScreen == GAMEPAUSE)
    //     no = 3;
    // else
    //     no = 1;
    // for (var i = 0; i < no; i++)
    //     if (CircRectsOverlap(-.129 + i * mMenuAni, -.079 + 0 * .042, floatWidth(mTex_Retry.width) * .4, floatHeight(mTex_Retry.height) * .4, screen2worldX(pointer.x), screen2worldY(pointer.y), .05))
    //         mSel = i + 1;
    //     // if(CircRectsOverlap(-.129+1*mMenuAni,-.079+2*.042,floatWidth(mTex_Retry.width)*.4,floatHeight(mTex_Retry.height)*.4,screen2worldX(pointer.x),screen2worldY(pointer.y),.05))
    //     // 	mSel=2;
    if (CircRectsOverlap(0, -.6, floatWidth(mTex_Retry.width) * .4, floatHeight(mTex_Retry.height) * .4, screen2worldX(pointer.x), screen2worldY(pointer.y), .05))
        mSel = 1; //Home
    if (CircRectsOverlap(-.0, -.9, floatWidth(mTex_LeaderBoard.width) * .4, floatHeight(mTex_LeaderBoard.height) * .4, screen2worldX(pointer.x), screen2worldY(pointer.y), .05))
        mSel = 2; //World

    // if(CircRectsOverlap(0.8, 0.68,floatWidth(mTex_Frey.width)*.5, floatHeight(mTex_Frey.height)*.5, screen2worldX(pointer.x),screen2worldY(pointer.y),.05))
    //  		mSel =100;
    //  	}
    if (events == 2) {
        switch (mSel) {
            case 1:
                GameScreen = GAMEEXT;
                break;
            case 2:
                submitScore(100);
                //Exit
                break;
        }
        mSel = 0;
    }
    return true;
}

function DrawCong() {
    DrawCommonBg();
    DrawTexture(mTex_Makdi, -.549, -.27);
    var dy = 0;
    DrawTextureSS(mTex_Board, 0, 0 - dy, 1, mAni);

    dy = 0;
    DrawTextureSS(mTex_ScoreBoard, 0, .18 + dy, 1, mAni);

    if (mAni == 1) {
        var yy;
        DrawTextureR(mTex_Cong, 0, .46, -11);
        var str = mGameMode == 0 ? parseFloat(mTimeCnt) + "" : parseInt(mTileCnt + "");
        if (str.length < 3)
            yy = .339 + .015;
        else
            yy = .339;
        drawNumber(mGameMode == 0 ? mTimeCnt + "" : mTileCnt + "", .079, yy, .015, 1); //Score
        // DrawTexture(ScoreFont.setText(mGameMode==0?parseFloat(mTimeCnt):parseInt(mTileCnt)),.079,yy); //Score

        var sc = mBestScore[mGameMode][mGameType % mBestScore[mGameMode].length];
        str = mGameMode == 0 ? parseFloat(sc) + "" : parseInt(sc) + "";
        if (str.length < 3)
            yy = .175 + .015;
        else
            yy = .175;
        drawNumber(mGameMode == 0 ? sc + "" : sc + "", .079, yy, .015, 1); //Best
        // DrawTexture(BestFont.setText(mGameMode==0?parseFloat(sc):parseInt(sc)),.079,yy); //Best

    }
    dy = 0
    DrawTextureSS(mTex_ChangeGame, -.719, -.3 - dy, 1, mSel == 5 ? 1.2 : mAni);
    DrawTransScal(mTex_Home, -.889, .819, mSel == 4 ? 1.2 : 1, mSel == 4 ? .5 : 1);
    for (var i = 0; i < 2 && mAni == 1; i++) {
        if (i == 0)
            DrawTransScal(mTex_Retry, -.129 + i * mMenuAni, -.079 + i * .042, mSel == i + 1 ? 1.2 : 1, mSel == i + 1 ? .5 : 1);
        // if(i==1)
        //   DrawTransScal(,mTex_LeaderBoard ,-.129+i*mMenuAni,-.079+i*.042,mSel==i+1?1.2:1,mSel==i+1?.5:1);
    }
    DrawCommonFront();
    if (mAni < .7)
        mAni *= 2.05;
    else {
        mAni = 1;
        if (mMenuAni < .3)
            mMenuAni *= 1.35;
        else
            mMenuAni = .3;
    }
}

function HandleCong(pointer, events) {
    mSel = 0;
    for (var i = 0; i < 1; i++)
        if (CircRectsOverlap(-.129 + i * mMenuAni, -.079 + i * .042, floatWidth(mTex_Retry.width) * .4, floatHeight(mTex_Retry.height) * .4, screen2worldX(pointer.x), screen2worldY(pointer.y), .05))
            mSel = i + 1;
    if (CircRectsOverlap(-.889, .819, floatWidth(mTex_Home.width) * .4, floatHeight(mTex_Home.height) * .4, screen2worldX(pointer.x), screen2worldY(pointer.y), .05))
        mSel = 4; //Home
    if (CircRectsOverlap(-.719, -.3, floatWidth(mTex_SmallBoard.width) * .4, floatHeight(mTex_SmallBoard.height) * .4, screen2worldX(pointer.x), screen2worldY(pointer.y), .05))
        mSel = 5; //World


    if (events == 2) {
        switch (mSel) {
            case 1:
                GameReset(mGameType + 1);
                break;
            case 2:
                isJoin = false;
                //					 if(GameRenderer.mStart.isSignedIn())
                //				       GameRenderer.mStart.onShowLeaderboardsRequested();
                //				     else
                //					   isJoin=true;
                break;
            case 4:
                mAni = .01;
                mMenuAni = .005;
                GameScreen = GAMEMENU;
                setBubble();
                if (SetBG) {
                    Snd_Theme.loop = true;
                    Snd_Theme.play();
                } else {
                    Snd_Theme.stop();
                }
                break;
            case 5:
                GameScreen = GAMEWORLD;
                setBubble2();
                break;
        }
        mSel = 0;
    }
    return true;
}
var bos = 0; //mGameMode;
function DrawScene() {


    DrawTexture(mTex_BG[bos], BG1, 0);
    DrawTexture(mTex_BG[bos], BG2, 0);


    DrawTexture(mTex_Wave[bos], BGWave[0], 0);
    DrawTexture(mTex_Wave[bos], BGWave[1], 0);
}


function drawNumber(no, x, y, dy, Align) {
    var dx = floatWidth(mTex_Font[0].width) * .45;
    var str = no;
    var len = str.length;
    if (Align == 1) //Center
        x -= (dx * (len)) * .5;
    if (Align == 2) //Right
        x -= (dx * (len)) * 1;
    var strs = no;



    for (var i = 0; i < strs.length; i++) {
        var k;
        if (strs.charAt(i) == '.')
            k = 12;
        else
            k = parseInt((strs.charAt(i)));

        // console.log("Number========  "+strs.length+"     "+k);
        if (k >= 0 && k < mTex_Font.length)
            DrawTexture(mTex_Font[k], x + i * dx, y + i * (dy * .85));
    }
}

function DrawTexture(img, x, y) {
    var hex = (255 * 0x010000) + (255 * 0x000100) + (255 * 0x000001);
    img.tint = hex;
    img.alpha = 1;
    img.scale.set(1);
    img.angle = 0;
    bmd.draw(img, XPos(x), YPos(y));
}

function DrawTexColor(img, x, y, r, g, b) {
    //Tex.DrawColor(_x, _y, r, g, b, sx, sy);
    var hex = (r * 0x010000) + (g * 0x000100) + (b * 0x000001);
    img.tint = hex;
    img.alpha = 1;
    img.scale.set(1);
    img.angle = 0;
    bmd.draw(img, XPos(x), YPos(y));

}

function DrawTexColorScal(img, x, y, r, g, b, sx, sy) {
    //Tex.DrawColor(_x, _y, r, g, b, sx, sy);
    bmd.draw(img, XPos(x), YPos(y));
    var hex = (r * 0x010000) + (g * 0x000100) + (b * 0x000001);
    img.tint = hex;
    img.alpha = 1;
    img.angle = 0;
    img.scale.setTo(sx, sy);
    bmd.draw(img, XPos(x), YPos(y));

}

function DrawTransScal(img, x, y, s, t) {
    var hex = (255 * 0x010000) + (255 * 0x000100) + (255 * 0x000001);
    img.tint = hex;
    img.alpha = t;
    img.angle = 0;
    img.scale.set(s);
    bmd.draw(img, XPos(x), YPos(y));
}

function DrawTextureRS(img, x, y, s, r) {
    var hex = (255 * 0x010000) + (255 * 0x000100) + (255 * 0x000001);
    img.tint = hex;
    img.alpha = 1;
    img.angle = r;
    img.scale.set(s);
    bmd.draw(img, XPos(x), YPos(y));
}

function DrawTextureR(img, x, y, r) {
    var hex = (255 * 0x010000) + (255 * 0x000100) + (255 * 0x000001);
    img.tint = hex;
    img.alpha = 1;
    img.scale.set(1);
    img.angle = r;
    bmd.draw(img, XPos(x), YPos(y));
}

function DrawTextureSS(img, x, y, sx, sy) {
    var hex = (255 * 0x010000) + (255 * 0x000100) + (255 * 0x000001);
    img.tint = hex;
    img.alpha = 1;
    img.scale.setTo(sx, sy);
    img.angle = 0;
    bmd.draw(img, XPos(x), YPos(y));
}

function DegreeToRadian(d) {
    var r = d * (Math.PI / 180);
    return r;
}

function RadianToDegree(r) {
    var d = r * (180 / Math.PI);
    return d;
}

function GetAne(d, e) {

    if (d == 0)
        return e >= 0 ? Math.PI / 2 : -Math.PI / 2;
    else if (d > 0)
        return Math.atan(e / d);
    else
        return Math.atan(e / d) + Math.PI;

}

function randomBoolean() {
    var r = Math.abs(RandomInt(0, 1) % 2);
    if (r < 1)
        return false;
    else
        return true;
}

function RandomInt(min, max) {
    // return Math.floor(Math.random() * (max - min + 1) + min);
    return game.rnd.integerInRange(min, max);
}

function Randomfloat(min, max) {
    var rand = game.rnd.frac();
    max = max - min;
    max = rand % max;
    return (max + min);
}

// game.rnd.Integer(), style);
// game.add.text(32, 60, 'Frac: ' + game.rnd.frac(), style);
// game.add.text(32, 90, 'Real: ' + game.rnd.real(), style);
function checkOverlap(spriteA, spriteB) {

    var boundsA = spriteA.getBounds();
    var boundsB = spriteB.getBounds();

    return Phaser.Rectane.varersects(boundsA, boundsB);
}

function CirCir(cx1, cy1, r1, cx2, cy2, r2) {
    var bVectMag = Math.sqrt(((cx1 - cx2) * (cx1 - cx2)) + ((cy1 - cy2) * (cy1 - cy2)));
    if (bVectMag < (r1 + r2))
        return true;
    return false;
}

function XPos(x) {
    return (((1 + x) * maxX) / 2);
}

function YPos(y) {
    return (((1 - (y)) * maxY) / 2);
}

function floatHeight(Height) {
    return (Height / maxY) * 2;
}

function floatWidth(Width) {
    return (Width / maxX) * 2;
}

function screen2worldX(a) {
    c = ((a / maxX) - 0.5) * 2;
    return c;
}

function screen2worldY(a) {
    c = ((a / maxY) - 0.5) * (-2);
    return c;
}

function Rect2Rectvarersection(ax, ay, adx, ady, bx, by, bdx, bdy) {
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