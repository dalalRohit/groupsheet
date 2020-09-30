import React from 'react'
import { ExitToApp, Assessment, People } from '@material-ui/icons'

export const authRoutes = [
	{ name: 'Groups', icon: <People />, path: '/groups' },
	{ name: 'Analysis', icon: <Assessment />, path: '/analyitics' },
	{ name: 'Logout', icon: <ExitToApp />, path: '/logout' },
]
