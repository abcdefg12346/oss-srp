"use strict";

module.exports = {
	pg: process.env.DATABASE_URL,
	redis: process.env.REDIS_URL,
	ip: process.env.OPENSHIFT_NODEJS_IP || process.env.IP || undefined,
	port: process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 8080,
	redis: {
	  url: process.env.REDIS_URL,
	}
	crest: {
		"client_id": process.env.CREST_CLIENT_ID,
		"client_secret": process.env.CREST_SECRET_KEY
	}
	host: "https://oss-srp.herokuapp.com/"
}