import React from 'react'
import AppLayout from './../Layout/appLayout'
import Group from './Group'
import GroupList from './../helpers/GroupList'
import { Grid } from '@material-ui/core'
import useHooks from './../../hooks/hooks'

const Main = () => {
	const width = useHooks()
	return (
		<AppLayout brand>
			{/* style={{ height: '100%', minHeight: '100%' }} */}
			<Grid container>
				<Grid item xs={12} md={4}>
					<GroupList width={width} />
				</Grid>

				{width >= 960 ? (
					<Grid item md={8}>
						<Group partial={true} />
					</Grid>
				) : null}
			</Grid>
		</AppLayout>
	)
}

export default Main
