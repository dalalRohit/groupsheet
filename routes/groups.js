var express = require('express')
var router = express.Router()
const { auth } = require('./../utils/middleware')
const {
	getGroupByGroupId,
	getGroupsByUserId,
	getGroupMembers,
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

router.get('/details/:id', auth, (req, res, next) => {
	const details = { members: [] }
	console.log(req.params.id)
	getGroupMembers(req.params.id).then((members) => {
		// details.members.push(members)
		return res.status(200).json(members)
	})
})

router.post('/add', auth, (req, res, next) => {})
module.exports = router
