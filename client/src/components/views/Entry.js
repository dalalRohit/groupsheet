import React from 'react'
import Panel from '../UI/TabPanel'
import TaskForm from './../Forms/TaskForm'

export default function Entry(props) {
	const { where } = props
	const groupEntryData = [
		{ label: 'Create Group', comp: 'CR* GRP' },
		{ label: 'Join Group', comp: 'JO* GRP' },
	]

	const taskEntryData = [
		{ label: 'CREDIT', comp: <TaskForm credit={true} /> },
		{ label: 'DEBIT', comp: <TaskForm credit={false} /> },
	]

	let data
	switch (where) {
		case 'GROUP_ENTRY':
			data = groupEntryData
			break
		case 'TASK_ENTRY':
			data = taskEntryData
			break
		default:
			break
	}
	return <Panel data={data} />
}
