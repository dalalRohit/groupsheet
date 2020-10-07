import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { single } from './../../store/slices/groupRed'
import PeopleIcon from '@material-ui/icons/People'
export default function Grp(props) {
	const dispatch = useDispatch()
	const { group, width, current } = props
	let className =
		current && group.group_id === current.group_id ? 'grp current' : 'grp'
	const render =
		width < 960 ? (
			<Link className={className} to={`/group/${group.group_id}`}>
				<PeopleIcon />
				<p>{group.grp_name}</p>
				<p>URC</p>
			</Link>
		) : (
			<div className={className} key={group.group_id}>
				<PeopleIcon />
				<p onClick={() => dispatch(single(group))}>{group.grp_name}</p>

				<p>URC</p>
			</div>
		)

	return render
}
