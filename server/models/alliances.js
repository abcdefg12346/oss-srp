const config = require('../config');
const debug = require('debug')('oss-srp');
const pg = config.injector.get('pg');

function AllianceModel() {
	this.up = function() {
		return pg.query(
			'create table if not exists alliances (' +
				'id integer not null primary key,' +
				'name varchar(255) not null,' +
				'lastUpdated timestamp not null' +
			');'
		);
	}

	this.down = function() {
		return pg.query("drop table alliances");
	}

	this.upsert = function(alliance) {
		return pg.query('select * from alliances where id = ${id};', {id: alliance.id}).then(function(results) {
			debug("upsert: found " + results.length + " results");
			var vars = {
				id: alliance.id,
				name: alliance.name || "GM Uninitialized",
			};
			if (results.length > 0) {

				if (results[0].name === alliance.name) {
					debug("upsert: alliance not changed, update not needed")
					return Promise.resolve(); // no update needed
				}

				// update
				var setArgs = [
					"lastUpdated = CURRENT_TIMESTAMP",
					"name = ${name}"
				];

				debug("upsert: starting update query with ", setArgs, vars);

				return pg.query('update alliances set ' + setArgs.join(", ") + ' where id = ${id}', vars);
			} else {
				// insert
				return pg.query('insert into alliances (id, name, lastUpdated) values (${id},${name},CURRENT_TIMESTAMP)', vars);
			}
		})
	}

}

module.exports = new AllianceModel();