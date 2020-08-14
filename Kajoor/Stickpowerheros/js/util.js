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

var gender = ['male', 'female'];
var city = ["Dubai", "Sharjah", "Abu Dhabi", "Ajman", "Ras al-Khaimah", "Musaffah City", "Al Fujairah City", "Khalifah A City", "Reef Al Fujairah City", "Bani Yas City", "Zayed City ", "	Umm al-Quwain", ];
var contry = ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua", "Argentina", "Armenia", "Australia", "Austria", "Austrian Empire", "Azerbaijan", "Baden*", "Bahamas, The",
    "Bahrain", "Bangladesh", "Barbados", "Bavaria*", "Belarus", "Belgium", "Belize", "Benin", "Bolivia", "Bosnia", "Botswana", "Brazil", "Brunei", "Brunswick", "Bulgaria", "Burkina Faso", "Burma", "Burundi",
    "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Cayman Islands", "CAR", "CAF", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo Free State", "Costa Rica", "Cote d’Ivoire", "Croatia", "Cuba",
    "Cyprus", "Czechia", "Czechoslovakia", "DRC", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Duchy of Parma", "East Germany", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea",
    "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Germany", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "GDT", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana",
    "Haiti", "Hanover*", "Hanseatic Republics", "Hawaii", "Hesse", "Holy See", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica",
    "Japan", "Jordan", "Kazakhstan", "Kenya", "Serbia", "Kiribati", "Korea", "Kosovo", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Lew Chew", "Liberia", "Libya", "Liechtenstein", "Lithuania",
    "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mecklenburg-Schwerin", "Mexico", "Micronesia", "Moldova",
    "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Namibia", "Nassau", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Norway", "Oldenburg", "Oman",
    "Pakistan", "Palau", "Panama", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "South Korea", "Romania", "Russia", "Rwanda", "Saint Lucia", "Samoa", "San Marino", "Saudi Arabia", "Schaumburg-Lippe",
    "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Somalia", "South Africa", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria",
    "Tajikistan", "Tanzania", "Texas", "Thailand", "Timor-Leste", "Togo", "Tonga", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "UAE", "UK", "Uruguay", "Uzbekistan", "Vanuatu", "Venezuela", "Vietnam",
    "Yemen", "Zambia", "Zimbabwe"
]

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

function inputBox(placeholder, id, lbl) {

    var div = document.createElement('div');

    var input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.setAttribute('id', id);
    input.setAttribute('placeholder', placeholder);

    // var label = document.createElement('label');
    // label.setAttribute('for', id);
    // label.innerHTML = lbl;

    // div.appendChild(label);
    div.appendChild(input);
    return input;



}


function addregistertion() {
    var reg_div = document.createElement('div');
    reg_div.setAttribute('class', 'center-block');
    reg_div.setAttribute('id', 'httreg');
    // reg_div.appendChild(inputBox("Enter Phone Number", 'httphone', 'Phone No.:'));
    // reg_div.appendChild(selectTag(gender, 'Gender'));
    // reg_div.appendChild(selectTag(city, 'City'));
    // reg_div.appendChild(bateofbirth());
    reg_div.appendChild(table());
    document.body.appendChild(reg_div);
    reg_div.style.display = "none";
    return reg_div;
}

function selectTag(val, lbl) {
    var div = document.createElement('div');
    var Select = document.createElement('Select');
    Select.setAttribute('id', 'httcontryid');
    for (var i = 0; i < val.length; i++) {
        var option = document.createElement("option");
        option.text = val[i];
        Select.add(option);
    }
    var label = document.createElement('label');
    label.setAttribute('for', 'httdateid');
    label.innerHTML = lbl;

    div.appendChild(label);
    div.appendChild(Select);
    return Select;

}

function bateofbirth() {
    var div = document.createElement('div');
    var input = document.createElement('input');
    input.setAttribute('type', 'date');
    input.setAttribute('id', 'httdateid');
    input.setAttribute('name', 'birthday');

    var label = document.createElement('label');
    label.setAttribute('for', 'httdateid');
    label.innerHTML = "Birthday:";

    div.appendChild(label);
    div.appendChild(input);
    return input;

}

