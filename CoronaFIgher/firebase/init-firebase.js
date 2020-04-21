// var config = {
//     apiKey: "AIzaSyCeDaQ002nS9y3aBr2mS0zc3V-DhMr5LpE",
//     authDomain: "immune-3b840.firebaseapp.com",
//     databaseURL: "https://immune-3b840.firebaseio.com",
//     projectId: "immune-3b840",
//     storageBucket: "immune-3b840.appspot.com",
//     messagingSenderId: "188359952262",
//     appId: "1:188359952262:web:b64a2278b7f8d01468ce07"
// };
var config = {
    apiKey: "AIzaSyAEqHjoe12ZJNHFBsWPypw10u6WxQSXaok",
    authDomain: "kunnybununity.firebaseapp.com",
    databaseURL: "https://kunnybununity.firebaseio.com",
    projectId: "kunnybununity",
    storageBucket: "kunnybununity.appspot.com",
    messagingSenderId: "849144775113",
    appId: "1:849144775113:android:eedf88fd5dc070c3cca818",
    measurementId: "G-62W4G0JXQ2"
};

firebase.initializeApp(config);
var database = firebase.database();
var scoreList = [];
var namecheck = false;
readScore();




function writeScoreData(userId, score) {
    if (parseInt(score) > 9999999) {
        score = 3214765;
    }
    firebase.database().ref('scores/' + userId).set(parseInt(score));
}

function readScore() {
    var ref = firebase.database().ref('scores').orderByValue().limitToLast(10);
    ref.on("value", function(snapshot) {
        var jsonobj = snapshot.val();
        scoreList = sortByValue(jsonobj);
        scoreList.forEach(element => {
            //mFont[3].text += " : " + element[0] + "\n";
            //mFont[5].text += element[1] + "\n";
        });
        console.table(snapshot.val());
    }, function(error) {
        console.log("Error: " + error.code);
    });
}

function readbyID(name) {
    namecheck = false;
    console.log("readbyID~~~name");
    var starCountRef = firebase.database().ref('scores/' + name);
    starCountRef.on('value', function(snapshot) {
        console.log("readbyID = " + namecheck);
        if (namecheck == false) {
            if (snapshot.val()) {
                DrawLbl(mTex_fonts[0], "Name already Exist!\n\nPlease use another", 0, 0, "#ff0000", 18);
            } else {
                console.log("Null = " + snapshot.val());
                setStore();
                setScreen(GAMEMENU);
            }
        }
        namecheck = true;
    });
}


function sortByValue(jsObj) {
    var sortedArray = [];
    var val = 9999999;
    for (var i in jsObj) {
        sortedArray.push([jsObj[i], i]);
        if (val > jsObj[i])
            val = jsObj[i];
    }
    if (val > mPly.hroll) {
        sortedArray.push([mPly.hroll, mPly.name]);
    }
    sortedArray.sort(sortFunction);
    return sortedArray.reverse();
}


function sortFunction(a, b) {
    if (a[0] === b[0]) {
        return 0;
    } else {
        return (a[0] < b[0]) ? -1 : 1;
    }
}