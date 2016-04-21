"use strict";

const express = require("express");
const morgan = require("morgan");
const bearerToken = require("express-bearer-token");
const bodyParser = require("body-parser");

const app = express();

app.use(morgan('dev'));
app.use(bearerToken());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.get("/", function(req, res, next) {
	res.status(200).send({"pkg": "osssrp"});
})

app.set("characterModel", require("./models/characters"));
app.set("allianceModel", require("./models/alliances"));
app.set("corporationModel", require("./models/corporation"));
app.get("characterModel").up();
app.get("allianceModel").up();
app.get('corporationModel').up();

app.use(require("./api"));

app.use(function(err, req, res, next) {
	if (err) {
		res.status(err.statusCode || err.status || 500);
		res.send({
			msg: err.message || "Unknown error.",
			err: err,
			status: err.statusCode || err.status || 500
		});
	} else {
		next();
	}
})

module.exports = app;