"use strict"

const lodash = require("lodash");

var cfg = {
	sentry: {
		dsn: "https://6f0ece01b05145798c353bbab1b30457:c1a996599ddf4132b657b3445ae7694a@sentry.deniableplausibility.net/7"
	}
}

module.exports = lodash.merge(
	cfg,
	require("./" + process.env.NODE_ENV)
	)