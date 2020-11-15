import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import AppLayout from './../Layout/appLayout'
import { useParams } from 'react-router-dom'
import { selectors, creators } from './../../store/rootReducer'
import Spin from '../UI/Spin'
function Detail(props) {
	const { partial } = props
	const dispatch = useDispatch()
	const { id } = useParams()
	const { group, details, fetching_details } = useSelector(
		selectors.grpSelector
	)
	useEffect(() => {
		if (id) {
			dispatch(creators.groupCreators.getGroupDetails(id))
		}
	}, [id])
	const render = <>GroupDetails</>

	if (fetching_details) return <Spin show={fetching_details} />
	return details ? (
		partial ? (
			render
		) : (
			<AppLayout brand={false} fetching={fetching_details} currentGroup={group}>
				{details ? render : null}
			</AppLayout>
		)
	) : null
}

export default React.memo(Detail)
