require('dotenv').config()

const mongoose = require('mongoose')
const moment = require('moment')

var GroupSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: true,
		maxlength: 20,
	},
	createdBy: {
		type: String,
		required: true,
	},
	onBudget: {
		type: Boolean,
	},
	budgetAmt: {
		type: Number,
	},
	date: {
		type: String,
		default: moment().format('MMM Do YY '),
	},
	users: [],
})

var Group = mongoose.model('Group', GroupSchema)

module.exports = Group
