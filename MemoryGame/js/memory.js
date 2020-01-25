var MX = 7;
class Memory {
    constructor() {
        this.group = new THREE.Group();
        this.arrGame = [];
        this.plans = [];
        this.NumCols = 3;
        this.NumRows = 3;
        for (let i = 0; i < 25; i++) {
            this.plans.push(createPlanMesh());
            this.group.add(this.plans[i]);
            this.plans[i].traverse(function(child) { if (child.isMesh) { child.material.map = tex_empty; } });
            this.plans[i].visible = false;
            this.group.add(this.plans[i]);
            this.plans[i].scale.set(MX, MX, MX);

        }
        this.levelScore = [0, 0, 0];
        this.timer = 0;
        this.levelUpConter = 0;
        scene.add(this.group);
        this.level = 1;
        this.points = 0;
        this.shape = 0;
        this.life = 3;
        this.lastBox = 0;
        this.startCounter = 3;
        this.numberofWin = 0;
        this.allscore = 0;
    }
    draw() {
        if (this.levelUpConter > 0) {
            this.levelUpConter--;
            if (this.life <= 0) {
                // DrawLbl(mTex_fonts[4], "OPTION #1: the last box is incorrect,\n\nThe game is over.", 0, -250, FONTCOLOR, 16);
                // DrawLbl(mTex_fonts[5], "Sorry, it's not good", 0, 220, FONTRED, 26);
            } else if (this.shape == this.NumCols) {
                // DrawLbl(mTex_fonts[4], "OPTION #2: the last box is correct,\n\nThe game will continue.", 0, -250, FONTCOLOR, 16);
                if (this.levelUpConter == 50)
                    this.plans[this.lastBox].traverse(function(child) { if (child.isMesh) { child.material.map = tex_wright; } });
            } else {
                // DrawLbl(mTex_fonts[4], "TimesUp,\n\nThe game is over.", 0, -250, FONTCOLOR, 16);
            }
            if (this.levelUpConter == 1) {
                this.levelScore[this.level - 1] += this.points;
                if (this.life <= 0) {
                    setScreen(GAMEOVER);
                } else if (this.shape == this.NumCols) {
                    this.numberofWin++;
                    if (this.numberofWin == 4) {
                        // this.numberofWin = 0;
                        // this.NumCols++;
                        // this.NumRows = this.NumCols;
                        // this.level++;
                        this.levelScore[this.level - 1] += this.life * 20;
                        setScreen(GAMELEVEL);
                    } else {
                        this.gamereset();
                    }
                } else {
                    setScreen(GAMEOVER);
                }



                // if (this.shape == this.NumCols) {
                //   this.numberofWin++;
                //   this.levelScore[this.level - 1] += this.points + this.life * 20;
                //   if (this.numberofWin == 4) {
                //     // this.numberofWin = 0;
                //     // this.NumCols++;
                //     // this.NumRows = this.NumCols;
                //     // this.level++;
                //     setScreen(GAMELEVEL);
                //   } else {
                //     this.gamereset();
                //   }
                // } else {
                //   this.gamereset();
                // }
                //setScreen(GAMEOVER);
            }
        }
    }
    gamereset() {
        mTex_fonts[4].visible = mTex_fonts[4].visible = false;
        this.levelUpConter = 0;
        MX = 48 / (this.NumCols);

        this.points = 0;
        this.shape = 0;
        this.allscore = 0;
        for (let i = 0; i < this.levelScore.length; i++) {
            this.allscore += this.levelScore[i];
        }
        this.lastBox = 0;
        while (this.arrGame.length > 0) {
            this.arrGame.pop();
        }
        for (let i = 0; i < this.NumCols * this.NumRows; i++) {
            this.arrGame.push(i == 0 ? 2 : (i < this.NumCols ? 1 : 0));
            console.log("this.arrGame[" + i + "] = " + this.arrGame[i]);
        }
        this.arrGame.sort(compRan);
        for (let i = 0; i < this.NumCols * this.NumRows; i++) {
            console.log("this.arrGame[" + i + "] = " + this.arrGame[i]);
        }
        var ff = 0;
        for (let i = 0; i < this.NumRows; i++) {
            for (let j = 0; j < this.NumCols; j++) {
                this.plans[i * this.NumCols + j].position.set(-.5 * MX * (this.NumCols - 1) + j * MX, .5 * MX * (this.NumRows - 1) - i * MX, 0);
                this.plans[i * this.NumCols + j].visible = true;
                if (this.arrGame[i * this.NumCols + j] == 0)
                    this.plans[i * this.NumCols + j].traverse(function(child) { if (child.isMesh) { child.material.map = tex_empty; } });
                if (this.arrGame[i * this.NumCols + j] == 1)
                    this.plans[i * this.NumCols + j].traverse(function(child) { if (child.isMesh) { child.material.map = tex_fill; } });
                if (this.arrGame[i * this.NumCols + j] == 2)
                    this.plans[i * this.NumCols + j].traverse(function(child) { if (child.isMesh) { child.material.map = tex_gift; } });

                this.plans[i * this.NumCols + j].scale.set(MX, MX, MX);
                // DrawLbl(mTex_fonts[ff++], (i * this.NumCols + j + 1) + "", (-.5 * MX * (this.NumCols - 1) + j * MX) * 7, (-.5 * MX * (this.NumRows - 1) + i * MX) * 7 + 7, "#fa00fa", 21, "center");
            }
        }
        this.startCounter = 3;
        DrawLblRT(mTex_fonts[0], "Score : " + (this.allscore + this.points), 50, 30, FONTSCORE, 20);
        DrawLblRT(mTex_fonts[1], "Level : " + this.level, 50, 60, FONTSCORE, 20);
        DrawLblLT(mTex_fonts[2], "Time : " + (LVLTIMER - mMemory.timer) + " sec", 50, 30, FONTSCORE, 20);
        DrawLblLT(mTex_fonts[3], "Shape : " + (this.numberofWin + 1), 50, 60, FONTSCORE, 20);
        DrawLbl(mTex_fonts[4], "" + this.startCounter, 0, -240, FONTCOLOR, 36);
        timeoutHandle = setTimeout(mMemory.flipAll, 500);
        for (let i = 0; i < 3; i++) {
            mTex_Heart[i].visible = true;
            DrawTextureAlign(mTex_Heart[i], 15 + i * 30, 16, ThreeUI.anchors.right, ThreeUI.anchors.bottom);
        }
        for (let i = 0; i < 3; i++) {
            mTex_Heart[i].visible = i < this.life;
            mTex_EHeart[i].visible = i >= this.life;
        }
        //this.nextTurn();
    }

