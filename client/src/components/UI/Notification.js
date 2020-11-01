import React from 'react'
import { Typography, MenuItem } from '@material-ui/core'
export default function Notification(props) {
	const { children, key } = props
	return (
		<MenuItem key={key} className="notif">
			<Typography>Notification-{children}</Typography>
		</MenuItem>
	)
}
