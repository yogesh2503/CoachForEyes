var counter = 0, isResize = 0, isResize = 0,scene, camera, renderer, gameUI, mTube = [],CANVAS_WIDTH = 480, CANVAS_HEIGHT = 854, mPlayer,mPush,mPop, mTex_fonts = Array(2),mGameWaters = [], raycaster = new THREE.Raycaster(), mAnim, handVisible = true;
function init() {
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 40, 250); camera.rotation.set(-.4, 0, 0);
    scene = new THREE.Scene(); scene.background = new THREE.Color(0x000000);
    scene.add(new THREE.AmbientLight(0xffffff, 0.6));
    directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
    directionalLight.position.set(3, -2, 2);
    scene.add(directionalLight);
    mPlayer= new Player();
    mPush = new PushPop();
    mPop = new PushPop();
    var geometry = new THREE.PlaneGeometry(200, 400);
    var material = new THREE.MeshBasicMaterial({ map: loadTexture(BG_64) });
    mPlan_Home = new THREE.Mesh(geometry, material);
    mPlan_Home.position.set(0, -120, -100);
    mPlan_Home.rotation.set(-.4, 0, 0);
    scene.add(mPlan_Home);
    for (let i = 0; i < 5; i++) {
        mTube.push(new Tube());
        mTube[i].group.position.set(i * 15, 0, 0);
        mTube[i].circle.name = "yogesh" + i;
    }
    for (let i = 0; i < 15; i++) {
        mGameWaters.push(new Water(1));
    }
    mFlow = new Flow();
    mAnim = new Animation();
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    document.body.appendChild(renderer.domElement);
    gameUI = new ThreeUI(renderer.domElement, 720);
    AssetLoader.add.image64('CONT_64', CONT_64);
    AssetLoader.add.image64('HAND_64', HAND_64);
    AssetLoader.add.image64('TEXT_64', TEXT_64);
    AssetLoader.add.image64('DLOAD_64', DLOAD_64);
    AssetLoader.progressListener = function (progress) { };
    AssetLoader.load(function () {
        mTex_hand = loadUI('HAND_64', 0, 200, 0);
        mTex_hand.visible = true;
        mTex_hand.vx = -1;
        mTex_Continue = loadUI('CONT_64', 0, 200, 11);
        mTex_Continue.vx = 1.01;
        mTex_Continue.sx = 1;

        mTex_Download = loadUI('DLOAD_64', 0, -320, 12);
        mTex_Download.vx = 1.1;
        mTex_Download.s = 1;
        mTex_Download.sx = 1.1;
        mTex_Download.count = 0;
        DrawTexture(mTex_Download, 0, -320,200,50);

        mTex_text = loadUI('TEXT_64', 0, -200, 0);
        for (var i = 0; i < mTex_fonts.length; i++) {
            mTex_fonts[i] = createTexts("100", 20, "#fff", ThreeUI.anchors.center, ThreeUI.anchors.center, "center", "HanaleiFill");
        }
        setScreen();
    });
    document.addEventListener('touchstart', e => { touchEvent(e, 0, 1); });
    document.addEventListener('touchmove', e => { touchEvent(e, 1, 1); });
    document.addEventListener('touchend', e => { touchEvent(e, 2, 1); });
    document.addEventListener('mousedown', e => { touchEvent(e, 0, 0); });
    document.addEventListener('mousemove', e => { touchEvent(e, 1, 0); });
    document.addEventListener('mouseup', e => { touchEvent(e, 2, 0); });
    window.addEventListener('resize', onWindowResize, false);
    Draw();
}
const CSPD = 1.5;
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
        DrawTexture(mTex_Continue, 0, 200,mTex_Continue.sx * 256, mTex_Continue.sx * 64);
        if (mTex_Continue.sx > 1.1) {
            mTex_Continue.vx = .995;
        }
        if (mTex_Continue.sx < 0.99) {
            mTex_Continue.vx = 1.005;
        }
        mTex_Continue.sx *= mTex_Continue.vx;
    }
    installAnimation();
    if (mAnim.group.visible)
        mAnim.update();
    if (mAnim.group2.visible) {
        mAnim.tUpdate();
        if (mTube[mPush.tubeNo].group.position.y > mTube[mPush.tubeNo].ay + 7) {
            mAnim.group2.tvy = 1.015;
            if (mAnim.group2.tcount > 1)
                mAnim.group2.tvy = 1.01;
        }
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
            mTube[mPop.tubeNo].group.position.z = mTube[mPush.tubeNo].group.position.z;
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
        DrawTexture(mTex_hand, mTex_hand.x, -0,64,64);
        DrawTexture(mTex_text,0,-160, 256, 47);
        if (mTex_hand.x < -50) {
            mTex_hand.vx = 0;
            mTex_hand.x -= .1;
            if (mTex_hand.alpha > .1) {
                mTex_hand.alpha -= .07;
            } else {
                mTex_hand.x = 60;
                mTex_hand.alpha = 1;
            }

        }
        if (mTex_hand.x > 55) {
            mTex_hand.vx = -1;
        }
        mTex_hand.x += mTex_hand.vx;
        mTex_text.visible = true;
    }
}
function installAnimation(){
  DrawTexture(mTex_Download,mTex_Download.x, -320,200*mTex_Download.s,50*mTex_Download.s);
  mTex_Download.s *= mTex_Download.sx;
  if(mTex_Download.s>1)
    mTex_Download.sx = .993;
  if(mTex_Download.s<.9)
    mTex_Download.sx = 1.008;

  mTex_Download.count++;
  if(counter % 300 > 250){
    mTex_Download.x += mTex_Download.vx;
    if(mTex_Download.x>5)
      mTex_Download.vx = -2;
    if(mTex_Download.x<-5)
      mTex_Download.vx = 2;
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
    if (mPlayer.lvl == 4 && mPlayer.gOver) {
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
            if (mPlayer.lvl == 4) {
               callAppLink("iOS");
            }
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
            if (mPlayer.lvl == 4) {
              var isReady = true;
              for (var i = 0; i < mPlayer.tubes.length&&isReady; i++) {
                  if (mTube[i].isTuch == false) {
                      isReady =false;
                  }
              }
              if(isReady){
                callAppLink("iOS");
              }else{
                setMove();
              }
            }else{
              setMove();
            }


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
        mTube[no].isTuch = true;
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
                mTube[mPush.tubeNo].isTuch = mTube[mPop.tubeNo].isTuch = true;
            }
            mTex_hand.visible = false;
            mTex_text.visible = false;
            mTex_fonts[1].visible = mTex_fonts[0].visible = false;
        }
    }
    return isMove;
}

