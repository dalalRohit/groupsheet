import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import AppLayout from './../Layout/appLayout'
import { useParams, Redirect } from 'react-router-dom'
import { selectors, actions, creators } from './../../store/rootReducer'
import { useHooks } from './../../hooks/hooks'
export default function Detail(props) {
	const dispatch = useDispatch()
	const { id } = useParams()
	const { group, fetching } = useSelector(selectors.grpSelector)
	useEffect(() => {
		if (id) {
			dispatch(actions.groupActions.setGroupDetails())
			dispatch(creators.groupCreators.getGroup(id))
			dispatch(creators.groupCreators.getGroupDetails(id))
		}
	}, [id])
	const render = <>GroupDetails</>
	return group ? (
		<AppLayout brand={false} currentGroup={group}>
			{render}
		</AppLayout>
	) : null
}
