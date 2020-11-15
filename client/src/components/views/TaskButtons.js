import React from 'react'
import { Button, Grid, Typography } from '@material-ui/core'
import Dialog from '../UI/Dialog'

const TaskButtons = () => {
	const [open, setOpen] = React.useState(false)
	const handleClickOpen = () => {
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
					onClick={() => handleClickOpen()}
					variant="contained"
					color="primary"
				>
					Click to add new Task
				</Button>
				<Dialog
					title="Create a new Task"
					open={open}
					onClose={handleClose}
					where="taskForm"
				/>
			</Grid>
		</Grid>
	)
}

export default TaskButtons
