import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectors, creators } from './../../store/slices/rootReducer'
import AppLayout from './../Layout/appLayout'
import './../../styles/App.scss'
import { Row } from 'reactstrap'
import Group from './Group'
import { NavLink } from 'react-router-dom'
import GroupList from './../helpers/GroupList'

const Main = () => {
	const { userSelector, grpSelector } = selectors
	const { getGroupsForUser } = creators
	const dispatch = useDispatch()
	// const { groups } = useSelector(grpSelector)
	const [grp, setGrp] = useState(null)
	const [width, setWidth] = useState(window.innerWidth)

	useEffect(() => {
		dispatch(getGroupsForUser())
		if (typeof window !== 'undefined') {
			window.addEventListener('resize', () => {
				setWidth(window.innerWidth)

				return () => {
					window.removeEventListener('resize', () => {
						setWidth(window.innerWidth)
					})
				}
			})
		}
	}, [])

	// const groupsToShow = []
	// groups.map( (group) => {
	// 			groupsToShow.push(
	// 		width < 768 ? (
	// 			<NavLink to={`group/${i + 1}`} onClick={() => setGrp(Math.random())}>
	// 				<p>Group No. {i + 1} </p>
	// 			</NavLink>
	// 		) : (
	// 			<p onClick={() => setGrp(Math.random())}>Group No. {i + 1}</p>
	// 		)
	// 	)
	// })

	return (
		<AppLayout brand>
			<Row>
				<div className="col-xs-12 col-md-4 ">
					<GroupList />
				</div>

				{width >= 768 ? (
					<div className="col-md-8 group">
						{grp && <Group partial grpId={Math.random()} />}
					</div>
				) : null}
			</Row>
		</AppLayout>
	)
}

export default Main
