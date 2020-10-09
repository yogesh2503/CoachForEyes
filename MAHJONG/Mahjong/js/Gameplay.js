
function init() {
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000);
  camera = new THREE.PerspectiveCamera(20, window.innerWidth / window.innerHeight, 0.1, 1000);
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

  mPlan_Icon = new THREE.Mesh(new THREE.PlaneGeometry(14, 18), new THREE.MeshBasicMaterial({ color: 0x131d83 }));
  scene.add(mPlan_Icon);
  mPlan_Icon.position.set(-22, 12, 18);
  mPlan_Icon.visible = false;

  mPlan_Green = new THREE.Mesh(new THREE.PlaneGeometry(16, 16), new THREE.MeshBasicMaterial({ color: 0x39ab8e }));
  scene.add(mPlan_Green);
  mPlan_Green.visible = false;

  loadobj();
  gameUI = new ThreeUI(renderer.domElement, 720);
  mTxt_Load = createTexts("0", 50, "#fff", ThreeUI.anchors.center, ThreeUI.anchors.center, "center", "Helvetica");
  DrawLbl(mTxt_Load, "1%", 0, 100);
  AssetLoader.add.webFont('CabinCondensed-Bold', 'js/font.css');
  AssetLoader.add.webFont('CabinCondensed', 'js/font.css');
  AssetLoader.add.webFont('RougeScript', 'js/font.css');
  AssetLoader.add.image("assets/logo.png");
  AssetLoader.add.image("assets/button.png");
  AssetLoader.add.image("assets/top.jpg");
  AssetLoader.add.image("assets/button2.png");
  AssetLoader.add.image("assets/coinbar.png");
  AssetLoader.add.image("assets/popup.png");
  AssetLoader.add.image("assets/win.png");
  AssetLoader.add.image("assets/right.png");
  AssetLoader.add.image("assets/icons.png");
  AssetLoader.add.image("assets/icons1.png");
  AssetLoader.add.image("assets/gold_stroke.png");
  AssetLoader.add.image("assets/cardBack.jpg");
  AssetLoader.add.image("assets/button0.png");
  AssetLoader.add.image("assets/button1.png");
  AssetLoader.add.image("assets/logo2.png");
  AssetLoader.add.image("assets/radio_off.png");
  AssetLoader.add.image("assets/radio_on.png");
  AssetLoader.add.image("assets/toggle_off.png");
  AssetLoader.add.image("assets/toggle_on.png");
  AssetLoader.add.image("assets/cardBack0.jpg");
  AssetLoader.add.image("assets/flower_fullcolor.jpg");
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
    mTex_flower_fullcolor = loadUI("assets/flower_fullcolor.jpg", 0, 0, 0);
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
    for (let i = 0; i < 4; i++) {
      mTex_Icon1.push(loadUI("assets/icons1.png", 0, 0, 0));
    }
    for (let i = 0; i < 3; i++) {
      mTex_BTN0[i] = loadUI("assets/button0.png", 0, 0, 0);
    }
    for (let i = 0; i < 4; i++) {
      mTex_BTN1[i] = loadUI("assets/button1.png", 0, 0, 0);
    }
    mTex_gold_stroke.push(loadUI("assets/gold_stroke.png", 0, 0, 0));
    mTex_gold_stroke.push(loadUI("assets/gold_stroke.png", 0, 0, 0));
    for (let i = 0; i < mTex_fonts.length; i++) {
      mTex_fonts[i] = createTexts("100", 20, "#fff", ThreeUI.anchors.center, ThreeUI.anchors.center, "center", "CabinCondensed");
    }
    for (let i = 0; i < 3; i++) {
      mTex_Cookie.push(createTexts("100", 20, "#fff", ThreeUI.anchors.center, ThreeUI.anchors.center, "center", "RougeScript"));
    }
    for (let i = 0; i < 4; i++) {
      mTex_fontsBold.push(createTexts("100", 20, "#fff", ThreeUI.anchors.center, ThreeUI.anchors.center, "center", "CabinCondensed-Bold"));
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
    for (let i = 0; i < 6; i++) {
      mTex_radio_off.push(loadUI("assets/radio_off.png", 0, 0, 0));
      mTex_radio_on.push(loadUI("assets/radio_on.png", 0, 0, 0));
      mTex_toggle_off.push(loadUI("assets/toggle_off.png", 0, 0, 0));
      mTex_toggle_on.push(loadUI("assets/toggle_on.png", 0, 0, 0));
    }
    mTex_Pic = loadUI("assets/cardBack0.jpg", 0, 0, 0);
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
    div_recieve = addInputBox(recieveids);
    div_Search = addInputBox(searchids);
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
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    coords = { x: e.clientX, y: e.clientY };
    coords.x = coords.x - (window.innerWidth - gameUI.gameCanvas.getBoundingClientRect().width) / 2;
    coords.x *= scale; coords.y *= scale;
    var elem = renderer.domElement, boundingRect = elem.getBoundingClientRect(),
      x = (event.clientX - boundingRect.left) * (elem.width / boundingRect.width),
      y = (event.clientY - boundingRect.top) * (elem.height / boundingRect.height);
    mouse.x = (x / CANVAS_WIDTH) * 2 - 1;
    mouse.y = -(y / CANVAS_HEIGHT) * 2 + 1;
  }
  switch (GameScreen) {
    case GAMELANDING: Handle_Landing(type); break;
    case GAMELOGIN: Handle_Login(type); break;
    case GAMEREG: Handle_Registration(type); break;
    case GAMEMENU: Handle_MenuGame(type); break;
    case GAMEPLAY: Handle_Play(type); break;
    case GAMEOVER: Handle_Over(type); break;
    case GAMEPROFILE: Handle_Profile(type); break;
    case GAMEJOIN: Handle_Join(type); break;
    case GAMEFRIEND: Handle_Friend(type); break;
  }
}
var counter = 0;
var mv = 0, next = 0, roc = 0, rox = 0.01;
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
      if (counter > 10) {
        setScreen(GAMELANDING);
        // setScreen(GAMEPLAY);
      }
      break;
    case GAMELANDING: Draw_Landing(); break;
    case GAMELOGIN: Draw_Login(); break;
    case GAMEREG: Draw_Registration(); break;
    case GAMEMENU: Draw_Menu(); break;
    case GAMEPLAY: Draw_Gameplay(); break;
    case GAMEOVER: Draw_Over(); break;
    case GAMEPROFILE: Draw_Profile(); break;
    case GAMEJOIN: Draw_Join(); break;
    case GAMEFRIEND: Draw_Friend(); break;
  }
  if (isResize > 0) {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    this.gameUI.resize();
    mTex_LandScape.visible = window.innerWidth < window.innerHeight;
    isResize--;
  }
}

