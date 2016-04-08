"use strict";

const config = require("./env");
const pg = require('pg-promise')();

module.exports = function(injector) {
	var client = new pg(config.pg);
	injector.register("pg", client);
}
