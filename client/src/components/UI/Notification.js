import React from 'react'
import { Card, CardContent, Typography, MenuItem } from '@material-ui/core'
export default function Notification(props) {
	const { children } = props
	return (
		<MenuItem className="notif">
			<Typography>Notification-{children}</Typography>
		</MenuItem>
	)
}
