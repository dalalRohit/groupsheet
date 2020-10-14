import React from 'react'
import {
	Card,
	CardContent,
	Divider,
	Typography,
	Avatar,
} from '@material-ui/core'
import Menu from './../UI/Menu'

const TaskCard = (data) => {
	const { task, loggedInUser } = data
	let { task_id, type, amount, user_id, date, title, username } = task
	let className = loggedInUser === user_id ? 'task right' : 'task'
	const color = type === 'DR' ? '#FFDDDD' : '#DDFFDD'
	username = user_id === loggedInUser ? 'Me' : username
	return (
		<Card
			variant="outlined"
			key={task_id}
			style={{ backgroundColor: color }}
			className={className}
		>
			<div className="task-header">
				<Avatar>{username[0].toUpperCase()}</Avatar>
				<Typography>{username}</Typography>
				<Menu where="task" />
			</div>

			<Divider />

			<CardContent className="task-main">
				<Typography key={task_id}>
					{title}-{amount}
				</Typography>
			</CardContent>

			<div className="task-footer">
				<Typography variant="caption">{date}</Typography>
			</div>
		</Card>
	)
}

export default function TaskList(props) {
	const { tasks, userId } = props
	const render = tasks.map((task) => {
		return <TaskCard key={task.task_id} task={task} loggedInUser={userId} />
	})

	return <>{render}</>
}
