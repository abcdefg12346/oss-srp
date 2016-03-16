"use strict";

module.exports = {
	ip: "127.0.0.1",
	port: process.env.PORT || 3000,
	pg: "postgres://oss@localhost/oss",
	redis: {
		url: "redis://localhost/"
	}
}