import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectors, creators } from './../../store/slices/rootReducer'
import AppBar from './../helpers/AppBar'
import { Container } from '@material-ui/core'

const AppLayout = (props) => {
	const dispatch = useDispatch()
	const { auth, user_fetching } = useSelector(selectors.userSelector)
	useEffect(() => {
		dispatch(creators.checkAuth())
	}, [])
	// if (user_fetching) return <Spin show={user_fetching} />
	return auth ? (
		<Container disableGutters maxWidth="xl" className={`wrapper`}>
			<AppBar
				brand={props.brand}
				group={props.group !== undefined ? props.group : null}
			/>

			<div className="main">{props.children}</div>
		</Container>
	) : null
}

export default AppLayout
