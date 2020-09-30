import React from 'react'
import { TextField, Button } from '@material-ui/core'
import MenuItem from '@material-ui/core/MenuItem'
export default function TaskForm() {
	const [task, setTask] = React.useState('Choose Task')

	const handleChange = (event) => {
		setTask(event.target.value)
	}
	return (
		<form className="task-form" noValidate>
			<TextField variant="standard" label="Task" />
			<TextField variant="standard" label="Task" />
			<TextField select label="Select" value={task} onChange={handleChange}>
				{['Shraddhu', 'Babe'].map((i) => {
					return (
						<MenuItem key={i} value={i}>
							{i}
						</MenuItem>
					)
				})}
			</TextField>
			<Button variant="contained" color="primary">
				Submit
			</Button>
		</form>
	)
}
