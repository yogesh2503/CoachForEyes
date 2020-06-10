class Player {
    constructor() {
        this.spd = -.1;
        this.no = 0;
        this.vy = 0;
        this.life = 3;
        this.over = 0;
        this.lvl = 1;
        this.roll = 0;
        this.hroll = 0;
        this.distance = 0;
        this.lifeloss = 0;
        this.group = new THREE.Group();
        this.paer1;
        this.paer2;
        this.name = "";
        this.bronze = 0;
        this.silver = 0;
        this.gold = 0;
        this.platinum = 0;
        this.newscore = false;
        this.ranvirus = Array(36);
        for (let i = 0; i < this.ranvirus.length; i++) {
            this.ranvirus[i] = -5.7 + i * .25;
        }
        this.ranvirus.sort(compRan);
        this.nvo = 0;
    }
    set() {
        this.newscore = false;
        this.lifeloss = 0;
        this.over = 0;


        if (this.lvl <= 10)
            this.spd = -(.1 + this.lvl * .01);
        else if (this.lvl < 15)
            this.spd = -.2;
        else if (this.lvl < 20)
            this.spd = -.21;
        else
            this.spd = -.22;


        this.vy = 0.01;
        this.roll = 0;
        this.life = 3;
        mPlan_Home.position.set(100 + this.lvl * 50, -3, 0);
        this.distance = 0;

        for (let i = 0; i < mPlan_Police.length && this.over == 0; i++) {
            mPlan_Police[i].visible = false;
        }
        for (let i = 0; i < mPlan_Paper.length && this.over == 0; i++) {
            mPlan_Paper[i].visible = (mPlan_Home.position.x - 10 > mPlan_Paper[i].position.x);
        }
        for (let i = 0; i < mPlan_Virus.length && this.over == 0; i++) {
            mPlan_Virus[i].visible = (mPlan_Home.position.x - 10 > mPlan_Virus[i].position.x);
        }
        this.group.visible = false;
        this.group.position.x = mPlan_Player[this.no].position.x;
        DrawLblA(mTex_fonts[4], "" + this.roll, 145, 40, BUTTONFONT, 40, ThreeUI.anchors.left, ThreeUI.anchors.top, "left");
    }
    update() {
        for (let i = 0; i < mPlan_Road.length; i++) {
            mPlan_Road[i].position.x += this.spd;
        }
        for (var i = 0; i < mPlan_Road.length; i++) {
            if (mPlan_Road[i].position.x < -28)
                mPlan_Road[i].position.x = mPlan_Road[(i == 0 ? mPlan_Road.length : i) - 1].position.x + 16;;
        }
        for (let i = 0; i < mPlan_Police.length && this.over == 0; i++) {
            if (mPlan_Police[i].visible && Rect2RectIntersection(mPlan_Player[this.no].position.x, mPlan_Player[this.no].position.y, .7, 1.5, mPlan_Police[i].position.x, mPlan_Police[i].position.y, .7, 1.5)) {
                mPlan_Police[i].visible = false;
                this.checkOver();
            }
            if (mPlan_Police[i].position.y < -5) {
                mPlan_Police[i].vy = .05;
            }
            if (mPlan_Police[i].position.y > 5) {
                mPlan_Police[i].vy = -.05;
            }
            mPlan_Police[i].position.y += mPlan_Police[i].vy;
            mPlan_Police[i].position.x += this.spd;

        }
        for (let i = 0; i < mPlan_Virus.length && this.over == 0; i++) {
            if (mPlan_Virus[i].visible && this.lifeloss <= 0 && CircRectsOverlap(mPlan_Player[this.no].position.x, mPlan_Player[this.no].position.y, .5, 1.0, mPlan_Virus[i].position.x, mPlan_Virus[i].position.y, 0.1)) {
                mPlan_Virus[i].visible = false;
                this.checkOver();
            }
            mPlan_Virus[i].position.x += this.spd;

            // if (mPlan_Virus[i].position.x < -30) {
            //     mPlan_Virus[i].position.set(mPlan_Virus[(i == 0 ? mPlan_Virus.length : i) - 1].position.x + 10, random(-5, 6), 0);
            //     mPlan_Virus[i].visible = (mPlan_Home.position.x - 10 > mPlan_Virus[i].position.x);
            // }

        }
        for (let i = 0; i < mPlan_Paper.length && this.over == 0; i++) {
            if (mPlan_Paper[i].visible && CircRectsOverlap(mPlan_Player[this.no].position.x, mPlan_Player[this.no].position.y, 0.6, 1.2, mPlan_Paper[i].position.x, mPlan_Paper[i].position.y, 0.5)) {
                mPlan_Paper[i].visible = false;
                this.roll++;
                rollSound();
                this.group.visible = true;
                this.paer1.visible = true;
                this.paer2.visible = this.roll > 1;
                DrawLblA(mTex_fonts[4], "" + mPly.roll, 95, 8, BUTTONFONT, 30, ThreeUI.anchors.left, ThreeUI.anchors.bottom, "left");
                if (this.roll > this.hroll && this.newscore == false && this.hroll > 0) {
                    // this.hroll = this.roll;
                    this.newscore = true;
                    setnaim("CONGRATULATIONS\n\nNEW SCORE : " + mPly.hroll);
                }
                // console.log(this.roll + "  " + this.bronze);
                if (this.roll == 100 && this.bronze == 0) {

                    this.bronze = 1;
                    setnaim("CONGRATULATIONS\n\nACHIEVE BRONZE MEDAL");
                }
                if (this.roll == 200 && this.silver == 0) {
                    this.silver = 1;
                    setnaim("CONGRATULATIONS\n\nACHIEVE SILVER MEDAL");
                }
                if (this.roll == 300 && this.gold == 0) {
                    this.gold = 1;
                    setnaim("CONGRATULATIONS\n\nACHIEVE GOLD MEDAL");
                }
                if (this.roll == 500 && this.platinum == 0) {
                    this.platinum = 1;
                    setnaim("CONGRATULATIONS\n\nACHIEVE PLATINUM MEDAL");
                }

            }
            mPlan_Paper[i].position.x += this.spd;
            // if (mPlan_Paper[i].position.x < -30) {
            //     mPlan_Paper[i].position.set(mPlan_Paper[(i == 0 ? mPlan_Paper.length : i) - 1].position.x + 10, random(-5, 6), 0);
            //     mPlan_Paper[i].visible = (mPlan_Home.position.x - 10 > mPlan_Paper[i].position.x);
            // }
        }

        mPlan_Player[this.no].position.y += this.vy;
        if (mPlan_Player[this.no].position.y > 3) {
            mPlan_Player[this.no].position.y = 3;
            this.vy = 0;
        }
        this.group.position.y = mPlan_Player[this.no].position.y;
        if (this.over > 0) {
            this.over++;
            if (this.over > 60) {
                setScreen(GAMEOVER);
            }
            this.vy -= .01;
            if (mPlan_Player[this.no].position.y > -4) {
                this.vy = 0;
            }
            this.spd = 0;
        } else {
            this.vy -= .01;
        }

        mPlan_Home.position.x += this.spd;
        this.distance += this.spd;
        if (this.distance < -40) {
            this.distance = 0;
            for (let i = 0; i < mPlan_Police.length && mPlan_Police[i].position.x < -40; i++) {
                mPlan_Police[i].visible = true;
                mPlan_Police[i].position.set(40, random(-5, 6), 0);
                mPlan_Police[i].visible = (mPlan_Home.position.x - 10 > mPlan_Police[i].position.x);
                for (let j = 0; j < mPlan_Virus.length; j++) {
                    if (CircRectsOverlap(mPlan_Police[i].position.x, mPlan_Police[i].position.y, 2, 15, mPlan_Virus[j].position.x, mPlan_Virus[j].position.y, 1.5)) {
                        mPlan_Virus[j].visible = false;
                    }
                }

                break;
            }

        }
        mPlan_Player[this.no].visible = (this.lifeloss <= 0 || Counter % 4 > 1)
        this.lifeloss--;

        if (this.lifeloss == 0)
            Show(0);

        if (mPlan_Player[this.no].position.y > 8 || mPlan_Player[this.no].position.y < -8) {
            mPlan_Player[this.no].position.y = 0;
            this.vy = 0;
            this.checkOver();
        }
        if (Counter % 30 == 0) {
            this.setMegaRoll();
        }
        if (Counter % 30 == 15) {
            this.setVirus();
        }
        if (mPlan_Home.position.x <= 0) {
            if (this.spd != 0) {
                WinSound();
            }


            this.spd = 0;
            this.vy = 0;
            mPlan_Player[this.no].position.y = -4.5;
            mPlan_Player[this.no].position.x += 0.1;
            this.group.position.x = mPlan_Player[this.no].position.x;
            if (mPlan_Player[this.no].position.x > 0) {
                mPlan_Player[this.no].visible = false;
                this.group.visible = false;
            }

            if (mPlan_Player[this.no].position.x > 2)
                setScreen(GAMEWIN);
        }
    }
    handle(e, type) {
        if (mPlan_Home.position.x <= 0) {

            return;
        }
        if (type == 0 && this.over == 0 && mPlan_Home.position.x > -9)
            this.vy = .2;
    }
    checkOver() {
        this.life--;
        if (this.life <= 0 && this.over <= 0) {
            this.over = 1;
            OverSound();
        }
        for (let i = 0; i < mTex_Heart.length; i++) {
            mTex_Heart[i].visible = this.life > i;
        }
        this.lifeloss = 40;
        hitSound();
        Show(1);
    }

    setMegaRoll() {
        var noP = 1;
        var pos = 30;
        for (let i = 0; i < mPlan_Paper.length; i++) {
            if (mPlan_Paper[i].position.x > pos) {
                pos = mPlan_Paper[i].position.x;
            }
        }
        if (pos > 30) {
            // checkOverlap();
            return;
        }
        pos += 5;
        if (random(0, 6) >= 5) {
            noP = 20;
        } else {
            noP = random(1, 6);
        }
        var yy = random(-5, 3);
        for (let i = 0, j = 0; i < mPlan_Paper.length && j < noP; i++) {
            if (mPlan_Paper[i].position.x < -25) {
                if (j % 2 == 0)
                    mPlan_Paper[i].position.set(pos + j * 1, yy, 0);
                else
                    mPlan_Paper[i].position.set(.5 + pos + j * 1, yy - .2, 0);
                mPlan_Paper[i].visible = (mPlan_Home.position.x - 10 > mPlan_Paper[i].position.x);
                j++;
            }
            // if (noP == 20)
            //     console.log(i + " j : " + j + "  " + mPlan_Paper[i].position.x.toFixed(2));
        }
        this.checkOverlap();
    }

    setVirus() {
        if (this.roll == 0)
            mPlan_Home.position.set(100 + this.lvl * 50, -3, 0);
        var noP = 1;
        var pos = 30;
        for (let i = 0; i < mPlan_Virus.length; i++) {
            if (mPlan_Virus[i].position.x > pos) {
                pos = mPlan_Virus[i].position.x;
            }
        }
        if (pos > 60) {
            // checkOverlap();
            return;
        }
        pos += (5 - this.lvl * .1);
        if (pos < 2)
            pos = 2;
        noP = random(1, 4);
        noP = 1;
        var yy = random(-5, 3);
        var vv = random(-2, 2) * .1;
        for (let i = 0, j = 0; i < mPlan_Virus.length && j < noP; i++) {
            if (mPlan_Virus[i].position.x < -25) {
                mPlan_Virus[i].position.set(pos + j * 1, this.ranvirus[this.nvo++] + j * vv, 0);
                mPlan_Virus[i].visible = (mPlan_Home.position.x - 10 > mPlan_Virus[i].position.x);
                j++;
                if (this.nvo >= this.ranvirus.length) {
                    this.ranvirus.sort(compRan);
                    this.nvo = 0;
                }
            }
        }
        this.checkOverlap();
    }

    checkOverlap() {
        for (let i = 0; i < mPlan_Virus.length; i++) {
            if (mPlan_Virus[i].position.x > 0 && mPlan_Virus[i].visible) {
                for (let j = 0; j < mPlan_Paper.length; j++) {
                    if (circir(mPlan_Virus[i].position.x, mPlan_Virus[i].position.y, .31, mPlan_Paper[j].position.x, mPlan_Paper[j].position.y, .31) && mPlan_Paper[j].position.x > 0 && mPlan_Paper[j].visible) {
                        mPlan_Virus[i].position.x = -100;
                        mPlan_Virus[i].visible = false;
                    }
                }
            }
        }
    }
}