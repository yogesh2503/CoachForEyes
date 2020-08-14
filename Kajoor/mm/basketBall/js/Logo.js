var maxX = 480;
var maxY = 854;
var mLBasket = null;
var mRBasket = null;
var mTex_BG, mTex_TimeBack, mTex_Time, mTex_Shadow;
var mTex_logo, mTex_over, mTex_continue, mTex_exit, mTex_submit, input_Box;

var mRid_Base, mRid_Ball;
var gameTImer = 0;
var mScore = 0;
var mNScore = 0;
var inc = 1;
var lasty = 700;
var mGame;
var counter = 0;
var isDown = false;

function preload() {
    console.log("preload ");
    getStore();
    this.load.image('logo', 'img/logo.jpg');
    this.load.image('holder', 'img/holder.jpg');
    this.load.image('side', 'img/side.png');
    this.load.image('bg', 'img/bg.jpg');
    this.load.image('ball', 'img/ball.png');
    this.load.image('basketback', 'img/basketback.png');
    this.load.image('basketfrant', 'img/basketfrant.png');
    this.load.image('time', 'img/time.png');
    this.load.image('timeback', 'img/timeback.png');
    this.load.image('shadow', 'img/shadow.png');


    this.load.image('over', 'img/over.png');
    this.load.image('continue', 'img/continue.png');
    this.load.image('exit', 'img/exit.png');
    this.load.image('submit', 'img/submit.png');

    for (var i = 0; i < 4; i++) {
        this.load.image('bback' + i, 'img/back' + i + '.png');
        this.load.image('bfront' + i, 'img/front' + i + '.png');
    }
}

function create() {
    mGame = this.game;
    firstRunLandscape = mGame.scale.isGameLandscape;
    if (!mGame.device.desktop) {
        mGame.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
        mGame.scale.forceOrientation(true, false);
    } else {
        mGame.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        mGame.scale.forceOrientation(false, false);
    }
    mGame.scale.enterIncorrectOrientation.add(handleIncorrect);
    mGame.scale.leaveIncorrectOrientation.add(handleCorrect);
    mGame.scale.pageAlignHorizontally = true;
    mGame.scale.pageAlignVertically = true;
    this.scale.setScreenSize = true;
    this.stage.disableVisibilityChange = true;
    mGame.scale.refresh();
    mGame.stage.backgroundColor = '#f7f7f7';

    mGame.physics.startSystem(Phaser.Physics.BOX2D);
    mGame.physics.box2d.gravity.y = 600;
    mGame.physics.box2d.restitution = 0.8;
    mGame.physics.box2d.friction = 0.5;
    mGame.add.plugin(PhaserInput.Plugin);
    mTex_logo = mGame.add.sprite(maxX * .5, maxY * .5, 'logo');
    mTex_logo.anchor.set(.5, .5);
    GameScreen = GAMELOGO;
    mGame.canvas.setAttribute('id', 'canvas');



}

