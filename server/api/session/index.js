const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const querystring = require("querystring");
const request = require("request-promise");

const config = require("../../config");

// get the EVE Online redirect URI
router.get("/", function(req, res) {
	const endpoint = "https://login.eveonline.com/oauth/authorize";
	const params = {
		response_type: "code",
		redirect_uri: "http://localhost:3000/session/crest/",
		client_id: config.crest.client_id,
		scope: "",
		state: req.query.scope
	}
	const url = endpoint + "?" + querystring.stringify(params);
	res.status(200).send({authorize: url});
})

router.get("/crest", function(req, res, next) {
	const endpoint = "https://login.eveonline.com/oauth/token";
	const params = {
		grant_type: "authorization_code",
		code: req.query.code
	};
	const auth = {
		user: config.crest.client_id,
		pass: config.crest.client_secret
	};

	request.post(endpoint, {form: params, auth: auth}).then(function(body) {
		const tokenData = JSON.parse(body);
		const endpoint = "https://login.eveonline.com/oauth/verify";
		const headers = {
			"Authorization": "Bearer " + tokenData.access_token
		}
		return request(endpoint, {headers: headers});
	}).then(function(body) {
		var characterData = JSON.parse(body);
		res.send(characterData);
	}).catch(function(e) {
		next(e);
	})
})

module.exports = router;