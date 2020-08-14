var counter = 0, meshLoading, isResize = 0, mTex_logo = null, objCount = 0, mHScore = 0, mScore = 0, setVal = true, isResize = 0, ratio = 1, mSel = 0;
var mTex_Cookie = [], mTex_fonts = Array(20);
var mTex_Title,
  mTex_button = Array(3),
  mTex_top,
  mTex_btn = Array(2),
  mTex_coinbar,
  mTex_icn = Array(9);
var mTex_popup,
  mTex_win,
  mTex_ply = Array(1);
var scene, camera, clock, renderer, water, gameUI, mPlyer;
var mTxt_Load;
var div_Login, div_Regis;
var mRectCLR = Array();
var mTex_fontsclr = Array();
var mTex_Right, mTex_gold_stroke;
var mTex_Logo2, mTex_BTN0 = [], mTex_BTN1 = [];
var mTex_forColor, mTex_CardBack, mTex_Icon = [];

function init() {
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000);
  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, -23, 32);
  camera.rotation.set(0.6, 0, 0);
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  document.body.appendChild(renderer.domElement);
  var ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
  scene.add(ambientLight);
  directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
  directionalLight.position.set(3, -2, 2);
  scene.add(directionalLight);
  meshLoading = new THREE.Mesh(new THREE.BoxBufferGeometry(1, 1, 1), new THREE.MeshNormalMaterial());
  scene.add(meshLoading);
  loadobj();
  gameUI = new ThreeUI(renderer.domElement, 720);
  mTxt_Load = createTexts("0", 50, "#fff", ThreeUI.anchors.center, ThreeUI.anchors.center, "center", "Helvetica");
  DrawLbl(mTxt_Load, "1%", 0, 100);
  AssetLoader.add.webFont('CabinCondensed', 'js/font.css');
  AssetLoader.add.webFont('Cookie', 'js/font.css');
  AssetLoader.add.image("assets/logo.png");
  AssetLoader.add.image("assets/button.png");
  AssetLoader.add.image("assets/top.jpg");
  AssetLoader.add.image("assets/button2.png");
  AssetLoader.add.image("assets/coinbar.png");
  AssetLoader.add.image("assets/popup.png");
  AssetLoader.add.image("assets/win.png");
  AssetLoader.add.image("assets/right.png");
  AssetLoader.add.image("assets/icons.png");
  AssetLoader.add.image("assets/gold_stroke.png");
  AssetLoader.add.image("assets/cardBack.jpg");
  AssetLoader.add.image("assets/button0.png");
  AssetLoader.add.image("assets/button1.png");
  AssetLoader.add.image("assets/logo2.png");
  for (let i = 0; i < mTex_icn.length; i++) {
    AssetLoader.add.image("assets/icn" + i + ".png");
  }
  for (let i = 0; i < mTex_ply.length; i++) {
    AssetLoader.add.image("assets/ply" + i + ".png");
  }
  AssetLoader.progressListener = function (progress) {
    DrawLbl(mTxt_Load, Math.floor(progress * 99) + "%", 0, 100);
  };
  AssetLoader.load(function () {
    mTxt_Load.visible = false; counter = 0;
    mTex_logo = loadUIRect("#ffffff");
    httlogo = loadUI("assets/logo.png", 0, 0, 0);
    httlogo.parent = mTex_logo;
    httlogo.visible = true;
    mTex_logo.visible = true;
    mTex_popup = loadUI("assets/popup.png", 0, 0, 0);
    mTex_top = loadUI("assets/top.jpg", 0, 0, 0);
    mTex_Title = loadUI("assets/logo.png", 0, 0, 0);
    mTex_coinbar = loadUI("assets/coinbar.png", 0, 0, 0);
    mTex_Logo2 = loadUI("assets/logo2.png", 0, 0, 0);
    for (let i = 0; i < mTex_icn.length; i++) {
      mTex_icn[i] = loadUI("assets/icn" + i + ".png", 0, 0, 0);
    }
    for (let i = 0; i < mTex_ply.length; i++) {
      mTex_ply[i] = loadUI("assets/ply" + i + ".png", 0, 0, 0);
    }
    for (let i = 0; i < mTex_btn.length; i++) {
      mTex_btn[i] = loadUI("assets/button2.png", 0, 0, 0);
    }
    for (let i = 0; i < mTex_button.length; i++) {
      mTex_button[i] = loadUI("assets/button.png", 0, 0, 0);
    }
    mTex_win = loadUI("assets/win.png", 0, 0, 0);
    for (let i = 0; i < 4; i++) {
      mTex_Icon.push(loadUI("assets/icons.png", 0, 0, 0));
    }
    for (let i = 0; i < 2; i++) {
      mTex_BTN0[i] = loadUI("assets/button0.png", 0, 0, 0);
    }
    for (let i = 0; i < 4; i++) {
      mTex_BTN1[i] = loadUI("assets/button1.png", 0, 0, 0);
    }
    mTex_gold_stroke = loadUI("assets/gold_stroke.png", 0, 0, 0);
    for (let i = 0; i < mTex_fonts.length; i++) {
      mTex_fonts[i] = createTexts("100", 20, "#fff", ThreeUI.anchors.center, ThreeUI.anchors.center, "center", "CabinCondensed");
    }
    for (let i = 0; i < 2; i++) {
      mTex_Cookie.push(createTexts("100", 20, "#fff", ThreeUI.anchors.center, ThreeUI.anchors.center, "center", "Cookie"));
    }
    mTex_forColor = loadUIRect();
    mTex_forColor.ColorSel = 0; mTex_forColor.alpha = 0.9;
    for (let i = 0; i < mColors.length; i++) {
      mRectCLR.push(loadUIBar(-150 + (i % 3) * 150, -150 + Math.floor(i / 3) * 150, 148, 148, mColors[i]));
      mRectCLR[i].visible = true; mRectCLR[i].parent = mTex_forColor;
    }
    for (let i = 0; i < 1; i++) {
      mTex_fontsclr.push(createTexts("Cards Back Color", 40, "#fff", ThreeUI.anchors.center, ThreeUI.anchors.center, "center", "CabinCondensed"));
      DrawLbl(mTex_fontsclr[i], "Cards Back Color", 0, -280);
      mTex_fontsclr[i].parent = mTex_forColor;
    }



    mTex_CardBack = loadUI("assets/cardBack.jpg", 0, 300, 0);
    mTex_Right = loadUI("assets/right.png", 0, 0, 0);
    DrawTransScal(mTex_Right, -150, -150, 64, 64, 1, 1);
    DrawTransScal(mTex_CardBack, 0, 300, 148, 148, 1, 1); mTex_CardBack.parent = mTex_forColor;
    mTex_Right.parent = mTex_forColor;
    mTex_forColor.visible = false;
    mTex_forColor.card = 0;
    mTex_forColor.table = 0;
    mTex_LandScape = loadUIRect();
    var lndScp = createTexts("100", 50, "#fff", ThreeUI.anchors.center, ThreeUI.anchors.center, "center", "HanaleiFill");
    lndScp.parent = mTex_LandScape;
    DrawLbl(lndScp, "Have to play in\n\nLandscape Mode", 0, -50, "#fafafa", 25);
    mTex_LandScape.visible = window.innerWidth < window.innerHeight;
    div_Login = addInputBox(loginids);
    div_Regis = addInputBox(regids);
  });
  document.addEventListener("keydown", dealWithKeyboard);
  if (isMobile.any()) {
    document.addEventListener("touchstart", (e) => { touchEvent(e, 0, 1); }); document.addEventListener("touchmove", (e) => { touchEvent(e, 1, 1); }); document.addEventListener("touchend", (e) => { touchEvent(e, 2, 1); });
  } else {
    document.addEventListener("mousedown", (e) => { touchEvent(e, 0, 0); }); document.addEventListener("mousemove", (e) => { touchEvent(e, 1, 0); }); document.addEventListener("mouseup", (e) => { touchEvent(e, 2, 0); });
  }
  window.addEventListener("resize", onWindowResize, false);
  Draw();
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  this.gameUI.resize();
  mTex_LandScape.visible = window.innerWidth < window.innerHeight;
  isResize = 5;
}

