require('dotenv').config()
const _ = require('lodash')
const jwt = require('jsonwebtoken')
const redis = require('redis')
const client = redis.createClient()
const { createTokens } = require('./utils')

const validateRefresh = async (refreshToken, user) => {
	const secret = process.env.REFRESH + process.env.SECRET
	let isExpired = false
	try {
		jwt.verify(refreshToken, secret)
	} catch (err) {
		//refresh token expired
		if (err.name === 'TokenExpiredError') {
			console.log('validateREfresh Refresh token expired..')
			isExpired = true
		}

		//invalid
		if (err.name !== 'TokenExpiredError') {
			return { msg: `refresh token invalid. ${err.message}..` }
		}
	}

	const tokens = await createTokens(user)
	return {
		newToken: tokens.token,
		newXToken: isExpired ? tokens.xToken : refreshToken,
	}
}

//----------------------------Main export---------------------------------
const authMiddleware = async (req, res, next) => {
	console.log(
		'***************************Checking user auth******************************'
	)

	const token = req.header('token') || req.cookies.token
	const xToken = req.header('x-token') || req.cookies.xToken
	var xdecoded = jwt.decode(xToken)
	var authDecoded = jwt.decode(token)

	if (!token || !xToken) {
		req.tokens = {}
		req.user = {}
		return res.status(403).json({ auth: false })
	}

	//check if refresh-token is in blacklist
	client.get(xToken, (err, data) => {
		if (err) {
			return res.status(500).json({ auth: false, msg: err.message })
		}

		//token found bingo
		if (data) {
			return res
				.status(403)
				.json({ auth: false, msg: 'Invalid request. Login again' })
		}

		//check for matching user
		if (xdecoded._id !== authDecoded.user.user_id) {
			req.tokens = {}
			req.user = {}
			return res.status(403).json({ auth: false, msg: 'Users not matched..' })
		}

		jwt.verify(token, process.env.SECRET, async (err, data) => {
			//if auth-token is valid
			console.log(err)
			if (!err && data) {
				console.log('line 73', data)
				req.user = data.user
				req.tokens = {
					token,
					xToken,
				}
				return next()
			}

			//auth-token is invalid
			else if (err.name !== 'TokenExpiredError') {
				req.user = {}
				req.tokens = {}
				return res.status(400).json({
					auth: false,
					msg: `Invalid auth-token. ${err.message}`,
				})
			}

			//token is expired. create {auth,refresh} and send
			else if (err && err.name === 'TokenExpiredError') {
				const newTokens = await validateRefresh(xToken, authDecoded.user)

				if (newTokens.newToken && newTokens.newXToken) {
					//set user to the newly created userId
					const userNew = await jwt.decode(newTokens.newToken)
					console.log('line 99', userNew)
					req.user = userNew.user
					req.tokens = {
						token: newTokens.newToken,
						xToken: newTokens.newXToken,
					}

					const options = {
						httpOnly: true,
						maxAge: 36 * 60 * 1000,
						secure: false,
						// sameSite: true,
					}
					res.cookie('token', newTokens.newToken, options)
					res.cookie('xToken', newTokens.newXToken, options)

					return next()
				} else {
					return res.status(400).json({ auth: false, msg: newTokens.msg })
				}
			}
		})
	})
}

module.exports = {
	auth: authMiddleware,
	client: client,
}
