'use strict'

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const querystring = require('querystring');
const request = require('request-promise');
const config = require('../../config');
const debug = require('debug')('oss-srp');

router.param('cid', function(req, res, next, cid) {
	const cm = req.app.get("characterModel");
	cm.get(cid).then(function(character) {
		req.character = character;
		next();
	}).catch(function(e) {
		next(e);
	})
})

function authenticate(req, res, next) {
	jwt.verify(req.token, config.jwtkey, function(err, payload) {
		if (err)
			return next(err);
		req.user = payload;
		next();
	})
}

// Get all of your SRP
router.get("/:cid", authenticate, function(req, res, next) {
	const lmm = app.get("lossMailModel");
	if (req.user.id === req.character.id || parseInt(req.user.flags) & 1 === 1) {
		res.send({"status": "ok"})
	} else {
		const err = new Error("Not authorized");
		err.status = 403;
		next(err);
	}
})

router.post("/", authenticate, function(req, res, next) {
	const alliance = req.app.get("allianceModel");
	const corporation = req.app.get("corporationModel");

	if (!req.body.url) {
		return next(new Error("`url` required"));
	}
	if (req.body.url.indexOf("https://public-crest.eveonline.com/killmails/") !== 0) {
		return next(new Error("Please submit a CREST URL"));
	}
	request(req.body.url).then(function(content) {
		var mail = JSON.parse(content);

		if ('undefined' !== typeof mail.victim.alliance) {
			debug("mailparser: upserting victim alliance");
			alliance.upsert(mail.victim.alliance);
		}

		if ('undefined' !== typeof mail.victim.corporation) {
			debug("mailparser: upserting victim corporation");
			corporation.upsert(mail.victim.corporation);
		}

		mail.attackers.forEach(function(attacker) {
			if ('undefined' !== typeof attacker.alliance) {
				debug("mailparser: upserting agressor alliance", attacker.alliance.name);
				alliance.upsert(attacker.alliance);
			}
		})

		mail.attackers.forEach(function(attacker) {
			if ('undefined' !== typeof attacker.corporation) {
				debug("mailparser: upserting agressor corporation", attacker.corporation.name);
				if ('undefined' !== typeof attacker.alliance) {
					attacker.corporation.alliance = attacker.alliance.id;
				}
				corporation.upsert(attacker.corporation);
			}
		})

		res.send(mail);
	})
})

module.exports = router;