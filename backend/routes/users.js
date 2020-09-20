var express = require('express')
var router = express.Router()
const jwt = require('jsonwebtoken')
const User = require('./../models/User')
const users = require('./../models/users.data.json')
const { createTokens, hashPassword } = require('./../utils/utils')
const { auth } = require('./../utils/middleware')

const redis = require('redis')
const client = redis.createClient()

router.get('/flogin', (req, res, next) => {
	//https://gist.github.com/kerimdzhanov/7529623
	const randIndex = Math.floor(Math.random() * (users.length - 0 + 1) + 0)
	const user = User(users[randIndex])

	User.findOne({ username: 'rohit_dalal' })
		.then(async (user) => {
			user['password'] = await hashPassword(user.password)
			try {
				await user.save()
				const { token, xToken } = await createTokens(user._id)
				const options = {
					httpOnly: true,
					maxAge: 36 * 60 * 1000,
					secure: false,
					// sameSite: true,
				}
				req.user = {
					id: user._id,
					name: user.username,
					groups: user.groups,
				}
				res.cookie('token', token, options)
				res.cookie('xToken', xToken, options)
				return res.status(200).json({ login: true, user: user._id })
			} catch (err) {
				res.status(500).json({ login: false, err })
			}
		})
		.catch((err) => {
			res.status(404).json({ login: false, err })
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