function gamereset() { }

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

  scene.add(mRack);
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
    mCube[i].setPlayer(-12.2 + (i - 39) * 2, 13, 4, UP);
  }

  for (var i = 52; i < 70; i++) {
    mCube[i].setNew(3.8 - ((i - 52) % 6) * 1.5, 5.4 + Math.floor((i - 52) / 6) * 1.9, 2.1, UP, .66);
  }
  for (var i = 70; i < 88; i++) {
    mCube[i].setNew(-3.8 + ((i - 70) % 6) * 1.5, -5.4 - Math.floor((i - 70) / 6) * 1.9, 2.2, BOTTOM, .66);
  }
  for (var i = 88; i < 106; i++) {
    mCube[i].setNew(5.4 + Math.floor((i - 88) / 6) * 1.9, -3.8 + ((i - 88) % 6) * 1.5, 2.3, RIGHT, .66);
  }
  for (var i = 106; i < 124; i++) {
    mCube[i].setNew(-5.4 - Math.floor((i - 106) / 6) * 1.9, 3.8 - ((i - 106) % 6) * 1.5, 2.4, LEFT, .66);
  }
}
var roAnim = 0;
var roRad = 0;
var roInc = 0.02;
function Draw_Landing() {
  DrawTransScal(mTex_BTN1[0], 020, 100, 128, 128, mSel == 3 ? 1.15 : 1.1, mSel == 3 ? 0.8 : 1);
  DrawTransScal(mTex_BTN0[0], 220, 100, 166, 102, mSel == 1 ? 1.15 : 1.1, mSel == 1 ? 0.8 : 1);
  DrawTransScal(mTex_BTN1[1], 420, 100, 128, 128, mSel == 4 ? 1.15 : 1.1, mSel == 4 ? 0.8 : 1);

  DrawTransScal(mTex_BTN1[2], 020, 260, 128, 128, mSel == 5 ? 1.15 : 1.1, mSel == 5 ? 0.8 : 1);
  DrawTransScal(mTex_BTN0[1], 220, 260, 166, 102, mSel == 2 ? 1.15 : 1.1, mSel == 2 ? 0.8 : 1);
  DrawTransScal(mTex_BTN1[3], 420, 260, 128, 128, mSel == 6 ? 1.15 : 1.1, mSel == 6 ? 0.8 : 1);

  roRad += roInc;
  for (var i = 0; i < 10; i++) {
    mCube[i].group.visible = roAnim == i;
  }
  mCube[roAnim].group.rotation.set(0, roRad, 0);
  if (roRad > Math.PI * .6) {
    roRad = -Math.PI * .4;
    roAnim += 1;
    roAnim %= 10;
  }
  mCube[roAnim].group.position.set(-13.5, 7.4, 36.5);
}

function Handle_Landing(type) {
  mSel = 0;
  for (let i = 0; i < mTex_BTN1.length; i++) {
    bounds = mTex_BTN1[i].getBounds();
    if (ThreeUI.isInBoundingBox(coords.x, coords.y, bounds.x, bounds.y, bounds.width, bounds.height)) {
      mSel = 3 + i;
    }
  }
  for (let i = 0; i < mTex_BTN0.length; i++) {
    bounds = mTex_BTN0[i].getBounds();
    if (ThreeUI.isInBoundingBox(coords.x, coords.y, bounds.x, bounds.y, bounds.width, bounds.height)) {
      mSel = 1 + i;
    }
  }
  console.log("hello = " + mSel);

  if (type == 2) {
    switch (mSel) {
      case 3:
        setScreen(GAMEREG);
        break;
      case 4:
        setScreen(GAMEPROFILE);
        break;
      case 2:
        setScreen(GAMEMENU);
        break;
      case 1:
      case 5:
        setScreen(GAMEREG);
        break;
      case 6:
        window.open('assets/mahj_faq.pdf', '_blank', 'fullscreen=yes');
        break;
    }
    mSel = 0;
  }
}

