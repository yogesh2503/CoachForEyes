var counter = 0, isResize = 0, isResize = 0;
var scene, camera, renderer, gameUI, mTube = [];
var CANVAS_WIDTH = 480, CANVAS_HEIGHT = 854;
var mPlayer = new Player();
var mPush = new PushPop();
var mPop = new PushPop();
var mTex_fonts = Array(2);
var mGameWaters = [];
var raycaster = new THREE.Raycaster();
var mAnim;
var mTex_Continue=null;
var handVisible = true;

function init() {
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 300); camera.rotation.set(0, 0, 0);
    camera.position.set(0, 40, 250); camera.rotation.set(-.4, 0, 0);
    scene = new THREE.Scene(); scene.background = new THREE.Color(0x000000);
    var manager = new THREE.LoadingManager(loadModel);
    manager.onProgress = function (item, loaded, total) { };
    function onProgress(xhr) { if (xhr.lengthComputable) { } }
    function onError() { }
    scene.add(new THREE.AmbientLight(0xffffff, 0.6));
    directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
    directionalLight.position.set(3, -2, 2);
    scene.add(directionalLight);
    var geometry = new THREE.PlaneGeometry(200, 400);
    var material = new THREE.MeshBasicMaterial({ map: loadTexture(BG_64) });
    mPlan_Home = new THREE.Mesh(geometry, material);
    mPlan_Home.position.set(0, -120, -100);
    mPlan_Home.rotation.set(-.4, 0, 0);
    scene.add(mPlan_Home);
    for (let i = 0; i < 3; i++) {
        mTube.push(new Tube());
        mTube[i].group.position.set(i * 15, 0, 0);
        mTube[i].circle.name = "yogesh" + i;
    }
    for (let i = 0; i < 12; i++) {
        mGameWaters.push(new Water(1));
    }
    mFlow = new Flow();
    mAnim = new Animation();
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    document.body.appendChild(renderer.domElement);
    gameUI = new ThreeUI(renderer.domElement, 720);
    // AssetLoader.add.image('assets/continue.png');
    // AssetLoader.add.image('assets/hand.png');
    AssetLoader.add.image64('CONT_64', CONT_64);
    AssetLoader.add.image64('HAND_64', HAND_64);
