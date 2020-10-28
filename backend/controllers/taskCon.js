const pool = require('./../db/db')
const helpers = require('./../utils/queries')

const getTasksById = (id) => {
	return new Promise((resolve, reject) => {
		pool
			.query(helpers.getTasks(), [id])
			.then((data) => {
				resolve(data.rows)
			})
			.catch((err) => {
				reject(err)
			})
	})
}

const addTask = (body) => {
	return new Promise((resolve, reject) => {
		let { user_id, group_id, type, title, amount, remark, username } = body

		pool
			.query(helpers.addTask(), [
				type,
				title,
				remark,
				amount,
				user_id,
				group_id,
				username,
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
