var express = require('express')
var router = express.Router()

//DB models
const User = require('./../models/User')
const Group = require('./../models/Group')
const Task = require('./../models/Task')

/*
MAIN QUERY FILE IMPLEMENTING:
1. groupsByUserId
2. usersByGroupId
3. tasksByUserId
4. tasksByGroupId
5. groupByName

*/

router.get('/user', async function (req, res, next) {
	const data = {
		username: 'rohit_dalal',
		email: 'dalalrohit@gmail.com',
		password: '0291ejikd',
		groups: [],
	}
	const user = new User(data)
	await user.save()

	res.json(user)
})

router.get('/group', async (req, res) => {
	const data = {
		name: 'chelsea',
		users: [{ userId: '1' }, { userId: '2' }, { userId: '3' }],
	}

	const group = new Group(data)
	await group.save()
})

router.get('/task', async (req, res) => {
	const data = {
		type: 'SELL',
		userId: '2',
		amount: 1000,
	}

	const task = new Task(data)
	await task.save()
})

router.get('/usersbygrp', (req, res) => {
	// get all users of grpId=2
	User.find({ 'groups.grpId': '213' })
		.then((data) => {
			res.json(data)
		})
		.catch((err) => {
			res.json(err)
		})
})

router.get('/groupsbyuser', (req, res) => {
	// get all users of grpId=2
	Group.find({ 'users.userId': '2' }).then((data) => {
		console.log(data)
		res.json(data)
	})
})

router.get('/tasksbyuser', (req, res) => {
	Task.find({ userId: '2' })
		.then((tasks) => {
			res.json(tasks)
		})
		.catch(() => {
			res.json({})
		})
})

router.get('/tasksbygrp', (req, res) => {
	Task.find({ groupId: '2' })
		.then((tasks) => {
			res.json(tasks)
		})
		.catch(() => {
			res.json({})
		})
})

router.get('/grpbyname', (req, res) => {
	Group.find({ name: 'chelsea' })
		.then((data) => {
			res.json(data)
		})
		.catch((err) => {
			res.json(err)
		})
})

module.exports = router
