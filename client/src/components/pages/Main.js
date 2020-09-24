import React, { useEffect, useState } from 'react'
import AppLayout from './../Layout/appLayout'
import './../../styles/App.scss'
import { Row } from 'reactstrap'
import Group from './Group'
import GroupList from './../helpers/GroupList'

const Main = () => {
	const [width, setWidth] = useState(window.innerWidth)

	useEffect(() => {
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

	return (
		<AppLayout brand>
			<Row>
				<div className="col-xs-12 col-md-4 ">
					<GroupList width={width} />
				</div>

				{width >= 768 ? (
					<div className="col-md-8 group">
						<Group width={width} partial />
					</div>
				) : null}
			</Row>
		</AppLayout>
	)
}

export default Main
