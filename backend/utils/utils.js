/*
    A utility function to generate hash passwords
*/

var bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const hashPassword = async (pswd) => {
	const salt = await bcrypt.genSalt(10)
	const hash = await bcrypt.hash(pswd, salt)
	return hash
}

//To generate tokens
const createTokens = async (userId) => {
	const token = jwt.sign({ _id: userId }, process.env.SECRET, {
		expiresIn: '2m',
	})

	const xToken = jwt.sign(
		{ _id: userId, expires: 7 * 24 * 60 * 60 },
		process.env.REFRESH + process.env.SECRET,
		{ expiresIn: '7d' }
	)

	return { token, xToken }
}

module.exports = {
	hashPassword: hashPassword,
	createTokens: createTokens,
}
