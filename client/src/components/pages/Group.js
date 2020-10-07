import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectors, creators } from './../../store/slices/rootReducer'
import { Redirect, useParams } from 'react-router-dom'
import AppLayout from './../Layout/appLayout'
import TaskList from './../helpers/TaskList'
// import TaskForm from './../helpers/Forms/TaskForm'
import { Container, Button, Grid, Typography, Paper } from '@material-ui/core'
import Dialog from './../UI/Modal'
import Spin from './../UI/Spin'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircle'
import useHooks from '../../hooks/hooks'

//Helper Components
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
		<Paper>
			<Grid className="add-task" container>
				<Grid item md={4}>
					<Typography variant="h4">Add New Task</Typography>
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
						<Dialog open={open} onClose={handleClose} credit={true} />
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
						<Dialog open={open} onClose={handleClose} credit={false} />
					) : null}
				</Grid>
			</Grid>
		</Paper>
	)
}

const NoTask = () => {
	return (
		<div className="no-tasks">
			<h2>No tasks found for this group!</h2>
		</div>
	)
}

const GroupLayout = ({ children }) => {
	return (
		<Container disableGutters className="group">
			{children}
		</Container>
	)
}

const TaskLayout = ({ children }) => {
	return (
		<Container disableGutters className="tasks">
			<Container className="tasklist" disableGutters>
				{children}
			</Container>
			<TaskButtons />
		</Container>
	)
}
function Group(props) {
	const width = useHooks()
	let { id } = useParams()
	const dispatch = useDispatch()
	let { user } = useSelector(selectors.userSelector)
	let { groups, group } = useSelector(selectors.grpSelector)
	let { tasks, task_fetching } = useSelector(selectors.taskSelector)
	const { partial } = props

	useEffect(() => {
		if (id) {
			dispatch(creators.getGroup(id))
			dispatch(creators.getTasks(id))
		}
	}, [dispatch, id])

	useEffect(() => {
		if (partial && group) {
			dispatch(creators.getTasks(group.group_id))
		}
	}, [group])

	if (id && width >= 960) {
		return <Redirect to="/app" />
	}

	const render = (
		<GroupLayout>
			{task_fetching ? (
				<Spin show={task_fetching} />
			) : group && groups ? (
				<TaskLayout>
					{tasks && tasks.length ? (
						<>
							<TaskList userId={user.user_id} tasks={tasks} />
						</>
					) : (
						<NoTask />
					)}
				</TaskLayout>
			) : (
				<div className="choose">
					<Typography variant="h4">Choose Group</Typography>
				</div>
			)}
		</GroupLayout>
	)

	return !partial ? (
		<AppLayout brand={false} fetching={task_fetching} currentGroup={group}>
			{group ? render : null}
		</AppLayout>
	) : (
		render
	)
}

export default React.memo(Group)
