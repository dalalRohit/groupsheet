import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { actions } from './../../store/rootReducer'
import PeopleIcon from '@material-ui/icons/People'
import { Typography, Badge, Grid } from '@material-ui/core'
export default function Grp(props) {
	const dispatch = useDispatch()
	const { group, width, current, lastTask } = props

	//common group card render
	const Group = ({ name, last_task, isMobile }) => {
		return (
			<>
				<Grid
					container
					justify="space-between"
					onClick={
						!isMobile
							? () =>
									dispatch(
										actions.groupActions.setGroup({ group, clear: true })
									)
							: null
					}
				>
					<Grid item md={2}>
						<PeopleIcon fontSize="large" />
					</Grid>

					<Grid item md={8}>
						<Typography className="grp_name">{name}</Typography>
						<Typography variant="caption" color="inherit">
							{last_task}
						</Typography>
					</Grid>

					<Grid item md={2}>
						<Typography>9</Typography>
					</Grid>
				</Grid>
			</>
		)
	}
	let classname =
		current && group.group_id === current.group_id ? 'grp current' : 'grp'

	const render =
		width <= 960 ? (
			<div className="grp">
				<Link to={`/group/${group.group_id}`}>
					<Group isMobile={true} name={group.grp_name} last_task={'lastTask'} />
				</Link>
			</div>
		) : (
			<div className={classname}>
				<Group isMobile={false} name={group.grp_name} last_task={'lastTask'} />
			</div>
		)

	return render
}
