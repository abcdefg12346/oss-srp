const config = require("./env");

const raven = require("raven");
const Injector = require('plus.container');
const injector = new Injector();

config.injector = injector;

// We need to give injectables a reference to the injector since they will not have a decorated config reference.
require("./raven")(injector);
require("./pgsql")(injector);
require("./http")(injector);

module.exports = config;