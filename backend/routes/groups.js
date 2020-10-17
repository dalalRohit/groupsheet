var express = require('express')
var router = express.Router()
const { auth } = require('./../utils/middleware')
const { getGroupsById } = require('./../controllers/groupCon')
router.get('/:id', auth, (req, res, next) => {
	getGroupsById(req.params.id, req.user)
		.then((data) => {
			return res.status(200).json(data)
		})
		.catch((err) => {
			return res.status(500).json({ query: false, err })
		})
})

router.post('/add', auth, (req, res, next) => {})
module.exports = router
