var config = {
    apiKey: "AIzaSyCdOKvh74sVAfkA7FlshgETcjf37Lmx4Do",
    authDomain: "typing-speed-25.firebaseapp.com",
    databaseURL: "https://typing-speed-25.firebaseio.com",
    projectId: "typing-speed-25",
    appId: "1:370387050369:web:c2e5d900e0d8851f971280",
    storageBucket: "typing-speed-25.appspot.com"
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