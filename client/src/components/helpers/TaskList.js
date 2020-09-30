import React from 'react'
import {
	Card,
	CardContent,
	Divider,
	Typography,
	Container,
} from '@material-ui/core'
import { MoreVert } from '@material-ui/icons'

const TaskCard = (data) => {
	const { task, loggedInUser } = data
	let { task_id, type, amount, user_id, date, title, username } = task
	let className = loggedInUser === user_id ? 'task right' : 'task'

	username = user_id === loggedInUser ? 'Me' : username
	return (
		<Card className={type === 'CR' ? `${className} cr` : `${className} dr`}>
			<div className="task-header">
				<Typography>{username}</Typography>
				<MoreVert />
			</div>

			<Divider />

			<CardContent className="task-main">
				<Typography key={task_id}>{amount}</Typography>
			</CardContent>

			<div className="task-footer">
				<span>
					<i> {date} </i>
				</span>
			</div>
		</Card>
	)
}

export default function TaskList(props) {
	const { tasks, userId } = props
	const render = tasks.map((task) => {
		return <TaskCard task={task} loggedInUser={userId} />
	})

	return (
		<Container className="tasklist" disableGutters>
			{render}
		</Container>
	)
}
