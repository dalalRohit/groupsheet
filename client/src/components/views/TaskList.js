import React, { useEffect, useRef } from 'react'
import {
	Card,
	CardContent,
	Divider,
	Typography,
	Avatar,
	useScrollTrigger,
	makeStyles,
	Zoom,
	CssBaseline,
	Fab,
	Chip,
} from '@material-ui/core'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import Menu from './../UI/Menu'
import { dateDiffInDays, processDate, getDateForDisplay } from './../../config'

const DateChip = ({ date }) => {
	return (
		<div className="date">
			<Chip label={getDateForDisplay(date)} />
		</div>
	)
}
const TaskCard = (data) => {
	const { task, loggedInUser, nextTask, index } = data
	let {
		task_id,
		type,
		amount,
		user_id,
		task_date,
		title,
		username,
		remark,
		date_change,
	} = task
	let className = loggedInUser === user_id ? 'task right' : 'task'
	const color = type === 'DR' ? '#FFDDDD' : '#DDFFDD'
	username = user_id === loggedInUser ? 'Me' : username

	return (
		<>
			{index === 0 ? <DateChip date={task_date} /> : null}

			<Card
				variant="outlined"
				key={task_id}
				style={{ backgroundColor: color }}
				className={className}
			>
				<div className="task-header">
					<Avatar>{username[0].toUpperCase()}</Avatar>
					<Typography>{username}</Typography>
					<Menu defIcon={true} where="task" />
				</div>

				<Divider />

				<CardContent className="task-main">
					<Typography color="textPrimary" key={task_id}>
						{title}-{amount} &#x20B9;
					</Typography>

					<Typography color="textPrimary" variant="caption">
						{remark}
					</Typography>
				</CardContent>

				<div className="task-footer">
					{date_change ? (
						<Chip
							variant="outlined"
							color="secondary"
							size="small"
							label="Added Later"
						/>
					) : null}
					<Typography color="textSecondary" variant="caption">
						{processDate(task_date)}
					</Typography>
				</div>
			</Card>

			{nextTask &&
			dateDiffInDays(new Date(task_date), new Date(nextTask.task_date)) > 0 ? (
				<DateChip date={nextTask.task_date} />
			) : null}
		</>
	)
}

const useStyles = makeStyles((theme) => ({
	root: {
		position: 'fixed',
		bottom: theme.spacing(2),
		right: theme.spacing(2),
	},
}))

const ScrollTop = (props) => {
	const { children, window } = props
	const classes = useStyles()

	const trigger = useScrollTrigger({
		target: window ? window() : undefined,
		disableHysteresis: true,
		threshold: 50,
	})

	const handleClick = (event) => {
		const anchor = (event.target.ownerDocument || document).querySelector(
			'#scroll-here'
		)

		if (anchor) {
			anchor.scrollIntoView({ behavior: 'smooth', block: 'center' })
		}
	}

	return (
		<Zoom in={trigger}>
			<div onClick={handleClick} role="presentation" className={classes.root}>
				{children}
			</div>
		</Zoom>
	)
}

export default function TaskList(props) {
	const { tasks, userId } = props
	const render = tasks.map((task, index) => {
		return (
			<TaskCard
				index={index}
				nextTask={index === tasks.length - 1 ? null : tasks[index + 1]}
				key={task.task_id}
				task={task}
				loggedInUser={userId}
			/>
		)
	})
	const myRef = useRef(null)

	useEffect(() => {
		if (myRef.current) {
			myRef.current.scrollIntoView({
				behavior: 'smooth',
			})
		}
	}, [])
	return (
		<>
			<CssBaseline />
			{render}
			<ScrollTop {...props}>
				<Fab color="secondary" size="small" aria-label="scroll to bottom">
					<KeyboardArrowDownIcon />
				</Fab>
			</ScrollTop>
			<div ref={myRef} id="scroll-here"></div>
		</>
	)
}
