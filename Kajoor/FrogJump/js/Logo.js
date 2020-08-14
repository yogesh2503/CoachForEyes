var game;
var Game = {};
var maxX = 854;
var maxY = 480;
var gameRatio = window.innerWidth / window.innerHeight;
var firstRunLandscape;

var mTex_BG = Array(1),
    mTex_bgDark = Array(1),
    mTex_Wave = Array(1),
    mTex_SplashFrog = Array(5),
    mTex_Menu = Array(3),
    mTex_Setting = Array(3),
    mTex_SettingIcn = Array(3);
var mTex_Logo, mTex_SplashTxt, mTex_Board, mTex_Drum, mTex_SmallBoard, mTex_Google, mTex_FB, mTex_HelpBtn, mTex_Home, mTex_AbtBtn;
var mTex_Help, mTex_Abt, mTex_More, mTex_AdFree, mTex_BubbleIcn, mTex_Buybtn, mTex_GameOver, mTex_GamePause, mTex_ScoreBoard;
var mTex_LeaderBoard, mTex_Retry, mTex_Play, mTex_ChangeGame, mTex_Makdi, mTex_WorldBoard, mTex_WorldIcn = Array(0),
    mTex_WorldTxt = Array(3),
    mTex_Mode = Array(2);
var mTex_ModeBoard, mTex_ScoreBox, mTex_Pause, mTex_LoadBar, mTex_Exit, mTex_Pointer, mTex_JoinText, mTex_JoinBtn, mTex_Cong;
var mTex_Ani = Array(10),
    mTex_Dot = Array(2),
    mTex_Font = Array(13);

var mTex_Step = Array(7),
    mTex_BOne;
var mTex_Frog = Array(8),
    mTex_BTwo, mTex_WaterAni = Array(8),
    mTex_Ripple;
var uiHeart = Array(3),
    uiEmpty = Array(3);