function GameInit() {
    mRid_Base = mGame.add.sprite(maxX * .5, maxY * .9, 'logo');
    mRid_Base.scale.x = 4;
    mRid_Base.scale.y = .1;
    mRid_Base.smoothed = false;
    mGame.physics.box2d.enable(mRid_Base, false);
    mRid_Base.body.static = true;

    mTex_BG = mGame.add.sprite(0, 0, 'bg');

    mTex_TimeBack = mGame.add.sprite(110, 80, 'timeback');
    mTex_Time = mGame.add.sprite(110, 80, 'time');
    mTex_Time.w = mTex_Time.width;
    mTex_Shadow = mGame.add.sprite(maxX * .5, maxY * .89, 'shadow');
    mTex_Shadow.alpha = .5;
    mTex_Shadow.w = mTex_Shadow.width;
    mTex_Shadow.anchor.set(.5, .5);
    mLBasket = new Basket(mGame);
    mRBasket = new Basket(mGame);

    mRid_Ball = mGame.add.sprite(maxX * .5, maxY * .5, 'ball');
    mRid_Ball.smoothed = false;
    mGame.physics.box2d.enable(mRid_Ball, false);
    mRid_Ball.body.setCircle(26);

    mLBasket.addobj(mGame);
    mRBasket.addobj(mGame);

    mLBasket.setObjectL(-150, 300, true);
    mRBasket.setObjectR(maxX + 150, random(100, 500), false);

    mTex_over = mGame.add.sprite(maxX * .5, maxY * .25, 'over');
    mTex_over.anchor.set(.5, .5);


    var style = { font: "bold 32px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
    text = mGame.add.text(maxX * .45, 0, "0", style);
    text.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);

    var style = { font: "bold 28px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
    textInc = mGame.add.text(maxX * .5, 100, "+1", style);
    textInc.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);

    mGame.input.onDown.add(mouseDragStart, this);
    mGame.input.addMoveCallback(mouseDragMove, this);
    mGame.input.onUp.add(mouseDragEnd, this);


    document.addEventListener('touchstart', e => { mouseDragStart(e); });
    document.addEventListener('touchmove', e => { mouseDragMove(e); });
    document.addEventListener('touchend', e => { mouseDragEnd(e); });

    mTex_continue = mGame.add.sprite(maxX * .5, maxY * .69, 'continue');
    mTex_continue.anchor.set(.5, .5);

    mTex_exit = mGame.add.sprite(maxX * .5, maxY * .8, 'exit');
    mTex_exit.anchor.set(.5, .5);

    mTex_submit = mGame.add.sprite(maxX * .5, maxY * .7, 'submit');
    mTex_submit.anchor.set(.5, .5);

    // input_Box = mGame.add.inputField(80, 180, {
    //     font: '18px Arial',
    //     fill: '#212121',
    //     fontWeight: 'bold',
    //     width: 300,
    //     padding: 8,
    //     borderWidth: 1,
    //     borderColor: '#000',
    //     borderRadius: 6,
    //     placeHolder: 'Enter Coupon code',
    // });

    // var input = new CanvasInput({ canvas: document.getElementById('canvas'), 'z-index': 1 });
    // input.setAttribute('id', 'canvas');

    // var input = document.createElement('input');
    // input.setAttribute('type', 'text');
    // input.setAttribute('id', 'id');
    // input.setAttribute('placeholder', 'placeholder');
    // document.body.appendChild(input);

    input_Box = addInputBox(couponids);
    input_Box.style.width = window.innerHeight * .4;
    var per = ((window.innerWidth - window.innerHeight * .4) / window.innerWidth) * 50;
    input_Box.style.left = per + "%";
    setSCreen(GAMEPLAY);
}

function mouseDragStart(pointer) {
    isDown = turn;
    // console.log(pointer.x, pointer.y);
    // mGame.physics.box2d.mouseDragStart(mGame.input.mousePointer);
    switch (GameScreen) {
        case GAMELOGO:
            break;
        case GAMEOVER:
        case GAMEEXT:
            Handle_Over(pointer, 0);
            break;
        case GAMEPLAY:
            if (gameTImer > 1) {
                mRid_Ball.body.velocity.x = mLBasket.isMytime ? -100 : 100;
                mRid_Ball.body.velocity.y = -500;
            }
            break
    }
}

function mouseDragMove(pointer) {
    switch (GameScreen) {
        case GAMELOGO:
            break;
        case GAMEOVER:
        case GAMEEXT:
            Handle_Over(pointer, 1);
            break;
        case GAMEPLAY:
            break
    }
}

function mouseDragEnd(pointer) {

    switch (GameScreen) {
        case GAMELOGO:
            break;
        case GAMEOVER:
        case GAMEEXT:
            Handle_Over(pointer, 2);
            break;
        case GAMEPLAY:
            break
    }
    mGame.time.slowMotion = 0.5;
    isDown = false;
}

function render() {
    counter++;
    // mGame.debug.box2dWorld();
    switch (GameScreen) {
        case GAMELOGO:
            if (counter < 100) {
                if (counter == 99) {
                    GameInit();
                }
                return;
            }
        case GAMEOVER:
            break;
        case GAMEEXT:
            break;
        case GAMEPLAY:
            Draw_Gameplay();
            break
    }
    ballUpdate();
}

function handleIncorrect() {
    // if (!mGame.device.desktop) {
    //     document.getElementById("turn").style.display = "block";
    // }
}

function handleCorrect() {
    if (!mGame.device.desktop) {
        // if(firstRunLandscape)
        // {
        // 	// Counter.log("innnnnnnnnn");
        // 	mGame.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
        // 	mGame.width  = 480;
        // 	mGame.height = 854;
        // 	maxX = 480;
        // 	maxX = 854;
        // 		mGame.renderer.resize(maxX,maxY);
        // 	mGame.scale.refresh();

        // }

        document.getElementById("turn").style.display = "none";
    }
}