AssetLoader.add.image64('TEXT_64', TEXT_64);
    AssetLoader.progressListener = function (progress) { };
    AssetLoader.load(function () {
        mTex_hand = loadUI('HAND_64', 0, 200, 0);
        mTex_hand.visible = true;
        mTex_hand.vx = -1;
        mTex_Continue = loadUI('CONT_64', 0, 200, 11);
        mTex_Continue.vx = 1.01;
        mTex_Continue.sx = 1;
        mTex_text = loadUI('TEXT_64', 0, -200, 0);
        for (var i = 0; i < mTex_fonts.length; i++) {
            mTex_fonts[i] = createTexts("100", 20, "#fff", ThreeUI.anchors.center, ThreeUI.anchors.center, "center", "HanaleiFill");
        }
        setScreen(GAMEPLAY);
    });
    document.addEventListener('keydown', dealWithKeyboard);
    // if (isMobile.any()) {
    document.addEventListener('touchstart', e => { touchEvent(e, 0, 1); });
    document.addEventListener('touchmove', e => { touchEvent(e, 1, 1); });
    document.addEventListener('touchend', e => { touchEvent(e, 2, 1); });
    // } else {
    document.addEventListener('mousedown', e => { touchEvent(e, 0, 0); });
    document.addEventListener('mousemove', e => { touchEvent(e, 1, 0); });
    document.addEventListener('mouseup', e => { touchEvent(e, 2, 0); });
    // }
    window.addEventListener('resize', onWindowResize, false);
    Draw();
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    this.gameUI.resize();
    isResize = 5;
}
var mouse = new THREE.Vector2();
var coords = null;
var vec2 = new THREE.Vector2();
var isClick = false;
var ration = 1;
function touchEvent(e, type, sys) {
    CANVAS_WIDTH = window.innerWidth;
    CANVAS_HEIGHT = window.innerHeight;
    ration = CANVAS_WIDTH / CANVAS_HEIGHT;
    if (e.touches != null) {
        if (e.touches.length > 0) {
            mouse.x = (e.touches[0].pageX / window.innerWidth) * 2 - 1;
            mouse.y = -(e.touches[0].pageY / window.innerHeight) * 2 + 1;
            coords = { x: e.touches[0].pageX, y: e.touches[0].pageY };
            coords.x = coords.x - (window.innerWidth - gameUI.gameCanvas.getBoundingClientRect().width) / 2;
        }
    } else {
        mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
        coords = { x: e.clientX, y: e.clientY };
        coords.x = coords.x - (window.innerWidth - gameUI.gameCanvas.getBoundingClientRect().width) / 2;
        var elem = renderer.domElement, boundingRect = elem.getBoundingClientRect(),
            x = (event.clientX - boundingRect.left) * (elem.width / boundingRect.width),
            y = (event.clientY - boundingRect.top) * (elem.height / boundingRect.height);
        mouse.x = (x / CANVAS_WIDTH) * 2 - 1;
        mouse.y = -(y / CANVAS_HEIGHT) * 2 + 1;

    }
    raycaster.setFromCamera(mouse, camera);
    if (type == 2 && mouse.y > .8 && mPlayer.gOver == false) {
        gamereset();
    }
    if (mouse.y < .5)
        Handle_Game(type);

}
function Draw() {
    requestAnimationFrame(Draw);
    renderer.render(scene, camera);
    gameUI.render(renderer);
    if (mTex_Continue == null) {
        return;
    }

    if (mPlayer.gOver == false) {
        drawGame();
    } else {
        DrawTextureS(mTex_Continue, mTex_Continue.sx * 256, mTex_Continue.sx * 64);
        if (mTex_Continue.sx > 1.1) {
            mTex_Continue.vx = .995;
        }
        if (mTex_Continue.sx < 0.99) {
            mTex_Continue.vx = 1.005;
        }
        mTex_Continue.sx *= mTex_Continue.vx;
    }
    if (mAnim.group.visible)
        mAnim.update();
    if (mAnim.group2.visible) {
        mAnim.tUpdate();
        if (mTube[mPush.tubeNo].group.position.y > mTube[mPush.tubeNo].ay + 7) {
            mAnim.group2.tvy = 1.015;
            if (mAnim.group2.tcount > 1)
                mAnim.group2.tvy = 1.01;
        }
        //for tub fill animation
        if (mTube[mPush.tubeNo].group.position.y < mTube[mPush.tubeNo].ay) {
            mAnim.group2.tcount++;
            mAnim.group2.tvy = 0.985;
            if (mAnim.group2.tcount > 1)
                mAnim.group2.tvy = 0.99;
        }
        mTube[mPush.tubeNo].group.position.y *= mAnim.group2.tvy;
        if (mAnim.group2.tcount > 2)
            mTube[mPush.tubeNo].group.position.y = mTube[mPush.tubeNo].ay;
    }



    counter++;
    if (isResize > 0) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        this.gameUI.resize();
        isResize--;
    }
}
function drawGame() {

    if (mPlayer.anim == 0) {
        if ((mPlayer.vx < 0 && mTube[mPop.tubeNo].group.position.x > 0 + mTube[mPush.tubeNo].group.position.x - 15) ||
            (mPlayer.vx > 0 && mTube[mPop.tubeNo].group.position.x < 0 + mTube[mPush.tubeNo].group.position.x - 15)) {
            mTube[mPop.tubeNo].group.position.x += mPlayer.vx;
        }
        if (mTube[mPop.tubeNo].group.position.y < mTube[mPush.tubeNo].group.position.y + 18) {
            mTube[mPop.tubeNo].group.position.y += 1;
        } else if (mTube[mPop.tubeNo].group.rotation.z > -1.2) {
            mTube[mPop.tubeNo].group.rotation.z -= .2;
        } else {

            mTube[mPop.tubeNo].group.position.x = mTube[mPush.tubeNo].group.position.x - 15;
            mFlow.group.position.set(mTube[mPop.tubeNo].group.position.x + 9, mTube[mPop.tubeNo].group.position.y + -2.5, mTube[mPop.tubeNo].group.position.z);
            if (mFlow.gcyl1.scale.y > -4.2) {
                mFlow.gcyl1.scale.y -= .3;
                mFlow.gcyl1.visible = true;
                if (mFlow.gcyl1.scale.y < -4.2) {
                    mFlow.gcyl1.scale.y = -4.2;
                }
            } else if (mFlow.cyl2.visible == false) {
                mFlow.cyl2.visible = true;
            } else if (mFlow.gcyl3.scale.y < 5) {
                mFlow.gcyl3.visible = true;
                mFlow.gcyl3.scale.y += .3;
                checkAllFill();
            } else {
                tubeEmpty(mPop.tubeNo, mPush.tubeNo, mPop.wNo, mPush.wNo + 1);
            }
            if (mTube[mPop.tubeNo].water[mPop.wNo].group.visible == false) {
                checkTubeFill();
                if (mPop.wNo > 0) {
                    mPop.wNo--;
                    mPush.wNo++;
                    if (mTube[mPop.tubeNo].water[mPop.wNo].color == mTube[mPush.tubeNo].water[mPush.wNo].color && mPush.wNo + 1 < mTube[mPush.tubeNo].water.length) {
                        mTube[mPush.tubeNo].water[mPush.wNo + 1].setColor(mTube[mPop.tubeNo].water[mPop.wNo].color);
                    } else {
                        mFlow.reset();
                        mPlayer.anim = 1;
                    }
                } else {
                    mFlow.reset();
                    mTube[mPop.tubeNo].base.visible = false;
                    mPlayer.anim = 1;
                }
            }
        }
    }
    if (mPlayer.anim == 1) {
        if (mTube[mPop.tubeNo].group.rotation.z < 0) {
            mTube[mPop.tubeNo].group.rotation.z += .2;
            if (mTube[mPop.tubeNo].group.rotation.z > 0) {
                mTube[mPop.tubeNo].group.rotation.z = 0;
            }
        } else if (mTube[mPop.tubeNo].group.position.x != mTube[mPop.tubeNo].ax) {
            if (mTube[mPop.tubeNo].group.position.x > mTube[mPop.tubeNo].ax) {
                mTube[mPop.tubeNo].group.position.x -= mPlayer.vx;
                if (mTube[mPop.tubeNo].group.position.x < mTube[mPop.tubeNo].ax) {
                    mTube[mPop.tubeNo].group.position.x = mTube[mPop.tubeNo].ax;
                }
            }
            if (mTube[mPop.tubeNo].group.position.x < mTube[mPop.tubeNo].ax) {
                mTube[mPop.tubeNo].group.position.x -= mPlayer.vx;
                if (mTube[mPop.tubeNo].group.position.x > mTube[mPop.tubeNo].ax) {
                    mTube[mPop.tubeNo].group.position.x = mTube[mPop.tubeNo].ax;
                }
            }
            if (mTube[mPop.tubeNo].group.position.y > mTube[mPop.tubeNo].ay) {
                mTube[mPop.tubeNo].group.position.y -= .9;
            }

        } else {
            mPlayer.anim = 2;
            mTube[mPop.tubeNo].group.position.set(mTube[mPop.tubeNo].ax, mTube[mPop.tubeNo].ay, mTube[mPop.tubeNo].az);
            checkGameOver();
        }
    }
    if (mTex_hand.visible == true) {
        DrawTexture(mTex_hand, mTex_hand.x, -0);
        DrawTextureS(mTex_hand, 64, 64);
        DrawTextureS(mTex_text, 256, 47);
        if (mTex_hand.x < -50) {
            mTex_hand.vx = 0;
            mTex_hand.x -= .1;
            if (mTex_hand.alpha > .1) {
                mTex_hand.alpha -= .07;
            } else {
                mTex_hand.x = 60;
                mTex_hand.alpha = 1;
            }
            //
        }
        if (mTex_hand.x > 55) {
            mTex_hand.vx = -1;
            // mTex_hand.alpha = .5;
        }
        mTex_hand.x += mTex_hand.vx;
        mTex_text.visible = true;
        // DrawLbl(mTex_fonts[1], "Tap the Tubes to Start", 0, -102, "#ffffff", 30);
        // DrawLbl(mTex_fonts[0], "Tap the Tubes to Start", 2, -100, "#000000", 30);
        // mTex_hand.alpha = (111 - (mTex_hand.x + 40)) * .01;

    }
}
function checkGameOver() {
    mPlayer.gOver = true;
    for (let i = 0; i < mTube.length && mPlayer.gOver == true; i++) {
        let k = 0;
        for (let j = 0; j < mTube[i].water.length; j++) {
            if (mTube[i].water[j].group.visible == true) {
                k++;
            }
        }
        if (k != 0 && k != mTube[i].water.length) {
            mPlayer.gOver = false;
        }
    }
    mTex_Continue.visible = mPlayer.gOver;
    // mAnim.resetAll(mPlayer.gOver);
    if (mPlayer.lvl == 3 && mPlayer.gOver) {
        DrawLbl(mTex_fonts[1], "Water Sort 3d", 0, -202, "#ffffff", 30);
        DrawLbl(mTex_fonts[0], "Water Sort 3d", 2, -200, "#000000", 30);
    }
}
function checkAllFill() {
    mAnim.group.visible = true;
    for (let i = 0; i < mTube.length && mAnim.group.visible; i++) {
        let k = 0;
        for (let j = 0; j < mTube[i].water.length; j++) {
            if (mTube[i].water[j].group.visible == true && !(mPop.tubeNo == i && mPop.wNo == j)) {
                k++;
            }
            if (mPush.tubeNo == i && mPush.wNo == j) {
                k++;
            }
        }
        if (k != 0 && k != mTube[i].water.length) {
            mAnim.group.visible = false;
        }
    }

}
function checkTubeFill() {
    let k = 0;
    for (let j = 0; j < mTube[mPush.tubeNo].water.length; j++) {
        if (mTube[mPush.tubeNo].water[j].group.visible == true) {
            if (k > 0) {
                if (mTube[mPush.tubeNo].water[j].color != mTube[mPush.tubeNo].water[j - 1].color)
                    k--;
            }
            k++;
        }
    }
    if (k == mTube[mPush.tubeNo].water.length && mAnim.group2.visible == false) {
        mAnim.setFilAination(mTube[mPush.tubeNo].group.position.x, mTube[mPush.tubeNo].group.position.y + 10, mTube[mPush.tubeNo].group.position.z);
    }



}
function tubeEmpty(ta, tb, emt, fil) {
    if (mTube[ta].water[emt].group.scale.y > .02) {
        mTube[ta].water[emt].group.scale.y -= .05;
        if (mTube[tb].water[fil].group.scale.y < 1) {
            mTube[tb].water[fil].group.scale.y += .05;
            mTube[tb].water[fil].group.visible = true;
        }
        if (mTube[ta].water[emt].group.scale.y < .02) {
            mTube[ta].water[emt].group.visible = false;
            mTube[tb].water[fil].group.scale.y = 1;
        }
        if (fil == 0) {
            mTube[tb].base.visible = true;
        }
    }
}
var newone = -1;
function Handle_Game(type) {
    if (mPlayer.anim == 2) {

        if (type == 0) {
            mPop.tubeNo = mPush.tubeNo;
            newone = -1;
            var col = [];
            mPlayer.tubes.forEach(element => { col.push(element.circle); });
            var intersects = raycaster.intersectObjects(col);
            var no = -1;
            for (let i = 0; i < col.length && intersects.length > 0; i++) {
                if (intersects[0].object == col[i]) {
                    no = i;
                }
            }
            no = -1;
            for (let i = 0; i < mPlayer.tubes.length && no == -1; i++) {
                if (CircRectsOverlap(mPlayer.tubes[i].group.position.x, mPlayer.tubes[i].group.position.y, 10, 200, (mouse.x * 111 * ration), (mouse.y * 900), 5)) {
                    no = i;
                }

            }

            selObj(no);
        }
        if (type == 1) {
            var col = [];
            mPlayer.tubes.forEach(element => { col.push(element.circle); });
            var intersects = raycaster.intersectObjects(col);
            for (let i = 0; i < col.length && intersects.length > 0; i++) {
                if (intersects[0].object == col[i]) {
                    newone = i;
                }
            }

            for (let i = 0; i < mPlayer.tubes.length; i++) {
                if (CircRectsOverlap(mPlayer.tubes[i].group.position.x, mPlayer.tubes[i].group.position.y, 10, 200, (mouse.x * 111 * ration), (mouse.y * 900), 5)) {
                    newone = i;
                }
            }
        }
        if (type == 2) {
            if (newone > -1) {
                if (mTube[newone].isSelected == false) {
                    selObj(newone);
                }
            }
            setMove();
        }
    }
}
function selectTube(no, isSel) {
    mTube[no].isSelected = isSel;
    mTube[no].group.position.set(mTube[no].ax, mTube[no].ay + (isSel ? 10 : 0), mTube[no].az);
}
function selObj(no) {
    if (no > -1) {
        var selNo = -1;
        for (var i = 0; i < mPlayer.tubes.length; i++) {
            if (mTube[i].isSelected) {
                selNo = i;
            }
        }
        if (selNo > -1 && selNo != no) {
            mPop.tubeNo = selNo;
            mPush.tubeNo = no;
            if (setMove())
                mTube[selNo].isSelected = false;
            else
                selectTube(selNo, !mTube[selNo].isSelected);
        } else {
            selectTube(no, !mTube[no].isSelected);
        }
    }
}
function setMove() {
    var isMove = false;
    if (mPush.tubeNo != mPop.tubeNo) {
        mPop.reset();
        for (let i = mTube[mPop.tubeNo].water.length - 1; i >= 0; i--) {
            if (mTube[mPop.tubeNo].water[i].group.visible == true && mPop.wNo == -1) {
                mPop.wNo = i;
                mPop.color = mTube[mPop.tubeNo].water[i].color;
            }
            if (mPop.color == mTube[mPop.tubeNo].water[i].color && mTube[mPop.tubeNo].water[i].group.visible == true) {
                mPop.noSameClr++;
                break;
            }

        }
        mPush.reset();
        for (let i = mTube[mPush.tubeNo].water.length - 1; i >= 0; i--) {
            if (mTube[mPush.tubeNo].water[i].group.visible == true && mPush.wNo == -1) {
                mPush.wNo = i;
                mPush.color = mTube[mPush.tubeNo].water[i].color;
            }
            if (mPush.color == mTube[mPush.tubeNo].water[i].color && mTube[mPush.tubeNo].water[i].group.visible == true) {
                mPush.noSameClr++;
                break;
            }
        }
        if (mPush.wNo < mTube[mPush.tubeNo].water.length - 1 && mPop.wNo >= 0) {
            if (mPop.noSameClr + mPush.noSameClr <= mTube[mPush.tubeNo].water.length && (mPop.color == mPush.color || mPush.color == -1)) {
                mFlow.setColor(mPop.color);
                mPlayer.anim = 0;
                mFlow.group.position.set(mTube[mPush.tubeNo].group.position.x - 6, mTube[mPush.tubeNo].group.position.y + 15.5, 0);
                mPlayer.vx = (mTube[mPush.tubeNo].group.position.x - mTube[mPop.tubeNo].group.position.x) * .1;
                mTube[mPush.tubeNo].water[mPush.wNo + 1].setColor(mTube[mPop.tubeNo].water[mPop.wNo].color);
                if (mPush.wNo < 0)
                    mTube[mPush.tubeNo].setColor(mTube[mPop.tubeNo].water[mPop.wNo].color);
                isMove = true;
            }
            mTex_hand.visible = false;
            mTex_text.visible = false;
            mTex_fonts[1].visible = mTex_fonts[0].visible = false;
        }
    }
    return isMove;
}

