const Pool = require('pg').Pool
const pool = new Pool({
	user: 'postgres',
	host: 'localhost',
	database: 'groupsheet',
	password: 'rohit',
	port: 5432,
})

module.exports = pool
