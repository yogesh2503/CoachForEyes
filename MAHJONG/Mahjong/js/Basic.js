var GameScreen = 0;
const GAMELOGO = 0;
const GAMEMENU = 1;
const GAMEPLAY = 2;
const GAMELOGIN = 3;
const GAMEOVER = 4;
const GAMEREG = 5;
const GAMELEADER = 6;
const GAMELANDING = 7;

const POWERCOUNT = 1000;
const COLOR1 = "#a71c20";
const COLOR2 = "#cda34a";
const COLOR3 = "#132171";
const COLOR4 = "#ffffff";
const COLOR5 = "#000000";
const BOTTOM = 0;
const RIGHT = 1;
const LEFT = 2;
const UP = 3;
var sx = 0,
  sy = 0,
  sz = 0,
  rx = 0,
  ry = 0,
  rz = 0,
  clr = 0;
var loginids = {
  id: "httdivlogin",
  css: "center-block",
  inputbox: [
    {
      placeholder: "Enter e-mail address",
      id: "httloginid",
      lbl: "Email",
      type: "text",
    },
    {
      placeholder: "Enter the Password",
      id: "httloginpass",
      lbl: "Password",
      type: "password",
    },
  ],
};

var regids = {
  id: "httdivreg",
  css: "center-block2",
  inputbox: [
    {
      placeholder: "Enter Username",
      id: "httregname",
      lbl: "Username",
      type: "text",
    },
    {
      placeholder: "Enter e-mail address",
      id: "httregid",
      lbl: "Email",
      type: "text",
    },
    {
      placeholder: "Enter the Password",
      id: "httregpass",
      lbl: "Password",
      type: "password",
    },
  ],
};

function addInputBox(obj) {
  var input_div = document.createElement("div");
  input_div.setAttribute("class", obj.css);
  input_div.setAttribute("id", obj.id);
  for (let i = 0; i < obj.inputbox.length; i++)
    input_div.appendChild(
      inputBox(
        obj.inputbox[i].placeholder,
        obj.inputbox[i].id,
        obj.inputbox[i].lbl,
        obj.inputbox[i].type
      )
    );
  document.body.appendChild(input_div);
  input_div.style.display = "none";
  return input_div;
}

function inputBox(placeholder, id, lbl, type) {
  console.log("inputBox ~~~~~", placeholder, id, lbl);
  var div = document.createElement("div");
  var input = document.createElement("input");
  input.setAttribute("type", type);
  input.setAttribute("id", id);
  input.setAttribute("placeholder", placeholder);
  var label = document.createElement("label");
  label.setAttribute("for", id);
  label.innerHTML = lbl;
  div.appendChild(label);
  div.appendChild(input);
  return div;
}

function loadUI(assetpath, x, y, clickval) {
  var sprite = gameUI.createSprite(assetpath);
  sprite.alpha = 1;
  sprite.x = x;
  sprite.y = y;
  sprite.width = sprite.width * 0.85;
  sprite.height = sprite.height * 0.85;
  sprite.pivot.x = 0.5;
  sprite.pivot.y = 0.5;
  sprite.anchor.x = ThreeUI.anchors.center; // Default
  sprite.anchor.y = ThreeUI.anchors.center; // Default
  sprite.visible = false;
  sprite.alpha = 1;
  if (clickval > 0)
    sprite.onClick(() => {
      Handle_Menu(clickval);
    });
  return sprite;
}

