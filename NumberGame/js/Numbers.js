var MX = 14;
class Numbers {
    constructor() {
        this.group = new THREE.Group();
        this.plans = [];
        for (let i = 0; i < 3; i++) {
            this.plans.push(createPlanMesh());
            this.group.add(this.plans[i]);
            this.plans[i].traverse(function(child) { if (child.isMesh) { child.material.map = tex_empty; } });
            this.plans[i].visible = false;
            this.group.add(this.plans[i]);
            this.plans[i].scale.set(MX, MX * 2, MX);
        }
        this.levelScore = [];
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
        this.value = Array(3);
        this.value[0] = Math.floor(Math.random() * 10);
        this.value[1] = Math.floor(Math.random() * 3);
        this.value[2] = Math.floor(Math.random() * 10);
        this.isGiven = 0;
    }
    draw() {
        if (this.isGiven == 0) {
            DrawTransScal(butRedArry[0], -100, 193, 100, 40, mSel == 1 ? 1.1 : 1, mSel == 1 ? 0.5 : 1);
            DrawTransScal(butRedArry[1], 100, 193, 100, 40, mSel == 2 ? 1.1 : 1, mSel == 2 ? 0.5 : 1);
        } else {
            if (this.isGiven == 1) {
                DrawTransScal(butArry[0], -100, 193, 100, 40, mSel == 1 ? 1.1 : 1, mSel == 1 ? 0.5 : 1);
                DrawTransScal(butRedArry[1], 100, 193, 100, 40, mSel == 2 ? 1.1 : 1, mSel == 2 ? 0.5 : 1);
            } else {
                DrawTransScal(butRedArry[0], -100, 193, 100, 40, mSel == 1 ? 1.1 : 1, mSel == 1 ? 0.5 : 1);
                DrawTransScal(butArry[1], 100, 193, 100, 40, mSel == 2 ? 1.1 : 1, mSel == 2 ? 0.5 : 1);
            }
        }
        if (this.levelUpConter > 0) {
            for (let i = 0; i < animGif.length && this.numberofWin >= MAXWINCOUNT; i++) {
                animGif[i].visible = Math.floor(Counter / 10) % 6 == i;
            }
            this.levelUpConter--;
            if (this.levelUpConter == 1) {
                console.log("Gameover.levelUpConter = " + this.levelUpConter);
                if (this.numberofWin >= MAXWINCOUNT || this.life <= 0 || this.timer >= LVLTIMER) {
                    console.log("Gameover....levelUpConter = " + this.levelUpConter);
                    this.gameOver();
                } else {
                    this.setNewGame();
                }
            }

        }
    }
    gamereset() {
        mTex_fonts[4].visible = mTex_fonts[4].visible = false;
        this.levelUpConter = 0;
        this.points = 0;
        this.allscore = 0;
        for (let i = 0; i < this.levelScore.length; i++) {
            this.allscore += this.levelScore[i];
        }
        this.lastBox = 0;
        this.startCounter = 3;
        var ff = 0;
        DrawLblRT(mTex_fonts[ff++], "Score : " + (this.allscore + this.points), 50, 30, FONTSCORE, 20);
        DrawLblRT(mTex_fonts[ff++], "Level : " + this.level, 50, 60, FONTSCORE, 20);
        DrawLblLT(mTex_fonts[ff++], "Time : " + (LVLTIMER - mNumbers.timer) + " sec", 50, 30, FONTSCORE, 20);
        DrawLbl(mTex_fonts[ff++], "YES", -100, 202, BUTTONFONT, 20);
        DrawLbl(mTex_fonts[ff++], "NO", 100, 202, BUTTONFONT, 20);
        DrawLbl(mTex_fonts[ff++], "Is this operation correct?", 0, -180, FONTGREEN, 28);
        DrawLbl(mTex_fonts[ff++], "Oups! Wrong answer.", 0, 50, FONTSCORE, 24);

        this.setNewGame();

        timeoutHandle = setTimeout(mNumbers.nextTurn, 500);
        for (let i = 0; i < 3; i++) {
            mTex_Heart[i].visible = true;
            DrawTextureAlign(mTex_Heart[i], 30 + i * 35, 40, ThreeUI.anchors.right, ThreeUI.anchors.bottom);
        }
    }

