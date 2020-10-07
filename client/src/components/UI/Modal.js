import React from 'react'
import {
	Dialog,
	DialogTitle,
	DialogActions,
	DialogContent,
	DialogContentText,
} from '@material-ui/core'
import TaskForm from './../helpers/Forms/TaskForm'

export default function DialogComp(props) {
	const { onClose, open, credit } = props
	const handleClose = () => {
		onClose()
	}
	const action = credit ? 'Credit' : 'Debit'
	return (
		<Dialog
			onClose={handleClose}
			aria-labelledby="simple-dialog-title"
			open={open}
		>
			<DialogTitle>Add Task - {action}</DialogTitle>

			<DialogContent>
				<DialogContentText>
					To subscribe to this website, please enter your email address here. We
					will send updates occasionally.
				</DialogContentText>
				<TaskForm credit={credit} />
			</DialogContent>

			<DialogActions>Dialog Actions</DialogActions>
		</Dialog>
	)
}
