const { use } = require('../routes')

//============================
//USER QUERIES
//============================
const storeUser = () => {
	const query = `INSERT INTO "user" (username,email,pswd) VALUES ($1,$2,$3) RETURNING *`
	return query
}

const checkUser = () => {
	return `SELECT * FROM "user" WHERE username = $1`
}

//============================
//GROUP QUERIES
//============================
const addGroup = () => {
	return `INSERT INTO "group" (grp_name,budget,budget_amt,created_by) VALUES ($1,$2,$3,$4) RETURNING *`
}

const groupsByUser = () => {
	return `
	SELECT * FROM "group" 
	JOIN "user_groups" ON "group".group_id="user_groups".group_id 
	WHERE "user_groups".user_id = $1`
}

const getGroup = () => {
	return `SELECT * FROM "group" WHERE group_id = $1`
}

//============================
//TASK QUERIES
//============================
const addTask = () => {
	return `INSERT INTO "task" (type,amount,user_id,group_id,title) VALUES ($1,$2,$3,$4,$5) RETURNING *`
}

const getTasks = () => {
	return `
		SELECT "task".* , "user".username FROM "task"
		JOIN "user" ON "task".user_id = "user".user_id
		WHERE "task".group_id = $1 ORDER BY date`
}

//============================
//USER GROUPS QUERIES (LINK GROUP)
//============================
const linkGrp = () => {
	return `INSERT INTO "user_groups" (user_id,group_id) VALUES ($1,$2) RETURNING *`
}

const isUserInGroup = () => {
	return `SELECT* FROM "user_groups" WHERE user_id = $1 AND group_id = $2`
}

const helpers = {
	//user
	storeUser,
	checkUser,

	//group
	addGroup,
	groupsByUser,
	getGroup,

	//task
	addTask,
	getTasks,

	//user groups
	linkGrp,
	isUserInGroup,
}
module.exports = helpers
