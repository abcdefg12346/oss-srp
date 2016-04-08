"use strict"

const lodash = require("lodash");

var cfg = {
	sentry: {
		dsn: "https://6f0ece01b05145798c353bbab1b30457:c1a996599ddf4132b657b3445ae7694a@sentry.deniableplausibility.net/7"
	},

	// There is no security issue here, this keypair only works for localhost.
	crest: {
		"client_id": "8c4a9ca4e1024bb4883305d9997dae3d",
		"client_secret": "Xmv7zi8sWBHRg3uC3giOiwkOgxF5HrGOVOk3O0S7"
	}
}

module.exports = lodash.merge(
	cfg,
	require("./" + process.env.NODE_ENV)
	)