var JOIN = [["Open game - Anyone with the same game speed\nand Discard Tutor options may join my game.",
  "Friends Only - Le's Mahj friends with the same game speed\nand Discard tutor options may find me and join my game.",
  "Private Game - Set up a private game and\nget a code to send to other players.",
  "Individual Game - Just playing the computer bots."],
["Open Game - Join a game with players that have the\nsame game speed and Discard Tutor options",
  "Friends Only - Join a game with a player that has me on their Let's Mahj\nfriends list and has the same game speed and Discard Tutor options",
  "Private Game Code"]];


function Draw_Join() {
  DrawTransScal(mTex_popup, 0, 0, 512, 600, 1.1, 1);
  DrawLblA(mTex_Cookie[0], "Let's Mahj - Start or Join a Game", 0, - 300, COLOR3, 30, ThreeUI.anchors.center, ThreeUI.anchors.center, "center");
  DrawTransScal(mTex_gold_stroke[0], 0, -275, 512, 64, .6, 1);
  DrawLblA(mTex_fontsBold[0], "Start a Game- Who is playing?", 0, -235, COLOR3, 26, ThreeUI.anchors.center, ThreeUI.anchors.center, "center");

  for (let i = 0; i < 4; i++) {
    DrawTransScal(mTex_BTN1[i], 0, i * 65 - 195, 500, 60, mSel == i + 1 ? 1.01 : 1, mSel == i + 1 ? 0.5 : 1);
    DrawLblA(mTex_fonts[i], JOIN[0][i], 0, i * 65 - 200 + (i == 3 ? 10 : 0), COLOR4, 21, ThreeUI.anchors.center, ThreeUI.anchors.center, "center");
  }

  DrawLblA(mTex_fontsBold[1], "Join a Game", 0, 110, COLOR3, 26, ThreeUI.anchors.center, ThreeUI.anchors.center, "center");

  for (let i = 0; i < 3; i++) {
    DrawTransScal(mTex_BTN0[i], 0, i * 60 + 160, 500, 60, mSel == i + 5 ? 1.01 : 1, mSel == i + 5 ? 0.5 : 1);
    DrawLblA(mTex_fonts[4 + i], JOIN[1][i], 0, i * 60 + 155 + (i == 2 ? 10 : 0), COLOR4, (i == 1 ? 18 : 21), ThreeUI.anchors.center, ThreeUI.anchors.center, "center");
  }
  DrawTransScal(mTex_Icon[0], -0, 60, 48, 48, 1, 1);
}

function Handle_Join(type) {
  mSel = 0;
  for (let i = 0; i < mTex_BTN1.length; i++) {
    bounds = mTex_BTN1[i].getBounds();
    if (ThreeUI.isInBoundingBox(coords.x, coords.y, bounds.x, bounds.y, bounds.width, bounds.height)) {
      mSel = 1 + i;
    }
  }
  for (let i = 0; i < mTex_BTN0.length; i++) {
    bounds = mTex_BTN0[i].getBounds();
    if (ThreeUI.isInBoundingBox(coords.x, coords.y, bounds.x, bounds.y, bounds.width, bounds.height)) {
      mSel = 5 + i;
    }
  }

  if (type == 2 && mSel > 0) {
    switch (mSel) {
      default:
        setScreen(GAMEFRIEND);
        break;
    }
    mSel = 0;
  }
}
var names = ['John', 'Phil', 'Sarah', 'Cody'];
function Draw_Friend() {
  DrawLblA(mTex_Cookie[0], "Let's Mahj Find a Friend", -250, -290, COLOR4, 30, ThreeUI.anchors.center, ThreeUI.anchors.center, "center");
  DrawLblA(mTex_Cookie[1], "Let's Mahj Friends", 250, -290, COLOR4, 30, ThreeUI.anchors.center, ThreeUI.anchors.center, "center");

  DrawLblA(mTex_fonts[1], "List of Friends", 250, -200, COLOR4, 30, ThreeUI.anchors.center, ThreeUI.anchors.center, "center");
  DrawTransScal(mTex_gold_stroke[0], -250, -260, 512, 64, .6, 1);
  DrawTransScal(mTex_gold_stroke[1], 250, -260, 512, 64, .6, 1);

  for (let i = 0; i < 4; i++) {
    DrawLblA(mTex_fonts[i + 2], names[i] + " Points: " + (150 + i * 20) + " USA " + (i % 2 == 0 ? "allow to find" : "Block"), 150, -150 + i * 36, COLOR4, 20, ThreeUI.anchors.center, ThreeUI.anchors.center, "Left");
  }
  DrawTransScal(mTex_BTN1[0], -320, 180, 100, 100, mSel == 1 ? 1.01 : 1, mSel == 1 ? 0.5 : 1);
  DrawTransScal(mTex_BTN1[1], -180, 180, 100, 100, mSel == 2 ? 1.01 : 1, mSel == 2 ? 0.5 : 1);

  DrawLblA(mTex_fonts[6], "LET'S\nPLAY\nMAHJ!", -320, 162, COLOR4, 26, ThreeUI.anchors.center, ThreeUI.anchors.center, "center");
  DrawLblA(mTex_fonts[7], "HOME", -180, 190, COLOR4, 26, ThreeUI.anchors.center, ThreeUI.anchors.center, "center");

  DrawLblA(mTex_Cookie[2], "Results list , you can add\nto list or send a message", -250, 60, COLOR4, 30, ThreeUI.anchors.center, ThreeUI.anchors.center, "center");
}

