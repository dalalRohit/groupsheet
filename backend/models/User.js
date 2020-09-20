require('dotenv').config()

const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const moment = require('moment')
const { GroupSchema } = require('./Group')
var UserSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	groups: [],
	date: {
		type: String,
		default: moment().format('MMM Do YY'),
	},
})

/*
  INSTANCE METHODS
  1. getAllGroupsByUser
  2. 

*/

var User = mongoose.model('User', UserSchema)

module.exports = User
