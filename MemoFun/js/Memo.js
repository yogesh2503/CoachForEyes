const MX = 24;

class Block {
    constructor(memo, no) {
        this.no = 2; //[2, 2, 2, 2];
        this.match = false;
        this.counter = 0;
        this.color = FONTGREEN;
        this.tile = Array(3);
        for (let i = 0; i < this.tile.length; i++) {
            if (i == 2) {
                if (no == 11) {
                    this.tile[i] = createSqr();
                } else {
                    this.tile[i] = createPlayer();
                    const m = no;
                    this.tile[i].traverse(function(child) { if (child.isMesh) { child.material.map = tex_empty[m]; } });
                }
            } else {
                this.tile[i] = createPlanMesh();
                if (i == 0)
                    this.tile[i].traverse(function(child) { if (child.isMesh) { child.material.map = tex_empty[11]; } });
                else
                    this.tile[i].traverse(function(child) { if (child.isMesh) { child.material.map = tex_empty[12]; } });
            }
            memo.group.add(this.tile[i]);
            this.tile[i].visible = false;
            this.tile[i].scale.set(7, 7, 7);
        }
    }
    update() {
        if (this.counter > 0) {
            this.counter--;
            if (this.counter == 0) {
                if (this.match == true) {
                    //this.tile.forEach(element => { element.visible = false; });
                    this.reset(true);
                    this.no = 1;
                    // this.tile[2].material.opacity = .21; //createColor();
                } else {
                    this.reset(false);
                }
            }
        }
        return this.match;

    }
    reset(isOpen) {
        this.no = isOpen ? 2 : 1;
        this.tile.forEach(element => { element.visible = isOpen; });
        this.tile[1].visible = !isOpen;
    }
    setPosition(x, y, s) {
        this.no = 2;
        this.tile.forEach(element => {
            element.position.set(x, y, 0);
            element.scale.set(s, s, s);
        });
        this.tile[0].visible = true;
        this.tile[2].visible = true;

        this.tile[2].scale.set(s, s, s);
        this.counter = Math.floor(MAXTIME * 1.3);
        this.match = false;
    }
    setMatch(isMatch) {
        this.no = isMatch ? 1 : 2;
        this.counter = Math.floor(MAXTIME * .4);
        this.match = isMatch;
        // console.log("isMatch " + isMatch);

    }
    setMenu(x, y, val) {
        //DrawTransScal(this.tile[val], x, y, 128, 128, 1, 1);
        this.tile[val].position.set(x, y, 0);
        this.tile[val].visible = true;
        this.tile[val].material.color = createColor(x + y);
        this.tile[val].scale.set(9, 9, 9);
        this.tile[0].scale.set(9, 9, 9);
        this.tile[0].position.set(x, y, 0);
        this.tile[0].visible = true;
        // this.tile[0].material.color = "#ff00ff"; //createColor();
    }
    setColor(colr) {
        this.tile[2].material.color = colr;
        this.color = colr;
    }
    setVisible(visible) {
        this.tile.forEach(element => { element.visible = visible; });
    }
}

class Memo {
    constructor() {
        this.group = new THREE.Group();
        this.levelScore = [];
        this.mBlock = Array();
        for (let i = 0; i < MX * 2; i++) {
            this.mBlock.push(new Block(this, i % Math.floor(MX / 2)));
        }
        this.randBlock = Array(MX);
        for (let i = 0; i < this.randBlock.length; i++) {
            this.randBlock[i] = i;
        }
        this.randBlock.sort(compRan);
        this.currentBlocks = Array();
        this.levelUpConter = 100;
        scene.add(this.group);
        this.level = 1;
        this.points = 0;
        this.life = 3;
        this.lastBox = 0;
        this.startCounter = MAXTIME;
        this.numberofWin = 0;
        this.allscore = 0;
    }
    draw() {
        this.startCounter--;
        var gameDone = true;
        for (let i = 0; i < this.mBlock.length && i < this.currentBlocks.length; i++) {
            if (this.mBlock[this.currentBlocks[i]].update() == false) {
                gameDone = false;
            }
        }
        if (this.life <= 0) {
            this.levelUpConter -= 3;
            if (this.levelUpConter < 1) {
                this.gameOver(GAMEOVER);
            }
        }
        if (tex_right.time < 50) {
            tex_right.time++;
            tex_right.visible = tex_right.time < 50;
        }
        if (tex_wrong.time < 50) {
            tex_wrong.time++;
            tex_wrong.visible = tex_wrong.time < 50;
        }
        if (gameDone == true) {
            for (let i = 0; i < animGif.length; i++) {
                animGif[i].visible = Math.floor(Counter / 10) % 6 == i;
            }
            this.levelUpConter--;
            if (this.levelUpConter == 1) {
                this.numberofWin++;
                if (this.numberofWin >= MAXWINCOUNT) {
                    this.gameOver(GAMELEVEL);
                } else {
                    this.setNewGame();
                }
            }
        }
    }
    gamereset() {
        // this.level = 21;
        this.setNewGame();
        this.numberofWin = 0;
        this.points = 0;
        this.allscore = 0;
        for (let i = 0; i < this.levelScore.length; i++) {
            this.allscore += this.levelScore[i];
        }
        this.lastBox = 0;
        this.startCounter = MAXTIME;
    }

