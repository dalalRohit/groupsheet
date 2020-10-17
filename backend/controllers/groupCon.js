const pool = require('./../db/db')
const helpers = require('./../utils/queries')
const moment = require('moment')

const getGroupsById = (id, user) => {
	return new Promise((resolve, reject) => {
		if (id !== 'all') {
			pool
				.query(helpers.getGroup(), [id])
				.then((data) => {
					const grp = data.rows[0]
					resolve(grp)
				})
				.catch((err) => {
					reject(err)
				})
		} else {
			pool
				.query(helpers.groupsByUser(), [user.user_id])
				.then((data) => {
					const groups = data.rows
					resolve(groups)
				})
				.catch((err) => {
					reject(err)
				})
		}
	})
}

const addGroup = (body) => {
	return new Promise((resolve, reject) => {})
}
module.exports = {
	getGroupsById,
}
