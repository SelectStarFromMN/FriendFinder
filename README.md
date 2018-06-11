# FriendFinder

Welcome to FriendFinder!  Answer a few simple questions and the magic of computer science will identify a friend for you!

**FriendFinder** is a simple website demonstrating the use of a [Node](https://nodejs.org/en/) + [Express](https://www.npmjs.com/package/express) backend web server architecture.  There is a single data-structure (an array of potential friend objects), utilizing a JSON file (friends.json) as a datastore.  It also makes use of the [body-parser](https://www.npmjs.com/package/body-parser) middleware helper package to facilitate working with reqeust/response payloads much more easily.

The Express Routes have been factored out into logical separations: apiRoutes.js and htmlRoutes.js source files.  The htmlRoutes serve up html files for GET requests using Express' sendFile method.  The apiRoutes serve up JSON for get requests and manipulate the datasource (JSON file) for POST requests.

Answers from the questionaire are stored in an array which is compared element-by-element to each potential friend's stored responses.  To measure compatibility with each potential freind, a running sum of the absolute-value differences are computed and used to identify the friend who answered most closely to the new user's submission.

A modal dialog displays the friend having the closest match to the answers of the new user.  In the case of a tie, the first friend found (in the friends.json datastore) with that score will prevail.  

Note: An interesting (but predictable) behavior is that upon re-submission, the user will find themself matched to their own entry.  I am considering whether to exclude one's self from the comparison, but the instructions (and more importantly the live example provided as a guide) support the self-match behavior.  I still think I'm going to change it though.  Yeah I changed it, 'hope that wasn't a design requirement.

API Routes Supported:
GET "/api/friends"  : response is JSON object array of all entries in the friends.json file datastore.

POST "/api/friends" : request body is a JSON object having "name", "photo" and "scores" properties.  The POST method will take this object and locate a friend from the datastore having the closest matching scores to the given user object.

    example JSON object:     
        {
        "name": "Ross1",
        "photo": "https://media.giphy.com/media/X4YqmJEl6wJoY/giphy.gif",
        "scores": [ "5", "1", "4", "4", "5", "1", "2", "5", "4", "1" ]
        }

The application can be found running live on Heroku at: [FriendFinder](https://guarded-eyrie-63823.herokuapp.com/)
