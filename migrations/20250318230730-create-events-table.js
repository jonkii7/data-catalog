'use strict';

var dbm;
var type;
var seed;

/**
 * We receive the dbmigrate dependency from dbmigrate initially.
 * This enables us to not have to rely on NODE_PATH.
 */
exports.setup = function (options, seedLink) {
    dbm = options.dbmigrate;
    type = dbm.dataType;
    seed = seedLink;
};

exports.up = function (db) {
    return db
        .runSql(
            `
      CREATE TABLE events (
        id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        name VARCHAR(100) NOT NULL,
        type VARCHAR(100) NOT NULL CHECK (type IN ('track', 'identify', 'alias', 'screen', 'page')),
        description TEXT NOT NULL,
        additional_properties BOOLEAN DEFAULT FALSE,
        create_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        update_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
  `
        )
        .then(() =>
            db.runSql(`
			ALTER TABLE ONLY events
      ADD CONSTRAINT events_unique_name_type UNIQUE (name, type);
  `)
        );
};

exports.down = function (db) {
    return db.runSql(`DROP TABLE IF EXISTS events;`);
};

exports._meta = {
    version: 1,
};