function Handle_Friend(type) {
  mSel = 0;
  for (let i = 0; i < mTex_BTN1.length; i++) {
    bounds = mTex_BTN1[i].getBounds();
    if (ThreeUI.isInBoundingBox(coords.x, coords.y, bounds.x, bounds.y, bounds.width, bounds.height)) {
      mSel = 1 + i;
    }
  }

  if (type == 2) {
    switch (mSel) {
      case 1:
        setScreen(GAMEPLAY);
        break;
      case 2:
        setScreen(GAMELANDING);
        break;
    }
    mSel = 0;
  }
}


function Draw_Profile() {
  var fn = 0;
  DrawTransScal(mTex_Pic, -535, -240, 180, 180, 1, 1);
  DrawLblA(mTex_fontsBold[0], "MY PROFILE", -340, -300, COLOR3, 26, ThreeUI.anchors.center, ThreeUI.anchors.center, "center");

  DrawLblA(mTex_fonts[fn++], "John", -400, -250, COLOR3, 26, ThreeUI.anchors.center, ThreeUI.anchors.center, "left");

  DrawLblA(mTex_fonts[fn++], "Change Password:", -400, -210, COLOR3, 18, ThreeUI.anchors.center, ThreeUI.anchors.center, "left");
  DrawLblA(mTex_fonts[fn++], "Membership expiration date: 20 Nov 2020", -400, -170, COLOR3, 18, ThreeUI.anchors.center, ThreeUI.anchors.center, "left");
  DrawLblA(mTex_fonts[fn++], "auto renew", -190, -135, COLOR3, 18, ThreeUI.anchors.center, ThreeUI.anchors.center, "left");
  DrawLblA(mTex_fonts[fn++], "Update Credit Card Information:", -400, -100, COLOR3, 18, ThreeUI.anchors.center, ThreeUI.anchors.center, "left");
  DrawLblA(mTex_fontsBold[1], "Optional Information", -400, -50, COLOR3, 18, ThreeUI.anchors.center, ThreeUI.anchors.center, "left");
  DrawLblA(mTex_fonts[fn++], "Time Zone: -  -5:30 GMT", -400, -10, COLOR3, 18, ThreeUI.anchors.center, ThreeUI.anchors.center, "left");
  DrawLblA(mTex_fonts[fn++], "Location: - USA", -400, 30, COLOR3, 18, ThreeUI.anchors.center, ThreeUI.anchors.center, "left");
  DrawLblA(mTex_fonts[fn++], "If you wish to join in the happenings and\nreceive giveaways tell us where to send them: -", -400, 70, COLOR3, 17, ThreeUI.anchors.center, ThreeUI.anchors.center, "left");
  DrawTransScal(mTex_Icon[0], -0, -0, 10, 10, 1, 1);
  DrawTransScal(mTex_toggle_on[0], -210, -140, 64, 64, .82, 1);
  DrawTransScal(mTex_BTN0[0], -270, 260, 200, 40, mSel == 4 ? 1.15 : 1.1, mSel == 4 ? 0.8 : 1);
  DrawLblA(mTex_fonts[fn++], "SAVE CHANGES", -270, 270, COLOR4, 26, ThreeUI.anchors.center, ThreeUI.anchors.center, "center");

  var my_x = 200;
  var my_y = -300;
  var mul = 40;
  var yi = 1;
  DrawLblA(mTex_fontsBold[3], "MY PROFILE", my_x + 100, my_y, COLOR3, 26, ThreeUI.anchors.center, ThreeUI.anchors.center, "center");

  DrawLblA(mTex_fonts[fn++], "National Mah Jongg League Card", my_x, my_y + mul * yi, COLOR3, 18, ThreeUI.anchors.center, ThreeUI.anchors.center, "left"); yi++;

  DrawLblA(mTex_fonts[fn++], "2020                      2021", 50 + my_x, -9 + my_y + mul * yi, COLOR3, 18, ThreeUI.anchors.center, ThreeUI.anchors.center, "left");
  DrawTransScal(mTex_radio_off[0], 20 + my_x, -14 + my_y + mul * yi, 54, 54, .82, 1);
  DrawTransScal(mTex_radio_on[0], 140 + my_x, -14 + my_y + mul * yi, 54, 54, .82, 1);
  yi++;
  DrawLblA(mTex_fonts[fn++], "Speed of Play: \n\n               Fast                      Normal                      Slow", my_x, my_y + mul * yi, COLOR3, 18, ThreeUI.anchors.center, ThreeUI.anchors.center, "left");
  yi += 1;
  DrawTransScal(mTex_radio_off[1], 20 + my_x, -10 + my_y + mul * yi, 54, 54, .82, 1);
  DrawTransScal(mTex_radio_off[2], 130 + my_x, -10 + my_y + mul * yi, 54, 54, .82, 1);
  DrawTransScal(mTex_radio_on[1], 260 + my_x, -10 + my_y + mul * yi, 54, 54, .82, 1);
  yi += 1;
  DrawLblA(mTex_fonts[fn++], "Tile Choice- \n\n               Let's Mahj               Classic", my_x, my_y + mul * yi, COLOR3, 18, ThreeUI.anchors.center, ThreeUI.anchors.center, "left");
  yi += 1;
  DrawTransScal(mTex_radio_off[3], 20 + my_x, -10 + my_y + mul * yi, 54, 54, .82, 1);
  DrawTransScal(mTex_radio_on[3], 150 + my_x, -10 + my_y + mul * yi, 54, 54, .82, 1);
  yi += 1;
  DrawLblA(mTex_fonts[fn++], "Tile pattern - box of choices", my_x, my_y + mul * yi, COLOR3, 18, ThreeUI.anchors.center, ThreeUI.anchors.center, "left");
  yi += 1;
  DrawLblA(mTex_fonts[fn++], "Table background - choices", my_x, my_y + mul * yi, COLOR3, 18, ThreeUI.anchors.center, ThreeUI.anchors.center, "left");
  yi += 1;
  DrawLblA(mTex_fonts[fn++], "Game Sounds", my_x, my_y + mul * yi, COLOR3, 18, ThreeUI.anchors.center, ThreeUI.anchors.center, "left");
  DrawTransScal(mTex_toggle_on[1], 210 + my_x, -5 + my_y + mul * yi, 54, 54, .82, 1);
  yi += 1;


  DrawLblA(mTex_fonts[fn++], "Discard Tutor - You will be prompted\nwhen you are able to call a tile", my_x, my_y + + mul * yi, COLOR3, 18, ThreeUI.anchors.center, ThreeUI.anchors.center, "left");
  DrawTransScal(mTex_toggle_on[5], 270 + my_x, 3 + my_y + mul * yi, 54, 54, .82, 1);
  yi += 1.5;


  DrawLblA(mTex_fonts[fn++], "Allow members to email me without\nrevealing my email address to them", my_x, my_y + + mul * yi, COLOR3, 18, ThreeUI.anchors.center, ThreeUI.anchors.center, "left");
  DrawTransScal(mTex_toggle_on[2], 270 + my_x, 3 + my_y + mul * yi, 54, 54, .82, 1);
  yi += 1.5;
  DrawLblA(mTex_fonts[fn++], "Video on during game", my_x, my_y + mul * yi, COLOR3, 18, ThreeUI.anchors.center, ThreeUI.anchors.center, "left");
  DrawTransScal(mTex_toggle_on[3], 210 + my_x, -5 + my_y + mul * yi, 54, 54, .82, 1);
  yi += 1;
  DrawLblA(mTex_fonts[fn++], "Voice audio on during game", my_x, my_y + mul * yi, COLOR3, 18, ThreeUI.anchors.center, ThreeUI.anchors.center, "left");
  DrawTransScal(mTex_toggle_on[4], 210 + my_x, -5 + my_y + mul * yi, 54, 54, .82, 1);
  yi += 2;

  DrawTransScal(mTex_BTN1[0], -540, -40 + 150 * 0, 128, 128, mSel == 1 ? 1.15 : 1.1, mSel == 1 ? 0.8 : 1);
  DrawTransScal(mTex_BTN1[1], -540, -40 + 150 * 1, 128, 128, mSel == 2 ? 1.15 : 1.1, mSel == 2 ? 0.8 : 1);
  DrawTransScal(mTex_BTN1[2], -540, -40 + 150 * 2, 128, 128, mSel == 3 ? 1.15 : 1.1, mSel == 3 ? 0.8 : 1);
  DrawLblA(mTex_fonts[fn++], "Friends", -540, -30 + 150 * 0, COLOR4, 32, ThreeUI.anchors.center, ThreeUI.anchors.center, "center");
  DrawLblA(mTex_fonts[fn++], "Home", -540, -30 + 150 * 1, COLOR4, 32, ThreeUI.anchors.center, ThreeUI.anchors.center, "center");
  DrawLblA(mTex_fonts[fn++], "LET'S\nPLAY\nMAHJ!", -540, -60 + 150 * 2, COLOR4, 32, ThreeUI.anchors.center, ThreeUI.anchors.center, "center");

}
function Handle_Profile(type) {
  mSel = 0;
  for (let i = 0; i < 3; i++) {
    bounds = mTex_BTN1[i].getBounds();
    if (ThreeUI.isInBoundingBox(coords.x, coords.y, bounds.x, bounds.y, bounds.width, bounds.height)) {
      mSel = i + 1;
    }
  }
  bounds = mTex_BTN0[0].getBounds();
  if (ThreeUI.isInBoundingBox(coords.x, coords.y, bounds.x, bounds.y, bounds.width, bounds.height)) {
    mSel = 4;
  }
  if (type == 2) {
    switch (mSel) {
      case 1:
        setScreen(GAMEFRIEND);
        break;
      case 2:
        setScreen(GAMELANDING);
        break;
      case 3:
        setScreen(GAMEJOIN);
        break;
    }mSel = 0;
  }
}
function Draw_Login() {
  DrawTransScal(mTex_BTN0[0], 200, 50, 200, 40, mSel == 1 ? 1.15 : 1.1, mSel == 1 ? 0.8 : 1);

  DrawLblA(mTex_fonts[1], "keep me logged in", 115, -3, COLOR3, 22, ThreeUI.anchors.center, ThreeUI.anchors.center, "center");
  DrawTransScal(mTex_toggle_on[0], 16, -10, 64, 64, .82, 1);

  DrawLblA(mTex_fonts[2], "Forget password?", 200, 120, COLOR1, 24, ThreeUI.anchors.center, ThreeUI.anchors.center, "center");

  DrawLblA(mTex_fonts[3], "Don't have account?", 167, 170, COLOR1, 24, ThreeUI.anchors.center, ThreeUI.anchors.center, "center");
  DrawLblA(mTex_fonts[4], "Signup", 297, 170, COLOR3, 24, ThreeUI.anchors.center, ThreeUI.anchors.center, "center");

}

