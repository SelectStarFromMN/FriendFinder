

// var path = require ("path");
var friendsArray = require("../data/friends.json");

module.exports = function (app) {

    app.get("/api/friends", function (userData, response) {
        //   friendsArray.push(userData.body)
        console.log('friendsArray');
        console.log(friendsArray);
        response.json({});
        // res.sendFile(path.join(__dirname, "../data/friends.json"));
    });

    app.post("/api/friends", function (request, response) {
        console.log(request.body)
        var friendMatch = findFriendMatch(request.body.scores);
        // if () {
        //     friendsArray.unshift(request.body);
        // }
        // response.json({name: "Chuck", photo: "http://via.placeholder.com/350x200.jpg" });
        // response.json({name: request.body.name, photo: request.body.photo });
        response.json({ name: friendMatch.name, photo: friendMatch.photo });
    });
}

function findFriendMatch(scores) {
    var lowestDelta = 1000;
    var friendIndex = 0;
    // index = Math.floor(Math.random() * scores.length);
    for (var i = 0; i < friendsArray.length; i++) {
        var tempDelta = computeMatchProfileScore(scores, friendsArray[i].scores);
        console.log("currIndex: " + i);
        console.log("tempDelta: " + tempDelta);
        if (tempDelta < lowestDelta) {
            lowestDelta = tempDelta;
            friendIndex = i;
            console.log("lowestDelta: " + lowestDelta);
        }
    }
    console.log("friendIndex: " + friendIndex);
    return friendsArray[friendIndex];
}

function computeMatchProfileScore(arr1, arr2) {
    console.log(arr1);
    console.log(arr2);
    sumDelta = 0;
    for (var i = 0; i < arr1.length; i++) {
        sumDelta = sumDelta + (Math.abs(parseInt(arr1[i]) - parseInt(arr2[i])));
    }
    return sumDelta;
}