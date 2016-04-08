"use strict";

module.exports = {
	ip: "127.0.0.1",
	port: process.env.PORT || 3000,
	pg: "postgres://gant@127.0.0.1/oss-srp",
	redis: {
		url: "redis://localhost/"
	}
}