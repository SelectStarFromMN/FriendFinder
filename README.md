# FriendFinder

Welcome to FriendFinder!  Answer a few simple questions and the magic of computer science will identify a friend for you!

FriendFinder is a simple website demonstrating the use of a Node + Express backend web server architecture.  There is a single data-structure (an array of potential friend objects), utilizing a JSON file as a datastore.

The Express Routes have been factored out into logical separations: apiRoutes.js and htmlRoutes.js source files.  The htmlRoutes serve up html files for GET requests using Express' sendFile method.  The apiRoutes serve up JSON for get requests and manipulate the datasource (JSON file) for POST requests.

Answers from the questionaire are stored in an array which is compared element-by-element to each potential friend's stored responses.  To measure compatibility with each potential freind, a running sum of the absolute-value differences are computed and used to identify the friend who answered most closely to the new user's submission.

A modal dialog displays the friend having the closes match to the answers of the new user.  In the case of a tie, the first friend found (in the friends.json datastore) with that score will prevail.  

Note: An interesting (but predictable) behavior is that upon re-submission, the user will find themself matched to their own entry.  I am considering wheter to exclude one's self from the comparison, but the instructions (and more importantly the live example) support the self-match behavior.  I still think I'm going to change it though.  Yeah I changed it, 'hope that wasn't a design requirement.