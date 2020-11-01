import React from 'react'
import Alert from '@material-ui/lab/Alert'
export default function Flash(props) {
	const { msg, type } = props
	return <Alert severity={type}>{msg}</Alert>
}
