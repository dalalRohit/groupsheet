import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectors, creators } from './../../store/slices/rootReducer'
import AppBar from './../helpers/AppBar'
import Spin from './../UI/Spin'
import './../../styles/App.scss'
const AppLayout = (props) => {
	const dispatch = useDispatch()
	const { auth, user_fetching } = useSelector(selectors.userSelector)
	useEffect(() => {
		dispatch(creators.checkAuth())
	}, [])
	// if (user_fetching) return <Spin show={user_fetching} />
	return auth ? (
		<>
			<AppBar brand={props.brand} />

			<main className="main">{props.children}</main>

			<>footer</>
		</>
	) : null
}

export default AppLayout
