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

router.post('/add', (req, res, next) => {
	let { user_id, group_id, type, title, amount, remark } = req.body

	pool
		.query(helpers.addTask(), [type, title, remark, amount, user_id, group_id])
		.then((data) => {
			const x = data.rows[0]
			return res.status(201).json({ add: true, task: x })
		})
		.catch((err) => {
			console.log(err)
		})
})

module.exports = router
