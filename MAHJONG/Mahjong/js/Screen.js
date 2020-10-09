var counter = 0, meshLoading, isResize = 0, mTex_logo = null, objCount = 0, mHScore = 0, mScore = 0, setVal = true, isResize = 0, ratio = 1, mSel = 0;
var scene, camera, clock, renderer, water, gameUI, mPlyer;
var div_Login, div_Regis, div_recieve, div_Search;
var mTex_fontsclr = Array(), mTex_Cookie = [], mTex_fontsBold = [], mTex_fonts = Array(24), mTex_BTN0 = [], mTex_BTN1 = [], mTex_Icon = [], mTex_Icon1 = [];
var mRectCLR = Array(), mTex_btn = Array(2), mTex_button = Array(3), mTex_icn = Array(9), mTex_ply = Array(1);
var mTex_Title, mTex_top, mTex_coinbar, mTex_popup, mTex_win, mTex_Right, mTex_gold_stroke = [], mTxt_Load;
var mTex_Logo2, mTex_forColor, mTex_CardBack, mTex_Pic;
var mTex_flower_fullcolor;
var mTex_radio_off = [], mTex_radio_on = [], mTex_toggle_off = [], mTex_toggle_on = [];
class Player {
    constructor() {
        this.autoRenew = true;
        this.isMonthly = true;
        this.keeplogin = true;
    }
}
var mPlayer = new Player();
function setScreen(scr) {
    console.log("scr = " + scr);
    GameScreen = scr;
    mTex_gold_stroke.forEach((element) => { element.visible = false; });
    mTex_radio_off.forEach((element) => { element.visible = false; });
    mTex_radio_on.forEach((element) => { element.visible = false; });
    mTex_toggle_off.forEach((element) => { element.visible = false; });
    mTex_toggle_on.forEach((element) => { element.visible = false; });
    mTex_fontsBold.forEach((element) => { element.visible = false; });
    mTex_Cookie.forEach((element) => { element.visible = false; });
    mTex_BTN1.forEach((element) => { element.visible = false; });
    mTex_BTN0.forEach((element) => { element.visible = false; });
    mTex_icn.forEach((element) => { element.visible = false; });
    mTex_Icon.forEach((element) => { element.visible = false; });
    mTex_Icon1.forEach((element) => { element.visible = false; });
    mCube.forEach((element) => { element.group.visible = false; });
    mTex_fonts.forEach((element) => { element.visible = false; });
    mTex_button.forEach((element) => { element.visible = false; });
    mTex_btn.forEach((element) => { element.visible = false; });
    mTex_ply.forEach((element) => { element.visible = false; });
    mTex_Logo2.visible = mTex_top.visible = mTex_Title.visible = mTex_logo.visible = meshLoading.visible = false;
    mPlan_Green.visible = mTex_win.visible = mTex_coinbar.visible = mTex_popup.visible = false;
    mTex_Pic.visible = false;
    mTex_flower_fullcolor.visible = m3d_table.visible = false;
    div_Search.style.display = div_recieve.style.display = div_Regis.style.display = div_Login.style.display = "none";
    camera.position.set(0, 0, 66);
    camera.rotation.set(0, 0, 0);
    m2D_Background.position.set(0, 0, -1.7);
    m2D_Background.rotation.set(0, 0, 0);
    mPlan_Green.rotation.set(0, 0, 0);
    mRack.visible = false;
    mPlan_Icon.visible = false;
    m2D_Background.traverse(function (child) { if (child.isMesh) { child.material.map = mTex_BG[1]; } });
    camera.fov = 45;
    isResize = 1;
    switch (GameScreen) {
        case GAMELOGO: mTex_logo.visible = true;
            break;
        case GAMEFRIEND:
            m2D_Background.traverse(function (child) { if (child.isMesh) { child.material.map = mTex_BG[0]; } });
            m2D_Background.position.set(0, 0, -1.7);
            m2D_Background.rotation.set(0, 0, 0);
            m2D_Background.visible = true;
            div_Search.style.display = "block";
            var c = div_recieve.childNodes;
            if (isMobile.any()) {
                for (let i = 0; i < c.length; i++) {
                    c[i].childNodes[0].style.fontSize = 10 + "px";
                }
            } else {
                for (let i = 0; i < c.length; i++) {
                    c[i].childNodes[0].style.fontSize = 14 + "px";

                }
            }
            div_Search.style.top = 20 + "%";
            div_Search.style.left = (50 - (window.innerHeight / window.innerWidth) * 56) + "%";
            div_Search.style.width = (window.innerHeight / window.innerWidth) * 40 + "%";
            break;
        case GAMEJOIN:
            m2D_Background.visible = true;
            // mPlan_Icon.visible = true;
            camera.position.set(0, 0, 66);
            camera.rotation.set(0, 0, 0);
            m2D_Background.position.set(0, 0, -1.7);
            break;
        case GAMEPROFILE:
            mPlan_Green.visible = true;
            m2D_Background.rotation.set(0, 0, 0);
            mPlan_Green.scale.set(1.0, 3.33, 1);
            mPlan_Green.position.set(- 40.1, 0, .1);

            div_recieve.style.display = "block";
            var c = div_recieve.childNodes;
            if (isMobile.any()) {
                for (let i = 0; i < c.length; i++) {
                    c[i].childNodes[0].style.fontSize = 10 + "px";
                }
            } else {
                for (let i = 0; i < c.length; i++) {
                    c[i].childNodes[0].style.fontSize = 14 + "px";

                }
            }
            div_recieve.style.left = (50 - (window.innerHeight / window.innerWidth) * 56) + "%";
            div_recieve.style.width = (window.innerHeight / window.innerWidth) * 36 + "%";
            break;
        case GAMELOGIN:
            m2D_Background.visible = true;
            mTex_Title.visible = true;
            mTex_Title.y = -250;
            DrawLblA(mTex_Cookie[0], "Join the Mahj Group!", 200, -250, COLOR3, 56, ThreeUI.anchors.center, ThreeUI.anchors.center, "center");
            DrawTransScal(mTex_gold_stroke[0], 200, -190, 512, 64, .8, 1);
            DrawLblA(mTex_fonts[0], "LOGIN", 200, 57, COLOR4, 26, ThreeUI.anchors.center, ThreeUI.anchors.center, "center");
            mPlan_Green.scale.set(2.0, 2.0, 1);

            mPlan_Green.rotation.set(0, 0, 0);
            mPlan_Green.visible = true;
            mPlan_Green.scale.set(2.0, 2.0, 1);
            mPlan_Green.position.set(-32.1, 10.6, .1);
            mPlan_Green.rotation.set(0, 0, 0);
            mPlan_Green.visible = true;
            DrawTransScal(mTex_Title, -490 + sx, -290, 512 * .4, 256 * .4, 1, 1);
            DrawTransScal(mTex_flower_fullcolor, -350, -50, 512, 512, .72, 1);
            div_Login.style.display = "block";
            var c = div_Login.childNodes;
            if (isMobile.any()) {
                for (let i = 0; i < c.length; i++) {
                    c[i].childNodes[0].style.fontSize = 10 + "px";
                }
            } else {
                for (let i = 0; i < c.length; i++) {
                    c[i].childNodes[0].style.fontSize = 18 + "px";

                }
            }
            div_Login.style.width = (window.innerHeight / window.innerWidth) * 80 + "%";

            break;
        case GAMEREG:
            camera.position.set(0, 0, 66);
            camera.rotation.set(0, 0, 0);
            m2D_Background.position.set(0, 0, -1.7);
            m2D_Background.rotation.set(0, 0, 0);
            div_Regis.style.display = "block";
            var c = div_Regis.childNodes;
            if (isMobile.any()) {
                for (let i = 0; i < c.length; i++) {
                    c[i].childNodes[0].style.fontSize = 10 + "px";
                }
            } else {
                for (let i = 0; i < c.length; i++) {
                    c[i].childNodes[0].style.fontSize = 18 + "px";

                }
            }
            div_Regis.style.width = (window.innerHeight / window.innerWidth) * 80 + "%";

            mPlan_Green.scale.set(2.0, 2.0, 1);
            mPlan_Green.position.set(-32.1, 10.6, .1);
            mPlan_Green.rotation.set(0, 0, 0);
            mPlan_Green.visible = true;

            DrawTransScal(mTex_flower_fullcolor, -350, -50, 512, 512, .72, 1);
            DrawLblA(mTex_Cookie[0], "Join the Mahj Group!", 200, -300, COLOR3, 56, ThreeUI.anchors.center, ThreeUI.anchors.center, "center");
            DrawTransScal(mTex_gold_stroke[0], 200, -260, 512, 64, .8, 1);

            DrawLblA(mTex_fonts[0], "Play Free for 2 weeks...unlimited games!", 200, -210, COLOR3, 29, ThreeUI.anchors.center, ThreeUI.anchors.center, "center");
            DrawLblA(mTex_fonts[1], "Begin Free Trial", 200, 67 + sety, COLOR4, 24, ThreeUI.anchors.center, ThreeUI.anchors.center, "center");
            DrawLblA(mTex_fontsBold[0], "Become a Member", 200, 120 + sety, COLOR3, 34, ThreeUI.anchors.center, ThreeUI.anchors.center, "center");
            DrawLblA(mTex_fonts[2], "Monthly $ 7.50", -10, 167 + sety, COLOR3, 24, ThreeUI.anchors.center, ThreeUI.anchors.center, "left");
            DrawLblA(mTex_fonts[3], "Annually $75.00 ($6.25/month)", 190, 167 + sety, COLOR3, 24, ThreeUI.anchors.center, ThreeUI.anchors.center, "left");
            DrawLblA(mTex_fonts[4], "Automatically renew*", -10, 207 + sety, COLOR3, 24, ThreeUI.anchors.center, ThreeUI.anchors.center, "left");

            DrawTransScal(mTex_Icon[0], -40, 247 + sety, 44, 44, 1, 1);
            DrawLblA(mTex_fonts[5], "A portion of every annual membership goes to charity.\nFor more information click here (takes you to faq)", 10, 247 + sety, COLOR3, 20, ThreeUI.anchors.center, ThreeUI.anchors.center, "left");
            DrawLblA(mTex_fonts[6], "*If you wish to cancel your membership you must do so 48 hours prior to renewal\ndate. Your membership will be valid through your paid subscription date.", -20, 292 + sety, COLOR3, 16, ThreeUI.anchors.center, ThreeUI.anchors.center, "left");


            if (mPlayer.isMonthly) {
                DrawTransScal(mTex_radio_off[0], 165, 160 + sety, 64, 64, .82, 1);
                DrawTransScal(mTex_radio_on[0], -35, 160 + sety, 64, 64, .82, 1);
            } else {
                DrawTransScal(mTex_radio_off[0], -35, 160 + sety, 64, 64, .82, 1);
                DrawTransScal(mTex_radio_on[0], 165, 160 + sety, 64, 64, .82, 1);
            }
            DrawTransScal(mTex_toggle_on[0], -42, 200 + sety, 64, 64, .82, 1);
            DrawTransScal(mTex_toggle_off[0], -42, 200 + sety, 64, 64, .82, 1);
            mTex_toggle_off[0].visible = !mPlayer.autoRenew;
            mTex_toggle_on[0].visible = mPlayer.autoRenew;
            DrawTransScal(mTex_Title, -490 + sx, -290, 512 * .4, 256 * .4, 1, 1);
            console.log("~~~~~~~~~~~reg");
            break;
        case GAMEMENU:
            m2D_Background.visible = true;
            break;
        case GAMELANDING:
            m2D_Background.visible = true;
            mPlan_Icon.visible = true;

            camera.position.set(0, 0, 66);
            camera.rotation.set(0, 0, 0);
            m2D_Background.position.set(0, 0, -1.7);

            camera.rotation.set(.2, 0, -.4);
            m2D_Background.rotation.set(.2, 0, -.4);
            m2D_Background.position.set(0, 13.4, -.2);
            mPlan_Green.position.set(12.9, 7.8, .1);
            mPlan_Green.rotation.set(.2, 0, -.4);
            mPlan_Green.scale.set(4.25, 3.2, 1);
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
            DrawLblA(mTex_fonts[1], "PLAY 2 WEEKS\nFREE", 220, 100, COLOR4, 26, ThreeUI.anchors.center, ThreeUI.anchors.center, "center");
            DrawLblA(mTex_fonts[2], "MY\nPROFILE", 420, 95, COLOR4, 32, ThreeUI.anchors.center, ThreeUI.anchors.center, "center");
            DrawLblA(mTex_fonts[3], "JOIN THE\nMAHJ\nGROUP", 17, 240, COLOR4, 32, ThreeUI.anchors.center, ThreeUI.anchors.center, "center");
            DrawLblA(mTex_fonts[4], "LET'S MAHJ\nHAPPENINGS", 220, 260, COLOR4, 26, ThreeUI.anchors.center, ThreeUI.anchors.center, "center");
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
            DrawTextureAX(mTex_icn[1], 50, 50, ThreeUI.anchors.right, ThreeUI.anchors.top);
            DrawTextureAX(mTex_icn[5], 50, 150, ThreeUI.anchors.right, ThreeUI.anchors.top);
            DrawTextureAX(mTex_icn[3], 50, 250, ThreeUI.anchors.right, ThreeUI.anchors.top);
            DrawTextureAX(mTex_icn[2], 50, 50, ThreeUI.anchors.right, ThreeUI.anchors.top);
            DrawTextureAX(mTex_icn[0], 50, 150, ThreeUI.anchors.right, ThreeUI.anchors.top);
            DrawTextureAX(mTex_icn[7], 50, 150, ThreeUI.anchors.right, ThreeUI.anchors.top);
            DrawTextureAX(mTex_icn[8], 50, 150, ThreeUI.anchors.right, ThreeUI.anchors.top);
            for (let i = 0; i < mTex_icn.length; i++) {
                DrawTextureAX(mTex_icn[i], 50, 50, ThreeUI.anchors.right, ThreeUI.anchors.top);
            }

            // DrawLblA(mTex_fonts[2], names[0], -108, -262, COLOR4, 22, ThreeUI.anchors.center, ThreeUI.anchors.center, "center");
            // DrawLblA(mTex_fonts[3], names[1], 208, 242, COLOR4, 28, ThreeUI.anchors.center, ThreeUI.anchors.center, "center");
            // DrawLblA(mTex_fonts[18], names[2], -346, 82, COLOR4, 26, ThreeUI.anchors.center, ThreeUI.anchors.center, "center");
            // DrawLblA(mTex_fonts[19], names[3], 260, -182, COLOR4, 24, ThreeUI.anchors.center, ThreeUI.anchors.center, "center");
            // mTex_fonts[18].rotation = 100;
            // mTex_fonts[19].rotation = 80;
            setGameCards();
            mCube.forEach((element) => {
                element.group.visible = true;
            });
            camera.fov = 20;
            mRack.visible = true;
            break;
    }
}