var mouse = new THREE.Vector2();

var coords = null;
var vec2 = new THREE.Vector2();
const MULTI = 24.6;
var thita = 0;

function touchEvent(e, type) {
  CANVAS_HEIGHT = window.innerHeight;
  CANVAS_WIDTH = window.innerWidth;
  ratio = CANVAS_WIDTH / CANVAS_HEIGHT;
  var scale = gameUI.height / gameUI.gameCanvas.getBoundingClientRect().height;
  if (e.touches != null) {
    if (e.touches.length > 0) { mouse.x = (e.touches[0].pageX / window.innerWidth) * 2 - 1; mouse.y = -(e.touches[0].pageY / window.innerHeight) * 2 + 1; coords = { x: e.touches[0].pageX, y: e.touches[0].pageY }; coords.x = coords.x - (window.innerWidth - gameUI.gameCanvas.getBoundingClientRect().width) / 2; coords.x *= scale; coords.y *= scale; }
  } else {
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1; mouse.y = -(e.clientY / window.innerHeight) * 2 + 1; coords = { x: e.clientX, y: e.clientY }; coords.x = coords.x - (window.innerWidth - gameUI.gameCanvas.getBoundingClientRect().width) / 2; coords.x *= scale; coords.y *= scale; var elem = renderer.domElement, boundingRect = elem.getBoundingClientRect(), x = (event.clientX - boundingRect.left) * (elem.width / boundingRect.width), y = (event.clientY - boundingRect.top) * (elem.height / boundingRect.height); mouse.x = (x / CANVAS_WIDTH) * 2 - 1; mouse.y = -(y / CANVAS_HEIGHT) * 2 + 1;
  }
  switch (GameScreen) {
    case GAMELANDING: Handle_Landing(type); break;
    case GAMELOGIN: Handle_Login(type); break;
    case GAMEREG: Handle_Registration(type); break;
    case GAMEMENU: Handle_MenuGame(type); break;
    case GAMEPLAY: Handle_Play(type); break;
    case GAMEOVER: Handle_Over(type); break;
  }
}
var counter = 0;
var mv = 0,
  next = 0,
  roc = 0,
  rox = 0.01;

