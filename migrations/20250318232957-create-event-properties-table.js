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
    return db.runSql(
        `
      CREATE TABLE event_properties (
        event_id INT NOT NULL,
        property_id INT NOT NULL,
        required BOOLEAN,
        PRIMARY KEY (event_id, property_id),
        FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE,
        FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE CASCADE
      );
  `
    );
};

exports.down = function (db) {
    return db.runSql(`DROP TABLE IF EXISTS event_properties;`);
};

exports._meta = {
    version: 1,
};
