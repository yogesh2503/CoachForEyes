class Level6 {
    constructor() {
        this.vx = 0;
        this.vy = 1;
        this.pos = 0;
        this.move = false;
        this.vx = 1;
        this.lineno = 0;
        this.position = 6;
        this.digonal2 = ["0-1", "0-4", "8-12", "12-13", "14-15", "11-15", "3-7", "2-3"];
        this.digonal = ["1-2", "2-6", "6-7", "7-11", "10-11", "10-14", "13-14", "9-13",
            "8-9", "4-8", "4-5", "5-6", "6-10", "9-10", "5-9", "1-5"
        ];
        this.val = "rightup";
        this.isRemove = false;
        this.reset();
        this.isWin = false;
        this.winCounter = 0;
        this.penAnim = 1000;
        this.animx=.01;
        this.animvx=.02;
        this.isVerticle = false;
        this.moveAnim = 0;
    }
    update() {
        if (this.move) {
            if (this.vx > 0) {
                mFbx_Boy.position.x += this.vx;
                if (mFbx_Boy.position.x > pos4[this.position][0]) {
                    mFbx_Boy.position.x = pos4[this.position][0];
                    this.reset();
                }
            }
            if (this.vy > 0) {
                mFbx_Boy.position.y += this.vy;
                if (mFbx_Boy.position.y > pos4[this.position][1]) {

                    mFbx_Boy.position.y = pos4[this.position][1];
                    this.reset();
                }
            }
            if (this.vx < 0) {
                mFbx_Boy.position.x += this.vx;
                if (mFbx_Boy.position.x < pos4[this.position][0]) {

                    mFbx_Boy.position.x = pos4[this.position][0];
                    this.reset();
                }
            }
            if (this.vy < 0) {
                mFbx_Boy.position.y += this.vy;
                if (mFbx_Boy.position.y < pos4[this.position][1]) {
                    mFbx_Boy.position.y = pos4[this.position][1];
                    this.reset();
                }
            }
            if (this.move) {
                if (this.isRemove) {
                    this.setRemove();
                } else {
                    var no = this.getline();
                    if (no >= 0) {
                        drowline[no].position.set(mFbx_Boy.position.x - 15, mFbx_Boy.position.y - 26.5, -197.0);
                        drowline[no].po = this.val;
                        drowline[no].visible = true;
                    }
                }
            }
        }
        if(this.moveAnim > 0){
          if(this.isVerticle)
            pen3D.rotation.set(-Math.PI * this.animx, 0, 0);
          else
            pen3D.rotation.set(0, -Math.PI * this.animx, 0);
          if(this.animx > .05){
            this.animvx = -Math.abs(this.animvx*.7);
          }
          if(this.animx < -.05){
            this.animvx = Math.abs(this.animvx*.7);
          }
          this.animx +=this.animvx;
          this.moveAnim--;
          if(this.moveAnim <= 0)
            pen3D.rotation.set(0, 0, 0);
        }
        if (this.isWin) {
            this.winCounter++;
            if (this.winCounter > 99) {
                this.SetLevel();
            }
        }
    }
    setRemove() {
        for (let i = 0; i < drowline.length; i++) {
            if (drowline[i].po == this.val) {
                if (circir(mFbx_Boy.position.x - 15, mFbx_Boy.position.y - 26.5, 1, drowline[i].position.x, drowline[i].position.y, .3)) {
                    drowline[i].visible = false;
                    drowline[i].po = "0";
                }
            }
        }
    }
    allRemove() {
        for (let i = 0; i < drowline.length; i++) {
            if (drowline[i].po == this.val) {
                drowline[i].visible = false;
                drowline[i].po = "0";
            }
        }
    }
    checkRemove() {
        for (let i = 0; i < drowline.length; i++) {
            if (drowline[i].po == this.val) {
                return true;
            }
        }
        return false;
    }
    getline() {

        for (let i = 0; i < drowline.length; i++) {
            if (drowline[i].visible == false) {
                return i;
            }
        }
        return 0;
    }
    reset() {
      this.animvx = .02;
      this.moveAnim = 20;
        isSwipshow = true;
        this.vx = 0;
        this.vy = 0;
        this.move = false;
        this.penAnim = -9;
        if (this.isRemove)
            this.allRemove();
        this.isWin = true;
        for (let j = 0; j < this.digonal.length && this.isWin; j++) {
            var isthere = false;
            for (let i = 0; i < drowline.length && isthere == false; i++) {
                if (drowline[i].po == this.digonal[j] && drowline[i].po.length > 1) {
                    isthere = true;
                }
            }
            if (isthere == false) {
                this.isWin = false;
            }
        }
        for (let j = 0; j < this.digonal2.length && this.isWin; j++) {
            var isthere = false;
            for (let i = 0; i < drowline.length && isthere == false; i++) {
                if (drowline[i].po == this.digonal2[j] && drowline[i].po.length > 1) {
                    isthere = true;
                    this.isWin = false;
                }
            }
        }
    }
    set(val) {
        if (this.isWin)
            return;
        this.val = val;
        switch (val) {
            case "left":
                if (this.position > 3) {
                    this.move = true;
                    this.vx = -1;
                    this.val = (this.position - 4) + "-" + this.position;
                    this.position -= 4;
                    this.isRemove = this.checkRemove();
                    this.isVerticle = false;
                }
                break;
            case "right":
                if (this.position < 12) {
                    this.move = true;
                    this.vx = 1;
                    this.val = (this.position) + "-" + (this.position + 4);
                    this.position += 4;
                    this.isRemove = this.checkRemove();
                    this.isVerticle = false;
                }
                break;
            case "up":
                if (this.position != 3 && this.position != 7 && this.position != 11 && this.position != 15) {
                    this.move = true;
                    this.vy = 1;
                    this.val = (this.position) + "-" + (this.position + 1);
                    this.position += 1;
                    this.isRemove = this.checkRemove();
                    this.isVerticle = true;
                }
                break;
            case "down":
                if (this.position != 0 && this.position != 4 && this.position != 8 && this.position != 12) {
                    this.move = true;
                    this.vy = -1;
                    this.val = (this.position - 1) + "-" + (this.position);
                    this.position -= 1;
                    this.isRemove = this.checkRemove();
                    this.isVerticle = true;
                }
                break;
            case "leftdown":
                if (this.position != 12 && this.position != 4 && this.position != 8 && this.position > 3) {

                    this.move = true;
                    this.vy = -1;
                    this.vx = -1;
                    this.val = (this.position - 5) + "-" + (this.position);
                    this.position -= 5;
                    this.isRemove = this.checkRemove();
                }
                break;
            case "rightdown":
                if (this.position != 0 && this.position != 4 && this.position != 8 && this.position < 12) {
                    this.move = true;
                    this.vy = -1;
                    this.vx = 1;
                    this.val = (this.position) + "-" + (this.position + 3);
                    this.position += 3;
                    this.isRemove = this.checkRemove();
                }
                break;
            case "leftup":
                if (this.position != 3 && this.position != 7 && this.position != 11 && this.position > 3) {
                    this.move = true;
                    this.vy = 1;
                    this.vx = -1;
                    this.val = (this.position - 3) + "-" + (this.position);
                    this.position -= 3;
                    this.isRemove = this.checkRemove();
                }
                break;
            case "rightup":
                if (this.position != 15 && this.position != 7 && this.position != 11 && this.position < 12) {
                    this.move = true;
                    this.vy = 1;
                    this.vx = 1;
                    this.val = (this.position) + "-" + (this.position + 5);
                    this.position += 5;
                    this.isRemove = this.checkRemove();
                }
                break;
        }
    }

    SetLevel() {
        for (let i = 0; i < drowline.length; i++) {
            drowline[i].visible = false;
            drowline[i].po = "0";
        }
        for (var i = 0; i < 16; i++) {
            dotArr[i].position.set(-18.0 + (i % 4) * 12, -13.5 + Math.floor(i / 4) * 12 - 15, -197.2);
            dotArr[i].visible = true;
        }
        mTex_bg.visible = true
        mTex_lvl2.visible = false;
        mFbx_Boy.position.set(pos4[5][0], pos4[5][1], 3);
        DrawLbl(mTex_fonts[0], "Level 7", 0, -280, fcolor, 40);
        DrawLbl(mTex_fonts[1], "MAKE A COPY", 0, -100, fcolor, 25);
        DrawLbl(mTex_fonts[2], "(Swipe to paint)", 0, -70, fcolor, 22);
        isSwipshow = false;
    }
}

