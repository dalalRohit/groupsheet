var express = require('express')
var router = express.Router()
const { auth } = require('./../utils/middleware')
const {
	getGroupByGroupId,
	getGroupsByUserId,
} = require('./../controllers/groupCon')

router.get('/all', auth, (req, res, next) => {
	getGroupsByUserId(req.user.user_id)
		.then((data) => {
			return res.status(200).json(data)
		})
		.catch((err) => {
			return res.status(500).json({ query: false, err })
		})
})

router.get('/:id', auth, (req, res, next) => {
	getGroupByGroupId(req.params.id)
		.then((data) => {
			return res.status(200).json(data)
		})
		.catch((err) => {
			return res.status(500).json({ query: false, err })
		})
})

router.post('/add', auth, (req, res, next) => {})
module.exports = router