function setPalnet() {
  var j = next;
  var ix = 2, iy = 1, iz = 2, fz = 3;
  for (i = 0; i < m3d_ply.length; i++) {
    m3d_ply[j].visible = true; if (i < m3d_ply.length / 2) { m3d_ply[j].position.set(i * ix, iy, fz - iz * i); } else { m3d_ply[j].position.set((i - m3d_ply.length) * ix, iy, fz + (i - m3d_ply.length) * iz); } j++; j %= m3d_ply.length;
  }
  var name = ["Ram", "Shaym", "Rahim", "John", "Mickel", "Sachin", "Joshef", "Nick", "Nil", "Nesh", "Mesh", "Kesh", "Maan", "Saman", "Raman", "Rehan", "Merry", "Mony", "Rony", "Tony", "Dollor",
  ];
  DrawTextureA(mTex_btn, 0, 100, ThreeUI.anchors.center, ThreeUI.anchors.bottom
  );
  DrawLblA(mTex_fonts[4], "" + mTCoins, 15, 94, "#fafafa", 28, ThreeUI.anchors.center, ThreeUI.anchors.bottom, "center"
  );
  DrawTextureA(mTex_back, 120, 110, ThreeUI.anchors.left, ThreeUI.anchors.bottom
  );
  DrawLblA(mTex_fonts[0], "" + name[next], 2, 102, "#fafafa", 62, ThreeUI.anchors.center, ThreeUI.anchors.center, "center"
  );
  DrawLblA(mTex_fonts[1], "" + name[next], 0, 100, "#FF4500", 62, ThreeUI.anchors.center, ThreeUI.anchors.center, "center"
  );
  if (mPlyer.cost[next] > 0) {
    DrawLblA(mTex_fonts[2], "$" + mPlyer.cost[next], 2, 172, "#fafafa", 42, ThreeUI.anchors.center, ThreeUI.anchors.center, "center"); DrawLblA(mTex_fonts[3], "$" + mPlyer.cost[next], 0, 170, "#FF4500", 42, ThreeUI.anchors.center, ThreeUI.anchors.center, "center"); DrawTextureA(mTex_buy, 120, 110, ThreeUI.anchors.right, ThreeUI.anchors.bottom); mTex_play_2.visible = false;
  } else {
    mTex_fonts[2].visible = mTex_fonts[3].visible = false; DrawTextureA(mTex_play_2, 120, 110, ThreeUI.anchors.right, ThreeUI.anchors.bottom); mTex_buy.visible = false;
  }
}

function Draw() {
  counter++;
  requestAnimationFrame(Draw);
  renderer.render(scene, camera);
  gameUI.render(renderer);
  meshLoading.rotation.set(counter * 0.1, counter * 0.1, counter * 0.1);
  if (mTex_logo == null) {
    return;
  }

  switch (GameScreen) {
    case GAMELOGO:
      if (counter > 100) {
        setScreen(GAMELANDING);
      }
      break;
    case GAMELANDING: Draw_Landing(); break;
    case GAMELOGIN: Draw_Login(); break;
    case GAMEREG: Draw_Registration(); break;
    case GAMEMENU: Draw_Menu(); break;
    case GAMEPLAY: Draw_Gameplay(); break;
    case GAMEOVER: Draw_Over(); break;
  }
  if (isResize > 0) {
    camera.aspect = window.innerWidth / window.innerHeight; camera.updateProjectionMatrix(); renderer.setSize(window.innerWidth, window.innerHeight); this.gameUI.resize(); mTex_LandScape.visible = window.innerWidth < window.innerHeight; isResize--;
  }
}

function gamereset() { }