var camera, scene, renderer, Counter = 0,
    isResize = 0,
    objCount = 0,
    mTex_refress,
    mTex_lvl2, movey = 0,
    mFbx_Boy, mTex_Boy, tex_dot, dotArr = Array(4);
var drowline = [];
var mTex_hand;
var mLevel6 = new Level6();
var pen3D, gameUI;
var mTex_fonts = Array(3);
var mTex_Swipe, mTex_Play;
var anim = Array(50);
var sanim = 3;
var CANVAS_WIDTH = 480,
    CANVAS_HEIGHT = 854;
var isSwipshow = false;
var Confetti = 1;
const fcolor = "#333";
// const fcolor = "#000";
function initstart() {
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 300);
    camera.position.set(0, -57, -78);
    camera.rotation.set(0.5, 0, 0);
    scene = new THREE.Scene();
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    document.body.appendChild(renderer.domElement);
    gameUI = new ThreeUI(renderer.domElement, 720);
    renderer.setClearColor(0xf0e6c1, 1);
    var ambientLight = new THREE.AmbientLight(0xffffff, .81);
    scene.add(ambientLight);
    light = new THREE.DirectionalLight(0xffffff);
    light.position.set(0, -80, 200);
    // light.castShadow = true;
    // light.shadow.camera.top = 100;
    // light.shadow.camera.bottom = -100;
    // light.shadow.camera.left = -120;
    // light.shadow.camera.right = 120;
    scene.add(light);
    CANVAS_HEIGHT = window.innerHeight;
    CANVAS_WIDTH = window.innerWidth;
    var geometry = new THREE.SphereGeometry(1, 8, 8);
    var material = new THREE.MeshBasicMaterial({ color: 0xc2c2c2 });
    var sphere1 = new THREE.Mesh(geometry, material);
    var geometry = new THREE.BoxGeometry(1, 1, 1);
    var material = new THREE.MeshStandardMaterial({ color: 0xeeeadf, metalness: 0, roughness: 1, envMapIntensity: 1.0 });
    meshLoading = new THREE.Mesh(geometry, material);
    meshLoading.position.set(0, -10, -200);
    meshLoading.scale.set(50, 50, 5);
    scene.add(meshLoading);
    var manager = new THREE.LoadingManager(loadModel);
    manager.onProgress = function(item, loaded, total) {};
    function onProgress(xhr) {
        if (xhr.lengthComputable) {
            var percentComplete = (xhr.loaded / xhr.total) * 8 * objCount;
            objCount++;
        }
    }

    function onError() {}
    var textureLoader = new THREE.TextureLoader(manager);
    for (var i = 0; i < 16; i++) {
        dotArr[i] = sphere1.clone();
        dotArr[i].position.set(-18.5 + (i % 4) * 12, -13.5 + Math.floor(i / 4) * 12 - 15, -197.2);
        dotArr[i].scale.set(2, 2, .1);
        scene.add(dotArr[i]);
    }
    for (var i = 0; i < 16; i++) {
        dotArr[i].position.set(-18.0 + (i % 4) * 12, -13.5 + Math.floor(i / 4) * 12 - 15, -197.2);
    }
    for (var i = 0; i < 50; i++) {
        var material = new THREE.MeshBasicMaterial({ color: createColor() });
        anim[i] = new THREE.Mesh(new THREE.PlaneBufferGeometry(1, 1, 1, 1), material);
        anim[i].position.set(0, -20, -196.2);
        anim[i].scale.set(3, 3, 3);
        anim[i].vx = (Math.random() * 2) - 1;
        anim[i].vy = (Math.random() * 2) - 1;
        anim[i].visible = false;
        scene.add(anim[i]);
    }
    mFbx_Boy = new THREE.Group();
    pen3D = new THREE.Group();
    var geometry = new THREE.SphereGeometry(1, 4, 4);
    var material = new THREE.MeshBasicMaterial({ color: 0xd80020 });
    var sphere = new THREE.Mesh(geometry, material);
    for (var i = 0; i < 400; i++) {
        drowline[i] = sphere.clone();
        drowline[i].scale.set(1.6, 1.6, .1);
        drowline[i].po = "0";
        drowline[i].visible = false;
        scene.add(drowline[i]);
    }
    var geometry = new THREE.CylinderGeometry(1.4, 1.2, 12, 4);
    var material = new THREE.MeshStandardMaterial({ color: 0xff9c00, metalness: 0, roughness: 1, envMapIntensity: 1.0 });
    cylinder = new THREE.Mesh(geometry, material);
    cylinder.rotation.set(Math.PI * .5, Math.PI * .25, 0);
    scene.add(cylinder);

    var geometry = new THREE.CylinderGeometry(1.6, 1.5, 2, 4);
    var material = new THREE.MeshStandardMaterial({ color: 0xff0060, metalness: 0, roughness: 1, envMapIntensity: 1.0 });
    cylinder2 = new THREE.Mesh(geometry, material);
    cylinder2.rotation.set(Math.PI * .5, Math.PI * .25, 0);
    scene.add(cylinder2);

    var material = new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: 0, roughness: 1, envMapIntensity: 1.0 });
    var geometry = new THREE.CylinderGeometry(0.8, 0.99, 3, 4);
    cylinder3 = new THREE.Mesh(geometry, material);
    cylinder3.rotation.set(Math.PI * .5, Math.PI * .25, 0);
    scene.add(cylinder3);
    cylinder2.position.set(-15.0, -26.5, -185);
    cylinder.position.set(-15.0, -26.5, -192);
    cylinder3.position.set(-15.0, -26.5, -199);


    cylinder2.position.set(0, 0, 14);
    cylinder.position.set(0, 0, 7);
    cylinder3.position.set(0, 0, 0);


    pen3D.position.set(-15.0, -26.5, -200);
    pen3D.add(cylinder);
    pen3D.add(cylinder2);
    pen3D.add(cylinder3);
    mFbx_Boy.add(pen3D);
    // mFbx_Boy.rotation.set(Math.PI * .5, Math.PI * .25, 0);
    scene.add(mFbx_Boy);
    mFbx_Boy.position.set(pos4[6][0], pos4[6][1], 3);
    AssetLoader.add.image64('level',level_64);
    AssetLoader.add.image64('level6',level6_64);
    AssetLoader.add.image64('hand',hand_64);
    AssetLoader.add.image64('refress',refress_64);
    AssetLoader.add.image64('swipe',swipe_64);
    AssetLoader.add.image64('play',play_64);
    var img = new Image();
    AssetLoader.progressListener = function(progress) {};
    AssetLoader.load(function() {
        mTex_bg = loadUI('level', 0, -190, 0);
        mTex_lvl2 = loadUI('level6', 0, -190, 0);
        mTex_hand = loadUI('hand', 0, 100, 0);
        mTex_refress = loadUI('refress', 150, -100, 1);
        mTex_Swipe = loadUI('swipe', 0, -20, 0);
        mTex_Swipe.vx = .1;
        mTex_Swipe.s = 1;
        mTex_Play = loadUI('play', 0, 30, 2);
        mTex_Play.anchor.y = ThreeUI.anchors.bottom;
        mTex_Play.vx = .1;
        mTex_Play.s = 1;
        mTex_Play.visible = true;
        mTex_bg.visible = false;
        mTex_lvl2.visible = true;
        mTex_hand.visible = true;
        mTex_refress.visible = true;
        for (var i = 0; i < mTex_fonts.length; i++) {
            mTex_fonts[i] = createTexts('100', 8, fcolor, ThreeUI.anchors.center, ThreeUI.anchors.center, 'center', 'HanaleiFill');
            mTex_fonts[i].visible = true;
        }
        DrawLbl(mTex_fonts[0], "Level 6", 0, -280, fcolor, 40);
        DrawLbl(mTex_fonts[1], "MAKE A COPY", 0, -100, fcolor, 25);
        DrawLbl(mTex_fonts[2], "(Swipe to paint)", 0, -70, fcolor, 22);
        Counter = 0;
    });
    // if (isMobile.any())
    {
        document.addEventListener('touchstart', e => { touchEvent(e, 0); });
        document.addEventListener('touchend', e => { touchEvent(e, 2); });
        document.addEventListener('touchmove', e => { touchEvent(e, 1); });
    }
    // else
     {
        document.addEventListener('mousedown', e => { touchEvent(e, 0); });
        document.addEventListener('mousemove', e => { touchEvent(e, 1); });
        document.addEventListener('mouseup', e => { touchEvent(e, 2); });
    }
    window.addEventListener('resize', onWindowResize, false);
    Draw();
}

