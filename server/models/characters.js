const config = require('../config');

const pg = config.injector.get('pg');

function CharacterModel() {
	this.up = function() {
		return pg.query(
			'create table if not exists characters (' +
				'id integer not null primary key,' +
  			'name varchar(128) not null unique,' +
  			'hash varchar(28) not null,' +
  			'lastLogin timestamp not null' +
			');'
		);
	}

	this.down = function() {
		return pg.query('drop table characters;');
	}

	this.upsert = function(character) {
		return pg.query('select * from characters where id = ${cid};', {cid: character.CharacterID}).then(function(results) {
			var vars = {
				id: character.CharacterID,
				name: character.CharacterName,
				hash: character.CharacterOwnerHash
			}
			if (results.length > 0) {
				// update
				return pg.query('update characters (name, hash, lastLogin) values (${name},${hash},CURRENT_TIMESTAMP) where id = ${id}', vars);
			} else {
				// insert
				return pg.query('insert into characters (id, name, hash, lastLogin) values (${id},${name},${hash},CURRENT_TIMESTAMP)', vars);
			}
		})
	}
}

module.exports = new CharacterModel();