function Handle_Login(type) {
  mSel = 0;
  bounds = mTex_BTN0[0].getBounds();
  if (ThreeUI.isInBoundingBox(coords.x, coords.y, bounds.x, bounds.y, bounds.width, bounds.height)) {
    mSel = 1;
  }
  if (CircRectsOverlap((mTex_fonts[2].x) / 360, -mTex_fonts[2].y / 360, .3, .07, mouse.x * ratio, mouse.y, .01)) {
    mSel = 2;
  }
  if (CircRectsOverlap((mTex_fonts[3].x + 25) / 360, -mTex_fonts[3].y / 360, .4, .07, mouse.x * ratio, mouse.y, .01)) {
    mSel = 3;
  }
  bounds = (mPlayer.autoRenew ? mTex_toggle_on[0] : mTex_toggle_off[0]).getBounds();
  if (ThreeUI.isInBoundingBox(coords.x, coords.y, bounds.x, bounds.y, bounds.width, bounds.height)) {
    mSel = 7;
  }
  console.log("mSel = " + mSel);
  if (type == 2) {
    switch (mSel) {
      case 1:
        setScreen(GAMEPROFILE);
        break;
      case 3:
        setScreen(GAMEREG);
        break;
    }mSel = 0;
  }
}
var sety = -60;
function Draw_Registration() {
  DrawTransScal(mTex_BTN0[0], 200, 60 + sety, 200, 40, mSel == 1 ? 1.15 : 1.1, mSel == 1 ? 0.8 : 1);
  DrawTransScal(mTex_BTN0[1], 200, 340 + sety, 200, 40, mSel == 2 ? 1.15 : 1.1, mSel == 2 ? 0.8 : 1);
  DrawLblA(mTex_fonts[7], "Become a Member", 200, 347 + sety, COLOR4, 24, ThreeUI.anchors.center, ThreeUI.anchors.center, "center");
  DrawLblA(mTex_fonts[8], "Already Have an Account?", -33 + 200, 392 + sety, COLOR1, 24, ThreeUI.anchors.center, ThreeUI.anchors.center, "center");
  DrawLblA(mTex_fonts[9], "Login", 117 + 200, 392 + sety, COLOR3, 24, ThreeUI.anchors.center, ThreeUI.anchors.center, "center");
}

