const pgp = require('pg-promise')();

const { host, port, database, username, password } = {
    host: "localhost",
    port: 5432,
    database: "bookly_sql",
    username: "postgres",
    password: "1234"
};

const dbSQL = pgp(`postgres://${username}:${password}@${host}:${port}/${database}`);

dbSQL.any('SELECT * FROM users')
  .then((data) => {
    // console.log('DATA:', data);
  })
  .catch((error) => {
    console.log('ERROR:', error);
  })

module.exports = dbSQL;