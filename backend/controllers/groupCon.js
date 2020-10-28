const pool = require('./../db/db')
const helpers = require('./../utils/queries')

const getGroupByGroupId = (groupId) => {
	return new Promise((resolve, reject) => {
		pool
			.query(helpers.getGroup(), [groupId])
			.then((data) => {
				const grp = data.rows[0]
				resolve(grp)
			})
			.catch((err) => {
				reject(err)
			})
	})
}
const getGroupsByUserId = (userId) => {
	return new Promise((resolve, reject) => {
		pool
			.query(helpers.groupsByUser(), [userId])
			.then((data) => {
				const groups = data.rows
				resolve(groups)
			})
			.catch((err) => {
				reject(err)
			})
	})
}

module.exports = {
	getGroupByGroupId,
	getGroupsByUserId,
}