    handle_Gameplay(e, type) {
        if (type == 2 && mMemory.startCounter <= 0 && this.life > 0 && this.shape < this.NumCols) {
            for (let i = 0; i < this.NumRows; i++) {
                for (let j = 0; j < this.NumCols; j++) {
                    if (raycaster.intersectObject(this.plans[i * this.NumCols + j]).length > 0) {
                        if (this.arrGame[i * this.NumCols + j] == 0) {
                            this.plans[i * this.NumCols + j].traverse(function(child) { if (child.isMesh) { child.material.map = tex_wrong; } });
                            this.life--;
                            for (let i = 0; i < 3; i++) {
                                mTex_Heart[i].visible = i < this.life;
                                mTex_EHeart[i].visible = i >= this.life;
                            }
                        }
                        if (this.arrGame[i * this.NumCols + j] == 1) {
                            this.shape++;
                            this.points += 10;
                            this.plans[i * this.NumCols + j].traverse(function(child) {
                                if (child.isMesh) {
                                    child.material.map = (mMemory.shape == mMemory.NumCols) ? tex_wright : tex_fill;
                                }
                            });
                        }
                        if (this.arrGame[i * this.NumCols + j] == 2) {
                            this.plans[i * this.NumCols + j].traverse(function(child) { if (child.isMesh) { child.material.map = tex_gift; } });
                            this.shape++;
                            this.points += 20;
                        }
                        console.log("this.shape = " + this.shape);
                        if (this.shape == this.NumCols || this.life <= 0) {
                            this.lastBox = i * this.NumCols + j;
                            this.gameOver();
                        }
                        this.arrGame[i * this.NumCols + j] = -1;

                        DrawLblRT(mTex_fonts[0], "Score : " + (this.allscore + this.points), 50, 30, FONTSCORE, 20);
                        DrawLblRT(mTex_fonts[1], "Level : " + this.level, 50, 60, FONTSCORE, 20);
                        DrawLblLT(mTex_fonts[3], "Shape : " + (this.numberofWin + 1), 50, 60, FONTSCORE, 20);
                        return;
                    }
                }
            }
        }
    }
    nextTurn() {
        clearTimeout(timeoutHandle);
        if (mMemory.timer >= LVLTIMER) {
            mMemory.levelUpConter = 150;
            // mMemory.timer = 0;
            return;
        }
        timeoutHandle = setTimeout(mMemory.nextTurn, 1000);
        mMemory.timer++;
        DrawLblLT(mTex_fonts[2], "Time : " + (LVLTIMER - mMemory.timer) + " sec", 50, 30, FONTSCORE, 20);
        mMemory.isStart = true;
    }
    flipAll() {
        clearTimeout(timeoutHandle);
        mMemory.startCounter--;
        DrawLbl(mTex_fonts[4], "" + mMemory.startCounter, 0, -240, FONTCOLOR, 36);
        if (mMemory.startCounter == 0) {
            for (let i = 0; i < mMemory.NumRows; i++) {
                for (let j = 0; j < mMemory.NumCols; j++) {
                    mMemory.plans[i * mMemory.NumCols + j].traverse(function(child) { if (child.isMesh) { child.material.map = tex_empty; } });
                }
            }
            mMemory.nextTurn();
            mTex_fonts[4].visible = false;
        } else {
            timeoutHandle = setTimeout(mMemory.flipAll, 1000);
        }
    }
    gameOver() {
        clearTimeout(timeoutHandle);
        this.levelUpConter = 100;
    }
}