function setScreen(scr) {
  console.log("scr = " + scr);
  GameScreen = scr;
  mTex_Cookie.forEach((element) => { element.visible = false; });
  mTex_BTN1.forEach((element) => { element.visible = false; });
  mTex_BTN0.forEach((element) => { element.visible = false; });
  mTex_icn.forEach((element) => { element.visible = false; });
  mTex_Icon.forEach((element) => { element.visible = false; });
  mCube.forEach((element) => { element.group.visible = false; });
  mTex_fonts.forEach((element) => { element.visible = false; });
  mTex_button.forEach((element) => { element.visible = false; });
  mTex_btn.forEach((element) => { element.visible = false; });
  mTex_ply.forEach((element) => { element.visible = false; });
  mTex_Logo2.visible = mTex_top.visible = mTex_Title.visible = mTex_logo.visible = meshLoading.visible = false;
  mTex_gold_stroke.visible = mTex_win.visible = mTex_coinbar.visible = mTex_popup.visible = false;
  m3d_table.visible = false;
  div_Regis.style.display = div_Login.style.display = "none";
  camera.position.set(0, -23, 32);
  camera.rotation.set(0.6, 0, 0);

  switch (GameScreen) {
    case GAMELOGO: mTex_logo.visible = true;
      break;
    case GAMELOGIN:
      m2D_Background.visible = true;
      mTex_Title.visible = true;
      mTex_Title.y = -250;
      DrawLblA(mTex_fonts[1], "LOGIN", 0, 180, COLOR2, 46, ThreeUI.anchors.center, ThreeUI.anchors.center, "center");
      DrawLblA(mTex_fonts[0], "Forget Password?", 0, 260, COLOR1, 30, ThreeUI.anchors.center, ThreeUI.anchors.center, "center");
      DrawLblA(mTex_fonts[2], "Don't have account?", -50, 320, COLOR1, 30, ThreeUI.anchors.center, ThreeUI.anchors.center, "center");
      DrawLblA(mTex_fonts[3], "Signup", 135, 320, COLOR3, 30, ThreeUI.anchors.center, ThreeUI.anchors.center, "center"); div_Login.style.display = "block";
      break;
    case GAMEREG:
      DrawLblA(mTex_fonts[0], "SIGNUP", 0, -260, COLOR1, 56, ThreeUI.anchors.center, ThreeUI.anchors.center, "center");
      DrawLblA(mTex_fonts[1], "SIGNUP", 0, 220, COLOR2, 46, ThreeUI.anchors.center, ThreeUI.anchors.center, "center");
      DrawLblA(mTex_fonts[2], "Already Have an Account? ", -65, 320, COLOR1, 30, ThreeUI.anchors.center, ThreeUI.anchors.center, "center");
      DrawLblA(mTex_fonts[3], "Login", 150, 320, COLOR3, 30, ThreeUI.anchors.center, ThreeUI.anchors.center, "center"); div_Regis.style.display = "block";
      break;
    case GAMEMENU:
      m2D_Background.visible = true; mTex_Title.visible = true; mTex_Title.y = -150;
      DrawTransScal(mTex_top, 0, -310, 1024, 64, 1.6, 1);
      DrawTextureAX(mTex_ply[0], 50, 50, ThreeUI.anchors.left, ThreeUI.anchors.top);
      DrawTextureAX(mTex_coinbar, 250, 36, ThreeUI.anchors.left, ThreeUI.anchors.top);
      DrawTextureAX(mTex_icn[4], 50, 50, ThreeUI.anchors.right, ThreeUI.anchors.top);
      DrawTextureAX(mTex_icn[6], 150, 50, ThreeUI.anchors.right, ThreeUI.anchors.top);
      DrawTransScal(mTex_button[0], 0, 40, 256, 64, 1.4, 1);
      DrawTransScal(mTex_button[1], 0, 200, 256, 64, 1.4, 1);
      DrawLblA(mTex_fonts[1], "1445", 220, 48, COLOR1, 36, ThreeUI.anchors.left, ThreeUI.anchors.top, "center");
      DrawLblA(mTex_fonts[0], "Jhnson", 190, 90, COLOR2, 40, ThreeUI.anchors.left, ThreeUI.anchors.top, "center");
      DrawLblA(mTex_fonts[2], "Play Online", 0, 50, COLOR2, 40, ThreeUI.anchors.center, ThreeUI.anchors.center, "center");
      DrawLblA(mTex_fonts[3], "Play With Friends", 0, 210, COLOR2, 40, ThreeUI.anchors.center, ThreeUI.anchors.center, "center");
      break;
    case GAMELANDING:
      m2D_Background.visible = true;

      m2D_Background.traverse(function (child) {
        if (child.isMesh) {
          child.material.map = mTex_BG[1];
        }
      });
      camera.position.set(0, 0, 66);
      camera.rotation.set(0, 0, 0);
      m2D_Background.position.set(0, 0, 0);


      DrawTransScal(mTex_Logo2, -380, -200, 512, 256, 1, 1);

      DrawTransScal(mTex_BTN0[0], 220, 100, 166, 102, 1, 1);
      DrawTransScal(mTex_BTN0[1], 220, 260, 166, 102, 1, 1);

      DrawTransScal(mTex_BTN1[0], 20, 100, 128, 128, 1, 1);
      DrawTransScal(mTex_BTN1[1], 420, 100, 128, 128, 1, 1);
      DrawTransScal(mTex_BTN1[2], 20, 260, 128, 128, 1, 1);
      DrawTransScal(mTex_BTN1[3], 420, 260, 128, 128, 1, 1);
      for (var i = 0; i < 10; i++) {
        mCube[i].setForLanding(Math.PI * i)
      }
      mCube[0].group.visible = true;


      DrawLblA(mTex_Cookie[0], "Play online mah jongg\nwith your National Mah\nJongg League 2020 card", 260, -280, COLOR4, 50, ThreeUI.anchors.center, ThreeUI.anchors.center, "center");
      DrawLblA(mTex_Cookie[1], "Play with Friends,\nComputer Bots or\nMeet New Friends", 240, -100, COLOR4, 50, ThreeUI.anchors.center, ThreeUI.anchors.center, "center");

      DrawTransScal(mTex_Icon[0], -20, -250, 84, 84, 1, 1);
      DrawTransScal(mTex_Icon[1], -20, -70, 84, 84, 1, 1);


      DrawLblA(mTex_fonts[0], "LET'S\nPLAY\nMAHJ!", 15, 80, COLOR4, 32, ThreeUI.anchors.center, ThreeUI.anchors.center, "center");
      DrawLblA(mTex_fonts[1], "MY PROFILE", 220, 110, COLOR4, 32, ThreeUI.anchors.center, ThreeUI.anchors.center, "center");
      DrawLblA(mTex_fonts[2], "LET'S\nMAHJ\nNEWS", 420, 80, COLOR4, 32, ThreeUI.anchors.center, ThreeUI.anchors.center, "center");

      DrawLblA(mTex_fonts[3], "JOIN THE\nMAHJ\nGROUP", 17, 240, COLOR4, 32, ThreeUI.anchors.center, ThreeUI.anchors.center, "center");
      DrawLblA(mTex_fonts[4], "TOURNAMENTS", 220, 270, COLOR4, 26, ThreeUI.anchors.center, ThreeUI.anchors.center, "center");
      DrawLblA(mTex_fonts[5], "FAQ", 420, 270, COLOR4, 32, ThreeUI.anchors.center, ThreeUI.anchors.center, "center");


      // DrawLblA(mTex_fonts[0], "American Mah Jongg Online - grab a NMJL 2020 card!", 0, -100, COLOR4, 24, ThreeUI.anchors.center, ThreeUI.anchors.center, "center");
      // DrawTransScal(mTex_gold_stroke, 0, 80, 800, 100, 1, 1);
      // //  mTex_Icon
      // DrawTransScal(mTex_Icon[0], -420, -7, 54, 54, 1, 1);
      // DrawTransScal(mTex_Icon[1], -177, -7, 54, 54, 1, 1);
      // DrawTransScal(mTex_Icon[2], 180, -7, 54, 54, 1, 1);
      // DrawTransScal(mTex_Icon[3], 430, -7, 54, 54, 1, 1);

      // DrawLblA(mTex_fonts[1], "Play with Friends", -305, 0, COLOR4, 24, ThreeUI.anchors.center, ThreeUI.anchors.center, "center");
      // DrawLblA(mTex_fonts[2], "Play with 1-3 Computer Bots", 0, 0, COLOR4, 24, ThreeUI.anchors.center, ThreeUI.anchors.center, "center");
      // DrawLblA(mTex_fonts[3], "Make New Friends", 305, 0, COLOR4, 24, ThreeUI.anchors.center, ThreeUI.anchors.center, "center");


      // DrawTransScal(mTex_button[0], -290, 200, 256, 64, 1.1, 1);
      // DrawTransScal(mTex_button[1], 0, 200, 256, 64, 1.1, 1);
      // DrawTransScal(mTex_button[2], 290, 200, 256, 64, 1.1, 1);
      // DrawLblA(mTex_fonts[4], "Login", -290, 210, COLOR2, 36, ThreeUI.anchors.center, ThreeUI.anchors.center, "center");
      // DrawLblA(mTex_fonts[5], "Try it Out", -0, 210, COLOR2, 36, ThreeUI.anchors.center, ThreeUI.anchors.center, "center");
      // DrawLblA(mTex_fonts[6], "Join the Group", 290, 210, COLOR2, 36, ThreeUI.anchors.center, ThreeUI.anchors.center, "center");

      break;
    case GAMEOVER:
      m2D_Background.visible = true; DrawTextureAX(mTex_win, 0, -160, ThreeUI.anchors.center, ThreeUI.anchors.center);
      DrawTextureAX(mTex_popup, 0, 50, ThreeUI.anchors.center, ThreeUI.anchors.center);
      DrawTransScal(mTex_top, 0, -310, 1024, 64, 1.6, 1);
      DrawTextureAX(mTex_ply[0], 50, 50, ThreeUI.anchors.left, ThreeUI.anchors.top);
      DrawTextureAX(mTex_coinbar, 250, 36, ThreeUI.anchors.left, ThreeUI.anchors.top);
      DrawTextureAX(mTex_icn[4], 50, 50, ThreeUI.anchors.right, ThreeUI.anchors.top);
      DrawTextureAX(mTex_icn[6], 150, 50, ThreeUI.anchors.right, ThreeUI.anchors.top);
      DrawTransScal(mTex_btn[0], -170, 290, 256, 64, 1.1, 1);
      DrawTransScal(mTex_btn[1], 170, 290, 256, 64, 1.1, 1);
      DrawLblA(mTex_fonts[1], "1445", 220, 48, COLOR1, 36, ThreeUI.anchors.left, ThreeUI.anchors.top, "center");
      DrawLblA(mTex_fonts[0], "Jhnson", 190, 90, COLOR2, 40, ThreeUI.anchors.left, ThreeUI.anchors.top, "center");
      DrawLblA(mTex_fonts[2], "Menu", -170, 300, COLOR2, 40, ThreeUI.anchors.center, ThreeUI.anchors.center, "center");
      DrawLblA(mTex_fonts[3], "Continue", 170, 300, COLOR2, 40, ThreeUI.anchors.center, ThreeUI.anchors.center, "center");
      for (let i = 0; i < 4; i++) {
        DrawLblA(mTex_fonts[4 + i], "Player " + (i + 1), -200, -50 + i * 70, COLOR2, 40, ThreeUI.anchors.center, ThreeUI.anchors.center, "left");
        DrawLblA(mTex_fonts[8 + i], " " + (i + 1) * 13, 100, -50 + i * 70, COLOR2, 40, ThreeUI.anchors.center, ThreeUI.anchors.center, "center");
      }
      break;
    case GAMEPLAY:
      m2D_Background.visible = true;
      m3d_table.visible = true;
      DrawTextureAX(mTex_icn[1], 50, 50, ThreeUI.anchors.left, ThreeUI.anchors.top);
      DrawTextureAX(mTex_icn[5], 50, 150, ThreeUI.anchors.left, ThreeUI.anchors.top);
      DrawTextureAX(mTex_icn[3], 50, 250, ThreeUI.anchors.left, ThreeUI.anchors.top);
      DrawTextureAX(mTex_icn[2], 50, 50, ThreeUI.anchors.right, ThreeUI.anchors.top);
      DrawTextureAX(mTex_icn[0], 50, 150, ThreeUI.anchors.right, ThreeUI.anchors.top);
      DrawTextureAX(mTex_icn[7], 50, 150, ThreeUI.anchors.right, ThreeUI.anchors.top);
      DrawTextureAX(mTex_icn[8], 50, 150, ThreeUI.anchors.right, ThreeUI.anchors.top);
      DrawLblA(mTex_fonts[2], "Ramesh", -108, -262, COLOR4, 22, ThreeUI.anchors.center, ThreeUI.anchors.center, "center");
      DrawLblA(mTex_fonts[3], "Mahesh", 208, 242, COLOR4, 28, ThreeUI.anchors.center, ThreeUI.anchors.center, "center");
      DrawLblA(mTex_fonts[18], "Kajal", -346, 82, COLOR4, 26, ThreeUI.anchors.center, ThreeUI.anchors.center, "center");
      DrawLblA(mTex_fonts[19], "Nikhil", 260, -182, COLOR4, 24, ThreeUI.anchors.center, ThreeUI.anchors.center, "center");
      mTex_fonts[18].rotation = 100;
      mTex_fonts[19].rotation = 80;
      setGameCards();
      mCube.forEach((element) => {
        element.group.visible = true;
      });
      break;
  }
}