function random(min, max) {
    return (min + Math.floor(Math.random() * (max - min)));
}

function setSCreen(scr) {
    GameScreen = scr;
    mTex_logo.visible = mTex_over.visible = mTex_continue.visible = mTex_exit.visible = mTex_submit.visible = false;
    mTex_TimeBack.visible = mTex_Time.visible = false;
    // input_Box.visible = false;
    input_Box.style.display = "none";
    switch (GameScreen) {
        case GAMEOVER:
            mTex_over.visible = mTex_continue.visible = mTex_exit.visible = true;
            text.text = 'Score : ' + mScore + ' \n\nBest : ' + gameuser.allbest;
            text.x = 120;
            text.y = 170;

            textInc.text = "Your pin code is 100 keep it\nyou will be notified if you won";
            textInc.x = 40;
            textInc.y = 400;
            mLBasket.setObjectL(-500, mLBasket.y, false);
            mRBasket.setObjectL(maxX + 500, mRBasket.y, false);
            mTex_continue.y = maxY * .65;
            mTex_exit.y = maxY * .75;
            GetBestScore();
            break;
        case GAMEEXT:
            mTex_exit.visible = mTex_submit.visible = input_Box.visible = true;
            mTex_submit.y = maxY * .5;
            mTex_exit.y = maxY * .6;
            text.text = "Enter counpan code";
            text.x = 90;
            text.y = maxY * .1;
            input_Box.y = maxY * .2;
            textInc.y = -400;
            input_Box.style.display = "block";
            break;
        case GAMEPLAY:
            GetBestScore();
            mTex_TimeBack.visible = mTex_Time.visible = true;
            text.text = "0";
            text.x = maxX * .45;
            text.y = 0;
            textInc.text = "00";
            textInc.x = maxX * .45;
            textInc.y = -400;
            gameTImer = 500;
            mNScore = 0;
            cropRect = new Phaser.Rectangle(0, 0, mTex_Time.w, mTex_Time.height);
            mTex_Time.crop(cropRect);
            mLBasket.setObjectL(-150, 300, true);
            mRBasket.setObjectR(maxX + 150, random(100, 500), false);
            break
    }
}
var mouse = { x: 0, y: 0 };

function Handle_Over(pointer, type) {
    mTex_continue.alpha = 1;
    mTex_exit.alpha = 1;
    mTex_submit.alpha = 1;

    if (pointer.touches != null) {
        if (pointer.touches.length > 0) {
            mouse.x = pointer.touches[0].pageX * (maxX / window.innerWidth);
            mouse.y = pointer.touches[0].pageY * (maxY / window.innerHeight);

        }
    } else {
        mouse.x = pointer.x;
        mouse.y = pointer.y;
    }

    if (CircRectsOverlap(mTex_continue.x, mTex_continue.y, mTex_continue.width * .5, mTex_continue.height * .5, mouse.x, mouse.y, 1) && isDown) {
        mTex_continue.alpha = .1;
    }
    if (CircRectsOverlap(mTex_submit.x, mTex_submit.y, mTex_submit.width * .5, mTex_submit.height * .5, mouse.x, mouse.y, 1) && isDown) {
        mTex_submit.alpha = .1;
    }
    if (CircRectsOverlap(mTex_exit.x, mTex_exit.y, mTex_exit.width * .5, mTex_exit.height * .5, mouse.x, mouse.y, 1) && isDown) {
        mTex_exit.alpha = .1;
    }
    if (type == 2) {
        console.log("mTex_continue " + mTex_continue.alpha);
        if (mTex_continue.alpha != 1 && GameScreen == GAMEOVER) {
            setSCreen(GAMEEXT);
        }
        if (mTex_submit.alpha != 1 && GameScreen == GAMEEXT) {
            console.log("Enter counpan code\n" + cinput.value);
            if (cinput.value.length > 0) {
                validateagain(cinput.value);
            } else {
                alert("Enter Valid ID");
            }
        }
        if (mTex_exit.alpha != 1) {
            submitScore();
        }
        mTex_continue.alpha = 1;
        mTex_exit.alpha = 1;
        mTex_submit.alpha = 1;
    }


}