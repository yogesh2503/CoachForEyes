const SC = 58;
class ColorRun {
    constructor() {
        this.group = new THREE.Group();
        this.SPD = .5;
        this.plans = [];
        for (let i = 0; i < 30; i++) {
            this.plans.push(createPlanMesh());
            this.group.add(this.plans[i]);
        }
        this.colordiff = MAX_COLOR_DIFF;
        this.player = createPlayer();
        this.group.add(this.player);
        this.player.nextColor = 0;
        this.player.life = 3;
        this.courOrder = 0;
        this.nextClr = -10;
        this.colm = 1;
        this.NumColour = 3;
        this.points = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        this.timer = 0;
        this.levelUpConter = 0;
        this.level = 0;
        scene.add(this.group);
    }
    draw() {
        var newRow = true;

        this.plans.forEach(element => {
            if (element.position.y > -60) {
                element.position.y -= this.SPD;
                if (element.position.y > -30) {
                    newRow = false;
                }
            } else {
                element.visible = false;
            }
            if (element.position.y > -50 && element.position.y < -39 && element.col == this.colm) {
                element.position.y = -100;
                console.log(JSON.stringify(element.material.color) + "  ~~ " + JSON.stringify(this.player.material.color))
                element.col = -1;
                if (!(JSON.stringify(element.material.color) == JSON.stringify(this.player.material.color))) {
                    this.player.life--;
                    for (let i = 0; i < 3; i++) {
                        mTex_Heart[i].visible = i < this.player.life;
                        mTex_EHeart[i].visible = i >= this.player.life;
                    }
                    if (this.player.life <= 0) {
                        this.gameOver();
                    } else {
                        DrawLbl(mTex_fonts[1], "Oups, one color lost!", 0, -95, FONTCOLOR, 30);
                        Counter = 0;
                    }
                } else {
                    this.points[this.level] += 10;
                    DrawLblRT(mTex_fonts[0], this.points[this.level] + " pts", 10, 20, FONTCOLOR, 20);

                }

            }
            if (element.position.y > -45 && this.player.no > element.no) {
                this.player.no = element.no;
                this.player.scale.set(element.scale.x, element.scale.x, 1);
            }
        });
        if (newRow) {
            // console.log("newRow = " + newRow);
            this.sxx = SC / this.NumColour;
            if (this.sxx > MAX_SCAL_DROP)
                this.sxx = MAX_SCAL_DROP;
            for (let i = 0, j = 0; j < this.NumColour && i < this.plans.length; i++) {
                if (this.plans[i].position.y < -55) {
                    this.plans[i].position.set(SC * .5 * (-1 + (1 / this.NumColour)) + (j % this.NumColour) * SC / this.NumColour, 55, 0); //29,52
                    this.plans[i].scale.set(this.sxx, this.sxx, 1);
                    this.plans[i].visible = true;
                    this.plans[i].material.color = createColor(this.courOrder);
                    this.plans[i].no = this.NumColour;
                    this.plans[i].col = j;
                    this.nextClr = 20;
                    this.courOrder++;
                    j++;
                }
                var nn = Math.floor((Math.random() * 1111) % this.NumColour) + 1;
                this.player.nextColor = createColor(this.courOrder - nn);

            }
            // this.NumColour++;
        }
        if (this.nextClr == 0) {
            this.player.material.color = this.player.nextColor;
            this.player.no = this.NumColour;
            this.player.scale.set(this.sxx, this.sxx, 1);
        }
        var reqx = SC * .5 * (-1 + (1 / this.player.no)) + this.colm * SC / this.player.no;
        if (reqx != this.player.position.x) {
            if (reqx > this.player.position.x) {
                this.player.position.x += 3;
                if (reqx < this.player.position.x) {
                    this.player.position.x = reqx;
                }
            } else {
                this.player.position.x -= 3;
                if (reqx > this.player.position.x) {
                    this.player.position.x = reqx;
                }
            }
        }
        this.nextClr--;
        mTex_fonts[1].visible = Counter < 50;
        // mTex_LooseLife.visible = Counter < 50;
        if (this.levelUpConter > 0) {
            DrawLbl(mTex_fonts[2], "you are awesome!\nLet's go on to the next level!", 0, 15, FONTCOLOR, 20);
            this.levelUpConter--;
            if (this.levelUpConter == 0) {
                this.gameNext();
            }
        }
        if (this.NumColour > ENDSET) {
            this.level--;
            this.gameOver();
        }
    }
    gamereset() {
        console.log("gamereset~~~~");

        this.player.nextColor = createColor(0);
        this.SPD = MIN_SPD;
        for (let i = 0; i < this.points.length; i++) {
            this.points[i] = 0;

        }

        this.isStart = false;
        this.NumColour = STARTSET;
        this.colordiff = MAX_COLOR_DIFF;
        this.sxx = SC / this.NumColour;
        if (this.sxx > MAX_SCAL_DROP)
            this.sxx = MAX_SCAL_DROP;
        for (let i = 0; i < this.plans.length; i++) {
            if (i < this.NumColour) {
                this.plans[i].position.set(SC * .5 * (-1 + (1 / this.NumColour)) + i * SC / this.NumColour, 55, 0); //29,52
                this.plans[i].material.color = createColor(this.courOrder);
                this.courOrder++;
                this.plans[i].visible = true;
                this.plans[i].scale.set(this.sxx, this.sxx, 1);
                console.log(JSON.stringify(this.plans[i].material.color) + "  ~@@@~ " + JSON.stringify(this.player.material.color))
            } else {
                this.plans[i].position.set(-19.5 + (i % 3) * 19.5, -100, 0); //29,52
            }

            this.plans[i].no = this.NumColour;
            this.plans[i].col = i;
        }


        this.level = 0;
        this.player.scale.set(this.sxx, this.sxx, 1);
        this.player.position.set(0, -43.5, 0);
        this.player.no = this.NumColour;
        this.player.visible = true;
        this.nextClr = -10;
        this.colm = 1;
        this.player.material.color = this.plans[this.colm].material.color;
        this.player.life = 3;
        for (let i = 0; i < 3; i++) {
            mTex_Heart[i].visible = true;
            DrawTextureAlign(mTex_Heart[i], 15 + i * 30, 16, ThreeUI.anchors.right, ThreeUI.anchors.bottom);
        }
        this.timer = 0;
        this.levelUpConter = 0;
        nextTurn();
        DrawLblRT(mTex_fonts[0], this.points[this.level] + " pts", 10, 20, FONTCOLOR, 20);
    }
    move(keyCode) {
        if (keyCode == 37 && this.colm > 0) { //left
            this.colm--;
        }
        if (keyCode == 39 && this.colm < this.NumColour - 1) { //Right
            this.colm++;
        }
        // console.log(keyCode + " this.colm = " + this.colm);
    }
    gameOver() {
        clearTimeout(timeoutHandle);
        this.level++;
        setScreen(GAMEOVER);
        Counter = 5;
    }
    gameNext() {
        clearTimeout(timeoutHandle);
        setScreen(GAMELEVEL);
        this.SPD = 0;
    }
    setNextLevel() {
        setScreen(-1);
        GameScreen = COLORRUN;
        nextTurn();
        this.NumColour = Math.floor(this.level / 2) + STARTSET;
        console.log("this.level = " + this.level);
        for (let i = 0; i < 3; i++) {
            DrawTextureAlign(mTex_Heart[i], 15 + i * 30, 16, ThreeUI.anchors.right, ThreeUI.anchors.bottom);
            mTex_Heart[i].visible = i < this.player.life;

            if (this.sxx > MAX_SCAL_DROP)
                this.sxx = MAX_SCAL_DROP;
            for (let i = 0; i < this.plans.length; i++) {
                if (i < this.NumColour) {
                    this.plans[i].position.set(SC * .5 * (-1 + (1 / this.NumColour)) + i * SC / this.NumColour, 55, 0); //29,52
                    this.plans[i].material.color = createColor(this.courOrder);
                    this.courOrder++;
                    this.plans[i].visible = true;
                    this.plans[i].scale.set(this.sxx, this.sxx, 1);
                } else {
                    this.plans[i].position.set(-19.5 + (i % 3) * 19.5, -100, 0); //29,52
                }

                this.plans[i].no = this.NumColour;
                this.plans[i].col = i;
            }
        }
        this.SPD = this.level % 2 == 0 ? MIN_SPD : MAX_SPD;



        this.player.scale.set(this.sxx, this.sxx, 1);
        this.player.position.set(0, -43.5, 0);
        this.player.no = this.NumColour;
        this.player.visible = true;
        this.nextClr = -10;
        this.colm = 1;
        this.player.material.color = this.plans[this.colm].material.color;
        this.points[this.level] = 0;
        DrawLblRT(mTex_fonts[0], this.points[this.level] + " pts", 10, 20, FONTCOLOR, 20);
    }
    setVisible(vis) {
        this.plans.forEach(element => {
            element.visible = vis;
        });
        this.player.visible = vis;
    }
    replay() {
        console.log("this.life = " + this.player.life);
        if (this.level > 0) {
            this.level -= 1;
        }
        this.timer = 0;
        this.levelUpConter = 0;
        this.player.life = 3;
        this.setNextLevel();
    }
}