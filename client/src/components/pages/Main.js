import React, { useEffect, useState } from 'react'
import AppLayout from './../Layout/appLayout'
import Group from './Group'
import GroupList from './../helpers/GroupList'
import { Grid } from '@material-ui/core'

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
			{/* style={{ height: '100%', minHeight: '100%' }} */}
			<Grid container>
				<Grid item xs={12} md={4}>
					<GroupList width={width} />
				</Grid>

				{width >= 960 ? (
					<Grid item md={8}>
						<Group width={width} partial={true} />
					</Grid>
				) : null}
			</Grid>
		</AppLayout>
	)
}

export default Main
