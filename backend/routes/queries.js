var express = require('express')
var router = express.Router()
const helpers = require('./../utils/queries')
const pool = require('./../db/db')

/*

// MAIN QUERY FILE IMPLEMENTING:
// 1. groupsByUserId
// 2. usersByGroupId
// 3. tasksByUserId
// 4. tasksByGroupId
// 5. groupByName

*/

router.get('/user', function (req, res, next) {
	const { username, email, password } = {
		username: 'anjali',
		email: 'anjali_dalal@gmail.com',
		password: 'anjali12',
	}
	pool
		.query(helpers.storeUser(), [username, email, password])
		.then((user) => {
			console.log(user)
			return res.send(user)
		})
		.catch((err) => {
			if (err) console.log(err)
		})
})

router.post('/group', (req, res) => {
	const { name, budget, budget_amt, created_by } = req.body
	pool
		.query(helpers.addGroup(), [name, budget, budget_amt, created_by])
		.then((group) => {
			console.log(group)
			res.send(group)
		})
		.catch((err) => {
			console.log(err)
			res.send(err)
		})
})

router.post('/task', async (req, res) => {
	const { type, amount, user_id, group_id, title } = req.body
	const { rows } = await pool.query(helpers.isUserInGroup(), [
		user_id,
		group_id,
	])

	if (rows.length === 0) {
		return res.status(400).json({ query: false, msg: 'Invalid transaction' })
	}
	pool
		.query(helpers.addTask(), [type, amount, user_id, group_id, title])
		.then((task) => {
			res.send(task)
		})
		.catch((err) => {
			console.log(err)
		})
})

router.post('/link-grp', (req, res) => {
	let { user_id, group_id } = req.body

	pool
		.query(helpers.linkGrp(), [user_id, group_id])
		.then((link) => {
			console.log(link)
			res.send(link)
		})
		.catch((err) => {
			console.log(err)
			res.send(err)
		})
})

// router.get('/usersbygrp', (req, res) => {
// 	// get all users of grpId=2
// 	User.find({ 'groups.grpId': '213' })
// 		.then((data) => {
// 			res.json(data)
// 		})
// 		.catch((err) => {
// 			res.json(err)
// 		})
// })

// router.get('/groupsbyuser', (req, res) => {
// 	// get all users of grpId=2
// 	Group.find({ 'users.userId': '2' }).then((data) => {
// 		console.log(data)
// 		res.json(data)
// 	})
// })

// router.get('/tasksbyuser', (req, res) => {
// 	Task.find({ userId: '2' })
// 		.then((tasks) => {
// 			res.json(tasks)
// 		})
// 		.catch(() => {
// 			res.json({})
// 		})
// })

// router.get('/tasksbygrp', (req, res) => {
// 	Task.find({ groupId: '2' })
// 		.then((tasks) => {
// 			res.json(tasks)
// 		})
// 		.catch(() => {
// 			res.json({})
// 		})
// })

// router.get('/grpbyname', (req, res) => {
// 	Group.find({ name: 'chelsea' })
// 		.then((data) => {
// 			res.json(data)
// 		})
// 		.catch((err) => {
// 			res.json(err)
// 		})
// })

module.exports = router
