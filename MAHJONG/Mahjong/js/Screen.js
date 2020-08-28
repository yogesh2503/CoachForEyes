var counter = 0, meshLoading, isResize = 0, mTex_logo = null, objCount = 0, mHScore = 0, mScore = 0, setVal = true, isResize = 0, ratio = 1, mSel = 0;
var scene, camera, clock, renderer, water, gameUI, mPlyer;
var div_Login, div_Regis;
var mTex_fontsclr = Array(), mTex_Cookie = [], mTex_fontsBold = [], mTex_fonts = Array(20), mTex_BTN0 = [], mTex_BTN1 = [], mTex_Icon = [];
var mRectCLR = Array(), mTex_btn = Array(2), mTex_button = Array(3), mTex_icn = Array(9), mTex_ply = Array(1);
var mTex_Title, mTex_top, mTex_coinbar, mTex_popup, mTex_win, mTex_Right, mTex_gold_stroke, mTxt_Load;
var mTex_Logo2, mTex_forColor, mTex_CardBack;
var mTex_flower_fullcolor;
var mTex_radio_off, mTex_radio_on, mTex_toggle_off, mTex_toggle_on;


function setScreen(scr) {
    console.log("scr = " + scr);
    GameScreen = scr;
    mTex_fontsBold.forEach((element) => { element.visible = false; });
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
    mPlan_Green.visible = mTex_gold_stroke.visible = mTex_win.visible = mTex_coinbar.visible = mTex_popup.visible = false;
    mTex_radio_off.visible = mTex_radio_on.visible = mTex_toggle_off.visible = mTex_toggle_on.visible = false;
    mTex_flower_fullcolor.visible = m3d_table.visible = false;
    div_Regis.style.display = div_Login.style.display = "none";
    camera.position.set(0, -23, 32);
    camera.rotation.set(0.6, 0, 0);
    mPlan_Icon.visible = false;
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
            camera.position.set(0, 0, 66);
            camera.rotation.set(0, 0, 0);
            m2D_Background.position.set(0, 0, -1.7);
            m2D_Background.rotation.set(0, 0, 0);
            mPlan_Green.rotation.set(0, 0, 0);
            mPlan_Green.visible = true;
            DrawLblA(mTex_fonts[2], "Already Have an Account? ", -65, 320, COLOR1, 30, ThreeUI.anchors.center, ThreeUI.anchors.center, "center");
            DrawLblA(mTex_fonts[3], "Login", 150, 320, COLOR3, 30, ThreeUI.anchors.center, ThreeUI.anchors.center, "center");
            div_Regis.style.display = "block";
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
            mPlan_Icon.visible = true;
            m2D_Background.traverse(function (child) { if (child.isMesh) { child.material.map = mTex_BG[1]; } });
            camera.position.set(0, 0, 66);
            camera.rotation.set(0, 0, 0);
            m2D_Background.position.set(0, 0, -1.7);

            camera.rotation.set(.2, 0, -.4);
            m2D_Background.rotation.set(.2, 0, -.4);
            m2D_Background.position.set(0, 13.4, -.2);
            mPlan_Green.position.set(14.2, 7.2, .1);
            mPlan_Green.rotation.set(.2, 0, -.4);
            mPlan_Green.scale.set(4.3, 3.35, 1);
            mPlan_Green.visible = true;
            DrawTransScal(mTex_Title, -380, -200, 512, 256, 1, 1);
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


            DrawLblA(mTex_Cookie[0], "Play  online  mah jongg  with  your\nNational MahJongg League 2020 card", -20, - 290, COLOR4, 50, ThreeUI.anchors.center, ThreeUI.anchors.center, "left");
            DrawLblA(mTex_Cookie[1], "Play with Friends,Computer Bots\nand Meet New Friends", -20, - 170, COLOR4, 50, ThreeUI.anchors.center, ThreeUI.anchors.center, "left");
            DrawLblA(mTex_Cookie[2], "Mah Jongg fun, games and challenges", -20, -38, COLOR4, 50, ThreeUI.anchors.center, ThreeUI.anchors.center, "left");

            DrawTransScal(mTex_Icon[0], -70, -270, 84, 84, 1, 1);
            DrawTransScal(mTex_Icon[1], -70, -160, 84, 84, 1, 1);
            DrawTransScal(mTex_Icon[2], -70, -50, 84, 84, 1, 1);


            DrawLblA(mTex_fonts[0], "LET'S\nPLAY\nMAHJ!", 15, 80, COLOR4, 32, ThreeUI.anchors.center, ThreeUI.anchors.center, "center");
            DrawLblA(mTex_fonts[1], "MY PROFILE", 220, 110, COLOR4, 32, ThreeUI.anchors.center, ThreeUI.anchors.center, "center");
            DrawLblA(mTex_fonts[2], "LET'S\nMAHJ\nNEWS", 420, 80, COLOR4, 32, ThreeUI.anchors.center, ThreeUI.anchors.center, "center");

            DrawLblA(mTex_fonts[3], "JOIN THE\nMAHJ\nGROUP", 17, 240, COLOR4, 32, ThreeUI.anchors.center, ThreeUI.anchors.center, "center");
            DrawLblA(mTex_fonts[4], "TOURNAMENTS", 220, 270, COLOR4, 26, ThreeUI.anchors.center, ThreeUI.anchors.center, "center");
            DrawLblA(mTex_fonts[5], "FAQ", 420, 270, COLOR4, 32, ThreeUI.anchors.center, ThreeUI.anchors.center, "center");


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
