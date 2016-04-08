"use strict";

const express = require("express");
const morgan = require("morgan");

const app = express();

app.use(morgan('dev'));

app.get("/", function(req, res, next) {
	res.status(200).send({"pkg": "osssrp"});
})

app.use(require("./api"));

module.exports = app;