function loadModel() {}

var pos4 = [
    [-3, -2],
    [-3, 10],
    [-3, 22],
    [-3, 34],
    [9, -2],
    [9, 10],
    [9, 22],
    [9, 34],
    [21, -2],
    [21, 10],
    [21, 22],
    [21, 34],
    [33, -2],
    [33, 10],
    [33, 22],
    [33, 34],

];
var mouse = new THREE.Vector2();
var coords = null;
var vec2 = new THREE.Vector2();
var isClick = false;

function touchEvent(e, type) {

  CANVAS_HEIGHT = window.innerHeight;
  CANVAS_WIDTH = window.innerWidth;


    var scale = gameUI.height / gameUI.gameCanvas.getBoundingClientRect().height; {
        if (e.touches != null) {
            if (e.touches.length > 0) {
                mouse.x = (e.touches[0].pageX / window.innerWidth) * 2 - 1;
                mouse.y = -(e.touches[0].pageY / window.innerHeight) * 2 + 1;
                coords = { x: e.touches[0].pageX, y: e.touches[0].pageY };
                coords.x = coords.x - (window.innerWidth - gameUI.gameCanvas.getBoundingClientRect().width) / 2;
                coords.x *= scale;
                coords.y *= scale;
                mouse = { x: e.touches[0].pageX / CANVAS_HEIGHT, y: -e.touches[0].pageY / CANVAS_HEIGHT };
            }

        } else {
            mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
            coords = { x: e.clientX, y: e.clientY };
            coords.x = coords.x - (window.innerWidth - gameUI.gameCanvas.getBoundingClientRect().width) / 2;
            coords.x *= scale;
            coords.y *= scale;
            var elem = renderer.domElement,
                boundingRect = elem.getBoundingClientRect(),
                x = (event.clientX - boundingRect.left) * (elem.width / boundingRect.width),
                y = (event.clientY - boundingRect.top) * (elem.height / boundingRect.height);
            mouse.x = (x / CANVAS_HEIGHT) * 2 - 1;
            mouse.y = -(y / CANVAS_HEIGHT) * 2 + 1;

            mouse = { x: e.clientX / CANVAS_HEIGHT, y: -e.clientY / CANVAS_HEIGHT };
        }
    }

    var str = "["+CANVAS_WIDTH+", "+CANVAS_HEIGHT+"]["+mouse.x.toFixed(2)+", "+mouse.y.toFixed(2)+"]";
    console.log("~~~~~~~~~~");
    // DrawLbl(mTex_fonts[3], str, 0, -340, fcolor, 16);
    if (type == 0) {
        vec2.x = mouse.x;
        vec2.y = mouse.y;
        isClick = true;
    }
    if (type == 2) {

        isClick = false;
    }
    str = "t = "+type+", move = "+mLevel6.move+", win = "+mLevel6.isWin+", isClick = "+isClick;
    // DrawLbl(mTex_fonts[5], str, 0, -160, fcolor, 16);
    if (type == 1 && mLevel6.move == false && mLevel6.isWin == false && isClick) {
        var diff = new THREE.Vector2((vec2.x - mouse.x), (vec2.y - mouse.y));
        var mxdiff = .08;
        // DrawLbl(mTex_fonts[4], diff.x.toFixed(3)+", "+diff.y.toFixed(3), 0, -260, fcolor, 16);
        // if (window.innerWidth < window.innerHeight) {
            if (diff.x > mxdiff) {
                mLevel6.set("left");
            } else if (diff.x < -mxdiff) {
                mLevel6.set("right");
            } else if (diff.y > mxdiff) {
                mLevel6.set("down");
            } else if (diff.y < -mxdiff) {
                mLevel6.set("up");
            }
        // } else {
        //     if (diff.x > mxdiff) {
        //         mLevel6.set("up");
        //     } else if (diff.x < -mxdiff) {
        //         mLevel6.set("down");
        //     } else if (diff.y > mxdiff) {
        //         mLevel6.set("left");
        //     } else if (diff.y < -mxdiff) {
        //         mLevel6.set("right");
        //     }
        // }

    }
    if (mLevel6.isWin == true && type == 2 && mLevel6.winCounter >= 100) {
        Handle_Menu(2);
    }
}

