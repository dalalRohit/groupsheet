import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { checkAuth, userSelector } from './../../store/slices/usersRed'
import AppBar from './../helpers/AppBar'
import './../../styles/App.scss'
const AppLayout = (props) => {
	const dispatch = useDispatch()
	const { auth, user_fetching } = useSelector(userSelector)
	useEffect(() => {
		dispatch(checkAuth())
	}, [])
	if (user_fetching) return 'loading'
	return auth ? (
		<>
			<AppBar brand={props.brand} />

			<main className="main">{props.children}</main>

			<>footer</>
		</>
	) : null
}

export default AppLayout