function setScreen(scr) {
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
    if (mPlayer.lvl == 4) {
      setLevelFour();
    }



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
        mTube[i].set(-30 + i * 30, -70, i%2==0 ? -10 : 10);
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
function setLevelFour() {
    if (mPlayer.tubes.length > 0) {
        mPlayer.tubes.pop();
    }
    mPlayer.tubes.length = 0;
    var colr = [[2, 1, 2], [1, -1, -1], [3, 3, -1], [0, 3, 0], [0, 2, 1]];
    for (let i = 0; i < colr.length; i++) {
        mPlayer.tubes.push(mTube[i]);
        if(i==2){
          mTube[i].set(-40 + i * 20, -70,  -20);
        }else{
          mTube[i].set(-40 + i * 20, -70,  i%2==0 ? -10 : 10);
        }

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
  if(clickval==12){
callAppLink("iOS");
  }else{
    if (mPlayer.lvl < 3) {
        mPlayer.lvl++;
        gamereset();
    } else {
      callAppLink("iOS");
    }
  }
}
function loadUI(assetpath, x, y, clickval) {
    var sprite = gameUI.createSprite(assetpath);
    sprite.alpha = 1;
    sprite.x = x;
    sprite.y = y;
    sprite.width = sprite.width * .85;
    sprite.height = sprite.height * .85;
    sprite.pivot.x = 0.5;
    sprite.pivot.y = 0.5;
    sprite.anchor.x = ThreeUI.anchors.center;
    sprite.anchor.y = ThreeUI.anchors.center;
    sprite.visible = false;
    sprite.alpha = 1;
    if (clickval > 0)
        sprite.onClick(() => { Handle_Menu(clickval); });
    return sprite;
}
function createTexts(text, size, color, anchorx, anchory, textAlign, tpye) {
    var lbltext = this.gameUI.createText(text, size, tpye, color);
    lbltext.anchor.x = anchorx;
    lbltext.anchor.y = anchory;
    lbltext.textAlign = textAlign;
    lbltext.visible = false;
    return lbltext;
}
function DrawTexture(tex, x, y, sx, sy) {
    tex.x = x;
    tex.y = y;
    tex.width = sx;
    tex.height = sy;
    tex.visible = true;
}
function DrawTextureS(tex, sx, sy) {
    tex.width = sx;
    tex.height = sy;
    tex.visible = true;
}
function DrawLbl(tex, lbl, x, y, color, siz) {
    tex.x = x;
    tex.y = y;
    tex.text = lbl;
    tex.color = color || '#fafafa';
    tex.size = siz || 50;
    tex.anchor.x = ThreeUI.anchors.center;
    tex.anchor.y = ThreeUI.anchors.center;
    tex.visible = true;
}
function CircRectsOverlap(CRX, CRY, CRDX, CRDY, centerX, centerY, radius) {
    if ((Math.abs(centerX - CRX) <= (CRDX + radius)) && (Math.abs(centerY - CRY) <= (CRDY + radius)))
        return true;
    return false;
}
function rands(max) {
    return Math.floor(Math.random() * max);
}
function wColor(clr) {
    colors = ['rgb(255,0,0)', 'rgb(255,127,0)', 'rgb(22,104,233)', 'rgb(0,255,255)',
        'rgb(85,253,0)', 'rgb(255,255,0)', 'rgb(255,0,255)', 'rgb(150,0,255)'];
    return new THREE.Color(colors[clr]);
}
function loadModel() { }
function loadTexture(str) {
    let image = new Image(); image.src = str;
    const texture = new THREE.Texture();
    texture.image = image;
    image.onload = function () { texture.needsUpdate = true; };
    return texture;
}
function CustomSinCurve(scale) {
    THREE.Curve.call(this);
    this.scale = (scale === undefined) ? 1 : scale;
}
function Createtube(material) {
    CustomSinCurve.prototype = Object.create(THREE.Curve.prototype);
    CustomSinCurve.prototype.constructor = CustomSinCurve;
    CustomSinCurve.prototype.getPoint = function (t) {
        var tx = t * 1;
        var ty = 0;
        var tz = 0;
        return new THREE.Vector3(tx, ty, tz).multiplyScalar(this.scale);
    };
    var path = new CustomSinCurve(24);
    var geometry = new THREE.TubeGeometry(path, 32, 4.5, 8, false);
    var mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.set(0, 0, -Math.PI * .5);
    scene.add(mesh);
    return mesh;
}
class Tube {
    constructor() {
        this.material = new THREE.MeshPhongMaterial({ color: 0xffffff, side: THREE.DoubleSide, transparent: true, map: loadTexture(TRAC_64) });
        this.group = new THREE.Group();
        var extrudeSettings = { depth: 1, bevelEnabled: true, bevelSegments: 10, steps: 2, bevelSize: 1, bevelThickness: 12 };
        var smileyShape = new THREE.Shape();
        smileyShape.moveTo(0, 0);
        smileyShape.absarc(0, 0, 4, 0, Math.PI * 2, false);
        var smileyEye1Path = new THREE.Path();
        smileyEye1Path.moveTo(0, 0);
        smileyEye1Path.absellipse(0, 0, 3.8, 3.8, 0, Math.PI * 2, true);
        smileyShape.holes.push(smileyEye1Path);
        this.circle = Createtube(this.material);
        this.circle.position.set(0, 12, 0);
        var smileyShape2 = new THREE.Shape();
        smileyShape2.moveTo(0, 0);
        smileyShape2.absarc(0, 0, 4, 0, Math.PI * 2, false);
        this.circle2 = this.addShape(smileyShape2, extrudeSettings, 0, 0, 0, Math.PI * .5, 0, 0, 1);
        this.circle2.scale.set(.2, .2, .6);
        this.circle2.position.set(0, -22, 0);
        var geometry = new THREE.SphereGeometry(4, 32, 32, 0, Math.PI, 0, Math.PI);
        this.object = new THREE.Mesh(geometry, this.material);
        this.object.position.set(0, -12, 0);
        this.object.rotation.set(Math.PI * .5, 0, 0);
        var materialcup = new THREE.MeshPhongMaterial({ color: 0xffff00 });
        var geometry = new THREE.SphereGeometry(4, 32, 32, 0, Math.PI, 0, Math.PI);
        this.base = new THREE.Mesh(geometry, materialcup);
        this.base.position.set(0, -12, 0);
        this.base.rotation.set(Math.PI * .5, 0, 0);
        this.group.add(this.base);
        this.object2 = this.object.clone();
        this.object2.position.set(0, -31, 0);
        this.object2.rotation.set(Math.PI * 1.5, 0, 0);
        this.object2.scale.set(1, 1, .6);
        this.group.add(this.circle);
        this.group.add(this.object);
        this.group.add(this.circle2);
        this.group.add(this.object2);
        this.water = [];
        scene.add(this.group);
        this.ax = 0;
        this.ay = 0;
        this.group.visible = false;
        this.isSelected = false;
        this.isTuch = false;
    }
    addShape(shape, extrudeSettings, x, y, z, rx, ry, rz, s) {
        var geometry = new THREE.ExtrudeBufferGeometry(shape, extrudeSettings);
        var mesh = new THREE.Mesh(geometry, this.material);
        mesh.position.set(x, y, z);
        mesh.rotation.set(rx, ry, rz);
        mesh.scale.set(s, s, s);
        return mesh;
    }
    set(_x, _y, _z) {
        this.ax = _x;
        this.ay = _y;
        this.az = _z;
        this.group.position.set(_x, _y, _z);
        this.group.rotation.set(0, 0, 0);
        this.group.visible = true;
        this.isSelected = false;
        this.isTuch = false;
    }
    setWater(no, noColor) {
        if (this.water.length > 0) {
            let obj = this.water.pop();
            this.group.remove(obj.group);
        }
        this.water.length = 0;
        var val = 22 / noColor;
        for (let i = 0; i < noColor; i++) {
            this.water.push(mGameWaters[i + no]);
            this.water[i].cyl.position.set(0, val * .5, 0);
            this.water[i].cyl.scale.set(1, val, 1);
            this.group.add(this.water[i].group);
            this.water[i].group.position.set(0, -12 + i * val, 0);
        }
    }
    setColor(clr) {
        this.base.traverse(function (child) { if (child.isMesh) { child.material.color = wColor(clr); } });
    }
}

class Flow {
    constructor() {
        this.group = new THREE.Group();
        this.material = new THREE.MeshPhongMaterial({ color: 0xffff00 });
        var geometry = new THREE.CylinderGeometry(1, 1, 6, 8);
        this.cyl1 = new THREE.Mesh(geometry, this.material);
        this.cyl3 = new THREE.Mesh(geometry, this.material);
        var geometry = new THREE.SphereGeometry(1.4, 32, 32);
        var geometry = new THREE.TorusBufferGeometry(2, 1.4, 4, 8, Math.PI * .6);
        this.cyl2 = new THREE.Mesh(geometry, this.material);
        this.cyl4 = new THREE.Mesh(geometry, this.material);
        this.cyl1.position.set(0, -3, 0);
        this.gcyl1 = new THREE.Group();
        this.gcyl1.add(this.cyl1);
        this.gcyl1.position.set(2.6, 4, 0);
        this.gcyl1.rotation.set(0, 0, -1.2);
        this.gcyl3 = new THREE.Group();
        this.cyl3.position.set(0, -3, 0);
        this.gcyl3.add(this.cyl3);
        this.gcyl3.position.set(3.8, 3.3, 0);
        this.group.add(this.gcyl1);
        this.group.add(this.cyl2);
        this.group.add(this.gcyl3);
        this.group.add(this.cyl4);
        this.cyl2.position.set(2.1, 2.3, 0);
        this.cyl4.position.set(3.9, 3.3, 0);
        this.group.scale.set(1, 1, 1);
        this.group.position.set(9, 15.5, 0);
        scene.add(this.group);
        this.reset();
    }
    reset() {
        this.gcyl1.visible = false;
        this.cyl2.visible = false;
        this.gcyl3.visible = false;
        this.cyl4.visible = false;
        this.gcyl1.position.set(-20.6, -4.6, 0);
        this.gcyl1.scale.set(1.4, -0.2, 1.4);
        this.gcyl3.scale.set(1.4, .01, 1.4);
    }
    setColor(clr) {
        this.material = wColor(clr);
        this.gcyl1.traverse(function (child) { if (child.isMesh) { child.material.color = wColor(clr); } });
        this.cyl2.traverse(function (child) { if (child.isMesh) { child.material.color = wColor(clr); } });
        this.gcyl3.traverse(function (child) { if (child.isMesh) { child.material.color = wColor(clr); } });
        this.cyl4.traverse(function (child) { if (child.isMesh) { child.material.color = wColor(clr); } });
    }

}
class Water {
    constructor(val) {
        this.group = new THREE.Group();
        var geometry = new THREE.CylinderGeometry(4.4, 4.4, 1, 8);
        var material = new THREE.MeshPhongMaterial({ color: 0xffff00 });
        this.cyl = new THREE.Mesh(geometry, material);
        this.cyl.position.set(0, val * .5, 0);
        this.cyl.scale.set(1, val, 1);
        this.group.add(this.cyl);
        this.group.scale.set(1, 1, 1);
        this.color = 0;
    }
    setColor(clr) {
        this.cyl.traverse(function (child) { if (child.isMesh) { child.material.color = wColor(clr); } });
        this.color = clr;
    }
}

class PushPop {
    constructor() {
        this.tubeNo = 1;
        this.wNo = 1;
        this.color = 0;
        this.noSameClr = 0;
    }
    reset() {
        this.wNo = -1;
        this.color = -1;
        this.noSameClr = 0;
    }
}
class Player {
    constructor() {
        this.animation = 1;
        this.tubes = [];
        this.lvl = 1;
        this.vx = -.10;
        this.gOver = false;
    }
}


class Animation {
    constructor(val) {
        this.group = new THREE.Group();
        this.obj = [];
        this.objLong = [];
        for (let i = 0; i < 120; i++) {
            this.obj.push(this.createObj(3 + rands(8)));
            this.obj[i].position.set(-100 + i * 10, 0, 0);
            this.obj[i].vx = 0.1;
            this.obj[i].vy = 1.9;
            this.obj[i].vz = 0;
            this.obj[i].rot = 0;
            this.obj[i].visible = false;
        }
        var triangleShape = new THREE.Shape();
        triangleShape.moveTo(0, 0);
        triangleShape.lineTo(-.4, 20);
        triangleShape.lineTo(.4, 20);
        triangleShape.lineTo(0, 0);
        var geometry = new THREE.ShapeBufferGeometry(triangleShape);
        var mesh = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({ side: THREE.DoubleSide, color: wColor(rands(8)) }));
        for (let i = 0; i < 40; i++) {
            this.objLong.push(new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, color: wColor(rands(8)) })));
            this.objLong[i].position.set(-100 + i * 10, 0, 0);
            this.objLong[i].rotation.set(-.51, 0, -.50);
            this.objLong[i].vx = 0.1;
            this.objLong[i].vy = 1.9;
            this.objLong[i].vz = 0;
            this.objLong[i].rot = 0;
            this.objLong[i].visible = false;
            this.group.add(this.objLong[i]);
        }
        this.setAnim(20);
        scene.add(this.group);
        this.group.visible = false;
        this.tobj = [];
        this.tobjLong = [];
        this.group2 = new THREE.Group();
        for (let i = 0; i < 20; i++) {
            this.tobj.push(this.createTObj(3 + rands(8)));
            this.tobj[i].position.set(-100 + i * 10, 0, 0);
            this.tobj[i].vx = 0.1;
            this.tobj[i].vy = 1.9;
            this.tobj[i].vz = 0;
            this.tobj[i].rot = 0;
            this.tobj[i].visible = true;
        }
        scene.add(this.group2);
        this.setFilAination(0, -10, 0);
        this.group2.visible = false;
        this.group2.tcount = 0;
        this.group2.tvy = 1.01;
    }
    createObj(node) {
        var material = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, color: wColor(rands(8)) });
        var object = new THREE.Mesh(new THREE.CircleBufferGeometry(2, node, 0, Math.PI * 2), material);
        this.group.add(object);
        return object;
    }
    createTObj(node) {
        var material = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, color: wColor(rands(8)) });
        var object = new THREE.Mesh(new THREE.CircleBufferGeometry(2, node, 0, Math.PI * 2), material);
        this.group2.add(object);
        return object;
    }
    update() {
        for (let i = 0; i < this.obj.length; i++) {
            if (this.obj[i].visible) {
                this.obj[i].position.x += this.obj[i].vx;
                this.obj[i].position.y += this.obj[i].vy;
                this.obj[i].position.z += this.obj[i].vz;
                this.obj[i].vy -= (.03 * CSPD);
                if (this.obj[i].vy < -.6) {
                    this.obj[i].position.y = -1000;
                    this.obj[i].visible = false;
                }
                if (this.obj[i].vy < 0) {
                    this.obj[i].scale.set(this.obj[i].scale.x - .03, this.obj[i].scale.x - .03, this.obj[i].scale.x - .03);
                }

                this.obj[i].rotation.x += this.obj[i].rot;
                this.obj[i].rotation.y += this.obj[i].rot * 2;
                this.obj[i].rotation.z += this.obj[i].rot * 3;
            }
        }
        for (let i = 0; i < this.objLong.length; i++) {
            if (this.objLong[i].visible) {
                this.objLong[i].position.x += this.objLong[i].vx;
                this.objLong[i].position.y += this.objLong[i].vy;
                this.objLong[i].position.z += this.objLong[i].vz;
                this.obj[i].rotation.x += this.obj[i].rot;
                this.objLong[i].vy -= (.03 * CSPD);
                if (this.objLong[i].vy < -.6) {
                    this.objLong[i].position.y = -1000;
                    this.objLong[i].visible = false;
                }
                if (this.objLong[i].vy < 0) {
                    this.objLong[i].scale.set(this.objLong[i].scale.x - .03, this.objLong[i].scale.x - .03, this.objLong[i].scale.x - .03);
                }
            }
        }
        if (counter % 15 == 0) {
            this.setAnim(20);
        }

    }
    setAnim(noObj) {
        var j = 0;
        for (let i = 0; i < this.obj.length && j < noObj; i++) {
            if (this.obj[i].visible == false) {
                this.obj[i].vy = (0.8 + Math.random() * 1.5) * 1.2;
                this.obj[i].vz = (-1 - Math.random() * 3) * .2;
                this.obj[i].rot = Math.random() * .1;
                if (j > noObj * .5) {
                    this.obj[i].position.set(60 - rands(10), -200, 100);
                    this.obj[i].vx = -(0.22 + Math.random() * .15);
                } else {
                    this.obj[i].position.set(-60 + rands(10), -200, 100);
                    this.obj[i].vx = (0.22 + Math.random() * .15);
                }
                this.obj[i].visible = true;
                j++;
                this.obj[i].scale.set(1, 1, 1);
                this.obj[i].vy *= CSPD;
                this.obj[i].vz *= CSPD;
                this.obj[i].vx *= CSPD;
                this.obj[i].rot *= CSPD;
            }
        }
        for (let i = 0, j = 0; i < this.objLong.length && j < 6; i++) {
            if (this.objLong[i].visible == false) {
                this.objLong[i].vy = (0.8 + Math.random() * 1.5) * 1.2;
                this.objLong[i].vz = (-1 - Math.random() * 3) * .2;
                this.objLong[i].rot = Math.random() * .1;
                if (j % 2 == 0) {
                    this.objLong[i].position.set(60 - rands(10), -200, 100);
                    this.objLong[i].vx = -(0.2 + Math.random() * .1);
                    this.objLong[i].rotation.set(-.51, 0, 0.20);
                } else {
                    this.objLong[i].position.set(-60 + rands(10), -200, 100);
                    this.objLong[i].vx = (0.2 + Math.random() * .1);
                    this.objLong[i].rotation.set(-.51, 0, -.20);
                }
                this.objLong[i].visible = true;
                this.objLong[i].vy *= CSPD;
                this.objLong[i].vz *= CSPD;
                this.objLong[i].vx *= CSPD;
                this.objLong[i].rot *= CSPD;
                this.objLong[i].scale.set(1, 1, 1);
                j++;
            }
        }
    }
    resetAll(visible) {
        this.obj.forEach(element => { element.visible = false; });
        this.objLong.forEach(element => { element.visible = false; });
        this.group.visible = visible;
    }
    setFilAination(x, y, z) {
        for (let i = 0; i < this.tobj.length; i++) {
            this.tobj[i].position.set(x, y, z);
            this.tobj[i].vx = -0.1 + Math.random() * .22;
            this.tobj[i].vy = .4 + Math.random() * .66;
            this.tobj[i].vz = -0.11 + Math.random() * .22;
            this.tobj[i].rot = 0;
            this.tobj[i].scale.set(1, 1, 1);
            this.tobj[i].visible = true;
        }
        this.group2.visible = true;
        this.group2.tcount = 0;
        this.group2.tvy = 1.01;
    }
    tUpdate() {
        for (let i = 0; i < this.tobj.length; i++) {
            if (this.tobj[i].vy > -.91) {
                this.tobj[i].position.x += this.tobj[i].vx;
                this.tobj[i].position.y += this.tobj[i].vy;
                this.tobj[i].position.z += this.tobj[i].vz;
                this.tobj[i].vy -= .02;
                if (this.tobj[i].scale.x > .06) {
                    this.tobj[i].scale.set(this.tobj[i].scale.x - .02, this.tobj[i].scale.x - .02, this.tobj[i].scale.x - .02);
                }
            } else {
                this.group2.visible = false;
                mTube[mPush.tubeNo].group.position.y = mTube[mPush.tubeNo].ay;
            }
        }
    }

}
