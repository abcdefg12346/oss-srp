"use strict";

const config = require("./env");
const pg = require('pg');

module.exports = function(injector) {
	var client = new pg.Client(config.pg);
	injector.register("pg", client);
}
