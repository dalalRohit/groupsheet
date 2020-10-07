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
