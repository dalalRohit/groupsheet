import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { actions } from './../../store/rootReducer'
import PeopleIcon from '@material-ui/icons/People'
import { Typography } from '@material-ui/core'
export default function Grp(props) {
	const dispatch = useDispatch()
	const { group, width, current } = props
	let className =
		current && group.group_id === current.group_id ? 'grp current' : 'grp'
	const render =
		width <= 960 ? (
			<Link className="grp" to={`/group/${group.group_id}`}>
				<PeopleIcon />
				<Typography>{group.grp_name}</Typography>
				<Typography>URC</Typography>
			</Link>
		) : (
			<div className={className} key={group.group_id}>
				<PeopleIcon />
				<Typography
					onClick={() =>
						dispatch(actions.groupActions.setGroup({ group, clear: true }))
					}
				>
					{group.grp_name}
				</Typography>

				<Typography>URC</Typography>
			</div>
		)

	return render
}