function Handle_Menu(sel) {
  console.log("sel = " + sel);
}

function compRan() {
  return 0.5 - Math.random();
}

function CreateCards() {
  scene.add(m2D_Background);
  m2D_Background.position.set(0, 14, -10);
  m2D_Background.visible = false;
  for (var i = 0; i < 152; i++) {
    if (i < 36) {
      mCube.push(new Cube(m3d_cube, tex_Cards[i % 9]));
    } else if (i >= 36 && i < 72) {
      mCube.push(new Cube(m3d_cube, tex_Cards[9 + (i % 9)]));
    } else if (i >= 72 && i < 108) {
      mCube.push(new Cube(m3d_cube, tex_Cards[18 + (i % 9)]));
    } else if (i >= 108 && i < 120) {
      mCube.push(new Cube(m3d_cube, tex_Cards[27 + (i % 3)]));
    } else if (i >= 120 && i < 136) {
      mCube.push(new Cube(m3d_cube, tex_Cards[30 + (i % 4)]));
    } else {
      mCube.push(new Cube(m3d_cube, tex_Cards[i - 102]));
    }
  }
  scene.add(m3d_table);
  m3d_table.visible = false;
  setGameCards();
}
function setGameCards() {
  mCube.sort(compRan);
  for (var i = 0; i < mCube.length; i++) {
    if (i < 38) {
      mCube[i].set(11.2, 10 - (Math.floor(i / 2) % 19) * 1.1, i % 2 == 0 ? 0.55 : 0, Math.PI * 0.5);
    } else if (i >= 38 && i < 38 * 2) {
      mCube[i].set(-10 + (Math.floor(i / 2) % 19) * 1.1, -11.2, (i % 2) * 0.55, 0);
    } else if (i >= 38 * 2 && i < 38 * 3) {
      mCube[i].set(-11.2, 10.0 - (Math.floor(i / 2) % 19) * 1.1, (i % 2) * 0.55, Math.PI * 0.5);
    } else { mCube[i].set(-10 + (Math.floor(i / 2) % 19) * 1.1, 11.2, (i % 2) * 0.55, 0); } mCube[i].group.visible = false;
  }
  for (var i = 0; i < 13; i++) {
    mCube[i].setPlayer(-12.2 + i * 2, -15, 4, BOTTOM);
  }
  for (var i = 13; i < 26; i++) {
    mCube[i].setPlayer(15, -12.2 + (i - 13) * 2, 4, RIGHT);
  }
  for (var i = 26; i < 39; i++) {
    mCube[i].setPlayer(-15, -12.2 + (i - 26) * 2, 4, LEFT);
  }
  for (var i = 39; i < 52; i++) {
    mCube[i].setPlayer(-12.2 + (i - 39) * 2, 15, 4, UP);
  }

  for (var i = 52; i < 70; i++) {
    mCube[i].setNew(3.8 - ((i - 52) % 6) * 1.5, 5.4 + Math.floor((i - 52) / 6) * 1.9, 2.1, UP);
  }
  for (var i = 70; i < 88; i++) {
    mCube[i].setNew(-3.8 + ((i - 70) % 6) * 1.5, -5.4 - Math.floor((i - 70) / 6) * 1.9, 2.2, BOTTOM);
  }
  for (var i = 88; i < 106; i++) {
    mCube[i].setNew(5.4 + Math.floor((i - 88) / 6) * 1.9, -3.8 + ((i - 88) % 6) * 1.5, 2.3, RIGHT);
  }
  for (var i = 106; i < 124; i++) {
    mCube[i].setNew(-5.4 - Math.floor((i - 106) / 6) * 1.9, 3.8 - ((i - 106) % 6) * 1.5, 2.4, LEFT);
  }
}
var roAnim = 0;
var roRad = 0;
var roInc = 0.02;
function Draw_Landing() {
  // DrawTransScal(mTex_button[0], -290, 200, 256, 64, mSel == 1 ? 1.15 : 1.1, mSel == 1 ? 0.8 : 1);
  // DrawTransScal(mTex_button[1], 0, 200, 256, 64, mSel == 2 ? 1.15 : 1.1, mSel == 2 ? 0.8 : 1);
  // DrawTransScal(mTex_button[2], 290, 200, 256, 64, mSel == 3 ? 1.15 : 1.1, mSel == 3 ? 0.8 : 1);

  DrawTransScal(mTex_BTN0[0], 220, 100, 166, 102, mSel == 1 ? 1.15 : 1.1, mSel == 1 ? 0.8 : 1);
  DrawTransScal(mTex_BTN0[1], 220, 260, 166, 102, mSel == 2 ? 1.15 : 1.1, mSel == 2 ? 0.8 : 1);
  DrawTransScal(mTex_BTN1[0], 020, 100, 128, 128, mSel == 3 ? 1.15 : 1.1, mSel == 3 ? 0.8 : 1);
  DrawTransScal(mTex_BTN1[1], 420, 100, 128, 128, mSel == 4 ? 1.15 : 1.1, mSel == 4 ? 0.8 : 1);
  DrawTransScal(mTex_BTN1[2], 020, 260, 128, 128, mSel == 5 ? 1.15 : 1.1, mSel == 5 ? 0.8 : 1);
  DrawTransScal(mTex_BTN1[3], 420, 260, 128, 128, mSel == 6 ? 1.15 : 1.1, mSel == 6 ? 0.8 : 1);


  roRad += roInc;
  for (var i = 0; i < 10; i++) {
    mCube[i].group.visible = roAnim == i;
  }
  mCube[roAnim].group.rotation.set(rx, roRad, ry);
  if (roRad > Math.PI * .6) {
    roRad = -Math.PI * .4;
    roAnim += 1;
    roAnim %= 10;
  }
}