function table() {
    var table = document.createElement('table');
    for (let i = 0; i < 4; i++) {
        var tr = document.createElement('tr');
        for (let j = 0; j < 2; j++) {
            var th = document.createElement('th');
            var label;
            if (j == 0) {
                label = document.createElement('label');
                label.setAttribute('for', 'httdateid');
                if (i == 0)
                    label.innerHTML = 'PhoneNo.';
                if (i == 1)
                    label.innerHTML = 'Gender';
                if (i == 2)
                    label.innerHTML = 'City';
                if (i == 3)
                    label.innerHTML = 'Birthday';
            } else {
                if (i == 0)
                    label = inputBox("Enter Phone Number", 'httphone', 'Phone No.:');
                if (i == 1)
                    label = selectTag(gender, 'Gender');
                if (i == 2)
                    label = selectTag(city, 'City');
                if (i == 3)
                    label = bateofbirth();

            }
            th.appendChild(label);
            tr.appendChild(th);
        }
        table.appendChild(tr);
    }
    return table;
}

function parseURLParams(url) {
    // var url_string = window.location;
    // var url = new URL(url_string);
    // gameuser.UserSessionID = url.searchParams.get("UserSessionID");
    // gameuser.PinCode = url.searchParams.get("PinCode");
    // gameuser.name = url.searchParams.get("name");
    // gameuser.phone = url.searchParams.get("phone");
    // gameuser.contry = url.searchParams.get("contry");
    // gameuser.area = url.searchParams.get("area");
    // gameuser.date = url.searchParams.get("date");
    // gameuser.CouponCode = url.searchParams.get("CouponCode");
    // console.log(gameuser);
    getStore();
}
var sid = 'htt';

function getStore() {
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
        // console.log("~~~~~~~setStore JS~~~~~~" + err);
    }
    if (!gameuser.UserSessionID) {
        window.location.href = "./index.html";
    }
    // console.log(gameuser.UserSessionID + " ~p~ " + gameuser.PinCode + " ~~n~~ " + gameuser.name + " ~p~ " + gameuser.phone + " ~c~ " + gameuser.contry + " ~a~ " + gameuser.area + " ~d~ " + gameuser.date + " ~c~ " + gameuser.CouponCode);
    // console.log(gameuser);
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
        // console.log("~~~~~~~setStore JS~~~~~~" + err);
    }
    // console.log("~~~~~~call~setStore JS~~~~~~");
}
var scrrr = 0;

function submitScore(scr) {
    var data = JSON.stringify({ "UserSessionID": gameuser.UserSessionID, "GameID": "1", "MainCouponCode": gameuser.CouponCode, "UserScore": mHScore, "ExtendCouponCode": gameuser.ExtendCouponCode });
    console.log("~~~~~~submitScore~~~~~~");
    scrrr = scr;
    console.log(data);
    var xhr = new XMLHttpRequest();
    // xhr.withCredentials = true;
    lastScreen = GameScreen;
    GameScreen = GAMELODING;
    meshLoading.visible = true;
    uiExit.visible = false;
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
        meshLoading.visible = false;
        uiExit.visible = true;
    });
    xhr.open("POST", "https://www.anzrottaps.com/api/Games/SaveScore");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(data);
}
var lastScreen = 0;

function validateagain(str) {
    console.log(str + "~~validateagain 0~~" + str);
    CouponCode = str;
    var data = JSON.stringify({
        "CouponCode": str
    });
    var xhr = new XMLHttpRequest();
    xhr.addEventListener("readystatechange", function() {
        if (this.readyState === 4) {
            json = JSON.parse(this.responseText);
            console.log(json.Valid + "~~validateagain res~~" + this.responseText);
            if (json.Valid == true) {
                var temp = mScore;
                setScreen(GAMEPLAY);
                mScore = temp;
                gameuser.ExtendCouponCode += str + "|";
            } else {
                alert("Coupons you've entered is not valid"); //newone
            }
        }
    });
    xhr.open("POST", "https://www.anzrottaps.com/api/Games/ValidateExtend");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(data);
}

function GetBestScore() {
    var data = JSON.stringify({ "GameID": "1" });
    console.log("GetBestScore~~~~~~> " + data);
    var xhr = new XMLHttpRequest();
    xhr.addEventListener("readystatechange", function() {
        if (this.readyState === 4) {
            console.log(this.responseText);
            json = JSON.parse(this.responseText);
            DrawLblA(mTex_fonts[2], "Game Best  : " + json.GameHighScore, 0, -100, "#fafafa", 35, ThreeUI.anchors.center, ThreeUI.anchors.center, "center");
        }
    });

    xhr.open("POST", "https://www.anzrottaps.com/api/Games/GameHighScore");
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.send(data);
}