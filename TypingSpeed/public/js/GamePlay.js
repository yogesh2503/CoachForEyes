Game.GamePlay = function(game) {};
var GameScreen = 0,
    mSel = 0;
var GAMEMENU = 1,
    GAMELEVEL = 2,
    GAMEHELP = 3,
    GAMEPLAY = 4,
    GAMELEADER = 5,
    GAMEOVER = 6;
var outX = -100;
var mText;
var mFont = [];
var timeoutHandle;
Game.GamePlay.prototype = {
    init: function() { GameScreen = GAMEMENU; },
    preload: function() {},
    create: function() {
        bmd = this.game.add.bitmapData(maxX, maxY);
        bmd.addToWorld();
        bmd.smoothed = false;
        this.game.stage.backgroundColor = '#000000';
        mText = new TextType(this);

        mTex_keyboard = this.add.image(XPos(100), YPos(100), 'keyboard');
        mTex_Orientation = this.add.image(XPos(100), YPos(100), 'portrait');
        mTex_background = this.add.image(XPos(100), YPos(100), 'background');
        mTex_button.push(this.add.image(XPos(100), YPos(100), 'button'));
        mTex_button.push(this.add.image(XPos(100), YPos(100), 'button'));
        mTex_button.push(this.add.image(XPos(100), YPos(100), 'button'));
        mTex_title = this.add.image(XPos(100), YPos(100), 'title');
        mTex_circle = this.add.image(XPos(100), YPos(100), 'circle');
        mTex_menu = this.add.image(XPos(100), YPos(100), 'menu');
        mTex_score = this.add.image(XPos(100), YPos(100), 'score');
        mTex_leader = this.add.image(XPos(100), YPos(100), 'leader');

        mTex_keyboard.anchor.set(.5, .5);
        mTex_Orientation.anchor.set(.5, .5);
        mTex_background.anchor.set(.5, .5);
        mTex_button[0].anchor.set(.5, .5);
        mTex_button[1].anchor.set(.5, .5);
        mTex_button[2].anchor.set(.5, .5);
        mTex_title.anchor.set(.5, .5);
        mTex_circle.anchor.set(.5, .5);
        mTex_menu.anchor.set(.5, .5);
        mTex_score.anchor.set(.5, .5);
        mTex_leader.anchor.set(.5, .5);

        mFont.push(this.add.text(0, 0, 'Easy', { font: "40px Roboto Condensed", fill: "#eee", align: "center" }));
        mFont.push(this.add.text(0, 0, 'Medium', { font: "40px Roboto Condensed", fill: "#eee", align: "center" }));
        mFont.push(this.add.text(0, 0, 'Hard', { font: "40px Roboto Condensed", fill: "#eee", align: "center" }));
        mFont.push(this.add.text(0, 0, 'Hard', { font: "20px Roboto Condensed", fill: "#222", align: "left" }));
        mFont.push(this.add.text(0, 0, 'Hard 1\n\nHard 1\n\nHard 1', { font: "30px Roboto Condensed", fill: "#eee", align: "center" }));
        mFont.push(this.add.text(0, 0, 'Hard', { font: "20px Roboto Condensed", fill: "#222", align: "right" }));
        mFont[4].lineSpacing = -7;
        mFont[5].anchor.set(1, 0);
        setScreen(GAMEMENU);
        var isPressed = false;
        this.game.input.onDown.add(function(pointer) {
            isPressed = true;
            switch (GameScreen) {
                case GAMEMENU:
                    HandleMenu(pointer, 0);
                    break;
                case GAMEPLAY:
                    Handle_Gameplay(pointer, 0);
                    break;
                case GAMEOVER:
                    Handle_Gameover(pointer, 0);
                    break;
                case GAMELEADER:
                    Handle_LeaderBoard(pointer, 0);
                    break;
            }
        });
        this.game.input.addMoveCallback(function(pointer) {
            if (isPressed) {
                switch (GameScreen) {
                    case GAMEMENU:
                        HandleMenu(pointer, 1);
                        break;
                    case GAMEPLAY:
                        Handle_Gameplay(pointer, 1);
                        break;
                    case GAMEOVER:
                        Handle_Gameover(pointer, 1);
                        break;
                    case GAMELEADER:
                        Handle_LeaderBoard(pointer, 1);
                        break;
                }
            }
        });
        this.game.input.onUp.add(function(pointer) {
            switch (GameScreen) {
                case GAMEMENU:
                    HandleMenu(pointer, 2);
                    break;
                case GAMEPLAY:
                    Handle_Gameplay(pointer, 2);
                    break;
                case GAMEOVER:
                    Handle_Gameover(pointer, 2);
                    break;
                case GAMELEADER:
                    Handle_LeaderBoard(pointer, 2);
                    break;

            }
            isPressed = false;
        });
    },
    update: function() {
        bmd.cls();
        switch (GameScreen) {
            case GAMEMENU:
                Draw_Menu();
                break;
            case GAMEPLAY:
                Draw_Gameplay();
                break;
            case GAMEOVER:
                Draw_Gameover();
                break;
            case GAMELEADER:
                Draw_LeaderBoard();
                break;
        }
    }

};