Game.Logo = function(game) {

};
Game.Logo.prototype = {

    init: function() {
        // getStore();
    },
    preload: function() {


        firstRunLandscape = this.game.scale.isGameLandscape;
        if (!this.game.device.desktop) {
            this.game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
            this.game.scale.forceOrientation(true, false);
            // window.scrollTo(0, 1);
        } else {
            this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.game.scale.forceOrientation(false, false);
        }


        this.game.scale.enterIncorrectOrientation.add(handleIncorrect);
        this.game.scale.leaveIncorrectOrientation.add(handleCorrect);
        this.game.scale.pageAlignHorizontally = true;
        this.game.scale.pageAlignVertically = true;
        this.scale.setScreenSize = true;
        this.stage.disableVisibilityChange = true;
        this.game.scale.refresh();

        this.load.image('logo', 'assets/logo.jpg');

        for (var i = 0; i < mTex_BG.length; i++) {
            this.load.image("bg" + i, "assets/bg/bg" + i + ".png");
            this.load.image("bgdark" + i, "assets/bg/bgdark" + i + ".png");
            this.load.image("wave" + i, "assets/bg/wave" + i + ".png");
        }


        for (var i = 0; i < mTex_Step.length; i++)
            this.load.image('step' + i, "assets/bg/step" + i + ".png");

        this.load.image("one_jump", "assets/one_jump.png");
        this.load.image("two_jump", "assets/two_jump.png");


        for (var i = 0; i < mTex_Frog.length; i++) {
            this.load.image("smallfrog" + i, "assets/frog/small" + i + ".png");
        }

        for (var i = 0; i < mTex_WaterAni.length; i++)
            this.load.image("waterani" + i, "assets/waterani/" + i + ".png");

        this.load.image('waterripple', "assets/bg/water_ripple.png");



        this.load.image('splash_text', "assets/ui/splash_text.png");
        this.load.image('big_bord', "assets/ui/big_bord.png");

        for (var i = 0; i < mTex_SplashFrog.length; i++)
            this.load.image('frogbig' + i, "assets/frog/big" + i + ".png");

        this.load.image('drum', "assets/drum.png");

        for (var i = 0; i < mTex_Menu.length; i++)
            this.load.image('menu' + i, "assets/ui/menu" + i + ".png");
        this.load.image('small_board', "assets/ui/small_board.png");
        // this.load.image('g', "assets/ui/g+.png");

        for (var i = 0; i < mTex_Setting.length; i++) {
            this.load.image('setting' + i, "assets/ui/setting" + i + ".png");
        }

        for (var i = 0; i < mTex_SettingIcn.length; i++)
            mTex_SettingIcn[i] = Array(2);

        this.load.image('settingicn00', "assets/ui/settingicn00" + ".png");

        for (var i = 0; i < mTex_SettingIcn.length; i++) {
            for (var j = 0; j < mTex_SettingIcn[0].length; j++) {
                this.load.image(i + 'settingicn' + j, ("assets/ui/settingicn" + i) + j + ".png");
            }
        }
        for (var i = 0; i < mTex_Font.length; i++) {
            this.load.image('font' + i, "assets/font/" + i + ".png");
        }

        // this.load.image('fb', "assets/ui/fb.png");
        this.load.image('help_btn', "assets/ui/help_btn.png");
        this.load.image('home', "assets/ui/home.png");
        // this.load.image('about', "assets/ui/about.png");
        this.load.image('help', "assets/ui/help.png");
        // this.load.image('about_text', "assets/ui/about_text.png");
        // this.load.image('more', "assets/ui/more.png");
        // this.load.image('buy_ads', "assets/ui/buy_ads.png");
        // this.load.image('bubble_icon', "assets/ui/bubble_icon.png");
        this.load.image('buy_btn', "assets/submit.png");
        this.load.image('game-over', "assets/ui/game-over.png");
        this.load.image('gamepaused', "assets/ui/gamepaused.png");
        this.load.image('scoree', "assets/ui/scoree.png");
        this.load.image('leader', "assets/exit.png");
        this.load.image('retry', "assets/continue.png");
        // this.load.image('play', "assets/ui/play.png");
        // this.load.image('change-game', "assets/ui/change-game.png");
        this.load.image('spider_web', "assets/ui/spider_web.png");
        // this.load.image('world_bord', "assets/ui/world_bord.png");
        for (var i = 0; i < mTex_WorldIcn.length; i++) {
            this.load.image('worldIcn' + i, "assets/ui/worldIcn" + i + ".png");
            this.load.image('worldtxt' + i, "assets/ui/worldtxt" + i + ".png");
        }


        // for (var i = 0; i < 2; i++) {
        //     mTex_Mode[i] = Array(3);
        //     for (var j = 0; j < 3; j++)
        //         this.load.image(i + 'mode' + j, ("assets/ui/mode" + i) + j + ".png");
        // }
        // this.load.image('world_bord_small', "assets/ui/world_bord_small.png");
        this.load.image('score_box', "assets/ui/score_box.png");
        // this.load.image('pause_btn', "assets/ui/pause_btn.png");
        // this.load.image('congratulation', "assets/ui/congratulation.png");

        this.load.image('heart', "assets/heart.png");
        this.load.image('heartempty', "assets/heartempty.png");


        // this.load.image('dot0', "assets/ui/dot0.png");
        // this.load.image('dot1', "assets/ui/dot1.png");

        for (var i = 0; i < mTex_Ani.length; i++)
            this.load.image('drop' + i, "assets/drop/" + i + ".png");


        console.log("innnnnnnnnn Logo");

        this.game.load.audio('button_click', ['assets/sound/button_click.mp3', 'assets/sound/button_click.ogg']);
        this.game.load.audio('congratulations', ['assets/sound/congratulations.mp3', 'assets/sound/congratulations.ogg']);
        this.game.load.audio('dumping', ['assets/sound/dumping.mp3', 'assets/sound/dumping.ogg']);
        this.game.load.audio('frog', ['assets/sound/frog.mp3', 'assets/sound/frog.ogg']);
        this.game.load.audio('gameover', ['assets/sound/gameover.mp3', 'assets/sound/gameover.ogg']);
        this.game.load.audio('gameplay', ['assets/sound/gameplay.mp3', 'assets/sound/gameplay.ogg']);
        this.game.load.audio('jump0', ['assets/sound/jump0.mp3', 'assets/sound/jump0.ogg']);
        this.game.load.audio('jump1', ['assets/sound/jump1.mp3', 'assets/sound/jump1.ogg']);
        this.game.load.audio('jump2', ['assets/sound/jump2.mp3', 'assets/sound/jump2.ogg']);
        this.game.load.audio('jump3', ['assets/sound/jump3.mp3', 'assets/sound/jump3.ogg']);
        this.game.load.audio('menu_theme', ['assets/sound/menu_theme.mp3', 'assets/sound/menu_theme.ogg']);
        this.game.load.audio('swing', ['assets/sound/swing.mp3', 'assets/sound/swing.ogg']);



    },
    create: function() {
        this.game.stage.backgroundColor = "#f7f7f7";
        this.game.time.advancedTiming = true;
        this.game.time.desiredFps = 33;
        this.game.time.slowMotion = 1.0;
        mTex_Logo = this.add.image(XPos(0), YPos(0), 'logo');
        mTex_Logo.anchor.set(.5, .5);
        mTex_Logo.scale.set(1);
        document.getElementById("loader").style.display = "none";
    },

    update: function() {
        Counter += 1;
        if (Counter > 40) {
            this.state.start('GamePlay');
            Counter = 0;
        }
    },
}

function handleIncorrect() {
    if (!this.game.device.desktop) {
        document.getElementById("turn").style.display = "block";
    }
}

function handleCorrect() {
    if (!this.game.device.desktop) {
        // if(firstRunLandscape)
        // {
        // 	// Counter.log("innnnnnnnnn");
        // 	this.game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
        // 	this.game.width  = 480;
        // 	this.game.height = 854;
        // 	maxX = 480;
        // 	maxX = 854;
        // 		this.game.renderer.resize(maxX,maxY);
        // 	this.game.scale.refresh();

        // }

        document.getElementById("turn").style.display = "none";
    }
}