var express = require('express')
var router = express.Router()
const { auth } = require('./../utils/middleware')
const Group = require('./../models/Group')
const User = require('./../models/User')
router.get('/', auth, (req, res, next) => {
	const { id } = req.user
	User.findOne({ _id: id }).then((user) => {
		res.status(200).json({ groups: user['groups'] })
	})
})

router.post('/add', auth, (req, res, next) => {
	let { data } = req.body
	//name onBudget
	data['createdBy'] = req.user.id
	data['onBudget'] = data.onBudget
	data['budgetAmt'] = data.onBudget ? data.budgetAmt : 0

	const group = new Group(data)
	group['users'].push({ userId: req.user.id })
	group
		.save()
		.then(async (grp) => {
			User.findOne({ _id: req.user.id }).then(async (user) => {
				user['groups'].push({ grpId: grp._id })
				await user.save()
			})
			return res.status(201).json({ add: true })
		})
		.catch((err) => {
			res.status(500).json({ add: false })
		})
})
module.exports = router
