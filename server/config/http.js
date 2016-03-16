"use strict";

const http = require("http");

module.exports = function(injector) {
	injector.register("http", http.createServer())
}