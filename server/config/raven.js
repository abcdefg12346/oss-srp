"use strict";

const config = require('./env');
const Raven = require("raven");
const pkg = require("../../package.json");

module.exports = function(injector) {
	var raven = new Raven.Client(config.sentry.dsn, {release: pkg.version});
	injector.register("raven", raven);
}