function Draw() {
    requestAnimationFrame(Draw);
    renderer.render(scene, camera);
    if (mFbx_Boy == null || mTex_hand == null) {
        return;
    }
    if (mLevel6.winCounter < 100) {
        mLevel6.update();
    }
    // if (window.innerWidth < window.innerHeight) {
        portrait();
    // } else {
    //     landscap();
    // }
    for (var i = 0; i < 50 && sanim > .2 && mLevel6.isWin; i++) {
        anim[i].position.x += anim[i].vx;
        anim[i].position.y += anim[i].vy;
        anim[i].visible = true;
        anim[i].rotation.z += .1;
        anim[i].scale.set(sanim, sanim, sanim);
        if (sanim > .2) {
            sanim -= .001;
        }
    }
    gameUI.render(renderer);
    Counter++;
    if (isResize > 0) {
        isResize--;
        var frustumSize = 150;
        var aspect = window.innerWidth / window.innerHeight;
        camera.left = frustumSize * aspect / -2;
        camera.right = frustumSize * aspect / 2;
        camera.top = frustumSize / 2;
        camera.bottom = frustumSize / -2;
        camera.updateProjectionMatrix();
        gameUI.resize();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }
}

function portrait() {
    if (mLevel6.winCounter < 100) {
        camera.rotation.set(0.5, 0, 0);
        camera.position.set(0, -Confetti - 57, -78);
        if (mLevel6.isWin) {

            if (Confetti < 40) {
                Confetti *= 1.1;
                mTex_refress.visible = false;
                mTex_lvl2.visible = false;
                if (Counter % 4 == 0) {
                    for (var i = 0; i < mTex_fonts.length; i++) {
                        mTex_fonts[i].visible = false;
                    }
                    DrawLbl(mTex_fonts[(Counter % mTex_fonts.length)], "LEVEL COMPLETE", 0, 105, fcolor, Math.floor(Confetti * .8 + 8));
                }
            }
        } else {
            DrawLbl(mTex_fonts[0], "Level 6", 0, -280, fcolor, 40);
            DrawLbl(mTex_fonts[1], "MAKE A COPY", 0, -100, fcolor, 25);
            DrawLbl(mTex_fonts[2], "(Swipe to paint)", 0, -70, fcolor, 22);
            for (var i = 0; i < mTex_fonts.length; i++) {
                mTex_fonts[i].rotation = 0;
            }
            mTex_refress.x = 150;
            mTex_refress.y = -100;
            mTex_refress.rotation = 0;
            mTex_refress.width = 54;
            mTex_refress.height = 54;
        }
    } else {
        camera.position.set(0, -57, -78);
        camera.rotation.set(0.5, 0, 0);
        DrawLbl(mTex_fonts[0], "Level 6", 0, -280, fcolor, 40);
        DrawLbl(mTex_fonts[1], "MAKE A COPY", 0, -100, fcolor, 25);
        DrawLbl(mTex_fonts[2], "(Swipe to paint)", 0, -70, fcolor, 22);
        for (var i = 0; i < mTex_fonts.length; i++) {
            mTex_fonts[i].rotation = 0;
        }
    }
    if (isSwipshow == false) {
        mTex_hand.rotation = 0;
        DrawTexture(mTex_hand, 10, 80 + movey, movey * .01 + 1);
        movey += .6;
        movey %= 50;
        mTex_Swipe.visible = true;
        mTex_Swipe.width = 128 * mTex_Swipe.s;
        mTex_Swipe.height = 32 * mTex_Swipe.s;
        mTex_Swipe.s += mTex_Swipe.vx;
        mTex_Swipe.rotation = 0;
        mTex_Swipe.x = 0;
        mTex_Swipe.y = -20;
        if (mTex_Swipe.width > 140) {
            mTex_Swipe.vx = -.005;
        }
        if (mTex_Swipe.width < 110) {
            mTex_Swipe.vx = .005;
        }

    } else {
        mTex_hand.visible = false;

        mTex_Swipe.visible = false;
    }
    mTex_Play.anchor.y = ThreeUI.anchors.bottom;
    mTex_Play.anchor.x = ThreeUI.anchors.center;
    mTex_Play.y = 30;
    mTex_Play.x = 0;
    mTex_Play.visible = true;
    mTex_Play.width = 82 * mTex_Play.s;
    mTex_Play.height = 32 * mTex_Play.s;
    mTex_Play.s += mTex_Play.vx;
    mTex_Play.rotation = 0;

    mTex_lvl2.x = 0;
    mTex_lvl2.y = -190;
    mTex_lvl2.width = 120;
    mTex_lvl2.height = 120;
    mTex_bg.rotation = 270;
    mTex_bg.x = 0;
    mTex_bg.y = -190;
    mTex_bg.width = 120;
    mTex_bg.height = 120;

    if (mTex_Play.width > 100) {
        mTex_Play.vx = -.005;
    }
    if (mTex_Play.width < 80) {
        mTex_Play.vx = .005;
    }

}

