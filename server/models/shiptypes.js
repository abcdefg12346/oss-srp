const config = require('../config');
const debug = require('debug')('oss-srp');
const pg = config.injector.get('pg');

function ShipTypesModel() {
	this.up = function() {
		return pg.query(
			'create table if not exists shiptypes (' +
				'id integer not null primary key,' +
				'type varying(255) not null unique,' +
				'class varying(255) not null unique,' +
			');'
		).then(function() {
			return Promise.resolve();
		});
	}

	this.down = function() {
		return pg.query('drop table shiptypes;');
	}
}

module.exports = new ShipTypesModel();