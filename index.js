var express = require("express");
var bodyParser = require("body-parser");
var session = require("express-session");
var dbAdapter = require("./src/adapters/objectionAdapter");
var apiBaseAddress = "/api";
var cors = require('cors')

var app = express();
app.use(cors())


app.use(
  session({
    secret: "mysecret",
    resave: true,
    saveUninitialized: true,
    //cookie: { secure: true }
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

function getDBAdapter(req) {
  var db = new dbAdapter(req.session);
  return db;
}

function sendJsonResult(res, obj) {
  res.setHeader("Content-Type", "application/json");
  res.send(JSON.stringify(obj));
}

app.get(apiBaseAddress + "/getActive", function (req, res) {
  var db = getDBAdapter(req);
  db.getSurveys(function (result) {
    sendJsonResult(res, result);
  });
});

app.get(apiBaseAddress + "/getSurvey", function (req, res) {
  var db = getDBAdapter(req);
  var surveyId = req.query["surveyId"];
  db.getSurvey(surveyId, function (result) {
    sendJsonResult(res, result);
  });
});

app.get(apiBaseAddress + "/changeName", function (req, res) {
  var db = getDBAdapter(req);
  var id = req.query["id"];
  var name = req.query["name"];
  db.changeName(id, name, function (result) {
    sendJsonResult(res, result);
  });
});

app.get(apiBaseAddress + "/create", function (req, res) {
  var db = getDBAdapter(req);
  var name = req.query["name"];
  db.addSurvey(name, function (survey) {
    sendJsonResult(res, survey);
  });
});

app.post(apiBaseAddress + "/changeJson", function (req, res) {
  var db = getDBAdapter(req);
  var id = req.body.id;
  var json = req.body.json;
  const surveyName = json?.title ||id;
  db.storeSurvey(id, surveyName, json, function (survey) {
    sendJsonResult(res, survey);
  });
});

app.post(apiBaseAddress + "/post", function (req, res) {
  var db = getDBAdapter(req);
  var postId = req.body.postId;
  var surveyResult = req.body.surveyResult;
  db.postResults(postId, surveyResult, function (result) {
    sendJsonResult(res, result);
  });
});

app.get(apiBaseAddress + "/delete", function (req, res) {
  var db = getDBAdapter(req);
  var id = req.query["id"];
  db.deleteSurvey(id, function (result) {
    sendJsonResult(res, { id: id, result });
  });
});

app.get(apiBaseAddress + "/results", function (req, res) {
  var db = getDBAdapter(req);
  var postId = req.query["postId"];
  db.getResults(postId, function (result) {
    sendJsonResult(res, result);
  });
});

app.get(["/", "/about", "/run/*", "/edit/*", "/results/*"], function (req, res, next) {
  res.sendFile("index.html", { root: __dirname + "/public" });
});

app.use(express.static(__dirname + "/public"));

app.listen(process.env.PORT || 3000, function () {
  console.log("Listening on port ", process.env.PORT || 3000);
});