function Handle_Landing(type) {
  mSel = 0;
  for (let i = 0; i < mTex_BTN0.length; i++) {
    bounds = mTex_BTN0[i].getBounds();
    if (ThreeUI.isInBoundingBox(coords.x, coords.y, bounds.x, bounds.y, bounds.width, bounds.height)) {
      mSel = 1 + i;
    }
  }

  for (let i = 0; i < mTex_BTN1.length; i++) {
    bounds = mTex_BTN1[i].getBounds();
    if (ThreeUI.isInBoundingBox(coords.x, coords.y, bounds.x, bounds.y, bounds.width, bounds.height)) {
      mSel = 3 + i;
    }
  }
  console.log("mSel = " + mSel);
  if (type == 2) {
    switch (mSel) {
      case 1:
        setScreen(GAMELOGIN);
        break;
      case 2:
        setScreen(GAMEMENU);
        break;
      case 3:
        setScreen(GAMEREG);
        break;
    }
    if (mSel > 0 && mSel < 4) {
      m2D_Background.position.set(0, 14, -10);
      m2D_Background.traverse(function (child) {
        if (child.isMesh) {
          child.material.map = mTex_BG[0];
        }
      });
    }
    mSel = 0;
  }
}



function Draw_Login() {
  DrawTransScal(mTex_button[0], 0, 166, 256, 64, mSel == 1 ? 1.4 : 1.3, mSel == 1 ? 0.8 : 1);
}

