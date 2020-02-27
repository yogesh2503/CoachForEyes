class Block {
    constructor() {
        this.no = 2; //[2, 2, 2, 2];
        this.timer = 0; //[6, 4, 3, 2];
        this.count = 0; //[6, 4, 3, 2];
        this.tile = Array(4);
        for (let i = 0; i < this.tile.length; i++) {
            if (i == 1)
                this.tile[i] = (loadBLOCK('assets/p4.png'));
            else
                this.tile[i] = (loadBLOCK('assets/p' + i + '.png'));
        }
        this.textA = createTexts('100', 20, '#fff', ThreeUI.anchors.center, ThreeUI.anchors.center, 'center', 'HanaleiFill');
        // this.textB = createTexts('100', 20, '#fff', ThreeUI.anchors.center, ThreeUI.anchors.center, 'center', 'HanaleiFill');
    }
    update() {
        this.count--;
        if (this.count <= 0) {
            this.timer--;
            this.count = MAXTIME;
            if (this.timer <= 0 && this.no == 2) {
                this.no--;
                this.timer = 3;
            }
            if (this.timer <= 0 && this.no <= 1) {
                if (this.no == 1) {
                    this.no = 3;
                    this.timer = 1;
                    this.count = Math.floor(MAXTIME * .3);
                } else {
                    this.no = 2;
                    this.timer = 3;
                }
            }
            if (this.timer <= 0 && this.no == 3) {
                mRapido.checkCondition();
                this.no = 2;
                this.timer = 3;
            }
            this.tile.forEach(element => { element.visible = false; });
            this.tile[this.no].visible = true;

            if (this.no == 2) {
                DrawLblClr(this.textA, "" + this.timer, FONTSCORE);
                // DrawLblClr(this.textB, "" + this.timer, FONTSCORE);
            } else if (this.no == 1) {
                DrawLblClr(this.textA, "", BUTTONFONT);
                // DrawLblClr(this.textB, "", FONTGREEN);
            } else {
                // this.textB.text = "";
                this.textA.text = "";
            }
        }
    }
    reset() {
        this.no = 0;
        this.timer = 1;
        this.count = getRan(0, MAXTIME);
        this.tile.forEach(element => { element.visible = false; });
        this.tile[this.no].visible = true;
        // this.textB.text = "";
        this.textA.text = "";
    }
    setPosition(x, y) {
        this.no = 2;
        this.timer = getRan(1, 6)
        this.count = getRan(0, MAXTIME);
        this.tile.forEach(element => {
            element.x = x;
            element.y = y;
        });
        DrawTransScal(this.tile[this.no], x, y, 128, 128, 1, 1);
        DrawLbl(this.textA, "" + this.timer, x, y + 10, FONTSCORE, 30, "center"); //DOWN
        // DrawLbl(this.textB, "" + this.timer, x, y + 30, FONTSCORE, 20, "center"); //DOWN
    }
    setMenu(x, y, val) {
        DrawTransScal(this.tile[val], x, y, 128, 128, 1, 1);
        DrawLbl(this.textA, val == 2 ? "STOP" : "", x, y + 10, FONTSCORE, 30, "center"); //DOWN
    }
    setVisible(visible) {
        this.tile.forEach(element => { element.visible = visible; });
        this.textA.visible = visible;
        // this.textB.visible = visible;
    }
}

