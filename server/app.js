"use strict";

const express = require("express");

const app = express();

app.get("/", function(req, res, next) {
	res.status(200).send({"pkg": "osssrp"});
})

module.exports = app;