

var path = require ("path");
var friendsArray = require("../data/friends.json");

module.exports = function (app) {

    app.get("/api/friends", function (request, response) {
        var friendsJSON = require(path.join(__dirname, "../data/friends.json"));
        response.json(friendsJSON);

    });

    app.post("/api/friends", function (request, response) {
        // console.log(request.body)
        var friendMatch = findFriendMatch(request.body.scores, request.body.name);
        response.json({ name: friendMatch.name, photo: friendMatch.photo });

        // see if the user already exists and add to system if not
        var me = friendsArray.find( function (friend){ return friend.name === request.body.name }  );
        if (!me) {
            friendsArray.push(request.body);
        }
    });
}

// Given an array of scores from the new user prospect (and username to preclude self-match),
// loop through all of the friends in friendsArray and using their respective scoresarray
//   compute a compatibility score between the new user and each friend in the array.
// Keep track of the best match (lowest score), and friendsArray index for the best match.
// Return the friend having the best compatibility match.
function findFriendMatch(scores, username) {
    var lowestDelta = 1000;
    var friendIndex = 0;
    // friendIndex = Math.floor(Math.random() * scores.length); // Random friend
    for (var i = 0; i < friendsArray.length; i++) {
        var tempDelta = computeMatchProfileScore(scores, friendsArray[i].scores);
        // console.log("currIndex: " + i);
        // console.log("tempDelta: " + tempDelta);
        if ((tempDelta < lowestDelta) && (friendsArray[i].name != username)) {
            lowestDelta = tempDelta;
            friendIndex = i;
            // console.log("lowestDelta: " + lowestDelta);
        }
    }
    // console.log("friendIndex: " + friendIndex);
    return friendsArray[friendIndex];
}

// Given 2 arrays of numbers (stored as strings, having equal lengths)
//   Compute the absolute-difference between respective pairs and keep a running sum which is returned
function computeMatchProfileScore(arr1, arr2) {
    // console.log(arr1);
    // console.log(arr2);
    sumDelta = 0;
    for (var i = 0; i < Math.min(arr1.length, arr2.length); i++) {
        sumDelta = sumDelta + (Math.abs(parseInt(arr1[i]) - parseInt(arr2[i])));
    }
    return sumDelta;
}