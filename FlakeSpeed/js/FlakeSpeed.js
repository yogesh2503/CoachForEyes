var MX = 7;
class FlakeSpeed {
    constructor() {
        this.group = new THREE.Group();


        this.posArr = Array(70);
        for (let i = 0; i < this.posArr.length; i++) {
            this.posArr[i] = i;
        }
        this.posArr.sort(compRan);

        this.plans = [];
        for (let i = 0; i < 20; i++) {
            this.plans.push(createPlanMesh());
            this.group.add(this.plans[i]);
            this.plans[i].traverse(function(child) { if (child.isMesh) { child.material.map = tex_empty; } });
            this.plans[i].visible = false;
            this.group.add(this.plans[i]);
            this.plans[i].scale.set(MX, MX, MX);
            this.plans[i].vel = new Cricle();
            let rand = this.posArr[i];
            if (rand < 35) {
                this.plans[i].position.set(-25 + (rand / 5) * 7, -30 + (rand % 5) * 7, 0);
            } else {
                this.plans[i].position.set(-73 + (rand / 5) * 7, 5 + (rand % 5) * 7, 0);
            }
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

        this.reset = 0;
        this.NumRows = 20;
    }
    draw() {
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
        if (this.reset == 50) {
            this.plans[0].traverse(function(child) { if (child.isMesh) { child.material.map = tex_empty; } });
        }
        if (this.reset < 50) {
            this.moveCircle();
        }
        this.reset++;
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
        DrawLblLT(mTex_fonts[ff++], "Time : " + (LVLTIMER - mFlakeSpeed.timer) + " sec", 50, 30, FONTSCORE, 20);
        this.setNewGame();
        timeoutHandle = setTimeout(mFlakeSpeed.nextTurn, 1000);
        for (let i = 0; i < 3; i++) {
            mTex_Heart[i].visible = true;
            DrawTextureAlign(mTex_Heart[i], 30 + i * 35, 40, ThreeUI.anchors.right, ThreeUI.anchors.bottom);
        }
    }

    handle_Gameplay(e, type) {
        mSel = 0;
        for (let i = 0; i < this.NumRows && type == 0 && this.reset > 1; i++) {
            if (raycaster.intersectObject(this.plans[i]).length > 0) {
                if (i == 0) {
                    tex_right.visible = true;
                    this.plans[0].traverse(function(child) { if (child.isMesh) { child.material.map = tex_empty1; } });
                    this.numberofWin++;
                    this.points += 10;
                    DrawLblRT(mTex_fonts[0], "Score : " + (this.allscore + this.points), 50, 30, FONTSCORE, 20);
                } else {
                    this.numberofWin = 0;
                    this.life--;
                    tex_wrong.visible = true;
                    for (let i = 0; i < 3; i++) {
                        mTex_Heart[i].visible = i < this.life;
                        mTex_EHeart[i].visible = i >= this.life;
                    }
                }
                this.levelUpConter = 100;
            }
        }

    }
    nextTurn() {
        clearTimeout(timeoutHandle);
        if (mFlakeSpeed.timer >= LVLTIMER) {
            mFlakeSpeed.levelUpConter = 150;
            // mFlakeSpeed.timer = 0;
            return;
        }
        timeoutHandle = setTimeout(mFlakeSpeed.nextTurn, 1000);
        mFlakeSpeed.timer++;
        DrawLblLT(mTex_fonts[2], "Time : " + (LVLTIMER - mFlakeSpeed.timer) + " sec", 50, 30, FONTSCORE, 20);
        mFlakeSpeed.isStart = true;
    }

    setNewGame() {
        tex_right.visible = false;
        tex_wrong.visible = false;
        this.reset = 0;
        this.NumRows = 4 + this.level;
        if (this.NumRows > 20)
            this.NumRows = 20;
        this.plans[0].traverse(function(child) { if (child.isMesh) { child.material.map = tex_empty1; } });
        this.posArr.sort(compRan);
        for (let i = 0; i < this.NumRows; i++) {
            this.plans[i].visible = true;
            let rand = this.posArr[i];
            if (rand < 35) {
                this.plans[i].position.set(-25 + (rand / 5) * 7, -30 + (rand % 5) * 7, 0);
            } else {
                this.plans[i].position.set(-73 + (rand / 5) * 7, 5 + (rand % 5) * 7, 0);
            }
            this.plans[i].vel.reset();
            console.log(rand + " " + i + " " + this.plans[i].position.x.toFixed(2) + " " + this.plans[i].position.y.toFixed(2));
        }
        for (let i = 0; i < 3; i++) {
            mTex_Heart[i].visible = i < this.life;
            mTex_EHeart[i].visible = i >= this.life;
        }
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

    moveCircle() {
        var mx = 25;
        var my = 45;

        for (let i = 0; i < this.plans.length && i < this.NumRows; i++) {
            for (let j = i + 1; j < this.plans.length && j < this.NumRows; j++) {
                if (collision(this.plans[i].position.x, this.plans[i].position.y, 3, this.plans[j].position.x, this.plans[j].position.y, 3)) {
                    var arr = calcluate(this.plans[i].vel, this.plans[j].vel);
                    this.plans[i].vel.sx = -this.plans[i].vel.sx; //arr[0]; //0; //arr[0];
                    this.plans[i].vel.sy = -this.plans[i].vel.sy; // arr[1]; //0; //arr[1];
                    this.plans[j].vel.sx = -this.plans[j].vel.sx; // arr[2]; //0; //arr[2];
                    this.plans[j].vel.sy = -this.plans[j].vel.sy; // arr[2]; //0; //arr[2];
                }
            }
        }
        for (let i = 0; i < this.plans.length && i < this.NumRows; i++) {
            this.plans[i].position.x += this.plans[i].vel.sx;
            this.plans[i].position.y += this.plans[i].vel.sy;

            if (this.plans[i].position.x > mx) {
                this.plans[i].vel.sx = -Math.abs(this.plans[i].vel.sx);
            }
            if (this.plans[i].position.x < -mx) {
                this.plans[i].vel.sx = Math.abs(this.plans[i].vel.sx);
            }
            if (this.plans[i].position.y > my) {
                this.plans[i].vel.sy = -Math.abs(this.plans[i].vel.sy);
            }
            if (this.plans[i].position.y < -my) {
                this.plans[i].vel.sy = Math.abs(this.plans[i].vel.sy);
            }
            // this.plans[i].visible = true;
        }
    }

}