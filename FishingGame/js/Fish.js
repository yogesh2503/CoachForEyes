const MX = 40;
var MY = 60;
class Fish {
    constructor() {
        this.group = new THREE.Group();
        this.plans = [];
        this.allx = Array(10);
        for (let i = 0; i < 20; i++) {
            this.plans.push(createPlanMesh());
            this.plans[i].traverse(function(child) { if (child.isMesh) { child.material.map = tex_fish; } });
            this.plans[i].visible = true;
            this.group.add(this.plans[i]);
            this.plans[i].scale.set(4, 4, 4);
            this.allx[i] = 0;
        }
        this.player = createPlayer();
        this.player.traverse(function(child) { if (child.isMesh) { child.material.map = tex_Leader; } });
        this.player.visible = true;
        this.group.add(this.player);
        this.player.scale.set(5, 5, 1);
        this.player.position.set(-5, 1, 0);
        this.levelScore = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        this.timer = 0;
        this.levelUpConter = 0;
        scene.add(this.group);
        this.level = 1;
        this.points = 0;
        this.life = 3;
        this.vx = 0;
        this.vy = 0;
        this.x = 0;
        this.y = 0;
        this.cx = 0;
        this.cy = 0;
        this.player.direction = "right";
        this.isClick = 0;
        this.timerCount = 0;
        this.numberofWin = 0;
        this.allscore = 0;
    }
    draw() {
        for (let i = 0; i < this.plans.length; i++) {
            this.plans[i].position.x += this.vx;
            this.plans[i].position.y += this.vy;
        }
        this.x += this.vx;
        this.y += this.vy;
        if (this.level < 5) {
            var val = 40 - this.level * 7;
            this.player.visible = (this.x > -val && this.x < val && this.y > -val && this.y < val && this.numberofWin < 4);
            this.player.position.set(this.cx, this.cy, 0);
            // if (this.x > -val && this.x < val && this.y > -val && this.y < val) {
            //     console.log(this.x + "  " + this.y);
            // }
        } else {
            switch (this.player.direction) {
                case "down":
                    this.player.position.set(this.cx - this.x, this.cy + (this.vy < 0 ? this.y : -this.y), 0);
                    break;
                case "up":
                    this.player.position.set(this.cx - this.x, this.cy + (this.vy > 0 ? this.y : -this.y), 0);
                    break;
                case "right":
                    this.player.position.set(this.cx + (this.vx > 0 ? this.x : -this.x), this.cy + this.y, 0);
                    break;
                case "left":
                    this.player.position.set(this.cx + (this.vx < 0 ? this.x : -this.x), this.cy + this.y, 0);
                    break;
            }
            // this.player.position.set(-this.x, -this.y, 0);
        }

        if (this.vx > 0 && this.isClick == 0) {
            if (this.x > MX * 1.2) {
                this.setClickVaribles();
            }
        }
        if (this.vx < 0 && this.isClick == 0) {
            if (this.x < -MX * 1.2) {
                this.setClickVaribles();
            }
        }
        if (this.vy > 0 && this.isClick == 0) {
            if (this.y > MY * 1.2) {
                this.setClickVaribles();
            }
        }
        if (this.vy < 0 && this.isClick == 0) {
            if (this.y < -MY * 1.2) {
                this.setClickVaribles();
            }
        }
        if ((this.timerCount + 3) < this.timer && this.levelUpConter == 0) {
            console.log((this.timerCount + 3) + " this.tim " + ((this.timerCount + 3) > this.timer) + " erCount  " + this.timer);
            this.life--;
            if (this.life <= 0) {
                this.gameOver();
            } else {
                this.resetPosition();
            }
        }
        if (this.levelUpConter > 0) {
            this.levelUpConter--;
            if (this.levelUpConter == 1) {
                this.points += this.life * 20;
                this.levelScore[this.level - 1] += this.points;
                setScreen(GAMEOVER);
            }
        }
        for (let i = 0; i < mTex_Arrow.length; i++) {
            DrawTransScalB(mTex_Arrow[i], 50, 50, mSel == i + 1 ? 1.1 : 1, mSel == i + 1 ? 0.5 : 1);
        }
    }
    setClickVaribles() {
        // this.resetPosition();
        this.player.visible = false;
        this.isClick = 1;
        this.timerCount = this.timer;
    }
    resetPosition() {
        this.isClick = 0;
        for (let i = 0; i < 3; i++) {
            mTex_Heart[i].visible = i < this.life;
            mTex_EHeart[i].visible = i >= this.life;
        }
        this.player.visible = true;
        var randA = Math.random();
        var randB = Math.random();
        this.timerCount = this.timer;
        // randA = -.6;
        // randB = -.6;
        if (randA > .5) {
            this.x = 0;
            this.y = (randB > .5 ? MY : -MY);
        } else {
            this.x = (randB > .5 ? MY : -MY);
            this.y = 0;
        }
        this.vx = -this.x * .02;
        this.vy = -this.y * .02;
        this.cx = 25 - Math.random() * 50;
        this.cy = 25 - Math.random() * 50;

        var plier = (this.x == 0 ? MY : MX);
        for (let i = 0; i < this.allx.length; i++) {
            this.allx[i] = Math.floor(-plier * .5 + i * plier * .05);
        }
        this.allx.sort(compRan);

        var numofFish = 4 + this.level * 2;

        for (let i = 0; i < this.plans.length; i++) {
            if (this.x == 0) {
                this.plans[i].position.set(-MX * .5 + i * MX * (1 / numofFish), 1.2 * (this.y > 0 ? MY : -MY) + this.allx[i], 0);
                this.plans[i].rotation.set(0, 0, this.y > 0 ? Math.PI * .5 : Math.PI * 1.5);
                this.plans[i].traverse(function(child) { if (child.isMesh) { child.material.map = tex_fish; } });
            } else {
                this.plans[i].position.set((this.x > 0 ? MX : -MX) + this.allx[i], -MY * .40 + i * MY * (.8 / numofFish), 0);
                this.plans[i].rotation.set(0, 0, 0);
                if (this.x > 0)
                    this.plans[i].traverse(function(child) { if (child.isMesh) { child.material.map = tex_fish; } });
                else {
                    this.plans[i].traverse(function(child) { if (child.isMesh) { child.material.map = tex_fishM; } });
                }
            }
            this.plans[i].visible = i < numofFish;
        }
        randA = Math.random();
        if (this.x == 0) {
            this.player.traverse(function(child) { if (child.isMesh) { child.material.map = tex_Leader; } });
            if (Math.random() > .5) {
                this.player.rotation.set(0, 0, Math.PI * .5);
                this.player.direction = "down";
            } else {
                this.player.rotation.set(0, 0, Math.PI * 1.5);
                this.player.direction = "up";
            }

        } else {
            this.player.rotation.set(0, 0, 0);
            if (Math.random() > 0.5) {
                this.player.traverse(function(child) { if (child.isMesh) { child.material.map = tex_LeaderM; } });
                this.player.direction = "right";
            } else {
                this.player.traverse(function(child) { if (child.isMesh) { child.material.map = tex_Leader; } });
                this.player.direction = "left";
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
        this.numberofWin = 0;
        DrawLblRT(mTex_fonts[0], "Score : " + (this.allscore + this.points), 50, 30, FONTSCORE, 20);
        DrawLblRT(mTex_fonts[1], "Level : " + this.level, 50, 60, FONTSCORE, 20);
        DrawLblLT(mTex_fonts[2], "Time : " + (LVLTIMER - mFish.timer) + " sec", 50, 30, FONTSCORE, 20);
        timeoutHandle = setTimeout(mFish.nextTurn, 500);
        for (let i = 0; i < 3; i++) {
            mTex_Heart[i].visible = true;
            DrawTextureAlign(mTex_Heart[i], 15 + i * 30, 16, ThreeUI.anchors.right, ThreeUI.anchors.bottom);
        }
        this.resetPosition();
        for (let i = 0; i < 3; i++) {
            mTex_Heart[i].visible = i < this.life;
            mTex_EHeart[i].visible = i >= this.life;
        }
        //this.nextTurn();
        this.isClick = 0;
    }

    handle_Gameplay(e, type) {
        mSel = 0;
        for (let i = 0; i < mTex_Arrow.length && type == 0; i++) {
            bounds = mTex_Arrow[i].getBounds();
            if (ThreeUI.isInBoundingBox(coords.x, coords.y, bounds.x, bounds.y, bounds.width, bounds.height)) {
                this.direction(DIRECTIONS[i]);
                mSel = i + 1;

            }
        }
        if (type == 2) {
            mSel = 0;
        }
        console.log("mSel  " + mSel);
    }
    nextTurn() {
        clearTimeout(timeoutHandle);
        if (mFish.timer >= LVLTIMER) {
            mFish.levelUpConter = 150;
            return;
        }
        timeoutHandle = setTimeout(mFish.nextTurn, 1000);
        mFish.timer++;
        DrawLblLT(mTex_fonts[2], "Time : " + (LVLTIMER - mFish.timer) + " sec", 50, 30, FONTSCORE, 20);
        mFish.isStart = true;
    }

    gameOver() {
        clearTimeout(timeoutHandle);
        this.levelUpConter = 100;

    }
    direction(direction) {
        if ((this.isClick == 0 || this.isClick == 1) && GameScreen == GAMEFISH) {
            console.log(this.player.direction + " direction = " + direction);
            mTex_Right.visible = (this.player.direction == direction);
            mTex_Wrong.visible = !mTex_Right.visible;
            this.isClick = 2;
            this.numberofWin++;
            if (mTex_Wrong.visible) {
                this.life--;
                this.numberofWin = 0;
            } else {
                this.points += 20;
            }
            this.x = this.x = 100;
            if (this.life <= 0 || this.numberofWin >= 4) {
                this.gameOver();
            } else {
                this.resetPosition();
            }
            DrawLblRT(mTex_fonts[0], "Score : " + (this.allscore + this.points), 50, 30, FONTSCORE, 20);
        }

    }
}