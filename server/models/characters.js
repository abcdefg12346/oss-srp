const config = require('../config');
const debug = require('debug')('oss-srp');
const pg = config.injector.get('pg');

function CharacterModel() {
	this.up = function() {
		return pg.query(
			'create table if not exists characters (' +
				'id integer not null primary key,' +
				'name varchar(128) not null unique,' +
				'hash varchar(28) not null,' +
				'lastLogin timestamp not null,' +
				'flags integer not null' +
			');'
		);
	}

	this.down = function() {
		return pg.query('drop table characters;');
	}

	this.get = function(characterId) {
		return pg.query("select * from characters where id = ${cid}", {cid: characterId}).then(function(results) {
			if (results.length !== 1) {
				return Promise.reject(new Error("Unknown character."));
			} else {
				return Promise.resolve(results[0]);
			}
		})
	}

	this.upsert = function(character) {
		return pg.query('select * from characters where id = ${cid};', {cid: character.CharacterID}).then(function(results) {
			debug("upsert: found " + results.length + " results");
			var vars = {
				id: character.CharacterID,
				name: character.CharacterName || "GM Uninitialized",
				hash: character.CharacterOwnerHash || "0",
				defaultFlags: 0
			};
			if (results.length > 0) {
				// update
				var setArgs = [
					"lastLogin = CURRENT_TIMESTAMP"
				];

				if ('undefined' !== typeof character.CharacterName) {
					setArgs.push("name = ${name}");
				}

				if ('undefined' !== typeof character.CharacterOwnerHash) {
					setArgs.push("hash = ${hash}");

					// if the character hash changed, reset permissions
					if (character.CharacterOwnerHash !== results[0].hash && results[0].hash !== "0") {
						setArgs.push("flags = ${defaultFlags}");
					}
				}

				debug("upsert: starting update query with ", setArgs, vars);

				return pg.query('update characters set ' + setArgs.join(", ") + ' where id = ${id}', vars);
			} else {
				// insert
				return pg.query('insert into characters (id, name, hash, lastLogin, flags) values (${id},${name},${hash},CURRENT_TIMESTAMP,${defaultFlags})', vars);
			}
		})
	}

	// this is great for authentication!
	this.setFlags = function(cid, flags) {
		debug("setFlags: upserting...")
		return this.upsert({CharacterID: cid}).then(function() {
			debug("setFlags: upsert done");
			return pg.query("update characters set flags = ${flags} where id = ${cid}", {
				cid: cid,
				flags: flags
			})
		})
	}
}

module.exports = new CharacterModel();