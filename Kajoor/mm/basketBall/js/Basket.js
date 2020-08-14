class Basket {
    constructor(gme) {

        this.x = 0;
        this.y = 353;
        this.isMytime = false;
        this.basketback = gme.add.sprite(this.x, this.y, 'basketback');
        this.Anim = 0;
        this.bback = Array();
        for (var i = 0; i < 4; i++) {
            this.bback.push(gme.add.sprite(this.x, this.y, 'bback' + i));
            this.bback[i].scale.set(1.6, 1.6);
        }

        this.holder = gme.add.sprite(this.x + 30, this.y + 37, 'holder');
        gme.physics.box2d.enable(this.holder, false);
        this.holder.body.static = true;

        this.side = gme.add.sprite(this.x + 52, this.y + 62, '');
        gme.physics.box2d.enable(this.side, false);
        this.side.body.setCircle(5);
        this.side.body.static = true;

        this.side2 = gme.add.sprite(this.x + 122, this.y + 62, '');
        gme.physics.box2d.enable(this.side2, false);
        this.side2.body.setCircle(5);
        this.side2.body.static = true;


    }
    addobj(gme) {
        this.basketfrant = Array();
        for (var i = 0; i < 4; i++) {
            this.basketfrant.push(gme.add.sprite(this.x, this.y, 'bfront' + i));
            this.basketfrant[i].scale.set(1.6, 1.6);
        }
    }

    setObjectL(_x, _y, _isset) {
        this.x = _x;
        this.y = _y;
        this.isMytime = _isset;
        this.basketback.x = this.x;
        this.basketback.y = this.y;


        this.holder.body.x = this.x + 30;
        this.holder.body.y = this.y + 37;

        this.side.body.x = this.x + 54;
        this.side.body.y = this.y + 62;

        this.side2.body.x = this.x + 142;
        this.side2.body.y = this.y + 62;
        for (var i = 0; i < 4; i++) {
            this.bback[i].x = this.x + 2;
            this.bback[i].y = this.y + 46;
            this.basketfrant[i].x = this.x + 2;
            this.basketfrant[i].y = this.y + 56;
            this.bback[i].visible = (i == 0);
            this.basketfrant[i].visible = (i == 0);
        }
    }

    left_update(inc) {
        this.x += inc;
        this.basketback.x = this.x;
        this.holder.body.x = this.x + 30;

        this.side.body.x = this.x + 56;
        this.side2.body.x = this.x + 142;

        // this.side.body.x = this.x + 50;
        // this.side2.body.x = this.x + 122;
        for (var i = 0; i < 4; i++) {
            this.bback[i].x = this.x - 4;
            this.basketfrant[i].x = this.x - 4;
        }
    }
    setObjectR(_x, _y, _isset) {
        this.x = _x;
        this.y = _y;
        this.isMytime = _isset;
        this.basketback.x = this.x;
        this.basketback.y = this.y;
        this.basketback.scale.x = -1;

        this.holder.body.x = this.x - 30;
        this.holder.body.y = this.y + 37;

        this.side.body.x = this.x - 52;
        this.side.body.y = this.y + 62;

        this.side2.body.x = this.x - 122;
        this.side2.body.y = this.y + 62;
        for (var i = 0; i < 4; i++) {
            this.bback[i].x = this.x - 160;
            this.bback[i].y = this.y + 46;
            this.basketfrant[i].x = this.x - 127;
            this.basketfrant[i].y = this.y + 56;
            this.bback[i].visible = (i == 0);
            this.basketfrant[i].visible = (i == 0);
        }
    }
    right_update(inc) {
        this.x += inc;
        this.basketback.x = this.x;
        this.holder.body.x = this.x - 30;
        this.side.body.x = this.x - 56;
        this.side2.body.x = this.x - 142;

        for (var i = 0; i < 4; i++) {
            this.bback[i].x = this.x - 200;
            this.basketfrant[i].x = this.x - 200;
        }
    }
}

