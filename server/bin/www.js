"use strict";

switch(process.env.NODE_ENV) {
  case "development":
  case "production":
  case "test":
    break;
  default:
    console.log("NODE_ENV isn't set to a valid value");
    process.exit();
    break;
}

var app = require("../app");
var config = require('../config');

var server = config.injector.get("http");

server.on("request", app);

server.listen(config.port, config.ip, function () {
  console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});