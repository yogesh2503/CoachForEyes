class User {
    constructor() {
        this.UserSessionID = '';
        this.PinCode = '';
        this.name = '';
        this.phone = '';
        this.contry = '';
        this.area = '';
        this.date = '';
        this.CouponCode = '';
        this.ExtendCouponCode = '';
        this.GameHighScore = 0;
        this.GameID = "3";
        this.allbest = 10;
    }
}
var gameuser = new User();

var couponids = {
    "id": "httdivcoupon",
    "inputbox": [{
        "placeholder": "Enter coupon code",
        "id": "httincode"
    }]
}

function addInputBox(obj) {
    var input_div = document.createElement('div');
    input_div.setAttribute('class', 'center-block');
    input_div.setAttribute('id', obj.id);
    for (let i = 0; i < obj.inputbox.length; i++)
        input_div.appendChild(inputBox(obj.inputbox[i].placeholder, obj.inputbox[i].id, 'Coupon:'));
    document.body.appendChild(input_div);
    input_div.style.display = "none";
    return input_div;
}
var cinput;

function inputBox(placeholder, id, lbl) {

    var div = document.createElement('div');

    cinput = document.createElement('input');
    cinput.setAttribute('type', 'text');
    cinput.setAttribute('id', id);
    cinput.setAttribute('placeholder', placeholder);

    var label = document.createElement('label');
    label.setAttribute('for', id);
    label.innerHTML = lbl;

    div.appendChild(label);
    div.appendChild(cinput);
    return cinput;



}

var sid = 'htt3';

function getStore() {
    console.log("htt3 ~~~[UserSessionIDhtt3]~~~~setStore JS~~22~~~~5__");
    console.log(sid + " ~~~[" + "UserSessionID" + sid + "]~~~~setStore JS~~22~~~~" + localStorage.getItem("UserSessionID" + sid, ''));
    try {
        gameuser.UserSessionID = localStorage.getItem("UserSessionID" + sid, '');
        gameuser.PinCode = localStorage.getItem("PinCode" + sid, '');
        gameuser.name = localStorage.getItem("name" + sid, '');
        gameuser.phone = localStorage.getItem("phone" + sid, '');
        gameuser.contry = localStorage.getItem("contry" + sid, '');
        gameuser.area = localStorage.getItem("area" + sid, '');
        gameuser.date = localStorage.getItem("date" + sid, '');
        gameuser.CouponCode = localStorage.getItem("CouponCode" + sid, '');
    } catch (err) {
        console.log("~~~~~~~setStore JS~~~~~~" + err);
    }
    if (!gameuser.UserSessionID) {
        window.location.href = "./index.html";
    }
    console.log(JSON.stringify(gameuser));
    console.log("~~~~~~~setStore JS~~~~~~" + gameuser.UserSessionID);
    // alert("Not Valid ID");
    setStore();
}

function setStore() {
    try {
        localStorage.setItem("UserSessionID" + sid, '');
        localStorage.setItem("PinCode" + sid, '');
        localStorage.setItem("name" + sid, '');
        localStorage.setItem("phone" + sid, '');
        localStorage.setItem("contry" + sid, '');
        localStorage.setItem("area" + sid, '');
        localStorage.setItem("date" + sid, '');
        localStorage.setItem("CouponCode" + sid, '');
    } catch (err) {
        console.log("~~~~~~~setStore JS~~~~~~" + err);
    }
    console.log("~~~~~~call~setStore JS~~~~~~");
}


function submitScore() {
    var data = JSON.stringify({ "UserSessionID": gameuser.UserSessionID, "GameID": gameuser.GameID, "MainCouponCode": gameuser.CouponCode, "UserScore": mScore, "ExtendCouponCode": gameuser.ExtendCouponCode });
    console.log("~~~~~~submitScore~~~~~~");
    console.log(data);
    var xhr = new XMLHttpRequest();
    // xhr.withCredentials = true;
    lastScreen = GameScreen;
    GameScreen = GAMELODING;
    // meshLoading.visible = true;
    // uiExit.visible = false;
    xhr.addEventListener("readystatechange", function() {
        if (this.readyState === 4) {
            console.log(this.responseText);
            var json = JSON.parse(this.responseText);
            if (json.Success) {
                window.location.href = json.Link;
            } else {
                alert(this.responseText);
            }
        }
        GameScreen = lastScreen;
        // meshLoading.visible = false;
        // uiExit.visible = true;
    });
    xhr.open("POST", "https://www.anzrottaps.com/api/Games/SaveScore");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(data);
}
var lastScreen = 0;

function validateagain(str) {
    console.log(str + "~~validateagain mScore~~" + mScore);
    CouponCode = str;
    var data = JSON.stringify({
        "CouponCode": str
    });
    GameScreen
    GameScreen = GAMELODING;
    var xhr = new XMLHttpRequest();
    xhr.addEventListener("readystatechange", function() {
        if (this.readyState === 4) {
            json = JSON.parse(this.responseText);
            // console.log(json.Valid + "~~SignIn 0~~" + this.responseText);
            if (json.Valid == true) {
                setSCreen(GAMEPLAY);
                gameuser.ExtendCouponCode += str + "|";
            } else {
                setSCreen(GAMEEXT);
                alert("Coupons you've entered is not valid"); //newone
            }
        }
    });
    xhr.open("POST", "https://www.anzrottaps.com/api/Games/ValidateExtend");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(data);
}

function GetBestScore() {
    var data = JSON.stringify({ "GameID": gameuser.GameID });
    console.log("GetBestScore~~~~~~> " + data);
    var xhr = new XMLHttpRequest();
    xhr.addEventListener("readystatechange", function() {
        if (this.readyState === 4) {
            console.log(this.responseText);
            json = JSON.parse(this.responseText);
            gameuser.allbest = parseInt(json.GameHighScore);
            if (GameScreen == GAMEOVER) {
                if (gameuser.allbest < mScore) {
                    gameuser.allbest = mScore;
                }
                text.text = 'Score : ' + mScore + ' \n\nBest : ' + gameuser.allbest;
            }
            console.log("gameuser.allbest~~~~0~~> " + gameuser.allbest);
        }
    });

    xhr.open("POST", "https://www.anzrottaps.com/api/Games/GameHighScore");
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.send(data);
}