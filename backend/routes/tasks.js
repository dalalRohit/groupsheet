var express = require('express')
var router = express.Router()
const { getTasksById, addTask } = require('./../controllers/taskCon')
/* GET home page. */
router.get('/:id', (req, res, next) => {
	getTasksById(req.params.id)
		.then((data) => {
			return res.status(200).json({ tasks: data.rows })
		})
		.catch((err) => {
			return res.status(500).json({ err })
		})
})

router.post('/add', (req, res, next) => {
	addTask(req.body)
		.then((data) => {
			return res.status(201).json({ add: true, task: data })
		})
		.catch((err) => {
			return res.status(500).json({ add: false, err })
		})
})

module.exports = router
