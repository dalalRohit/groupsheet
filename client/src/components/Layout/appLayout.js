import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectors } from './../../store/rootReducer'
import { checkAuth } from './../../store/slices/usersRed'
import AppBar from '../views/AppBar'
import { useHooks } from './../../hooks/hooks'
import SocketManager from './../hoc/withSocket'
const AppLayout = (props) => {
	const width = useHooks()
	const dispatch = useDispatch()
	const { auth } = useSelector(selectors.userSelector)

	const { brand, currentGroup, fetching } = props
	useEffect(() => {
		dispatch(checkAuth())
	}, [dispatch])

	const render = (
		<>
			<AppBar
				width={width}
				brand={brand}
				currentGroup={currentGroup}
				fetching={fetching}
			/>

			<main className="main">{props.children}</main>
		</>
	)
	// if (user_fetching) return <Spin show={user_fetching} />
	return auth ? <SocketManager>{render}</SocketManager> : null
}

export default AppLayout
