import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectors, creators } from './../../store/slices/rootReducer'
import AppBar from './../helpers/AppBar'
import { Container } from '@material-ui/core'
import useHooks from './../../hooks/hooks'

const AppLayout = (props) => {
	const width = useHooks()
	const dispatch = useDispatch()
	const { auth } = useSelector(selectors.userSelector)

	const { brand, currentGroup, fetching } = props
	useEffect(() => {
		dispatch(creators.checkAuth())
	}, [])
	// if (user_fetching) return <Spin show={user_fetching} />
	return auth ? (
		<Container disableGutters maxWidth="xl" className={`wrapper`}>
			<AppBar
				width={width}
				brand={brand}
				currentGroup={currentGroup}
				fetching={fetching}
			/>

			<div className="main">{props.children}</div>
		</Container>
	) : null
}

export default AppLayout