function Handle_Login(type) {
  mSel = 0;
  bounds = mTex_button[0].getBounds();
  if (ThreeUI.isInBoundingBox(coords.x, coords.y, bounds.x, bounds.y, bounds.width, bounds.height)) {
    mSel = 1;
  }
  if (ThreeUI.isInBoundingBox(coords.x, coords.y - 80, bounds.x, bounds.y, bounds.width, bounds.height)) {
    mSel = 2;
  }
  if (ThreeUI.isInBoundingBox(coords.x, coords.y - 140, bounds.x, bounds.y, bounds.width, bounds.height)) {
    mSel = 3;
  }
  console.log("mSel = " + mSel);
  if (type == 2) {
    switch (mSel) { case 1: setScreen(GAMEMENU); break; case 3: setScreen(GAMEREG); break; }mSel = 0;
  }
}

function Draw_Registration() {
  DrawTransScal(mTex_button[0], 0, 206, 256, 64, mSel == 1 ? 1.4 : 1.3, mSel == 1 ? 0.8 : 1);
}

function Handle_Registration(type) {
  mSel = 0;
  bounds = mTex_button[0].getBounds();
  if (ThreeUI.isInBoundingBox(coords.x, coords.y, bounds.x, bounds.y, bounds.width, bounds.height)) {
    mSel = 1;
  }
  if (ThreeUI.isInBoundingBox(coords.x, coords.y - 100, bounds.x, bounds.y, bounds.width, bounds.height)) {
    mSel = 3;
  }
  console.log("mSel = " + mSel);
  if (type == 2) {
    switch (mSel) { case 1: setScreen(GAMEMENU); break; case 3: setScreen(GAMELOGIN); break; }mSel = 0;
  }
}

function Draw_Menu() {
  DrawTransScal(mTex_icn[4], 50, 50, 64, 64, mSel == 1 ? 1.4 : 1.3, mSel == 1 ? 0.8 : 1);
  DrawTransScal(mTex_icn[6], 150, 50, 64, 64, mSel == 2 ? 1.4 : 1.3, mSel == 2 ? 0.8 : 1);
  DrawTransScal(mTex_button[0], 0, 40, 300, 64, mSel == 3 ? 1.4 : 1.3, mSel == 3 ? 0.8 : 1);
  DrawTransScal(mTex_button[1], 0, 200, 300, 64, mSel == 4 ? 1.4 : 1.3, mSel == 4 ? 0.8 : 1);
}

function Handle_MenuGame(type) {
  mSel = 0;
  bounds = mTex_icn[4].getBounds();
  if (ThreeUI.isInBoundingBox(coords.x, coords.y, bounds.x, bounds.y, bounds.width, bounds.height)) {
    mSel = 1;
  }
  bounds = mTex_icn[6].getBounds();
  if (ThreeUI.isInBoundingBox(coords.x, coords.y, bounds.x, bounds.y, bounds.width, bounds.height)) {
    mSel = 2;
  }
  bounds = mTex_button[0].getBounds();
  if (ThreeUI.isInBoundingBox(coords.x, coords.y, bounds.x, bounds.y, bounds.width, bounds.height)) {
    mSel = 3;
  }
  bounds = mTex_button[1].getBounds();
  if (ThreeUI.isInBoundingBox(coords.x, coords.y, bounds.x, bounds.y, bounds.width, bounds.height)) {
    mSel = 4;
  }
  console.log("mSel = " + mSel);
  if (type == 2) {
    switch (mSel) {
      case 1:
        setScreen(GAMEMENU);
        break;
      case 2:
        setScreen(GAMEMENU);
        break;
      case 3:
        GameScreen = GAMEPLAY;
        setScreen(GAMEPLAY);
        break;
      case 4:
        //setScreen(GAMEPLAY);
        break;
    }mSel = 0;
  }
}

function Draw_Gameplay() {
  DrawTransScal(mTex_icn[1], 50, 50, 64, 64, mSel == 2 ? 1.4 : 1.3, mSel == 2 ? 0.8 : 1);
  DrawTransScal(mTex_icn[5], 50, 150, 64, 64, mSel == 6 ? 1.4 : 1.3, mSel == 6 ? 0.8 : 1);
  DrawTransScal(mTex_icn[3], 50, 250, 64, 64, mSel == 4 ? 1.4 : 1.3, mSel == 4 ? 0.8 : 1);
  DrawTransScal(mTex_icn[2], 50, 50, 64, 64, mSel == 3 ? 1.4 : 1.3, mSel == 3 ? 0.8 : 1);
  DrawTransScal(mTex_icn[0], 50, 150, 64, 64, mSel == 1 ? 1.4 : 1.3, mSel == 1 ? 0.8 : 1);
  DrawTransScal(mTex_icn[7], 50, 250, 64, 64, mSel == 8 ? 1.4 : 1.3, mSel == 8 ? 0.8 : 1);
  DrawTransScal(mTex_icn[8], 50, 350, 64, 64, mSel == 9 ? 1.4 : 1.3, mSel == 9 ? 0.8 : 1);

}

