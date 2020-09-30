var express = require('express')
var router = express.Router()
const { auth } = require('./../utils/middleware')
const pool = require('./../db/db')
const helpers = require('./../utils/queries')

router.get('/:id', auth, (req, res, next) => {
	let { id } = req.params

	if (id !== 'all') {
		pool
			.query(helpers.getGroup(), [id])
			.then((data) => {
				const grp = data.rows[0]
				res.status(200).json(grp)
			})
			.catch((err) => {
				return res.status(500).json({ query: false, err })
			})
	} else {
		pool
			.query(helpers.groupsByUser(), [req.user.id])
			.then((data) => {
				const groups = data.rows
				res.status(200).json(groups)
			})
			.catch((err) => {
				res.send(err)
			})
	}
})

router.post('/add', auth, (req, res, next) => {})
module.exports = router
