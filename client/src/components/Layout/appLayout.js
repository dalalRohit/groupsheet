import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectors, creators } from './../../store/slices/rootReducer'
import AppBar from '../views/AppBar'
import { useHooks } from './../../hooks/hooks'
import UserContext from './../hoc/SocketManager'
const AppLayout = (props) => {
	const width = useHooks()
	const dispatch = useDispatch()
	const { auth } = useSelector(selectors.userSelector)

	const { brand, currentGroup, fetching } = props
	useEffect(() => {
		dispatch(creators.checkAuth())
	}, [dispatch])
	// if (user_fetching) return <Spin show={user_fetching} />
	return auth ? (
		<>
			<AppBar
				width={width}
				brand={brand}
				currentGroup={currentGroup}
				fetching={fetching}
			/>

			<main className="main">{props.children}</main>
		</>
	) : null
}

export default AppLayout