function Draw_Menu() {
    DrawTexture(mTex_background, 0, 0);
    DrawTexture(mTex_title, 0, .60);
    DrawTranScal(mTex_button[0], 0, .10, mSel == 1 ? 1.1 : 1, mSel == 1 ? 0.5 : 1);
    DrawTranScal(mTex_button[1], 0, -.20, mSel == 2 ? 1.1 : 1, mSel == 2 ? 0.5 : 1);
    DrawTranScal(mTex_button[2], 0, -.50, mSel == 3 ? 1.1 : 1, mSel == 3 ? 0.5 : 1);
    DrawTranScal(mTex_leader, 0.8, -.8, mSel == 4 ? 1.1 : 1, mSel == 4 ? 0.5 : 1);
}


function HandleMenu(pointer, events) {
    mSel = 0;
    if (CircRectsOverlap(0.0, .10, floatWidth(mTex_button[0].width * .4), floatHeight(mTex_button[0].height * .4), screen2worldX(pointer.x), screen2worldY(pointer.y), 0.02)) {
        mSel = 1;
    }
    if (CircRectsOverlap(0.0, -.20, floatWidth(mTex_button[0].width * .4), floatHeight(mTex_button[0].height * .4), screen2worldX(pointer.x), screen2worldY(pointer.y), 0.02)) {
        mSel = 2;
    }
    if (CircRectsOverlap(0.0, -.50, floatWidth(mTex_button[0].width * .4), floatHeight(mTex_button[0].height * .4), screen2worldX(pointer.x), screen2worldY(pointer.y), 0.02)) {
        mSel = 3;
    }
    if (CircRectsOverlap(0.8, -.8, floatWidth(mTex_leader.width * .4), floatHeight(mTex_leader.height * .4), screen2worldX(pointer.x), screen2worldY(pointer.y), 0.02)) {
        mSel = 4;
    }
    if (events == 2) {
        switch (mSel) {
            case 1:
                mText.level = 0;
                setScreen(GAMEPLAY);
                break;
            case 2:
                mText.level = 1;
                setScreen(GAMEPLAY);
                break;
            case 3:
                mText.level = 2;
                setScreen(GAMEPLAY);
                break;
            case 4:

                setScreen(GAMELEADER);
                break;
        }
        mSel = 0;
    }
    return true;
}

function Draw_Gameplay() {
    DrawTexture(mTex_background, 0, 0);
    DrawTexture(mTex_keyboard, 0, 0);
    DrawTexture(mTex_circle, mTex_circle.px, mTex_circle.py);
    DrawTranScal(mTex_menu, 0.8, -.8, mSel == 1 ? 1.1 : 1, mSel == 1 ? 0.5 : 1);
}

function Handle_Gameplay(pointer, events) {
    mSel = 0;
    if (CircRectsOverlap(0.8, -.8, floatWidth(mTex_menu.width * .35), floatHeight(mTex_menu.height * .35), screen2worldX(pointer.x), screen2worldY(pointer.y), .05)) {
        mSel = 1;
    }
    console.log(events + " Handle_Gameover = " + mSel);
    if (events == 2 && mSel == 1) {
        setScreen(GAMEMENU);
        mSel = 0;
    }
}

function Draw_Gameover() {
    DrawTexture(mTex_background, 0, 0);
    DrawTexture(mTex_score, 0, 0);
    DrawTranScal(mTex_menu, -.2, -.65, mSel == 1 ? 1.1 : 1, mSel == 1 ? 0.5 : 1);
    DrawTranScal(mTex_leader, 0.2, -.65, mSel == 2 ? 1.1 : 1, mSel == 2 ? 0.5 : 1);

}

function Handle_Gameover(pointer, events) {

    mSel = 0;
    if (CircRectsOverlap(-.2, -.65, floatWidth(mTex_menu.width * .5), floatHeight(mTex_menu.height * .5), screen2worldX(pointer.x), screen2worldY(pointer.y), .05)) {
        mSel = 1;
    }
    if (CircRectsOverlap(0.2, -.65, floatWidth(mTex_menu.width * .5), floatHeight(mTex_menu.height * .5), screen2worldX(pointer.x), screen2worldY(pointer.y), .05)) {
        mSel = 2;
    }
    console.log(events + " Handle_Gameover = " + mSel);
    if (events == 2) {
        if (mSel == 1)
            setScreen(GAMEMENU);
        if (mSel == 2)
            setScreen(GAMELEADER);
        mSel = 0;
    }
}

function Draw_LeaderBoard() {
    DrawTexture(mTex_background, 0, 0);
    DrawTranScal(mTex_menu, .8, -.8, mSel == 1 ? 1.1 : 1, mSel == 1 ? 0.5 : 1);
}


function Handle_LeaderBoard(pointer, events) {
    mSel = 0;
    if (CircRectsOverlap(0.8, -.80, floatWidth(mTex_menu.width * .4), floatHeight(mTex_menu.height * .4), screen2worldX(pointer.x), screen2worldY(pointer.y), 0.02)) {
        mSel = 1;
    }

    if (events == 2) {
        switch (mSel) {
            case 1:
                mText.level = 0;
                setScreen(GAMEMENU);
                break;

        }
        mSel = 0;
    }
    return true;
}

