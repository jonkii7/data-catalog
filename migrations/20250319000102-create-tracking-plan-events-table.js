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
    return db.runSql(`
      CREATE TABLE tracking_plan_events (
        tracking_plan_id INT NOT NULL,
        event_id INT NOT NULL,
        PRIMARY KEY (tracking_plan_id, event_id),
        FOREIGN KEY (tracking_plan_id) REFERENCES tracking_plans(id) ON DELETE CASCADE,
        FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE
      );`);
};

exports.down = function (db) {
    return db.runSql(`DROP TABLE IF EXISTS tracking_plan_events;`);
};

exports._meta = {
    version: 1,
};
