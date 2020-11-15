import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { creators, selectors } from './../../store/rootReducer'
import Spin from './../UI/Spin'
import Grp from '../UI/Grp'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import { Container, Typography } from '@material-ui/core'
function GroupList(props) {
	const dispatch = useDispatch()

	const { fetching_group, groups, group } = useSelector(selectors.grpSelector)

	const { width } = props
	useEffect(() => {
		dispatch(creators.groupCreators.getGroupsForUser())
	}, [dispatch])

	if (fetching_group) return <Spin show={fetching_group} />

	return groups && groups.length ? (
		<Container disableGutters className="groups">
			<Typography align="center" color="textPrimary" variant="h4">
				Your Groups
			</Typography>

			<div>
				{groups.map((grp) => {
					return (
						<Grp key={grp.group_id} current={group} width={width} group={grp} />
					)
				})}
			</div>
		</Container>
	) : (
		<div className="no-groups">
			<Typography variant="h5">You have no groups. Create one</Typography>
			<AddCircleOutlineIcon fontSize="large" />
		</div>
	)
}

export default React.memo(GroupList)
