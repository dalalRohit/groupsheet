var express = require('express')
var router = express.Router()
const pool = require('./../db/db')
const helpers = require('./../utils/queries')

/* GET home page. */
router.get('/:id', (req, res, next) => {
	let { id } = req.params

	pool
		.query(helpers.getTasks(), [id])
		.then((data) => {
			return res.status(200).json({ tasks: data.rows })
		})
		.catch((err) => {
			return res.status(500).json({ query: false, err })
		})
})

module.exports = router
