import React from 'react'
import { ExitToApp, Assessment, People } from '@material-ui/icons'
import moment from 'moment'

export const routes = [
	{ name: 'Home', icon: <People />, path: '/home' },
	{ name: 'Login', icon: <Assessment />, path: '/login' },
	{ name: 'Regiser', icon: <ExitToApp />, path: '/register' },
]
export const authRoutes = [
	{ name: 'Groups', icon: <People />, path: '/groups' },
	{ name: 'Analysis', icon: <Assessment />, path: '/analyitics' },
	{ name: 'Logout', icon: <ExitToApp />, path: '/logout' },
]

export const groupMenuLinks = [
	{ name: 'Edit' },
	{ name: 'Wallpaper' },
	{ name: 'Mute Notifications' },
]

export const debitTypes = [
	{ name: 'Milk' },
	{ name: 'Veggies' },
	{ name: 'Commute' },
	{ name: 'Other' },
]
export const taskLinks = [{ name: 'Delete' }]

//Form data
export const loginInputs = [
	{
		id: 2139,
		name: 'username',
		type: 'text',
		label: 'Enter your username',
		placeholder: 'Enter your username',
	},
	{
		id: 23082913,
		name: 'password',
		type: 'password',
		label: 'Password',
		placeholder: 'Enter password..',
	},
]

export const regInputs = [
	{
		id: 3901238,
		name: 'username',
		type: 'text',
		label: 'Username',
		placeholder: 'Enter username..',
	},
	{
		id: 123,
		name: 'email',
		type: 'email',
		label: 'Email Address',
		placeholder: 'Enter your email',
	},
	{
		id: 42783,
		name: 'password',
		type: 'password',
		label: 'Password',
		placeholder: 'Enter password..',
	},
	{
		id: 27398,
		name: 'password2',
		type: 'password',
		label: 'Password Confirm',
		placeholder: 'Enter password again',
	},
]

//==============================
//Date related methods
//==============================
const _MS_PER_DAY = 1000 * 60 * 60 * 24

// a and b are javascript Date objects
export function dateDiffInDays(a, b) {
	// Discard the time and time-zone information.
	const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate())
	const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate())

	return Math.floor((utc2 - utc1) / _MS_PER_DAY)
}

export const processDate = (date) => {
	return moment(date).format('D/M LT')
}

export const getDateForDisplay = (date) => {
	return moment(date).format('MMMM DD YYYY')
}
