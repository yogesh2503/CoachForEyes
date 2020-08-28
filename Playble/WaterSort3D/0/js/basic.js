document.addEventListener("keydown", dealWithKeyboard);
var sx = 0,sy = 0,sz = 0,rx = 0,ry = 0,rz = 0,clr = 0;
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
