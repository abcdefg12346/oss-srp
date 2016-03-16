"use strict";

module.exports = {
	pg: process.env.DATABASE_URL,
	redis:
	ip: process.env.OPENSHIFT_NODEJS_IP || process.env.IP || undefined,
	port: process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 8080,
	redis: {
	  url: process.env.REDIS_URL,
	}
}