function Handle_Registration(type) {
  mSel = 0;
  bounds = mTex_BTN0[0].getBounds();
  if (ThreeUI.isInBoundingBox(coords.x, coords.y, bounds.x, bounds.y, bounds.width, bounds.height)) {
    mSel = 1;
  }
  bounds = mTex_BTN0[1].getBounds();
  if (ThreeUI.isInBoundingBox(coords.x, coords.y, bounds.x, bounds.y, bounds.width, bounds.height)) {
    mSel = 2;
  }
  // console.log((mouse.x * ratio).toFixed(2), mouse.y.toFixed(2), mTex_fonts[9].x / 360, -mTex_fonts[9].y / 360, mTex_fonts[9].y);
  if (CircRectsOverlap((mTex_fonts[8].x + 25) / 360, -mTex_fonts[8].y / 360, .4, .07, mouse.x * ratio, mouse.y, .01)) {
    mSel = 3;
  }
  bounds = mTex_radio_on[0].getBounds();
  if (ThreeUI.isInBoundingBox(coords.x, coords.y, bounds.x, bounds.y, bounds.width, bounds.height)) {
    mSel = 5;
  }
  bounds = mTex_radio_off[0].getBounds();
  if (ThreeUI.isInBoundingBox(coords.x, coords.y, bounds.x, bounds.y, bounds.width, bounds.height)) {
    mSel = 6;
  }
  bounds = (mPlayer.autoRenew ? mTex_toggle_on[0] : mTex_toggle_off[0]).getBounds();
  if (ThreeUI.isInBoundingBox(coords.x, coords.y, bounds.x, bounds.y, bounds.width, bounds.height)) {
    mSel = 7;
  }
  if (type == 2) {
    switch (mSel) {
      case 1: setScreen(GAMEMENU); break;
      case 2: setScreen(GAMELANDING); break;
      case 3: setScreen(GAMELOGIN); break;
      case 6:
        if (mTex_radio_off[0].x == -35) {
          DrawTransScal(mTex_radio_off[0], 165, 160 + sety, 64, 64, .82, 1);
          DrawTransScal(mTex_radio_on[0], -35, 160 + sety, 64, 64, .82, 1);
        } else {
          DrawTransScal(mTex_radio_off[0], -35, 160 + sety, 64, 64, .82, 1);
          DrawTransScal(mTex_radio_on[0], 165, 160 + sety, 64, 64, .82, 1);
        }
        break;
      case 7:
        mPlayer.autoRenew = !mPlayer.autoRenew;
        mTex_toggle_off[0].visible = !mPlayer.autoRenew;
        mTex_toggle_on[0].visible = mPlayer.autoRenew;
        break;
    }
    mSel = 0;
  }
}

