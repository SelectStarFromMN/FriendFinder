
var path = require('path');

module.exports = function (app) {

    app.get("/", function (req, res) {
        // console.log('html app.get "/"');
        res.sendFile(path.join(__dirname, "../public/home.html"));
    });

    app.get("/survey", function (req, res) {
        // console.log('html app.get "/survey"');
        res.sendFile(path.join(__dirname, "../public/survey.html"));
    });
}