function landscap() {


    for (var i = 0; i < mTex_fonts.length; i++) {
        mTex_fonts[i].rotation = 270;
    }
    if (mLevel6.winCounter < 100) {
        camera.rotation.set(.29, 0, -1.58);
        camera.position.set(0, -Confetti - 17, -123);

        if (mLevel6.isWin) {
            if (Confetti < 40) {
                camera.position.set(0, -Confetti - 17, 0 - 123);
                Confetti *= 1.1;
                mTex_refress.visible = false;
                mTex_lvl2.visible = false;
                if (Counter % 4 == 0) {
                    for (var i = 0; i < mTex_fonts.length; i++) {
                        mTex_fonts[i].visible = false;
                    }
                    DrawLbl(mTex_fonts[(Counter % mTex_fonts.length)], "LEVEL COMPLETE", 120, 0, '#1a1a1a', Math.floor(Confetti * 1.5 + 8));
                }
            }
        } else {
            DrawLbl(mTex_fonts[0], "Level 6", -500, 0, fcolor, 70);
            DrawLbl(mTex_fonts[1], "MAKE A COPY", -230, 0, fcolor, 40);
            DrawLbl(mTex_fonts[2], "(Swipe to paint)", -180, 0, fcolor, 36);
        }

    } else {
        camera.rotation.set(.29, 0, -1.58);
        camera.position.set(0, -17, -123);
        DrawLbl(mTex_fonts[0], "Level 6", -500, 0, fcolor, 70);
        DrawLbl(mTex_fonts[1], "MAKE A COPY", -230, 0, fcolor, 40);
        DrawLbl(mTex_fonts[2], "(Swipe to paint)", -180, 0, fcolor, 36);
    }
    if (isSwipshow == false) {
        DrawTexture(mTex_hand, 120 + movey * 2, -40, movey * .02 + 2);
        movey += .4;
        movey %= 50;
        mTex_hand.rotation = 270;
        mTex_Swipe.visible = true;
        mTex_Swipe.width = 200 * mTex_Swipe.s;
        mTex_Swipe.height = 50 * mTex_Swipe.s;
        mTex_Swipe.s += mTex_Swipe.vx;
        if (mTex_Swipe.width > 240) {
            mTex_Swipe.vx = -.005;
        }
        if (mTex_Swipe.width < 160) {
            mTex_Swipe.vx = .005;
        }
        mTex_Swipe.rotation = 270;
        mTex_Swipe.x = -70;
        mTex_Swipe.y = 0;

    } else {
        mTex_hand.visible = false;
        mTex_Swipe.visible = false;
    }





    mTex_Play.anchor.x = ThreeUI.anchors.right;
    mTex_Play.anchor.y = ThreeUI.anchors.center;
    mTex_Play.x = 70;
    mTex_Play.rotation = 270;
    mTex_Play.width = 164 * mTex_Play.s;
    mTex_Play.height = 64 * mTex_Play.s;
    mTex_Play.s += mTex_Play.vx;
    if (mTex_Play.width > 184) {
        mTex_Play.vx = -.003;
    }
    if (mTex_Play.width < 130) {
        mTex_Play.vx = .003;
    }
    mTex_refress.x = -240;
    mTex_refress.y = -260;
    mTex_refress.width = 84;
    mTex_refress.height = 84;
    mTex_lvl2.x = -380;
    mTex_lvl2.y = 0;
    mTex_lvl2.width = 180;
    mTex_lvl2.height = 180;
    mTex_bg.rotation = 270;
    mTex_bg.x = -380;
    mTex_bg.y = 0;
    mTex_bg.width = 180;
    mTex_bg.height = 180;
}

