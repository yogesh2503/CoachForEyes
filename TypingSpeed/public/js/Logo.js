var game;
var Counter = 0;
var Game = {};
var maxX = 854;
var maxY = 480;
var gameRatio = window.innerWidth / window.innerHeight;
var firstRunLandscape;
var keypositions = [],
    person;
var mTex_Logo, mTex_Orientation, mTex_keyboard;
var mTex_background, mTex_button = [],
    mTex_title, mTex_circle, mTex_menu, mTex_score, mTex_leader;
Game.Logo = function(game) {};
Game.Logo.prototype = {
    init: function() {},
    preload: function() {
        firstRunLandscape = this.game.scale.isGameLandscape;
        if (!this.game.device.desktop) {
            this.game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
            this.game.scale.forceOrientation(true, false);
        } else {
            this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.game.scale.forceOrientation(true, false);
        }
        this.game.scale.enterIncorrectOrientation.add(handleIncorrect);
        this.game.scale.leaveIncorrectOrientation.add(handleCorrect);
        this.game.scale.pageAlignHorizontally = true;
        this.game.scale.pageAlignVertically = true;
        this.scale.setScreenSize = true;
        this.stage.disableVisibilityChange = true;
        this.game.scale.refresh();
        this.load.image('logo', 'assets/logo.png');
        this.load.image('keyboard', 'assets/keybord.png');
        this.load.image('portrait', 'assets/portrait.png');
        this.load.image('background', 'assets/background.jpg');
        this.load.image('button', 'assets/button.png');
        this.load.image('title', 'assets/title.png');
        this.load.image('circle', 'assets/circle.png');
        this.load.image('score', 'assets/score.png');
        this.load.image('menu', 'assets/menu.png');
        this.load.image('leader', 'assets/leader.png');
        Counter = 0;
    },
    create: function() {
        this.game.time.advancedTiming = true;
        this.game.time.desiredFps = 33;
        this.game.time.slowMotion = 1.0;
        mTex_Logo = this.add.image(XPos(0), YPos(0), 'logo');
        mTex_Logo.anchor.set(.5, .5);
        var one = [27, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 46];
        var two = [192, 49, 50, 51, 52, 53, 54, 55, 56, 57, 48, 189, 187, 222];
        var three = [9, 81, 87, 69, 82, 84, 89, 85, 73, 79, 80, 221, 8];
        var four = [0, 65, 83, 68, 70, 71, 72, 74, 75, 76, 186, 219, 13];
        var five = [0, 90, 88, 67, 86, 66, 78, 77, 188, 190, 191, 38, 0];
        var six = [17, 91, 18];
        var seven = [18, 17, 220, 37, 40, 39];
        for (j = 0; j < 2; j++) {
            for (let i = 0; i < 14; i++) {
                if (j == 0)
                    keypositions.push([one[i], -.507 + .0785 * i, -.24]); //14
                else
                    keypositions.push([two[i], -.507 + .0785 * i, -.37]); //14
            }
        }
        for (j = 0; j < 3; j++) {
            for (let i = 0; i < 14; i++) {
                if (j == 0)
                    keypositions.push([three[i], -.47 + .0788 * i, -.505]); //13
                else if (j == 1)
                    keypositions.push([four[i], -.47 + .0788 * i, -.650]); //13
                else
                    keypositions.push([five[i], -.405 + .0765 * i, -.79]); //13
            }
        }
        for (let i = 0; i < 3; i++) {
            keypositions.push([six[i], -.507 + .0785 * i, -.93]); //3
        }
        keypositions.push([32, -.1, -.93]); //1 space
        for (let i = 0; i < 6; i++)
            keypositions.push([seven[i], .13 + .0777 * i, -.93]); //6

        person = prompt("Please enter your name", "");
        if (person == null || person == "") {
            person = "Unknow";
        } else {
            console.log("   ######### " + person);
        }
        document.addEventListener('keydown', dealWithKeyboard);
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

        document.getElementById("turn").style.display = "none";
    }
}

function dealWithKeyboard(e) {
    mText.textupdate(e);
}