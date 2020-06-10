function DrawHelp() {
  rod[mRod].Update(scalx,rot);
  if(isScal == 1){
    scalx +=1;
    if(scalx == 62){
      isScal =2;
    }
  }
  if(isScal == 2 && rot > -1.5708){
    rot -=.1;
    if(rot < -1.5708){
      rot = -1.5708;
      isScal = 3;
    }
  }
  if(isScal == 3){
    var rt = mRod+1;
    rt %=planBase.length;
    if(mPlayer.position.x < rod[mRod].plan.scale.y + planBase[mRod].position.x + planBase[mRod].scale.x/2){
      mPlayer.position.x += 1;
    }else{
      isScal = 10;
    }
  }
  if(isScal == 10){
    if(mPlayer.position.x > -35){
      for (var i = 0; i < planBase.length; i++) {
        planBase[i].position.x -=1;
        rod[i].pivot.position.x -=1;
      }
      mPlayer.position.x -=1;
      for(var i=0;i<mp_BG.length;i++){
        mp_BG[i].position.x -= 1;
      }
      for(var i=0;i<mp_BG.length;i++){
        if(mp_BG[i].position.x < -700)
          mp_BG[i].position.x = mp_BG[(i == 0 ? mp_BG.length : i)-1].position.x + 512;//mp_BG[(i == 0 ? mp_BG.length ? i)-1].position.x + 512;
      }

    }else{
      helpNext();
    }
  }
  if(isScal == 11){
    if(mPlayer.position.x < planBase[mRod].position.x+planBase[mRod].scale.x/2 - 3){
      mPlayer.position.x++;
    }else{
      if(planBase[mNxt].position.x > newRand){
        planBase[mNxt].position.x -=5;
      }else{
        isScal =1;
      }
      // console.log(mNxt+"  "+planBase[mNxt].position.x);
      //
    }
  }
  if(isScal == 12){
    if(rot > -3.14){
      rot -=.1;
      if(rot < -3.14){
        rot = -3.14;
      }
    }
    if(mPlayer.position.y > -150){
      mPlayer.position.y--;
    }else{
      setScreen(GAMEOVER);
    }
  }
  for (var i = 0; i < red.length; i++) {
    red[i].position.set(planBase[i].position.x,-35,0);
  }
}
function helpNext(){
  scalx = 0;
  rot = 0;
  mRod++;
  mRod %= planBase.length;
  newRand = 0;
  mNxt = (mRod+1)%planBase.length;
  newRand = 35;
  planBase[mNxt].scale.x = random(10,20);
  planBase[(mRod+1)%planBase.length].position.set(100,-45,0);
  rod[mRod].Setplayer(planBase[mRod].position.x+planBase[mRod].scale.x/2,scalx,rot);
  // mPlayer.position.set(planBase[mRod].position.x+planBase[mRod].scale.x/2 - 3,-33.5,0);
  isScal = 11;
  //
}
function helpReset(){
  var ys = [32.5,32,32,32,32,31.5];
  scalx = 0;
  rot = 0;
  mRod = 0;
  for (var i = 0; i < rod.length; i++) {
    rod[i].pivot.visible = true;
    rod[i].pivot.position.set(1000,0,0);
  }
  for (var i = 0; i < planBase.length; i++) {
    planBase[i].position.set(1000,-45,0);
    planBase[i].scale.x = 15;
    planBase[i].visible = true;
  }
  planBase[mRod].position.set(-35,-45,0);
  planBase[1].position.set(35,-45,0);
  for (var i = 0; i < red.length; i++) {
    red[i].visible = true;
  }
  mRod = 0;
  console.log(mRod+" planBase[mRod].scale.x =  "+planBase[mRod].scale.x);
  rod[mRod].Setplayer(planBase[mRod].position.x+planBase[mRod].scale.x/2,scalx,rot);
  mPlayer.position.set(-35+planBase[mRod].scale.x/2 - 3,-ys[pNo],0);
  mNxt = (mRod+1)%planBase.length;
  isScal = 1;
}
