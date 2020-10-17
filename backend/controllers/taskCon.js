const pool = require('./../db/db')
const helpers = require('./../utils/queries')
const moment = require('moment')

const getTasksById = (id) => {
	return new Promise((resolve, reject) => {
		pool
			.query(helpers.getTasks(), [id])
			.then((data) => {
				data.rows.filter((task) => {
					task['date'] = moment(task.date).format('D/M LT')
				})
				resolve(data)
			})
			.catch((err) => {
				reject(err)
			})
	})
}

const addTask = (body) => {
	return new Promise((resolve, reject) => {
		let { user_id, group_id, type, title, amount, remark } = body

		pool
			.query(helpers.addTask(), [
				type,
				title,
				remark,
				amount,
				user_id,
				group_id,
			])
			.then((data) => {
				const x = data.rows[0]
				resolve(x)
			})
			.catch((err) => {
				reject(err)
			})
	})
}

module.exports = {
	getTasksById,
	addTask,
}
