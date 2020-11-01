import React, { useState, useEffect } from 'react'
import AppLayout from './appLayout'
import { useSelector, useDispatch } from 'react-redux'
import { actions, selectors } from './../../store/rootReducer'

function Partial(props) {
	const dispatch = useDispatch()
	const { group, fetching } = useSelector(selectors.grpSelector)
	const { partial, children } = props
	return !partial ? (
		<AppLayout brand={false} fetching={fetching} currentGroup={group}>
			{group ? 'render' : null}
		</AppLayout>
	) : (
		'render'
	)
}

export default React.memo(Partial)