function DrawTexture(img, x, y) {
    img.alpha = 1;
    img.angle = 0;
    img.scale.set(1);
    bmd.draw(img, XPos(x), YPos(y));
}

function DrawTranScal(img, x, y, s, t) {
    img.alpha = t;
    img.scale.set(s);
    bmd.draw(img, XPos(x), YPos(y));

}

function DrawTransScalFlip(img, x, y, s, t) {
    img.alpha = t;
    img.scale.setTo(-1 * s, s);
    // img.scale.set(s);
    bmd.draw(img, XPos(x), YPos(y));

}

function DrawTextureRS(img, x, y, s, r) {
    img.angle = r;
    img.scale.set(s);
    bmd.draw(img, XPos(x), YPos(y));
}

function DrawTextureR(img, x, y, r) {
    img.angle = r;
    bmd.draw(img, XPos(x), YPos(y));
}

function DrawTextureSS(img, x, y, sx, sy) {
    img.scale.setTo(sx, sy);
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

function GetAngle(d, e) {

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
    return game.rnd.integerInRange(min, max);
}

function Randomfloat(min, max) {
    var rand = game.rnd.frac();
    max = max - min;
    max = rand % max;
    return (max + min);
}


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

function setScreen(scr) {
    clearTimeout(timeoutHandle);
    GameScreen = scr;
    mTex_circle.visible = mTex_Orientation.visible = mTex_Logo.visible = false;
    mTex_keyboard.visible = false;
    mTex_title.visible = false;
    mTex_button.forEach(element => { element.visible = false; });
    mFont.forEach(element => { element.visible = false; });
    mTex_menu.visible = mTex_score.visible = false;
    mText.para.visible = false;
    mTex_leader.visible = false;
    switch (GameScreen) {
        case GAMEMENU:
            mTex_circle.visible = mTex_background.visible = mTex_title.visible = true;
            mTex_button.forEach(element => { element.visible = true; });
            for (let i = 0; i < 3; i++) {
                mFont[i].visible = true;
            }
            DrawTexture(mTex_background, 0, 0);
            DrawTexture(mTex_title, 0, .60);
            mFont[0].x = XPos(-0.08);
            mFont[0].y = YPos(.2);
            mFont[1].x = XPos(-.155);
            mFont[1].y = YPos(-.1);
            mFont[2].x = XPos(-.090);
            mFont[2].y = YPos(-.4);;
            mFont[0].text = "Easy";
            mFont[1].text = "Medium";
            mFont[2].text = "Hard";

            break;
        case GAMEPLAY:
            mTex_keyboard.visible = true;
            mText.para.visible = true;
            mText.reset();
            mFont[3].visible = true;
            mFont[3].x = XPos(-0.96);
            mFont[3].y = YPos(-.65);
            break;
        case GAMEOVER:
            mTex_menu.visible = mTex_score.visible = true;
            mTex_leader.visible = true;
            mFont[4].visible = true;
            mFont[4].x = XPos(0.0);
            mFont[4].y = YPos(0.25);
            // mTex_menu.visible = mTex_score.visible = false;
            break;
        case GAMELEADER:
            readScore();
            mTex_menu.visible = mTex_score.visible = true;
            mTex_leader.visible = true;
            mFont[3].visible = true;
            mFont[3].x = XPos(-.0);
            mFont[3].y = YPos(0.9);
            mFont[3].text = "";

            mFont[5].visible = true;
            mFont[5].x = XPos(-.01);
            mFont[5].y = YPos(0.9);
            mFont[5].text = "";

            scoreList.forEach(element => {
                mFont[3].text += " : " + element[0] + "\n";
                mFont[5].text += element[1] + "\n";
            });
            break;
    }
}

function nextTurn() {

    clearTimeout(timeoutHandle);
    mText.time++;
    var persent = 0;
    var timers = mText.time;
    if (mText.level == 2) {
        timers = TIME4LEVEL - timers;

        if (mText.time >= TIME4LEVEL) {
            mText.gameover();
            return;
        }

    }


    var time = Math.floor(timers / 60) + (timers % 60 > 9 ? ":" : ":0") + timers % 60;
    var wpm = 0;
    if (mText.correct > 0) {
        wpm = Math.round((mText.correct / mText.time) * 12);
        persent = Math.round((100 * mText.correct) / mText.count);
    }
    if (mText.level == 0) {
        mFont[3].text = "Accuracy : " + persent + "%";
    }
    if (mText.level == 1) {
        mFont[3].text = "Speed: " + wpm + " wpm\n" + "Accuracy : " + persent + "%";
    }
    if (mText.level == 2) {
        mFont[3].text = "Time: " + time + " sec \n" + "Speed: " + wpm + " wpm\n" + "Accuracy : " + persent + "%";
    }

    timeoutHandle = setTimeout(nextTurn, 1000);
}