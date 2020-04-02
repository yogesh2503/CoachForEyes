var config = {
    apiKey: "AIzaSyCeDaQ002nS9y3aBr2mS0zc3V-DhMr5LpE",
    authDomain: "immune-3b840.firebaseapp.com",
    databaseURL: "https://immune-3b840.firebaseio.com",
    projectId: "immune-3b840",
    storageBucket: "immune-3b840.appspot.com",
    messagingSenderId: "188359952262",
    appId: "1:188359952262:web:b64a2278b7f8d01468ce07"
};
firebase.initializeApp(config);
var database = firebase.database();
var scoreList = [];

readScore();

function writeScoreData(userId, score) {
    firebase.database().ref('scores/' + userId).set(score);

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