function setScreen(scr) {
    GameScreen = scr;
    gamereset();
    mTex_text.visible =mTex_hand.visible = true;
}
function gamereset() {
    for (let i = 0; i < mTube.length; i++) {
        mTube[i].group.visible = false;
    }
    mPlayer.anim = 2;
    mFlow.reset();
    mPlayer.gOver = false;
    if (mPlayer.lvl == 1) {
        setLevelOne();
    }
    if (mPlayer.lvl == 2) {
        setLevelTwo();
    }
    if (mPlayer.lvl == 3) {
        setLevelThree();
    }
    // setLevelThree();
    mTex_Continue.visible = mPlayer.gOver;
    mAnim.resetAll(mPlayer.gOver);
}
function setLevelOne() {
    if (mPlayer.tubes.length > 0) {
        mPlayer.tubes.pop();
    }
    mPlayer.tubes.length = 0;
    for (let i = 0; i < 2; i++) {
        mPlayer.tubes.push(mTube[i]);
        mTube[i].set(-20 + i * 40, -70, 0);
        mTube[i].setWater(i * 2, 2);
        for (let j = 0; j < mTube[i].water.length; j++) {
            if (j == 0) {
                mTube[i].water[j].group.visible = true;
                mTube[i].water[j].group.scale.y = 1;
                mTube[i].base.visible = true;
                mTube[i].setColor(0);
            } else {
                mTube[i].water[j].group.visible = false;
                mTube[i].water[j].group.scale.y = .01;
            }
            mTube[i].water[j].setColor(0);
        }
    }
    mPlayer.vx = -2;
    mPush.tubeNo = 0; mPop.tubeNo = 1;
    mFlow.group.position.set(mTube[mPush.tubeNo].group.position.x - 6, mTube[mPush.tubeNo].group.position.y + 15.5, 0);
}