function Handle_Menu(clickval) {
    if (clickval == 2) {
      // if(isMobile.Android()){
      //   dapi.openStoreUrl('https://play.google.com/store/apps/details?id=com.AppSwim.LinePaint');
      // }else{
      //   dapi.openStoreUrl('https://apps.apple.com/us/app/line-paint/id1488438435');
      // }
      if(isMobile.Android()){
        mraid.open('https://play.google.com/store/apps/details?id=com.AppSwim.LinePaint');
      }else{
        mraid.open('https://apps.apple.com/us/app/line-paint/id1488438435');
      }
    } else {
        for (let i = 0; i < drowline.length; i++) {
            drowline[i].visible = false;
            drowline[i].po = "0";
        }
        mFbx_Boy.position.set(pos4[6][0], pos4[6][1], 3);
        mLevel6.position = 6;
    }
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    this.gameUI.resize();
    isResize = 5;
}
var GameScreen = 0;
const GAMELOGO = 0,
    GAMEMENU = 1,
    GAMEPLAY = 2,
    GAMEOVER = 4,
    GAMESTART = 5,
    GAMELEADER = 12;
var frequency = .5;

function createColor() {
    r = Math.floor(Math.sin(frequency + 0) * 127 + 128);
    g = Math.floor(Math.sin(frequency + 2) * 127 + 128);
    b = Math.floor(Math.sin(frequency + 4) * 127 + 128);
    frequency += .5;
    return new THREE.Color('rgb(' + r + ',' + g + ',' + b + ')');
}

function loadUI(assetpath, x, y, clickval) {
    var sprite = gameUI.createSprite(assetpath);
    sprite.alpha = 1;
    sprite.x = x;
    sprite.y = y;
    sprite.width = sprite.width * 0.71;
    sprite.height = sprite.height * 0.71;
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

function DrawTexture(tex, x, y, sx) {
    tex.x = x;
    tex.y = y;
    tex.width = 32 * sx;
    tex.height = 32 * sx;
    tex.anchor.x = ThreeUI.anchors.center;
    tex.anchor.y = ThreeUI.anchors.center;
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

function circir(x1, y1, r1, x2, y2, r2) {
    if (r1 + r2 > Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2))) {
        return true;
    }
    return false;
}

var isMobile = {
    Android: function() { return navigator.userAgent.match(/Android/i); },
    BlackBerry: function() { return navigator.userAgent.match(/BlackBerry/i); },
    iOS: function() { return navigator.userAgent.match(/iPhone|iPad|iPod/i); },
    Opera: function() { return navigator.userAgent.match(/Opera Mini/i); },
    Windows: function() { return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i); },
    any: function() { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); }
};
