import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectors, creators } from './../../store/slices/rootReducer'
import { Redirect, useParams } from 'react-router-dom'
import AppLayout from './../Layout/appLayout'
import TaskList from './../helpers/TaskList'
// import TaskForm from './../helpers/Forms/TaskForm'
import { Container } from '@material-ui/core'
export default function Group(props) {
	let { id } = useParams()
	const dispatch = useDispatch()
	let { user } = useSelector(selectors.userSelector)
	let { group, fetching } = useSelector(selectors.grpSelector)
	let { tasks, task_fetching } = useSelector(selectors.taskSelector)
	const { partial, width } = props

	useEffect(() => {
		if (id) {
			console.log('getting tasks for id')
			dispatch(creators.getGroup(id))
			dispatch(creators.getTasks(id))
		}
	}, [])

	useEffect(() => {
		if (partial && group) {
			console.log('getting tasks')
			dispatch(creators.getTasks(group.group_id))
		}
	}, [group])

	const render = group ? (
		<Container disableGutters className="group">
			{task_fetching ? (
				'task fetching'
			) : tasks && tasks.length ? (
				<Container disableGutters className="tasks">
					<TaskList userId={user} tasks={tasks} />
					TaskForm
				</Container>
			) : (
				'no tasks'
			)}
		</Container>
	) : (
		<h2>Select group</h2>
	)

	return !partial ? (
		<AppLayout brand={false} currentGroup={group}>
			{fetching ? 'fetching' : group ? render : null}
		</AppLayout>
	) : (
		render
	)
}
