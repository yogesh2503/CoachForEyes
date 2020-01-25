const MX = 40;
var MY = 100;
class Fish {
    constructor() {
        this.group = new THREE.Group();
        this.plans = [];
        this.allx = Array(10);
        for (let i = 0; i < 10; i++) {
            this.plans.push(createPlanMesh());
            this.plans[i].traverse(function(child) { if (child.isMesh) { child.material.map = tex_fish; } });
            this.plans[i].visible = true;
            this.group.add(this.plans[i]);
            this.plans[i].scale.set(4, 4, 4);
            this.allx[i] = 0;
        }
        this.player = createPlanMesh();
        this.player.traverse(function(child) { if (child.isMesh) { child.material.map = tex_Leader; } });
        this.player.visible = true;
        this.group.add(this.player);
        this.player.scale.set(7.2, 7.2, 1);
        this.player.position.set(-5, 1, 0);

        this.levelScore = [0, 0, 0];
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
    }
    draw() {
        // for (let i = 0; i < this.plans.length; i++) {
        //     this.plans[i].position.x += this.vx;
        //     this.plans[i].position.x += this.vy;
        // }
        // this.x += this.vx;
        // this.y += this.vy;
        if (this.vx > 0) {
            if (this.x > MX * 2) {
                this.resetPosition();
            }
        }
        if (this.vx < 0) {
            if (this.x < -MX * 2) {
                this.resetPosition();
            }
        }
        if (this.vy > 0) {
            if (this.y > MY * 2) {
                this.resetPosition();
            }
        }
        if (this.vy < 0) {
            if (this.y < -MY * 2) {
                this.resetPosition();
            }
        }
    }
    resetPosition() {
        if (Math.random() > .5) {
            this.x = 0;
            this.y = (Math.random() > .5 ? MY : -MY);
        } else {
            this.x = (Math.random() > .5 ? MY : -MY);
            this.y = 0;
        }
        this.y = MY;
        this.x = 0;
        this.vx = -this.x * .01;
        this.vy = -this.y * .01;
        var plier = this.x == 0 ? MY : MX;
        for (let i = 0; i < this.allx.length; i++) {
            this.allx[i] = Math.floor(-plier * .5 + Math.random() * plier);
        }
        this.allx.sort(compRan);

        console.log(this.x.toFixed(2) + "  " + this.y.toFixed(2) + " " + this.vx.toFixed(2) + "  " + this.vy.toFixed(2));
        for (let i = 0; i < this.plans.length; i++) {
            if (this.x == 0) {
                this.plans[i].position.set(-MX * .5 + i * MX * .1, this.allx[i], 0);
                this.plans[i].rotation.set(0, 0, this.x > 0 ? 0 : Math.PI);
            } else {
                this.plans[i].position.set((this.x > 0 ? MX : -MX) + this.allx[i], -MY * .5 + i * MY * .1, 0);
                this.plans[i].rotation.set(0, 0, this.x > 0 ? 0 : Math.PI);
            }

            console.log(this.plans[i].position.x.toFixed(2) + "  " + this.plans[i].position.y.toFixed(2));
            this.plans[i].visible = true;
        }

    }
    gamereset() {
        mTex_fonts[4].visible = mTex_fonts[4].visible = false;
        this.levelUpConter = 0;
        this.points = 0;
        this.shape = 0;
        DrawLblRT(mTex_fonts[0], "Score : " + (this.points), 50, 30, FONTSCORE, 20);
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
    }

    handle_Gameplay(e, type) {

    }
    nextTurn() {
        clearTimeout(timeoutHandle);
        if (mFish.timer >= LVLTIMER) {
            mFish.levelUpConter = 150;
            // mFish.timer = 0;
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
}