var config = {
    apiKey: "AIzaSyBgXuNtpHOJp9AUbE7bLiAtxqsBBYPRd4I",
    authDomain: "speedy-keys-43bba.firebaseapp.com",
    databaseURL: "https://speedy-keys-43bba.firebaseio.com/",
    projectId: "speedy-keys-43bba",
    appId: "1:751299443817:web:1130439292a33b3210b6f8",
    storageBucket: "speedy-keys-43bba.appspot.com"
};
firebase.initializeApp(config);
var database = firebase.database();
var scoreList = [];
readScore();

function writeScoreData(userId, score) {
    firebase.database().ref('scores/' + userId).set(score);
}

function readScore() {
    var ref = firebase.database().ref('scores').orderByValue().limitToLast(20);
    ref.on("value", function(snapshot) {
        var jsonobj = snapshot.val();
        scoreList = sortByValue(jsonobj);
        mFont[3].text = "";
        mFont[5].text = "";
        scoreList.forEach(element => {
            mFont[3].text += " : " + element[0] + "\n";
            mFont[5].text += element[1] + "\n";
        });
        console.table(scoreList);
    }, function(error) {
        console.log("Error: " + error.code);
    });
}

function sortByValue(jsObj) {
    var sortedArray = [];
    for (var i in jsObj) {
        sortedArray.push([jsObj[i], i]);
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