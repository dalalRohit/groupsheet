import React from 'react'
import { Button, Grid, Typography } from '@material-ui/core'
import Dialog from '../UI/Dialog'

const TaskButtons = () => {
	const [type, setType] = React.useState('')
	const [open, setOpen] = React.useState(false)
	const handleClickOpen = (credit) => {
		if (credit) setType('credit')
		else setType('debit')
		setOpen(true)
	}
	const handleClose = () => {
		setOpen(false)
	}
	return (
		<Grid container className="add-task" justify="space-evenly">
			<Grid item md={4}>
				<Typography color="textPrimary" variant="h6">
					Add New Task
				</Typography>
			</Grid>

			<Grid item md={4}>
				<Button
					onClick={() => handleClickOpen(true)}
					variant="contained"
					color="primary"
				>
					Credit
				</Button>
				{type === 'credit' ? (
					<Dialog
						title="Add Task - Credit"
						open={open}
						onClose={handleClose}
						credit={true}
						where="taskForm"
					/>
				) : null}
			</Grid>

			<Grid item md={4}>
				<Button
					onClick={() => handleClickOpen(false)}
					variant="contained"
					color="secondary"
				>
					Debit
				</Button>
				{type === 'debit' ? (
					<Dialog
						title="Add Task - Debit"
						open={open}
						onClose={handleClose}
						credit={false}
						where="taskForm"
					/>
				) : null}
			</Grid>
		</Grid>
	)
}

export default TaskButtons
