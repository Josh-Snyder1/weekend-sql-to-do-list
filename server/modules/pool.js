const pg = require('pg');

const config = {
    database: 'weekend-to-do-app',
    host: 'localhost',
    port: 5432,
};

const pool = new pg.Pool(config);

module.exports = pool;