function Handle_Play(type) {
  if (mTex_forColor.ColorSel > 0) {
    return Handle_SelColor(type);
  }
  mSel = 0;
  for (let i = 0; i < 9; i++) {
    bounds = mTex_icn[i].getBounds();
    if (ThreeUI.isInBoundingBox(coords.x, coords.y, bounds.x, bounds.y, bounds.width, bounds.height) && i != 4 && i != 6) {
      mSel = i + 1;
    }
  }

  console.log("camera.zoom = " + camera.zoom);
  camera.zoom = rx;
  if (type == 2) {
    switch (mSel) {
      case 1: setScreen(GAMEMENU); break;
      case 2: setScreen(GAMEMENU); break;
      case 3:
        break;
      case 4: setScreen(GAMEOVER); break;
      case 8:
        mTex_forColor.table = mTex_forColor.table == 1 ? 0 : 1;
        m3d_tableTop.traverse(function (child) {
          if (child.isMesh) {
            child.material.map = tablebase[mTex_forColor.table];
          }
        }); break;
      case 9:
        break;
    }mSel = 0;
  }
}

function Draw_Over() {
  DrawTransScal(mTex_icn[4], 50, 50, 64, 64, mSel == 1 ? 1.4 : 1.3, mSel == 1 ? 0.8 : 1);
  DrawTransScal(mTex_icn[6], 150, 50, 64, 64, mSel == 2 ? 1.4 : 1.3, mSel == 2 ? 0.8 : 1);
  DrawTransScal(mTex_btn[0], -170, 290, 200, 50, mSel == 3 ? 1.4 : 1.3, mSel == 3 ? 0.8 : 1);
  DrawTransScal(mTex_btn[1], 170, 290, 200, 50, mSel == 4 ? 1.4 : 1.3, mSel == 4 ? 0.8 : 1);
}

function Handle_Over(type) {
  mSel = 0;
  bounds = mTex_icn[4].getBounds();
  if (ThreeUI.isInBoundingBox(coords.x, coords.y, bounds.x, bounds.y, bounds.width, bounds.height)) {
    mSel = 1;
  }
  bounds = mTex_icn[6].getBounds();
  if (ThreeUI.isInBoundingBox(coords.x, coords.y, bounds.x, bounds.y, bounds.width, bounds.height)) {
    mSel = 2;
  }
  bounds = mTex_btn[0].getBounds();
  if (ThreeUI.isInBoundingBox(coords.x, coords.y, bounds.x, bounds.y, bounds.width, bounds.height)) {
    mSel = 3;
  }
  bounds = mTex_btn[1].getBounds();
  if (ThreeUI.isInBoundingBox(coords.x, coords.y, bounds.x, bounds.y, bounds.width, bounds.height)) {
    mSel = 4;
  }
  if (type == 2) {
    switch (mSel) { case 1: setScreen(GAMEMENU); break; case 2: setScreen(GAMEMENU); break; case 3: setScreen(GAMEMENU); break; case 4: setScreen(GAMEOVER); break; }mSel = 0;
  }
}

function Handle_SelColor(type) {
  mSel = 0;
  for (let i = 0; i < mRectCLR.length; i++) {
    bounds = mRectCLR[i].getBounds(); if (ThreeUI.isInBoundingBox(coords.x, coords.y, bounds.x, bounds.y, bounds.width, bounds.height)) { mSel = i + 101; }
  }
  if (mTex_forColor.ColorSel == 1) {
    bounds = mTex_CardBack.getBounds(); if (ThreeUI.isInBoundingBox(coords.x, coords.y, bounds.x, bounds.y, bounds.width, bounds.height)) { mSel = 201; }
  }
  if (type == 2 && mSel > 100) {
    let cl = mSel - 101; setCardBackandTable(cl); mSel = 0; mTex_forColor.visible = false; mTex_forColor.ColorSel = 0;
  }
  return true;
}

function setCardBackandTable(cl) {
  if (mTex_forColor.ColorSel == 1) {
    mTex_forColor.card = cl;
    if (cl == 100) {
      DrawTransScal(mTex_Right, 0, 300, 64, 64, 1, 1); mCube[39].mback.traverse(function (child) {
        if (child.isMesh) { child.material.color = hexToRgb("#ffffff"); child.material.map = tex_Back; child.material.needsUpdate = true; }
      });
    } else {
      DrawTransScal(mTex_Right, mRectCLR[cl].x, mRectCLR[cl].y, 64, 64, 1, 1);
      mCube[39].mback.traverse(function (child) {
        if (child.isMesh) { child.material.color = hexToRgb(mColors[cl]); child.material.map = tex_planBack; child.material.needsUpdate = true; }
      });
    }
  } else {
    mTex_forColor.table = cl; DrawTransScal(mTex_Right, mRectCLR[cl].x, mRectCLR[cl].y, 64, 64, 1, 1); m3d_tableTop.traverse(function (child) {
      if (child.isMesh) { child.material.color = hexToRgb(mColors[cl]); child.material.color = hexToRgb(mColors[cl]); }
    });
    // DrawLblA(mTex_fonts[1], "49", -8, -42, cl == 0 ? COLOR5 : COLOR4, 36, ThreeUI.anchors.center, ThreeUI.anchors.center, "center");
  }
}