function loadUIS(assetpath, x, y, sx, clickval) {
  var sprite = gameUI.createSprite(assetpath);
  sprite.alpha = 1;
  sprite.x = x;
  sprite.y = y;
  sprite.width = sprite.width * sx;
  sprite.height = sprite.height * sx;
  sprite.pivot.x = 0.5;
  sprite.pivot.y = 0.5;
  sprite.anchor.x = ThreeUI.anchors.center; // Default
  sprite.anchor.y = ThreeUI.anchors.center; // Default
  sprite.visible = false;
  sprite.alpha = 1;
  if (clickval > 0)
    sprite.onClick(() => {
      Handle_Menu(clickval);
    });
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

function DrawTexture(tex, x, y, isvisible) {
  tex.x = x;
  tex.y = y;
  tex.anchor.x = ThreeUI.anchors.center; // Default
  tex.anchor.y = ThreeUI.anchors.center; // Default
  tex.visible = true;
}

function DrawTextureA(tex, x, y, ax, ay) {
  tex.x = x;
  tex.y = y;
  tex.visible = true;
  tex.anchor.x = ax;
  tex.anchor.y = ay;
}

function DrawTransScal(tex, x, y, sx, sy, z, t) {
  tex.x = x;
  tex.y = y;
  // tex.anchor.x = ThreeUI.anchors.center; // Default
  // tex.anchor.y = ThreeUI.anchors.center; // Default
  tex.width = sx * z;
  tex.height = sy * z;
  tex.visible = true;
  tex.alpha = t;
}

function DrawTextureAX(tex, x, y, ax, ay) {
  tex.x = x;
  tex.y = y;
  tex.anchor.x = ax;
  tex.anchor.y = ay;
  tex.visible = true;
}

function DrawLbl(tex, lbl, x, y, color, siz) {
  tex.x = x;
  tex.y = y;
  tex.text = lbl;
  tex.color = color || "#fafafa";
  tex.size = siz || 50;
  tex.anchor.x = ThreeUI.anchors.center;
  tex.anchor.y = ThreeUI.anchors.center;
  tex.visible = true;
}

function DrawLblA(tex, lbl, x, y, color, siz, ax, ay, textAlign) {
  tex.x = x;
  tex.y = y;
  tex.text = lbl;
  tex.color = color || "#fafafa";
  tex.size = siz || 50;
  tex.anchor.x = ax;
  tex.anchor.y = ay;
  tex.textAlign = textAlign;
  tex.visible = true;
}

function loadUIRect(color) {
  var rect = this.gameUI.createRectangle(
    color || "#222222",
    0,
    0,
    window.innerWidth * 3,
    window.innerHeight * 3
  );
  rect.alpha = 1.0;
  rect.anchor.x = ThreeUI.anchors.center;
  rect.anchor.y = ThreeUI.anchors.center;
  return rect;
}

function loadUIBar(x, y, dx, dy, color) {
  console.log(x, y, dx, dy, color);
  var rect = this.gameUI.createRectangle(color, x, y, dx, dy);
  rect.alpha = 1.0;
  rect.anchor.x = ThreeUI.anchors.center;
  rect.anchor.y = ThreeUI.anchors.center;
  rect.visible = false;

  return rect;
}

function createCube(x, y, color) {
  // var material = new THREE.MeshNormalMaterial();
  var material = new THREE.MeshBasicMaterial({ color: color });
  var geometry = new THREE.BoxBufferGeometry(2.0, 2.0, 1.0);
  var cube = new THREE.Mesh(geometry, material);
  cube.position.set(x, y, 0);
  scene.add(cube);
  return cube;
}

function Rect2RectIntersection(ax, ay, adx, ady, bx, by, bdx, bdy) {
  ax -= adx / 2;
  ay += ady / 2;
  bx -= bdx / 2;
  by += bdy / 2;
  if (ax + adx > bx && ay - ady < by && bx + bdx > ax && by - bdy < ay) {
    return true;
  }
  return false;
}

function random(min, max) {
  return min + Math.floor(Math.random() * (max - min));
}

function upWithKeyboard(e) {
  switch (e.keyCode) {
    case 37: //left
      HandleGameplay(0, 2);
      break;
    case 39: //right
      HandleGameplay(1, 2);
      break;
    case 38: //Up
      break;
    case 40: //Down
      HandleGameplay(2, 2);
      break;
  }
}

function dealWithKeyboard(e) {
  var vs = 1,
    rs = 0.1;
  switch (e.keyCode) {
    case 188:
      // Handle_Menu(18);
      break;
    case 190:
      // Handle_Menu(19);
      break;
    case 37:
      // Handle_Menu(18);
      sx = sx - vs;
      break;
    case 38:
      sz = sz + vs;
      break;
    case 39:
      // Handle_Menu(19)
      sx = sx + vs;
      break;
    case 40:
      sz = sz - vs;
      break;
    case 65:
      sy = sy + vs;
      break;
    case 66:
    case 90:
      sy = sy - vs;
      break;
    case 49:
      rx = rx - rs;
      break;
    case 50:
      rx = rx + rs;
      break;
    case 52:
      ry = ry + rs;
      break;
    case 53:
      ry = ry - rs;
      break;
    case 55:
      rz = rz + rs;
      break;
    case 56:
      rz = rz - rs;
      break;
    case 57:
      sx = sy = sz = 0;
      break;
    case 54:
      rx = ry = rz = 0;
      // gamereset();
      break;
  }
  console.log("sx = " + sx + ", sy = " + sy + ", sz =" + sz);
  console.log(e.keyCode + " rx = " + rx + ", ry = " + ry + ", rz =" + rz);
}

function createColor() {
  clr += 0.1;
  var frequency = 1;
  r = Math.floor(Math.sin(frequency * clr + 0) * 127 + 128);
  g = Math.floor(Math.sin(frequency * clr + 2) * 127 + 128);
  b = Math.floor(Math.sin(frequency * clr + 4) * 127 + 128);
  return new THREE.Color("rgb(" + r + "," + g + "," + b + ")");
}

function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? new THREE.Color(
        "rgb(" +
          parseInt(result[1], 16) +
          "," +
          parseInt(result[2], 16) +
          "," +
          parseInt(result[3], 16) +
          ")"
      )
    : null;
}

var isMobile = {
  Android: function () {
    return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function () {
    return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function () {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: function () {
    return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function () {
    return (
      navigator.userAgent.match(/IEMobile/i) ||
      navigator.userAgent.match(/WPDesktop/i)
    );
  },
  any: function () {
    return (
      isMobile.Android() ||
      isMobile.BlackBerry() ||
      isMobile.iOS() ||
      isMobile.Opera() ||
      isMobile.Windows()
    );
  },
};
