var express = require('express')
var router = express.Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { createTokens, hashPassword } = require('./../utils/utils')
const { auth, client } = require('./../utils/middleware')
const pool = require('./../db/db')
const helpers = require('./../utils/queries')
const _ = require('lodash')

router.post('/fsignup', async (req, res, next) => {
	let { username, email, password } = req.body
	password = await hashPassword(password)
	pool
		.query(helpers.storeUser(), [username, email, password])
		.then((user) => {
			res.send(user)
		})
		.catch((err) => {})
})
router.post('/flogin', (req, res, next) => {
	//https://gist.github.com/kerimdzhanov/7529623
	// const randIndex = Math.floor(Math.random() * (users.length - 0 + 1) + 0)
	// const user = User(users[randIndex])
	let { username, password } = req.body

	pool
		.query(helpers.checkUser(), [username])
		.then(async (user) => {
			//user exists
			if (user.rows.length) {
				let foundUser = user.rows[0]
				//check password
				const isPass = await bcrypt.compare(password, foundUser.pswd)

				foundUser = _.pick(user.rows[0], ['username', 'email', 'user_id'])

				if (!isPass) {
					return res
						.status(400)
						.json({ login: false, msg: 'Passwords do not match!' })
				}
				const { token, xToken } = await createTokens(foundUser.user_id)
				req.user = foundUser
				req.tokens = {
					token,
					xToken,
				}
				const options = {
					httpOnly: true,
					maxAge: 36 * 60 * 1000,
					secure: false,
					// sameSite: true,
				}

				//Set cookies
				res.cookie('token', token, options)
				res.cookie('xToken', xToken, options)

				res.status(200).json({ login: true, user: foundUser })
			} else {
				//user not found
				return res
					.status(400)
					.json({ login: false, msg: 'User not found. Check credentials' })
			}
		})
		.catch((err) => {
			console.log(err)
			res.status(500).json({ login: false, err })
		})
})

router.get('/logout', auth, async (req, res, next) => {
	const decoded = await jwt.decode(req.tokens.xToken)

	//https://github.com/NodeRedis/node-redis/issues/1000#issuecomment-655488752
	//setex(key,exp-time,val,cb())
	client.setex(req.tokens.xToken, decoded.exp, req.user.id, (err, data) => {
		if (err) {
			return res.status(500).json({
				logout: false,
				msg: err.message,
			})
		}
	})

	res.cookie('token', '', {
		httpOnly: true,
		expires: new Date(0),
	})
	res.cookie('xToken', '', {
		httpOnly: true,
		expires: new Date(0),
	})

	req.user = {}
	req.tokens = {}

	return res.status(200).json({
		logout: true,
	})
})
router.get('/me', auth, async (req, res, next) => {
	res.status(201).json({ auth: true, user: req.user.id })
})
module.exports = router