class Rapido {
    constructor() {
        this.group = new THREE.Group();
        this.levelScore = [];
        this.mBlock = Array();
        for (let i = 0; i < 35; i++) {
            this.mBlock.push(new Block());
        }
        this.timer = 0;
        this.levelUpConter = 0;
        scene.add(this.group);
        this.level = 1;
        this.points = 0;
        this.life = 3;
        this.lastBox = 0;
        this.startCounter = 3;
        this.numberofWin = 0;
        this.allscore = 0;
    }
    draw() {
        for (let i = 0; i < this.mBlock.length && i < this.level + 3 && this.levelUpConter == 0; i++) {
            this.mBlock[i].update();
        }
        if (this.levelUpConter > 0) {
            for (let i = 0; i < animGif.length && this.numberofWin >= MAXWINCOUNT; i++) {
                animGif[i].visible = Math.floor(Counter / 10) % 6 == i;
            }
            this.levelUpConter--;
            if (this.levelUpConter == 1) {
                this.gameOver();
            }
        }
    }
    gamereset() {
        mTex_fonts[4].visible = mTex_fonts[4].visible = false;
        this.levelUpConter = 0;
        this.numberofWin = 0;
        this.points = 0;
        this.allscore = 0;
        for (let i = 0; i < this.levelScore.length; i++) {
            this.allscore += this.levelScore[i];
        }
        this.lastBox = 0;
        this.startCounter = 3;

        DrawLblRT(mTex_fonts[0], "Score : " + (this.allscore + this.points), 50, 30, FONTSCORE, 20);
        DrawLblRT(mTex_fonts[1], "Level : " + this.level, 50, 60, FONTSCORE, 20);
        DrawLblLT(mTex_fonts[2], "Time : " + (LVLTIMER - mRapido.timer) + " sec", 50, 30, FONTSCORE, 20);
        var ff = -this.level * 16;
        if (this.level < 13) {
            for (let i = 0; i < this.mBlock.length && i < this.level + 3; i++) {
                if (i % 3 == 0)
                    this.mBlock[i].setPosition(0, ff - 55 + Math.floor(i / 3) * 110);
                else
                    this.mBlock[i].setPosition(i % 3 == 1 ? -93 : 93, ff + Math.floor(i / 3) * 110);
            }
        } else if (this.level < 18) {
            ff = -this.level * 11;
            for (let i = 0; i < this.mBlock.length && i < this.level + 3; i++) {
                if (i % 2 == 0)
                    this.mBlock[i].setPosition((i % 4 == 0 ? -186 : 0) + 45, ff - 55 + Math.floor(i / 4) * 110);
                else
                    this.mBlock[i].setPosition((i % 4 == 1 ? -93 : 93) + 45, ff + Math.floor(i / 4) * 110);
            }
        } else {
            ff = -this.level * 8;
            console.log("ff = " + ff)
            if (ff < -260) {
                ff = -270;
            }
            for (let i = 0; i < this.mBlock.length && i < this.level + 3; i++) {
                if (i % 10 > 4)
                    this.mBlock[i].setPosition(-145 + ((i % 5) * 73), (i % 2 == 0 ? 45 : 0) + ff + Math.floor(i / 5) * 87);
                else
                    this.mBlock[i].setPosition(-145 + ((i % 5) * 73), (i % 2 != 0 ? 45 : 0) + ff + Math.floor(i / 5) * 87);
                this.mBlock[i].tile.forEach(element => {
                    element.height = element.width = 100;
                });
                this.mBlock[i].textA.size = 24;
            }
        }

        timeoutHandle = setTimeout(mRapido.nextTurn, 500);
        for (let i = 0; i < 3; i++) {
            mTex_EHeart[i].visible = true;
            DrawTextureAlign(mTex_Heart[i], 30 + i * 35, 20, ThreeUI.anchors.right, ThreeUI.anchors.bottom);
        }
    }

    handle_Gameplay(e, type) {
        mSel = 0;
        for (let i = 0; i < this.mBlock.length && i < this.level + 3; i++) {
            if (this.mBlock[i].no == 1) {
                bounds = this.mBlock[i].tile[0].getBounds();
                if (ThreeUI.isInBoundingBox(coords.x, coords.y, bounds.x, bounds.y, bounds.width, bounds.height)) {
                    mSel = i + 1;
                    this.mBlock[i].tile[this.mBlock[i].no].alpha = .51;
                }
            }
        }
        console.log(type + " mSel = " + mSel);
        if (type == 2) {
            if (mSel > 0) {
                this.mBlock[mSel - 1].reset();
                this.points += 10;
                this.numberofWin++;
                if (this.levelUpConter == 0 && this.numberofWin >= MAXWINCOUNT) {
                    this.levelUpConter = 50;
                }
                DrawLblRT(mTex_fonts[0], "Score : " + (this.allscore + this.points), 50, 30, FONTSCORE, 20);
            }

            mSel = 0;
            for (let i = 0; i < this.mBlock.length && i < this.level + 3; i++) {
                this.mBlock[i].tile.forEach(element => { element.alpha = 1; });
            }
        }
    }
    nextTurn() {
        clearTimeout(timeoutHandle);
        if (mRapido.timer >= LVLTIMER) {
            mRapido.levelUpConter = 150;
            // mRapido.timer = 0;
            return;
        }
        timeoutHandle = setTimeout(mRapido.nextTurn, 1000);
        mRapido.timer++;
        DrawLblLT(mTex_fonts[2], "Time : " + (LVLTIMER - mRapido.timer) + " sec", 50, 30, FONTSCORE, 20);
        mRapido.isStart = true;
    }
    checkCondition() {
        this.life--;
        this.numberofWin = 0;
        for (let i = 0; i < 3; i++) {
            mTex_Heart[i].visible = i < this.life;
        }
        if (this.life <= 0) {
            this.levelUpConter = 50;
            // this.gameOver();
        }
    }
    setNewGame() {
        butArry[0].visible = butArry[1].visible = false;
        tex_right.visible = tex_wrong.visible = false;
        mTex_fonts[6].visible = false;
    }
    gameOver() {
        clearTimeout(timeoutHandle);
        this.levelScore.push(this.points);
        setScreen(this.numberofWin >= MAXWINCOUNT ? GAMELEVEL : GAMEOVER);
    }
    getTwoVal() {
        var minmax = (1 + Math.floor(this.level / 4)) * 10;
        var vala = getRan(-minmax, minmax);
        var valb = getRan(-minmax, minmax);
        if (vala < valb) {
            return [vala, valb];
        }
        return [valb, vala];
    }
    getTwoPosVal() {
        var minmax = (1 + Math.floor(this.level / 4)) * 10;
        var vala = getRan(0, minmax)
        var valb = getRan(0, minmax)
        if (vala < valb) {
            return [vala, valb];
        }
        return [valb, vala];
    }
}