    handle_Gameplay(e, type) {
        mSel = 0;
        if (this.isGiven == 0) {
            bounds = butRedArry[0].getBounds();
            if (ThreeUI.isInBoundingBox(coords.x, coords.y, bounds.x, bounds.y, bounds.width, bounds.height)) {
                mSel = 1;
            }
            bounds = butRedArry[1].getBounds();
            if (ThreeUI.isInBoundingBox(coords.x, coords.y, bounds.x, bounds.y, bounds.width, bounds.height)) {
                mSel = 2;
            }
            if (type == 2 && mSel > 0) {
                butRedArry[mSel - 1].visible = false;
                this.isGiven = mSel;
                this.checkCondition();
                mSel = 0;
            }
        }
    }
    nextTurn() {
        clearTimeout(timeoutHandle);
        if (mNumbers.timer >= LVLTIMER) {
            mNumbers.levelUpConter = 150;
            // mNumbers.timer = 0;
            return;
        }
        timeoutHandle = setTimeout(mNumbers.nextTurn, 1000);
        mNumbers.timer++;
        DrawLblLT(mTex_fonts[2], "Time : " + (LVLTIMER - mNumbers.timer) + " sec", 50, 30, FONTSCORE, 20);
        mNumbers.isStart = true;
    }
    checkCondition() {
        if ((this.value[0] > this.value[2] && this.value[1] == 0) ||
            (this.value[0] < this.value[2] && this.value[1] == 1) ||
            (this.value[0] == this.value[2] && this.value[1] == 2)) {
            if (this.isGiven == 1)
                tex_right.visible = true;
            else
                tex_wrong.visible = true;
        } else {
            if (this.isGiven == 2)
                tex_right.visible = true;
            else
                tex_wrong.visible = true;
        }
        this.numberofWin++;
        if (tex_wrong.visible == true) {
            this.numberofWin = 0;
            this.life--;
            mTex_fonts[6].visible = true;
        } else {
            this.points += 10;
        }
        this.levelUpConter = 80;
        for (let i = 0; i < 3; i++) {
            mTex_Heart[i].visible = i < this.life;
            mTex_EHeart[i].visible = i >= this.life;
        }
        DrawLblRT(mTex_fonts[0], "Score : " + (this.allscore + this.points), 50, 30, FONTSCORE, 20);
    }
    setNewGame() {
        var ff = 7;
        butArry[0].visible = butArry[1].visible = false;
        this.isGiven = 0;
        var signs = [">", "<", "="];
        var minmax = (1 + Math.floor(this.level / 4)) * 10;

        this.value[0] = getRan(-minmax, minmax);
        this.value[1] = getRan(0, 2);
        this.value[2] = getRan(-minmax, minmax);
        if (getRan(0, 10) == 0) {
            this.value[1] = 2;
        }
        var text = [this.value[0] + "", signs[this.value[1]], this.value[2] + ""]

        if (this.level % 4 == 2) {
            var val = this.getTwoVal();
            this.value[0] = val[0] + val[1];
            text[0] = val[0] + (val[1] < 0 ? "\n-\n" : "\n+\n") + Math.abs(val[1]);

            var val = this.getTwoVal();
            this.value[2] = val[0] + val[1];
            text[2] = val[0] + (val[1] < 0 ? "\n-\n" : "\n+\n") + Math.abs(val[1]);
        }
        if (this.level % 4 == 3) {
            if (getRan(0, 4) == 3) {
                var val = this.getTwoPosVal();
                this.value[0] = val[0] * val[1];
                text[0] = val[0] + "\n*\n" + val[1];
            } else {
                var val = this.getTwoVal();
                this.value[0] = val[0] + val[1];
                text[0] = val[0] + (val[1] < 0 ? "\n-\n" : "\n+\n") + Math.abs(val[1]);
            }

            if (getRan(0, 4) == 3) {
                var val = this.getTwoPosVal();
                this.value[2] = val[0] * val[1];
                text[2] = val[0] + "\n*\n" + val[1];
            } else {
                var val = this.getTwoVal();
                this.value[2] = val[0] + val[1];
                text[2] = val[0] + (val[1] < 0 ? "\n-\n" : "\n+\n") + Math.abs(val[1]);
            }
        }
        if (this.level % 4 == 0) {
            let ranval = getRan(0, 4);
            if (ranval == 3) {
                var val = this.getTwoPosVal();
                this.value[0] = val[0] * val[1];
                text[0] = val[0] + "\n*\n" + val[1];
            } else if (ranval == 2) {
                var val = this.getTwoPosVal();
                this.value[0] = val[0] / val[1];
                text[0] = val[0] + "\n/\n" + val[1];
            } else {
                var val = this.getTwoVal();
                this.value[0] = val[0] + val[1];
                text[0] = val[0] + (val[1] < 0 ? "\n-\n" : "\n+\n") + Math.abs(val[1]);
            }

            ranval = getRan(0, 0);
            if (ranval == 3) {
                var val = this.getTwoPosVal();
                this.value[2] = val[0] * val[1];
                text[2] = val[0] + "\n*\n" + val[1];
            } else if (ranval == 2) {
                var val = this.getTwoPosVal();
                this.value[2] = val[0] / val[1];
                text[2] = val[0] + "\n/\n" + val[1];
            } else {
                var val = this.getTwoVal();
                this.value[2] = val[0] + val[1];
                text[2] = val[0] + (val[1] < 0 ? "\n-\n" : "\n+\n") + Math.abs(val[1]);
            }
        }
        for (let i = 0; i < this.plans.length; i++) {
            this.plans[i].visible = true;
            this.plans[i].rotation.set(0, 0, 0);
            this.plans[i].position.set(-16 + i * 16, 8, 0);
            if (i == 1)
                DrawLbl(mTex_fonts[ff++], text[i] + "", -110 + i * 110, -45, FONTSCORE, 30);
            else
                DrawLbl(mTex_fonts[ff++], text[i] + "", -110 + i * 110, (this.level % 4 == 1 ? -45 : -70), FONTSCORE, 30);
        }
        tex_right.visible = tex_wrong.visible = false;
        mTex_fonts[6].visible = false;
        console.log("setNewGame = " + this.isGiven);
    }
    gameOver() {
        clearTimeout(timeoutHandle);
        this.levelScore.push(this.points + this.life * 20);
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