var app = require("../server/app");

var cm = app.get("characterModel");
var alliance = app.get("corporationModel");

alliance.up().then(() => console.log("alliance up")).catch((e) => console.log(e))