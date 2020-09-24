import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectors, creators } from './../../store/slices/rootReducer'
import { useParams } from 'react-router-dom'
import AppLayout from './../Layout/appLayout'
import Modal from './../UI/Modal'

export default function Group(props) {
	let { id } = useParams()
	const dispatch = useDispatch()
	let { group, fetching } = useSelector(selectors.grpSelector)
	let { tasks, task_fetching } = useSelector(selectors.taskSelector)
	const { partial } = props

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

	const [modal, setModal] = useState(false)

	const toggle = () => setModal(!modal)

	const render = group ? (
		<>
			<code>{JSON.stringify(group, null, 4)}</code>
			<br />
			{task_fetching ? (
				'task fetching'
			) : tasks && tasks.length ? (
				<>
					{tasks.map((task) => {
						return <code>{JSON.stringify(task, null, 4)}</code>
					})}
				</>
			) : (
				'no tasks'
			)}

			<div className="buttons">
				<div className="credit" onClick={toggle}>
					CREDIT
					{modal ? <Modal credit={true} modal={modal} toggle={toggle} /> : null}
				</div>
				<div className="debit" onClick={toggle}>
					DEBIT
					{modal ? (
						<Modal credit={false} modal={modal} toggle={toggle} />
					) : null}
				</div>
			</div>
		</>
	) : (
		<h2>Select group</h2>
	)

	return !partial ? (
		<AppLayout brand={false}>
			{fetching ? 'fetching' : group ? render : null}
		</AppLayout>
	) : (
		render
	)
}