function setLevelTwo() {
    if (mPlayer.tubes.length > 0) {
        mPlayer.tubes.pop();
    }
    mPlayer.tubes.length = 0;
    var colr = [[0, 1], [-1, -1], [1, 0]];
    for (let i = 0; i < 3; i++) {
        mPlayer.tubes.push(mTube[i]);
        mTube[i].set(-30 + i * 30, -70, 0);
        mTube[i].base.visible = true;
        mTube[i].setWater(i * 2, 2);
        for (let j = 0; j < mTube[i].water.length; j++) {
            mTube[i].water[j].group.visible = colr[i][j] >= 0;
            if (colr[i][j] >= 0) {
                mTube[i].water[j].setColor(colr[i][j]);
                mTube[i].water[j].group.scale.y = 1;
                if (j == 0) {
                    mTube[i].setColor(colr[i][j]);
                }
            } else {
                mTube[i].water[j].group.scale.y = .01;
                if (j == 0) {
                    mTube[i].base.visible = false;
                }
            }
        }
    }
    mPlayer.vx = -2;
    mPush.tubeNo = 0; mPop.tubeNo = 1;
    mFlow.group.position.set(mTube[mPush.tubeNo].group.position.x - 6, mTube[mPush.tubeNo].group.position.y + 15.5, 0);
}
function setLevelThree() {
    if (mPlayer.tubes.length > 0) {
        mPlayer.tubes.pop();
    }
    mPlayer.tubes.length = 0;
    var colr = [[3, 3, -1], [0, 3, 0], [0, -1, -1]];
    for (let i = 0; i < 3; i++) {
        mPlayer.tubes.push(mTube[i]);
        mTube[i].set(-30 + i * 30, i == 1 ? -75 : -65, 0);
        mTube[i].base.visible = true;
        mTube[i].setWater(i * 3, 3);
        for (let j = 0; j < mTube[i].water.length; j++) {
            mTube[i].water[j].group.visible = colr[i][j] >= 0;
            if (colr[i][j] >= 0) {
                mTube[i].water[j].setColor(colr[i][j]);
                mTube[i].water[j].group.scale.y = 1;
                if (j == 0) {
                    mTube[i].setColor(colr[i][j]);
                }
            } else {
                mTube[i].water[j].group.scale.y = .01;
                if (j == 0) {
                    mTube[i].base.visible = false;
                }
            }
        }
    }
    mPlayer.vx = -2;
    mPush.tubeNo = 0; mPop.tubeNo = 1;
    mFlow.group.position.set(mTube[mPush.tubeNo].group.position.x - 6, mTube[mPush.tubeNo].group.position.y + 15.5, 0);
}
function Handle_Menu(clickval) {
    if (mPlayer.lvl < 3) {
        mPlayer.lvl++;
        gamereset();
    } else {
      callAppLink("iOS");
    }
}
function Handle_Game_old(type) {
    if (mPlayer.anim == 2) {
        if (type == 0) {
            mPop.tubeNo = mPush.tubeNo;
            var col = [];
            mPlayer.tubes.forEach(element => { col.push(element.circle); });
            var intersects = raycaster.intersectObjects(col);
            for (let i = 0; i < col.length && intersects.length > 0; i++) {
                if (intersects[0].object == col[i]) {
                    mPop.tubeNo = i;
                }
            }
            mPush.tubeNo = mPop.tubeNo;
            // selectTube(mPop.tubeNo);
        }
        if (type == 1) {
            var col = [];
            mPlayer.tubes.forEach(element => { col.push(element.circle); });
            var intersects = raycaster.intersectObjects(col);
            for (let i = 0; i < col.length && intersects.length > 0; i++) {
                if (intersects[0].object == col[i]) {
                    mPush.tubeNo = i;
                }
            }
        }
        if (type == 2) {
            if (mPush.tubeNo != mPop.tubeNo) {
                mPop.reset();
                for (let i = mTube[mPop.tubeNo].water.length - 1; i >= 0; i--) {
                    if (mTube[mPop.tubeNo].water[i].group.visible == true && mPop.wNo == -1) {
                        mPop.wNo = i;
                        mPop.color = mTube[mPop.tubeNo].water[i].color;
                    }
                    if (mPop.color == mTube[mPop.tubeNo].water[i].color && mTube[mPop.tubeNo].water[i].group.visible == true) {
                        mPop.noSameClr++;
                        break;
                    }

                }
                mPush.reset();
                for (let i = mTube[mPush.tubeNo].water.length - 1; i >= 0; i--) {
                    if (mTube[mPush.tubeNo].water[i].group.visible == true && mPush.wNo == -1) {
                        mPush.wNo = i;
                        mPush.color = mTube[mPush.tubeNo].water[i].color;
                    }
                    if (mPush.color == mTube[mPush.tubeNo].water[i].color && mTube[mPush.tubeNo].water[i].group.visible == true) {
                        mPush.noSameClr++;
                        break;
                    }
                }
                if (mPush.wNo < mTube[mPush.tubeNo].water.length - 1 && mPop.wNo >= 0) {
                    if (mPop.noSameClr + mPush.noSameClr <= mTube[mPush.tubeNo].water.length && (mPop.color == mPush.color || mPush.color == -1)) {
                        mFlow.setColor(mPop.color);
                        mPlayer.anim = 0;
                        mFlow.group.position.set(mTube[mPush.tubeNo].group.position.x - 6, mTube[mPush.tubeNo].group.position.y + 15.5, 0);
                        mPlayer.vx = (mTube[mPush.tubeNo].group.position.x - mTube[mPop.tubeNo].group.position.x) * .1;
                        mTube[mPush.tubeNo].water[mPush.wNo + 1].setColor(mTube[mPop.tubeNo].water[mPop.wNo].color);
                        if (mPush.wNo < 0)
                            mTube[mPush.tubeNo].setColor(mTube[mPop.tubeNo].water[mPop.wNo].color);
                    }
                    mTex_text.visible = mTex_hand.visible = false;
                    mTex_fonts[1].visible = mTex_fonts[0].visible = false;
                }
            }
        }
    }
}