function Draw_Menu() {

  DrawLblA(mTex_Cookie[0], "Lisa can edit and change this page up\nyou want change text only and also image", 0, 0, COLOR3, 30, ThreeUI.anchors.center, ThreeUI.anchors.center, "center");

  DrawLblA(mTex_fonts[0], "LET'S PLAY MAHJ!", -150, 307, COLOR4, 24, ThreeUI.anchors.center, ThreeUI.anchors.center, "center");
  DrawLblA(mTex_fonts[1], "PERSONAL HAPPENINGS", 150, 307, COLOR4, 24, ThreeUI.anchors.center, ThreeUI.anchors.center, "center");

  DrawTransScal(mTex_BTN0[0], -150, 300, 200, 40, mSel == 1 ? 1.15 : 1.1, mSel == 1 ? 0.8 : 1);
  DrawTransScal(mTex_BTN0[1], 150, 300, 240, 40, mSel == 2 ? 1.15 : 1.1, mSel == 2 ? 0.8 : 1);

}

function Handle_MenuGame(type) {
  mSel = 0;
  bounds = mTex_BTN0[0].getBounds();
  if (ThreeUI.isInBoundingBox(coords.x, coords.y, bounds.x, bounds.y, bounds.width, bounds.height)) {
    mSel = 1;
  }
  bounds = mTex_BTN0[1].getBounds();
  if (ThreeUI.isInBoundingBox(coords.x, coords.y, bounds.x, bounds.y, bounds.width, bounds.height)) {
    mSel = 2;
  }
  console.log("mSel = " + mSel);
  if (type == 2) {
    switch (mSel) {
      case 1:
        setScreen(GAMELANDING);
        break;
      case 2:
        setScreen(GAMELANDING);
        break;
    }mSel = 0;
  }
}
var rac_inc = 80;
var rac_v = 1;
function Draw_Gameplay() {
  camera.fov = 20;
  for (let i = 0; i < mTex_icn.length; i++) {
    DrawTransScal(mTex_icn[i], 50, 50 + rac_inc * i, 72, 72, mSel == (i + 1) ? 1.1 : 1.0, mSel == (i + 1) ? 0.8 : 1);
    mTex_icn[i].visible = true;
  }
  if (rac_v > 1 && rac_inc < 80) {
    rac_inc *= rac_v;
  }
  if (rac_v < 1 && rac_inc > 0) {
    rac_inc *= rac_v;
  }
  // DrawTransScal(mTex_icn[4], 150, 50, 64, 64, mSel == 3 ? 1.4 : 1.3, mSel == 3 ? 0.8 : 1);
  // DrawTransScal(mTex_icn[2], 50, 50, 64, 64, mSel == 3 ? 1.4 : 1.3, mSel == 3 ? 0.8 : 1);
  // DrawTransScal(mTex_icn[0], 50, 150, 64, 64, mSel == 1 ? 1.4 : 1.3, mSel == 1 ? 0.8 : 1);
  // DrawTransScal(mTex_icn[7], 50, 250, 64, 64, mSel == 8 ? 1.4 : 1.3, mSel == 8 ? 0.8 : 1);
  // DrawTransScal(mTex_icn[8], 50, 350, 64, 64, mSel == 9 ? 1.4 : 1.3, mSel == 9 ? 0.8 : 1);
  // DrawTransScal(mTex_icn[1], 50, 450, 64, 64, mSel == 2 ? 1.4 : 1.3, mSel == 2 ? 0.8 : 1);
  // DrawTransScal(mTex_icn[5], 50, 550, 64, 64, mSel == 6 ? 1.4 : 1.3, mSel == 6 ? 0.8 : 1);
  // DrawTransScal(mTex_icn[3], 50, 650, 64, 64, mSel == 4 ? 1.4 : 1.3, mSel == 4 ? 0.8 : 1);

  camera.position.set(0, -22, 30);
  camera.rotation.set(.6, 0, 0);


  DrawTransScal(mTex_Icon1[0], -542, -100, 84, 84, mSel == 4 ? 1.4 : 1.3, mSel == 4 ? 0.8 : 1);
  DrawTransScal(mTex_Icon1[1], -600, 240, 84, 84, mSel == 4 ? 1.4 : 1.3, mSel == 4 ? 0.8 : 1);

  DrawTransScal(mTex_Icon1[2], 500, -300, 84, 84, mSel == 4 ? 1.4 : 1.3, mSel == 4 ? 0.8 : 1);
  DrawTransScal(mTex_Icon1[3], 550, 0, 84, 84, mSel == 4 ? 1.4 : 1.3, mSel == 4 ? 0.8 : 1);

  DrawLblA(mTex_fonts[2], names[0] + "\n(21)", 500, -220, COLOR3, 28, ThreeUI.anchors.center, ThreeUI.anchors.center, "center");
  DrawLblA(mTex_fonts[3], names[1] + "\n(33)", -600, 320, COLOR3, 28, ThreeUI.anchors.center, ThreeUI.anchors.center, "center");
  DrawLblA(mTex_fonts[18], names[2] + "\n(51)", -542, -20, COLOR3, 28, ThreeUI.anchors.center, ThreeUI.anchors.center, "center");
  DrawLblA(mTex_fonts[19], names[3] + "\n(71)", 550, 80, COLOR3, 28, ThreeUI.anchors.center, ThreeUI.anchors.center, "center");
  // camera.position.set(sx, sy - 23, sz + 32);
  // camera.rotation.set(rx + 0.6, ry, rz);

  camera.position.set(0, sy - 45, sz + 65);
  camera.rotation.set(.6, 0, 0);

  mRack.position.set(0, -15, 2);
  ssx = 2.5;
  ssy = 6.6;
  ssz = 2.77;
  srx = 1.7;
  sry = 2.5;
  srz = 8.8;
  for (var i = 52; i < 70; i++) {
    mCube[i].setNew(ssx + srx * 4 - ((i - 52) % 9) * srx, ssy + Math.floor((i - 52) / 9) * sry, 2.1, UP, srz * .1);
  }
  for (var i = 70; i < 88; i++) {
    mCube[i].setNew(-(ssx + srx * 4) + ((i - 70) % 9) * srx, -ssy - Math.floor((i - 70) / 9) * sry, 2.1, BOTTOM, srz * .1);
  }
  for (var i = 88; i < 106; i++) {
    mCube[i].setNew(ssy + Math.floor((i - 88) / 9) * sry, -(ssx + srx * 4) + ((i - 88) % 9) * srx, 2.1, RIGHT, srz * .1);
  }
  for (var i = 106; i < 124; i++) {
    mCube[i].setNew(-ssy - Math.floor((i - 106) / 9) * sry, (ssx + srx * 4) - ((i - 106) % 9) * srx, 2.1, LEFT, srz * .1);
  }

  // switch (Math.floor(sz * 10)) {
  //   case 0:
  //     for (var i = 52; i < 70; i++) {
  //       mCube[i].setNew(sx + rx * 4 - ((i - 52) % 9) * rx, sy + Math.floor((i - 52) / 9) * ry, 2.1, UP, rz * .1);
  //     }
  //     break;
  //   case 1:
  //     for (var i = 70; i < 88; i++) {
  //       mCube[i].setNew(-(sx + rx * 4) + ((i - 70) % 9) * rx, -sy - Math.floor((i - 70) / 9) * ry, 2.1, BOTTOM, rz * .1);
  //     }
  //     break;
  //   case 2:
  //     for (var i = 88; i < 106; i++) {
  //       mCube[i].setNew(sy + Math.floor((i - 88) / 9) * ry, -(sx + rx * 4) + ((i - 88) % 9) * rx, 2.1, RIGHT, rz * .1);
  //     }
  //     break;
  //   case 3:
  //     for (var i = 106; i < 124; i++) {
  //       mCube[i].setNew(-sy - Math.floor((i - 106) / 9) * ry, (sx + rx * 4) - ((i - 106) % 9) * rx, 2.1, LEFT, rz * .1);
  //     }
  //     break;
  // }

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

  // console.log("camera.zoom = " + camera.zoom);
  // camera.zoom = rx;
  if (type == 2) {
    switch (mSel) {
      case 1:

        break;
      case 2: setScreen(GAMELANDING); break;
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
        if (rac_inc >= 70) {
          rac_v = .9;
        }
        if (rac_inc <= 10) {
          rac_inc = 1;
          rac_v = 1.1;
        }
        console.log("rac_inc" + rac_inc);
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