function Draw_Gameplay() {

    if (mRid_Ball.body.y < mLBasket.y + 20 && mLBasket.isMytime) {
        lasty = mRid_Ball.body.y;
    }

    if (mRid_Ball.body.y > mLBasket.y + 100 && mLBasket.isMytime) {
        lasty = mRid_Ball.body.y;
    }

    if (mRid_Ball.body.y < mRBasket.y + 20 && mRBasket.isMytime) {
        lasty = mRid_Ball.body.y;
    }

    if (mRid_Ball.body.y > mRBasket.y + 100 && mRBasket.isMytime) {
        lasty = mRid_Ball.body.y;
    }

    if (mRid_Ball.body.x > 70 && mRid_Ball.body.x < 110 && mRid_Ball.body.y > mLBasket.y + 62 && mRid_Ball.body.y < mLBasket.y + 80 && mLBasket.isMytime) {
        console.log(lasty.toFixed(2) + " ~L~~ " + mLBasket.y.toFixed(2));
        if (lasty < mLBasket.y + 25)
            scoreUpdate(true);
    }

    if (mRid_Ball.body.x < maxX - 70 && mRid_Ball.body.x > maxX - 110 && mRid_Ball.body.y > mRBasket.y + 62 && mRid_Ball.body.y < mRBasket.y + 80 && mRBasket.isMytime) {
        console.log(lasty.toFixed(2) + " ~R~~ " + mLBasket.y.toFixed(2));
        if (lasty < mRBasket.y + 25)
            scoreUpdate(false);
    }
    if (mLBasket.x < 0 && mLBasket.isMytime) {
        mLBasket.left_update(5);
        if (mLBasket.x > 0) {
            mLBasket.setObjectL(0, mLBasket.y, true);
        }
    }
    if (mLBasket.x > -180 && mLBasket.isMytime == false) {
        mLBasket.left_update(-5);
    }

    if (mRBasket.x > maxX && mRBasket.isMytime) {
        mRBasket.right_update(-5);
        if (mRBasket.x < maxX) {
            mRBasket.setObjectL(maxX, mRBasket.y, true);
        }
    }
    if (mRBasket.x < maxX + 150 && mRBasket.isMytime == false) {
        mRBasket.right_update(5);
    }
    if (mRBasket.Anim > 0) {
        for (var i = 0; i < 4; i++) {
            mRBasket.bback[i].visible = (mRBasket.Anim == i);
            mRBasket.basketfrant[i].visible = (mRBasket.Anim == i);
        }
        mRBasket.Anim++;
        mRBasket.Anim = mRBasket.Anim % 4;
    }
    if (mLBasket.Anim > 0) {
        for (var i = 0; i < 4; i++) {
            mLBasket.bback[i].visible = (mLBasket.Anim == i);
            mLBasket.basketfrant[i].visible = (mLBasket.Anim == i);
        }
        mLBasket.Anim++;
        mLBasket.Anim = mLBasket.Anim % 4;
    }

    if (mNScore > 0) {
        if (gameTImer > 1) {
            gameTImer--;
            cropRect = new Phaser.Rectangle(0, 0, mTex_Time.w * gameTImer * .002, mTex_Time.height);
            mTex_Time.crop(cropRect);
        }

        if (mRid_Ball.y > 700) {
            inc = 1;
            if (gameTImer < 2) {
                setSCreen(GAMEOVER);
            }
        }
        if (textInc.y > -40) {
            textInc.y -= 5;
        }
    }
}

function scoreUpdate(isleft) {
    if (isleft) {
        mLBasket.isMytime = false;
        mRBasket.setObjectR(maxX + 150, random(100, 500), true);
        mLBasket.Anim = 1;
    } else {
        mLBasket.setObjectL(-150, random(100, 500), true);
        mRBasket.isMytime = false;
        mRBasket.Anim = 1;
    }
    mScore += inc;
    text.text = '' + mScore;
    textInc.text = '+' + inc;
    inc++;
    textInc.y = mRid_Ball.y;
    textInc.x = mRid_Ball.x;
    mNScore++;
    gameTImer = 500;
}

function ballUpdate() {


    if (mRid_Ball.body.x > maxX + 20) {
        mRid_Ball.body.x = -20;
    }
    if (mRid_Ball.body.x < -20) {
        mRid_Ball.body.x = maxX + 20;
    }
    mTex_Shadow.x = mRid_Ball.body.x;
    mTex_Shadow.scale.x = .1 + mRid_Ball.body.y * .0015;
    mTex_Shadow.scale.y = .1 + mRid_Ball.body.y * .0015;


}