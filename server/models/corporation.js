const config = require('../config');
const debug = require('debug')('oss-srp');
const pg = config.injector.get('pg');

function CorporationM() {
	this.up = function() {
		return pg.query(
			'create table if not exists corporations (' +
				'id integer not null primary key,' +
				'name varchar(255) not null,' +
				'alliance integer,' +
				'lastUpdated timestamp not null' +
			');'
		);
	}

	this.down = function() {
		return pg.query("drop table corporations");
	}

	this.upsert = function(corporation) {
		return pg.query('select * from corporations where id = ${id};', {id: corporation.id}).then(function(results) {
			debug("upsert: found " + results.length + " results");
			var vars = {
				id: corporation.id,
				name: corporation.name || "GM Uninitialized",
			};
			if (results.length > 0) {

				if (results[0].name === corporation.name) {
					debug("upsert: corporation not changed, update not needed")
					return Promise.resolve(); // no update needed
				}

				// update
				var setArgs = [
					"lastUpdated = CURRENT_TIMESTAMP",
					"name = ${name}"
				];

				debug("upsert: starting update query with ", setArgs, vars);

				return pg.query('update corporations set ' + setArgs.join(", ") + ' where id = ${id}', vars);
			} else {
				// insert
				return pg.query('insert into corporations (id, name, lastUpdated) values (${id},${name},CURRENT_TIMESTAMP)', vars);
			}
		})
	}

}

module.exports = new CorporationM();