import React from 'react'
import {
	Dialog,
	DialogContent,
	DialogContentText,
	useMediaQuery,
	useTheme,
	IconButton,
	withStyles,
	Typography,
	DialogActions,
	Button,
} from '@material-ui/core'
import MuiDialogTitle from '@material-ui/core/DialogTitle'
import CloseIcon from '@material-ui/icons/Close'
import TaskForm from '../Forms/TaskForm'
import GroupForm from '../Forms/GroupForm'

const styles = (theme) => ({
	closeButton: {
		position: 'absolute',
		right: theme.spacing(1),
		top: theme.spacing(1),
		color: theme.palette.grey[500],
	},
})

//Custom Dialog Title Comp
const DialogTitle = withStyles(styles)((props) => {
	const { children, classes, handleClose, ...other } = props
	return (
		<MuiDialogTitle disableTypography className={classes.root} {...other}>
			<Typography variant="h6">{children}</Typography>
			{handleClose ? (
				<IconButton
					aria-label="close"
					className={classes.closeButton}
					onClick={handleClose}
				>
					<CloseIcon />
				</IconButton>
			) : null}
		</MuiDialogTitle>
	)
})

export default function DialogComp(props) {
	let render = null
	const { title, onClose, open, credit, where, full } = props
	const theme = useTheme()
	const fullScreen = useMediaQuery(theme.breakpoints.down('md'))

	switch (where) {
		case 'taskForm':
			render = <TaskForm credit={credit} />
			break
		case 'groupForm':
			render = <GroupForm />
			break
		default:
			render = null
	}
	return (
		<Dialog
			fullScreen={full ? fullScreen : false}
			onClose={onClose}
			aria-labelledby="simple-dialog-title"
			open={open}
		>
			<DialogTitle handleClose={onClose}>{title}</DialogTitle>

			<DialogContent>
				<DialogContentText>
					To subscribe to this website, please enter your email address here. We
					will send updates occasionally.
				</DialogContentText>

				{render}
			</DialogContent>

			<DialogActions>
				<Button onClick={onClose} color="primary">
					Cancel
				</Button>
			</DialogActions>
		</Dialog>
	)
}