    handle_Gameplay(e, type) {
        mSel = 0;
        var oPen = 0;
        var blockNo = -1;
        for (let i = 0; i < this.mBlock.length && i < this.currentBlocks.length; i++) {
            var block = this.mBlock[this.currentBlocks[i]];
            // console.log(i + " block.no " + block.no);
            if (block.no == 2) {
                oPen++;
                blockNo = this.currentBlocks[i];
            }
        }
        for (let i = 0; i < this.mBlock.length && i < this.currentBlocks.length && oPen < 2; i++) {
            var block = this.mBlock[this.currentBlocks[i]];
            if (block.no == 1) {
                if (raycaster.intersectObject(block.tile[1]).length > 0) {
                    // console.log("raycaster " + i);
                    block.reset(true);
                    oPen++;
                    if (oPen == 2) {
                        if ((blockNo % MX) == (this.currentBlocks[i] % MX)) {
                            block.setMatch(true);
                            this.mBlock[blockNo].setMatch(true);
                            this.points += 10;
                            tex_right.time = 0;
                        } else {
                            block.setMatch(false);
                            this.mBlock[blockNo].setMatch(false);
                            this.lifeLoose();
                            tex_wrong.time = 0;
                        }
                    }
                }
            }
        }
        // console.log(type + " mSel = " + mSel);
        if (type == 2) {}
    }
    lifeLoose() {
        this.life--;
        for (let i = 0; i < 3; i++) {
            mTex_Heart[i].visible = i < this.life;
        }
    }
    nextTurn() {
        clearTimeout(timeoutHandle);
        // console.log("mMemo.timer = " + mMemo.timer);
        if (mMemo.timer >= LVLTIMER) {
            mMemo.lifeLoose();
            mMemo.timer = 0;
        }
        timeoutHandle = setTimeout(mMemo.nextTurn, 1000);
        mMemo.timer++;
        DrawLblLT(mTex_fonts[2], "Time : " + (LVLTIMER - mMemo.timer) + " sec", 50, 30, FONTSCORE, 20);
        mMemo.isStart = true;
    }
    checkCondition() {
        this.life--;
        this.numberofWin = 0;
        for (let i = 0; i < 3; i++) {
            mTex_Heart[i].visible = i < this.life;
        }
        if (this.life <= 0) {
            this.levelUpConter = 100;

        }
    }
    setNewGame() {
        shortColor();
        this.mBlock.forEach(element => {
            element.setVisible(false);
        });
        this.timer = 0;
        this.levelUpConter = 100;
        var maxBlock = this.level + 1;
        if (maxBlock > this.mBlock.length / 2) {
            maxBlock = Math.floor(this.mBlock.length / 2);
        }
        this.randBlock.sort(compRan);

        while (this.currentBlocks.length > 0) {
            this.currentBlocks.pop();
        }
        for (let i = 0; i < maxBlock; i++) {
            this.currentBlocks.push(this.randBlock[i]);
            this.mBlock[this.currentBlocks[i]].setColor(createColor());
        }
        for (let i = 0; i < maxBlock; i++) {
            this.currentBlocks.push(this.currentBlocks[i] + MX);
            this.mBlock[this.currentBlocks[i] + MX].setColor(this.mBlock[this.currentBlocks[i]].color);
        }
        this.currentBlocks.sort(compRan)
        mTex_fonts[4].visible = mTex_fonts[4].visible = false;
        DrawLblRT(mTex_fonts[0], "Score : " + (this.allscore + this.points), 50, 30, FONTSCORE, 20);
        DrawLblRT(mTex_fonts[1], "Level : " + this.level, 50, 60, FONTSCORE, 20);
        DrawLblLT(mTex_fonts[2], "Time : " + (LVLTIMER - mMemo.timer) + " sec", 50, 30, FONTSCORE, 20);
        for (let i = 0; i < this.mBlock.length && i < this.level * 2 + 2; i++) {
            if (this.level == 1) {
                this.mBlock[this.currentBlocks[i]].setPosition((i % 2 == 0) ? -10 : 10, -this.currentBlocks.length * 4 + Math.floor(i / 2) * 20, 16);
            } else if (this.level == 2) {
                this.mBlock[this.currentBlocks[i]].setPosition(-13 + 13 * (i % 3), this.currentBlocks.length * 1.4 - Math.floor(i / 3) * 13, 12);
            } else if (this.level == 3 || this.level == 4) {
                this.mBlock[this.currentBlocks[i]].setPosition((i % 2 == 0) ? -6 : 6, -this.level * 6 + Math.floor(i / 2) * 12, 11);
            } else if (this.level < 12) {
                this.mBlock[this.currentBlocks[i]].setPosition(-19 + 13 * (i % 4), this.currentBlocks.length * 1.3 - Math.floor(i / 4) * 13, 12);
            } else {
                this.mBlock[this.currentBlocks[i]].setPosition(-23.5 + 9.5 * (i % 6), this.currentBlocks.length * .6 - Math.floor(i / 6) * 9.5, 9);
            }
        }
        timeoutHandle = setTimeout(mMemo.nextTurn, 500);
        for (let i = 0; i < 3; i++) {
            mTex_EHeart[i].visible = true;
            DrawTextureAlign(mTex_Heart[i], 30 + i * 35, 20, ThreeUI.anchors.right, ThreeUI.anchors.bottom);
        }
        animGif.forEach(element => { element.visible = false; });
    }
    gameOver(scr) {
        clearTimeout(timeoutHandle);
        this.levelScore.push(this.points);
        setScreen(scr); //this.numberofWin >= MAXWINCOUNT ? GAMELEVEL : GAMEOVER);
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