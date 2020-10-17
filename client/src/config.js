import React from 'react'
import { ExitToApp, Assessment, People } from '@material-ui/icons'

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
