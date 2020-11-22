require('dotenv').config()

const Pool = require('pg').Pool

const devConfig = {
	user: process.env.PG_USER,
	host: process.env.PG_HOST,
	database: process.env.PG_DATABASE,
	password: process.env.PG_PASSWORD,
	port: process.env.PG_PORT,
}

const prodConfig = {
	connectionString: process.env.DATABASE_URL,
}

const isProd = process.env.NODE_ENV === 'production'
const pool = new Pool(isProd ? prodConfig : devConfig)

module.exports = pool
