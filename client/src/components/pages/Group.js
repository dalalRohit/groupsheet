import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectors, creators } from './../../store/rootReducer'
import { Redirect, useParams } from 'react-router-dom'
import AppLayout from './../Layout/appLayout'
import TaskList from '../views/TaskList'
import { Container, Typography } from '@material-ui/core'
import Spin from './../UI/Spin'
import { useHooks } from '../../hooks/hooks'
import TaskButtons from './../views/TaskButtons'
//Helper Components
const NoTask = () => {
	return (
		<div className="no-tasks">
			<Typography color="textSecondary" variant="h4">
				No tasks found for this group!
			</Typography>
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

// Main Export
function Group(props) {
	const width = useHooks()
	let { id } = useParams()
	const dispatch = useDispatch()
	let { user } = useSelector(selectors.userSelector)
	let { groups, group, fetching } = useSelector(selectors.grpSelector)
	let { tasks, task_fetching } = useSelector(selectors.taskSelector)
	const { partial } = props

	useEffect(() => {
		if (id) {
			dispatch(creators.groupCreators.getGroup(id))
			dispatch(creators.taskCreators.getTasks(id))
		}
	}, [dispatch, id])

	useEffect(() => {
		if (partial && group) {
			dispatch(creators.taskCreators.getTasks(group.group_id))
		}
	}, [dispatch, partial, group])

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
						<TaskList userId={user.user_id} tasks={tasks} />
					) : (
						<NoTask />
					)}
				</TaskLayout>
			) : (
				<div className="choose">
					<Typography color="textPrimary" variant="h4">
						Choose Group
					</Typography>
				</div>
			)}
		</GroupLayout>
	)

	return !partial ? (
		<AppLayout brand={false} fetching={fetching} currentGroup={group}>
			{group ? render : null}
		</AppLayout>
	) : (
		render
	)
}

export default React.memo(Group)
